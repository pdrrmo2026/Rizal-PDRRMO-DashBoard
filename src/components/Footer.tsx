import { Database } from 'lucide-react';

export default function Footer() {
  const sources = [
    "NDRRMC",
    "Rizal PDRRMO AWS",
    "PSA Census",
    "geoanalytics.georisk.gov.ph",
    "Mines and Geosciences Bureau",
    "PAGASA Flood Information",
    "PAGASA FFWS - Water Level",
    "Open-Meteo Weather API",
    "PAGASA PANaHON Network"
  ];

  return (
    <footer className="mt-auto border-t border-slate-800/50 bg-gray-950/80 backdrop-blur-md py-6 sm:py-8">
      <div className="container mx-auto px-4 lg:px-6 max-w-[1600px]">
        <div className="flex flex-col md:flex-row items-center md:items-start gap-4 md:gap-8">
          <div className="flex items-center gap-2 shrink-0 mt-1">
            <Database className="w-4 h-4 text-indigo-400" />
            <h3 className="text-sm font-semibold text-slate-300 tracking-wide uppercase">Data Sources</h3>
          </div>
          
          <div className="flex flex-wrap justify-center md:justify-start gap-2 sm:gap-3">
            {sources.map((source, index) => (
              <span 
                key={index}
                className="px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-800 text-[11px] sm:text-xs text-slate-400 hover:text-indigo-300 hover:border-indigo-500/30 transition-all duration-300 cursor-default shadow-sm"
              >
                {source}
              </span>
            ))}
          </div>
        </div>
        
        <div className="mt-8 pt-6 border-t border-slate-800/30 flex flex-col sm:flex-row items-center justify-between gap-4 text-[10px] sm:text-xs text-slate-500">
          <p>© {new Date().getFullYear()} Rizal Provincial Disaster Risk Reduction and Management Office</p>
          <p>For official monitoring use only.</p>
        </div>
      </div>
    </footer>
  );
}
