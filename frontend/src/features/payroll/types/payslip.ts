export interface Payslip {
  id: string;
  payslipNumber: string;
  employeeId: string;
  employeeName: string;
  employeeCode: string;
  department: string;
  designation: string;
  payrollMonth: number;
  payrollYear: number;
  basicSalary: number;
  hra: number;
  conveyanceAllowance: number;
  medicalAllowance: number;
  specialAllowance: number;
  otherAllowances: number;
  bonus: number;
  overtimeAmount: number;
  providentFund: number;
  professionalTax: number;
  incomeTax: number;
  otherDeductions: number;
  grossSalary: number;
  totalDeductions: number;
  netSalary: number;
  generatedDate: string;
  status: "GENERATED" | "SENT" | "DOWNLOADED";
  createdAt: string;
}
