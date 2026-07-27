import type { AutomationActionType } from "../config/actions";
import { getActionLabel, getActionCategory } from "../config/actions";

interface AutomationActionBadgeProps {
  action: AutomationActionType;
  className?: string;
}

const categoryColors: Record<string, string> = {
  COMMUNICATION: "bg-blue-100 text-blue-700 dark:bg-blue-900/50 dark:text-blue-300",
  TASK: "bg-orange-100 text-orange-700 dark:bg-orange-900/50 dark:text-orange-300",
  LEAD: "bg-purple-100 text-purple-700 dark:bg-purple-900/50 dark:text-purple-300",
  TAG: "bg-green-100 text-green-700 dark:bg-green-900/50 dark:text-green-300",
  NOTE: "bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300",
  DEAL: "bg-cyan-100 text-cyan-700 dark:bg-cyan-900/50 dark:text-cyan-300",
};

export function AutomationActionBadge({ action, className = "" }: AutomationActionBadgeProps) {
  const category = getActionCategory(action);
  const colorClass = categoryColors[category] || "bg-slate-100 text-slate-700";

  return (
    <span
      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold ${colorClass} ${className}`}
    >
      {getActionLabel(action)}
    </span>
  );
}
