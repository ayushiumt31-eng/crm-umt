import type { SocialPlatform } from "./socialPost";

export type SocialCampaignStatus =
  | "DRAFT"
  | "SCHEDULED"
  | "RUNNING"
  | "COMPLETED"
  | "PAUSED"
  | "CANCELLED";

export interface SocialCampaign {
  id: string;
  name: string;
  description?: string;
  platforms: SocialPlatform[];
  postIds: string[];
  totalPosts: number;
  startDate: string;
  endDate: string;
  status: SocialCampaignStatus;
  createdBy: string;
  createdByName: string;
  createdAt: string;
  updatedAt?: string;
  notes?: string;
}

