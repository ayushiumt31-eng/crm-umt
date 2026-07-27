import type { SocialPostStatus } from "../types/socialPost";

interface SocialPostStatusBadgeProps {
  status: SocialPostStatus;
  className?: string;
}

const statusConfig: Record<SocialPostStatus, string> = {
  DRAFT:
    "bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300 border-slate-200 dark:border-slate-700",
  SCHEDULED:
    "bg-blue-100 text-blue-700 dark:bg-blue-900/50 dark:text-blue-300 border-blue-200 dark:border-blue-800",
  PUBLISHED:
    "bg-green-100 text-green-700 dark:bg-green-900/50 dark:text-green-300 border-green-200 dark:border-green-800",
  PAUSED:
    "bg-orange-100 text-orange-700 dark:bg-orange-900/50 dark:text-orange-300 border-orange-200 dark:border-orange-800",
  FAILED:
    "bg-red-100 text-red-700 dark:bg-red-900/50 dark:text-red-300 border-red-200 dark:border-red-800",
  CANCELLED:
    "bg-rose-100 text-rose-700 dark:bg-rose-900/50 dark:text-rose-300 border-rose-200 dark:border-rose-800",
};

export function SocialPostStatusBadge({
  status,
  className = "",
}: SocialPostStatusBadgeProps) {
  const config = statusConfig[status] || statusConfig.DRAFT;
  const label = status.charAt(0) + status.slice(1).toLowerCase();

  return (
    <span
      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold border ${config} ${className}`}
    >
      {label}
    </span>
  );
}

