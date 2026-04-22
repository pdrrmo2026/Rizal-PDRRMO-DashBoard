// Real-time data service using Open-Meteo API
// Open-Meteo provides free weather data with no API key required

export interface WeatherData {
  temperature: number;
  humidity: number;
  windSpeed: number;
  windDirection: number;
  pressure: number;
  precipitation: number;
  precipitationProbability: number;
  weatherCode: number;
  cloudCover: number;
  visibility: number;
  uvIndex: number;
  timestamp: string;
}


export interface StationLocation {
  name: string;
  lat: number;
  lon: number;
  elevation: number;
  type: 'aws' | 'water_level' | 'combined';
  basin: string;
  alertLevel: number;
  alarmLevel: number;
  criticalLevel: number;
}

export const STATIONS: StationLocation[] = [
  {
    name: 'Antipolo AWS',
    lat: 14.5932,
    lon: 121.1815,
    elevation: 196,
    type: 'aws',
    basin: 'Antipolo Watershed',
    alertLevel: 15.0,
    alarmLevel: 17.0,
    criticalLevel: 19.0,
  },
  {
    name: 'Marikina River (Montalban)',
    lat: 14.7167,
    lon: 121.1000,
    elevation: 50,
    type: 'water_level',
    basin: 'Upper Marikina River Basin',
    alertLevel: 15.0,
    alarmLevel: 17.0,
    criticalLevel: 19.0,
  },
  {
    name: 'Hinulugang Taktak',
    lat: 14.6050,
    lon: 121.1350,
    elevation: 150,
    type: 'water_level',
    basin: 'Antipolo Watershed',
    alertLevel: 4.5,
    alarmLevel: 5.5,
    criticalLevel: 6.5,
  },
  {
    name: 'Sumulong Highway AWS',
    lat: 14.6100,
    lon: 121.1400,
    elevation: 180,
    type: 'aws',
    basin: 'Antipolo Watershed',
    alertLevel: 12.0,
    alarmLevel: 14.0,
    criticalLevel: 16.0,
  },
  {
    name: 'Manggahan Floodway',
    lat: 14.5800,
    lon: 121.0800,
    elevation: 10,
    type: 'combined',
    basin: 'Upper Marikina River Basin',
    alertLevel: 8.0,
    alarmLevel: 10.0,
    criticalLevel: 12.0,
  },
  {
    name: 'La Mesa Dam',
    lat: 14.7100,
    lon: 121.0400,
    elevation: 70,
    type: 'combined',
    basin: 'Upper Marikina River Basin',
    alertLevel: 79.0,
    alarmLevel: 80.0,
    criticalLevel: 81.0,
  },
  {
    name: 'Cainta Creek',
    lat: 14.5700,
    lon: 121.1200,
    elevation: 15,
    type: 'water_level',
    basin: 'Antipolo Watershed',
    alertLevel: 5.0,
    alarmLevel: 6.5,
    criticalLevel: 8.0,
  },
  {
    name: 'Taytay Floodway',
    lat: 14.5600,
    lon: 121.1300,
    elevation: 20,
    type: 'combined',
    basin: 'Upper Marikina River Basin',
    alertLevel: 6.0,
    alarmLevel: 8.0,
    criticalLevel: 10.0,
  },
  // Laguna Lake (Laguna de Bay) Monitoring Stations - LLDA Data
  {
    name: 'Laguna Lake - South Bay (Bay, Laguna)',
    lat: 14.2333,
    lon: 121.1667,
    elevation: 0.5,
    type: 'water_level',
    basin: 'Laguna de Bay',
    alertLevel: 11.5,
    alarmLevel: 12.0,
    criticalLevel: 12.5,
  },
  {
    name: 'Laguna Lake - East Bay (Lumban, Laguna)',
    lat: 14.3167,
    lon: 121.4167,
    elevation: 0.5,
    type: 'water_level',
    basin: 'Laguna de Bay',
    alertLevel: 11.5,
    alarmLevel: 12.0,
    criticalLevel: 12.5,
  },
  {
    name: 'Laguna Lake - Central Bay (Cardona, Rizal)',
    lat: 14.4167,
    lon: 121.2333,
    elevation: 0.5,
    type: 'water_level',
    basin: 'Laguna de Bay',
    alertLevel: 11.5,
    alarmLevel: 12.0,
    criticalLevel: 12.5,
  },
  {
    name: 'Laguna Lake - West Bay (Muntinlupa)',
    lat: 14.3833,
    lon: 121.0167,
    elevation: 0.5,
    type: 'water_level',
    basin: 'Laguna de Bay',
    alertLevel: 11.5,
    alarmLevel: 12.0,
    criticalLevel: 12.5,
  },
  {
    name: 'St. Nino Marikina',
    lat: 14.6361,
    lon: 121.0964,
    elevation: 20,
    type: 'water_level',
    basin: 'Upper Marikina River Basin',
    alertLevel: 15.0,
    alarmLevel: 16.0,
    criticalLevel: 17.0,
  },
  {
    name: 'Burgos',
    lat: 14.6878,
    lon: 121.1056,
    elevation: 35,
    type: 'water_level',
    basin: 'Upper Marikina River Basin',
    alertLevel: 14.0,
    alarmLevel: 15.0,
    criticalLevel: 16.0,
  },
  {
    name: 'San Mateo 1',
    lat: 14.7012,
    lon: 121.1101,
    elevation: 45,
    type: 'water_level',
    basin: 'Upper Marikina River Basin',
    alertLevel: 13.0,
    alarmLevel: 14.0,
    criticalLevel: 15.0,
  },
];

