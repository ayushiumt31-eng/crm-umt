import type { FormField } from "@/components/common/DataForm";

/**
 * Existing Forms Registry
 *
 * This registry describes the STRUCTURE of existing system forms (module → form → section → static field names).
 * It is used by the merge utility to anchor dynamic fields at the correct section/position.
 *
 * The actual field definitions come from the existing feature's field files (e.g. customerFields, employeeFields).
 * This registry primarily maps form + section to the static field names so dynamic fields can be positioned
 * "before" or "after" a specific static field.
 *
 * NOTE: This is configuration-driven. In the future, the backend will return this structure as JSON
 * and the frontend will render purely from config — no code changes required.
 */

export interface ExistingFormSection {
  key: string;
  label: string;
  fieldNames: string[];
}

export interface ExistingFormDefinition {
  key: string;
  label: string;
  sections: ExistingFormSection[];
}

export interface ExistingModuleDefinition {
  key: string;
  label: string;
  forms: ExistingFormDefinition[];
}

export const existingFormsRegistry: ExistingModuleDefinition[] = [
  {
    key: "Customers",
    label: "Customers",
    forms: [
      {
        key: "add-customer",
        label: "Add Customer",
        sections: [
          {
            key: "basic",
            label: "Basic Information",
            fieldNames: ["name", "email", "phone", "alternatePhone", "customerType"],
          },
          {
            key: "company",
            label: "Company Information",
            fieldNames: ["company", "industry", "jobTitle"],
          },
          {
            key: "address",
            label: "Address Information",
            fieldNames: ["address", "city", "state", "country", "postalCode"],
          },
          {
            key: "crm",
            label: "CRM Information",
            fieldNames: ["status", "source", "assignedTo", "category", "priority"],
          },
          {
            key: "additional",
            label: "Additional Information",
            fieldNames: ["notes", "tags"],
          },
        ],
      },
    ],
  },
  {
    key: "Leads",
    label: "Leads",
    forms: [
      {
        key: "add-lead",
        label: "Add Lead",
        sections: [
          { key: "basic", label: "Basic Information", fieldNames: [] },
          { key: "contact", label: "Contact Information", fieldNames: [] },
          { key: "qualification", label: "Qualification", fieldNames: [] },
        ],
      },
    ],
  },
  {
    key: "Deals",
    label: "Deals",
    forms: [
      {
        key: "add-deal",
        label: "Add Deal",
        sections: [
          { key: "basic", label: "Deal Information", fieldNames: [] },
          { key: "value", label: "Value & Stage", fieldNames: [] },
          { key: "people", label: "People & Team", fieldNames: [] },
        ],
      },
    ],
  },
  {
    key: "Sales",
    label: "Sales",
    forms: [
      {
        key: "add-sale",
        label: "Add Sale",
        sections: [
          { key: "basic", label: "Sale Information", fieldNames: [] },
          { key: "payment", label: "Payment Details", fieldNames: [] },
        ],
      },
    ],
  },
  {
    key: "Activities",
    label: "Activities",
    forms: [
      {
        key: "add-activity",
        label: "Add Activity",
        sections: [
          { key: "basic", label: "Activity Information", fieldNames: [] },
          { key: "schedule", label: "Schedule", fieldNames: [] },
        ],
      },
    ],
  },
  {
    key: "Employees",
    label: "Employees",
    forms: [
      {
        key: "add-employee",
        label: "Add Employee",
        sections: [
          {
            key: "basic",
            label: "Employee Information",
            fieldNames: ["employeeId", "firstName", "lastName"],
          },
          {
            key: "contact",
            label: "Contact Information",
            fieldNames: ["email", "phone"],
          },
          {
            key: "work",
            label: "Work Information",
            fieldNames: ["department", "designation", "employmentType", "status", "joiningDate"],
          },
          {
            key: "workDetails",
            label: "Work Details",
            fieldNames: ["location", "shift"],
          },
          {
            key: "salary",
            label: "Salary",
            fieldNames: ["salary"],
          },
          {
            key: "address",
            label: "Address",
            fieldNames: ["address", "city", "state", "country", "postalCode"],
          },
          {
            key: "emergency",
            label: "Emergency Contact",
            fieldNames: ["emergencyContactName", "emergencyContactPhone", "emergencyContactRelation"],
          },
        ],
      },
    ],
  },
  {
    key: "Payroll",
    label: "Payroll",
    forms: [
      {
        key: "add-payroll",
        label: "Payroll Processing",
        sections: [
          { key: "basic", label: "Payroll Information", fieldNames: [] },
          { key: "salary", label: "Salary Details", fieldNames: [] },
          { key: "deductions", label: "Deductions", fieldNames: [] },
        ],
      },
    ],
  },
  {
    key: "Attendance",
    label: "Attendance",
    forms: [
      {
        key: "add-attendance",
        label: "Mark Attendance",
        sections: [
          { key: "basic", label: "Attendance Information", fieldNames: [] },
          { key: "time", label: "Time Details", fieldNames: [] },
        ],
      },
    ],
  },
  {
    key: "Leave Management",
    label: "Leave Management",
    forms: [
      {
        key: "add-leave",
        label: "Request Leave",
        sections: [
          { key: "basic", label: "Leave Information", fieldNames: [] },
          { key: "time", label: "Leave Period", fieldNames: [] },
        ],
      },
    ],
  },
  {
    key: "Performance",
    label: "Performance",
    forms: [
      {
        key: "add-review",
        label: "Performance Review",
        sections: [
          { key: "basic", label: "Review Information", fieldNames: [] },
          { key: "ratings", label: "Ratings", fieldNames: [] },
        ],
      },
    ],
  },
  {
    key: "Marketing",
    label: "Marketing",
    forms: [
      {
        key: "add-campaign",
        label: "Add Campaign",
        sections: [
          { key: "basic", label: "Campaign Information", fieldNames: [] },
          { key: "target", label: "Target Audience", fieldNames: [] },
        ],
      },
    ],
  },
];

/**
 * Helper to get all forms for a given module.
 * Returns empty array if module not found.
 */
export function getFormsForModule(moduleKey: string): ExistingFormDefinition[] {
  const module = existingFormsRegistry.find(
    (m) => m.key === moduleKey || m.label === moduleKey
  );
  return module?.forms || [];
}

/**
 * Helper to get all sections for a given module + form.
 */
export function getSectionsForForm(
  moduleKey: string,
  formKey: string
): ExistingFormSection[] {
  const forms = getFormsForModule(moduleKey);
  const form = forms.find((f) => f.key === formKey || f.label === formKey);
  return form?.sections || [];
}

/**
 * Helper to get all static field names for a given module + form + section.
 */
export function getFieldsForSection(
  moduleKey: string,
  formKey: string,
  sectionKey: string
): string[] {
  const sections = getSectionsForForm(moduleKey, formKey);
  const section = sections.find((s) => s.key === sectionKey || s.label === sectionKey);
  return section?.fieldNames || [];
}

/**
 * Get the full module label for a module key.
 */
export function getModuleLabel(moduleKey: string): string {
  return (
    existingFormsRegistry.find((m) => m.key === moduleKey)?.label || moduleKey
  );
}
