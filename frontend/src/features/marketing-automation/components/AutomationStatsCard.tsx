import { Workflow, PlayCircle, PauseCircle, FileText, CheckCircle2, XCircle, Activity } from "lucide-react";
import type { Automation } from "../types/automation";

interface AutomationStatsCardProps {
  automations: Automation[];
}

interface StatItem {
  label: string;
  value: number | string;
  icon: typeof Workflow;
  gradient: string;
  iconGradient: string;
}

export function AutomationStatsCard({ automations }: AutomationStatsCardProps) {
  const totalExecutions = automations.reduce((sum, a) => sum + a.executionCount, 0);
  const totalSuccess = automations.reduce((sum, a) => sum + a.successCount, 0);
  const totalFailed = automations.reduce((sum, a) => sum + a.failedCount, 0);

  const stats: StatItem[] = [
    {
      label: "Total Automations",
      value: automations.length,
      icon: Workflow,
      gradient: "bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-950/40 dark:to-blue-900/20",
      iconGradient: "bg-gradient-to-br from-blue-500 to-blue-600",
    },
    {
      label: "Active",
      value: automations.filter((a) => a.status === "ACTIVE").length,
      icon: PlayCircle,
      gradient: "bg-gradient-to-br from-green-50 to-green-100 dark:from-green-950/40 dark:to-green-900/20",
      iconGradient: "bg-gradient-to-br from-green-500 to-green-600",
    },
    {
      label: "Inactive",
      value: automations.filter((a) => a.status === "INACTIVE").length,
      icon: PauseCircle,
      gradient: "bg-gradient-to-br from-red-50 to-red-100 dark:from-red-950/40 dark:to-red-900/20",
      iconGradient: "bg-gradient-to-br from-red-500 to-red-600",
    },
    {
      label: "Draft",
      value: automations.filter((a) => a.status === "DRAFT").length,
      icon: FileText,
      gradient: "bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-950/40 dark:to-slate-900/20",
      iconGradient: "bg-gradient-to-br from-slate-500 to-slate-600",
    },
    {
      label: "Total Executions",
      value: totalExecutions.toLocaleString(),
      icon: Activity,
      gradient: "bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-950/40 dark:to-purple-900/20",
      iconGradient: "bg-gradient-to-br from-purple-500 to-purple-600",
    },
    {
      label: "Successful",
      value: totalSuccess.toLocaleString(),
      icon: CheckCircle2,
      gradient: "bg-gradient-to-br from-emerald-50 to-emerald-100 dark:from-emerald-950/40 dark:to-emerald-900/20",
      iconGradient: "bg-gradient-to-br from-emerald-500 to-emerald-600",
    },
    {
      label: "Failed",
      value: totalFailed.toLocaleString(),
      icon: XCircle,
      gradient: "bg-gradient-to-br from-rose-50 to-rose-100 dark:from-rose-950/40 dark:to-rose-900/20",
      iconGradient: "bg-gradient-to-br from-rose-500 to-rose-600",
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-7 gap-4">
      {stats.map((stat) => {
        const Icon = stat.icon;
        return (
          <div
            key={stat.label}
            className={`group rounded-xl ${stat.gradient} p-6 border border-slate-200/50 dark:border-slate-800/50 shadow-sm hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1`}
          >
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-sm font-semibold text-slate-900 dark:text-slate-200">
                {stat.label}
              </h3>
              <div
                className={`flex h-10 w-10 items-center justify-center rounded-lg ${stat.iconGradient} text-white shadow-md`}
              >
                <Icon className="h-5 w-5" />
              </div>
            </div>
            <div className="text-3xl font-bold text-slate-900 dark:text-slate-100">
              {stat.value}
            </div>
          </div>
        );
      })}
    </div>
  );
}
