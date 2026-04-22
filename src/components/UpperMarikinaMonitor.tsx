import { useState } from 'react';
import { Waves, ExternalLink, RefreshCw, AlertCircle, Shield, Maximize2, Minimize2 } from 'lucide-react';

const PAGASA_FFWS_URL = 'https://pasig-marikina-tullahanffws.pagasa.dost.gov.ph/water/table.do';

export default function UpperMarikinaMonitor() {
  const [iframeKey, setIframeKey] = useState(0);
  const [iframeFailed, setIframeFailed] = useState(false);
  const [maximized, setMaximized] = useState(false);

  const handleRefresh = () => {
    setIframeFailed(false);
    setIframeKey((k) => k + 1);
  };

  return (
    <div
      className={
        maximized
          ? 'fixed inset-0 z-[100] bg-gray-900 flex flex-col'
          : 'bg-gray-900 rounded-xl sm:rounded-2xl shadow-2xl border-2 border-blue-800/40 overflow-hidden mb-4 sm:mb-8'
      }
    >
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-900 via-blue-800 to-cyan-800 p-3 sm:p-4 md:p-5 border-b-2 border-blue-600/40 shrink-0">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <div className="flex items-center gap-2 sm:gap-3 md:gap-4 min-w-0">
            <div className="bg-blue-500 p-2 sm:p-3 rounded-lg sm:rounded-xl shadow-lg ring-2 ring-blue-300/30 shrink-0">
              <Waves className="w-5 h-5 sm:w-7 sm:h-7 md:w-8 md:h-8 text-white" />
            </div>
            <div className="min-w-0">
              <h2 className="text-base sm:text-lg md:text-xl lg:text-2xl font-black text-white uppercase tracking-wider leading-tight">
                Upper Marikina River Flood Monitor
              </h2>
              <p className="text-blue-200 text-[11px] sm:text-xs md:text-sm font-medium mt-0.5 leading-snug">
                Live PAGASA FFWS Water Level Data Table
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 shrink-0 flex-wrap">
            <span className="flex items-center gap-1.5 sm:gap-2 bg-emerald-500/20 border border-emerald-400/40 text-emerald-200 px-2 sm:px-3 py-1 sm:py-1.5 rounded-lg text-[10px] sm:text-xs font-bold uppercase">
              <span className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse shrink-0" />
              Live
            </span>
            <button
              onClick={handleRefresh}
              className="flex items-center gap-1.5 sm:gap-2 bg-blue-700 hover:bg-blue-600 active:bg-blue-500 text-white px-2 sm:px-3 py-1 sm:py-1.5 rounded-lg text-[10px] sm:text-xs font-bold uppercase transition-colors min-h-[32px]"
              title="Reload PAGASA FFWS table"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              Refresh
            </button>
            <button
              onClick={() => setMaximized((m) => !m)}
              className="flex items-center gap-1.5 sm:gap-2 bg-cyan-600 hover:bg-cyan-500 active:bg-cyan-400 text-white px-2 sm:px-3 py-1 sm:py-1.5 rounded-lg text-[10px] sm:text-xs font-bold uppercase transition-colors min-h-[32px]"
              title={maximized ? 'Exit fullscreen' : 'Maximize'}
            >
              {maximized ? <Minimize2 className="w-3.5 h-3.5" /> : <Maximize2 className="w-3.5 h-3.5" />}
              {maximized ? 'Exit' : 'Maximize'}
            </button>
          </div>
        </div>
      </div>

      {/* Embedded PAGASA FFWS Table — large, scrollable, always readable */}
      <div
        className="relative bg-white w-full overflow-auto flex-1"
        style={{
          // Maximized = full viewport height minus header/footer; normal = large fixed height
          height: maximized ? undefined : 'min(82vh, 900px)',
          minHeight: maximized ? undefined : '600px',
        }}
      >
        {iframeFailed ? (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-gradient-to-br from-gray-900 to-blue-950 p-4 sm:p-6 md:p-8 text-center">
            <div className="bg-yellow-500/20 p-3 sm:p-4 rounded-full mb-3 sm:mb-4 border border-yellow-400/40">
              <AlertCircle className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 text-yellow-400" />
            </div>
            <h3 className="text-base sm:text-xl md:text-2xl font-black text-white mb-2 uppercase">
              Embed Blocked by PAGASA Server
            </h3>
            <p className="text-blue-200 text-xs sm:text-sm md:text-base max-w-2xl mb-4 sm:mb-6 leading-relaxed">
              The PAGASA FFWS server uses security headers that prevent embedding in third-party dashboards.
              Click the button below to open the live water level data table in a new tab.
            </p>
            <a
              href={PAGASA_FFWS_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 sm:gap-3 px-4 sm:px-8 md:px-10 py-3 sm:py-4 md:py-5 bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 text-white font-black text-sm sm:text-lg md:text-xl rounded-xl sm:rounded-2xl shadow-2xl shadow-blue-900/50 ring-2 ring-blue-300/40 transition-all hover:scale-105"
            >
              <Shield className="w-4 h-4 sm:w-6 sm:h-6 md:w-7 md:h-7" />
              <span className="text-center">OPEN PAGASA FFWS TABLE</span>
              <ExternalLink className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6" />
            </a>
          </div>
        ) : (
          <iframe
            id="upper-marikina-iframe"
            key={iframeKey}
            src={PAGASA_FFWS_URL}
            title="PAGASA FFWS Upper Marikina River Water Level Table"
            className="block border-0 bg-white"
            style={{
              // Render iframe at a guaranteed-readable size; container scrolls if narrower
              width: '100%',
              minWidth: '1100px',
              height: '100%',
              minHeight: maximized ? '100%' : '850px',
            }}
            sandbox="allow-scripts allow-same-origin allow-popups allow-forms"
            referrerPolicy="no-referrer-when-downgrade"
            onError={() => setIframeFailed(true)}
            onLoad={(e) => {
              try {
                const iframe = e.currentTarget as HTMLIFrameElement;
                if (
                  iframe.contentDocument &&
                  iframe.contentDocument.body &&
                  iframe.contentDocument.body.innerHTML === ''
                ) {
                  setIframeFailed(true);
                }
              } catch {
                // Cross-origin: assume it loaded successfully
              }
            }}
          />
        )}
      </div>

      {/* Footer info bar */}
      <div className="bg-gray-950 border-t border-gray-800 px-3 sm:px-4 md:px-6 py-3 sm:py-4 shrink-0">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2 sm:gap-3 text-xs sm:text-sm">
          <div className="flex items-start gap-2 text-gray-400">
            <Shield className="w-4 h-4 text-blue-400 shrink-0 mt-0.5" />
            <span className="leading-snug">
              Data source: <span className="text-blue-300 font-semibold">PAGASA FFWS</span>
              <span className="hidden sm:inline text-gray-500"> · Scroll horizontally on small screens to view full table</span>
            </span>
          </div>
          <div className="text-gray-500 text-[10px] sm:text-xs leading-snug">
            Covers:{' '}
            <span className="text-gray-300 font-medium">
              Sto. Niño · Montalban · San Mateo · Nangka · Marikina · Pasig · Tullahan
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
