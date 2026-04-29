import {
  AlertTriangle,
  Map,
  Mountain,
  Waves,
  CloudRain,
  Users,
  Home,
  ExternalLink,
  Clock,
  ShieldAlert,
  MapPin,
  Info
} from 'lucide-react';

export default function RizalProvinceOverview() {
  const handleOpenMap = () => {
    window.open('https://geoanalytics.georisk.gov.ph/', '_blank');
  };

  return (
    <div className="space-y-6 pb-8">
      {/* 1. Rizal Risk Snapshot (Top Banner) */}
      <section className="bg-slate-900/80 border border-slate-700/50 rounded-xl p-6 shadow-xl relative overflow-hidden backdrop-blur-sm">
        <div className="absolute top-0 right-0 w-64 h-64 bg-rose-500/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>

        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 relative z-10">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <ShieldAlert className="w-8 h-8 text-rose-500" />
              <h2 className="text-2xl font-bold text-white">Province Snapshots</h2>
            </div>
            <p className="text-slate-400">Current overall susceptibility and threat level for Rizal Province</p>
          </div>

          <div className="flex items-center gap-4">
            <div className="bg-slate-950/50 border border-rose-500/30 rounded-lg px-6 py-3 text-center">
              <span className="block text-xs text-slate-400 uppercase tracking-wider mb-1">Overall Status</span>
              <span className="text-xl font-bold text-rose-400 animate-pulse">HIGH RISK</span>
            </div>
          </div>
        </div>

      </section>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

        {/* Left Column (Wider) */}
        <div className="lg:col-span-2 space-y-6">

          {/* 3. Hotspot Municipalities */}
          <section className="bg-slate-900/60 border border-slate-800 rounded-xl p-5 backdrop-blur-sm shadow-lg">
            <div className="flex items-center gap-2 mb-4">
              <MapPin className="w-5 h-5 text-emerald-400" />
              <h3 className="text-lg font-bold text-white">Hotspots</h3>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {[
                { name: 'San Mateo', risk: 'High', reason: 'Flood-prone, River proximity', color: 'text-rose-400', bg: 'bg-rose-500/10', border: 'border-rose-500/20' },
                { name: 'Rodriguez', risk: 'High', reason: 'Flashfloods, Landslides', color: 'text-rose-400', bg: 'bg-rose-500/10', border: 'border-rose-500/20' },
                { name: 'Antipolo', risk: 'Moderate-High', reason: 'Rain-induced landslides', color: 'text-amber-400', bg: 'bg-amber-500/10', border: 'border-amber-500/20' },
                { name: 'Cainta', risk: 'High', reason: 'Low elevation, Urban flooding', color: 'text-rose-400', bg: 'bg-rose-500/10', border: 'border-rose-500/20' },
                { name: 'Taytay', risk: 'High', reason: 'Lakeshore flooding', color: 'text-rose-400', bg: 'bg-rose-500/10', border: 'border-rose-500/20' },
                { name: 'Tanay', risk: 'Moderate', reason: 'Mountainous slopes', color: 'text-amber-400', bg: 'bg-amber-500/10', border: 'border-amber-500/20' },
              ].map((muni) => (
                <div key={muni.name} className={`flex items-start justify-between p-3 rounded-lg border ${muni.bg} ${muni.border}`}>
                  <div>
                    <h4 className="font-semibold text-slate-200">{muni.name}</h4>
                    <p className="text-xs text-slate-400 mt-0.5">{muni.reason}</p>
                  </div>
                  <span className={`text-xs font-bold px-2 py-1 rounded bg-slate-900/50 ${muni.color}`}>
                    {muni.risk}
                  </span>
                </div>
              ))}
            </div>
          </section>

          {/* 4. Exposure Overview */}
          <section className="bg-slate-900/60 border border-slate-800 rounded-xl p-5 backdrop-blur-sm shadow-lg">
            <div className="flex items-center gap-2 mb-4">
              <Users className="w-5 h-5 text-indigo-400" />
              <h3 className="text-lg font-bold text-white">Exposure Overview</h3>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              <div className="bg-slate-950/50 border border-slate-800 rounded-lg p-4 text-center">
                <Waves className="w-6 h-6 text-blue-400 mx-auto mb-2 opacity-80" />
                <p className="text-2xl font-bold text-white">12+</p>
                <p className="text-[10px] text-slate-400 uppercase tracking-wide mt-1">Flood-Prone Areas</p>
              </div>
              <div className="bg-slate-950/50 border border-slate-800 rounded-lg p-4 text-center">
                <Mountain className="w-6 h-6 text-amber-400 mx-auto mb-2 opacity-80" />
                <p className="text-2xl font-bold text-white">8+</p>
                <p className="text-[10px] text-slate-400 uppercase tracking-wide mt-1">Landslide Zones</p>
              </div>
              <div className="bg-slate-950/50 border border-slate-800 rounded-lg p-4 text-center">
                <Home className="w-6 h-6 text-emerald-400 mx-auto mb-2 opacity-80" />
                <p className="text-2xl font-bold text-white">189</p>
                <p className="text-[10px] text-slate-400 uppercase tracking-wide mt-1">Total Barangays</p>
              </div>
              <div className="bg-slate-950/50 border border-slate-800 rounded-lg p-4 text-center">
                <Users className="w-6 h-6 text-purple-400 mx-auto mb-2 opacity-80" />
                <p className="text-2xl font-bold text-white">3,416,541</p>
                <p className="text-[10px] text-slate-400 uppercase tracking-wide mt-1">Est. Population</p>
              </div>
            </div>
          </section>


        </div>

        {/* Right Column (Narrower) */}
        <div className="space-y-6">

          {/* 2. Why Rizal is High-Risk */}
          <section className="bg-slate-900/60 border border-slate-800 rounded-xl p-5 backdrop-blur-sm shadow-lg">
            <div className="flex items-center gap-2 mb-4">
              <Info className="w-5 h-5 text-cyan-400" />
              <h3 className="text-lg font-bold text-white">Geographic Context</h3>
            </div>

            <div className="space-y-4">
              <div className="flex gap-3 items-start">
                <div className="mt-0.5 p-1.5 bg-slate-800 rounded-md text-amber-400">
                  <Mountain className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-slate-200">Sierra Madre Foothills</h4>
                  <p className="text-xs text-slate-400 mt-1 leading-relaxed">Eastern municipalities are situated on mountain slopes, highly vulnerable to rain-induced landslides.</p>
                </div>
              </div>
              <div className="flex gap-3 items-start">
                <div className="mt-0.5 p-1.5 bg-slate-800 rounded-md text-blue-400">
                  <Waves className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-slate-200">Laguna de Bay Catchment</h4>
                  <p className="text-xs text-slate-400 mt-1 leading-relaxed">Low-lying western towns act as catch basins for water draining into the lake, causing prolonged flooding.</p>
                </div>
              </div>
              <div className="flex gap-3 items-start">
                <div className="mt-0.5 p-1.5 bg-slate-800 rounded-md text-cyan-400">
                  <CloudRain className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-slate-200">Marikina River Basin</h4>
                  <p className="text-xs text-slate-400 mt-1 leading-relaxed">Upstream river systems rapidly swell during typhoons, causing flash floods in valley regions.</p>
                </div>
              </div>
            </div>
          </section>

          {/* 5. Incident / Alert Feed */}
          <section className="bg-slate-900/60 border border-slate-800 rounded-xl p-5 backdrop-blur-sm shadow-lg h-[340px] flex flex-col">
            <div className="flex items-center gap-2 mb-4 shrink-0">
              <AlertTriangle className="w-5 h-5 text-rose-400" />
              <h3 className="text-lg font-bold text-white">Recent Alerts</h3>
            </div>

            <div className="flex-1 overflow-y-auto pr-2 space-y-3 custom-scrollbar">
              {[
                { time: '10 mins ago', type: 'Flood Alert', desc: 'Marikina River water level rising rapidly. Level 2 Warning.', color: 'text-rose-400', bg: 'bg-rose-500/10' },
                { time: '1 hour ago', type: 'Rainfall Advisory', desc: 'Heavy continuous rainfall observed in Antipolo and higher elevations.', color: 'text-cyan-400', bg: 'bg-cyan-500/10' },
                { time: '3 hours ago', type: 'Landslide Watch', desc: 'Saturated soil in eastern municipalities. Evacuation standby.', color: 'text-amber-400', bg: 'bg-amber-500/10' },
                { time: '5 hours ago', type: 'Weather Update', desc: 'Typhoon signal #2 raised over Rizal Province.', color: 'text-blue-400', bg: 'bg-blue-500/10' },
              ].map((alert, i) => (
                <div key={i} className="flex gap-3 group relative">
                  <div className="flex flex-col items-center">
                    <div className={`w-2 h-2 rounded-full mt-1.5 ring-2 ring-slate-900 ${alert.bg.replace('/10', '')} shadow-[0_0_8px_rgba(0,0,0,0.5)]`} />
                    {i !== 3 && <div className="w-px h-full bg-slate-700/50 mt-2" />}
                  </div>
                  <div className="pb-3 flex-1">
                    <div className="flex items-center justify-between mb-0.5">
                      <span className={`text-xs font-bold ${alert.color}`}>{alert.type}</span>
                      <span className="text-[10px] text-slate-500 flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {alert.time}
                      </span>
                    </div>
                    <p className="text-xs text-slate-300 leading-snug">{alert.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

        </div>
      </div>
    </div>
  );
}
