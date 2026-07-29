interface PayrollSummaryCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
}

export function PayrollSummaryCard({ title, value, subtitle }: PayrollSummaryCardProps) {
  return (
    <div className="rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 p-4">
      <p className="text-xs font-medium text-slate-500 dark:text-slate-400">{title}</p>
      <p className="text-xl font-bold text-slate-900 dark:text-white mt-1">{value}</p>
      {subtitle && <p className="text-xs text-slate-400 mt-1">{subtitle}</p>}
    </div>
  );
}
