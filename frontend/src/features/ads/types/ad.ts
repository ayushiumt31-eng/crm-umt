export type AdStatus = "DRAFT" | "ACTIVE" | "PAUSED" | "REJECTED" | "COMPLETED";

export type CTAOption =
  | "LEARN_MORE"
  | "SIGN_UP"
  | "CONTACT_US"
  | "GET_QUOTE"
  | "SHOP_NOW"
  | "APPLY_NOW";

export interface Ad {
  id: string;
  name: string;
  adSetId: string;
  adSetName: string;
  campaignId: string;
  campaignName: string;
  platform: string;
  headline: string;
  primaryText: string;
  description?: string;
  mediaUrl?: string;
  callToAction: CTAOption;
  status: AdStatus;
  impressions: number;
  clicks: number;
  leads: number;
  createdAt: string;
  updatedAt?: string;
}

