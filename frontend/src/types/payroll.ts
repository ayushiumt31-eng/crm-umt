export type PayrollStatus = "Pending" | "Approved" | "Processed" | "Paid";

export interface Payroll {
  id: string;
  employeeId: string;
  employeeName: string;
  baseSalary: number;
  bonusAmount: number;
  deductions: number;
  netSalary: number;
  payPeriod: string; // e.g., "2024-01"
  status: PayrollStatus;
  paymentDate: string;
  processingDate: string;
  notes?: string;
  createdAt: string;
}

export interface PayrollFilter {
  status: PayrollStatus | "All";
  monthFilter: string;
}
