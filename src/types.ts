import { StationLocation, WeatherData } from './services/weatherService';

export interface StationData {
  station: StationLocation;
  weather: WeatherData | null;
  waterLevel: number;
  alertStatus: {
    status: 'normal' | 'alert' | 'alarm' | 'critical';
    color: string;
    message: string;
  };
  loading: boolean;
  error: string | null;
}
