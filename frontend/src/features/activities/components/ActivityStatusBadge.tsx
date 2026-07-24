import type { ActivityStatus } from "../types/activity";

interface ActivityStatusBadgeProps {
  status: ActivityStatus;
  className?: string;
}

export function ActivityStatusBadge({ status, className = "" }: ActivityStatusBadgeProps) {
  const configs: Record<ActivityStatus, string> = {
    PENDING: "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/50 dark:text-yellow-300 border-yellow-200 dark:border-yellow-800",
    IN_PROGRESS: "bg-blue-100 text-blue-700 dark:bg-blue-900/50 dark:text-blue-300 border-blue-200 dark:border-blue-800",
    COMPLETED: "bg-green-100 text-green-700 dark:bg-green-900/50 dark:text-green-300 border-green-200 dark:border-green-800",
    CANCELLED: "bg-red-100 text-red-700 dark:bg-red-900/50 dark:text-red-300 border-red-200 dark:border-red-800",
  };

  const config = configs[status] || configs.PENDING;
  const label = status.replace("_", " ").replace(/\b\w/g, (c) => c.toUpperCase());

  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold border ${config} ${className}`}>
      {label}
    </span>
  );
}

