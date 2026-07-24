export type ActivityType = "CALL" | "MEETING" | "FOLLOW_UP" | "EMAIL" | "OTHER";

export type ActivityPriority = "LOW" | "MEDIUM" | "HIGH";

export type ActivityStatus = "PENDING" | "IN_PROGRESS" | "COMPLETED" | "CANCELLED";

export interface Activity {
  id: string;
  title: string;
  type: ActivityType;
  description?: string;
  customerId?: string;
  customerName?: string;
  leadId?: string;
  leadName?: string;
  dealId?: string;
  dealName?: string;
  assignedTo: string;
  assignedToName: string;
  dueDate: string;
  dueTime?: string;
  priority: ActivityPriority;
  status: ActivityStatus;
  createdAt: string;
  updatedAt?: string;
}

