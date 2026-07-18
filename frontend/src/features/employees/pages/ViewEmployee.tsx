import { useNavigate, useParams } from "react-router-dom";
import { useState, useMemo } from "react";
import { EmployeeDetailsSection, DeleteEmployeeDialog, EmployeeStatusBadge } from "../components";
import { useEmployees } from "../hooks/useEmployees";
import { ArrowLeft, Edit2, Printer, Trash2 } from "lucide-react";

export function ViewEmployee() {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const { getEmployeeById, deleteEmployee } = useEmployees();
  const [deleteDialog, setDeleteDialog] = useState({ open: false });
  const [isDeleting, setIsDeleting] = useState(false);

  const employee = useMemo(() => {
    return id ? getEmployeeById(id) : null;
  }, [id, getEmployeeById]);

  const handlePrint = () => {
    window.print();
  };

  const handleDelete = () => {
    setDeleteDialog({ open: true });
  };

  const handleConfirmDelete = async () => {
    if (!id) return;
    setIsDeleting(true);

    try {
      await deleteEmployee(id);
      navigate("/employees");
    } catch (error) {
      console.error("Failed to delete employee:", error);
      alert("Failed to delete employee. Please try again.");
    } finally {
      setIsDeleting(false);
      setDeleteDialog({ open: false });
    }
  };

  if (!employee) {
    return (
      <div className="space-y-8">
        <div className="flex items-center gap-4">
          <button
            onClick={() => navigate("/employees")}
            className="flex h-10 w-10 items-center justify-center rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          >
            <ArrowLeft className="h-5 w-5 text-slate-600 dark:text-slate-400" />
          </button>
          <h1 className="text-3xl font-bold text-slate-900 dark:text-white">Employee Not Found</h1>
        </div>

        <div className="rounded-2xl border border-dashed border-slate-300 dark:border-slate-600 bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900/50 dark:to-slate-800/50 p-12 text-center">
          <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">This employee does not exist</h3>
          <p className="text-slate-600 dark:text-slate-400 mb-6">The employee you are looking for could not be found</p>
          <button
            onClick={() => navigate("/employees")}
            className="inline-flex items-center gap-2 rounded-lg bg-gradient-to-r from-blue-600 to-cyan-600 px-6 py-2 font-semibold text-white shadow-lg hover:shadow-xl transition-all duration-200"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Employees
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button
            onClick={() => navigate("/employees")}
            className="flex h-10 w-10 items-center justify-center rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          >
            <ArrowLeft className="h-5 w-5 text-slate-600 dark:text-slate-400" />
          </button>
          <div>
            <h1 className="text-3xl font-bold text-slate-900 dark:text-white">
              {employee.firstName} {employee.lastName}
            </h1>
            <p className="text-slate-600 dark:text-slate-400">{employee.designation}</p>
          </div>
        </div>
        <EmployeeStatusBadge status={employee.status} />
      </div>

      {/* Gradient header */}
      <div className="rounded-2xl bg-gradient-to-r from-blue-600 via-cyan-500 to-blue-600 dark:from-blue-900 dark:via-cyan-900 dark:to-blue-900 p-8 shadow-lg overflow-hidden relative">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-0 left-0 w-96 h-96 bg-white/20 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-cyan-300/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: "3s" }}></div>
        </div>

        <div className="relative z-10">
          <div className="flex items-center justify-between gap-4">
            <div>
              <h2 className="text-2xl font-bold text-white mb-2">Employee ID: {employee.employeeId}</h2>
              <p className="text-blue-100">Joined on {new Date(employee.joiningDate).toLocaleDateString()}</p>
            </div>
            <div className="text-right">
              <p className="text-sm text-blue-100 mb-1">Annual Salary</p>
              <p className="text-3xl font-bold text-white">${employee.salary.toLocaleString()}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Details Section */}
      <EmployeeDetailsSection employee={employee} />

      {/* Action Buttons */}
      <div className="flex gap-4">
        <button
          onClick={() => navigate(`/employees/${id}/edit`)}
          className="flex-1 sm:flex-none inline-flex items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-blue-600 to-cyan-600 px-6 py-3 font-semibold text-white shadow-lg hover:shadow-xl transition-all duration-200 hover:from-blue-700 hover:to-cyan-700"
        >
          <Edit2 className="h-5 w-5" />
          Edit
        </button>

        <button
          onClick={handlePrint}
          className="flex-1 sm:flex-none inline-flex items-center justify-center gap-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 px-6 py-3 font-semibold text-slate-900 dark:text-white hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-all duration-200"
        >
          <Printer className="h-5 w-5" />
          Print
        </button>

        <button
          onClick={handleDelete}
          className="flex-1 sm:flex-none inline-flex items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-red-600 to-rose-600 px-6 py-3 font-semibold text-white shadow-lg hover:shadow-xl transition-all duration-200 hover:from-red-700 hover:to-rose-700"
        >
          <Trash2 className="h-5 w-5" />
          Delete
        </button>
      </div>

      {/* Delete Dialog */}
      <DeleteEmployeeDialog
        open={deleteDialog.open}
        employeeName={`${employee.firstName} ${employee.lastName}`}
        onConfirm={handleConfirmDelete}
        onCancel={() => setDeleteDialog({ open: false })}
        isLoading={isDeleting}
      />
    </div>
  );
}
