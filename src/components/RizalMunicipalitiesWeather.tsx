import { useState, useEffect, useCallback } from 'react';
import { RefreshCw } from 'lucide-react';

// All 14 municipalities of Rizal Province in alphabetical order
const RIZAL_MUNICIPALITIES = [
  { name: 'Angono', lat: 14.5269, lon: 121.1531, isCapital: false },
  { name: 'Antipolo City', lat: 14.5932, lon: 121.1815, isCapital: false },
  { name: 'Baras', lat: 14.5247, lon: 121.2683, isCapital: false },
  { name: 'Binangonan', lat: 14.4636, lon: 121.1936, isCapital: false },
  { name: 'Cainta', lat: 14.5786, lon: 121.1222, isCapital: false },
  { name: 'Cardona', lat: 14.4842, lon: 121.2306, isCapital: false },
  { name: 'Jala-jala', lat: 14.3508, lon: 121.3144, isCapital: false },
  { name: 'Morong', lat: 14.5167, lon: 121.2333, isCapital: false },
  { name: 'Pililla', lat: 14.4842, lon: 121.3000, isCapital: false },
  { name: 'Rodriguez (Montalban)', lat: 14.7283, lon: 121.1325, isCapital: false },
  { name: 'San Mateo', lat: 14.6964, lon: 121.1219, isCapital: false },
  { name: 'Tanay', lat: 14.4969, lon: 121.2856, isCapital: false },
  { name: 'Taytay', lat: 14.5786, lon: 121.1325, isCapital: false },
  { name: 'Teresa', lat: 14.5611, lon: 121.2150, isCapital: false },
] as const;

interface MunicipalityWeather {
  name: string;
  lat: number;
  lon: number;
  isCapital: boolean;
  temperature: number | null;
  heatIndex: number | null;
  humidity: number | null;
  precipitation: number | null;
  weatherCode: number | null;
  windSpeed: number | null;
  windDirection: number | null;
  aqi: number | null;
  pm25: number | null;
  pm10: number | null;
  loading: boolean;
  error: string | null;
}

// WMO Weather Code → human-readable condition label
function getWeatherCondition(code: number | null): { label: string; color: string; bg: string } {
  if (code === null) return { label: 'Unknown', color: 'text-gray-400', bg: 'from-gray-500/10 to-gray-600/10' };
  if (code === 0) return { label: 'Clear Sky', color: 'text-amber-300', bg: 'from-amber-500/10 to-yellow-600/10' };
  if (code <= 2) return { label: 'Partly Cloudy', color: 'text-sky-300', bg: 'from-sky-500/10 to-blue-600/10' };
  if (code === 3) return { label: 'Overcast', color: 'text-slate-300', bg: 'from-slate-500/10 to-gray-600/10' };
  if (code <= 48) return { label: 'Foggy', color: 'text-slate-300', bg: 'from-slate-500/10 to-gray-600/10' };
  if (code <= 57) return { label: 'Drizzle', color: 'text-blue-300', bg: 'from-blue-500/10 to-cyan-600/10' };
  if (code <= 67) return { label: 'Rainy', color: 'text-blue-400', bg: 'from-blue-500/15 to-indigo-600/15' };
  if (code <= 77) return { label: 'Snowy', color: 'text-cyan-200', bg: 'from-cyan-500/10 to-blue-600/10' };
  if (code <= 82) return { label: 'Rain Showers', color: 'text-blue-400', bg: 'from-blue-500/15 to-indigo-600/15' };
  if (code <= 86) return { label: 'Snow Showers', color: 'text-cyan-200', bg: 'from-cyan-500/10 to-blue-600/10' };
  if (code >= 95) return { label: 'Thunderstorm', color: 'text-purple-300', bg: 'from-purple-500/15 to-fuchsia-600/15' };
  return { label: 'Cloudy', color: 'text-gray-300', bg: 'from-gray-500/10 to-slate-600/10' };
}

function getWindDirection(deg: number | null): string {
  if (deg === null) return '—';
  const dirs = ['North', 'NorthEast', 'East', 'SouthEast', 'South', 'SouthWest', 'West', 'NorthWest'];
  return dirs[Math.round(deg / 45) % 8];
}

