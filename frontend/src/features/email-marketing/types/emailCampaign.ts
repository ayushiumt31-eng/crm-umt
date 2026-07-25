export type EmailCampaignAudienceType =
  | "ALL_CUSTOMERS"
  | "ALL_LEADS"
  | "CUSTOMERS"
  | "LEADS"
  | "CUSTOM";

export type EmailCampaignStatus =
  | "DRAFT"
  | "SCHEDULED"
  | "PROCESSING"
  | "SENT"
  | "PAUSED"
  | "CANCELLED"
  | "FAILED";

export interface EmailCampaign {
  id: string;
  name: string;
  subject: string;
  templateId: string;
  templateName: string;
  audienceType: EmailCampaignAudienceType;
  recipientIds: string[];
  recipientCount: number;
  scheduledAt: string;
  status: EmailCampaignStatus;
  createdBy: string;
  createdByName: string;
  createdAt: string;
  updatedAt?: string;
  notes?: string;
}

