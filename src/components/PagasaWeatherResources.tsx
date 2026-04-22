import { CloudLightning, FileText, CalendarDays, ExternalLink, Wind, Sun } from 'lucide-react';

interface ResourceLink {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  url: string;
  icon: React.ReactNode;
  accentFrom: string;
  accentTo: string;
  ringColor: string;
  badge: string;
  badgeColor: string;
  ctaLabel?: string;
}

const RESOURCES: ResourceLink[] = [
  {
    id: 'cyclone',
    title: 'Tropical Cyclone Bulletin',
    subtitle: 'Severe Weather Bulletin',
    description:
      'Official PAGASA tropical cyclone advisories — storm track, signal warnings, wind impact, and severe weather updates.',
    url: 'https://www.pagasa.dost.gov.ph/tropical-cyclone/severe-weather-bulletin',
    icon: <Wind className="w-6 h-6" />,
    accentFrom: 'from-rose-600',
    accentTo: 'to-red-700',
    ringColor: 'ring-rose-500/40',
    badge: 'PAGASA TCB',
    badgeColor: 'bg-rose-500/20 text-rose-300 border-rose-500/40',
    ctaLabel: 'OPEN BULLETIN',
  },
  {
    id: 'thunderstorm',
    title: 'Thunderstorm Advisory',
    subtitle: 'NCR-PRSD Real-time Alerts',
    description:
      'Live thunderstorm advisories, lightning alerts, and rain warnings for Metro Manila and surrounding areas.',
    url: 'https://pagasa.dost.gov.ph/regional-forecast/ncrprsd',
    icon: <CloudLightning className="w-6 h-6" />,
    accentFrom: 'from-blue-600',
    accentTo: 'to-indigo-700',
    ringColor: 'ring-blue-500/40',
    badge: 'PAGASA NCR-PRSD',
    badgeColor: 'bg-blue-500/20 text-blue-300 border-blue-500/40',
    ctaLabel: 'OPEN ADVISORY',
  },
  {
    id: 'forecast24',
    title: '24-Hour Weather Forecast',
    subtitle: 'NCR-PRSD Official Bulletin',
    description:
      'Official 24-hour weather forecast for the National Capital Region — issued by PAGASA NCR-PRSD.',
    url: 'https://pagasa.dost.gov.ph/regional-forecast/ncrprsd',
    icon: <FileText className="w-6 h-6" />,
    accentFrom: 'from-cyan-600',
    accentTo: 'to-teal-700',
    ringColor: 'ring-cyan-500/40',
    badge: 'PAGASA NCR-PRSD',
    badgeColor: 'bg-cyan-500/20 text-cyan-300 border-cyan-500/40',
    ctaLabel: 'OPEN FORECAST',
  },
  {
    id: 'outlook5d',
    title: '5-Day Regional Weather Outlook',
    subtitle: 'NCR-PRSD Extended Forecast',
    description:
      'Five-day extended weather outlook for the National Capital Region — temperature, rainfall, and conditions.',
    url: 'https://pagasa.dost.gov.ph/regional-forecast/ncrprsd',
    icon: <CalendarDays className="w-6 h-6" />,
    accentFrom: 'from-purple-600',
    accentTo: 'to-fuchsia-700',
    ringColor: 'ring-purple-500/40',
    badge: 'PAGASA NCR-PRSD',
    badgeColor: 'bg-purple-500/20 text-purple-300 border-purple-500/40',
    ctaLabel: 'OPEN OUTLOOK',
  },
  {
    id: 'climate10d',
    title: '10-Day Climate Forecast',
    subtitle: 'PAGASA Climate Prediction',
    description:
      'Ten-day climate outlook based on GFS models, providing advance notice of rainfall, temperature, and potential weather hazards across municipalities.',
    url: 'https://pagasa.dost.gov.ph/climate/climate-prediction/10-day-climate-forecast',
    icon: <Sun className="w-6 h-6" />,
    accentFrom: 'from-amber-600',
    accentTo: 'to-orange-700',
    ringColor: 'ring-amber-500/40',
    badge: 'PAGASA CLIMATE',
    badgeColor: 'bg-amber-500/20 text-amber-300 border-amber-500/40',
    ctaLabel: 'OPEN FORECAST',
  },
];

