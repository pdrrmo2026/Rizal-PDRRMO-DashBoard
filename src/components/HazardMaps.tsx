import { ExternalLink, AlertTriangle } from 'lucide-react';

export default function HazardMaps() {
  return (
    <div className="flex flex-col flex-1 w-full h-[calc(100vh-140px)] rounded-xl shadow-[0_0_20px_-4px_rgba(0,0,0,0.5)] border border-slate-800 bg-slate-900 overflow-hidden relative" style={{ maxWidth: 'none' }}>
      
      {/* Warning / Open in New Tab Banner */}
      <div className="bg-slate-800/90 border-b border-slate-700 px-4 py-2.5 flex items-center justify-between z-10 shrink-0">
        <div className="flex items-center gap-2 text-amber-400">
          <AlertTriangle className="w-4 h-4 shrink-0" />
          <p className="text-xs sm:text-sm font-medium">
            If map data fails to load, GeoAnalyticsPH might be blocking embedded searches.
          </p>
        </div>
        <a
          href="https://geoanalytics.georisk.gov.ph/"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-1.5 px-3 py-1.5 bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold rounded-md transition-colors"
        >
          <span>Open Full Site</span>
          <ExternalLink className="w-3.5 h-3.5" />
        </a>
      </div>

      {/* Iframe Container */}
      <div className="flex-1 relative w-full h-full">
        <iframe
          src="https://geoanalytics.georisk.gov.ph/"
          className="absolute inset-0 w-full h-full border-0 bg-slate-900"
          title="Hazard Map"
          allowFullScreen
          referrerPolicy="strict-origin-when-cross-origin"
          allow="geolocation; clipboard-read; clipboard-write"
        />
      </div>
    </div>
  );
}

