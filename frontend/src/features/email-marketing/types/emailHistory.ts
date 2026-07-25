export type EmailHistoryStatus =
  | "PENDING"
  | "SENT"
  | "DELIVERED"
  | "FAILED"
  | "BOUNCED";

export interface EmailHistory {
  id: string;
  campaignId: string;
  campaignName: string;
  recipientName: string;
  recipientEmail: string;
  status: EmailHistoryStatus;
  sentAt: string;
  opened: boolean;
  clicked: boolean;
}

