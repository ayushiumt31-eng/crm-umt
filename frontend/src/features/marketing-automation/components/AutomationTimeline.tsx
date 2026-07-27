import { Clock, CheckCircle2, XCircle, AlertTriangle, SkipForward } from "lucide-react";
import type { AutomationLog } from "../types/automationLog";
import { AutomationActionBadge } from "./AutomationActionBadge";

interface AutomationTimelineProps {
  logs: AutomationLog[];
}

const statusConfig = {
  SUCCESS: { icon: CheckCircle2, color: "text-green-600 dark:text-green-400", bg: "bg-green-100 dark:bg-green-900/30" },
  FAILED: { icon: XCircle, color: "text-red-600 dark:text-red-400", bg: "bg-red-100 dark:bg-red-900/30" },
  PARTIAL: { icon: AlertTriangle, color: "text-amber-600 dark:text-amber-400", bg: "bg-amber-100 dark:bg-amber-900/30" },
  SKIPPED: { icon: SkipForward, color: "text-slate-600 dark:text-slate-400", bg: "bg-slate-100 dark:bg-slate-800" },
};

export function AutomationTimeline({ logs }: AutomationTimelineProps) {
  if (logs.length === 0) {
    return (
      <div className="text-center py-8 text-slate-500">
        No execution logs found.
      </div>
    );
  }

  const sortedLogs = [...logs].sort(
    (a, b) => new Date(b.executionDate).getTime() - new Date(a.executionDate).getTime()
  );

  return (
    <div className="space-y-4">
      {sortedLogs.slice(0, 10).map((log) => {
        const config = statusConfig[log.status];
        const Icon = config.icon;

        return (
          <div key={log.id} className="flex items-start gap-4">
            <div className="flex flex-col items-center">
              <div className={`flex h-8 w-8 items-center justify-center rounded-full ${config.bg}`}>
                <Icon className={`h-4 w-4 ${config.color}`} />
              </div>
              <div className="w-0.5 h-full min-h-[4rem] bg-slate-200 dark:bg-slate-700" />
            </div>
            <div className="flex-1 pb-4">
              <div className="flex items-center gap-2 mb-1">
                <span className="text-sm font-semibold text-slate-900 dark:text-white">
                  {log.automationName}
                </span>
                <span className={`text-xs font-semibold ${config.color}`}>
                  {log.status}
                </span>
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400 mb-1">
                Target: {log.target} ({log.targetType})
              </p>
              <div className="flex flex-wrap gap-1 mb-1">
                {log.actionsExecuted.map((action) => (
                  <AutomationActionBadge key={action} action={action} />
                ))}
              </div>
              {log.errorMessage && (
                <p className="text-xs text-red-600 dark:text-red-400 mt-1">
                  {log.errorMessage}
                </p>
              )}
              <div className="flex items-center gap-3 mt-1 text-xs text-slate-500">
                <span className="flex items-center gap-1">
                  <Clock className="h-3 w-3" />
                  {new Date(log.executionDate).toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </span>
                <span>{log.duration.toFixed(1)}s</span>
                <span>by {log.executedByName}</span>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
