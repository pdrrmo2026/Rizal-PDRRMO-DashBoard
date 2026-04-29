import { ExternalLink, Map as MapIcon } from 'lucide-react';

export default function HazardMaps() {
  const handleOpenMap = () => {
    const width = Math.round(window.screen.width * 0.95);
    const height = Math.round(window.screen.height * 0.95);
    const left = Math.round((window.screen.width - width) / 2);
    const top = Math.round((window.screen.height - height) / 2);
    window.open(
      'https://geoanalytics.georisk.gov.ph/',
      'HazardMapPopup',
      `popup=yes,width=${width},height=${height},left=${left},top=${top}`
    );
  };

  return (
    <div className="flex flex-col h-[calc(100vh-140px)] rounded-xl border border-rose-500/20 bg-slate-900/60 backdrop-blur-md overflow-hidden relative shadow-2xl">
      <div className="flex-1 flex flex-col items-center justify-center p-8 text-center animate-in fade-in duration-500">
        <div className="w-20 h-20 bg-rose-500/10 rounded-full flex items-center justify-center mb-6 shadow-[0_0_30px_-5px_rgba(251,113,133,0.3)]">
          <MapIcon className="w-10 h-10 text-rose-400" />
        </div>

        <h3 className="text-2xl font-bold text-white mb-3">
          Hazard Map Viewer
        </h3>

        <p className="text-slate-400 text-base max-w-md mb-8 leading-relaxed">
          The hazard map opens in a pop-up window to provide you with the full functionality and tools of the official GeoRiskPH platform without embedding restrictions.
        </p>

        <button
          onClick={handleOpenMap}
          title="Opens official GeoRiskPH map"
          className="group flex items-center gap-2 px-6 py-3 bg-rose-600 hover:bg-rose-500 text-white rounded-lg font-semibold transition-all shadow-lg shadow-rose-900/50 hover:shadow-rose-900/80 active:scale-95"
        >
          <ExternalLink className="w-5 h-5 group-hover:rotate-12 transition-transform" />
          <span>Open Full Hazard Map</span>
        </button>
      </div>
    </div>
  );
}
