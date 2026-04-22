import React, { useState, useEffect, useRef, useCallback } from 'react';

const PHIVOLCS_URL = 'https://earthquake.phivolcs.dost.gov.ph/';
const REFRESH_INTERVAL = 60; // seconds

const EarthquakeMonitoring: React.FC = () => {
  const [countdown, setCountdown] = useState(REFRESH_INTERVAL);
  const [autoRefresh, setAutoRefresh] = useState(true);
  const [iframeKey, setIframeKey] = useState(0);
  const [lastRefresh, setLastRefresh] = useState(new Date());
  const countdownRef = useRef<NodeJS.Timeout | null>(null);

  const doRefresh = useCallback(() => {
    setIframeKey(k => k + 1);
    setLastRefresh(new Date());
    setCountdown(REFRESH_INTERVAL);
  }, []);

  useEffect(() => {
    if (!autoRefresh) {
      if (countdownRef.current) clearInterval(countdownRef.current);
      return;
    }
    countdownRef.current = setInterval(() => {
      setCountdown(prev => {
        if (prev <= 1) {
          doRefresh();
          return REFRESH_INTERVAL;
        }
        return prev - 1;
      });
    }, 1000);
    return () => {
      if (countdownRef.current) clearInterval(countdownRef.current);
    };
  }, [autoRefresh, doRefresh]);

  return (
    <div className="flex flex-col bg-gray-900 rounded-xl overflow-hidden border border-orange-900/40 shadow-2xl">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 bg-gradient-to-r from-red-900 via-orange-900 to-red-900 border-b border-orange-800/50">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-red-600 flex items-center justify-center text-white font-bold text-sm">
            🌋
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-white font-bold text-sm sm:text-base">PHIVOLCS Earthquake Monitor</span>
              <span className="flex items-center gap-1 bg-green-500/20 border border-green-500/40 rounded-full px-2 py-0.5 text-green-400 text-xs font-semibold">
                <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse inline-block" />
                LIVE
              </span>
            </div>
            <div className="text-orange-300/70 text-xs">earthquake.phivolcs.dost.gov.ph</div>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {/* Auto refresh toggle */}
          <button
            onClick={() => setAutoRefresh(a => !a)}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold border transition-all ${
              autoRefresh
                ? 'bg-green-500/20 border-green-500/40 text-green-400'
                : 'bg-gray-700/50 border-gray-600/40 text-gray-400'
            }`}
          >
            <span className={`w-1.5 h-1.5 rounded-full ${autoRefresh ? 'bg-green-400 animate-pulse' : 'bg-gray-500'}`} />
            {autoRefresh ? `AUTO ${countdown}s` : 'AUTO OFF'}
          </button>

          {/* Manual refresh */}
          <button
            onClick={doRefresh}
            className="w-8 h-8 flex items-center justify-center rounded-lg bg-white/10 hover:bg-white/20 border border-white/20 text-white transition-all"
            title="Refresh"
          >
            🔄
          </button>

          {/* Open in new tab */}
          <a
            href={PHIVOLCS_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-orange-600 hover:bg-orange-500 border border-orange-500 text-white text-xs font-bold transition-all"
          >
            OPEN ↗
          </a>
        </div>
      </div>

      {/* Status bar */}
      <div className="flex items-center justify-between px-4 py-1.5 bg-gray-950/80 border-b border-gray-800/50 text-xs text-gray-400">
        <span>Last refresh: <span className="text-white font-mono">{lastRefresh.toLocaleTimeString('en-PH')}</span></span>
        <span className="hidden sm:block">Auto-updates every 60 seconds</span>
      </div>

      {/* Iframe — fills remaining space */}
      <div className="w-full" style={{ height: 'calc(100vh - 220px)', minHeight: '700px' }}>
        <iframe
          key={iframeKey}
          src={`${PHIVOLCS_URL}?_t=${iframeKey}`}
          title="PHIVOLCS Earthquake Monitor"
          width="100%"
          height="100%"
          frameBorder="0"
          scrolling="yes"
          sandbox="allow-scripts allow-same-origin allow-popups allow-forms allow-popups-to-escape-sandbox allow-top-navigation-by-user-activation"
          referrerPolicy="no-referrer-when-downgrade"
          allow="fullscreen"
          style={{
            width: '100%',
            height: '100%',
            border: 'none',
            display: 'block',
            backgroundColor: '#fff',
          }}
        />
      </div>
    </div>
  );
};

export default EarthquakeMonitoring;
