interface PayrollFiltersProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
  monthFilter: string;
  onMonthChange: (value: string) => void;
  yearFilter: string;
  onYearChange: (value: string) => void;
  departmentFilter: string;
  onDepartmentChange: (value: string) => void;
  statusFilter: string;
  onStatusChange: (value: string) => void;
  departments: string[];
  statuses: string[];
}

export function PayrollFilters({
  searchTerm,
  onSearchChange,
  monthFilter,
  onMonthChange,
  yearFilter,
  onYearChange,
  departmentFilter,
  onDepartmentChange,
  statusFilter,
  onStatusChange,
  departments,
  statuses,
}: PayrollFiltersProps) {
  return (
    <div className="rounded-2xl border border-slate-200/50 dark:border-slate-800/50 bg-white dark:bg-slate-900 shadow-sm p-4">
      <div className="flex flex-wrap gap-4">
        <div className="relative flex-1 min-w-[200px]">
          <input
            type="text"
            placeholder="Search employee name or code..."
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
            className="w-full rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 px-4 py-2 text-sm"
          />
        </div>
        <select
          value={monthFilter}
          onChange={(e) => onMonthChange(e.target.value)}
          className="rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 px-4 py-2 text-sm"
        >
          <option value="">All Months</option>
          {Array.from({ length: 12 }, (_, i) => (
            <option key={i + 1} value={String(i + 1)}>
              {new Date(2024, i).toLocaleString("default", { month: "long" })}
            </option>
          ))}
        </select>
        <select
          value={yearFilter}
          onChange={(e) => onYearChange(e.target.value)}
          className="rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 px-4 py-2 text-sm"
        >
          <option value="">All Years</option>
          {[2024, 2025, 2026, 2027].map((y) => (
            <option key={y} value={String(y)}>{y}</option>
          ))}
        </select>
        <select
          value={departmentFilter}
          onChange={(e) => onDepartmentChange(e.target.value)}
          className="rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 px-4 py-2 text-sm"
        >
          <option value="">All Departments</option>
          {departments.map((d) => (
            <option key={d} value={d}>{d}</option>
          ))}
        </select>
        <select
          value={statusFilter}
          onChange={(e) => onStatusChange(e.target.value)}
          className="rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 px-4 py-2 text-sm"
        >
          <option value="">All Status</option>
          {statuses.map((s) => (
            <option key={s} value={s}>{s.replace("_", " ")}</option>
          ))}
        </select>
      </div>
  );
}
