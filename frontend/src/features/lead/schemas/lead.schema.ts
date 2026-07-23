import { z } from "zod";

export const leadSchema = z.object({
  // Basic Information
  firstName: z
    .string()
    .min(2, "First name must be at least 2 characters")
    .max(50, "First name is too long"),

  lastName: z
    .string()
    .min(2, "Last name must be at least 2 characters")
    .max(50, "Last name is too long"),

  email: z
    .string()
    .email("Please enter a valid email address"),

  phone: z
    .string()
    .min(10, "Phone number must be at least 10 digits")
    .max(15, "Phone number is too long"),

  // Company Information
  company: z
    .string()
    .optional(),

  jobTitle: z
    .string()
    .optional(),

  industry: z
    .string()
    .optional(),

  // Lead Information
  source: z.enum([
    "WEBSITE",
    "REFERRAL",
    "SOCIAL_MEDIA",
    "ADVERTISEMENT",
    "EMAIL",
    "PHONE",
    "WHATSAPP",
    "OTHER",
  ]),

  status: z.enum([
    "NEW",
    "CONTACTED",
    "QUALIFIED",
    "PROPOSAL",
    "NEGOTIATION",
    "CONVERTED",
    "LOST",
  ]),

  priority: z.enum([
    "LOW",
    "MEDIUM",
    "HIGH",
    "URGENT",
  ]),

  // Sales Information
  assignedTo: z
    .string()
    .optional(),

  estimatedValue: z
    .number()
    .min(0, "Estimated value cannot be negative")
    .optional(),

  expectedCloseDate: z
    .string()
    .optional(),

  // Address
  address: z
    .string()
    .optional(),

  city: z
    .string()
    .optional(),

  state: z
    .string()
    .optional(),

  country: z
    .string()
    .optional(),

  postalCode: z
    .string()
    .optional(),

  // Additional Information
  notes: z
    .string()
    .max(1000, "Notes cannot exceed 1000 characters")
    .optional(),

  tags: z
    .array(z.string())
    .optional(),
});

export type LeadFormData = z.infer<typeof leadSchema>;