import { useMemo } from "react";
import { cn } from "@/lib/utils";

interface PasswordStrengthProps {
  password: string;
}

interface PasswordRule {
  label: string;
  met: boolean;
}

/**
 * PasswordStrength
 *
 * Displays a visual strength meter (Weak / Medium / Strong) plus a checklist
 * of the password policy rules:
 *  - Minimum 8 characters
 *  - Uppercase letter
 *  - Lowercase letter
 *  - Number
 *  - Special character
 */
export function PasswordStrength({ password }: PasswordStrengthProps) {
  const rules = useMemo<PasswordRule[]>(() => {
    return [
      { label: "At least 8 characters", met: password.length >= 8 },
      { label: "One uppercase letter", met: /[A-Z]/.test(password) },
      { label: "One lowercase letter", met: /[a-z]/.test(password) },
      { label: "One number", met: /[0-9]/.test(password) },
      { label: "One special character", met: /[^A-Za-z0-9]/.test(password) },
    ];
  }, [password]);

  const metCount = rules.filter((r) => r.met).length;

  const strength =
    metCount <= 2 ? "Weak" : metCount <= 4 ? "Medium" : "Strong";

  const barColor =
    metCount <= 2
      ? "bg-red-500"
      : metCount <= 4
        ? "bg-amber-500"
        : "bg-green-500";

  const labelColor =
    metCount <= 2
      ? "text-red-600 dark:text-red-400"
      : metCount <= 4
        ? "text-amber-600 dark:text-amber-400"
        : "text-green-600 dark:text-green-400";

  return (
    <div className="space-y-2">
      {/* Meter */}
      <div className="flex items-center gap-3">
        <div className="flex flex-1 gap-1.5">
          {[1, 2, 3].map((segment) => (
            <div
              key={segment}
              className={cn(
                "h-1.5 flex-1 rounded-full bg-slate-200 dark:bg-slate-700 transition-colors",
                segment <= metCount
                  ? barColor
                  : "bg-slate-200 dark:bg-slate-700"
              )}
            />
          ))}
        </div>
        <span
          className={cn("text-xs font-semibold whitespace-nowrap", labelColor)}
        >
          {password ? strength : "—"}
        </span>
      </div>

      {/* Rule checklist */}
      {password && (
        <ul className="grid grid-cols-1 sm:grid-cols-2 gap-1.5">
          {rules.map((rule) => (
            <li
              key={rule.label}
              className="flex items-center gap-2 text-xs text-slate-600 dark:text-slate-400"
            >
              <span
                className={cn(
                  "flex h-4 w-4 items-center justify-center rounded-full text-[10px] font-bold",
                  rule.met
                    ? "bg-green-100 text-green-600 dark:bg-green-900/40 dark:text-green-400"
                    : "bg-slate-100 text-slate-400 dark:bg-slate-800 dark:text-slate-500"
                )}
              >
                {rule.met ? "✓" : "•"}
              </span>
              {rule.label}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default PasswordStrength;

