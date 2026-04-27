import React, { useState, useRef, useMemo } from 'react';
import {
  X, Upload, Download, FileSpreadsheet, AlertCircle, Trash2,
  Loader2, Search, Map as MapIcon, Table as TableIcon,
  Info, Navigation, Users, Home, Maximize2, MapPin
} from 'lucide-react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Fix for default marker icon in Leaflet + React
// @ts-ignore
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
});

export interface EvacuationCenter {
  name: string;
  location: string;
  capacity_individuals: number;
  capacity_family: number;
  floor_area: number;
  type: string;
  features: string;
  proximity: string;
  source_of_water: string;
  remarks: string;
  lat: number;
  lng: number;
  contact_person_and_number: string;
}

interface EvacuationCentersModalProps {
  municipalityName: string;
  isOpen: boolean;
  onClose: () => void;
  data: EvacuationCenter[];
  onDataUpdate: (newData: EvacuationCenter[]) => void;
}

export default function EvacuationCentersModal({
  municipalityName,
  isOpen,
  onClose,
  data,
  onDataUpdate,
}: EvacuationCentersModalProps) {
  const [isParsing, setIsParsing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeView, setActiveView] = useState<'table' | 'map'>('table');
  const [selectedCenter, setSelectedCenter] = useState<EvacuationCenter | null>(null);
  const [baseMap, setBaseMap] = useState<string>(() => {
    return localStorage.getItem('rizal_map_base_type') || 'hybrid';
  });
  const fileInputRef = useRef<HTMLInputElement>(null);

  const REQUIRED_HEADERS = [
    'name', 'location', 'capacity', 'capacity_in_family', 'floor_area',
    'type', 'features', 'proximity', 'source_of_water', 'remarks', 'lat', 'lng', 'contact_person_and_number'
  ];

  const filteredData = useMemo(() => {
    return data.filter(center =>
      center.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      center.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
      center.type.toLowerCase().includes(searchQuery.toLowerCase()) ||
      center.features.toLowerCase().includes(searchQuery.toLowerCase()) ||
      center.proximity.toLowerCase().includes(searchQuery.toLowerCase()) ||
      center.source_of_water.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [data, searchQuery]);

  if (!isOpen) return null;

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    if (!file.name.endsWith('.csv')) {
      setError('Please upload a valid CSV file.');
      return;
    }

    setIsParsing(true);
    setError(null);

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const text = e.target?.result as string;
        const rows = text.split(/\r?\n/).filter(row => row.trim() !== '');

        if (rows.length < 2) {
          throw new Error('CSV file is empty or missing data rows.');
        }

        // Parse headers and normalize them
        const rawHeaders = rows[0].split(',').map(h => h.trim().toLowerCase().replace(/^"|"$/g, ''));
        const headers = rawHeaders.map(h => {
          if (h === 'contact person' || h === 'contact' || h === 'contact number') return 'contact_person_and_number';
          if (h === 'capacity in families' || h === 'capacity in family') return 'capacity_in_family';
          if (h === 'floor area') return 'floor_area';
          if (h === 'water source' || h === 'source of water') return 'source_of_water';
          return h.replace(/\s+/g, '_');
        });

        // Lenient header mapping
        const headerMap: Record<string, number> = {};
        headers.forEach((h, i) => headerMap[h] = i);

        const parsedData: EvacuationCenter[] = rows.slice(1).map((row) => {
          // Robust CSV parsing for commas within quotes
          const cols: string[] = [];
          let current = '';
          let inQuotes = false;
          for (let i = 0; i < row.length; i++) {
            const char = row[i];
            if (char === '"') inQuotes = !inQuotes;
            else if (char === ',' && !inQuotes) {
              cols.push(current.trim());
              current = '';
            } else {
              current += char;
            }
          }
          cols.push(current.trim().replace(/^"|"$/g, '')); // Strip quotes from values

          if (cols.length === 0 || (cols.length === 1 && !cols[0])) return null;

          const getVal = (header: string) => cols[headerMap[header]] || '';
          const getNum = (header: string) => {
            const val = getVal(header).replace(/[^\d.-]/g, '');
            return val ? parseFloat(val) : 0;
          };

          return {
            name: getVal('name'),
            location: getVal('location'),
            capacity_individuals: getNum('capacity'),
            capacity_family: getNum('capacity_in_family'),
            floor_area: getNum('floor_area'),
            type: getVal('type'),
            features: getVal('features'),
            proximity: getVal('proximity'),
            source_of_water: getVal('source_of_water'),
            remarks: getVal('remarks'),
            lat: getNum('lat'),
            lng: getNum('lng'),
            contact_person_and_number: getVal('contact_person_and_number'),
          };
        }).filter(item => item !== null) as EvacuationCenter[];

        if (parsedData.length === 0) {
          throw new Error('No valid records found in CSV.');
        }

        onDataUpdate(parsedData);
        if (fileInputRef.current) fileInputRef.current.value = '';
        
        // Sync to GitHub via local backend
        fetch(`http://localhost:3001/api/github/evac/${encodeURIComponent(municipalityName)}`, {
          method: 'POST',
          headers: { 'Content-Type': 'text/plain' },
          body: text
        }).catch(err => console.error("Failed to sync to GitHub:", err));

      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to parse CSV file.');
      } finally {
        setIsParsing(false);
      }
    };

    reader.onerror = () => {
      setError('Failed to read file.');
      setIsParsing(false);
    };

    reader.readAsText(file);
  };

  const handleDownloadCSV = () => {
    if (data.length === 0) return;

    const headers = REQUIRED_HEADERS.map(h => h.charAt(0).toUpperCase() + h.slice(1).replace(/_/g, ' '));
    const csvContent = [
      headers.join(','),
      ...data.map(item => [
        `"${item.name}"`,
        `"${item.location}"`,
        item.capacity_individuals,
        item.capacity_family,
        item.floor_area,
        `"${item.type}"`,
        `"${item.features}"`,
        `"${item.proximity}"`,
        `"${item.source_of_water}"`,
        `"${item.remarks}"`,
        item.lat,
        item.lng,
        `"${item.contact_person_and_number}"`
      ].join(','))
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', `Evacuation_Centers_${municipalityName}.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const clearData = () => {
    if (window.confirm('Are you sure you want to clear all data? This will also delete the file from GitHub.')) {
      onDataUpdate([]);
      setSelectedCenter(null);
      
      // Delete from GitHub via local backend
      fetch(`http://localhost:3001/api/github/evac/${encodeURIComponent(municipalityName)}`, {
        method: 'DELETE'
      }).catch(err => console.error("Failed to delete from GitHub:", err));
    }
  };

  return (
    <div
      className="fixed inset-0 z-[60] bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-3 sm:p-4 animate-in fade-in duration-300"
      onClick={onClose}
    >
      <div
        className="w-full max-w-6xl h-full max-h-[90vh] rounded-2xl border border-slate-700 bg-slate-900 shadow-2xl overflow-hidden flex flex-col animate-in zoom-in-95 duration-300"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="px-5 sm:px-6 py-4 border-b border-slate-700/60 bg-slate-900/50 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center">
              <FileSpreadsheet className="w-5 h-5 text-cyan-400" />
            </div>
            <div>
              <h3 className="text-lg sm:text-xl font-bold text-white leading-tight">
                Evacuation Centers ({data.length}) – <span className="text-cyan-400">{municipalityName}</span>
              </h3>
              <p className="text-xs text-slate-400 mt-0.5 font-medium uppercase tracking-wider">
                Resource Management Console
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="rounded-full p-2 text-slate-400 hover:text-white hover:bg-slate-800 transition-all"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Action & Filter Bar */}
        <div className="px-5 sm:px-6 py-4 bg-slate-800/30 border-b border-slate-700/60 flex flex-wrap items-center justify-between gap-4">
          <div className="flex flex-wrap items-center gap-3 flex-1">
            <div className="relative flex-1 max-w-xs">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
              <input
                type="text"
                placeholder="Search by name, location..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-slate-950 border border-slate-700 rounded-lg py-2 pl-9 pr-4 text-sm text-white placeholder:text-slate-600 focus:outline-none focus:ring-2 focus:ring-cyan-500/40"
              />
            </div>

            <div className="flex bg-slate-950 border border-slate-700 rounded-lg p-1">
              <button
                onClick={() => setActiveView('table')}
                className={`flex items-center gap-2 px-3 py-1.5 rounded-md text-xs font-bold transition-all ${activeView === 'table' ? 'bg-cyan-600 text-white shadow-lg' : 'text-slate-400 hover:text-slate-200'}`}
              >
                <TableIcon className="w-3.5 h-3.5" />
                Table
              </button>
              <button
                onClick={() => setActiveView('map')}
                className={`flex items-center gap-2 px-3 py-1.5 rounded-md text-xs font-bold transition-all ${activeView === 'map' ? 'bg-cyan-600 text-white shadow-lg' : 'text-slate-400 hover:text-slate-200'}`}
              >
                <MapIcon className="w-3.5 h-3.5" />
                Map
              </button>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <input type="file" accept=".csv" onChange={handleFileUpload} ref={fileInputRef} className="hidden" />
            <button
              type="button"
              onClick={() => {
                const headers = REQUIRED_HEADERS.join(',');
                const blob = new Blob([headers], { type: 'text/csv' });
                const url = URL.createObjectURL(blob);
                const link = document.createElement('a');
                link.href = url;
                link.download = 'Evacuation_Centers_Template.csv';
                link.click();
              }}
              className="flex items-center gap-2 px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-lg text-sm font-semibold transition-all border border-slate-700"
              title="Download CSV Template"
            >
              <FileSpreadsheet className="w-4 h-4" />
              Template
            </button>
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              disabled={isParsing}
              className="flex items-center gap-2 px-4 py-2 bg-cyan-600 hover:bg-cyan-500 text-white rounded-lg text-sm font-semibold transition-all shadow-lg"
            >
              {isParsing ? <Loader2 className="w-4 h-4 animate-spin" /> : <Upload className="w-4 h-4" />}
              {data.length > 0 ? 'Replace' : 'Upload'}
            </button>

            {data.length > 0 && (
              <>
                <button
                  type="button"
                  onClick={handleDownloadCSV}
                  className="flex items-center gap-2 px-4 py-2 bg-slate-700 hover:bg-slate-600 text-slate-200 rounded-lg text-sm font-semibold transition-all border border-slate-600"
                >
                  <Download className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  onClick={clearData}
                  className="flex items-center gap-2 px-4 py-2 bg-rose-900/20 hover:bg-rose-900/40 text-rose-300 rounded-lg text-sm font-semibold transition-all border border-rose-500/20"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </>
            )}
          </div>
        </div>

        {/* Content Area */}
        <div className="flex-1 overflow-hidden flex min-h-0">
          <div className="flex-1 flex flex-col overflow-hidden min-h-0">
            {error && (
              <div className="mx-6 mt-4 p-3 bg-rose-500/10 border border-rose-500/20 rounded-lg flex items-start gap-3">
                <AlertCircle className="w-5 h-5 text-rose-400 shrink-0 mt-0.5" />
                <p className="text-sm text-rose-300 font-medium">{error}</p>
              </div>
            )}

            {data.length === 0 ? (
              <div className="flex-1 flex flex-col items-center justify-center text-center p-8">
                <div className="w-20 h-20 rounded-3xl bg-slate-800/50 border border-slate-700 flex items-center justify-center mb-6">
                  <Upload className="w-10 h-10 text-slate-600" />
                </div>
                <h4 className="text-xl font-bold text-white mb-2">No data loaded</h4>
                <p className="text-sm text-slate-500 max-w-sm mb-8 leading-relaxed">
                  Upload a CSV file with center details, capacities, and coordinates to monitor resources across {municipalityName}.
                </p>
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="px-8 py-3 bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white rounded-xl text-sm font-bold uppercase tracking-widest transition-all shadow-xl shadow-cyan-950/40"
                >
                  Import Database
                </button>
              </div>
            ) : (
              <div className="flex-1 relative overflow-hidden min-h-0">
                {activeView === 'table' ? (
                  <div className="h-full overflow-auto p-4 sm:p-6">
                    <div className="inline-block min-w-full align-middle">
                      <table className="min-w-full divide-y divide-slate-800">
                        <thead className="bg-slate-900/80 sticky top-0 z-20 backdrop-blur-sm">
                          <tr>
                            <th className="px-4 py-4 text-left text-xs font-bold text-slate-400 uppercase tracking-wider">#</th>
                            <th className="px-6 py-4 text-left text-xs font-bold text-slate-400 uppercase tracking-wider">Name</th>
                            <th className="px-6 py-4 text-left text-xs font-bold text-slate-400 uppercase tracking-wider">Location</th>
                            <th className="px-6 py-4 text-left text-xs font-bold text-slate-400 uppercase tracking-wider text-center">Capacity (Indiv/Fam)</th>
                            <th className="px-6 py-4 text-left text-xs font-bold text-slate-400 uppercase tracking-wider text-right">Area</th>
                            <th className="px-6 py-4 text-left text-xs font-bold text-slate-400 uppercase tracking-wider">Type</th>
                            <th className="px-6 py-4 text-left text-xs font-bold text-slate-400 uppercase tracking-wider">Features</th>
                            <th className="px-6 py-4 text-left text-xs font-bold text-slate-400 uppercase tracking-wider">Proximity</th>
                            <th className="px-6 py-4 text-left text-xs font-bold text-slate-400 uppercase tracking-wider">Water Source</th>
                            <th className="px-6 py-4 text-left text-xs font-bold text-slate-400 uppercase tracking-wider">Remarks</th>
                            <th className="px-6 py-4 text-left text-xs font-bold text-slate-400 uppercase tracking-wider">Contact</th>
                            <th className="px-6 py-4 text-right text-xs font-bold text-slate-400 uppercase tracking-wider">Location (GPS)</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-800 bg-transparent">
                          {filteredData.map((center, idx) => (
                            <tr key={idx} className="hover:bg-slate-800/40 transition-colors group">
                              <td className="px-4 py-5 text-xs font-mono text-slate-500 font-bold border-r border-slate-800/30">
                                {idx + 1}
                              </td>
                              <td className="px-6 py-5">
                                <div
                                  onClick={() => setSelectedCenter(center)}
                                  className="text-sm font-bold text-white hover:text-cyan-400 transition-colors cursor-pointer whitespace-normal min-w-[150px]"
                                >
                                  {center.name}
                                </div>
                              </td>
                              <td className="px-6 py-5 border-l border-slate-800/30">
                                <div className="text-sm text-slate-300 whitespace-normal min-w-[180px] leading-relaxed">{center.location}</div>
                              </td>
                              <td className="px-6 py-5 whitespace-nowrap text-center">
                                <div className="flex flex-col items-center gap-1.5">
                                  <span className="text-xs font-bold text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded-md border border-emerald-500/20 w-full">{center.capacity_individuals} Ind.</span>
                                  <span className="text-xs font-bold text-amber-400 bg-amber-500/10 px-2.5 py-1 rounded-md border border-amber-500/20 w-full">{center.capacity_family} Fam.</span>
                                </div>
                              </td>
                              <td className="px-6 py-5 whitespace-nowrap text-right">
                                <div className="text-sm text-cyan-300 font-mono font-black">{center.floor_area} sqm</div>
                              </td>
                              <td className="px-6 py-5">
                                <span className="text-[10px] font-bold px-3 py-1.5 bg-slate-800 text-slate-300 rounded-lg uppercase border border-slate-700">
                                  {center.type}
                                </span>
                              </td>
                              <td className="px-6 py-5 border-x border-slate-800/30">
                                <div className="text-xs text-slate-400 italic whitespace-normal min-w-[200px] leading-relaxed bg-slate-950/30 p-2 rounded-lg">
                                  {center.features}
                                </div>
                              </td>
                              <td className="px-6 py-5">
                                <div className="text-xs text-slate-300 whitespace-normal min-w-[140px] font-medium">{center.proximity}</div>
                              </td>
                              <td className="px-6 py-5">
                                <div className="text-xs text-blue-400 font-bold whitespace-normal min-w-[120px]">{center.source_of_water}</div>
                              </td>
                              <td className="px-6 py-5">
                                <div className="text-xs text-slate-400 max-w-[150px] whitespace-normal italic">{center.remarks}</div>
                              </td>
                              <td className="px-6 py-5">
                                <div className="text-xs text-cyan-500 font-bold font-mono bg-cyan-500/5 p-2 rounded-lg border border-cyan-500/10 whitespace-normal min-w-[150px]">
                                  {center.contact_person_and_number}
                                </div>
                              </td>
                              <td className="px-6 py-5 whitespace-nowrap text-right">
                                <a
                                  href={`https://www.google.com/maps/search/?api=1&query=${center.lat},${center.lng}`}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="inline-flex items-center gap-2 px-3 py-2 bg-slate-800 hover:bg-emerald-600 text-emerald-400 hover:text-white rounded-lg transition-all border border-slate-700 shadow-sm"
                                  title="View on Google Maps"
                                >
                                  <Navigation className="w-4 h-4" />
                                  <span className="text-[10px] font-bold uppercase">View on Maps</span>
                                </a>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                ) : (
                  <div className="relative w-full bg-slate-950" style={{ height: 'calc(90vh - 180px)', minHeight: '400px' }}>
                    <MapContainer
                      center={[14.5995, 121.2483]} // Approx Rizal coordinates
                      zoom={11}
                      style={{
                        height: '100%',
                        width: '100%',
                        minHeight: '400px',
                        backgroundColor: '#000'
                      }}
                      className="z-0"
                    >
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
                      {filteredData.map((center, idx) => (
                        <Marker
                          key={idx}
                          position={[center.lat, center.lng]}
                          eventHandlers={{ click: () => setSelectedCenter(center) }}
                        />
                      ))}
                    </MapContainer>

                    {/* Floating Base Map Selector */}
                    <div className="absolute bottom-6 right-6 z-[1000] flex flex-col gap-2 bg-slate-900/90 backdrop-blur-md border border-white/10 p-2 rounded-xl shadow-2xl">
                      <div className="px-2 py-1 mb-1 border-b border-white/5">
                        <span className="text-[9px] font-bold text-slate-500 uppercase tracking-widest">Base Map</span>
                      </div>
                      <div className="grid grid-cols-1 gap-1">
                        {[
                          { id: 'hybrid', name: 'Hybrid' },
                          { id: 'satellite', name: 'Satellite' },
                          { id: 'streets', name: 'Streets' },
                          { id: 'terrain', name: 'Terrain' },
                          { id: 'traffic', name: 'Traffic' }
                        ].map(style => (
                          <button
                            key={style.id}
                            onClick={() => {
                              setBaseMap(style.id);
                              localStorage.setItem('rizal_map_base_type', style.id);
                            }}
                            className={`px-3 py-1.5 rounded-lg text-[10px] font-bold text-left transition-all border ${baseMap === style.id
                              ? 'bg-cyan-600 border-cyan-500 text-white'
                              : 'bg-slate-800/40 border-slate-700 text-slate-400 hover:text-slate-200 hover:bg-slate-800'
                              }`}
                          >
                            {style.name}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Detail Side Panel */}
          {selectedCenter && (
            <div className="w-80 border-l border-slate-700 bg-slate-900/50 backdrop-blur-xl animate-in slide-in-from-right duration-300 overflow-y-auto">
              <div className="sticky top-0 p-4 border-b border-slate-700/60 bg-slate-900/80 backdrop-blur flex items-center justify-between">
                <h4 className="font-bold text-white flex items-center gap-2">
                  <Info className="w-4 h-4 text-cyan-400" />
                  Center Details
                </h4>
                <button
                  onClick={() => setSelectedCenter(null)}
                  className="p-1.5 hover:bg-slate-800 rounded-lg text-slate-400"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <div className="p-5 space-y-6">
                <section>
                  <h5 className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-3">Identification</h5>
                  <div className="space-y-1">
                    <div className="text-lg font-bold text-white leading-snug">{selectedCenter.name}</div>
                    <div className="flex items-start gap-2 text-sm text-slate-400">
                      <MapPin className="w-4 h-4 shrink-0 mt-0.5 text-rose-500" />
                      {selectedCenter.location}
                    </div>
                  </div>
                </section>

                <div className="grid grid-cols-2 gap-3">
                  <div className="p-3 bg-slate-950/50 rounded-xl border border-slate-800">
                    <div className="text-[10px] font-bold text-slate-500 uppercase mb-1">Individuals</div>
                    <div className="text-xl font-black text-emerald-400">{selectedCenter.capacity_individuals}</div>
                  </div>
                  <div className="p-3 bg-slate-950/50 rounded-xl border border-slate-800">
                    <div className="text-[10px] font-bold text-slate-500 uppercase mb-1">Families</div>
                    <div className="text-xl font-black text-amber-400">{selectedCenter.capacity_family}</div>
                  </div>
                </div>

                <section className="space-y-4">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-slate-500 flex items-center gap-2"><Home className="w-4 h-4" /> Type</span>
                    <span className="text-white font-bold">{selectedCenter.type}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-slate-500 flex items-center gap-2"><Maximize2 className="w-4 h-4" /> Area</span>
                    <span className="text-cyan-400 font-bold font-mono">{selectedCenter.floor_area} sqm</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-slate-500 flex items-center gap-2"><Navigation className="w-4 h-4" /> Proximity</span>
                    <span className="text-white font-bold">{selectedCenter.proximity}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-blue-400 flex items-center gap-2">💧 Water Source</span>
                    <span className="text-white font-bold">{selectedCenter.source_of_water}</span>
                  </div>
                </section>

                <section>
                  <h5 className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-2">Remarks</h5>
                  <div className="p-3 bg-rose-500/5 rounded-lg text-sm text-slate-400 border border-rose-500/10">
                    {selectedCenter.remarks || "No additional remarks."}
                  </div>
                </section>

                <section>
                  <h5 className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-2">Features & Facilities</h5>
                  <div className="p-3 bg-slate-800/30 rounded-lg text-sm text-slate-300 italic border border-slate-700/30 leading-relaxed">
                    "{selectedCenter.features}"
                  </div>
                </section>

                <section className="pt-4 border-t border-slate-800">
                  <h5 className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-3">Emergency Contact</h5>
                  <div className="flex items-center gap-3 p-3 bg-cyan-500/5 border border-cyan-500/10 rounded-xl">
                    <div className="w-10 h-10 rounded-full bg-cyan-500/10 flex items-center justify-center text-cyan-400">
                      <Users className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="text-sm font-bold text-white leading-tight">{(selectedCenter.contact_person_and_number || '').split('|')[0] || selectedCenter.contact_person_and_number || 'N/A'}</div>
                      <div className="text-xs text-cyan-500 font-mono mt-0.5">{(selectedCenter.contact_person_and_number || '').split('|')[1] || ''}</div>
                    </div>
                  </div>
                </section>

                <button
                  onClick={() => {
                    const url = `https://www.google.com/maps?q=${selectedCenter.lat},${selectedCenter.lng}`;
                    window.open(url, '_blank');
                  }}
                  className="w-full py-3 bg-slate-800 hover:bg-slate-700 text-white text-xs font-bold uppercase tracking-wider rounded-xl transition-all border border-slate-700 mt-2"
                >
                  View in Google Maps
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-6 py-4 bg-slate-900/80 border-t border-slate-700/60 flex items-center justify-between gap-4">
          <p className="text-[10px] text-slate-500 font-bold uppercase tracking-[0.2em]">
            Rizal PDRRMO Internal Resource • {filteredData.length} records
          </p>
          <button
            type="button"
            onClick={onClose}
            className="px-6 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-lg text-sm font-bold transition-all border border-slate-700"
          >
            Close Console
          </button>
        </div>
      </div>
    </div>
  );
}
