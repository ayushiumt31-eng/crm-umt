import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { EmployeeToolbar, EmployeeTable, DeleteEmployeeDialog } from "../components";
import { useEmployees } from "../hooks/useEmployees";
import { useDebounce } from "@/hooks";
import { Users, UserCheck, Activity, UserPlus, TrendingUp, ChevronLeft, ChevronRight } from "lucide-react";

export function EmployeeList() {
  const navigate = useNavigate();
  const {
    employees: paginatedEmployees,
    filteredEmployees,
    searchQuery,
    statusFilter,
    departmentFilter,
    departments,
    currentPage,
    totalPages,
    totalResults,
    loading,
    setSearchQuery,
    setStatusFilter,
    setDepartmentFilter,
    setCurrentPage,
    deleteEmployee,
  } = useEmployees();

  const [deleteDialog, setDeleteDialog] = useState<{ open: boolean; id?: string; name?: string }>({ open: false });
  const [isDeleting, setIsDeleting] = useState(false);

  const debouncedSearch = useDebounce(searchQuery, 300);

  // Calculate stats from filtered employees
  const activeCount = filteredEmployees.filter((e) => e.status === "Active").length;
  const inactiveCount = filteredEmployees.filter((e) => e.status === "Inactive").length;

  const handleView = (id: string) => {
    navigate(`/employees/${id}`);
  };

  const handleEdit = (id: string) => {
    navigate(`/employees/${id}/edit`);
  };

  const handleDeleteClick = (id: string) => {
    const employee = filteredEmployees.find((e) => e.id === id);
    setDeleteDialog({
      open: true,
      id,
      name: `${employee?.firstName} ${employee?.lastName}`,
    });
  };

  const handleConfirmDelete = async () => {
    if (!deleteDialog.id) return;
    setIsDeleting(true);
    
    try {
      await deleteEmployee(deleteDialog.id);
      setDeleteDialog({ open: false });
    } catch (error) {
      console.error("Failed to delete employee:", error);
    } finally {
      setIsDeleting(false);
    }
  };

  const handleCancelDelete = () => {
    setDeleteDialog({ open: false });
  };

  return (
    <div className="space-y-8">
      {/* Header with gradient background */}
      <div className="rounded-2xl bg-gradient-to-r from-blue-600 via-cyan-500 to-blue-600 dark:from-blue-900 dark:via-cyan-900 dark:to-blue-900 p-8 shadow-lg overflow-hidden relative">
        {/* Animated background elements */}
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
              <p className="text-blue-100 text-lg">Complete employee management system</p>
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
          <div className="text-3xl font-bold text-blue-900 dark:text-blue-100">{totalResults}</div>
          <p className="text-xs text-blue-700 dark:text-blue-300 mt-2">Active records</p>
        </div>

        {/* Active Employees */}
        <div className="group rounded-xl bg-gradient-to-br from-green-50 to-emerald-100 dark:from-green-950/40 dark:to-emerald-900/20 p-6 border border-green-200/50 dark:border-green-800/50 shadow-sm hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-sm font-semibold text-green-900 dark:text-green-200">Active</h3>
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-green-500 to-emerald-600 text-white shadow-md">
              <UserCheck className="h-5 w-5" />
            </div>
          </div>
          <div className="text-3xl font-bold text-green-900 dark:text-green-100">{activeCount}</div>
          <p className="text-xs text-green-700 dark:text-green-300 mt-2">
            {totalResults > 0 ? `${Math.round((activeCount / totalResults) * 100)}%` : "0%"} of total
          </p>
        </div>

        {/* Inactive Employees */}
        <div className="group rounded-xl bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-950/40 dark:to-slate-900/20 p-6 border border-slate-200/50 dark:border-slate-800/50 shadow-sm hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-sm font-semibold text-slate-900 dark:text-slate-200">Inactive</h3>
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-slate-500 to-slate-600 text-white shadow-md">
              <Activity className="h-5 w-5" />
            </div>
          </div>
          <div className="text-3xl font-bold text-slate-900 dark:text-slate-100">{inactiveCount}</div>
          <p className="text-xs text-slate-700 dark:text-slate-300 mt-2">
            {totalResults > 0 ? `${Math.round((inactiveCount / totalResults) * 100)}%` : "0%"} of total
          </p>
        </div>

        {/* Departments */}
        <div className="group rounded-xl bg-gradient-to-br from-purple-50 to-pink-100 dark:from-purple-950/40 dark:to-pink-900/20 p-6 border border-purple-200/50 dark:border-purple-800/50 shadow-sm hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-sm font-semibold text-purple-900 dark:text-purple-200">Departments</h3>
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-purple-500 to-pink-600 text-white shadow-md">
              <UserPlus className="h-5 w-5" />
            </div>
          </div>
          <div className="text-3xl font-bold text-purple-900 dark:text-purple-100">{departments.length}</div>
          <p className="text-xs text-purple-700 dark:text-purple-300 mt-2">Unique departments</p>
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

      {/* Table Container */}
      <div className="rounded-2xl border border-slate-200/50 dark:border-slate-800/50 bg-white dark:bg-slate-900 shadow-sm overflow-hidden">
        {/* Header */}
        <div className="px-6 py-4 border-b border-slate-200/50 dark:border-slate-800/50 bg-gradient-to-r from-blue-50/50 to-cyan-50/50 dark:from-blue-950/20 dark:to-cyan-950/20">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-blue-600 dark:text-blue-400" />
              <h2 className="font-bold text-slate-900 dark:text-white">All Employees</h2>
              <span className="inline-flex items-center rounded-full bg-blue-100 dark:bg-blue-900/50 px-3 py-1 text-sm font-semibold text-blue-700 dark:text-blue-300">
                {totalResults} results
              </span>
            </div>
            <p className="text-sm text-slate-600 dark:text-slate-400">
              {debouncedSearch || statusFilter !== "All" || departmentFilter !== "All"
                ? `Showing ${paginatedEmployees.length} of ${totalResults}`
                : `Showing ${paginatedEmployees.length} employees`}
            </p>
          </div>
        </div>

        {/* Table */}
        <EmployeeTable
          employees={paginatedEmployees}
          onView={handleView}
          onEdit={handleEdit}
          onDelete={handleDeleteClick}
        />

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="px-6 py-4 border-t border-slate-200/50 dark:border-slate-800/50 bg-slate-50/50 dark:bg-slate-800/50 flex items-center justify-between">
            <p className="text-sm text-slate-600 dark:text-slate-400">
              Page <span className="font-semibold text-slate-900 dark:text-white">{currentPage}</span> of{" "}
              <span className="font-semibold text-slate-900 dark:text-white">{totalPages}</span>
            </p>
            <div className="flex gap-2">
              <button
                onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                disabled={currentPage === 1}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white font-medium hover:bg-slate-50 dark:hover:bg-slate-700/50 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
              >
                <ChevronLeft className="h-4 w-4" />
                Previous
              </button>
              <button
                onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                disabled={currentPage === totalPages}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white font-medium hover:bg-slate-50 dark:hover:bg-slate-700/50 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
              >
                Next
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Empty State */}
      {paginatedEmployees.length === 0 && !loading && (
        <div className="rounded-2xl border border-dashed border-slate-300 dark:border-slate-600 bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900/50 dark:to-slate-800/50 p-12 text-center">
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-slate-200 dark:bg-slate-700 mx-auto mb-4">
            <Users className="h-8 w-8 text-slate-600 dark:text-slate-400" />
          </div>
          <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">No employees found</h3>
          <p className="text-slate-600 dark:text-slate-400 mb-6">Try adjusting your search criteria or add a new employee</p>
          <button
            onClick={() => navigate("/employees/add")}
            className="inline-flex items-center gap-2 rounded-lg bg-gradient-to-r from-blue-600 to-cyan-600 px-6 py-2 font-semibold text-white shadow-lg hover:shadow-xl transition-all duration-200 hover:from-blue-700 hover:to-cyan-700 transform hover:-translate-y-0.5"
          >
            <UserPlus className="h-4 w-4" />
            Add Your First Employee
          </button>
        </div>
      )}

      {/* Delete Dialog */}
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
