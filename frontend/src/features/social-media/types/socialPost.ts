export type SocialPlatform = "FACEBOOK" | "INSTAGRAM" | "LINKEDIN";

export type SocialMediaType = "IMAGE" | "VIDEO" | "NONE";

export type SocialPostStatus =
  | "DRAFT"
  | "SCHEDULED"
  | "PUBLISHED"
  | "PAUSED"
  | "FAILED"
  | "CANCELLED";

export interface SocialPost {
  id: string;
  title: string;
  content: string;
  platform: SocialPlatform;
  mediaUrl?: string;
  mediaType?: SocialMediaType;
  scheduledAt?: string;
  status: SocialPostStatus;
  campaignId?: string;
  campaignName?: string;
  createdBy: string;
  createdByName: string;
  createdAt: string;
  updatedAt?: string;
  notes?: string;
}

