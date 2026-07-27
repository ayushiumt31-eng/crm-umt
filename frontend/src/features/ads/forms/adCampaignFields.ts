import type { FormField } from "@/components/common/DataForm";
import { adPlatformOptions } from "../components/AdPlatformBadge";

export const adCampaignFields: FormField[] = [
  {
    name: "name",
    label: "Campaign Name",
    type: "text",
    placeholder: "e.g., EV Awareness Campaign",
    required: true,
  },
  {
    name: "objective",
    label: "Campaign Objective",
    type: "select",
    required: true,
    options: [
      { label: "Brand Awareness", value: "BRAND_AWARENESS" },
      { label: "Traffic", value: "TRAFFIC" },
      { label: "Engagement", value: "ENGAGEMENT" },
      { label: "Leads", value: "LEADS" },
      { label: "Conversions", value: "CONVERSIONS" },
      { label: "Sales", value: "SALES" },
    ],
  },
  {
    name: "platform",
    label: "Platform",
    type: "select",
    required: true,
    options: adPlatformOptions,
  },
  {
    name: "budgetType",
    label: "Budget Type",
    type: "select",
    required: true,
    options: [
      { label: "Daily Budget", value: "DAILY" },
      { label: "Lifetime Budget", value: "LIFETIME" },
    ],
  },
  {
    name: "budget",
    label: "Budget (₹)",
    type: "number",
    placeholder: "e.g., 50000",
    required: true,
    validation: (value: string) => {
      const num = Number(value);
      if (!value) return "Budget is required";
      if (isNaN(num) || num <= 0) return "Budget must be greater than 0";
      return null;
    },
  },
  {
    name: "audienceName",
    label: "Audience",
    type: "select",
    required: false,
    options: [
      { label: "Select Audience", value: "" },
      { label: "EV Enthusiasts", value: "EV Enthusiasts" },
      { label: "Homeowners", value: "Homeowners" },
      { label: "Green Energy Supporters", value: "Green Energy Supporters" },
      { label: "Business Owners", value: "Business Owners" },
      { label: "Tech Enthusiasts", value: "Tech Enthusiasts" },
      { label: "General Audience", value: "General Audience" },
    ],
  },
  {
    name: "startDate",
    label: "Start Date",
    type: "text",
    placeholder: "YYYY-MM-DD",
    required: true,
  },
  {
    name: "endDate",
    label: "End Date",
    type: "text",
    placeholder: "YYYY-MM-DD",
    required: true,
    validation: (value: string, formValues?: Record<string, any>) => {
      if (!value) return "End Date is required";
      if (formValues?.startDate && value < formValues.startDate) {
        return "End Date cannot be before Start Date";
      }
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
      { label: "Active", value: "ACTIVE" },
      { label: "Paused", value: "PAUSED" },
      { label: "Completed", value: "COMPLETED" },
      { label: "Cancelled", value: "CANCELLED" },
    ],
  },
  {
    name: "notes",
    label: "Notes",
    type: "textarea",
    placeholder: "Campaign notes, targeting details, etc.",
    fullWidth: true,
    required: false,
  },
];
