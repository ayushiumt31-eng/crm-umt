import { z } from "zod";

export const createLeadSchema = z.object({
  leadName: z.string().min(1, "Lead name is required").min(2, "Lead name must be at least 2 characters"),
  companyName: z.string().min(1, "Company name is required").min(2, "Company name must be at least 2 characters"),
  contactPerson: z.string().min(1, "Contact person is required").min(2, "Contact person must be at least 2 characters"),
  email: z.string().email("Valid email required"),
  phone: z.string().min(10, "Valid phone number required"),
  source: z.enum(["Website", "Referral", "Social Media", "Campaign", "Walk-in"]),
  status: z.enum(["New", "Contacted", "Qualified", "Proposal Sent", "Won", "Lost"]),
  assignedTo: z.string().min(1, "Assigned employee is required"),
  expectedDealValue: z.number().min(0, "Expected deal value must be a positive number"),
  followUpDate: z.string().min(1, "Follow-up date is required"),
  notes: z.string().optional(),
});

export const updateLeadSchema = createLeadSchema.partial();

export type CreateLeadFormData = z.infer<typeof createLeadSchema>;
export type UpdateLeadFormData = z.infer<typeof updateLeadSchema>;
