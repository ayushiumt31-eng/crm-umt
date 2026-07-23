import type { FormField } from "@/components/common/DataForm";

export const employeeFields: FormField[] = [
  // Employee Information
  {
    name: "employeeId",
    label: "Employee ID",
    type: "text",
    placeholder: "Enter employee ID",
    required: true,
  },

  {
    name: "firstName",
    label: "First Name",
    type: "text",
    placeholder: "Enter first name",
    required: true,
  },

  {
    name: "lastName",
    label: "Last Name",
    type: "text",
    placeholder: "Enter last name",
    required: true,
  },

  // Contact Information
  {
    name: "email",
    label: "Email",
    type: "email",
    placeholder: "Enter email address",
    required: true,
  },

  {
    name: "phone",
    label: "Phone",
    type: "tel",
    placeholder: "Enter phone number",
    required: true,
  },

  // Work Information
  {
    name: "department",
    label: "Department",
    type: "select",
    placeholder: "Select department",
    required: true,
    options: [
      { label: "Engineering", value: "Engineering" },
      { label: "Sales", value: "Sales" },
      { label: "Marketing", value: "Marketing" },
      { label: "Human Resources", value: "Human Resources" },
      { label: "Finance", value: "Finance" },
      { label: "Support", value: "Support" },
      { label: "Design", value: "Design" },
      { label: "Administration", value: "Administration" },
    ],
  },

  {
    name: "designation",
    label: "Designation",
    type: "text",
    placeholder: "Enter designation",
    required: true,
  },

  {
    name: "employmentType",
    label: "Employment Type",
    type: "select",
    placeholder: "Select employment type",
    required: true,
    options: [
      { label: "Full Time", value: "FULL_TIME" },
      { label: "Part Time", value: "PART_TIME" },
      { label: "Contract", value: "CONTRACT" },
      { label: "Intern", value: "INTERN" },
      { label: "Freelance", value: "FREELANCE" },
    ],
  },

  {
    name: "status",
    label: "Status",
    type: "select",
    placeholder: "Select status",
    required: true,
    options: [
      { label: "Active", value: "ACTIVE" },
      { label: "Inactive", value: "INACTIVE" },
      { label: "On Leave", value: "ON_LEAVE" },
      { label: "Terminated", value: "TERMINATED" },
      { label: "Probation", value: "PROBATION" },
    ],
  },

  {
    name: "joiningDate",
    label: "Joining Date",
    type: "date",
    required: true,
  },

  // Work Details
  {
    name: "location",
    label: "Work Location",
    type: "text",
    placeholder: "e.g. Delhi, Remote",
  },

  {
    name: "shift",
    label: "Shift",
    type: "select",
    placeholder: "Select shift",
    options: [
      { label: "Morning", value: "Morning" },
      { label: "Evening", value: "Evening" },
      { label: "Night", value: "Night" },
      { label: "Flexible", value: "Flexible" },
    ],
  },

  // Salary
  {
    name: "salary",
    label: "Salary",
    type: "number",
    placeholder: "Enter salary",
  },

  // Address
  {
    name: "address",
    label: "Address",
    type: "textarea",
    placeholder: "Enter full address",
  },

  {
    name: "city",
    label: "City",
    type: "text",
    placeholder: "Enter city",
  },

  {
    name: "state",
    label: "State",
    type: "text",
    placeholder: "Enter state",
  },

  {
    name: "country",
    label: "Country",
    type: "text",
    placeholder: "Enter country",
  },

  {
    name: "postalCode",
    label: "Postal Code",
    type: "text",
    placeholder: "Enter postal code",
  },

  // Emergency Contact
  {
    name: "emergencyContactName",
    label: "Emergency Contact Name",
    type: "text",
    placeholder: "Enter emergency contact name",
  },

  {
    name: "emergencyContactPhone",
    label: "Emergency Contact Phone",
    type: "tel",
    placeholder: "Enter emergency contact phone",
  },

  {
    name: "emergencyContactRelation",
    label: "Relationship",
    type: "text",
    placeholder: "e.g. Father, Mother, Spouse",
  },
];