import type { FormField } from "@/components/common/DataForm";

export const adSetFields: FormField[] = [
  {
    name: "name",
    label: "Ad Set Name",
    type: "text",
    placeholder: "e.g., EV Awareness - Urban Professionals",
    required: true,
  },
  {
    name: "campaignId",
    label: "Campaign",
    type: "select",
    required: true,
    options: [
      { label: "EV Awareness Campaign", value: "adc-001" },
      { label: "Solar Energy Campaign", value: "adc-002" },
      { label: "Renewable Energy Leads", value: "adc-003" },
      { label: "Business Growth Campaign", value: "adc-004" },
      { label: "EV Charging Campaign", value: "adc-005" },
      { label: "Solar Installation Campaign", value: "adc-006" },
      { label: "Brand Awareness Campaign", value: "adc-007" },
      { label: "Engagement Boost Campaign", value: "adc-008" },
      { label: "Festival Offer Campaign", value: "adc-010" },
    ],
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
    name: "budget",
    label: "Budget (₹)",
    type: "number",
    placeholder: "e.g., 25000",
    required: true,
    validation: (value: string) => {
      const num = Number(value);
      if (!value) return "Budget is required";
      if (isNaN(num) || num <= 0) return "Budget must be greater than 0";
      return null;
    },
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
      { label: "Active", value: "ACTIVE" },
      { label: "Paused", value: "PAUSED" },
      { label: "Completed", value: "COMPLETED" },
      { label: "Cancelled", value: "CANCELLED" },
    ],
  },
];
