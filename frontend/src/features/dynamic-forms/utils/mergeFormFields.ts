import type { FormField } from "@/components/common/DataForm";
import type {
  FormFieldAssignment,
  FormFieldDefinition,
} from "../types/dynamicForm";

/**
 * Merge Utility
 *
 * Combines existing static form fields with dynamic fields created via the Dynamic Form Builder.
 * The result is a single ordered FormField[] array that can be passed directly to DataForm.
 *
 * This is COMPLETELY configuration-driven. No frontend code changes are required when an
 * admin creates/updates/deletes dynamic fields — the merge utility reads the assignment config
 * and re-orders/re-slices the fields automatically.
 *
 * In the future, the backend will return dynamic field definitions as JSON, and this same
 * utility will render them automatically without any code changes.
 */

/**
 * Convert a dynamic field definition to a DataForm-compatible FormField.
 */
function toFormField(field: FormFieldDefinition): FormField {
  const baseType = getBaseInputType(field.fieldType);

  return {
    name: field.fieldName,
    label: field.fieldLabel,
    type: baseType,
    placeholder: field.placeholder || undefined,
    required: field.required,
    options:
      field.options && field.options.length > 0
        ? field.options.map((o) => ({ label: o.label, value: o.value }))
        : undefined,
    fullWidth: field.fieldType === "textarea" || field.fieldType === "hidden",
    validation: buildValidation(field),
  };
}

/**
 * Map a dynamic field type to a DataForm base input type.
 * DataForm supports: text | email | phone | select | textarea | number
 */
function getBaseInputType(
  fieldType: FormFieldDefinition["fieldType"]
): FormField["type"] {
  switch (fieldType) {
    case "email":
      return "email";
    case "phone":
      return "phone";
    case "textarea":
      return "textarea";
    case "number":
    case "currency":
      return "number";
    case "dropdown":
    case "radio":
    case "multiSelect":
      return "select";
    case "date":
    case "password":
    case "url":
    case "text":
    case "file":
    case "checkbox":
    case "switch":
    case "hidden":
    default:
      return "text";
  }
}

/**
 * Build a DataForm validation function from the dynamic field validation config.
 */
function buildValidation(
  field: FormFieldDefinition
): ((value: any) => string | null) | undefined {
  const { validation, required } = field;
  const hasRules =
    validation?.minLength !== undefined ||
    validation?.maxLength !== undefined ||
    validation?.minValue !== undefined ||
    validation?.maxValue !== undefined ||
    validation?.pattern !== undefined;

  if (!hasRules) return undefined;

  return (value: any) => {
    const str = value == null ? "" : String(value);
    const num = Number(value);

    if (validation?.minLength !== undefined && str.length < validation.minLength) {
      return `${field.fieldLabel} must be at least ${validation.minLength} characters`;
    }
    if (validation?.maxLength !== undefined && str.length > validation.maxLength) {
      return `${field.fieldLabel} must not exceed ${validation.maxLength} characters`;
    }
    if (validation?.minValue !== undefined && !isNaN(num) && num < validation.minValue) {
      return `${field.fieldLabel} must be at least ${validation.minValue}`;
    }
    if (validation?.maxValue !== undefined && !isNaN(num) && num > validation.maxValue) {
      return `${field.fieldLabel} must not exceed ${validation.maxValue}`;
    }
    if (validation?.pattern && !new RegExp(validation.pattern).test(str)) {
      return validation.patternMessage || `${field.fieldLabel} is invalid`;
    }

    return null;
  };
}

/**
 * Merge dynamic fields into a static field list.
 *
 * @param staticFields - The existing static fields (e.g. customerFields)
 * @param dynamicFields - The active dynamic fields assigned to this form
 * @param module - The module key (e.g. "Customers")
 * @param formName - The form key/label (e.g. "add-customer" or "Add Customer")
 * @returns Merged FormField[] sorted by position rules
 */
