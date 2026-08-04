import { useCallback, useEffect, useRef, useState } from "react";

interface UseCountdownResult {
  seconds: number;
  isRunning: boolean;
  start: (initialSeconds?: number) => void;
  reset: () => void;
}

/**
 * useCountdown
 *
 * Reusable countdown timer hook (used for OTP resend cooldown).
 * - start(initialSeconds) begins the countdown.
 * - When the timer reaches 0, it stops automatically.
 * - reset() stops the timer and sets seconds back to the initial value.
 */
export function useCountdown(initialSeconds = 60): UseCountdownResult {
  const [seconds, setSeconds] = useState(initialSeconds);
  const [isRunning, setIsRunning] = useState(false);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const clear = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  }, []);

  const start = useCallback(
    (value?: number) => {
      clear();
      const total = value ?? initialSeconds;
      setSeconds(total);
      setIsRunning(true);
      intervalRef.current = setInterval(() => {
        setSeconds((prev) => {
          if (prev <= 1) {
            clear();
            setIsRunning(false);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    },
    [clear, initialSeconds]
  );

  const reset = useCallback(() => {
    clear();
    setSeconds(initialSeconds);
    setIsRunning(false);
  }, [clear, initialSeconds]);

  useEffect(() => clear, [clear]);

  return { seconds, isRunning, start, reset };
}
