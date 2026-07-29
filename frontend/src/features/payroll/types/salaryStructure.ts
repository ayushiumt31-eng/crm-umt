export type SalaryStructureStatus = "ACTIVE" | "INACTIVE" | "DRAFT";

export interface SalaryStructure {
  id: string;
  employeeId: string;
  employeeName: string;
  employeeCode: string;
  department: string;
  designation: string;
  effectiveFrom: string;
  effectiveTo?: string;
  basicSalary: number;
  hra: number;
  conveyanceAllowance: number;
  medicalAllowance: number;
  specialAllowance: number;
  otherAllowances: number;
  providentFund: number;
  professionalTax: number;
  incomeTax: number;
  otherDeductions: number;
  overtimeRate: number;
  bonus: number;
  grossSalary: number;
  totalDeductions: number;
  netSalary: number;
  status: SalaryStructureStatus;
  createdBy: string;
  createdByName: string;
  createdAt: string;
  updatedAt: string;
}
