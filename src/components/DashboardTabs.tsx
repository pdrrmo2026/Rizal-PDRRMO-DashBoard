import { CloudRain, Activity, Waves, MapPin, ChevronRight, Map, Video } from 'lucide-react';

export type DashboardTab =
  | 'weather'
  | 'earthquake'
  | 'flood-rainfall'
  | 'municipalities'
  | 'iec'
  | 'hazard-maps';

interface DashboardTabsProps {
  activeTab: DashboardTab;
  onChange: (tab: DashboardTab) => void;
}

const tabs: {
  id: DashboardTab;
  label: string;
  icon: typeof CloudRain;
  description: string;
  pinned?: boolean;
  activeBg: string;
  accentColor: string;
  iconActiveBg: string;
  iconActiveText: string;
  dotColor: string;
  glow: string;
}[] = [
  {
    id: 'weather',
    label: 'Weather Monitoring',
    icon: CloudRain,
    description: 'Rainfall · Water Levels · Forecasts',
    pinned: true,
    activeBg: 'from-cyan-500/25 via-cyan-500/10 to-blue-500/15 border-cyan-400/60',
    accentColor: 'bg-cyan-400',
    iconActiveBg: 'bg-cyan-500/30',
    iconActiveText: 'text-cyan-300',
    dotColor: 'bg-cyan-400',
    glow: 'shadow-[0_0_20px_-4px_rgba(34,211,238,0.4)]',
  },
  {
    id: 'flood-rainfall',
    label: 'Flood and Rainfall Monitoring',
    icon: Waves,
    description: 'River Levels · Rainfall Stations · Alerts',
    activeBg: 'from-blue-500/25 via-blue-500/10 to-indigo-500/15 border-blue-400/60',
    accentColor: 'bg-blue-400',
    iconActiveBg: 'bg-blue-500/30',
    iconActiveText: 'text-blue-300',
    dotColor: 'bg-blue-400',
    glow: 'shadow-[0_0_20px_-4px_rgba(96,165,250,0.4)]',
  },
  {
    id: 'hazard-maps',
    label: 'Hazard Maps',
    icon: Map,
    description: 'Liquefaction · Landslide · Flood',
    activeBg: 'from-rose-500/25 via-rose-500/10 to-pink-500/15 border-rose-400/60',
    accentColor: 'bg-rose-400',
    iconActiveBg: 'bg-rose-500/30',
    iconActiveText: 'text-rose-300',
    dotColor: 'bg-rose-400',
    glow: 'shadow-[0_0_20px_-4px_rgba(251,113,133,0.4)]',
  },
  {
    id: 'earthquake',
    label: 'Earthquake Monitoring',
    icon: Activity,
    description: 'Seismic Activity · PHIVOLCS · USGS',
    activeBg: 'from-orange-500/25 via-orange-500/10 to-red-500/15 border-orange-400/60',
    accentColor: 'bg-orange-400',
    iconActiveBg: 'bg-orange-500/30',
    iconActiveText: 'text-orange-300',
    dotColor: 'bg-orange-400',
    glow: 'shadow-[0_0_20px_-4px_rgba(251,146,60,0.4)]',
  },
  {
    id: 'municipalities',
    label: 'Municipalities',
    icon: MapPin,
    description: 'LGUs · Coverage Areas · Local Status',
    activeBg: 'from-emerald-500/25 via-emerald-500/10 to-green-500/15 border-emerald-400/60',
    accentColor: 'bg-emerald-400',
    iconActiveBg: 'bg-emerald-500/30',
    iconActiveText: 'text-emerald-300',
    dotColor: 'bg-emerald-400',
    glow: 'shadow-[0_0_20px_-4px_rgba(52,211,153,0.4)]',
  },
];
  export default function DashboardTabs({ activeTab, onChange }: DashboardTabsProps) {
  return (
    <aside className="w-full md:w-56 lg:w-64 xl:w-72 md:flex-shrink-0">
      <div className="md:sticky md:top-3 bg-gray-900/60 border border-gray-800 rounded-xl p-3 sm:p-4 backdrop-blur-md shadow-xl">
        {/* Header label */}
        <div className="flex items-center gap-2 mb-3 pb-3 border-b border-gray-800">
          <div className="w-1.5 h-5 bg-gradient-to-b from-cyan-400 to-blue-500 rounded-full" />
          <span className="text-[11px] sm:text-xs font-bold text-gray-300 uppercase tracking-wider">
            Dashboard Menu
          </span>
          <div className="ml-auto flex items-center gap-1.5">
            <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />
            <span className="text-[10px] sm:text-xs text-gray-400">Live</span>
          </div>
        </div>

        {/* VERTICAL stacked tabs */}
        <div className="flex flex-col gap-2">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => onChange(tab.id)}
                className={`group relative flex items-start gap-3 p-3 rounded-lg border-2 transition-all duration-200 text-left overflow-hidden ${
                  isActive
                    ? `bg-gradient-to-br ${tab.activeBg} ${tab.glow}`
                    : 'bg-gray-900/40 border-gray-800 text-gray-400 hover:border-gray-700 hover:text-gray-200 hover:bg-gray-900/70 hover:translate-x-0.5'
                }`}
                aria-pressed={isActive}
                aria-label={`Switch to ${tab.label}`}
              >
                {/* Left accent bar (active only) */}
                {isActive && (
                  <div
                    className={`absolute left-0 top-0 bottom-0 w-1 ${tab.accentColor}`}
                  />
                )}

                {/* Icon */}
                <div
                  className={`flex items-center justify-center w-9 h-9 sm:w-10 sm:h-10 rounded-md transition-colors flex-shrink-0 ${
                    isActive
                      ? `${tab.iconActiveBg} ${tab.iconActiveText}`
                      : 'bg-gray-800 group-hover:bg-gray-700'
                  }`}
                >
                  <Icon className="w-4 h-4 sm:w-5 sm:h-5" />
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-1.5 mb-0.5">
                    <div className="text-xs sm:text-sm font-semibold leading-tight truncate">
                      {tab.label}
                    </div>
                    {isActive && (
                      <span
                        className={`w-1.5 h-1.5 rounded-full ${tab.dotColor} animate-pulse flex-shrink-0`}
                      />
                    )}
                  </div>
                  <div className="text-[10px] sm:text-xs text-gray-500 group-hover:text-gray-400 leading-tight">
                    {tab.description}
                  </div>
                  {tab.pinned && (
                    <span
                      className={`inline-block mt-1.5 text-[9px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded ${
                        isActive
                          ? 'bg-white/15 text-white'
                          : 'bg-gray-800 text-gray-500'
                      }`}
                    >
                      📌 Pinned
                    </span>
                  )}
                </div>

                {/* Chevron */}
                <ChevronRight
                  className={`w-4 h-4 mt-2 transition-transform flex-shrink-0 ${
                    isActive
                      ? 'translate-x-0 opacity-100'
                      : '-translate-x-1 opacity-40 group-hover:translate-x-0 group-hover:opacity-70'
                  }`}
                />
              </button>
            );
          })}
        </div>
      </div>
    </aside>
  );
}
