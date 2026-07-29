import { useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import PayrollForm from "../forms/PayrollForm";
import { payrollService } from "@/services/payroll.service";

export default function EditPayroll() {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const [initialValues, setInitialValues] = useState<Record<string, any> | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    if (!id) {
      setNotFound(true);
      setIsLoading(false);
      return;
    }

    payrollService.getById(id).then((payroll) => {
      if (!payroll) {
        setNotFound(true);
        setIsLoading(false);
        return;
      }

      const periodParts = (payroll.payPeriod || "2026-01").split("-");
      setInitialValues({
        ...payroll,
        basicSalary: payroll.baseSalary,
        payrollMonth: periodParts[1] || "1",
        payrollYear: periodParts[0] || "2026",
      });
      setIsLoading(false);
    });
  }, [id]);

  const handleSubmit = async (data: Record<string, any>) => {
    if (!id) return;

    const updates = {
      employeeId: data.employeeId,
      employeeName: data.employeeName,
      employeeCode: data.employeeCode,
      department: data.department,
      designation: data.designation,
      payrollMonth: parseInt(data.payrollMonth),
      payrollYear: parseInt(data.payrollYear),
      basicSalary: parseFloat(data.basicSalary) || 0,
      grossSalary: parseFloat(data.basicSalary) || 0,
      totalDeductions: parseFloat(data.deductions) || 0,
      netSalary: (parseFloat(data.basicSalary) || 0) - (parseFloat(data.deductions) || 0) + (parseFloat(data.bonusAmount) || 0),
      baseSalary: parseFloat(data.basicSalary) || 0,
      bonusAmount: parseFloat(data.bonusAmount) || 0,
      payPeriod: `${data.payrollYear}-${String(data.payrollMonth).padStart(2, "0")}`,
      status: data.status || "Draft",
      notes: data.notes || "",
    };

    await payrollService.update(id, updates);
    navigate("/payroll");
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <p className="text-slate-500 dark:text-slate-400">Loading payroll details...</p>
      </div>
    );
  }

  if (notFound || !initialValues) {
    return (
      <div className="space-y-8">
        <div className="flex items-center gap-4">
          <button
            onClick={() => navigate("/payroll")}
            className="flex h-10 w-10 items-center justify-center rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M19 12H5M12 19l-7-7 7-7"/></svg>
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
            Back to Payroll
          </button>
        </div>
      </div>
    );
  }

  return (
    <PayrollForm
      mode="edit"
      initialValues={initialValues}
      onSubmit={handleSubmit}
    />
  );
}

