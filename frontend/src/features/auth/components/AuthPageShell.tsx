import type { ReactNode } from "react";
import { Link } from "react-router-dom";
import { CheckCircle2, AlertCircle } from "lucide-react";
import { cn } from "@/lib/utils";

interface AuthPageShellProps {
  title: string;
  subtitle?: string;
  children: ReactNode;
  footer?: ReactNode;
  success?: string | null;
  error?: string | null;
  className?: string;
}

/**
 * AuthPageShell
 *
 * Reusable centered card used by all auth pages (Login, Forgot, Reset).
 * Renders optional success/error banners and a footer slot for links.
 */
export function AuthPageShell({
  title,
  subtitle,
  children,
  footer,
  success,
  error,
  className,
}: AuthPageShellProps) {
  return (
    <div className={cn("w-full max-w-md", className)}>
      <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-xl dark:border-slate-800 dark:bg-slate-900">
        <div className="mb-4 text-center">
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white">
            {title}
          </h1>
          {subtitle && (
            <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">
              {subtitle}
            </p>
          )}
        </div>

        {success && (
          <div className="mb-4 flex items-start gap-2.5 rounded-xl border border-green-200 bg-green-50 p-3 dark:border-green-800 dark:bg-green-950/40">
            <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-green-600 dark:text-green-400" />
            <p className="text-sm text-green-700 dark:text-green-300">{success}</p>
          </div>
        )}

        {error && (
          <div className="mb-4 flex items-start gap-2.5 rounded-xl border border-red-200 bg-red-50 p-3 dark:border-red-800 dark:bg-red-950/40">
            <AlertCircle className="mt-0.5 h-4 w-4 shrink-0 text-red-600 dark:text-red-400" />
            <p className="text-sm text-red-700 dark:text-red-300">{error}</p>
          </div>
        )}

        {children}

        {footer && (
          <div className="mt-4 border-t border-slate-200 pt-4 text-center text-sm text-slate-600 dark:border-slate-800 dark:text-slate-400">
            {footer}
          </div>
        )}
      </div>

      <p className="mt-3 text-center text-xs text-slate-500 dark:text-slate-500">
        © {new Date().getFullYear()} CRM. All rights reserved.{" "}
        <Link
          to="/login"
          className="font-medium text-blue-600 hover:underline dark:text-blue-400"
        >
          Privacy
        </Link>
      </p>
    </div>
  );
}

export default AuthPageShell;
