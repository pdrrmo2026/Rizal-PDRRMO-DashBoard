import { useState, useEffect, useCallback } from 'react';
import { 
  STATIONS, 
  fetchAllStationsWeather, 
  simulateWaterLevel, 
  getAlertStatus,
  StationLocation,
  WeatherData
} from './services/weatherService';
import Header from './components/Header';
import AlertBanner from './components/AlertBanner';
import AlertLevels from './components/AlertLevels';
import PagasaBulletin from './components/PagasaBulletin';

import UpperMarikinaMonitor from './components/UpperMarikinaMonitor';
import CriticalAlarmBanner from './components/CriticalAlarmBanner';
import PagasaWeatherResources from './components/PagasaWeatherResources';
import RizalMunicipalitiesWeather from './components/RizalMunicipalitiesWeather';
import MaghandaVideos from './components/MaghandaVideos';
import WeatherLinkEmbed from './components/WeatherLinkEmbed';

import DashboardTabs, { DashboardTab } from './components/DashboardTabs';
import EarthquakeMonitoring from './components/EarthquakeMonitoring';
import RizalMunicipalitiesDistricts from './components/RizalMunicipalitiesDistricts';
import HazardMaps from './components/HazardMaps';
import IECPosters from './components/IECPosters';
import { Video, Image } from 'lucide-react';

import Footer from './components/Footer';

interface StationData {
  station: StationLocation;
  weather: WeatherData | null;
  waterLevel: number;
  alertStatus: ReturnType<typeof getAlertStatus>;
  loading: boolean;
  error: string | null;
}

