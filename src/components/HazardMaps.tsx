import { useState, useEffect } from 'react';
import { 
  MapContainer, 
  TileLayer, 
  GeoJSON, 
  ImageOverlay, 
  useMap
} from 'react-leaflet';
import JSZip from 'jszip';
import toGeoJSON from 'togeojson';
import { get, set } from 'idb-keyval';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { 
  Upload, 
  Layers, 
  Info, 
  X, 
  Maximize2,
  FileText,
  Trash2
} from 'lucide-react';

// fix for leaflet icons
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';

let DefaultIcon = L.icon({
    iconUrl: markerIcon,
    shadowUrl: markerShadow,
    iconSize: [25, 41],
    iconAnchor: [12, 41]
});
L.Marker.prototype.options.icon = DefaultIcon;

type HazardType = 
  | 'Liquefaction' 
  | 'Earthquake Induced Landslide' 
  | 'Ground Shaking' 
  | 'Ground Rupture' 
  | 'Flood Susceptibility' 
  | 'Rain Induced Landslide';

interface HazardLayer {
  id: string;
  type: HazardType;
  name: string;
  data: any; // GeoJSON object or image URL
  dataType: 'geojson' | 'raster';
  opacity: number;
  visible: boolean;
  bounds?: [[number, number], [number, number]]; // For raster
}

const HAZARD_TYPES: HazardType[] = [
  'Liquefaction',
  'Earthquake Induced Landslide',
  'Ground Shaking',
  'Ground Rupture',
  'Flood Susceptibility',
  'Rain Induced Landslide'
];

