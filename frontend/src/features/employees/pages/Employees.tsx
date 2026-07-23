import { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { DataTable } from "@/components/common/DataTable";
// import { DeleteCustomerDialog } from "@/features/customers/components/DeleteCustomerDialog";
import { useDebounce } from "@/hooks";
import { Users, TrendingUp, UserCheck, UserPlus } from "lucide-react";
import { employeeTableColumns } from "../components/EmployeesTableColumns";
import { dummyEmployees } from "../data/dummy-employees";
import { DeleteEmployeeDialog, EmployeeToolbar } from "../components";
import type { Employee } from "../types/employee";

export default function Employees() {
  const navigate = useNavigate();
  const [employees, setEmployees] = useState<Employee[]>(dummyEmployees);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<"Active" | "Inactive" | "All">("All");
  const [departmentFilter, setDepartmentFilter] = useState("All");
  const [deleteDialog, setDeleteDialog] = useState<{ open: boolean; id?: string; name?: string }>({ open: false });
  const [isDeleting, setIsDeleting] = useState(false);
  const debouncedSearch = useDebounce(searchQuery, 300);

  // Get unique departments from employees
  const departments = Array.from(new Set(employees.map(emp => emp.department || "Unknown"))).filter(Boolean);

  // Filter employees based on search query, status, and department
  const filteredEmployees = useMemo(() => {
    let filtered = employees;

    // Search filter
    if (debouncedSearch) {
      filtered = filtered.filter(
        (emp) =>
          emp.firstName.toLowerCase().includes(debouncedSearch.toLowerCase()) ||
          emp.lastName.toLowerCase().includes(debouncedSearch.toLowerCase()) ||
          emp.email.toLowerCase().includes(debouncedSearch.toLowerCase()) ||
          emp.phone.includes(debouncedSearch) ||
          (emp.employeeId && emp.employeeId.toLowerCase().includes(debouncedSearch.toLowerCase()))
      );
    }

    // Status filter
    if (statusFilter !== "All") {
      filtered = filtered.filter((emp) => emp.status === statusFilter);
    }

    // Department filter
    if (departmentFilter !== "All") {
      filtered = filtered.filter((emp) => emp.department === departmentFilter);
    }

    return filtered;
  }, [employees, debouncedSearch, statusFilter, departmentFilter]);

  // Calculate stats
  const activeEmployees = employees.filter((emp) => emp.status === "Active").length;
  const inactiveEmployees = employees.filter((emp) => emp.status === "Inactive").length;
  
  // Calculate department distribution
  const departmentCounts = employees.reduce((acc, emp) => {
    const dept = emp.department || "Unknown";
    acc[dept] = (acc[dept] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);
  const topDepartment = Object.entries(departmentCounts).sort((a, b) => b[1] - a[1])[0];

  const handleView = (id: string) => {
    navigate(`/employees/${id}`);
  };

  const handleEdit = (id: string) => {
    navigate(`/employees/${id}/edit`);
  };

  const handleAdd = () => {
    navigate("/employees/add");
  };

  const handleDeleteClick = (id: string) => {
    const selectedEmployees = employees.find((l) => l.id === id);
    setDeleteDialog({
      open: true,
      id,
      name: `${selectedEmployees?.firstName} ${selectedEmployees?.lastName}`,
    });
  };

  const handleConfirmDelete = async () => {
    if (!deleteDialog.id) return;
    setIsDeleting(true);
    await new Promise((resolve) => setTimeout(resolve, 500));
    setEmployees((prev) => prev.filter((l) => l.id !== deleteDialog.id));
    setDeleteDialog({ open: false });
    setIsDeleting(false);
  };

  const handleCancelDelete = () => {
    setDeleteDialog({ open: false });
  };

  return (
    <div className="space-y-8">
      {/* Header with gradient background */}
      <div className="rounded-2xl bg-gradient-to-r from-blue-600 via-cyan-500 to-blue-600 dark:from-blue-900 dark:via-cyan-900 dark:to-blue-900 p-8 shadow-lg overflow-hidden relative">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-0 left-0 w-96 h-96 bg-white/20 rounded-full blur-3xl animate-pulse" style={{ animation: "pulse 6s ease-in-out infinite" }}></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-cyan-300/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: "3s" }}></div>
        </div>

        <div className="relative z-10">
          <div className="flex items-center gap-4 mb-4">
            <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-white/20 backdrop-blur-md text-white border border-white/30 shadow-lg transform transition-transform hover:scale-110">
              <Users className="h-7 w-7" />
            </div>
            <div>
              <h1 className="text-4xl font-bold text-white drop-shadow-lg">Employees</h1>
              <p className="text-blue-100 text-lg">Complete Employee management dashboard</p>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Total Employees */}
        <div className="group rounded-xl bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-950/40 dark:to-blue-900/20 p-6 border border-blue-200/50 dark:border-blue-800/50 shadow-sm hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-sm font-semibold text-blue-900 dark:text-blue-200">Total Employees</h3>
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-blue-500 to-blue-600 text-white shadow-md">
              <Users className="h-5 w-5" />
            </div>
          </div>
          <div className="text-3xl font-bold text-blue-900 dark:text-blue-100">{employees.length}</div>
          <p className="text-xs text-blue-700 dark:text-blue-300 mt-2">Total staff members</p>
        </div>

        {/* Active Employees */}
        <div className="group rounded-xl bg-gradient-to-br from-green-50 to-emerald-100 dark:from-green-950/40 dark:to-emerald-900/20 p-6 border border-green-200/50 dark:border-green-800/50 shadow-sm hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-sm font-semibold text-green-900 dark:text-green-200">Active Employees</h3>
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-green-500 to-emerald-600 text-white shadow-md">
              <UserCheck className="h-5 w-5" />
            </div>
          </div>
          <div className="text-3xl font-bold text-green-900 dark:text-green-100">{activeEmployees}</div>
          <p className="text-xs text-green-700 dark:text-green-300 mt-2">{employees.length > 0 ? Math.round((activeEmployees / employees.length) * 100) : 0}% currently active</p>
        </div>

        {/* Inactive Employees */}
        <div className="group rounded-xl bg-gradient-to-br from-blue-50 to-cyan-100 dark:from-blue-950/40 dark:to-cyan-900/20 p-6 border border-blue-200/50 dark:border-blue-800/50 shadow-sm hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-sm font-semibold text-blue-900 dark:text-blue-200">Inactive</h3>
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-blue-500 to-cyan-600 text-white shadow-md">
              <TrendingUp className="h-5 w-5" />
            </div>
          </div>
          <div className="text-3xl font-bold text-blue-900 dark:text-blue-100">{inactiveEmployees}</div>
          <p className="text-xs text-blue-700 dark:text-blue-300 mt-2">{employees.length > 0 ? Math.round((inactiveEmployees / employees.length) * 100) : 0}% inactive</p>
        </div>

        {/* Top Department */}
        <div className="group rounded-xl bg-gradient-to-br from-purple-50 to-pink-100 dark:from-purple-950/40 dark:to-pink-900/20 p-6 border border-purple-200/50 dark:border-purple-800/50 shadow-sm hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-sm font-semibold text-purple-900 dark:text-purple-200">Top Department</h3>
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-purple-500 to-pink-600 text-white shadow-md">
              <UserPlus className="h-5 w-5" />
            </div>
          </div>
          <div className="text-3xl font-bold text-purple-900 dark:text-purple-100">{topDepartment?.[1] || 0}</div>
          <p className="text-xs text-purple-700 dark:text-purple-300 mt-2">{topDepartment?.[0] || "N/A"}</p>
        </div>
      </div>

      {/* Toolbar */}
      <EmployeeToolbar 
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        statusFilter={statusFilter}
        onStatusChange={setStatusFilter}
        departmentFilter={departmentFilter}
        departments={departments}
        onDepartmentChange={setDepartmentFilter}
      />

      {/* Table with enhanced styling */}
      <div className="rounded-2xl border border-slate-200/50 dark:border-slate-800/50 bg-white dark:bg-slate-900 shadow-sm overflow-hidden">
        <div className="px-6 py-4 border-b border-slate-200/50 dark:border-slate-800/50 bg-gradient-to-r from-blue-50/50 to-cyan-50/50 dark:from-blue-950/20 dark:to-cyan-950/20">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-blue-600 dark:text-blue-400" />
              <h2 className="font-bold text-slate-900 dark:text-white">
                All Employees
              </h2>
              <span className="inline-flex items-center rounded-full bg-blue-100 dark:bg-blue-900/50 px-3 py-1 text-sm font-semibold text-blue-700 dark:text-blue-300">
                {filteredEmployees.length} results
              </span>
            </div>
            <p className="text-sm text-slate-600 dark:text-slate-400">
              {searchQuery || statusFilter !== "All" || departmentFilter !== "All" 
                ? `Filtered results showing ${filteredEmployees.length} of ${employees.length}` 
                : `Showing all ${employees.length} employees`}
            </p>
          </div>
        </div>

        <DataTable
          data={filteredEmployees}
          columns={employeeTableColumns}
          onView={handleView}
          onEdit={handleEdit}
          onDelete={handleDeleteClick}
          showActions={true}
        />
      </div>

      {/* Empty State */}
      {filteredEmployees.length === 0 && (
        <div className="rounded-2xl border border-dashed border-slate-300 dark:border-slate-600 bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900/50 dark:to-slate-800/50 p-12 text-center">
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-slate-200 dark:bg-slate-700 mx-auto mb-4">
            <Users className="h-8 w-8 text-slate-600 dark:text-slate-400" />
          </div>
          <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">No employees found</h3>
          <p className="text-slate-600 dark:text-slate-400 mb-6">Try adjusting your search criteria or filters, or add a new employee</p>
          <button
            onClick={handleAdd}
            className="inline-flex items-center gap-2 rounded-lg bg-gradient-to-r from-blue-600 to-cyan-600 px-6 py-2 font-semibold text-white shadow-lg hover:shadow-xl transition-all duration-200 hover:from-blue-700 hover:to-cyan-700 transform hover:-translate-y-0.5"
          >
            <UserPlus className="h-4 w-4" />
            Add Your First Employee
          </button>
        </div>
      )}

      <DeleteEmployeeDialog
        open={deleteDialog.open}
        employeeName={deleteDialog.name || ""}
        onConfirm={handleConfirmDelete}
        onCancel={handleCancelDelete}
        isLoading={isDeleting}
      />
    </div>
  );
}
