import type { SalaryStructureStatus } from "../types/salaryStructure";

interface SalaryStatusBadgeProps {
  status: SalaryStructureStatus;
  className?: string;
}

const statusConfig: Record<SalaryStructureStatus, { label: string; classes: string }> = {
  ACTIVE: { label: "Active", classes: "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300 border-green-300 dark:border-green-700" },
  INACTIVE: { label: "Inactive", classes: "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-300 border-red-300 dark:border-red-700" },
  DRAFT: { label: "Draft", classes: "bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300 border-slate-300 dark:border-slate-600" },
};

export function SalaryStatusBadge({ status, className = "" }: SalaryStatusBadgeProps) {
  const config = statusConfig[status] || statusConfig.DRAFT;
  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold border ${config.classes} ${className}`}>
      {config.label}
    </span>
  );
}
