export type WhatsAppTemplateCategory =
  | "WELCOME"
  | "PROMOTION"
  | "REMINDER"
  | "FOLLOW_UP"
  | "ANNOUNCEMENT"
  | "SUPPORT"
  | "CUSTOM";

export type WhatsAppTemplateStatus = "ACTIVE" | "INACTIVE";

export interface WhatsAppTemplate {
  id: string;
  name: string;
  category: WhatsAppTemplateCategory;
  message: string;
  status: WhatsAppTemplateStatus;
  createdBy: string;
  createdByName: string;
  createdAt: string;
  updatedAt?: string;
}

