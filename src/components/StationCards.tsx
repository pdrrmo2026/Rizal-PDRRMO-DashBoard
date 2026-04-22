import { Thermometer, Wind, Droplet, AlertTriangle, AlertCircle, AlertOctagon, CheckCircle, MapPin } from 'lucide-react';
import { StationData } from '../types';

interface StationCardsProps {
  stationData: StationData[];
  loading: boolean;
  onSelectStation: (index: number) => void;
  selectedStation: number;
}

export default function StationCards({ stationData, loading, onSelectStation, selectedStation }: StationCardsProps) {
  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'critical': return <AlertOctagon className="w-4 h-4 text-red-400" />;
      case 'alarm': return <AlertCircle className="w-4 h-4 text-orange-400" />;
      case 'alert': return <AlertTriangle className="w-4 h-4 text-yellow-400" />;
      default: return <CheckCircle className="w-4 h-4 text-green-400" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'critical': return 'border-red-500/50 bg-red-950/30';
      case 'alarm': return 'border-orange-500/50 bg-orange-950/30';
      case 'alert': return 'border-yellow-500/50 bg-yellow-950/30';
      default: return 'border-green-500/50 bg-green-950/30';
    }
  };

  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {Array.from({ length: 8 }).map((_, i) => (
          <div key={i} className="bg-gray-900 rounded-lg p-4 animate-pulse">
            <div className="h-4 bg-gray-700 rounded w-3/4 mb-2"></div>
            <div className="h-3 bg-gray-700 rounded w-1/2 mb-4"></div>
            <div className="grid grid-cols-2 gap-2">
              <div className="h-8 bg-gray-700 rounded"></div>
              <div className="h-8 bg-gray-700 rounded"></div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {stationData.map((data, index) => (
        <button
          key={index}
          onClick={() => onSelectStation(index)}
          className={`p-4 rounded-lg border transition-all text-left ${
            selectedStation === index
              ? 'border-blue-500 bg-blue-950/50 ring-2 ring-blue-500/30'
              : `${getStatusColor(data.alertStatus.status)} hover:border-gray-600`
          }`}
        >
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4 text-gray-400" />
              <h3 className="font-semibold text-sm text-gray-200">{data.station.name}</h3>
            </div>
            {getStatusIcon(data.alertStatus.status)}
          </div>
          
          <p className="text-xs text-gray-400 mb-3">{data.station.basin}</p>
          
          <div className="grid grid-cols-2 gap-2">
            <div className="flex items-center gap-1">
              <Droplet className="w-3 h-3 text-blue-400" />
              <div>
                <p className="text-xs text-gray-400">Rain</p>
                <p className="text-sm font-medium text-gray-200">
                  {data.weather?.precipitation.toFixed(1) || '0.0'} mm
                </p>
              </div>
            </div>
            
            <div className="flex items-center gap-1">
              <Thermometer className="w-3 h-3 text-orange-400" />
              <div>
                <p className="text-xs text-gray-400">Temp</p>
                <p className="text-sm font-medium text-gray-200">
                  {data.weather?.temperature.toFixed(1) || '--'}°C
                </p>
              </div>
            </div>
            
            <div className="flex items-center gap-1">
              <Wind className="w-3 h-3 text-gray-400" />
              <div>
                <p className="text-xs text-gray-400">Wind</p>
                <p className="text-sm font-medium text-gray-200">
                  {data.weather?.windSpeed.toFixed(1) || '--'} km/h
                </p>
              </div>
            </div>
          </div>
          
          <div className="mt-3 pt-2 border-t border-gray-700/50">
            <p className={`text-xs font-medium ${
              data.alertStatus.status === 'critical' ? 'text-red-400' :
              data.alertStatus.status === 'alarm' ? 'text-orange-400' :
              data.alertStatus.status === 'alert' ? 'text-yellow-400' :
              'text-green-400'
            }`}>
              {data.alertStatus.message}
            </p>
          </div>
        </button>
      ))}
    </div>
  );
}
