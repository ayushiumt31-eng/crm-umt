export type DealStage = 
  | "PROSPECTING"
  | "QUALIFICATION"
  | "PROPOSAL"
  | "NEGOTIATION"
  | "CLOSED_WON"
  | "CLOSED_LOST";

export type DealPriority = "LOW" | "MEDIUM" | "HIGH" | "URGENT";

export interface Deal {
  id: string;
  title: string;
  value: number;
  stage: DealStage;
  priority: DealPriority;
  expectedCloseDate: string;
  company: string;
  contactPerson: string;
  contactEmail: string;
  contactPhone: string;
  assignedTo: string;
  createdAt: string;
  updatedAt?: string;
  notes?: string;
}
