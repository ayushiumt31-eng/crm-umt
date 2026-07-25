import type { FormField } from "@/components/common/DataForm";

export const emailCampaignFields: FormField[] = [
  {
    name: "name",
    label: "Campaign Name",
    type: "text",
    placeholder: "e.g., Summer Sale 2026",
    required: true,
  },
  {
    name: "subject",
    label: "Email Subject",
    type: "text",
    placeholder: "e.g., Exclusive offer just for you!",
    required: true,
    validation: (value: string) => {
      if (!value) return "Email subject is required";
      if (value.length < 3) return "Subject must be at least 3 characters";
      if (value.length > 150) return "Subject must be at most 150 characters";
      return null;
    },
  },
  {
    name: "templateId",
    label: "Email Template",
    type: "select",
    required: true,
    options: [
      { label: "Welcome Email", value: "etpl-001" },
      { label: "Summer Sale Promotion", value: "etpl-002" },
      { label: "Monthly Newsletter", value: "etpl-003" },
      { label: "Follow-up After Demo", value: "etpl-004" },
      { label: "Payment Reminder", value: "etpl-005" },
      { label: "New Feature Announcement", value: "etpl-006" },
      { label: "Custom Follow-up", value: "etpl-007" },
      { label: "Re-engagement Campaign", value: "etpl-008" },
    ],
  },
  {
    name: "audienceType",
    label: "Audience",
    type: "select",
    required: true,
    options: [
      { label: "All Customers", value: "ALL_CUSTOMERS" },
      { label: "All Leads", value: "ALL_LEADS" },
      { label: "Customers", value: "CUSTOMERS" },
      { label: "Leads", value: "LEADS" },
      { label: "Custom Audience", value: "CUSTOM" },
    ],
  },
  {
    name: "recipientCount",
    label: "Recipients Count",
    type: "number",
    placeholder: "e.g., 100",
    required: false,
  },
  {
    name: "scheduledAt",
    label: "Scheduled Date & Time",
    type: "text",
    placeholder: "YYYY-MM-DDTHH:mm (e.g., 2026-09-01T10:00)",
    required: true,
  },
  {
    name: "status",
    label: "Status",
    type: "select",
    required: true,
    options: [
      { label: "Draft", value: "DRAFT" },
      { label: "Scheduled", value: "SCHEDULED" },
      { label: "Processing", value: "PROCESSING" },
      { label: "Sent", value: "SENT" },
      { label: "Paused", value: "PAUSED" },
      { label: "Cancelled", value: "CANCELLED" },
      { label: "Failed", value: "FAILED" },
    ],
  },
  {
    name: "notes",
    label: "Notes",
    type: "textarea",
    placeholder: "Enter any additional notes...",
    fullWidth: true,
    required: false,
  },
];
