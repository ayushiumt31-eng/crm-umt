import type { AutomationTrigger } from "../config/triggers";
import { getTriggerLabel } from "../config/triggers";

interface AutomationTriggerBadgeProps {
  trigger: AutomationTrigger;
  className?: string;
}

const triggerColors: Record<string, string> = {
  NEW_LEAD_CREATED: "bg-blue-100 text-blue-700 dark:bg-blue-900/50 dark:text-blue-300",
  LEAD_STATUS_CHANGED: "bg-indigo-100 text-indigo-700 dark:bg-indigo-900/50 dark:text-indigo-300",
  LEAD_STAGE_CHANGED: "bg-purple-100 text-purple-700 dark:bg-purple-900/50 dark:text-purple-300",
  CUSTOMER_CREATED: "bg-green-100 text-green-700 dark:bg-green-900/50 dark:text-green-300",
  CUSTOMER_STATUS_CHANGED: "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/50 dark:text-emerald-300",
  DEAL_CREATED: "bg-cyan-100 text-cyan-700 dark:bg-cyan-900/50 dark:text-cyan-300",
  DEAL_STATUS_CHANGED: "bg-teal-100 text-teal-700 dark:bg-teal-900/50 dark:text-teal-300",
  DEAL_WON: "bg-green-100 text-green-700 dark:bg-green-900/50 dark:text-green-300",
  DEAL_LOST: "bg-red-100 text-red-700 dark:bg-red-900/50 dark:text-red-300",
  TASK_COMPLETED: "bg-orange-100 text-orange-700 dark:bg-orange-900/50 dark:text-orange-300",
  TASK_OVERDUE: "bg-rose-100 text-rose-700 dark:bg-rose-900/50 dark:text-rose-300",
  CAMPAIGN_COMPLETED: "bg-amber-100 text-amber-700 dark:bg-amber-900/50 dark:text-amber-300",
};

export function AutomationTriggerBadge({ trigger, className = "" }: AutomationTriggerBadgeProps) {
  const colorClass = triggerColors[trigger] || "bg-slate-100 text-slate-700";

  return (
    <span
      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold ${colorClass} ${className}`}
    >
      {getTriggerLabel(trigger)}
    </span>
  );
}