export default function HazardMaps() {
  const [activeTab, setActiveTab] = useState<HazardType | 'None'>(() => {
    return (localStorage.getItem('rizal_hazard_active_tab') as HazardType | 'None') || 'None';
  });

  const [baseMap, setBaseMap] = useState<string>(() => {
    return localStorage.getItem('rizal_map_base_type') || 'hybrid';
  });
  
  const [layers, setLayers] = useState<Record<HazardType, HazardLayer[]>>({
    'Liquefaction': [],
    'Earthquake Induced Landslide': [],
    'Ground Shaking': [],
    'Ground Rupture': [],
    'Flood Susceptibility': [],
    'Rain Induced Landslide': []
  });

  const [isLoading, setIsLoading] = useState(true);
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [globalOpacity, setGlobalOpacity] = useState(0.7);
  const [boundaries, setBoundaries] = useState<{ province: any; municipalities: any }>({ 
    province: null, 
    municipalities: null 
  });

  // Fetch boundaries on mount
  useEffect(() => {
    async function fetchBoundaries() {
      try {
        const [provRes, munRes] = await Promise.all([
          fetch('https://raw.githubusercontent.com/rukku/ph-province-boundaries/master/RIZAL.geojson'),
          fetch('https://raw.githubusercontent.com/faeldon/philippines-json-maps/master/2019/geojson/municties/hires/municities-province-ph045800000.0.1.json')
        ]);
        
        if (provRes.ok) {
          const provData = await provRes.json();
          setBoundaries(prev => ({ ...prev, province: provData }));
        }
        if (munRes.ok) {
          const munData = await munRes.json();
          setBoundaries(prev => ({ ...prev, municipalities: munData }));
        }
      } catch (err) {
        console.error('Failed to fetch boundaries:', err);
      }
    }
    fetchBoundaries();
  }, []);

  // Load from IndexedDB on mount
  useEffect(() => {
    async function loadLayers() {
      try {
        const saved = await get('rizal_hazard_layers');
        if (saved) {
          setLayers(saved);
        }
      } catch (err) {
        console.error('Failed to load layers from IndexedDB:', err);
      } finally {
        setIsLoading(false);
      }
    }
    loadLayers();
  }, []);

  // Save to IndexedDB whenever layers change
  useEffect(() => {
    if (isLoading) return;
    async function saveLayers() {
      try {
        await set('rizal_hazard_layers', layers);
      } catch (err) {
        console.error('Failed to save layers to IndexedDB:', err);
        alert('Failed to save changes to permanent storage.');
      }
    }
    saveLayers();
  }, [layers, isLoading]);

  useEffect(() => {
    localStorage.setItem('rizal_hazard_active_tab', activeTab);
  }, [activeTab]);

  useEffect(() => {
    localStorage.setItem('rizal_map_base_type', baseMap);
  }, [baseMap]);

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>, type: HazardType) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    
    if (file.name.endsWith('.json') || file.name.endsWith('.geojson')) {
      reader.onload = (e) => {
        try {
          const geojson = JSON.parse(e.target?.result as string);
          addLayer(type, file.name, geojson, 'geojson');
        } catch (err) {
          alert('Invalid GeoJSON file');
        }
      };
      reader.readAsText(file);
    } else if (file.name.endsWith('.kml')) {
      reader.onload = (e) => {
        try {
          const parser = new DOMParser();
          const kml = parser.parseFromString(e.target?.result as string, 'text/xml');
          const geojson = toGeoJSON.kml(kml);
          addLayer(type, file.name, geojson, 'geojson');
        } catch (err) {
          alert('Failed to parse KML file');
        }
      };
      reader.readAsText(file);
    } else if (file.name.endsWith('.kmz')) {
      reader.onload = async (e) => {
        try {
          const zip = await JSZip.loadAsync(e.target?.result as ArrayBuffer);
          const kmlFile = Object.values(zip.files).find(f => f.name.endsWith('.kml'));
          if (!kmlFile) throw new Error('No KML file found inside KMZ');
          
          const kmlText = await kmlFile.async('string');
          const parser = new DOMParser();
          const kml = parser.parseFromString(kmlText, 'text/xml');
          const geojson = toGeoJSON.kml(kml);
          addLayer(type, file.name, geojson, 'geojson');
        } catch (err) {
          alert('Failed to parse KMZ file');
        }
      };
      reader.readAsArrayBuffer(file);
    } else if (file.type.startsWith('image/')) {
      reader.onload = (e) => {
        const url = e.target?.result as string;
        addLayer(type, file.name, url, 'raster', [[14.3, 120.8], [14.9, 121.5]]);
      };
      reader.readAsDataURL(file);
    }
  };

  const addLayer = (type: HazardType, name: string, data: any, dataType: 'geojson' | 'raster', bounds?: [[number, number], [number, number]]) => {
    const newLayer: HazardLayer = {
      id: Math.random().toString(36).substr(2, 9),
      type,
      name,
      data,
      dataType,
      opacity: 1,
      visible: true,
      bounds
    };
    setLayers(prev => ({
      ...prev,
      [type]: [...prev[type], newLayer]
    }));
    setActiveTab(type);
    setShowUploadModal(false);
  };

  const MapAutoZoom = ({ layers, activeTab }: { layers: Record<HazardType, HazardLayer[]>, activeTab: HazardType | 'None' }) => {
    const map = useMap();
    useEffect(() => {
      (window as any)._leafletMap = map;
      if (activeTab === 'None') return;
      const activeLayers = layers[activeTab];
      if (activeLayers.length === 0) return;

      const bounds = L.latLngBounds([]);
      activeLayers.forEach(layer => {
        if (layer.dataType === 'geojson') {
          const geoLayer = L.geoJSON(layer.data);
          bounds.extend(geoLayer.getBounds());
        } else if (layer.bounds) {
          bounds.extend(layer.bounds);
        }
      });

      if (bounds.isValid()) {
        map.fitBounds(bounds, { padding: [50, 50], maxZoom: 15 });
      }
    }, [activeTab, layers, map]);
    return null;
  };

  const deleteLayer = (type: HazardType, id: string) => {
    setLayers(prev => ({
      ...prev,
      [type]: prev[type].filter(l => l.id !== id)
    }));
  };

  return (
    <div className="flex flex-col h-[calc(100vh-140px)] rounded-xl border border-slate-800 bg-slate-900 overflow-hidden shadow-2xl relative">
      {/* Header / Tabs */}
      <div className="z-[1000] bg-slate-900/90 backdrop-blur-md border-b border-white/10 p-2 flex flex-wrap items-center gap-2">
        <div className="flex items-center gap-2 mr-4 px-3 py-1.5 bg-slate-800 rounded-lg border border-slate-700">
          <Layers className="w-4 h-4 text-rose-400" />
          <span className="text-[11px] font-black uppercase tracking-widest text-slate-400">Hazard Layers</span>
        </div>
        
        <div className="flex flex-wrap gap-1">
          <button
            onClick={() => setActiveTab('None')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
              activeTab === 'None' 
                ? 'bg-slate-700 text-white shadow-lg border border-slate-600' 
                : 'text-slate-500 hover:text-slate-300 hover:bg-slate-800'
            }`}
          >
            Clear Hazards
          </button>
          {HAZARD_TYPES.map(type => (
            <button
              key={type}
              onClick={() => setActiveTab(type)}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all border ${
                activeTab === type 
                  ? 'bg-rose-600 border-rose-500 text-white shadow-lg shadow-rose-900/20' 
                  : 'bg-slate-800/40 border-slate-700 text-slate-400 hover:text-slate-200 hover:bg-slate-800'
              }`}
            >
              {type}
            </button>
          ))}
        </div>

        <button 
          onClick={() => setShowUploadModal(true)}
          className="ml-auto px-4 py-1.5 bg-cyan-600 hover:bg-cyan-500 text-white rounded-lg text-xs font-bold flex items-center gap-2 shadow-lg transition-transform active:scale-95"
        >
          <Upload className="w-3.5 h-3.5" />
          Upload Map
        </button>
      </div>

      {/* Map Area */}
      <div className="flex-1 relative bg-slate-950">
        <MapContainer 
          center={[14.6, 121.1]} // Centered on Rizal
          zoom={11} 
          style={{ 
            height: '100%', 
            width: '100%',
            backgroundColor: '#000'
          }}
          className="z-0"
        >
          <MapAutoZoom layers={layers} activeTab={activeTab} />
          
          <TileLayer
            url={
              baseMap === 'satellite' ? "https://{s}.google.com/vt/lyrs=s&x={x}&y={y}&z={z}" :
              baseMap === 'streets' ? "https://{s}.google.com/vt/lyrs=m&x={x}&y={y}&z={z}" :
              baseMap === 'terrain' ? "https://{s}.google.com/vt/lyrs=p&x={x}&y={y}&z={z}" :
              baseMap === 'traffic' ? "https://{s}.google.com/vt/lyrs=m,traffic&x={x}&y={y}&z={z}" :
              "https://{s}.google.com/vt/lyrs=s,h&x={x}&y={y}&z={z}" // hybrid default
            }
            maxZoom={20}
            subdomains={['mt0', 'mt1', 'mt2', 'mt3']}
            attribution='&copy; Google Maps'
          />

          {/* Administrative Boundaries */}
          {boundaries.municipalities && (
            <GeoJSON 
              data={boundaries.municipalities}
              interactive={false}
              style={{
                color: 'white',
                weight: 1,
                dashArray: '5, 5',
                fillOpacity: 0,
                opacity: 0.8
              }}
            />
          )}
          {boundaries.province && (
            <GeoJSON 
              data={boundaries.province}
              interactive={false}
              style={{
                color: '#22d3ee', // Cyan-400
                weight: 2.5,
                fillOpacity: 0,
                opacity: 1
              }}
            />
          )}
          
          {activeTab !== 'None' && layers[activeTab].map(layer => (
            layer.visible && (
              layer.dataType === 'geojson' ? (
                <GeoJSON 
                  key={layer.id}
                  data={layer.data}
                  style={{
                    fillColor: getHazardColor(layer.type),
                    weight: 1.5,
                    opacity: globalOpacity,
                    color: 'white',
                    fillOpacity: globalOpacity,
                    className: 'hazard-path'
                  }}
                />
              ) : (
                <ImageOverlay
                  key={layer.id}
                  url={layer.data}
                  bounds={layer.bounds || [[14.33, 120.95], [14.88, 121.45]]}
                  opacity={globalOpacity}
                  interactive={true}
                />
              )
            )
          ))}
        </MapContainer>

        {/* Legend & Controls Overlay */}
        <div className="absolute bottom-6 right-6 z-[1001] w-64 bg-slate-900/90 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl overflow-hidden animate-in fade-in slide-in-from-bottom-4">
          <div className="p-4 border-b border-white/5 bg-white/5 flex items-center justify-between">
            <h4 className="font-black text-[10px] uppercase tracking-[0.2em] text-slate-400">Map Controls</h4>
            <div className="flex gap-2">
              {activeTab !== 'None' && layers[activeTab].length > 0 && (
                <button 
                  onClick={() => {
                    const map = (window as any)._leafletMap;
                    if (map) {
                      const bounds = L.latLngBounds([]);
                      layers[activeTab].forEach(l => {
                        if (l.dataType === 'geojson') bounds.extend(L.geoJSON(l.data).getBounds());
                        else if (l.bounds) bounds.extend(l.bounds);
                      });
                      if (bounds.isValid()) map.fitBounds(bounds, { padding: [50, 50] });
                    }
                  }}
                  className="p-1.5 bg-slate-800 hover:bg-slate-700 rounded-lg text-cyan-400 transition-colors"
                  title="Recenter on Hazards"
                >
                  <Maximize2 className="w-3 h-3" />
                </button>
              )}
              <div className="flex gap-1 items-center">
                <div className="w-2 h-2 rounded-full bg-rose-500 animate-pulse" />
                <div className="w-2 h-2 rounded-full bg-cyan-500" />
              </div>
            </div>
          </div>
          
          <div className="p-4 space-y-4">
            <div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Overlay Opacity</span>
                <span className="text-[10px] font-mono text-cyan-400">{Math.round(globalOpacity * 100)}%</span>
              </div>
              <input 
                type="range" 
                min="0" max="1" step="0.1" 
                value={globalOpacity}
                onChange={(e) => setGlobalOpacity(parseFloat(e.target.value))}
                className="w-full h-1 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-cyan-500"
              />
            </div>

            <div className="pt-4 border-t border-white/5">
              <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block mb-3">Map Style</span>
              <div className="grid grid-cols-2 gap-2">
                {[
                  { id: 'hybrid', name: 'Hybrid' },
                  { id: 'satellite', name: 'Satellite' },
                  { id: 'streets', name: 'Streets' },
                  { id: 'terrain', name: 'Terrain' },
                  { id: 'traffic', name: 'Traffic' }
                ].map(style => (
                  <button
                    key={style.id}
                    onClick={() => setBaseMap(style.id)}
                    className={`px-2 py-2 rounded-lg text-[10px] font-bold transition-all border ${
                      baseMap === style.id 
                        ? 'bg-cyan-600 border-cyan-500 text-white shadow-lg shadow-cyan-900/20' 
                        : 'bg-slate-800/50 border-slate-700 text-slate-400 hover:text-slate-200 hover:bg-slate-800'
                    }`}
                  >
                    {style.name}
                  </button>
                ))}
              </div>
            </div>

            {activeTab !== 'None' && layers[activeTab].length > 0 && (
              <div className="pt-4 border-t border-white/5">
                <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block mb-3">Active Layers</span>
                <div className="space-y-2 max-h-40 overflow-y-auto pr-2 custom-scrollbar">
                  {layers[activeTab].map(layer => (
                    <div key={layer.id} className="flex items-center gap-2 p-2 bg-slate-800/50 rounded-lg border border-slate-700/50">
                      <div className="w-2 h-2 rounded-full" style={{ backgroundColor: getHazardColor(layer.type) }} />
                      <span className="text-[10px] text-slate-300 font-bold truncate flex-1">{layer.name}</span>
                      <button 
                        onClick={() => deleteLayer(activeTab, layer.id)}
                        className="p-1 hover:bg-rose-500/20 text-slate-500 hover:text-rose-400 transition-colors"
                      >
                        <Trash2 className="w-3 h-3" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab !== 'None' && (
              <div className="pt-4 border-t border-white/5">
                 <div className="flex items-center gap-2 mb-2">
                    <div className="w-3 h-3 rounded shadow-inner" style={{ backgroundColor: getHazardColor(activeTab) }} />
                    <span className="text-[11px] font-bold text-slate-300">{activeTab} Zone</span>
                 </div>
                 <p className="text-[9px] text-slate-500 leading-relaxed uppercase tracking-wide">
                    Source: GeoRiskPH / DOST / PHIVOLCS
                 </p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Upload Modal */}
      {showUploadModal && (
        <div className="fixed inset-0 z-[2000] bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="w-full max-w-md bg-slate-900 border border-slate-700 rounded-2xl shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200">
            <div className="px-6 py-4 border-b border-slate-800 flex items-center justify-between">
              <h3 className="text-lg font-bold text-white">Import Hazard Layer</h3>
              <button onClick={() => setShowUploadModal(false)} className="p-2 hover:bg-slate-800 rounded-full text-slate-400 text-white transition-colors">
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <div className="p-6 space-y-6">
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">Assign to Category</label>
                <div className="grid grid-cols-2 gap-2">
                  {HAZARD_TYPES.map(type => (
                    <div key={type} className="relative group">
                      <input 
                        type="file" 
                        accept=".json,.geojson,.kml,.kmz,image/*"
                        onChange={(e) => handleFileUpload(e, type)}
                        className="absolute inset-0 opacity-0 cursor-pointer z-10"
                      />
                      <div className="flex flex-col items-center justify-center p-3 bg-slate-800/50 border border-slate-700 rounded-xl group-hover:border-rose-500/50 group-hover:bg-slate-800 transition-all text-center">
                        <div className="w-8 h-8 rounded-lg bg-slate-700 flex items-center justify-center mb-2 group-hover:bg-rose-500/20 group-hover:text-rose-400 transition-colors">
                          <FileText className="w-4 h-4" />
                        </div>
                        <span className="text-[10px] font-bold text-slate-400 group-hover:text-white transition-colors leading-tight">{type}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-slate-950/50 p-4 rounded-xl border border-slate-800 flex items-start gap-4">
                <div className="p-2 bg-blue-500/10 text-blue-400 rounded-lg">
                  <Info className="w-4 h-4" />
                </div>
                <div className="space-y-1">
                  <h4 className="text-xs font-bold text-slate-300">Supported Formats</h4>
                  <p className="text-[10px] text-slate-500 leading-relaxed">
                    Upload **GeoJSON**, **KML**, **KMZ** (zipped KML) for vector layers, or **Images** for raster overlays.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function getHazardColor(type: HazardType): string {
  switch(type) {
    case 'Liquefaction': return '#fbbf24'; // Amber
    case 'Earthquake Induced Landslide': return '#f87171'; // Red
    case 'Ground Shaking': return '#ea580c'; // Orange
    case 'Ground Rupture': return '#be123c'; // Rose
    case 'Flood Susceptibility': return '#38bdf8'; // Sky
    case 'Rain Induced Landslide': return '#818cf8'; // Indigo
    default: return '#94a3b8';
  }
}
