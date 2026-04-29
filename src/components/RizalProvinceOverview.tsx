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
        </div>        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6 relative z-10">
          <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-4 flex items-center gap-4">
            <div className="w-10 h-10 rounded-full bg-blue-500/20 flex items-center justify-center">
              <Waves className="w-5 h-5 text-blue-400" />
            </div>
            <div>
              <p className="text-xs text-slate-400 uppercase">Flood Indicator</p>
              <p className="font-semibold text-blue-300">Moderate to High</p>
            </div>
          </div>
          <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-4 flex items-center gap-4">
            <div className="w-10 h-10 rounded-full bg-amber-500/20 flex items-center justify-center">
              <Mountain className="w-5 h-5 text-amber-400" />
            </div>
            <div>
              <p className="text-xs text-slate-400 uppercase">Landslide Indicator</p>
              <p className="font-semibold text-amber-300">High Susceptibility</p>
            </div>
          </div>
          <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-4 flex items-center gap-4">
            <div className="w-10 h-10 rounded-full bg-cyan-500/20 flex items-center justify-center">
              <CloudRain className="w-5 h-5 text-cyan-400" />
            </div>
            <div>
              <p className="text-xs text-slate-400 uppercase">Rainfall Alert</p>
              <p className="font-semibold text-cyan-300">Active Monitoring</p>
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

          {/* 6. Hazard Map Access */}
          <section className="bg-gradient-to-r from-rose-900/40 to-slate-900/60 border border-rose-500/20 rounded-xl p-6 backdrop-blur-sm shadow-lg flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              <h3 className="text-lg font-bold text-white mb-1">Deep Dive into Hazard Analytics</h3>
              <p className="text-sm text-slate-400">Access the full GeoRiskPH platform for high-resolution mapping.</p>
            </div>
            <button
              onClick={handleOpenMap}
              className="whitespace-nowrap flex items-center gap-2 px-5 py-2.5 bg-rose-600 hover:bg-rose-500 text-white rounded-lg font-semibold transition-all shadow-lg shadow-rose-900/20 active:scale-95"
            >
              <ExternalLink className="w-4 h-4" />
              Open Full Hazard Map
            </button>
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



        </div>
      </div>
    </div>
  );
}
