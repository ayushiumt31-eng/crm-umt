import type { PaymentStatus, SaleStatus } from "../types/sale";

interface SaleStatusBadgeProps {
  status: SaleStatus;
  className?: string;
}

export function SaleStatusBadge({ status, className = "" }: SaleStatusBadgeProps) {
  const configs = {
    DRAFT: "bg-slate-100 text-slate-700 dark:bg-slate-900/50 dark:text-slate-300 border-slate-200 dark:border-slate-700",
    CONFIRMED: "bg-blue-100 text-blue-700 dark:bg-blue-900/50 dark:text-blue-300 border-blue-200 dark:border-blue-800",
    COMPLETED: "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/50 dark:text-emerald-300 border-emerald-200 dark:border-emerald-800",
    CANCELLED: "bg-red-100 text-red-700 dark:bg-red-900/50 dark:text-red-300 border-red-200 dark:border-red-800",
  };

  const config = configs[status] || configs.DRAFT;
  const label = status.charAt(0) + status.slice(1).toLowerCase();

  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold border ${config} ${className}`}>
      {label}
    </span>
  );
}

interface PaymentStatusBadgeProps {
  status: PaymentStatus;
  className?: string;
}

export function PaymentStatusBadge({ status, className = "" }: PaymentStatusBadgeProps) {
  const configs = {
    PENDING: "bg-orange-100 text-orange-700 dark:bg-orange-900/50 dark:text-orange-300 border-orange-200 dark:border-orange-800",
    PARTIAL: "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/50 dark:text-yellow-300 border-yellow-200 dark:border-yellow-800",
    PAID: "bg-green-100 text-green-700 dark:bg-green-900/50 dark:text-green-300 border-green-200 dark:border-green-800",
    REFUNDED: "bg-slate-100 text-slate-700 dark:bg-slate-900/50 dark:text-slate-300 border-slate-200 dark:border-slate-700",
  };

  const config = configs[status] || configs.PENDING;
  const label = status.charAt(0) + status.slice(1).toLowerCase();

  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold border ${config} ${className}`}>
      {label}
    </span>
  );
}
