export interface Lead {
  id: string;
  leadName: string;
  companyName: string;
  contactPerson: string;
  email: string;
  phone: string;
  source: "Website" | "Referral" | "Social Media" | "Campaign" | "Walk-in";
  status: "New" | "Contacted" | "Qualified" | "Proposal Sent" | "Won" | "Lost";
  assignedTo: string;
  expectedDealValue: number;
  followUpDate: string;
  notes: string;
  createdAt: string;
  updatedAt: string;
}

export interface CreateLeadPayload {
  leadName: string;
  companyName: string;
  contactPerson: string;
  email: string;
  phone: string;
  source: "Website" | "Referral" | "Social Media" | "Campaign" | "Walk-in";
  status: "New" | "Contacted" | "Qualified" | "Proposal Sent" | "Won" | "Lost";
  assignedTo: string;
  expectedDealValue: number;
  followUpDate: string;
  notes: string;
}

export interface UpdateLeadPayload extends Partial<CreateLeadPayload> {}

export interface LeadListResponse {
  data: Lead[];
  total: number;
  page: number;
  limit: number;
}

export interface LeadFilters {
  search?: string;
  status?: "New" | "Contacted" | "Qualified" | "Proposal Sent" | "Won" | "Lost";
  source?: "Website" | "Referral" | "Social Media" | "Campaign" | "Walk-in";
  assignedTo?: string;
  sortBy?: string;
  sortOrder?: "asc" | "desc";
  page?: number;
  limit?: number;
}
