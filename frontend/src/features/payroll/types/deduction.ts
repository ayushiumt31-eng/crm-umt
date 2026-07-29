export type DeductionType =
  | "PROVIDENT_FUND"
  | "PROFESSIONAL_TAX"
  | "INCOME_TAX"
  | "LOAN"
  | "OTHER";

export interface Deduction {
  id: string;
  name: string;
  type: DeductionType;
  amount: number;
  employeeId: string;
  employeeName: string;
  effectiveFrom: string;
  effectiveTo?: string;
  status: "ACTIVE" | "INACTIVE";
  createdAt: string;
  updatedAt: string;
}
