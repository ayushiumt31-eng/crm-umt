import { z } from "zod";

export const customerSchema = z.object({
  name: z.string().min(3, "Name is required"),
  email: z.email("Invalid email"),
  phone: z.string().min(10, "Phone is required"),
  company: z.string().min(2, "Company is required"),
});

export type CustomerFormData = z.infer<typeof customerSchema>;