import type { ImportField, ModuleType } from "./types";

export const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10 MB

export const ALLOWED_EXTENSIONS = [".csv", ".xlsx"] as const;

export const ALLOWED_MIME_TYPES = [
  "text/csv",
  "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  "application/csv",
  "text/x-csv",
  "application/x-csv",
] as const;

export const MODULE_LABELS: Record<ModuleType, string> = {
  customers: "Customers",
  leads: "Leads",
  sales: "Sales",
};

export const MODULE_DESCRIPTIONS: Record<ModuleType, string> = {
  customers: "Import customer records from CSV or Excel file.",
  leads: "Import lead records from CSV or Excel file.",
  sales: "Import sales records from CSV or Excel file.",
};

export const CUSTOMER_IMPORT_FIELDS: ImportField[] = [
  { key: "firstName", label: "First Name", required: true, type: "text", description: "Customer's first name" },
  { key: "lastName", label: "Last Name", required: false, type: "text", description: "Customer's last name" },
  { key: "email", label: "Email", required: true, type: "email", description: "Valid email address" },
  { key: "phone", label: "Phone", required: true, type: "phone", description: "Phone number (10+ digits)" },
  { key: "company", label: "Company", required: false, type: "text", description: "Company name" },
  { key: "address", label: "Address", required: false, type: "text", description: "Street address" },
  { key: "city", label: "City", required: false, type: "text", description: "City name" },
  { key: "state", label: "State", required: false, type: "text", description: "State or province" },
  { key: "country", label: "Country", required: false, type: "text", description: "Country name" },
  { key: "postalCode", label: "Postal Code", required: false, type: "text", description: "ZIP or postal code" },
  {
    key: "status", label: "Status", required: false, type: "select",
    options: [
      { label: "Active", value: "Active" },
      { label: "Inactive", value: "Inactive" },
    ],
    description: "Customer status (default: Active)",
  },
];

export const LEAD_IMPORT_FIELDS: ImportField[] = [
  { key: "firstName", label: "First Name", required: true, type: "text", description: "Lead's first name" },
  { key: "lastName", label: "Last Name", required: false, type: "text", description: "Lead's last name" },
  { key: "email", label: "Email", required: true, type: "email", description: "Valid email address" },
  { key: "phone", label: "Phone", required: true, type: "phone", description: "Phone number (10+ digits)" },
  { key: "company", label: "Company", required: false, type: "text", description: "Company name" },
  { key: "source", label: "Source", required: false, type: "select",
    options: [
      { label: "Website", value: "WEBSITE" },
      { label: "Referral", value: "REFERRAL" },
      { label: "Social Media", value: "SOCIAL_MEDIA" },
      { label: "Advertisement", value: "ADVERTISEMENT" },
      { label: "Email", value: "EMAIL" },
      { label: "Phone", value: "PHONE" },
      { label: "WhatsApp", value: "WHATSAPP" },
      { label: "Other", value: "OTHER" },
    ],
    description: "Lead source (default: OTHER)",
  },
  { key: "status", label: "Status", required: false, type: "select",
    options: [
      { label: "New", value: "NEW" },
      { label: "Contacted", value: "CONTACTED" },
      { label: "Qualified", value: "QUALIFIED" },
      { label: "Proposal", value: "PROPOSAL" },
      { label: "Negotiation", value: "NEGOTIATION" },
      { label: "Converted", value: "CONVERTED" },
      { label: "Lost", value: "LOST" },
    ],
    description: "Lead status (default: NEW)",
  },
  { key: "assignedTo", label: "Assigned To (Employee ID)", required: false, type: "text", description: "Employee ID or email" },
];

export const SALES_IMPORT_FIELDS: ImportField[] = [
  { key: "customerId", label: "Customer ID/Email", required: true, type: "text", description: "Existing customer ID or email" },
  { key: "leadId", label: "Lead ID/Email", required: false, type: "text", description: "Existing lead ID or email" },
  { key: "dealId", label: "Deal ID/Name", required: false, type: "text", description: "Existing deal ID or name" },
  { key: "amount", label: "Amount", required: true, type: "number", description: "Sale amount" },
  { key: "saleDate", label: "Sale Date", required: true, type: "date", description: "Date in YYYY-MM-DD format" },
  { key: "status", label: "Status", required: false, type: "select",
    options: [
      { label: "Draft", value: "DRAFT" },
      { label: "Confirmed", value: "CONFIRMED" },
      { label: "Completed", value: "COMPLETED" },
      { label: "Cancelled", value: "CANCELLED" },
    ],
    description: "Sale status (default: DRAFT)",
  },
  { key: "assignedTo", label: "Assigned To (Employee ID)", required: true, type: "text", description: "Employee ID or email" },
  { key: "paymentStatus", label: "Payment Status", required: false, type: "select",
    options: [
      { label: "Pending", value: "PENDING" },
      { label: "Partial", value: "PARTIAL" },
      { label: "Paid", value: "PAID" },
      { label: "Refunded", value: "REFUNDED" },
    ],
    description: "Payment status (default: PENDING)",
  },
  { key: "paymentMethod", label: "Payment Method", required: false, type: "select",
    options: [
      { label: "Bank Transfer", value: "BANK_TRANSFER" },
      { label: "Card", value: "CARD" },
      { label: "Cash", value: "CASH" },
      { label: "UPI", value: "UPI" },
      { label: "Other", value: "OTHER" },
    ],
    description: "Payment method (default: OTHER)",
  },
  { key: "notes", label: "Notes", required: false, type: "text", description: "Additional notes" },
];

export const CUSTOMER_SAMPLE_DATA: Record<string, unknown> = {
  firstName: "Rahul",
  lastName: "Sharma",
  email: "rahul@example.com",
  phone: "9876543210",
  company: "ABC Pvt Ltd",
  address: "Delhi",
  city: "Delhi",
  state: "Delhi",
  country: "India",
  postalCode: "110001",
  status: "ACTIVE",
};

export const LEAD_SAMPLE_DATA: Record<string, unknown> = {
  firstName: "Priya",
  lastName: "Verma",
  email: "priya@example.com",
  phone: "9876543211",
  company: "Verma Technologies",
  source: "WEBSITE",
  status: "NEW",
  assignedTo: "emp-001",
};

export const SALES_SAMPLE_DATA: Record<string, unknown> = {
  customerId: "cust-001",
  leadId: "lead-001",
  dealId: "deal-001",
  amount: "50000",
  saleDate: "2024-03-15",
  status: "CONFIRMED",
  assignedTo: "emp-001",
  paymentStatus: "PENDING",
  paymentMethod: "BANK_TRANSFER",
  notes: "Sample sale record",
};

export const MODULE_FIELD_MAP: Record<ModuleType, ImportField[]> = {
  customers: CUSTOMER_IMPORT_FIELDS,
  leads: LEAD_IMPORT_FIELDS,
  sales: SALES_IMPORT_FIELDS,
};

export const MODULE_SAMPLE_DATA_MAP: Record<ModuleType, Record<string, unknown>> = {
  customers: CUSTOMER_SAMPLE_DATA,
  leads: LEAD_SAMPLE_DATA,
  sales: SALES_SAMPLE_DATA,
};

