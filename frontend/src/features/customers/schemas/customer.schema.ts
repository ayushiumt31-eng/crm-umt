import { z } from "zod";

export const customerSchema = z.object({
  name: z.string().min(3, "Name must be at least 3 characters"),
  email: z.email("Please enter a valid email address"),
  phone: z.string().regex(/^\+?[\d\s-()]{10,}$/, "Please enter a valid phone number"),
  company: z.string().min(2, "Company must be at least 2 characters"),
  status: z.enum(["Active", "Inactive"]).default("Active").optional(),
  notes: z.string().optional(),
});

export type CustomerFormData = z.infer<typeof customerSchema>;