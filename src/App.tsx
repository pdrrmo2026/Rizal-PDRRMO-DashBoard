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
              <div className="animate-in fade-in slide-in-from-bottom-4 duration-700">
                {iecSubTab === 'videos' ? (
                  <MaghandaVideos 
                    renderTabs={
                      <div className="flex items-center gap-1.5 p-1 bg-gray-950/50 border border-red-500/20 rounded-xl w-fit backdrop-blur-sm">
                        <button
                          onClick={() => setIecSubTab('videos')}
                          className={`flex items-center gap-2 px-4 py-1.5 rounded-lg text-xs font-bold transition-all ${
                            iecSubTab === 'videos'
                              ? 'bg-red-600 text-white shadow-lg shadow-red-900/40'
                              : 'text-gray-400 hover:text-gray-200 hover:bg-gray-800'
                          }`}
                        >
                          <Video className="w-3.5 h-3.5" />
                          Videos
                        </button>
                        <button
                          onClick={() => setIecSubTab('posters')}
                          className={`flex items-center gap-2 px-4 py-1.5 rounded-lg text-xs font-bold transition-all ${
                            iecSubTab === 'posters'
                              ? 'bg-red-600/20 text-gray-400'
                              : 'text-gray-400 hover:text-gray-200 hover:bg-gray-800'
                          }`}
                        >
                          <Image className="w-3.5 h-3.5" />
                          Posters
                        </button>
                      </div>
                    } 
                  />
                ) : (
                  <IECPosters 
                    renderTabs={
                      <div className="flex items-center gap-1.5 p-1 bg-gray-950/50 border border-indigo-500/20 rounded-xl w-fit backdrop-blur-sm">
                        <button
                          onClick={() => setIecSubTab('videos')}
                          className={`flex items-center gap-2 px-4 py-1.5 rounded-lg text-xs font-bold transition-all ${
                            iecSubTab === 'videos'
                              ? 'bg-indigo-600/20 text-gray-400'
                              : 'text-gray-400 hover:text-gray-200 hover:bg-gray-800'
                          }`}
                        >
                          <Video className="w-3.5 h-3.5" />
                          Videos
                        </button>
                        <button
                          onClick={() => setIecSubTab('posters')}
                          className={`flex items-center gap-2 px-4 py-1.5 rounded-lg text-xs font-bold transition-all ${
                            iecSubTab === 'posters'
                              ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-900/40'
                              : 'text-gray-400 hover:text-gray-200 hover:bg-gray-800'
                          }`}
                        >
                          <Image className="w-3.5 h-3.5" />
                          Posters
                        </button>
                      </div>
                    }
                  />
                )}
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
