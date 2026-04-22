import { CloudRain, RefreshCw, Wifi, WifiOff, Activity } from 'lucide-react';
import { useState, useEffect } from 'react';

interface HeaderProps {
  isLive: boolean;
  onToggleLive: () => void;
  onRefresh: () => void;
  lastUpdate: Date;
}

export default function Header({ isLive, onToggleLive, onRefresh, lastUpdate }: HeaderProps) {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-PH', {
      weekday: 'short',
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      timeZone: 'Asia/Manila'
    });
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('en-PH', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: true,
      timeZone: 'Asia/Manila'
    });
  };

  return (
    <header className="bg-gradient-to-r from-blue-950 via-blue-900 to-indigo-950 border-b border-blue-700/50 sticky top-0 z-50">
      <div className="container mx-auto px-3 sm:px-4 py-2 max-w-7xl">
        <div className="flex flex-col sm:flex-row sm:flex-wrap items-stretch sm:items-center justify-between gap-2">
          {/* Left: Title + Icon */}
          <div className="flex items-center gap-2 sm:gap-3 min-w-0 flex-shrink">
            <div className="bg-blue-500/20 p-1.5 rounded-md shrink-0">
              <CloudRain className="w-5 h-5 text-blue-400" />
            </div>
            <div className="min-w-0">
              <h1 className="text-xs sm:text-sm md:text-base font-bold text-white leading-tight truncate">
                Rizal PDRRMO Dashboard
              </h1>
            </div>
          </div>

          {/* Center: Compact Date/Time */}
          <div className="flex items-center justify-center gap-2 sm:gap-3 px-2 sm:px-3 py-1 bg-black/30 rounded-md border border-white/5 shrink-0">
            <span className="w-1.5 h-1.5 bg-blue-500 rounded-full animate-pulse shrink-0"></span>
            <div className="text-base sm:text-lg md:text-xl font-bold text-white font-mono tracking-tight leading-none whitespace-nowrap">
              {formatTime(currentTime)}
            </div>
            <div className="hidden md:block text-[11px] text-blue-200/70 uppercase tracking-wide leading-none whitespace-nowrap">
              {formatDate(currentTime)}
            </div>
          </div>

          {/* Right: Controls */}
          <div className="flex items-center justify-center sm:justify-end gap-2 flex-wrap">
            <button
              onClick={onToggleLive}
              className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-md text-xs font-medium transition-colors min-h-[32px] ${
                isLive
                  ? 'bg-green-500/20 text-green-400 hover:bg-green-500/30 active:bg-green-500/40'
                  : 'bg-gray-700 text-gray-400 hover:bg-gray-600 active:bg-gray-500'
              }`}
              aria-label={isLive ? 'Pause live updates' : 'Resume live updates'}
            >
              {isLive ? <Wifi className="w-3.5 h-3.5" /> : <WifiOff className="w-3.5 h-3.5" />}
              <span>{isLive ? 'Live' : 'Paused'}</span>
            </button>

            <button
              onClick={onRefresh}
              className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-md text-xs font-medium bg-blue-500/20 text-blue-400 hover:bg-blue-500/30 active:bg-blue-500/40 transition-colors min-h-[32px]"
              title="Refresh data"
              aria-label="Refresh data"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>Refresh</span>
            </button>

            <div className="hidden lg:flex items-center gap-1 text-[10px] text-gray-400">
              <Activity className="w-3 h-3" />
              <span>Updated: {lastUpdate.toLocaleTimeString('en-PH', { timeZone: 'Asia/Manila', hour: '2-digit', minute: '2-digit' })}</span>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
