export type CampaignType = "EMAIL" | "WHATSAPP" | "SMS";

export type CampaignStatus =
  | "DRAFT"
  | "SCHEDULED"
  | "RUNNING"
  | "COMPLETED"
  | "PAUSED"
  | "CANCELLED";

export type CampaignAudience =
  | "ALL_CUSTOMERS"
  | "ALL_LEADS"
  | "CUSTOMERS"
  | "LEADS"
  | "CUSTOM";

export interface Campaign {
  id: string;
  name: string;
  description: string;
  type: CampaignType;
  status: CampaignStatus;
  audience: CampaignAudience;
  audienceCount: number;
  startDate: string;
  endDate: string;
  assignedTo: string;
  assignedToName: string;
  createdBy: string;
  createdByName: string;
  budget?: number;
  notes?: string;
  createdAt: string;
  updatedAt?: string;
}

