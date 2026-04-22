export interface RainfallData {
  time: string;
  rainfall: number;
}

export interface WaterLevelData {
  time: string;
  level: number;
  critical: number;
  alarm: number;
}

export type AlertLevel = 'Normal' | 'Alert' | 'Warning' | 'Critical' | 'Emergency';

export interface StationData {
  id: string;
  name: string;
  fullName: string;
  location: string;
  type: 'aws' | 'water_level' | 'both';
  rainfall: number; // mm/hr
  rainfall24h: number; // mm/24hr
  waterLevel: number; // meters
  criticalLevel: number; // meters
  alarmLevel: number; // meters
  alertLevel: AlertLevel;
  status: 'online' | 'offline' | 'maintenance';
  lastReading: Date;
  rainfallHistory: RainfallData[];
  waterLevelHistory: WaterLevelData[];
  coordinates: { lat: number; lng: number };
  riverBasin: string;
}

const ALERT_THRESHOLDS = {
  rainfall: {
    normal: 2.5,
    alert: 7.5,
    warning: 15,
    critical: 30,
  },
  waterLevel: {
    normal: 0.65,
    alert: 0.75,
    warning: 0.85,
    critical: 0.95,
  }
};

function getAlertLevel(rainfall: number, waterLevel: number, criticalLevel: number): AlertLevel {
  const rainRatio = rainfall / ALERT_THRESHOLDS.rainfall.critical;
  const waterRatio = waterLevel / criticalLevel;
  const maxRatio = Math.max(rainRatio, waterRatio);

  if (maxRatio >= 1.0) return 'Emergency';
  if (maxRatio >= 0.85) return 'Critical';
  if (maxRatio >= 0.65) return 'Warning';
  if (maxRatio >= 0.4) return 'Alert';
  return 'Normal';
}

function generateHistory<T>(baseValue: number, variance: number, length: number, generator: (val: number) => T): T[] {
  const data: T[] = [];
  let current = baseValue;
  for (let i = 0; i < length; i++) {
    current += (Math.random() - 0.5) * variance;
    current = Math.max(0, current);
    data.push(generator(current));
  }
  return data;
}

