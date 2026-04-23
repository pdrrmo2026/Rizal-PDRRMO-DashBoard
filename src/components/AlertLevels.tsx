import { Info } from 'lucide-react';

export default function AlertLevels() {
  return (
    <div className="bg-gray-900 rounded-lg border border-gray-800 p-3 sm:p-4 md:p-6">
      <div>
        <h3 className="text-sm font-medium text-gray-300 mb-3 flex items-center gap-2">
          <Info className="w-4 h-4 text-blue-400" />
          Data Sources
        </h3>
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
            <p className="text-xs text-gray-400">
              <span className="text-gray-300 font-semibold">Open-Meteo API</span> — Real-time weather data (temperature, precipitation, wind, humidity)
            </p>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
            <p className="text-xs text-gray-400">
              <span className="text-gray-300 font-semibold">PAGASA FFWS</span> — Flood forecasting & warning system water level data
            </p>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
            <p className="text-xs text-gray-400">
              <span className="text-gray-300 font-semibold">PAGASA PANaHON</span> — Nationwide hydromet observation network
            </p>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-cyan-500 rounded-full"></div>
            <p className="text-xs text-gray-400">
              <span className="text-gray-300 font-semibold">LLDA</span> — Laguna Lake Development Authority water level monitoring (Laguna de Bay)
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