const WEATHER_CODES: Record<number, { label: string; icon: string }> = {
  0: { label: 'Clear sky', icon: '☀️' },
  1: { label: 'Mainly clear', icon: '🌤️' },
  2: { label: 'Partly cloudy', icon: '⛅' },
  3: { label: 'Overcast', icon: '☁️' },
  45: { label: 'Foggy', icon: '🌫️' },
  48: { label: 'Depositing rime fog', icon: '🌫️' },
  51: { label: 'Light drizzle', icon: '🌦️' },
  53: { label: 'Moderate drizzle', icon: '🌦️' },
  55: { label: 'Dense drizzle', icon: '🌧️' },
  61: { label: 'Slight rain', icon: '🌧️' },
  63: { label: 'Moderate rain', icon: '🌧️' },
  65: { label: 'Heavy rain', icon: '🌧️' },
  71: { label: 'Slight snow', icon: '🌨️' },
  73: { label: 'Moderate snow', icon: '🌨️' },
  75: { label: 'Heavy snow', icon: '❄️' },
  80: { label: 'Slight showers', icon: '🌦️' },
  81: { label: 'Moderate showers', icon: '🌧️' },
  82: { label: 'Violent showers', icon: '⛈️' },
  95: { label: 'Thunderstorm', icon: '⛈️' },
  96: { label: 'Thunderstorm with hail', icon: '⛈️' },
  99: { label: 'Thunderstorm with heavy hail', icon: '⛈️' },
};

export function getWeatherInfo(code: number) {
  return WEATHER_CODES[code] || { label: 'Unknown', icon: '🌡️' };
}

export async function fetchWeatherData(lat: number, lon: number): Promise<WeatherData> {
  const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,relative_humidity_2m,wind_speed_10m,wind_direction_10m,surface_pressure,precipitation,cloud_cover,weather_code&hourly=precipitation_probability&timezone=Asia/Manila`;
  
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    
    return {
      temperature: data.current.temperature_2m,
      humidity: data.current.relative_humidity_2m,
      windSpeed: data.current.wind_speed_10m,
      windDirection: data.current.wind_direction_10m,
      pressure: data.current.surface_pressure,
      precipitation: data.current.precipitation,
      precipitationProbability: data.hourly.precipitation_probability[0] || 0,
      weatherCode: data.current.weather_code,
      cloudCover: data.current.cloud_cover,
      visibility: 10000, // Default visibility
      uvIndex: 5, // Default UV index
      timestamp: data.current.time,
    };
  } catch (error) {
    console.error('Error fetching weather data:', error);
    throw error;
  }
}


export async function fetchAllStationsWeather(): Promise<Map<string, WeatherData>> {
  const weatherMap = new Map<string, WeatherData>();
  
  const uniqueLocations = new Map<string, StationLocation>();
  STATIONS.forEach(station => {
    const key = `${station.lat.toFixed(4)},${station.lon.toFixed(4)}`;
    if (!uniqueLocations.has(key)) {
      uniqueLocations.set(key, station);
    }
  });
  
  const promises = Array.from(uniqueLocations.values()).map(async (station) => {
    try {
      const weather = await fetchWeatherData(station.lat, station.lon);
      const key = `${station.lat.toFixed(4)},${station.lon.toFixed(4)}`;
      weatherMap.set(key, weather);
    } catch (error) {
      console.error(`Error fetching weather for ${station.name}:`, error);
    }
  });
  
  await Promise.allSettled(promises);
  return weatherMap;
}

// Simulate water level data based on rainfall and historical patterns
export function simulateWaterLevel(station: StationLocation, rainfall: number): number {
  const baseLevel = station.type === 'water_level' || station.type === 'combined' 
    ? station.alertLevel * 0.6 
    : station.alertLevel * 0.5;
  
  const rainfallImpact = rainfall * 0.3;
  const timeOfDay = new Date().getHours();
  const diurnalVariation = Math.sin((timeOfDay - 6) * Math.PI / 12) * 0.5;
  
  return Math.max(0, baseLevel + rainfallImpact + diurnalVariation + (Math.random() - 0.5) * 0.5);
}

export function getAlertStatus(currentLevel: number, alertLevel: number, alarmLevel: number, criticalLevel: number): {
  status: 'normal' | 'alert' | 'alarm' | 'critical';
  color: string;
  message: string;
} {
  if (currentLevel >= criticalLevel) {
    return {
      status: 'critical',
      color: 'red',
      message: 'CRITICAL: Immediate evacuation required',
    };
  } else if (currentLevel >= alarmLevel) {
    return {
      status: 'alarm',
      color: 'orange',
      message: 'ALARM: Forced evacuation',
    };
  } else if (currentLevel >= alertLevel) {
    return {
      status: 'alert',
      color: 'yellow',
      message: 'ALERT: Monitor closely',
    };
  } else {
    return {
      status: 'normal',
      color: 'green',
      message: 'NORMAL: No flooding',
    };
  }
}
