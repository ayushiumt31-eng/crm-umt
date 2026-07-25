import type { WhatsAppHistoryStatus } from "../types/whatsappHistory";

interface WhatsAppStatusBadgeProps {
  status: WhatsAppHistoryStatus;
}

const statusConfig: Record<
  WhatsAppHistoryStatus,
  { label: string; classes: string }
> = {
  PENDING: {
    label: "Pending",
    classes:
      "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/50 dark:text-yellow-300 border border-yellow-200 dark:border-yellow-800",
  },
  SENT: {
    label: "Sent",
    classes:
      "bg-blue-100 text-blue-700 dark:bg-blue-900/50 dark:text-blue-300 border border-blue-200 dark:border-blue-800",
  },
  DELIVERED: {
    label: "Delivered",
    classes:
      "bg-green-100 text-green-700 dark:bg-green-900/50 dark:text-green-300 border border-green-200 dark:border-green-800",
  },
  FAILED: {
    label: "Failed",
    classes:
      "bg-red-100 text-red-700 dark:bg-red-900/50 dark:text-red-300 border border-red-200 dark:border-red-800",
  },
};

export function WhatsAppStatusBadge({
  status,
}: WhatsAppStatusBadgeProps) {
  const config = statusConfig[status];

  return (
    <span
      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold ${config.classes}`}
    >
      {config.label}
    </span>
  );
}

