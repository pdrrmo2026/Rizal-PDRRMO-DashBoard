import { Satellite, ExternalLink } from 'lucide-react';

export default function WeatherLinkEmbed() {
  return (
    <section className="bg-gradient-to-br from-slate-900 via-cyan-950/30 to-slate-900 border border-cyan-700/40 rounded-xl overflow-hidden shadow-lg">
      {/* Header */}
      <div className="px-3 sm:px-4 md:px-5 py-2 sm:py-3 border-b border-cyan-700/40 bg-gradient-to-r from-cyan-900/40 to-sky-900/40 flex items-center justify-between gap-2">
        <div className="flex items-center gap-2 sm:gap-3 min-w-0">
          <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg bg-cyan-600/30 border border-cyan-500/40 flex items-center justify-center shrink-0">
            <Satellite className="w-4 h-4 sm:w-5 sm:h-5 text-cyan-300" />
          </div>
          <div className="min-w-0">
            <h2 className="text-sm sm:text-base md:text-lg font-bold text-white tracking-wide truncate">
              WeatherLink Live Station
            </h2>
            <p className="text-[10px] sm:text-xs text-cyan-200/80 truncate">
              Real-time on-site weather instrumentation
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 sm:gap-3 shrink-0">
          <span className="hidden md:flex items-center gap-2 text-xs text-emerald-300">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            LIVE
          </span>
          <a
            href="https://www.weatherlink.com/embeddablePage/show/3406b0169e2f422bae9a2f9071d4075b/signature"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 px-2 sm:px-3 py-1.5 bg-cyan-600 hover:bg-cyan-500 active:bg-cyan-700 text-white text-[11px] sm:text-xs font-semibold rounded-md transition-colors min-h-[32px]"
          >
            Open
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>

      {/* Embed body — signature banner spec (760x200) */}
      <div className="p-3 sm:p-4 md:p-6 bg-slate-950/60">
        <div className="w-full mx-auto" style={{ maxWidth: '760px' }}>
          <iframe
            src="https://www.weatherlink.com/embeddablePage/show/3406b0169e2f422bae9a2f9071d4075b/signature"
            className="w-full block"
            style={{
              height: '200px',
              border: 'none',
              borderRadius: '12px',
              overflow: 'hidden',
            }}
            frameBorder={0}
            scrolling="no"
            title="WeatherLink Live Station"
            loading="lazy"
          />
        </div>
      </div>

      {/* Footer */}
      <div className="px-3 sm:px-5 py-2 border-t border-cyan-700/30 bg-slate-900/60 text-center">
        <p className="text-[10px] sm:text-[11px] text-slate-400 leading-snug">
          Live data via <span className="text-cyan-300 font-semibold">WeatherLink</span>{' '}
          (Davis Instruments) — on-site weather station feed
        </p>
      </div>
    </section>
  );
}