export function mergeFormFields(
  staticFields: FormField[],
  dynamicFields: FormFieldDefinition[],
  module: string,
  formName: string
): FormField[] {
  // Filter dynamic fields assigned to this module + form and active
  const activeExts = dynamicFields.filter(
    (f) =>
      f.status === "ACTIVE" &&
      f.assignment &&
      f.assignment.module === module &&
      (f.assignment.existingForm === formName ||
        f.assignment.existingForm.toLowerCase() === formName.toLowerCase())
  );

  if (activeExts.length === 0) {
    return staticFields;
  }

  // Convert dynamic fields to FormField
  const dynamicFormFields = activeExts.map((f) => ({
    def: f,
    field: toFormField(f),
  }));

  // Build a mutable copy of static fields
  const staticEntries = staticFields.map((f) => ({
    name: f.name,
    field: f,
    isDynamic: false as const,
  }));

  // Sort dynamic fields by their position rules
  const byPosition = (a: (typeof dynamicFormFields)[number], b: (typeof dynamicFormFields)[number]) => {
    const pos = (x: (typeof dynamicFormFields)[number]) => x.def.assignment?.position || "bottom";
    const order: Record<string, number> = { top: 0, before: 1, after: 2, custom: 3, bottom: 4 };
    return order[pos(a)] - order[pos(b)];
  };

  const sortedDynamic = [...dynamicFormFields].sort(byPosition);

  // Group dynamic fields into buckets
  const topFields: FormField[] = [];
  const bottomFields: FormField[] = [];
  const beforeFields: Record<string, FormField[]> = {};
  const afterFields: Record<string, FormField[]> = {};
  const customFields: FormField[] = [];

  dynamicFormFields.forEach(({ def, field }) => {
    const pos = def.assignment?.position;
    if (pos === "top") {
      topFields.push(field);
    } else if (pos === "bottom") {
      bottomFields.push(field);
    } else if (pos === "before" && def.assignment?.beforeField) {
      const key = def.assignment.beforeField;
      if (!beforeFields[key]) beforeFields[key] = [];
      beforeFields[key].push(field);
    } else if (pos === "after" && def.assignment?.afterField) {
      const key = def.assignment.afterField;
      if (!afterFields[key]) afterFields[key] = [];
      afterFields[key].push(field);
    } else if (pos === "custom") {
      customFields.push(field);
    } else {
      bottomFields.push(field);
    }
  });

  // Sort custom fields by customOrder
  customFields.sort((a, b) => {
    const getOrder = (f: FormField) => {
      const entry = dynamicFormFields.find((d) => d.field.name === f.name);
      return entry?.def.assignment?.customOrder ?? Number.MAX_SAFE_INTEGER;
    };
    return getOrder(a) - getOrder(b);
  });

  // Build final merged list
  const merged: FormField[] = [];

  // Top fields first
  merged.push(...topFields);

  // Then iterate static fields, injecting before/after where configured
  staticEntries.forEach(({ name, field }) => {
    if (beforeFields[name]) {
      merged.push(...beforeFields[name]);
    }
    merged.push(field);
    if (afterFields[name]) {
      merged.push(...afterFields[name]);
    }
  });

  // Custom fields (inserted after static fields, before bottom)
  merged.push(...customFields);

  // Bottom fields last
  merged.push(...bottomFields);

  return merged;
}

/**
 * Convenience wrapper that returns both the merged fields and the raw dynamic definitions.
 * Useful for components that need to render dynamic fields separately.
 */
export function mergeFormFieldsWithMeta(
  staticFields: FormField[],
  dynamicFields: FormFieldDefinition[],
  module: string,
  formName: string
): { fields: FormField[]; dynamicCount: number } {
  const fields = mergeFormFields(staticFields, dynamicFields, module, formName);
  const dynamicCount = dynamicFields.filter(
    (f) =>
      f.status === "ACTIVE" &&
      f.assignment &&
      f.assignment.module === module &&
      (f.assignment.existingForm === formName ||
        f.assignment.existingForm.toLowerCase() === formName.toLowerCase())
  ).length;
  return { fields, dynamicCount };
}
