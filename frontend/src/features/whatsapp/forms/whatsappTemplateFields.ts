import type { FormField } from "@/components/common/DataForm";

export const whatsappTemplateFields: FormField[] = [
  {
    name: "name",
    label: "Template Name",
    type: "text",
    placeholder: "e.g., Welcome Message",
    required: true,
  },
  {
    name: "category",
    label: "Category",
    type: "select",
    required: true,
    options: [
      { label: "Welcome", value: "WELCOME" },
      { label: "Promotion", value: "PROMOTION" },
      { label: "Reminder", value: "REMINDER" },
      { label: "Follow-up", value: "FOLLOW_UP" },
      { label: "Announcement", value: "ANNOUNCEMENT" },
      { label: "Support", value: "SUPPORT" },
      { label: "Custom", value: "CUSTOM" },
    ],
  },
  {
    name: "status",
    label: "Status",
    type: "select",
    required: true,
    options: [
      { label: "Active", value: "ACTIVE" },
      { label: "Inactive", value: "INACTIVE" },
    ],
  },
];

