import type { WhatsAppCampaignStatus } from "../types/whatsappCampaign";

interface WhatsAppCampaignStatusBadgeProps {
  status: WhatsAppCampaignStatus;
}

const statusConfig: Record<
  WhatsAppCampaignStatus,
  { label: string; classes: string }
> = {
  DRAFT: {
    label: "Draft",
    classes:
      "bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300 border border-slate-200 dark:border-slate-700",
  },
  SCHEDULED: {
    label: "Scheduled",
    classes:
      "bg-blue-100 text-blue-700 dark:bg-blue-900/50 dark:text-blue-300 border border-blue-200 dark:border-blue-800",
  },
  PROCESSING: {
    label: "Processing",
    classes:
      "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/50 dark:text-yellow-300 border border-yellow-200 dark:border-yellow-800",
  },
  SENT: {
    label: "Sent",
    classes:
      "bg-green-100 text-green-700 dark:bg-green-900/50 dark:text-green-300 border border-green-200 dark:border-green-800",
  },
  PAUSED: {
    label: "Paused",
    classes:
      "bg-orange-100 text-orange-700 dark:bg-orange-900/50 dark:text-orange-300 border border-orange-200 dark:border-orange-800",
  },
  CANCELLED: {
    label: "Cancelled",
    classes:
      "bg-red-100 text-red-700 dark:bg-red-900/50 dark:text-red-300 border border-red-200 dark:border-red-800",
  },
  FAILED: {
    label: "Failed",
    classes:
      "bg-red-100 text-red-700 dark:bg-red-900/50 dark:text-red-300 border border-red-200 dark:border-red-800",
  },
};

export function WhatsAppCampaignStatusBadge({
  status,
}: WhatsAppCampaignStatusBadgeProps) {
  const config = statusConfig[status];

  return (
    <span
      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold ${config.classes}`}
    >
      {config.label}
    </span>
  );
}

