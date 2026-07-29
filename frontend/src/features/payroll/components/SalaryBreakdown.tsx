import type { SalaryStructure } from "../types/salaryStructure";

interface SalaryBreakdownProps {
  structure: SalaryStructure;
}

const formatCurrency = (value: number) =>
  new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR", maximumFractionDigits: 0 }).format(value);

export function SalaryBreakdown({ structure }: SalaryBreakdownProps) {
  return (
    <div className="space-y-6">
      <div>
        <h4 className="font-semibold text-slate-700 dark:text-slate-300 mb-3 flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
          Earnings
        </h4>
        <div className="space-y-2">
          <div className="flex justify-between py-1.5 px-3 rounded-lg bg-slate-50 dark:bg-slate-800/50">
            <span className="text-sm text-slate-600 dark:text-slate-400">Basic Salary</span>
            <span className="text-sm font-medium">{formatCurrency(structure.basicSalary)}</span>
          </div>
          <div className="flex justify-between py-1.5 px-3">
            <span className="text-sm text-slate-600 dark:text-slate-400">HRA</span>
            <span className="text-sm font-medium">{formatCurrency(structure.hra)}</span>
          </div>
          <div className="flex justify-between py-1.5 px-3 rounded-lg bg-slate-50 dark:bg-slate-800/50">
            <span className="text-sm text-slate-600 dark:text-slate-400">Conveyance Allowance</span>
            <span className="text-sm font-medium">{formatCurrency(structure.conveyanceAllowance)}</span>
          </div>
          <div className="flex justify-between py-1.5 px-3">
            <span className="text-sm text-slate-600 dark:text-slate-400">Medical Allowance</span>
            <span className="text-sm font-medium">{formatCurrency(structure.medicalAllowance)}</span>
          </div>
          <div className="flex justify-between py-1.5 px-3 rounded-lg bg-slate-50 dark:bg-slate-800/50">
            <span className="text-sm text-slate-600 dark:text-slate-400">Special Allowance</span>
            <span className="text-sm font-medium">{formatCurrency(structure.specialAllowance)}</span>
          </div>
          <div className="flex justify-between py-1.5 px-3">
            <span className="text-sm text-slate-600 dark:text-slate-400">Other Allowances</span>
            <span className="text-sm font-medium">{formatCurrency(structure.otherAllowances)}</span>
          </div>
          <div className="flex justify-between py-1.5 px-3 rounded-lg bg-slate-50 dark:bg-slate-800/50">
            <span className="text-sm text-slate-600 dark:text-slate-400">Bonus</span>
            <span className="text-sm font-medium">{formatCurrency(structure.bonus)}</span>
          </div>
          <div className="flex justify-between py-2 px-3 rounded-lg bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-200 dark:border-emerald-800">
            <span className="text-sm font-bold text-emerald-700 dark:text-emerald-300">Gross Salary</span>
            <span className="text-sm font-bold text-emerald-700 dark:text-emerald-300">{formatCurrency(structure.grossSalary)}</span>
          </div>
      </div>

      <div>
        <h4 className="font-semibold text-slate-700 dark:text-slate-300 mb-3 flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-red-500"></span>
          Deductions
        </h4>
        <div className="space-y-2">
          <div className="flex justify-between py-1.5 px-3 rounded-lg bg-red-50 dark:bg-red-900/20">
            <span className="text-sm text-slate-600 dark:text-slate-400">Provident Fund</span>
            <span className="text-sm font-medium">{formatCurrency(structure.providentFund)}</span>
          </div>
          <div className="flex justify-between py-1.5 px-3">
            <span className="text-sm text-slate-600 dark:text-slate-400">Professional Tax</span>
            <span className="text-sm font-medium">{formatCurrency(structure.professionalTax)}</span>
          </div>
          <div className="flex justify-between py-1.5 px-3 rounded-lg bg-red-50 dark:bg-red-900/20">
            <span className="text-sm text-slate-600 dark:text-slate-400">Income Tax</span>
            <span className="text-sm font-medium">{formatCurrency(structure.incomeTax)}</span>
          </div>
          <div className="flex justify-between py-1.5 px-3">
            <span className="text-sm text-slate-600 dark:text-slate-400">Other Deductions</span>
            <span className="text-sm font-medium">{formatCurrency(structure.otherDeductions)}</span>
          </div>
          <div className="flex justify-between py-2 px-3 rounded-lg bg-red-100 dark:bg-red-900/40 border border-red-200 dark:border-red-800">
            <span className="text-sm font-bold text-red-700 dark:text-red-300">Total Deductions</span>
            <span className="text-sm font-bold text-red-700 dark:text-red-300">{formatCurrency(structure.totalDeductions)}</span>
          </div>
      </div>

      <div className="py-3 px-3 rounded-lg bg-gradient-to-r from-emerald-50 to-teal-50 dark:from-emerald-950/30 dark:to-teal-950/30 border-2 border-emerald-300 dark:border-emerald-700">
        <div className="flex justify-between items-center">
          <span className="font-bold text-emerald-800 dark:text-emerald-200">Net Salary</span>
          <span className="text-lg font-bold text-emerald-800 dark:text-emerald-200">{formatCurrency(structure.netSalary)}</span>
        </div>

      <p className="text-xs text-amber-600 dark:text-amber-400 italic mt-2">
        Demo Payroll Calculation — These are simplified demo calculations. Real payroll rules will be handled by the backend.
      </p>
    </div>
  );
}