function App() {
  const [stationData, setStationData] = useState<StationData[]>([]);
  const [isLive, setIsLive] = useState(true);
  const [lastUpdate, setLastUpdate] = useState<Date>(new Date());
  const [, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<DashboardTab>('weather');
  const [iecSubTab, setIecSubTab] = useState<'videos' | 'posters'>('videos');

  const fetchData = useCallback(async () => {
    setLoading(true);
    setError(null);
    
    try {
      // Fetch weather data for all stations
      const weatherMap = await fetchAllStationsWeather();
      
      // Process station data
      const newStationData: StationData[] = STATIONS.map((station) => {
        const key = `${station.lat.toFixed(4)},${station.lon.toFixed(4)}`;
        const weather = weatherMap.get(key) || null;
        const rainfall = weather?.precipitation || 0;
        const waterLevel = simulateWaterLevel(station, rainfall);
        const alertStatus = getAlertStatus(
          waterLevel,
          station.alertLevel,
          station.alarmLevel,
          station.criticalLevel
        );
        
        return {
          station,
          weather,
          waterLevel,
          alertStatus,
          loading: false,
          error: null,
        };
      });
      
      setStationData(newStationData);
      setLastUpdate(new Date());
    } catch (err) {
      setError('Failed to fetch weather data. Please check your internet connection.');
      console.error('Error fetching data:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  // Initial data fetch
  useEffect(() => {
    fetchData();
  }, [fetchData]);

  // Auto-refresh every 5 minutes
  useEffect(() => {
    if (!isLive) return;
    
    const interval = setInterval(fetchData, 5 * 60 * 1000);
    return () => clearInterval(interval);
  }, [isLive, fetchData]);



  // Get highest alert status across all stations
  const getSystemAlertStatus = () => {
    if (stationData.length === 0) return { status: 'normal' as const, color: 'green' };
    
    const statuses = stationData.map(d => d.alertStatus.status);
    if (statuses.includes('critical')) return { status: 'critical' as const, color: 'red' };
    if (statuses.includes('alarm')) return { status: 'alarm' as const, color: 'orange' };
    if (statuses.includes('alert')) return { status: 'alert' as const, color: 'yellow' };
    return { status: 'normal' as const, color: 'green' };
  };

  const systemAlert = getSystemAlertStatus();

  // Identify stations currently at CRITICAL level for the audible alarm
  const criticalStationNames = stationData
    .filter((d) => d.alertStatus.status === 'critical')
    .map((d) => d.station.name);
  const isCritical = criticalStationNames.length > 0;

  return (
    <div className="min-h-screen bg-gray-950 text-gray-100">
      <CriticalAlarmBanner
        isCritical={isCritical}
        criticalStations={criticalStationNames}
      />


      <Header 
        isLive={isLive} 
        onToggleLive={() => setIsLive(!isLive)} 
        onRefresh={fetchData}
        lastUpdate={lastUpdate}
      />

      {activeTab === 'weather' && (
        <AlertBanner 
          status={systemAlert.status} 
          stationCount={stationData.filter(d => d.alertStatus.status !== 'normal').length}
          totalStations={STATIONS.length}
        />
      )}
      
      <div className="container mx-auto px-3 sm:px-4 lg:px-6 py-4 sm:py-6 max-w-[1600px]">
        <div className="flex flex-col md:flex-row gap-4 sm:gap-6">
          {/* LEFT SIDEBAR — Dashboard Menu Tabs */}
          <DashboardTabs activeTab={activeTab} onChange={setActiveTab} />

          {/* RIGHT — Main content area */}
          <main className="flex-1 min-w-0 space-y-4 sm:space-y-6">
            {error && (
              <div className="bg-red-900/50 border border-red-500 rounded-lg p-3 sm:p-4 text-red-200 text-sm break-anywhere">
                {error}
              </div>
            )}

            {activeTab === 'weather' && (
              <>
                <WeatherLinkEmbed />

                <PagasaWeatherResources />
                <RizalMunicipalitiesWeather />
              </>
            )}

            {activeTab === 'hazard-maps' && <HazardMaps />}

            {activeTab === 'earthquake' && <EarthquakeMonitoring />}

            {activeTab === 'flood-rainfall' && (
              <>
                <PagasaBulletin />

                <UpperMarikinaMonitor />
                
                <AlertLevels />
              </>
            )}

            {activeTab === 'municipalities' && (
              <RizalMunicipalitiesDistricts />
            )}

            {activeTab === 'iec' && (
              <div className="flex flex-col lg:flex-row gap-6">
                {/* Secondary Sidebar Tabs for IEC */}
                <div className="lg:w-48 xl:w-56 flex-shrink-0">
                  <div className="flex lg:flex-col gap-2 p-1 bg-gray-900/40 border border-gray-800/60 rounded-xl">
                    <button
                      onClick={() => setIecSubTab('videos')}
                      className={`flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-semibold transition-all duration-200 flex-1 lg:flex-none ${
                        iecSubTab === 'videos'
                          ? 'bg-purple-600 text-white shadow-lg shadow-purple-900/40 translate-x-1'
                          : 'text-gray-400 hover:text-gray-200 hover:bg-gray-800/60'
                      }`}
                    >
                      <Video className="w-4 h-4 shrink-0" />
                      <span>Videos</span>
                    </button>
                    <button
                      onClick={() => setIecSubTab('posters')}
                      className={`flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-semibold transition-all duration-200 flex-1 lg:flex-none ${
                        iecSubTab === 'posters'
                          ? 'bg-purple-600 text-white shadow-lg shadow-purple-900/40 translate-x-1'
                          : 'text-gray-400 hover:text-gray-200 hover:bg-gray-800/60'
                      }`}
                    >
                      <Image className="w-4 h-4 shrink-0" />
                      <span>Posters</span>
                    </button>
                  </div>
                  
                  <div className="hidden lg:block mt-4 p-4 rounded-xl bg-purple-900/10 border border-purple-800/20">
                    <p className="text-[11px] text-purple-300 leading-relaxed">
                      Access our library of educational materials designed to improve disaster awareness and community resilience.
                    </p>
                  </div>
                </div>

                {/* Sub-tab Content */}
                <div className="flex-1 min-w-0 animate-in fade-in slide-in-from-bottom-2 duration-500">
                  {iecSubTab === 'videos' ? <MaghandaVideos /> : <IECPosters />}
                </div>
              </div>
            )}



          </main>
        </div>
      </div>
      
      <Footer />
    </div>
  );
}

export default App;
