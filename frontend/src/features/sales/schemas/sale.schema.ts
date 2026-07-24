import { z } from "zod";

export const saleSchema = z.object({
  saleNumber: z.string().min(1, "Sale number is required"),
  customerId: z.string().min(1, "Customer is required"),
  customerName: z.string().optional(),
  leadId: z.string().optional(),
  leadName: z.string().optional(),
  dealId: z.string().optional(),
  dealName: z.string().optional(),
  amount: z.number().min(0, "Amount cannot be negative"),
  discount: z.number().min(0, "Discount cannot be negative").default(0),
  tax: z.number().min(0, "Tax cannot be negative").default(0),
  finalAmount: z.number().min(0).optional(),
  paymentStatus: z.enum(["PENDING", "PARTIAL", "PAID", "REFUNDED"]),
  paymentMethod: z.enum(["CASH", "BANK_TRANSFER", "CARD", "UPI", "OTHER"]),
  saleDate: z.string().min(1, "Sale date is required"),
  assignedTo: z.string().min(1, "Assigned representative is required"),
  assignedToName: z.string().optional(),
  status: z.enum(["DRAFT", "CONFIRMED", "COMPLETED", "CANCELLED"]),
  notes: z.string().max(1000, "Notes cannot exceed 1000 characters").optional(),
});

export type SaleFormData = z.infer<typeof saleSchema>;
