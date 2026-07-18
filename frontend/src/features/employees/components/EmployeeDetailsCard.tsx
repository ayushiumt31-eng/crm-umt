import { Copy, Mail, Phone, Building2, Calendar, DollarSign, User } from "lucide-react";
import { useState } from "react";
import type { Employee } from "../types/employee";

interface EmployeeDetailsCardProps {
  icon: React.ReactNode;
  label: string;
  value: string | number;
  colorClass: string;
  subValue?: string;
}

export function EmployeeDetailsCard({
  icon,
  label,
  value,
  colorClass,
  subValue,
}: EmployeeDetailsCardProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(String(value));
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className={`group rounded-xl bg-gradient-to-br ${colorClass} p-6 border border-opacity-50 shadow-sm hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 cursor-pointer relative overflow-hidden`}>
      {/* Background glow */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-10 bg-white transition-opacity duration-300"></div>

      <div className="relative z-10">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-sm font-semibold text-opacity-80">{label}</h3>
          <button
            onClick={handleCopy}
            className="p-1 rounded-lg hover:bg-white/20 transition-colors opacity-0 group-hover:opacity-100"
            title="Copy to clipboard"
          >
            <Copy className="h-4 w-4" />
          </button>
        </div>

        <div className="flex items-end gap-2">
          <div className="flex-1">
            <div className="text-2xl font-bold break-words">{value}</div>
            {subValue && <p className="text-xs text-opacity-70 mt-1">{subValue}</p>}
          </div>
          <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg bg-white/20 backdrop-blur-md">
            {icon}
          </div>
        </div>
      </div>

      {copied && (
        <div className="absolute inset-0 bg-white/20 rounded-xl flex items-center justify-center z-20 animate-pulse">
          <span className="text-sm font-semibold">Copied!</span>
        </div>
      )}
    </div>
  );
}

interface EmployeeDetailsSectionProps {
  employee: Employee;
}

export function EmployeeDetailsSection({ employee }: EmployeeDetailsSectionProps) {
  return (
    <div className="space-y-8">
      {/* Quick Info Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <EmployeeDetailsCard
          icon={<Mail className="h-5 w-5 text-white" />}
          label="Email"
          value={employee.email}
          colorClass="from-blue-50 to-blue-100 dark:from-blue-950/40 dark:to-blue-900/20 text-blue-900 dark:text-blue-100 border-blue-200/50 dark:border-blue-800/50"
        />

        <EmployeeDetailsCard
          icon={<Phone className="h-5 w-5 text-white" />}
          label="Phone"
          value={employee.phone}
          colorClass="from-green-50 to-emerald-100 dark:from-green-950/40 dark:to-emerald-900/20 text-green-900 dark:text-green-100 border-green-200/50 dark:border-green-800/50"
        />

        <EmployeeDetailsCard
          icon={<Building2 className="h-5 w-5 text-white" />}
          label="Department"
          value={employee.department}
          colorClass="from-purple-50 to-purple-100 dark:from-purple-950/40 dark:to-purple-900/20 text-purple-900 dark:text-purple-100 border-purple-200/50 dark:border-purple-800/50"
        />

        <EmployeeDetailsCard
          icon={<Calendar className="h-5 w-5 text-white" />}
          label="Joining Date"
          value={new Date(employee.joiningDate).toLocaleDateString()}
          colorClass="from-orange-50 to-amber-100 dark:from-orange-950/40 dark:to-amber-900/20 text-orange-900 dark:text-orange-100 border-orange-200/50 dark:border-orange-800/50"
        />
      </div>

      {/* Detailed Information */}
      <div className="rounded-2xl border border-slate-200/50 dark:border-slate-800/50 bg-white dark:bg-slate-900 p-8 shadow-sm">
        <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-6">Detailed Information</h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Left Column */}
          <div className="space-y-6">
            {/* Designation */}
            <div>
              <div className="flex items-center gap-2 mb-2">
                <User className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">Designation</label>
              </div>
              <p className="text-slate-900 dark:text-white font-medium">{employee.designation}</p>
            </div>

            {/* Manager */}
            <div>
              <div className="flex items-center gap-2 mb-2">
                <User className="h-4 w-4 text-purple-600 dark:text-purple-400" />
                <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">Manager</label>
              </div>
              <p className="text-slate-900 dark:text-white font-medium">{employee.manager}</p>
            </div>

            {/* Salary */}
            <div>
              <div className="flex items-center gap-2 mb-2">
                <DollarSign className="h-4 w-4 text-green-600 dark:text-green-400" />
                <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">Salary</label>
              </div>
              <p className="text-slate-900 dark:text-white font-bold text-lg">
                ${employee.salary.toLocaleString()}
              </p>
            </div>
          </div>

          {/* Right Column */}
          <div className="space-y-6">
            {/* Employee ID */}
            <div>
              <label className="text-sm font-semibold text-slate-700 dark:text-slate-300 block mb-2">Employee ID</label>
              <p className="text-slate-900 dark:text-white font-mono font-medium">{employee.employeeId}</p>
            </div>

            {/* Address */}
            <div>
              <label className="text-sm font-semibold text-slate-700 dark:text-slate-300 block mb-2">Address</label>
              <p className="text-slate-900 dark:text-white">{employee.address}</p>
            </div>

            {/* Notes */}
            {employee.notes && (
              <div>
                <label className="text-sm font-semibold text-slate-700 dark:text-slate-300 block mb-2">Notes</label>
                <p className="text-slate-900 dark:text-white">{employee.notes}</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