// Heat Index category — correct thresholds
function getHeatIndexInfo(c: number | null): { label: string; color: string; dot: string; bg: string; border: string; warning: string } {
  if (c === null) return { label: 'N/A', color: 'text-slate-400', dot: 'bg-slate-500', bg: 'bg-slate-700/30', border: 'border-slate-600/30', warning: '' };
  if (c < 33) return { label: 'Normal', color: 'text-green-400', dot: 'bg-green-500', bg: 'bg-green-900/20', border: 'border-green-500/30', warning: 'Comfortable' };
  if (c <= 41) return { label: 'Caution', color: 'text-yellow-400', dot: 'bg-yellow-400', bg: 'bg-yellow-900/20', border: 'border-yellow-500/30', warning: 'Fatigue possible' };
  if (c <= 51) return { label: 'Danger', color: 'text-orange-400', dot: 'bg-orange-500', bg: 'bg-orange-900/20', border: 'border-orange-500/30', warning: 'Heat cramps possible' };
  return { label: 'Extreme', color: 'text-red-400', dot: 'bg-red-500', bg: 'bg-red-900/20', border: 'border-red-500/30', warning: 'Heat stroke imminent' };
}

// US AQI categories (per EPA standard)
function getAirQualityInfo(aqi: number | null): { label: string; color: string; bg: string; description: string } {
  if (aqi === null) return { label: 'N/A', color: 'text-slate-400', bg: 'bg-slate-700/30', description: 'No data' };
  if (aqi <= 50) return { label: 'Good', color: 'text-emerald-300', bg: 'bg-emerald-900/30', description: 'Air quality is satisfactory' };
  if (aqi <= 100) return { label: 'Moderate', color: 'text-yellow-300', bg: 'bg-yellow-900/30', description: 'Acceptable for most' };
  if (aqi <= 150) return { label: 'Unhealthy for Sensitive', color: 'text-orange-300', bg: 'bg-orange-900/30', description: 'Sensitive groups affected' };
  if (aqi <= 200) return { label: 'Unhealthy', color: 'text-red-300', bg: 'bg-red-900/30', description: 'Everyone may be affected' };
  if (aqi <= 300) return { label: 'Very Unhealthy', color: 'text-purple-300', bg: 'bg-purple-900/30', description: 'Health alert for all' };
  return { label: 'Hazardous', color: 'text-red-200', bg: 'bg-red-950/50', description: 'Health emergency' };
}

function getRainfallStyle(mm: number | null): { border: string; glow: string; label: string } {
  if (mm === null || mm === 0) return { border: 'border-emerald-500/20', glow: '', label: 'None' };
  if (mm < 2.5) return { border: 'border-yellow-400/40', glow: '', label: 'Light' };
  if (mm < 7.5) return { border: 'border-orange-400/50', glow: '', label: 'Moderate' };
  return { border: 'border-red-500/60', glow: 'shadow-[0_0_20px_rgba(239,68,68,0.3)] animate-pulse', label: 'Heavy' };
}

