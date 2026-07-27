export type ConditionField =
  | "leadSource"
  | "leadStatus"
  | "leadStage"
  | "customerStatus"
  | "dealStatus"
  | "dealValue"
  | "customerType"
  | "assignedEmployee";

export type ConditionOperator =
  | "EQUALS"
  | "NOT_EQUALS"
  | "CONTAINS"
  | "NOT_CONTAINS"
  | "GREATER_THAN"
  | "LESS_THAN"
  | "GREATER_THAN_OR_EQUAL"
  | "LESS_THAN_OR_EQUAL";

export type ConditionLogic = "AND" | "OR";

export interface ConditionConfig {
  value: ConditionField;
  label: string;
  type: "STRING" | "NUMBER" | "SELECT";
  options?: { label: string; value: string }[];
}

export const conditionFields: ConditionConfig[] = [
  {
    value: "leadSource",
    label: "Lead Source",
    type: "SELECT",
    options: [
      { label: "Website", value: "Website" },
      { label: "Referral", value: "Referral" },
      { label: "Social Media", value: "Social Media" },
      { label: "Email Campaign", value: "Email Campaign" },
      { label: "Phone Inquiry", value: "Phone Inquiry" },
      { label: "Walk-in", value: "Walk-in" },
      { label: "Partner", value: "Partner" },
      { label: "Other", value: "Other" },
    ],
  },
  {
    value: "leadStatus",
    label: "Lead Status",
    type: "SELECT",
    options: [
      { label: "New", value: "New" },
      { label: "Contacted", value: "Contacted" },
      { label: "Qualified", value: "Qualified" },
      { label: "Proposal", value: "Proposal" },
      { label: "Negotiation", value: "Negotiation" },
      { label: "Won", value: "Won" },
      { label: "Lost", value: "Lost" },
    ],
  },
  {
    value: "leadStage",
    label: "Lead Stage",
    type: "SELECT",
    options: [
      { label: "Initial", value: "Initial" },
      { label: "Awareness", value: "Awareness" },
      { label: "Interest", value: "Interest" },
      { label: "Consideration", value: "Consideration" },
      { label: "Intent", value: "Intent" },
      { label: "Evaluation", value: "Evaluation" },
      { label: "Purchase", value: "Purchase" },
    ],
  },
  {
    value: "customerStatus",
    label: "Customer Status",
    type: "SELECT",
    options: [
      { label: "Active", value: "Active" },
      { label: "Inactive", value: "Inactive" },
      { label: "VIP", value: "VIP" },
      { label: "Suspended", value: "Suspended" },
    ],
  },
  {
    value: "dealStatus",
    label: "Deal Status",
    type: "SELECT",
    options: [
      { label: "New", value: "New" },
      { label: "Qualified", value: "Qualified" },
      { label: "Proposal", value: "Proposal" },
      { label: "Negotiation", value: "Negotiation" },
      { label: "Won", value: "Won" },
      { label: "Lost", value: "Lost" },
    ],
  },
  {
    value: "dealValue",
    label: "Deal Value",
    type: "NUMBER",
  },
  {
    value: "customerType",
    label: "Customer Type",
    type: "SELECT",
    options: [
      { label: "Individual", value: "Individual" },
      { label: "Business", value: "Business" },
      { label: "Enterprise", value: "Enterprise" },
    ],
  },
  {
    value: "assignedEmployee",
    label: "Assigned Employee",
    type: "STRING",
  },
];

export const conditionOperators: { value: ConditionOperator; label: string }[] = [
  { value: "EQUALS", label: "Equals" },
  { value: "NOT_EQUALS", label: "Not Equals" },
  { value: "CONTAINS", label: "Contains" },
  { value: "NOT_CONTAINS", label: "Not Contains" },
  { value: "GREATER_THAN", label: "Greater Than" },
  { value: "LESS_THAN", label: "Less Than" },
  { value: "GREATER_THAN_OR_EQUAL", label: "Greater Than or Equal" },
  { value: "LESS_THAN_OR_EQUAL", label: "Less Than or Equal" },
];

export function getConditionFieldLabel(field: ConditionField): string {
  const config = conditionFields.find((f) => f.value === field);
  return config?.label || field;
}
