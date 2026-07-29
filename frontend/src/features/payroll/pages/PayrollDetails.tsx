import { useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { ArrowLeft, Edit2, Printer, Trash2 } from "lucide-react";
import { PayrollStatusBadge } from "../components/PayrollStatusBadge";
import { payrollService } from "@/services/payroll.service";
import { PayrollSummaryCard } from "../components/PayrollSummaryCard";
import type { Payroll } from "@/types/payroll";

export function PayrollDetails() {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const [payroll, setPayroll] = useState<Payroll | null>(null);
  const [loading, setLoading] = useState(true);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    if (!id) {
      setLoading(false);
      return;
    }
    payrollService.getById(id).then((data) => {
      setPayroll(data || null);
      setLoading(false);
    });
  }, [id]);

  const handlePrint = () => {
    window.print();
  };

  const handleDelete = async () => {
    if (!id || !payroll) return;
    setIsDeleting(true);
    try {
      await payrollService.delete(id);
      navigate("/payroll");
    } catch (error) {
      console.error("Failed to delete payroll:", error);
      alert("Failed to delete payroll. Please try again.");
    } finally {
      setIsDeleting(false);
    }
  };

  const formatCurrency = (value: number) =>
    new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR", maximumFractionDigits: 0 }).format(value);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <p className="text-slate-500 dark:text-slate-400">Loading payroll details...</p>
      </div>
    );
  }

  if (!payroll) {
    return (
      <div className="space-y-8">
        <div className="flex items-center gap-4">
          <button
            onClick={() => navigate("/payroll")}
            className="flex h-10 w-10 items-center justify-center rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          >
            <ArrowLeft className="h-5 w-5 text-slate-600 dark:text-slate-400" />
          </button>
          <h1 className="text-3xl font-bold text-slate-900 dark:text-white">Payroll Not Found</h1>
        </div>
        <div className="rounded-2xl border border-dashed border-slate-300 dark:border-slate-600 bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900/50 dark:to-slate-800/50 p-12 text-center">
          <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">This payroll record does not exist</h3>
          <p className="text-slate-600 dark:text-slate-400 mb-6">The payroll you are looking for could not be found</p>
          <button
            onClick={() => navigate("/payroll")}
            className="inline-flex items-center gap-2 rounded-lg bg-gradient-to-r from-blue-600 to-cyan-600 px-6 py-2 font-semibold text-white shadow-lg hover:shadow-xl transition-all"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Payroll
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
            onClick={() => navigate("/payroll")}
            className="flex h-10 w-10 items-center justify-center rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          >
            <ArrowLeft className="h-5 w-5 text-slate-600 dark:text-slate-400" />
          </button>
          <div>
            <h1 className="text-3xl font-bold text-slate-900 dark:text-white">
              {payroll.employeeName}
            </h1>
            <p className="text-slate-600 dark:text-slate-400">Pay Period: {payroll.payPeriod}</p>
          </div>
        </div>
        <PayrollStatusBadge status={payroll.status as any} />
      </div>

      {/* Gradient header */}
      <div className="rounded-2xl bg-gradient-to-r from-emerald-600 via-teal-500 to-emerald-600 dark:from-emerald-900 dark:via-teal-900 dark:to-emerald-900 p-8 shadow-lg overflow-hidden relative">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-0 left-0 w-96 h-96 bg-white/20 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-teal-300/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: "3s" }}></div>
        </div>

        <div className="relative z-10">
          <div className="flex items-center justify-between gap-4">
            <div>
              <h2 className="text-2xl font-bold text-white mb-2">Employee ID: {payroll.employeeId}</h2>
              <p className="text-emerald-100">
                Processed on: {new Date(payroll.processingDate).toLocaleDateString()}
              </p>
            </div>
            <div className="text-right">
              <p className="text-sm text-emerald-100 mb-1">Net Salary</p>
              <p className="text-3xl font-bold text-white">{formatCurrency(payroll.netSalary)}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Details Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <PayrollSummaryCard title="Base Salary" value={formatCurrency(payroll.baseSalary)} />
        <PayrollSummaryCard title="Bonus" value={formatCurrency(payroll.bonusAmount)} />
        <PayrollSummaryCard title="Deductions" value={formatCurrency(payroll.deductions)} />
        <PayrollSummaryCard title="Net Salary" value={formatCurrency(payroll.netSalary)} />
        <PayrollSummaryCard title="Pay Period" value={payroll.payPeriod} />
        <PayrollSummaryCard title="Payment Date" value={new Date(payroll.paymentDate).toLocaleDateString()} />
        <PayrollSummaryCard title="Processing Date" value={new Date(payroll.processingDate).toLocaleDateString()} />
        <PayrollSummaryCard title="Status" value={payroll.status} />
      </div>

      {payroll.notes && (
        <div className="rounded-xl bg-gradient-to-br from-amber-50 to-yellow-50 dark:from-amber-950/20 dark:to-yellow-950/20 border border-amber-200 dark:border-amber-800 p-4">
          <p className="text-sm font-medium text-amber-700 dark:text-amber-300">Notes:</p>
          <p className="text-sm text-amber-600 dark:text-amber-400 mt-1">{payroll.notes}</p>
        </div>
      )}

      {/* Action Buttons */}
      <div className="flex gap-4">
        <button
          onClick={() => navigate(`/payroll/${id}/edit`)}
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
          disabled={isDeleting}
          className="flex-1 sm:flex-none inline-flex items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-red-600 to-rose-600 px-6 py-3 font-semibold text-white shadow-lg hover:shadow-xl transition-all duration-200 hover:from-red-700 hover:to-rose-700 disabled:opacity-50"
        >
          <Trash2 className="h-5 w-5" />
          {isDeleting ? "Deleting..." : "Delete"}
        </button>
      </div>
    </div>
  );
}

