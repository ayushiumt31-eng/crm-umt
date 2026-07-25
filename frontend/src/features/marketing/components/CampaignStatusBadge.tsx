import type { CampaignStatus } from "../types/campaign";

interface CampaignStatusBadgeProps {
  status: CampaignStatus;
  className?: string;
}

const statusConfig: Record<CampaignStatus, string> = {
  DRAFT:
    "bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300 border-slate-200 dark:border-slate-700",
  SCHEDULED:
    "bg-blue-100 text-blue-700 dark:bg-blue-900/50 dark:text-blue-300 border-blue-200 dark:border-blue-800",
  RUNNING:
    "bg-green-100 text-green-700 dark:bg-green-900/50 dark:text-green-300 border-green-200 dark:border-green-800",
  COMPLETED:
    "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/50 dark:text-emerald-300 border-emerald-200 dark:border-emerald-800",
  PAUSED:
    "bg-amber-100 text-amber-700 dark:bg-amber-900/50 dark:text-amber-300 border-amber-200 dark:border-amber-800",
  CANCELLED:
    "bg-red-100 text-red-700 dark:bg-red-900/50 dark:text-red-300 border-red-200 dark:border-red-800",
};

export function CampaignStatusBadge({
  status,
  className = "",
}: CampaignStatusBadgeProps) {
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

