import { useEffect, useRef, useState, useCallback } from 'react';

/**
 * useCriticalAlarm
 * Plays a repeating siren-like alarm tone using the Web Audio API
 * whenever `isCritical` is true. The alarm stops automatically when
 * `isCritical` becomes false or when the user mutes/acknowledges it.
 */
export function useCriticalAlarm(isCritical: boolean) {
  const audioCtxRef = useRef<AudioContext | null>(null);
  const intervalRef = useRef<number | null>(null);
  const [muted, setMuted] = useState(false);
  const [acknowledged, setAcknowledged] = useState(false);

  // Reset acknowledgement when the critical state clears
  useEffect(() => {
    if (!isCritical) {
      setAcknowledged(false);
    }
  }, [isCritical]);

  const ensureCtx = useCallback(() => {
    if (!audioCtxRef.current) {
      const AudioCtx =
        window.AudioContext ||
        (window as unknown as { webkitAudioContext: typeof AudioContext })
          .webkitAudioContext;
      if (AudioCtx) {
        audioCtxRef.current = new AudioCtx();
      }
    }
    return audioCtxRef.current;
  }, []);

  const playBeep = useCallback(() => {
    const ctx = ensureCtx();
    if (!ctx) return;

    // Resume on user gesture if needed
    if (ctx.state === 'suspended') {
      ctx.resume().catch(() => {});
    }

    const now = ctx.currentTime;

    // Two-tone siren: high pitch then low pitch
    const tones = [
      { freq: 880, start: 0.0, dur: 0.35 },
      { freq: 600, start: 0.4, dur: 0.35 },
    ];

    tones.forEach(({ freq, start, dur }) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'square';
      osc.frequency.setValueAtTime(freq, now + start);

      // Envelope to avoid clicks
      gain.gain.setValueAtTime(0.0001, now + start);
      gain.gain.exponentialRampToValueAtTime(0.25, now + start + 0.02);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + start + dur);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(now + start);
      osc.stop(now + start + dur + 0.05);
    });
  }, [ensureCtx]);

  useEffect(() => {
    const shouldAlarm = isCritical && !muted && !acknowledged;

    if (shouldAlarm) {
      // Trigger immediately
      playBeep();
      // Repeat every 1.2s
      intervalRef.current = window.setInterval(() => {
        playBeep();
      }, 1200);
    }

    return () => {
      if (intervalRef.current !== null) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };
  }, [isCritical, muted, acknowledged, playBeep]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (intervalRef.current !== null) {
        clearInterval(intervalRef.current);
      }
      if (audioCtxRef.current) {
        audioCtxRef.current.close().catch(() => {});
      }
    };
  }, []);

  const acknowledge = () => setAcknowledged(true);
  const toggleMute = () => setMuted((m) => !m);

  // Allow user-gesture priming (some browsers block AudioContext until interaction)
  const enableAudio = useCallback(() => {
    const ctx = ensureCtx();
    if (ctx && ctx.state === 'suspended') {
      ctx.resume().catch(() => {});
    }
  }, [ensureCtx]);

  return { muted, toggleMute, acknowledged, acknowledge, enableAudio };
}
