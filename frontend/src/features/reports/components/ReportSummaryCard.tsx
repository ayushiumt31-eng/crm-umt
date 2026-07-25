import type { LucideIcon } from "lucide-react";

interface ReportSummaryCardProps {
  title: string;
  value: number | string;
  icon: LucideIcon;
  subtitle?: string;
  change?: string;
  gradient?: string;
  iconBg?: string;
  formatter?: (value: number) => string;
}

export function ReportSummaryCard({
  title,
  value,
  icon: Icon,
  subtitle,
  change,
  gradient = "from-blue-50 to-cyan-100 dark:from-blue-950/40 dark:to-cyan-900/20",
  iconBg = "from-blue-500 to-cyan-600",
  formatter,
}: ReportSummaryCardProps) {
  const displayValue =
    typeof value === "number" && formatter
      ? formatter(value)
      : typeof value === "number"
      ? value.toLocaleString()
      : value;

  return (
    <div
      className={`group rounded-xl bg-gradient-to-br ${gradient} p-6 border border-slate-200/50 dark:border-slate-800/50 shadow-sm hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1`}
    >
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-sm font-semibold text-slate-700 dark:text-slate-300">
          {title}
        </h3>
        <div
          className={`flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br ${iconBg} text-white shadow-md`}
        >
          <Icon className="h-5 w-5" />
        </div>
      </div>
      <div className="text-3xl font-bold text-slate-900 dark:text-white">
        {displayValue}
      </div>
      {change && (
        <p className="text-xs text-green-600 dark:text-green-400 mt-2">
          {change}
        </p>
      )}
      {subtitle && (
        <p className="text-xs text-slate-500 dark:text-slate-400 mt-2">
          {subtitle}
        </p>
      )}
    </div>
  );
}

