export type WhatsAppHistoryStatus =
  | "PENDING"
  | "SENT"
  | "DELIVERED"
  | "FAILED";

export interface WhatsAppHistory {
  id: string;
  campaignId: string;
  campaignName: string;
  recipientName: string;
  recipientPhone: string;
  message: string;
  status: WhatsAppHistoryStatus;
  sentAt: string;
  delivered: boolean;
  read: boolean;
}