const STATION_CONFIGS: Omit<StationData, 'rainfall' | 'rainfall24h' | 'waterLevel' | 'alertLevel' | 'lastReading' | 'rainfallHistory' | 'waterLevelHistory'>[] = [
  {
    id: 'marikina',
    name: 'Marikina River',
    fullName: 'Upper Marikina River Basin - Marikina Station',
    location: 'Marikina City, Metro Manila',
    type: 'both',
    criticalLevel: 16.0,
    alarmLevel: 15.0,
    status: 'online',
    coordinates: { lat: 14.6507, lng: 121.1029 },
    riverBasin: 'Upper Marikina River Basin',
  },
  {
    id: 'antipolo',
    name: 'Antipolo AWS',
    fullName: 'Antipolo Automatic Weather Station',
    location: 'Antipolo City, Rizal',
    type: 'aws',
    criticalLevel: 18.0,
    alarmLevel: 16.0,
    status: 'online',
    coordinates: { lat: 14.5932, lng: 121.1757 },
    riverBasin: 'Antipolo Watershed',
  },
  {
    id: 'hinulugang',
    name: 'Hinulugang Taktak',
    fullName: 'Hinulugang Taktak Water Level Station',
    location: 'Antipolo City, Rizal',
    type: 'water_level',
    criticalLevel: 5.5,
    alarmLevel: 4.8,
    status: 'online',
    coordinates: { lat: 14.6025, lng: 121.1215 },
    riverBasin: 'Antipolo Watershed',
  },
  {
    id: 'sumulong',
    name: 'Sumulong Highway',
    fullName: 'Sumulong Highway Rainfall Station',
    location: 'Antipolo City, Rizal',
    type: 'aws',
    criticalLevel: 20.0,
    alarmLevel: 17.0,
    status: 'online',
    coordinates: { lat: 14.5890, lng: 121.1680 },
    riverBasin: 'Antipolo Watershed',
  },
  {
    id: 'manggahan',
    name: 'Manggahan Floodway',
    fullName: 'Manggahan Floodway Control Station',
    location: 'Pasig City, Metro Manila',
    type: 'both',
    criticalLevel: 14.5,
    alarmLevel: 13.0,
    status: 'online',
    coordinates: { lat: 14.5764, lng: 121.0840 },
    riverBasin: 'Upper Marikina River Basin',
  },
  {
    id: 'la_mesa',
    name: 'La Mesa Dam',
    fullName: 'La Mesa Dam Reservoir Station',
    location: 'Quezon City, Metro Manila',
    type: 'both',
    criticalLevel: 68.0,
    alarmLevel: 65.0,
    status: 'online',
    coordinates: { lat: 14.7040, lng: 121.0420 },
    riverBasin: 'Upper Marikina River Basin',
  },
  {
    id: 'cainta',
    name: 'Cainta Creek',
    fullName: 'Cainta Creek Water Level Monitor',
    location: 'Cainta, Rizal',
    type: 'water_level',
    criticalLevel: 4.0,
    alarmLevel: 3.5,
    status: 'online',
    coordinates: { lat: 14.5770, lng: 121.1230 },
    riverBasin: 'Antipolo Watershed',
  },
  {
    id: 'taytay',
    name: 'Taytay Floodway',
    fullName: 'Taytay Floodway Monitoring Station',
    location: 'Taytay, Rizal',
    type: 'both',
    criticalLevel: 6.0,
    alarmLevel: 5.0,
    status: 'online',
    coordinates: { lat: 14.5610, lng: 121.1340 },
    riverBasin: 'Upper Marikina River Basin',
  },
];

export function generateMockData(): StationData[] {
  const now = new Date();

  return STATION_CONFIGS.map(config => {
    const isMarikina = config.id === 'marikina';
    const isAntipolo = config.id === 'antipolo';
    
    // Simulate realistic data
    const rainfallBase = isMarikina ? 12 : isAntipolo ? 18 : 8 + Math.random() * 15;
    const rainfall = rainfallBase + (Math.random() - 0.5) * 5;
    const rainfall24h = rainfall * 12 + Math.random() * 30;
    
    const waterLevelBase = isMarikina ? 14.5 : isAntipolo ? 3.2 : 4 + Math.random() * 8;
    const waterLevel = waterLevelBase + (Math.random() - 0.5) * 1.5;
    
    const alertLevel = getAlertLevel(rainfall, waterLevel, config.criticalLevel);

    // Generate rainfall history (last 24 hours, hourly)
    const rainfallHistory: RainfallData[] = generateHistory(rainfall, 3, 24, (val) => ({
      time: new Date(now.getTime() - (23 - Math.round(val)) * 3600000).toLocaleTimeString('en-PH', { hour: '2-digit', minute: '2-digit' }),
      rainfall: Math.round(val * 10) / 10,
    }));

    // Generate water level history (last 24 hours, hourly)
    const waterLevelHistory: WaterLevelData[] = generateHistory(waterLevel, 0.8, 24, (val) => ({
      time: new Date(now.getTime() - (23 - Math.round(val)) * 3600000).toLocaleTimeString('en-PH', { hour: '2-digit', minute: '2-digit' }),
      level: Math.round(val * 100) / 100,
      critical: config.criticalLevel,
      alarm: config.alarmLevel,
    }));

    return {
      ...config,
      rainfall: Math.round(rainfall * 10) / 10,
      rainfall24h: Math.round(rainfall24h * 10) / 10,
      waterLevel: Math.round(waterLevel * 100) / 100,
      alertLevel,
      lastReading: new Date(now.getTime() - Math.random() * 300000),
      rainfallHistory,
      waterLevelHistory,
    };
  });
}
