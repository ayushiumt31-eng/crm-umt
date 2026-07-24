import { CheckCircle2, XCircle } from "lucide-react";
import type { RoleStatus } from "../types/role";

interface RoleStatusBadgeProps {
  status: RoleStatus;
  className?: string;
}

export function RoleStatusBadge({ status, className = "" }: RoleStatusBadgeProps) {
  if (status === "ACTIVE") {
    return (
      <div className={`inline-flex items-center gap-1.5 rounded-full bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-950/40 dark:to-emerald-950/40 px-3 py-1 ${className}`}>
        <CheckCircle2 className="h-4 w-4 text-green-600 dark:text-green-400" />
        <span className="text-sm font-semibold text-green-700 dark:text-green-300">Active</span>
      </div>
    );
  }

  return (
    <div className={`inline-flex items-center gap-1.5 rounded-full bg-gradient-to-r from-slate-50 to-slate-100 dark:from-slate-950/40 dark:to-slate-900/40 px-3 py-1 ${className}`}>
      <XCircle className="h-4 w-4 text-slate-600 dark:text-slate-400" />
      <span className="text-sm font-semibold text-slate-700 dark:text-slate-300">Inactive</span>
    </div>
  );
}
