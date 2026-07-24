import { z } from "zod";

export const dealSchema = z.object({
  title: z
    .string()
    .min(2, "Title must be at least 2 characters")
    .max(100, "Title is too long"),

  value: z
    .number()
    .min(0, "Deal value cannot be negative"),

  stage: z.enum([
    "PROSPECTING",
    "QUALIFICATION",
    "PROPOSAL",
    "NEGOTIATION",
    "CLOSED_WON",
    "CLOSED_LOST",
  ]),

  priority: z.enum([
    "LOW",
    "MEDIUM",
    "HIGH",
    "URGENT",
  ]),

  expectedCloseDate: z
    .string()
    .optional(),

  company: z
    .string()
    .min(2, "Company name is required"),

  contactPerson: z
    .string()
    .min(2, "Contact person is required"),

  contactEmail: z
    .string()
    .email("Please enter a valid email address"),

  contactPhone: z
    .string()
    .min(10, "Phone number must be at least 10 digits"),

  assignedTo: z
    .string()
    .optional(),

  notes: z
    .string()
    .max(1000, "Notes cannot exceed 1000 characters")
    .optional(),
});

export type DealFormData = z.infer<typeof dealSchema>;
