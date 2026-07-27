import type { AutomationStatus } from "../types/automation";

interface AutomationStatusBadgeProps {
  status: AutomationStatus;
  className?: string;
}

const statusConfig: Record<AutomationStatus, { label: string; classes: string }> = {
  DRAFT: {
    label: "Draft",
    classes: "bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300",
  },
  ACTIVE: {
    label: "Active",
    classes: "bg-green-100 text-green-700 dark:bg-green-900/50 dark:text-green-300",
  },
  INACTIVE: {
    label: "Inactive",
    classes: "bg-red-100 text-red-700 dark:bg-red-900/50 dark:text-red-300",
  },
  PAUSED: {
    label: "Paused",
    classes: "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/50 dark:text-yellow-300",
  },
};

export function AutomationStatusBadge({ status, className = "" }: AutomationStatusBadgeProps) {
  const config = statusConfig[status];

  return (
    <span
      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold ${config.classes} ${className}`}
    >
      {config.label}
    </span>
  );
}
