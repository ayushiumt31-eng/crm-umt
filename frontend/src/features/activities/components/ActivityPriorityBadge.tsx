import type { ActivityPriority } from "../types/activity";

interface ActivityPriorityBadgeProps {
  priority: ActivityPriority;
  className?: string;
}

export function ActivityPriorityBadge({ priority, className = "" }: ActivityPriorityBadgeProps) {
  const configs: Record<ActivityPriority, string> = {
    LOW: "bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300 border-slate-200 dark:border-slate-700",
    MEDIUM: "bg-blue-100 text-blue-700 dark:bg-blue-900/50 dark:text-blue-300 border-blue-200 dark:border-blue-800",
    HIGH: "bg-red-100 text-red-700 dark:bg-red-900/50 dark:text-red-300 border-red-200 dark:border-red-800",
  };

  const config = configs[priority] || configs.LOW;

  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold border ${config} ${className}`}>
      {priority}
    </span>
  );
}