export default function PagasaWeatherResources() {
  return (
    <section className="bg-gradient-to-br from-slate-900 via-gray-900 to-slate-900 border border-slate-700/60 rounded-xl p-3 sm:p-4 md:p-6 shadow-xl">
      {/* Header */}
      <div className="flex items-start justify-between flex-wrap gap-2 sm:gap-3 mb-4 sm:mb-5">
        <div className="min-w-0 flex-1">
          <h2 className="text-base sm:text-lg md:text-xl font-bold text-white flex items-center gap-2">
            <span className="inline-block w-2 h-2 rounded-full bg-emerald-400 animate-pulse shrink-0" />
            <span className="truncate">PAGASA Weather Resources</span>
          </h2>
          <p className="text-xs sm:text-sm text-gray-400 mt-1">
            Official advisories and forecasts — direct, unblocked access to PAGASA bulletins.
          </p>
        </div>
        <span className="text-[10px] sm:text-xs px-2 sm:px-3 py-1 rounded-full bg-emerald-500/15 text-emerald-300 border border-emerald-500/30 whitespace-nowrap">
          🔓 Unblocked
        </span>
      </div>

      {/* Resource cards grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-3 sm:gap-4">
        {RESOURCES.map((resource) => (
          <a
            key={resource.id}
            href={resource.url}
            target="_blank"
            rel="noopener noreferrer"
            className={`group relative overflow-hidden rounded-xl bg-gradient-to-br ${resource.accentFrom} ${resource.accentTo} p-[1px] transition-transform hover:scale-[1.02] focus:outline-none focus:ring-2 ${resource.ringColor}`}
          >
            <div className="relative bg-gray-950/80 backdrop-blur rounded-[11px] p-3 sm:p-4 md:p-5 h-full flex flex-col">
              {/* Top row: icon + external indicator */}
              <div className="flex items-start justify-between mb-2 sm:mb-3">
                <div
                  className={`w-10 h-10 sm:w-12 sm:h-12 rounded-lg bg-gradient-to-br ${resource.accentFrom} ${resource.accentTo} flex items-center justify-center text-white shadow-lg shrink-0`}
                >
                  {resource.icon}
                </div>
                <ExternalLink className="w-4 h-4 text-gray-500 group-hover:text-white transition-colors shrink-0" />
              </div>

              {/* Title block */}
              <h3 className="text-sm sm:text-base font-bold text-white mb-1 leading-tight">{resource.title}</h3>
              <p className="text-[11px] sm:text-xs text-gray-400 mb-2 sm:mb-3">{resource.subtitle}</p>

              {/* Description */}
              <p className="text-xs sm:text-sm text-gray-300 leading-relaxed mb-3 sm:mb-4 flex-grow">{resource.description}</p>

              {/* Footer: badge + bold CTA */}
              <div className="mt-auto pt-2 sm:pt-3 border-t border-white/5 space-y-2">
                <span
                  className={`inline-block text-[9px] sm:text-[10px] uppercase tracking-wider px-2 py-1 rounded border ${resource.badgeColor}`}
                >
                  {resource.badge}
                </span>
                <div
                  className={`w-full text-center text-[11px] sm:text-xs font-bold text-white py-2 rounded-md bg-gradient-to-r ${resource.accentFrom} ${resource.accentTo} shadow-md group-hover:shadow-lg transition-shadow flex items-center justify-center gap-1.5`}
                >
                  {resource.ctaLabel ?? 'OPEN SOURCE'}
                  <span className="transition-transform group-hover:translate-x-1">→</span>
                </div>
              </div>
            </div>
          </a>
        ))}
      </div>

      {/* Footer note */}
      <div className="mt-5 pt-4 border-t border-slate-700/50 flex flex-wrap items-center justify-between gap-2 text-xs text-gray-500">
        <span>
          📡 Source: <span className="text-gray-300">PAGASA-DOST</span> • Tropical Cyclone Bulletin + NCR Philippine
          Regional Services Division (PRSD)
        </span>
        <span className="text-gray-400">All links open in a new tab • Verified unblocked URLs</span>
      </div>
    </section>
  );
}
