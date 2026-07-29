import { useNavigate } from "react-router-dom";
import PayrollForm from "../forms/PayrollForm";
import { payrollService } from "@/services/payroll.service";

export default function AddPayroll() {
  const navigate = useNavigate();

  const handleSubmit = async (data: Record<string, any>) => {
    const payload = {
      employeeId: data.employeeId,
      employeeName: data.employeeName,
      baseSalary: parseFloat(data.basicSalary) || 0,
      bonusAmount: parseFloat(data.bonusAmount) || 0,
      deductions: parseFloat(data.deductions) || 0,
      netSalary: (parseFloat(data.basicSalary) || 0) - (parseFloat(data.deductions) || 0) + (parseFloat(data.bonusAmount) || 0),
      payPeriod: `${data.payrollYear}-${String(data.payrollMonth).padStart(2, "0")}`,
      status: "Pending" as const,
      paymentDate: new Date().toISOString(),
      processingDate: new Date().toISOString(),
      notes: data.notes || "",
      createdAt: new Date().toISOString(),
    };

    await payrollService.create(payload);
    navigate("/payroll");
  };

  return (
    <PayrollForm
      mode="create"
      initialValues={{
        status: "Draft",
        workingDays: 22,
        presentDays: 22,
        leaveDays: 0,
        overtimeHours: 0,
        overtimeAmount: 0,
        bonusAmount: 0,
        deductions: 0,
      }}
      onSubmit={handleSubmit}
    />
  );
}

