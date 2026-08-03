import { useEffect, useState, useCallback, useMemo } from "react";
import type { FormField } from "@/components/common/DataForm";
import type { FormFieldDefinition } from "../types/dynamicForm";
import { getDynamicExtensionsForForm } from "../services/dynamicFormService";
import { mergeFormFields } from "../utils/mergeFormFields";

interface UseDynamicFormExtensionsResult {
  mergedFields: FormField[];
  dynamicFields: FormFieldDefinition[];
  dynamicCount: number;
  loading: boolean;
  error: string | null;
  refresh: () => void;
}

/**
 * Hook to load active dynamic fields for an existing form and merge them
 * with the static fields. Used by existing Add/Edit form pages.
 *
 * This implements the "configuration-driven" rendering: the existing form page
 * calls this hook once (one-time wiring), and thereafter any new dynamic field
 * created in the Dynamic Form Builder is automatically merged in — no code changes.
 *
 * @param staticFields - The existing static fields array (e.g. customerFields)
 * @param module - The module key (e.g. "Customers")
 * @param formName - The form key/label (e.g. "add-customer" or "Add Customer")
 */
export function useDynamicFormExtensions(
  staticFields: FormField[],
  module: string,
  formName: string
): UseDynamicFormExtensionsResult {
  const [dynamicFields, setDynamicFields] = useState<FormFieldDefinition[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [refreshKey, setRefreshKey] = useState(0);

  const refresh = useCallback(() => {
    setRefreshKey((k) => k + 1);
  }, []);

  useEffect(() => {
    let active = true;
    setLoading(true);
    setError(null);

    getDynamicExtensionsForForm(module, formName)
      .then((fields) => {
        if (!active) return;
        setDynamicFields(fields);
      })
      .catch((err) => {
        if (!active) return;
        setError(err?.message || "Failed to load dynamic fields");
      })
      .finally(() => {
        if (active) setLoading(false);
      });

    return () => {
      active = false;
    };
  }, [module, formName, refreshKey]);

  const mergedFields = useMemo(
    () => mergeFormFields(staticFields, dynamicFields, module, formName),
    [staticFields, dynamicFields, module, formName]
  );

  return {
    mergedFields,
    dynamicFields,
    dynamicCount: dynamicFields.length,
    loading,
    error,
    refresh,
  };
}
