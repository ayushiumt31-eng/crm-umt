import type { SocialPlatform, SocialPostStatus } from "./socialPost";

export interface SocialHistory {
  id: string;
  postTitle: string;
  platform: SocialPlatform;
  campaign?: string;
  status: SocialPostStatus;
  scheduledAt?: string;
  publishedAt?: string;
  createdBy: string;
  createdByName: string;
}

