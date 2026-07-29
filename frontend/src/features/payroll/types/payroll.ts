export type PayrollStatus =
  | "DRAFT"
  | "PROCESSING"
  | "PROCESSED"
  | "PENDING_APPROVAL"
  | "APPROVED"
  | "REJECTED"
  | "PAID"
  | "CANCELLED";

export interface PayrollAllowance {
  type: string;
  name: string;
  amount: number;
}

export interface PayrollDeduction {
  type: string;
  name: string;
  amount: number;
}

export interface Payroll {
  id: string;
  employeeId: string;
  employeeName: string;
  employeeCode: string;
  department: string;
  designation: string;
  payrollMonth: number;
  payrollYear: number;
  salaryStructureId: string;
  basicSalary: number;
  allowances: PayrollAllowance[];
  deductions: PayrollDeduction[];
  grossSalary: number;
  totalDeductions: number;
  netSalary: number;
  workingDays: number;
  presentDays: number;
  leaveDays: number;
  overtimeHours: number;
  overtimeAmount: number;
  status: PayrollStatus;
  processedBy: string;
  processedByName: string;
  processedAt: string;
  approvedBy: string;
  approvedByName: string;
  approvedAt: string;
  rejectionReason?: string;
  createdAt: string;
  updatedAt: string;
}
