import { Droplets, AlertTriangle, AlertCircle, AlertOctagon, CheckCircle } from 'lucide-react';
import { StationData } from '../types';

interface FloodLevelGaugeProps {
  stationData: StationData;
}

export default function FloodLevelGauge({ stationData }: FloodLevelGaugeProps) {
  if (!stationData) return null;

  const { station, waterLevel, alertStatus } = stationData;
  const criticalLevel = station.criticalLevel;
  const maxLevel = criticalLevel * 1.2;
  
  const percentage = Math.min((waterLevel / maxLevel) * 100, 100);
  const radius = 80;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'critical': return '#ef4444';
      case 'alarm': return '#f97316';
      case 'alert': return '#eab308';
      default: return '#22c55e';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'critical': return <AlertOctagon className="w-6 h-6 text-red-400" />;
      case 'alarm': return <AlertCircle className="w-6 h-6 text-orange-400" />;
      case 'alert': return <AlertTriangle className="w-6 h-6 text-yellow-400" />;
      default: return <CheckCircle className="w-6 h-6 text-green-400" />;
    }
  };

  return (
    <div className="bg-gray-900 rounded-lg border border-gray-800 p-6">
      <div className="flex items-center gap-2 mb-4">
        <Droplets className="w-5 h-5 text-blue-400" />
        <h2 className="text-lg font-semibold text-gray-200">Water Level Gauge</h2>
      </div>
      
      <p className="text-sm text-gray-400 mb-4">{station.name}</p>
      
      <div className="flex justify-center">
        <div className="relative">
          <svg width="200" height="200" viewBox="0 0 200 200">
            {/* Background circle */}
            <circle
              cx="100"
              cy="100"
              r={radius}
              fill="none"
              stroke="#374151"
              strokeWidth="12"
            />
            
            {/* Progress circle */}
            <circle
              cx="100"
              cy="100"
              r={radius}
              fill="none"
              stroke={getStatusColor(alertStatus.status)}
              strokeWidth="12"
              strokeLinecap="round"
              strokeDasharray={circumference}
              strokeDashoffset={strokeDashoffset}
              transform="rotate(-90 100 100)"
              className="transition-all duration-1000"
            />
            
            {/* Alert level marker */}
            <line
              x1="100"
              y1="20"
              x2="100"
              y2="30"
              stroke="#eab308"
              strokeWidth="3"
            />
            
            {/* Alarm level marker */}
            <line
              x1="100"
              y1="20"
              x2="100"
              y2="30"
              stroke="#f97316"
              strokeWidth="3"
              transform={`rotate(${(station.alarmLevel / maxLevel) * 360} 100 100)`}
            />
            
            {/* Critical level marker */}
            <line
              x1="100"
              y1="20"
              x2="100"
              y2="30"
              stroke="#ef4444"
              strokeWidth="3"
              transform={`rotate(${(station.criticalLevel / maxLevel) * 360} 100 100)`}
            />
          </svg>
          
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            {getStatusIcon(alertStatus.status)}
            <span className="text-2xl font-bold text-gray-200 mt-1">
              {waterLevel.toFixed(2)}
            </span>
            <span className="text-sm text-gray-400">meters</span>
          </div>
        </div>
      </div>
      
      <div className="mt-6 grid grid-cols-3 gap-4">
        <div className="text-center">
          <div className="w-3 h-3 bg-yellow-500 rounded-full mx-auto mb-1"></div>
          <p className="text-xs text-gray-400">Alert</p>
          <p className="text-sm font-medium text-gray-200">{station.alertLevel}m</p>
        </div>
        <div className="text-center">
          <div className="w-3 h-3 bg-orange-500 rounded-full mx-auto mb-1"></div>
          <p className="text-xs text-gray-400">Alarm</p>
          <p className="text-sm font-medium text-gray-200">{station.alarmLevel}m</p>
        </div>
        <div className="text-center">
          <div className="w-3 h-3 bg-red-500 rounded-full mx-auto mb-1"></div>
          <p className="text-xs text-gray-400">Critical</p>
          <p className="text-sm font-medium text-gray-200">{station.criticalLevel}m</p>
        </div>
      </div>
    </div>
  );
}
