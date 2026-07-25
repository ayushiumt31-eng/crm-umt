import type { DateRangePreset, ReportTypeOption } from "../types/report";
import { dummyEmployees } from "@/features/employees/data/dummy-employees";

interface ReportFiltersProps {
  dateRange: DateRangePreset;
  reportType: ReportTypeOption;
  employeeId: string;
  status: string;
  onDateRangeChange: (value: DateRangePreset) => void;
  onReportTypeChange: (value: ReportTypeOption) => void;
  onEmployeeChange: (value: string) => void;
  onStatusChange: (value: string) => void;
  onApply: () => void;
  onReset: () => void;
}

const statusOptions: Record<ReportTypeOption, string[]> = {
  ALL: ["All"],
  CUSTOMERS: ["All", "Active", "Inactive"],
  LEADS: ["All", "NEW", "CONTACTED", "QUALIFIED", "PROPOSAL", "NEGOTIATION", "CONVERTED", "LOST"],
  DEALS: ["All", "PROSPECTING", "QUALIFICATION", "PROPOSAL", "NEGOTIATION", "CLOSED_WON", "CLOSED_LOST"],
  SALES: ["All", "DRAFT", "CONFIRMED", "COMPLETED", "CANCELLED"],
  ACTIVITIES: ["All", "PENDING", "IN_PROGRESS", "COMPLETED", "CANCELLED"],
  COMMUNICATIONS: ["All", "DRAFT", "SENT", "DELIVERED", "COMPLETED", "FAILED"],
};

export function ReportFilters({
  dateRange,
  reportType,
  employeeId,
  status,
  onDateRangeChange,
  onReportTypeChange,
  onEmployeeChange,
  onStatusChange,
  onApply,
  onReset,
}: ReportFiltersProps) {
  const dateRangeOptions: { value: DateRangePreset; label: string }[] = [
    { value: "TODAY", label: "Today" },
    { value: "THIS_WEEK", label: "This Week" },
    { value: "THIS_MONTH", label: "This Month" },
    { value: "LAST_MONTH", label: "Last Month" },
    { value: "THIS_QUARTER", label: "This Quarter" },
    { value: "THIS_YEAR", label: "This Year" },
    { value: "CUSTOM", label: "Custom Range" },
  ];

  const reportTypeOptions: { value: ReportTypeOption; label: string }[] = [
    { value: "ALL", label: "All" },
    { value: "CUSTOMERS", label: "Customers" },
    { value: "LEADS", label: "Leads" },
    { value: "DEALS", label: "Deals / Opportunities" },
    { value: "SALES", label: "Sales" },
    { value: "ACTIVITIES", label: "Activities / Tasks" },
    { value: "COMMUNICATIONS", label: "Communications" },
  ];

  const currentStatuses = statusOptions[reportType] || statusOptions.ALL;

  return (
    <div className="rounded-2xl border border-slate-200/50 dark:border-slate-800/50 bg-white dark:bg-slate-900 shadow-sm p-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
        {/* Date Range */}
        <div>
          <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
            Date Range
          </label>
          <select
            value={dateRange}
            onChange={(e) => onDateRangeChange(e.target.value as DateRangePreset)}
            className="w-full h-10 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 px-3 text-sm text-slate-900 dark:text-white"
          >
            {dateRangeOptions.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
        </div>

        {/* Report Type */}
        <div>
          <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
            Report Type
          </label>
          <select
            value={reportType}
            onChange={(e) => onReportTypeChange(e.target.value as ReportTypeOption)}
            className="w-full h-10 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 px-3 text-sm text-slate-900 dark:text-white"
          >
            {reportTypeOptions.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
        </div>

        {/* Employee */}
        <div>
          <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
            Employee
          </label>
          <select
            value={employeeId}
            onChange={(e) => onEmployeeChange(e.target.value)}
            className="w-full h-10 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 px-3 text-sm text-slate-900 dark:text-white"
          >
            <option value="All">All Employees</option>
            {dummyEmployees.map((emp) => (
              <option key={emp.id} value={emp.id}>
                {emp.firstName} {emp.lastName}
              </option>
            ))}
          </select>
        </div>

        {/* Status */}
        <div>
          <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
            Status
          </label>
          <select
            value={status}
            onChange={(e) => onStatusChange(e.target.value)}
            className="w-full h-10 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 px-3 text-sm text-slate-900 dark:text-white"
          >
            {currentStatuses.map((s) => (
              <option key={s} value={s}>
                {s === "All" ? "All Statuses" : s.replace(/_/g, " ")}
              </option>
            ))}
          </select>
        </div>

        {/* Buttons */}
        <div className="flex items-end gap-2">
          <button
            onClick={onApply}
            className="flex-1 h-10 rounded-lg bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white font-semibold text-sm px-4 transition-all"
          >
            Apply
          </button>
          <button
            onClick={onReset}
            className="flex-1 h-10 rounded-lg border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 font-semibold text-sm px-4 transition-all"
          >
            Reset
          </button>
        </div>
      </div>
    </div>
  );
}

