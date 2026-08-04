import { useCallback, useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

interface OtpInputProps {
  value: string;
  onChange: (value: string) => void;
  length?: number;
  disabled?: boolean;
  error?: boolean;
  autoFocus?: boolean;
}

/**
 * OtpInput
 *
 * A 6-digit OTP input with:
 *  - Auto focus on the first box
 *  - Auto-advance to the next box as the user types
 *  - Backspace support (moves to previous box)
 *  - Paste support (fills all boxes at once)
 *  - Keyboard navigation (arrow keys)
 *
 * The value is a single string of digits; the parent owns the state.
 */
export function OtpInput({
  value,
  onChange,
  length = 6,
  disabled = false,
  error = false,
  autoFocus = true,
}: OtpInputProps) {
  const inputsRef = useRef<Array<HTMLInputElement | null>>([]);

  const digits = value.split("").slice(0, length);
  const currentIndex = Math.min(digits.length, length - 1);

  const focusIndex = useCallback(
    (index: number) => {
      const el = inputsRef.current[index];
      if (el) {
        el.focus();
        el.select();
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [inputsRef]
  );

  useEffect(() => {
    if (autoFocus) {
      focusIndex(0);
    }
  }, [autoFocus, focusIndex]);

  const handleChange = (
    index: number,
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const inputValue = event.target.value;
    // Only allow digits
    const cleaned = inputValue.replace(/\D/g, "");

    if (cleaned.length > 1) {
      // Paste: fill all remaining slots starting at this index
      const next = value.slice(0, index) + cleaned;
      onChange(next.slice(0, length));
      focusIndex(Math.min(index + cleaned.length, length - 1));
      return;
    }

    const chars = value.split("");
    chars[index] = cleaned;
    const next = chars.join("");
    onChange(next);

    if (cleaned) {
      focusIndex(Math.min(index + 1, length - 1));
    }
  };

  const handleKeyDown = (
    index: number,
    event: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (event.key === "Backspace") {
      event.preventDefault();
      const chars = value.split("");
      if (chars[index]) {
        chars[index] = "";
        onChange(chars.join(""));
      } else if (index > 0) {
        chars[index - 1] = "";
        onChange(chars.join(""));
        focusIndex(index - 1);
      }
    } else if (event.key === "ArrowLeft" && index > 0) {
      event.preventDefault();
      focusIndex(index - 1);
    } else if (event.key === "ArrowRight" && index < length - 1) {
      event.preventDefault();
      focusIndex(index + 1);
    }
  };

  const handlePaste = (index: number, event: React.ClipboardEvent) => {
    event.preventDefault();
    const pasted = event.clipboardData.getData("text").replace(/\D/g, "");
    if (!pasted) return;
    const next = value.slice(0, index) + pasted;
    onChange(next.slice(0, length));
    focusIndex(Math.min(index + pasted.length, length - 1));
  };

  return (
    <div className="flex justify-center gap-2 sm:gap-3">
      {Array.from({ length }).map((_, index) => (
        <input
          key={index}
          ref={(el) => {
            inputsRef.current[index] = el;
          }}
          type="text"
          inputMode="numeric"
          autoComplete="one-time-code"
          maxLength={1}
          value={digits[index] || ""}
          disabled={disabled}
          onChange={(e) => handleChange(index, e)}
          onKeyDown={(e) => handleKeyDown(index, e)}
          onPaste={(e) => handlePaste(index, e)}
          aria-label={`OTP digit ${index + 1}`}
          className={cn(
            "h-12 w-10 rounded-lg border border-input bg-transparent text-center text-xl font-bold text-slate-900 outline-none transition-colors focus:border-blue-500 focus:ring-2 focus:ring-blue-500/30 disabled:cursor-not-allowed disabled:opacity-50 sm:h-14 sm:w-12 dark:text-white",
            error &&
              "border-red-500 focus:border-red-500 focus:ring-red-500/30"
          )}
        />
      ))}
    </div>
  );
}

export default OtpInput;
