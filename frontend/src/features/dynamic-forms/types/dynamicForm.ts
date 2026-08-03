export type FormFieldType =
  | "text"
  | "textarea"
  | "number"
  | "currency"
  | "email"
  | "phone"
  | "date"
  | "dropdown"
  | "radio"
  | "checkbox"
  | "switch"
  | "file"
  | "multiSelect"
  | "password"
  | "url"
  | "hidden";

export type FormStatus = "ACTIVE" | "INACTIVE";

export interface FieldValidation {
  minLength?: number;
  maxLength?: number;
  minValue?: number;
  maxValue?: number;
  pattern?: string;
  patternMessage?: string;
}

export interface DropdownOption {
  id: string;
  label: string;
  value: string;
  sortOrder?: number;
}

export type FieldPosition =
  | "top"
  | "bottom"
  | "before"
  | "after"
  | "custom";

export interface FormFieldAssignment {
  module: string;
  existingForm: string;
  section: string;
  position: FieldPosition;
  beforeField?: string;
  afterField?: string;
  customOrder?: number;
}

export interface FormFieldDefinition {
  id: string;
  fieldLabel: string;
  fieldName: string;
  fieldType: FormFieldType;
  placeholder: string;
  required: boolean;
  defaultValue: string;
  validation: FieldValidation;
  options: DropdownOption[];
  helpText: string;
  sortOrder: number;
  status: FormStatus;
  assignment?: FormFieldAssignment;
}

export interface DynamicForm {
  id: string;
  formName: string;
  description: string;
  assignedModules: string[];
  fields: FormFieldDefinition[];
  totalFields: number;
  status: FormStatus;
  createdBy: string;
  createdAt: string;
  updatedAt?: string;
}

export const FIELD_TYPE_LABELS: Record<FormFieldType, string> = {
  text: "Text",
  textarea: "Textarea",
  number: "Number",
  currency: "Currency",
  email: "Email",
  phone: "Phone",
  date: "Date",
  dropdown: "Dropdown",
  radio: "Radio",
  checkbox: "Checkbox",
  switch: "Switch",
  file: "File Upload",
  multiSelect: "Multi Select",
  password: "Password",
  url: "URL",
  hidden: "Hidden Field",
};

export const CRM_MODULES = [
  "Customers",
  "Leads",
  "Deals",
  "Sales",
  "Activities",
  "Employees",
  "Payroll",
  "Attendance",
  "Leave Management",
  "Performance",
  "Marketing",
  "Campaigns",
  "Email Marketing",
  "WhatsApp Marketing",
  "Social Media",
  "Ads",
  "Reports",
] as const;

export type CrmModule = (typeof CRM_MODULES)[number];
