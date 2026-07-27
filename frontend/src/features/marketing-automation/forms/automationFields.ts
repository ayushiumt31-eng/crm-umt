import type { FormField } from "@/components/common/DataForm";
import { automationTriggerOptions } from "../config/triggers";
import { automationActionOptions } from "../config/actions";

export const automationFields: FormField[] = [
  {
    name: "name",
    label: "Automation Name",
    type: "text",
    placeholder: "e.g., New Lead Follow-up",
    required: true,
  },
  {
    name: "description",
    label: "Description",
    type: "textarea",
    placeholder: "Describe what this automation does...",
    required: true,
    fullWidth: true,
  },
  {
    name: "trigger",
    label: "Trigger Event",
    type: "select",
    required: true,
    options: automationTriggerOptions,
  },
  {
    name: "status",
    label: "Status",
    type: "select",
    required: true,
    options: [
      { label: "Draft", value: "DRAFT" },
      { label: "Active", value: "ACTIVE" },
      { label: "Inactive", value: "INACTIVE" },
      { label: "Paused", value: "PAUSED" },
    ],
  },
  {
    name: "notes",
    label: "Notes",
    type: "textarea",
    placeholder: "Additional notes about this automation...",
    fullWidth: true,
    required: false,
  },
];
