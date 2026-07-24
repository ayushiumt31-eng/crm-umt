export type PaymentStatus = "PENDING" | "PARTIAL" | "PAID" | "REFUNDED";

export type PaymentMethod = "CASH" | "BANK_TRANSFER" | "CARD" | "UPI" | "OTHER";

export type SaleStatus = "DRAFT" | "CONFIRMED" | "COMPLETED" | "CANCELLED";

export interface Sale {
  id: string;
  saleNumber: string;
  customerId: string;
  customerName: string;
  leadId?: string;
  leadName?: string;
  dealId?: string;
  dealName?: string;
  amount: number;
  discount: number;
  tax: number;
  finalAmount: number;
  paymentStatus: PaymentStatus;
  paymentMethod: PaymentMethod;
  saleDate: string;
  assignedTo: string;
  assignedToName: string;
  status: SaleStatus;
  notes?: string;
  createdAt: string;
  updatedAt?: string;
}
