export type CampaignStatus = "Draft" | "Active" | "Completed" | "Paused";
export type CampaignChannel = "Email" | "Social Media" | "SMS" | "Push";

export interface Campaign {
  id: string;
  name: string;
  channel: CampaignChannel;
  status: CampaignStatus;
  startDate: string;
  endDate: string;
  budget: number;
  spent: number;
  reach: number;
  conversions: number;
  roi: number;
  description: string;
  createdBy: string;
  createdAt: string;
}

export interface CampaignFilter {
  status: CampaignStatus | "All";
  channel: CampaignChannel | "All";
}
