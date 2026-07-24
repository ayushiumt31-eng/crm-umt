import type { FormField } from "@/components/common/DataForm";

export const saleBasicFields: FormField[] = [
  {
    name: "saleNumber",
    label: "Sale Number",
    type: "text",
    placeholder: "e.g., SALE-0001",
    required: true,
  },
  {
    name: "saleDate",
    label: "Sale Date",
    type: "text",
    placeholder: "YYYY-MM-DD",
    required: true,
  },
  {
    name: "status",
    label: "Sale Status",
    type: "select",
    required: true,
    options: [
      { label: "Draft", value: "DRAFT" },
      { label: "Confirmed", value: "CONFIRMED" },
      { label: "Completed", value: "COMPLETED" },
      { label: "Cancelled", value: "CANCELLED" },
    ],
  },
  {
    name: "assignedTo",
    label: "Assigned To",
    type: "select",
    required: true,
    options: [
      { label: "John Smith", value: "emp-001" },
      { label: "Jane Doe", value: "emp-002" },
      { label: "Mike Johnson", value: "emp-003" },
      { label: "Sarah Williams", value: "emp-004" },
    ],
  },
];

export const saleRelationFields: FormField[] = [
  {
    name: "customerId",
    label: "Customer",
    type: "select",
    required: true,
    options: [
      { label: "Acme Corp", value: "cust-001" },
      { label: "Global Tech", value: "cust-002" },
      { label: "Healthcare Plus", value: "cust-003" },
      { label: "EduCorp", value: "cust-004" },
      { label: "Stark Industries", value: "cust-005" },
    ],
  },
  {
    name: "leadId",
    label: "Lead (Optional)",
    type: "select",
    options: [
      { label: "None", value: "" },
      { label: "John Smith", value: "lead-001" },
      { label: "Sarah Jenkins", value: "lead-002" },
      { label: "Michael Chen", value: "lead-003" },
    ],
  },
  {
    name: "dealId",
    label: "Deal / Opportunity (Optional)",
    type: "select",
    options: [
      { label: "None", value: "" },
      { label: "Enterprise Software License", value: "deal-001" },
      { label: "Cloud Migration Services", value: "deal-002" },
      { label: "Security Audit", value: "deal-003" },
    ],
  },
];

export const saleFinancialFields: FormField[] = [
  {
    name: "amount",
    label: "Amount ($)",
    type: "number",
    placeholder: "e.g., 5000",
    required: true,
  },
  {
    name: "discount",
    label: "Discount ($)",
    type: "number",
    placeholder: "e.g., 500",
  },
  {
    name: "tax",
    label: "Tax ($)",
    type: "number",
    placeholder: "e.g., 250",
  },
  {
    name: "finalAmount",
    label: "Final Amount ($)",
    type: "number",
    placeholder: "Auto-calculated if possible, else manual",
  },
  {
    name: "paymentStatus",
    label: "Payment Status",
    type: "select",
    required: true,
    options: [
      { label: "Pending", value: "PENDING" },
      { label: "Partial", value: "PARTIAL" },
      { label: "Paid", value: "PAID" },
      { label: "Refunded", value: "REFUNDED" },
    ],
  },
  {
    name: "paymentMethod",
    label: "Payment Method",
    type: "select",
    required: true,
    options: [
      { label: "Bank Transfer", value: "BANK_TRANSFER" },
      { label: "Credit/Debit Card", value: "CARD" },
      { label: "Cash", value: "CASH" },
      { label: "UPI", value: "UPI" },
      { label: "Other", value: "OTHER" },
    ],
  },
];

export const saleAdditionalFields: FormField[] = [
  {
    name: "notes",
    label: "Notes / Remarks",
    type: "textarea",
    placeholder: "Add any internal notes about this sale...",
    fullWidth: true,
  },
];

export const salesFields: FormField[] = [
  ...saleBasicFields,
  ...saleRelationFields,
  ...saleFinancialFields,
  ...saleAdditionalFields,
];
