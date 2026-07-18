import { Search, Plus } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface EmployeeToolbarProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  statusFilter: "Active" | "Inactive" | "All";
  onStatusChange: (status: "Active" | "Inactive" | "All") => void;
  departmentFilter: string;
  departments: string[];
  onDepartmentChange: (dept: string) => void;
}

export function EmployeeToolbar({
  searchQuery,
  onSearchChange,
  statusFilter,
  onStatusChange,
  departmentFilter,
  departments,
  onDepartmentChange,
}: EmployeeToolbarProps) {
  const navigate = useNavigate();

  return (
    <div className="space-y-4">
      {/* Search Bar and Add Button */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400 dark:text-slate-500" />
          <input
            type="text"
            placeholder="Search by name, email, phone, ID..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white placeholder-slate-500 dark:placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
          />
          <kbd className="absolute right-3 top-1/2 -translate-y-1/2 hidden sm:inline-flex items-center gap-1 px-2 py-1 rounded bg-slate-100 dark:bg-slate-700 text-xs font-semibold text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-600">
            <span>⌘</span>K
          </kbd>
        </div>

        <button
          onClick={() => navigate("/employees/add")}
          className="inline-flex items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-blue-600 to-cyan-600 px-6 py-2.5 font-semibold text-white shadow-lg hover:shadow-xl transition-all duration-200 hover:from-blue-700 hover:to-cyan-700 transform hover:-translate-y-0.5 whitespace-nowrap"
        >
          <Plus className="h-4 w-4" />
          <span>Add Employee</span>
        </button>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3">
        {/* Status Filter */}
        <select
          value={statusFilter}
          onChange={(e) => onStatusChange(e.target.value as "Active" | "Inactive" | "All")}
          className="px-4 py-2.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white font-medium focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
        >
          <option value="All">All Status</option>
          <option value="Active">Active</option>
          <option value="Inactive">Inactive</option>
        </select>

        {/* Department Filter */}
        <select
          value={departmentFilter}
          onChange={(e) => onDepartmentChange(e.target.value)}
          className="px-4 py-2.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white font-medium focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
        >
          <option value="All">All Departments</option>
          {departments.map((dept) => (
            <option key={dept} value={dept}>
              {dept}
            </option>
          ))}
        </select>
      </div>

      {/* Info Banner */}
      <div className="rounded-lg bg-gradient-to-r from-blue-50 to-cyan-50 dark:from-blue-950/30 dark:to-cyan-950/30 border border-blue-200/50 dark:border-blue-800/50 p-4">
        <p className="text-sm text-blue-700 dark:text-blue-300">
          💡 <span className="font-semibold">Pro Tip:</span> Use filters to quickly find employees by status or department
        </p>
      </div>
    </div>
  );
}
