import type { FormField } from "@/components/common/DataForm";

export const dealOverviewFields: FormField[] = [
  {
    name: "title",
    label: "Deal Title",
    type: "text",
    placeholder: "e.g., Enterprise Software License",
    required: true,
  },
  {
    name: "value",
    label: "Deal Value ($)",
    type: "number",
    placeholder: "e.g., 10000",
    required: true,
  },
  {
    name: "stage",
    label: "Deal Stage",
    type: "select",
    required: true,
    options: [
      { label: "Prospecting", value: "PROSPECTING" },
      { label: "Qualification", value: "QUALIFICATION" },
      { label: "Proposal", value: "PROPOSAL" },
      { label: "Negotiation", value: "NEGOTIATION" },
      { label: "Closed Won", value: "CLOSED_WON" },
      { label: "Closed Lost", value: "CLOSED_LOST" },
    ],
  },
  {
    name: "priority",
    label: "Priority Level",
    type: "select",
    required: true,
    options: [
      { label: "Low", value: "LOW" },
      { label: "Medium", value: "MEDIUM" },
      { label: "High", value: "HIGH" },
      { label: "Urgent", value: "URGENT" },
    ],
  },
];

export const dealContactFields: FormField[] = [
  {
    name: "company",
    label: "Company",
    type: "text",
    placeholder: "Enter company name",
    required: true,
  },
  {
    name: "contactPerson",
    label: "Contact Person",
    type: "text",
    placeholder: "Point of contact name",
    required: true,
  },
  {
    name: "contactEmail",
    label: "Contact Email",
    type: "email",
    placeholder: "contact@company.com",
    required: true,
  },
  {
    name: "contactPhone",
    label: "Contact Phone",
    type: "phone",
    placeholder: "+1 (555) 123-4567",
    required: true,
  },
];

export const dealManagementFields: FormField[] = [
  {
    name: "expectedCloseDate",
    label: "Expected Close Date",
    type: "text",
    placeholder: "YYYY-MM-DD",
    required: true,
  },
  {
    name: "assignedTo",
    label: "Assigned Representative",
    type: "select",
    options: [
      { label: "Unassigned", value: "" },
      { label: "Sarah Jenkins", value: "Sarah Jenkins" },
      { label: "Mike Ross", value: "Mike Ross" },
      { label: "David Kim", value: "David Kim" },
    ],
  },
];

export const dealAdditionalFields: FormField[] = [
  {
    name: "notes",
    label: "Notes / Remarks",
    type: "textarea",
    placeholder: "Add any internal notes about this deal...",
    fullWidth: true,
  },
];

export const dealFields: FormField[] = [
  ...dealOverviewFields,
  ...dealContactFields,
  ...dealManagementFields,
  ...dealAdditionalFields,
];
