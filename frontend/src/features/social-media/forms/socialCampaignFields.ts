import type { FormField } from "@/components/common/DataForm";

export const socialCampaignFields: FormField[] = [
  {
    name: "name",
    label: "Campaign Name",
    type: "text",
    placeholder: "e.g., Product Launch Q3",
    required: true,
    validation: (value: string) => {
      if (!value) return "Campaign name is required";
      if (value.length < 3) return "Name must be at least 3 characters";
      return null;
    },
  },
  {
    name: "description",
    label: "Description",
    type: "textarea",
    placeholder: "Describe the campaign goals and objectives...",
    fullWidth: true,
    required: false,
  },
  {
    name: "platforms",
    label: "Platforms (select one primary platform to start)",
    type: "select",
    required: true,
    options: [
      { label: "Facebook", value: "FACEBOOK" },
      { label: "Instagram", value: "INSTAGRAM" },
      { label: "LinkedIn", value: "LINKEDIN" },
    ],
  },
  {
    name: "postIds",
    label: "Select Social Posts (comma-separated IDs)",
    type: "text",
    placeholder: "e.g., sp-001, sp-002, sp-003",
    required: false,
  },
  {
    name: "startDate",
    label: "Start Date",
    type: "text",
    placeholder: "YYYY-MM-DD (e.g., 2026-09-01)",
    required: true,
  },
  {
    name: "endDate",
    label: "End Date",
    type: "text",
    placeholder: "YYYY-MM-DD (e.g., 2026-09-30)",
    required: true,
    validation: (value: string) => {
      if (!value) return "End date is required";
      return null;
    },
  },
  {
    name: "status",
    label: "Status",
    type: "select",
    required: true,
    options: [
      { label: "Draft", value: "DRAFT" },
      { label: "Scheduled", value: "SCHEDULED" },
      { label: "Running", value: "RUNNING" },
      { label: "Completed", value: "COMPLETED" },
      { label: "Paused", value: "PAUSED" },
      { label: "Cancelled", value: "CANCELLED" },
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

