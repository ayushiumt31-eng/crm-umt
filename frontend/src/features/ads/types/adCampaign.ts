export type AdObjective =
  | "BRAND_AWARENESS"
  | "TRAFFIC"
  | "ENGAGEMENT"
  | "LEADS"
  | "CONVERSIONS"
  | "SALES";

export type AdPlatform = "FACEBOOK" | "INSTAGRAM" | "FACEBOOK_INSTAGRAM";

export type AdBudgetType = "DAILY" | "LIFETIME";

export type AdCampaignStatus =
  | "DRAFT"
  | "SCHEDULED"
  | "ACTIVE"
  | "PAUSED"
  | "COMPLETED"
  | "CANCELLED"
  | "FAILED";

export interface AdCampaign {
  id: string;
  name: string;
  objective: AdObjective;
  platform: AdPlatform;
  budgetType: AdBudgetType;
  budget: number;
  spent: number;
  startDate: string;
  endDate: string;
  status: AdCampaignStatus;
  audienceId?: string;
  audienceName?: string;
  createdBy: string;
  createdByName: string;
  createdAt: string;
  updatedAt?: string;
  notes?: string;
}

