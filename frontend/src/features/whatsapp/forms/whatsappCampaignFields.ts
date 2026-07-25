import type { FormField } from "@/components/common/DataForm";

export const whatsappCampaignFields: FormField[] = [
  {
    name: "name",
    label: "Campaign Name",
    type: "text",
    placeholder: "e.g., Welcome WhatsApp Campaign",
    required: true,
  },
  {
    name: "templateId",
    label: "WhatsApp Template",
    type: "select",
    required: true,
    options: [
      { label: "Welcome Message", value: "wtpl-001" },
      { label: "Promotional Offer", value: "wtpl-002" },
      { label: "Event Invitation", value: "wtpl-003" },
      { label: "Follow-up Message", value: "wtpl-004" },
      { label: "Payment Reminder", value: "wtpl-005" },
      { label: "Support Message", value: "wtpl-006" },
      { label: "Feedback Request", value: "wtpl-007" },
      { label: "Custom Follow-up", value: "wtpl-008" },
    ],
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

