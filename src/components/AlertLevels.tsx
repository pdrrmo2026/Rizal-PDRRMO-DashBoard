import { AlertTriangle, AlertCircle, AlertOctagon, CheckCircle, Info } from 'lucide-react';

export default function AlertLevels() {
  const alertLevels = [
    {
      level: 0,
      name: 'Normal',
      color: 'green',
      icon: CheckCircle,
      description: 'No flooding. River levels are within normal range.',
      action: 'No action required. Continue regular monitoring.',
    },
    {
      level: 1,
      name: 'Alert',
      color: 'yellow',
      icon: AlertTriangle,
      description: 'Water level approaching alert threshold. Monitor closely.',
      action: 'Increase monitoring frequency. Prepare emergency response teams.',
    },
    {
      level: 2,
      name: 'Alarm',
      color: 'orange',
      icon: AlertCircle,
      description: 'Water level at alarm threshold. Flooding imminent.',
      action: 'Forced evacuation of low-lying areas. Activate emergency protocols.',
    },
    {
      level: 3,
      name: 'Critical',
      color: 'red',
      icon: AlertOctagon,
      description: 'Water level at critical threshold. Severe flooding.',
      action: 'Immediate evacuation of all affected areas. Full emergency response.',
    },
  ];

  return (
    <div className="bg-gray-900 rounded-lg border border-gray-800 p-3 sm:p-4 md:p-6">
      <div className="flex items-center gap-2 mb-3 sm:mb-4">
        <Info className="w-4 h-4 sm:w-5 sm:h-5 text-blue-400" />
        <h2 className="text-sm sm:text-base md:text-lg font-semibold text-gray-200">Alert Levels</h2>
      </div>
      
      <div className="space-y-3 sm:space-y-4">
        {alertLevels.map((level) => {
          const Icon = level.icon;
          return (
            <div key={level.level} className="flex items-start gap-3">
              <div className={`mt-0.5 p-1 rounded ${
                level.color === 'red' ? 'bg-red-500/20' :
                level.color === 'orange' ? 'bg-orange-500/20' :
                level.color === 'yellow' ? 'bg-yellow-500/20' :
                'bg-green-500/20'
              }`}>
                <Icon className={`w-4 h-4 ${
                  level.color === 'red' ? 'text-red-400' :
                  level.color === 'orange' ? 'text-orange-400' :
                  level.color === 'yellow' ? 'text-yellow-400' :
                  'text-green-400'
                }`} />
              </div>
              <div>
                <h3 className={`font-medium text-sm ${
                  level.color === 'red' ? 'text-red-400' :
                  level.color === 'orange' ? 'text-orange-400' :
                  level.color === 'yellow' ? 'text-yellow-400' :
                  'text-green-400'
                }`}>
                  Level {level.level}: {level.name}
                </h3>
                <p className="text-xs text-gray-400 mt-1">{level.description}</p>
                <p className="text-xs text-gray-500 mt-1">{level.action}</p>
              </div>
            </div>
          );
        })}
      </div>
      
      <div className="mt-6 pt-4 border-t border-gray-700/50">
        <h3 className="text-sm font-medium text-gray-300 mb-2">Data Sources</h3>
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
            <p className="text-xs text-gray-400">
              <span className="text-gray-300">Open-Meteo API</span> — Real-time weather data (temperature, precipitation, wind, humidity)
            </p>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
            <p className="text-xs text-gray-400">
              <span className="text-gray-300">PAGASA FFWS</span> — Flood forecasting & warning system water level data
            </p>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
            <p className="text-xs text-gray-400">
              <span className="text-gray-300">PAGASA PANaHON</span> — Nationwide hydromet observation network
            </p>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-cyan-500 rounded-full"></div>
            <p className="text-xs text-gray-400">
              <span className="text-gray-300">LLDA</span> — Laguna Lake Development Authority water level monitoring (Laguna de Bay)
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
