export type AllowanceType =
  | "HRA"
  | "CONVEYANCE"
  | "MEDICAL"
  | "SPECIAL"
  | "BONUS"
  | "OVERTIME"
  | "OTHER";

export interface Allowance {
  id: string;
  name: string;
  type: AllowanceType;
  amount: number;
  employeeId: string;
  employeeName: string;
  effectiveFrom: string;
  effectiveTo?: string;
  status: "ACTIVE" | "INACTIVE";
  createdAt: string;
  updatedAt: string;
}
