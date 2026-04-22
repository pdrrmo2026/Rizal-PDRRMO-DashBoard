import { AlertTriangle, AlertCircle, CheckCircle, AlertOctagon } from 'lucide-react';

interface AlertBannerProps {
  status: 'normal' | 'alert' | 'alarm' | 'critical';
  stationCount: number;
  totalStations: number;
}

export default function AlertBanner({ status, stationCount, totalStations }: AlertBannerProps) {
  const config = {
    normal: {
      icon: CheckCircle,
      bgColor: 'bg-green-900/30',
      borderColor: 'border-green-500/50',
      textColor: 'text-green-400',
      message: 'All stations reporting normal conditions',
    },
    alert: {
      icon: AlertTriangle,
      bgColor: 'bg-yellow-900/30',
      borderColor: 'border-yellow-500/50',
      textColor: 'text-yellow-400',
      message: `${stationCount} station(s) reporting alert level conditions`,
    },
    alarm: {
      icon: AlertCircle,
      bgColor: 'bg-orange-900/30',
      borderColor: 'border-orange-500/50',
      textColor: 'text-orange-400',
      message: `${stationCount} station(s) reporting alarm level conditions`,
    },
    critical: {
      icon: AlertOctagon,
      bgColor: 'bg-red-900/30',
      borderColor: 'border-red-500/50',
      textColor: 'text-red-400',
      message: `${stationCount} station(s) reporting CRITICAL conditions`,
    },
  };

  const current = config[status];
  const Icon = current.icon;

  return (
    <div className={`${current.bgColor} border-b ${current.borderColor}`}>
      <div className="container mx-auto px-3 sm:px-4 py-2 sm:py-3 max-w-7xl">
        <div className="flex items-center gap-2 sm:gap-3 flex-wrap">
          <Icon className={`w-4 h-4 sm:w-5 sm:h-5 ${current.textColor} shrink-0`} />
          <span className={`${current.textColor} font-medium text-xs sm:text-sm md:text-base`}>
            {current.message}
          </span>
          <span className="text-gray-400 text-[10px] sm:text-xs md:text-sm">
            ({totalStations - stationCount} normal)
          </span>
        </div>
      </div>
    </div>
  );
}
