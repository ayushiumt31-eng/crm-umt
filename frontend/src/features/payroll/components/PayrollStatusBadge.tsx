import type { PayrollStatus } from "../types/payroll";

interface PayrollStatusBadgeProps {
  status: PayrollStatus;
  className?: string;
}

const statusConfig: Record<PayrollStatus, { label: string; classes: string }> = {
  DRAFT: { label: "Draft", classes: "bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300 border-slate-300 dark:border-slate-600" },
  PROCESSING: { label: "Processing", classes: "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300 border-blue-300 dark:border-blue-700" },
  PROCESSED: { label: "Processed", classes: "bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-300 border-purple-300 dark:border-purple-700" },
  PENDING_APPROVAL: { label: "Pending Approval", classes: "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-300 border-amber-300 dark:border-amber-700" },
  APPROVED: { label: "Approved", classes: "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-300 border-emerald-300 dark:border-emerald-700" },
  REJECTED: { label: "Rejected", classes: "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-300 border-red-300 dark:border-red-700" },
  PAID: { label: "Paid", classes: "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300 border-green-300 dark:border-green-700" },
  CANCELLED: { label: "Cancelled", classes: "bg-rose-100 text-rose-700 dark:bg-rose-900/30 dark:text-rose-300 border-rose-300 dark:border-rose-700" },
};

export function PayrollStatusBadge({ status, className = "" }: PayrollStatusBadgeProps) {
  const config = statusConfig[status] || statusConfig.DRAFT;
  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold border ${config.classes} ${className}`}>
      {config.label}
    </span>
  );
}
