export type DealStatus = "Prospect" | "Qualification" | "Proposal" | "Negotiation" | "Closed Won" | "Closed Lost";
export type DealPriority = "Low" | "Medium" | "High" | "Critical";

export interface Deal {
  id: string;
  title: string;
  customerName: string;
  customerId: string;
  value: number;
  currency: string;
  status: DealStatus;
  priority: DealPriority;
  owner: string;
  probability: number; // 0-100
  expectedCloseDate: string;
  actualCloseDate?: string;
  stage: string;
  notes: string;
  createdAt: string;
  updatedAt: string;
}

export interface DealFilter {
  status: DealStatus | "All";
  priority: DealPriority | "All";
  owner: string | "All";
}
