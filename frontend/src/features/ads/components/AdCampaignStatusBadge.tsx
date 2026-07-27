import type { AdCampaignStatus } from "../types/adCampaign";

interface AdCampaignStatusBadgeProps {
  status: AdCampaignStatus;
}

const statusConfig: Record<AdCampaignStatus, { label: string; classes: string }> = {
  DRAFT: {
    label: "Draft",
    classes: "bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300",
  },
  SCHEDULED: {
    label: "Scheduled",
    classes: "bg-blue-100 text-blue-700 dark:bg-blue-900/50 dark:text-blue-300",
  },
  ACTIVE: {
    label: "Active",
    classes: "bg-green-100 text-green-700 dark:bg-green-900/50 dark:text-green-300",
  },
  PAUSED: {
    label: "Paused",
    classes: "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/50 dark:text-yellow-300",
  },
  COMPLETED: {
    label: "Completed",
    classes: "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/50 dark:text-emerald-300",
  },
  CANCELLED: {
    label: "Cancelled",
    classes: "bg-red-100 text-red-700 dark:bg-red-900/50 dark:text-red-300",
  },
  FAILED: {
    label: "Failed",
    classes: "bg-red-100 text-red-700 dark:bg-red-900/50 dark:text-red-300",
  },
};

export function AdCampaignStatusBadge({ status }: AdCampaignStatusBadgeProps) {
  const config = statusConfig[status];

  return (
    <span
      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold ${config.classes}`}
    >
      {config.label}
    </span>
  );
}
