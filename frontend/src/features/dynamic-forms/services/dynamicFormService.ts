import type {
  DynamicForm,
  FormFieldDefinition,
} from "../types/dynamicForm";
import { dummyDynamicForms } from "../data/dummy-dynamic-forms";

// In-memory mock database (replace with API calls in future backend integration)
let formStore: DynamicForm[] = [...dummyDynamicForms];

const generateId = (): string =>
  `form-${Date.now().toString(36)}-${Math.random().toString(36).substr(2, 9)}`;

const generateFieldId = (): string =>
  `fld-${Date.now().toString(36)}-${Math.random().toString(36).substr(2, 7)}`;

const simulateDelay = (): Promise<void> =>
  new Promise((resolve) => setTimeout(resolve, 150));

export async function getForms(): Promise<DynamicForm[]> {
  await simulateDelay();
  return [...formStore];
}

export async function getFormById(id: string): Promise<DynamicForm | null> {
  await simulateDelay();
  return formStore.find((form) => form.id === id) || null;
}

export async function createForm(
  formData: Omit<DynamicForm, "id" | "totalFields" | "createdAt" | "createdBy" | "updatedAt">
): Promise<DynamicForm> {
  await simulateDelay();
  const now = new Date().toISOString();
  const newForm: DynamicForm = {
    id: generateId(),
    formName: formData.formName,
    description: formData.description,
    assignedModules: formData.assignedModules,
    fields: formData.fields.map((field, index) => ({
      ...field,
      id: field.id || generateFieldId(),
      sortOrder: index + 1,
    })),
    totalFields: formData.fields.length,
    status: formData.status,
    createdBy: "Admin",
    createdAt: now,
  };
  formStore = [newForm, ...formStore];
  return newForm;
}

export async function updateForm(
  id: string,
  formData: Omit<DynamicForm, "id" | "totalFields" | "createdAt" | "createdBy" | "updatedAt">
): Promise<DynamicForm | null> {
  await simulateDelay();
  const index = formStore.findIndex((form) => form.id === id);
  if (index === -1) return null;

  const existing = formStore[index];
  const updatedForm: DynamicForm = {
    ...existing,
    formName: formData.formName,
    description: formData.description,
    assignedModules: formData.assignedModules,
    fields: formData.fields.map((field, idx) => ({
      ...field,
      id: field.id || generateFieldId(),
      sortOrder: idx + 1,
    })),
    totalFields: formData.fields.length,
    status: formData.status,
    updatedAt: new Date().toISOString(),
  };

  formStore = formStore.map((form) => (form.id === id ? updatedForm : form));
  return updatedForm;
}

export async function duplicateForm(id: string): Promise<DynamicForm | null> {
  await simulateDelay();
  const existing = formStore.find((form) => form.id === id);
  if (!existing) return null;

  const now = new Date().toISOString();
  const duplicatedForm: DynamicForm = {
    ...existing,
    id: generateId(),
    formName: `${existing.formName} (Copy)`,
    fields: existing.fields.map((field) => ({
      ...field,
      id: generateFieldId(),
    })),
    status: "INACTIVE",
    createdBy: "Admin",
    createdAt: now,
    updatedAt: undefined,
  };

  formStore = [duplicatedForm, ...formStore];
  return duplicatedForm;
}

export async function deleteForm(id: string): Promise<void> {
  await simulateDelay();
  formStore = formStore.filter((form) => form.id !== id);
}

export async function activateForm(id: string): Promise<DynamicForm | null> {
  await simulateDelay();
  const index = formStore.findIndex((form) => form.id === id);
  if (index === -1) return null;

  const updatedForm: DynamicForm = {
    ...formStore[index],
    status: "ACTIVE",
    updatedAt: new Date().toISOString(),
  };
  formStore = formStore.map((form) => (form.id === id ? updatedForm : form));
  return updatedForm;
}

export async function deactivateForm(id: string): Promise<DynamicForm | null> {
  await simulateDelay();
  const index = formStore.findIndex((form) => form.id === id);
  if (index === -1) return null;

  const updatedForm: DynamicForm = {
    ...formStore[index],
    status: "INACTIVE",
    updatedAt: new Date().toISOString(),
  };
  formStore = formStore.map((form) => (form.id === id ? updatedForm : form));
  return updatedForm;
}

/**
 * Get all active dynamic fields across all forms.
 * Used by the merge utility to inject dynamic fields into existing forms.
 */
export async function getAllActiveDynamicFields(): Promise<FormFieldDefinition[]> {
  await simulateDelay();
  const allFields: FormFieldDefinition[] = [];
  formStore.forEach((form) => {
    if (form.status !== "ACTIVE") return;
    form.fields.forEach((field) => {
      if (field.status === "ACTIVE") {
        allFields.push(field);
      }
    });
  });
  return allFields;
}

/**
 * Get all active dynamic fields assigned to a specific module + existing form.
 */
export async function getDynamicExtensionsForForm(
  module: string,
  formName: string
): Promise<FormFieldDefinition[]> {
  await simulateDelay();
  const allActive = await getAllActiveDynamicFields();
  return allActive.filter(
    (field) =>
      field.assignment &&
      field.assignment.module === module &&
      (field.assignment.existingForm === formName ||
        field.assignment.existingForm.toLowerCase() === formName.toLowerCase())
  );
}

/**
 * Get all active dynamic fields assigned to a specific module (across all its forms).
 */
export async function getDynamicExtensionsForModule(
  module: string
): Promise<FormFieldDefinition[]> {
  await simulateDelay();
  const allActive = await getAllActiveDynamicFields();
  return allActive.filter(
    (field) => field.assignment && field.assignment.module === module
  );
}
