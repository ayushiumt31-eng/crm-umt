import { useState, useCallback } from "react";

interface UseFormModalOptions {
  onOpen?: () => void;
  onClose?: () => void;
  onSubmit?: (data: any) => Promise<void> | void;
  initialData?: Record<string, string>;
}

export function useFormModal(options?: UseFormModalOptions) {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState<Record<string, string>>(options?.initialData || {});
  const [errors, setErrors] = useState<Record<string, string>>({});

  const open = useCallback(() => {
    setIsOpen(true);
    // Only reset if no initial data was provided
    if (!options?.initialData) {
      setFormData({});
    }
    setErrors({});
    options?.onOpen?.();
  }, [options]);

  const close = useCallback(() => {
    setIsOpen(false);
    setFormData(options?.initialData || {});
    setErrors({});
    options?.onClose?.();
  }, [options]);

  const updateField = useCallback((fieldId: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [fieldId]: value,
    }));
    // Clear error for this field
    setErrors((prev) => ({
      ...prev,
      [fieldId]: "",
    }));
  }, []);

  const setFieldError = useCallback((fieldId: string, error: string) => {
    setErrors((prev) => ({
      ...prev,
      [fieldId]: error,
    }));
  }, []);

  const submit = useCallback(
    async (onValidate?: (data: Record<string, string>) => Record<string, string>) => {
      setIsLoading(true);
      try {
        // Validate
        if (onValidate) {
          const validationErrors = onValidate(formData);
          if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            setIsLoading(false);
            return;
          }
        }

        // Submit
        await options?.onSubmit?.(formData);
        close();
      } catch (error) {
        console.error("Form submission error:", error);
      } finally {
        setIsLoading(false);
      }
    },
    [formData, options, close]
  );

  const reset = useCallback(() => {
    setFormData(options?.initialData || {});
    setErrors({});
  }, [options]);

  const setFormData_External = useCallback((data: Record<string, string>) => {
    setFormData(data);
  }, []);

  return {
    isOpen,
    open,
    close,
    isLoading,
    formData,
    updateField,
    setFieldError,
    submit,
    reset,
    setFormData: setFormData_External,
    errors,
  };
}
