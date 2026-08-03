import { useMemo, useState } from "react";
import { Form } from "@/components/common/Form";
import type { FormField } from "@/components/common/DataForm";
import { useDynamicFormExtensions } from "../hooks/useDynamicFormExtensions";

interface DynamicFormWrapperProps {
  title: string;
  description: string;
  fields: FormField[];
  initialValues?: Record<string, any>;
  onSubmit: (data: Record<string, any>) => Promise<void>;
  submitLabel?: string;
  cancelPath: string;
  isLoading?: boolean;
  showSuccess?: boolean;
  successMessage?: string;
  successSubMessage?: string;
  module: string;
  formName: string;
}

/**
 * DynamicFormWrapper
 *
 * Wraps the existing common `Form` component and injects dynamic fields created
 * via the Dynamic Form Builder. This is the single integration point for existing
 * form pages.
 *
 * How it works:
 *  1. Loads active dynamic fields assigned to (module, formName)
 *  2. Merges them with the static `fields` using `mergeFormFields`
 *  3. Passes the merged array to the existing `Form` component
 *
 * Because the merge is configuration-driven, any new dynamic field created in the
 * builder auto-appears at its configured position (Top / Before X / After X /
 * Custom / Bottom) without any further code changes.
 *
 * In the future, the backend will return merged field JSON and this wrapper will
 * render it the same way.
 */
export function DynamicFormWrapper({
  title,
  description,
  fields,
  initialValues = {},
  onSubmit,
  submitLabel = "Submit",
  cancelPath,
  isLoading = false,
  showSuccess = false,
  successMessage = "Success!",
  successSubMessage = "Redirecting...",
  module,
  formName,
}: DynamicFormWrapperProps) {
  const { mergedFields, loading, error } = useDynamicFormExtensions(
    fields,
    module,
    formName
  );

  const [dynamicValues, setDynamicValues] = useState<Record<string, string>>({});

  const allInitialValues = useMemo(
    () => ({ ...initialValues, ...dynamicValues }),
    [initialValues, dynamicValues]
  );

  const handleSubmit = async (data: Record<string, any>) => {
    await onSubmit({ ...data, ...dynamicValues });
  };

  if (error) {
    console.error(
      `[DynamicForm] Failed to load dynamic fields for ${module}/${formName}:`,
      error
    );
  }

  return (
    <Form
      title={title}
      description={description}
      fields={mergedFields}
      initialValues={allInitialValues}
      onSubmit={handleSubmit}
      submitLabel={submitLabel}
      cancelPath={cancelPath}
      isLoading={isLoading || loading}
      showSuccess={showSuccess}
      successMessage={successMessage}
      successSubMessage={successSubMessage}
    />
  );
}

export default DynamicFormWrapper;
