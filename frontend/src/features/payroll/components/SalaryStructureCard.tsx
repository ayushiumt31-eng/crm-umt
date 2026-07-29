import type { SalaryStructure } from "../types/salaryStructure";
import { SalaryStatusBadge } from "./SalaryStatusBadge";

interface SalaryStructureCardProps {
  structure: SalaryStructure;
  onView?: (id: string) => void;
  onEdit?: (id: string) => void;
}

const formatCurrency = (value: number) =>
  new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR", maximumFractionDigits: 0 }).format(value);

export function SalaryStructureCard({ structure, onView, onEdit }: SalaryStructureCardProps) {
  return (
    <div className="rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 shadow-sm hover:shadow-md transition-all p-5">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="font-bold text-slate-900 dark:text-white">{structure.employeeName}</h3>
          <p className="text-sm text-slate-500">{structure.employeeCode}</p>
        </div>
        <SalaryStatusBadge status={structure.status} />
      </div>
      <div className="space-y-2 text-sm">
        <div className="flex justify-between">
          <span className="text-slate-500">Department</span>
          <span className="font-medium text-slate-700 dark:text-slate-300">{structure.department}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-slate-500">Basic Salary</span>
          <span className="font-medium">{formatCurrency(structure.basicSalary)}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-slate-500">Gross Salary</span>
          <span className="font-medium text-blue-600">{formatCurrency(structure.grossSalary)}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-slate-500">Net Salary</span>
          <span className="font-bold text-green-600">{formatCurrency(structure.netSalary)}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-slate-500">Effective From</span>
          <span className="font-medium">{structure.effectiveFrom}</span>
        </div>
      <div className="flex gap-2 mt-4 pt-3 border-t border-slate-100 dark:border-slate-700">
        {onView && (
          <button onClick={() => onView(structure.id)} className="flex-1 text-center text-sm font-medium text-blue-600 hover:text-blue-700 dark:text-blue-400 py-1.5 rounded-lg hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-colors">
            View
          </button>
        )}
        {onEdit && (
          <button onClick={() => onEdit(structure.id)} className="flex-1 text-center text-sm font-medium text-cyan-600 hover:text-cyan-700 dark:text-cyan-400 py-1.5 rounded-lg hover:bg-cyan-50 dark:hover:bg-cyan-900/20 transition-colors">
            Edit
          </button>
        )}
      </div>
  );
}