export default function RizalMunicipalitiesWeather() {
  const [municipalities, setMunicipalities] = useState<MunicipalityWeather[]>(
    RIZAL_MUNICIPALITIES.map((m) => ({
      ...m,
      temperature: null,
      heatIndex: null,
      humidity: null,
      precipitation: null,
      weatherCode: null,
      windSpeed: null,
      windDirection: null,
      aqi: null,
      pm25: null,
      pm10: null,
      loading: true,
      error: null,
    }))
  );
  const [lastUpdate, setLastUpdate] = useState<Date | null>(null);
  const [refreshing, setRefreshing] = useState(false);
  const [countdown, setCountdown] = useState(300);

  const fetchWeather = useCallback(async () => {
    setRefreshing(true);
    try {
      const lats = RIZAL_MUNICIPALITIES.map((m) => m.lat).join(',');
      const lons = RIZAL_MUNICIPALITIES.map((m) => m.lon).join(',');

      // Weather API (Open-Meteo Forecast)
      const weatherUrl = `https://api.open-meteo.com/v1/forecast?latitude=${lats}&longitude=${lons}&current=temperature_2m,relative_humidity_2m,apparent_temperature,precipitation,weather_code,wind_speed_10m,wind_direction_10m&timezone=Asia/Manila`;

      // Air Quality API (Open-Meteo Air Quality)
      const aqiUrl = `https://air-quality-api.open-meteo.com/v1/air-quality?latitude=${lats}&longitude=${lons}&current=us_aqi,pm10,pm2_5&timezone=Asia/Manila`;

      // Fetch both in parallel
      const [weatherRes, aqiRes] = await Promise.allSettled([
        fetch(weatherUrl).then((r) => (r.ok ? r.json() : Promise.reject(`HTTP ${r.status}`))),
        fetch(aqiUrl).then((r) => (r.ok ? r.json() : Promise.reject(`HTTP ${r.status}`))),
      ]);

      const weatherData = weatherRes.status === 'fulfilled' ? weatherRes.value : null;
      const aqiData = aqiRes.status === 'fulfilled' ? aqiRes.value : null;

      const weatherResults = weatherData ? (Array.isArray(weatherData) ? weatherData : [weatherData]) : [];
      const aqiResults = aqiData ? (Array.isArray(aqiData) ? aqiData : [aqiData]) : [];

      const updated = RIZAL_MUNICIPALITIES.map((m, idx) => {
        const w = weatherResults[idx];
        const a = aqiResults[idx];
        if (!w || !w.current) {
          return {
            ...m,
            temperature: null,
            heatIndex: null,
            humidity: null,
            precipitation: null,
            weatherCode: null,
            windSpeed: null,
            windDirection: null,
            aqi: null,
            pm25: null,
            pm10: null,
            loading: false,
            error: 'No data',
          };
        }
        return {
          ...m,
          temperature: w.current.temperature_2m ?? null,
          heatIndex: w.current.apparent_temperature ?? null,
          humidity: w.current.relative_humidity_2m ?? null,
          precipitation: w.current.precipitation ?? 0,
          weatherCode: w.current.weather_code ?? null,
          windSpeed: w.current.wind_speed_10m ?? null,
          windDirection: w.current.wind_direction_10m ?? null,
          aqi: a?.current?.us_aqi ?? null,
          pm25: a?.current?.pm2_5 ?? null,
          pm10: a?.current?.pm10 ?? null,
          loading: false,
          error: null,
        };
      });

      setMunicipalities(updated);
      setLastUpdate(new Date());
      setCountdown(300);
    } catch (err) {
      console.error('Failed to fetch Rizal weather:', err);
      setMunicipalities((prev) =>
        prev.map((m) => ({ ...m, loading: false, error: m.temperature === null ? 'Connection error' : null }))
      );
    } finally {
      setRefreshing(false);
    }
  }, []);

  useEffect(() => {
    fetchWeather();
    const interval = setInterval(fetchWeather, 5 * 60 * 1000);
    return () => clearInterval(interval);
  }, [fetchWeather]);

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown((prev) => (prev > 0 ? prev - 1 : 300));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="bg-gradient-to-br from-emerald-950/30 via-slate-900 to-teal-950/30 border border-emerald-500/30 rounded-xl overflow-hidden shadow-xl">
      {/* Header */}
      <div className="bg-gradient-to-r from-emerald-900/60 via-green-900/40 to-teal-900/60 border-b border-emerald-500/30 px-3 sm:px-5 py-3 sm:py-4">
        <div className="flex flex-wrap items-center justify-between gap-2 sm:gap-3">
          <div className="min-w-0">
            <h2 className="text-sm sm:text-base lg:text-lg font-bold text-white truncate">
              Rizal Province Municipalities Weather
            </h2>
            <p className="text-[10px] sm:text-xs text-emerald-200/80 truncate">
              Temperature • Heat Index • Air Quality • All 14 municipalities • Open-Meteo API
            </p>
          </div>
          <div className="flex items-center gap-2">
            <div className="hidden sm:flex items-center gap-1.5 px-2 py-1 bg-emerald-500/20 border border-emerald-500/40 rounded-md">
              <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-pulse" />
              <span className="text-[10px] font-semibold text-emerald-300">LIVE</span>
            </div>
            <div className="hidden md:flex items-center px-2 py-1 bg-slate-800/60 border border-slate-600/50 rounded-md text-[10px] font-mono text-slate-300">
              AUTO 5MIN · {Math.floor(countdown / 60)}:{(countdown % 60).toString().padStart(2, '0')}
            </div>
            <button
              onClick={fetchWeather}
              disabled={refreshing}
              className="flex items-center gap-1 px-2 sm:px-2.5 py-1.5 bg-emerald-600 hover:bg-emerald-500 disabled:opacity-50 text-white text-[11px] sm:text-xs font-semibold rounded-md transition-colors"
              title="Refresh weather"
            >
              <RefreshCw className={`w-3 h-3 sm:w-3.5 sm:h-3.5 ${refreshing ? 'animate-spin' : ''}`} />
              <span className="hidden sm:inline">Refresh</span>
            </button>
          </div>
        </div>
      </div>

      {/* Heat Index Legend — compact horizontal bar */}
      <div className="mx-3 sm:mx-4 mt-3 px-3 py-2 bg-slate-900/70 border border-slate-700/50 rounded-lg flex flex-wrap items-center gap-x-4 gap-y-1.5">
        <span className="text-[10px] sm:text-[11px] font-bold text-white uppercase tracking-wider whitespace-nowrap">Heat Index:</span>
        <div className="flex flex-wrap items-center gap-x-4 gap-y-1">
          <span className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-green-500 flex-shrink-0" />
            <span className="text-[10px] sm:text-[11px] text-green-400 font-medium whitespace-nowrap">Normal (&lt;33°C)</span>
          </span>
          <span className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-yellow-400 flex-shrink-0" />
            <span className="text-[10px] sm:text-[11px] text-yellow-400 font-medium whitespace-nowrap">Caution (33–41°C)</span>
          </span>
          <span className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-orange-500 flex-shrink-0" />
            <span className="text-[10px] sm:text-[11px] text-orange-400 font-medium whitespace-nowrap">Danger (42–51°C)</span>
          </span>
          <span className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-red-500 animate-pulse flex-shrink-0" />
            <span className="text-[10px] sm:text-[11px] text-red-400 font-medium whitespace-nowrap">Extreme (52°C+)</span>
          </span>
        </div>
      </div>

      {/* Municipality Cards Grid */}
      <div className="p-3 sm:p-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2.5 sm:gap-3">
          {municipalities.map((m) => {
            const condition = getWeatherCondition(m.weatherCode);
            const heat = getHeatIndexInfo(m.heatIndex);
            const air = getAirQualityInfo(m.aqi);
            const rain = getRainfallStyle(m.precipitation);

            return (
              <div
                key={m.name}
                className={`bg-gradient-to-br ${condition.bg} border ${rain.border} ${rain.glow} rounded-lg overflow-hidden transition-all hover:scale-[1.02] hover:shadow-lg`}
              >
                {/* Card Header — Municipality Name + Capital Label */}
                <div className="px-3 py-2 bg-slate-900/60 border-b border-slate-700/40 flex items-center justify-between gap-2">
                  <div className="min-w-0">
                    <h3 className="text-xs sm:text-sm font-bold text-white truncate">{m.name}</h3>

                  </div>
                  <span className={`text-[9px] sm:text-[10px] font-semibold ${condition.color} bg-slate-900/60 px-2 py-0.5 rounded`}>
                    {condition.label}
                  </span>
                </div>

                {/* Card Body */}
                {m.loading ? (
                  <div className="p-4 flex items-center justify-center">
                    <RefreshCw className="w-4 h-4 text-slate-500 animate-spin" />
                  </div>
                ) : m.error ? (
                  <div className="p-3 text-center">
                    <p className="text-[10px] text-red-400">{m.error}</p>
                  </div>
                ) : (
                  <div className="p-2.5 sm:p-3 space-y-2">
                    {/* Temperature - large */}
                    <div className="bg-slate-900/40 rounded-md px-2.5 py-2">
                      <div className="text-[9px] uppercase tracking-wider text-slate-400 font-semibold mb-0.5">Temperature</div>
                      <div className="flex items-baseline gap-1">
                        <span className="text-2xl sm:text-3xl font-bold text-white">{m.temperature?.toFixed(1)}°</span>
                        <span className="text-[10px] text-slate-400">Celsius</span>
                      </div>
                    </div>

                    {/* Heat Index */}
                    <div className={`${heat.bg} border ${heat.border} rounded-md px-2.5 py-1.5`}>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-1.5">
                          <span className={`w-2.5 h-2.5 rounded-full flex-shrink-0 ${heat.dot} ${heat.label === 'Extreme' ? 'animate-pulse' : ''}`} />
                          <div>
                            <div className="text-[9px] uppercase tracking-wider text-slate-400 font-semibold">Heat Index</div>
                            <div className={`text-sm sm:text-base font-bold ${heat.color}`}>{m.heatIndex?.toFixed(1)}°C</div>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className={`text-[10px] font-bold ${heat.color}`}>{heat.label}</div>
                          <div className="text-[8px] text-slate-400 truncate max-w-[80px]">{heat.warning}</div>
                        </div>
                      </div>
                    </div>

                    {/* Air Quality */}
                    <div className={`${air.bg} border border-slate-700/40 rounded-md px-2.5 py-1.5`}>
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="text-[9px] uppercase tracking-wider text-slate-400 font-semibold">Air Quality</div>
                          <div className="text-sm sm:text-base font-bold text-white">
                            {m.aqi !== null ? `AQI ${m.aqi}` : '—'}
                          </div>
                        </div>
                        <div className="text-right">
                          <div className={`text-[10px] font-bold ${air.color} leading-tight`}>{air.label}</div>
                          {m.pm25 !== null && (
                            <div className="text-[8px] text-slate-400">
                              PM2.5: {m.pm25.toFixed(1)}µg/m³
                            </div>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Compact stats: Humidity / Wind / Rainfall */}
                    <div className="grid grid-cols-3 gap-1.5">
                      <div className="bg-slate-900/50 rounded px-1.5 py-1.5 text-center">
                        <div className="text-[8px] text-cyan-300 uppercase font-semibold tracking-wider">Humidity</div>
                        <div className="text-[11px] sm:text-xs font-bold text-white">{m.humidity}%</div>
                      </div>
                      <div className="bg-slate-900/50 rounded px-1.5 py-1.5 text-center">
                        <div className="text-[8px] text-slate-300 uppercase font-semibold tracking-wider">Wind</div>
                        <div className="text-[11px] sm:text-xs font-bold text-white">
                          {m.windSpeed?.toFixed(0)}<span className="text-[8px] text-slate-400 ml-0.5">km/h</span>
                        </div>
                        <div className="text-[8px] text-slate-400 truncate">{getWindDirection(m.windDirection)}</div>
                      </div>
                      <div className="bg-slate-900/50 rounded px-1.5 py-1.5 text-center">
                        <div className="text-[8px] text-blue-300 uppercase font-semibold tracking-wider">Rainfall</div>
                        <div
                          className={`text-[11px] sm:text-xs font-bold ${(m.precipitation ?? 0) > 7.5
                              ? 'text-red-400'
                              : (m.precipitation ?? 0) > 2.5
                                ? 'text-orange-300'
                                : (m.precipitation ?? 0) > 0
                                  ? 'text-yellow-300'
                                  : 'text-white'
                            }`}
                        >
                          {(m.precipitation ?? 0).toFixed(1)}<span className="text-[8px] text-slate-400 ml-0.5">mm</span>
                        </div>
                        <div className="text-[8px] text-slate-400">{rain.label}</div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Footer */}
      <div className="px-3 sm:px-5 py-2 sm:py-2.5 bg-slate-900/70 border-t border-emerald-500/20 flex flex-wrap items-center justify-between gap-1.5 text-[10px] sm:text-[11px]">
        <div className="text-slate-400">
          Source: <span className="text-emerald-300 font-semibold">Open-Meteo Weather + Air Quality API</span> • Updates every 5 minutes
        </div>
        {lastUpdate && (
          <div className="text-slate-500">
            Last update: <span className="text-slate-300">{lastUpdate.toLocaleTimeString('en-PH')}</span>
          </div>
        )}
      </div>
    </section>
  );
}
