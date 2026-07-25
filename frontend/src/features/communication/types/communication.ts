export type CommunicationType =
  | "EMAIL"
  | "WHATSAPP"
  | "SMS"
  | "CALL"
  | "MEETING"
  | "NOTE";

export type CommunicationStatus =
  | "DRAFT"
  | "SENT"
  | "DELIVERED"
  | "COMPLETED"
  | "FAILED";

export interface Communication {
  id: string;
  type: CommunicationType;
  subject?: string;
  message: string;
  customerId?: string;
  customerName?: string;
  leadId?: string;
  leadName?: string;
  dealId?: string;
  dealName?: string;
  recipient?: string;
  assignedTo: string;
  assignedToName: string;
  communicationDate: string;
  communicationTime?: string;
  status: CommunicationStatus;
  createdAt: string;
  updatedAt?: string;
}

