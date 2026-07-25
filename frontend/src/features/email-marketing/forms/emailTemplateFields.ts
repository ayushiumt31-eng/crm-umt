import type { FormField } from "@/components/common/DataForm";

export const emailTemplateFields: FormField[] = [
  {
    name: "name",
    label: "Template Name",
    type: "text",
    placeholder: "e.g., Welcome Email",
    required: true,
  },
  {
    name: "subject",
    label: "Email Subject",
    type: "text",
    placeholder: "e.g., Welcome to {{companyName}}!",
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
      { label: "Newsletter", value: "NEWSLETTER" },
      { label: "Follow-up", value: "FOLLOW_UP" },
      { label: "Reminder", value: "REMINDER" },
      { label: "Announcement", value: "ANNOUNCEMENT" },
      { label: "Custom", value: "CUSTOM" },
    ],
  },
  {
    name: "body",
    label: "Email Body (HTML)",
    type: "textarea",
    placeholder:
      "Write your email HTML here...\n\nAvailable placeholders:\n{{firstName}} - Recipient's first name\n{{lastName}} - Recipient's last name\n{{companyName}} - Company name\n{{email}} - Recipient's email",
    required: true,
    fullWidth: true,
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
