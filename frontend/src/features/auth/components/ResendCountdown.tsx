import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { useCountdown } from "../hooks/useCountdown";
import { cn } from "@/lib/utils";

interface ResendCountdownProps {
  onResend: () => Promise<void> | void;
  seconds?: number;
  className?: string;
}

/**
 * ResendCountdown
 *
 * Reusable "Resend OTP" button with a 60s cooldown timer.
 * The countdown starts automatically on mount and can be restarted
 * by calling `start` (via the onResend flow).
 */
export function ResendCountdown({
  onResend,
  seconds = 60,
  className,
}: ResendCountdownProps) {
  const { seconds: remaining, isRunning, start } = useCountdown(seconds);

  useEffect(() => {
    start();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleResend = async () => {
    await onResend();
    start();
  };

  return (
    <div
      className={cn(
        "flex items-center justify-center gap-2 text-sm",
        className
      )}
    >
      {isRunning ? (
        <p className="text-slate-500 dark:text-slate-400">
          Resend OTP in{" "}
          <span className="font-bold text-slate-700 dark:text-slate-200">
            00:{String(remaining).padStart(2, "0")}
          </span>
        </p>
      ) : (
        <Button
          type="button"
          variant="ghost"
          onClick={handleResend}
          className="font-medium text-blue-600 hover:text-blue-700 hover:bg-transparent dark:text-blue-400 dark:hover:text-blue-300"
        >
          Resend OTP
        </Button>
      )}
    </div>
  );
}

export default ResendCountdown;
