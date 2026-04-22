import { useEffect } from 'react';
import { AlertOctagon, Volume2, VolumeX, BellOff } from 'lucide-react';
import { useCriticalAlarm } from '../hooks/useCriticalAlarm';

interface CriticalAlarmBannerProps {
  isCritical: boolean;
  criticalStations: string[];
}

export default function CriticalAlarmBanner({
  isCritical,
  criticalStations,
}: CriticalAlarmBannerProps) {
  const { muted, toggleMute, acknowledged, acknowledge, enableAudio } =
    useCriticalAlarm(isCritical);

  // Prime the AudioContext on first user interaction anywhere
  useEffect(() => {
    const handler = () => enableAudio();
    window.addEventListener('click', handler, { once: true });
    window.addEventListener('keydown', handler, { once: true });
    return () => {
      window.removeEventListener('click', handler);
      window.removeEventListener('keydown', handler);
    };
  }, [enableAudio]);

  if (!isCritical) return null;

  return (
    <div className="sticky top-0 z-[60] bg-gradient-to-r from-red-700 via-red-600 to-red-700 border-b-4 border-red-900 shadow-2xl shadow-red-900/50 animate-pulse-slow">
      <div className="container mx-auto px-3 sm:px-4 py-2 sm:py-3 max-w-7xl">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2 sm:gap-3">
          <div className="flex items-center gap-2 sm:gap-3 min-w-0">
            <div className="p-1.5 sm:p-2 bg-red-900/50 rounded-lg ring-2 ring-red-300/50 animate-pulse shrink-0">
              <AlertOctagon className="w-5 h-5 sm:w-7 sm:h-7 text-white" />
            </div>
            <div className="min-w-0">
              <h2 className="text-sm sm:text-lg md:text-xl font-black text-white uppercase tracking-wider leading-tight">
                🚨 CRITICAL WATER LEVEL ALARM
              </h2>
              <p className="text-[10px] sm:text-xs md:text-sm text-red-100 font-medium leading-snug break-anywhere">
                {criticalStations.length > 0
                  ? `${criticalStations.length} station(s) at CRITICAL: ${criticalStations.join(', ')}`
                  : 'One or more stations have reached critical level. Immediate action required.'}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 flex-shrink-0">
            <button
              onClick={toggleMute}
              className="flex items-center gap-1.5 sm:gap-2 px-2.5 sm:px-3 py-1.5 sm:py-2 bg-red-900/60 hover:bg-red-900/80 active:bg-red-900 text-white rounded-lg text-[10px] sm:text-xs font-bold uppercase tracking-wide border border-red-300/30 transition-colors min-h-[36px]"
              title={muted ? 'Unmute alarm' : 'Mute alarm'}
            >
              {muted ? (
                <>
                  <VolumeX className="w-4 h-4" />
                  <span>Muted</span>
                </>
              ) : (
                <>
                  <Volume2 className="w-4 h-4" />
                  <span>Mute</span>
                </>
              )}
            </button>
            {!acknowledged && (
              <button
                onClick={acknowledge}
                className="flex items-center gap-1.5 sm:gap-2 px-2.5 sm:px-3 py-1.5 sm:py-2 bg-white text-red-700 hover:bg-red-50 active:bg-red-100 rounded-lg text-[10px] sm:text-xs font-black uppercase tracking-wide shadow-lg transition-colors min-h-[36px]"
                title="Acknowledge alarm"
              >
                <BellOff className="w-4 h-4" />
                <span>Acknowledge</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
