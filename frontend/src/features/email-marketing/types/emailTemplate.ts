export type EmailTemplateCategory =
  | "WELCOME"
  | "PROMOTION"
  | "NEWSLETTER"
  | "FOLLOW_UP"
  | "REMINDER"
  | "ANNOUNCEMENT"
  | "CUSTOM";

export type EmailTemplateStatus = "ACTIVE" | "INACTIVE";

export interface EmailTemplate {
  id: string;
  name: string;
  subject: string;
  category: EmailTemplateCategory;
  body: string;
  status: EmailTemplateStatus;
  createdBy: string;
  createdByName: string;
  createdAt: string;
  updatedAt?: string;
}

