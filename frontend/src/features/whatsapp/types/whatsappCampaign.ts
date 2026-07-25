export type WhatsAppCampaignAudienceType =
  | "ALL_CUSTOMERS"
  | "ALL_LEADS"
  | "CUSTOMERS"
  | "LEADS"
  | "CUSTOM";

export type WhatsAppCampaignStatus =
  | "DRAFT"
  | "SCHEDULED"
  | "PROCESSING"
  | "SENT"
  | "PAUSED"
  | "CANCELLED"
  | "FAILED";

export interface WhatsAppCampaign {
  id: string;
  name: string;
  templateId: string;
  templateName: string;
  message: string;
  audienceType: WhatsAppCampaignAudienceType;
  recipientIds: string[];
  recipientCount: number;
  scheduledAt: string;
  status: WhatsAppCampaignStatus;
  createdBy: string;
  createdByName: string;
  createdAt: string;
  updatedAt?: string;
  notes?: string;
}

