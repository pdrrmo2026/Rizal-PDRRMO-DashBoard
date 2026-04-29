import { useState } from 'react';
import { Map as MapIcon, X, Maximize } from 'lucide-react';

export default function HazardMaps() {
  const [isMapOpen, setIsMapOpen] = useState(false);

  return (
    <>
      <div className="flex flex-col h-[calc(100vh-140px)] rounded-xl border border-rose-500/20 bg-slate-900/60 backdrop-blur-md overflow-hidden relative shadow-2xl">
        <div className="flex-1 flex flex-col items-center justify-center p-8 text-center animate-in fade-in duration-500">
          <div className="w-20 h-20 bg-rose-500/10 rounded-full flex items-center justify-center mb-6 shadow-[0_0_30px_-5px_rgba(251,113,133,0.3)]">
            <MapIcon className="w-10 h-10 text-rose-400" />
          </div>

          <h3 className="text-2xl font-bold text-white mb-3">
            Hazard Map Viewer
          </h3>

          <p className="text-slate-400 text-base max-w-md mb-8 leading-relaxed">
            The hazard map opens in a full-screen pop-up window within the dashboard to provide you with the official GeoRiskPH platform without leaving the app.
          </p>

          <button
            onClick={() => setIsMapOpen(true)}
            title="Opens official GeoRiskPH map"
            className="group flex items-center gap-2 px-6 py-3 bg-rose-600 hover:bg-rose-500 text-white rounded-lg font-semibold transition-all shadow-lg shadow-rose-900/50 hover:shadow-rose-900/80 active:scale-95"
          >
            <Maximize className="w-5 h-5 group-hover:scale-110 transition-transform" />
            <span>Open Full Hazard Map</span>
          </button>
        </div>
      </div>

      {isMapOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 animate-in fade-in zoom-in-95 duration-200">
          <div className="relative w-full h-full max-w-[1920px] bg-slate-900 rounded-xl overflow-hidden shadow-2xl border border-slate-700 flex flex-col">
            <div className="flex items-center justify-between px-4 py-3 bg-slate-950 border-b border-slate-800">
              <div className="flex items-center gap-2">
                <MapIcon className="w-5 h-5 text-rose-500" />
                <h3 className="text-white font-semibold">GeoRiskPH Hazard Map</h3>
              </div>
              <button
                onClick={() => setIsMapOpen(false)}
                className="p-1.5 rounded-lg bg-slate-800 text-slate-400 hover:text-white hover:bg-slate-700 transition-colors"
                title="Close map"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="flex-1 w-full h-full relative bg-white">
              <iframe
                src="https://geoanalytics.georisk.gov.ph/"
                title="GeoRiskPH Hazard Map"
                className="absolute inset-0 w-full h-full border-0"
                allow="geolocation"
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
}
