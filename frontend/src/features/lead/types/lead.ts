
export type LeadStatus =
  | "NEW"
  | "CONTACTED"
  | "QUALIFIED"
  | "PROPOSAL"
  | "NEGOTIATION"
  | "CONVERTED"
  | "LOST";

export type LeadPriority =
  | "LOW"
  | "MEDIUM"
  | "HIGH"
  | "URGENT";

export type LeadSource =
  | "WEBSITE"
  | "REFERRAL"
  | "SOCIAL_MEDIA"
  | "ADVERTISEMENT"
  | "EMAIL"
  | "PHONE"
  | "WHATSAPP"
  | "OTHER";
  
export interface Lead {
  id: string;

  // Basic Information
  firstName: string;
  lastName: string;
  email: string;
  phone: string;

  // Company Information
  company?: string;
  jobTitle?: string;
  industry?: string;

  // Lead Information
  source: LeadSource;
  status: LeadStatus;
  priority: LeadPriority;

  // Sales Information
  assignedTo?: string;
  estimatedValue?: number;
  expectedCloseDate?: string;

  // Address
  address?: string;
  city?: string;
  state?: string;
  country?: string;
  postalCode?: string;

  // Additional Information
  notes?: string;
  tags?: string[];

  // System Information
  createdAt: string;
  updatedAt?: string;
}