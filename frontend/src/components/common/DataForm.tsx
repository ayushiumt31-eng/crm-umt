import React, { useState } from "react";
import { Button } from "@/components/ui/button";

export interface FormField {
  name: string;
  label: string;
  type: "text" | "email" | "phone" | "select" | "textarea" | "number";
  placeholder?: string;
  required?: boolean;
  options?: { label: string; value: string }[];
  validation?: (value: any) => string | null;
  fullWidth?: boolean; // For fields that should span full width
  colSpan?: 1 | 2; // Explicit column span control
}

export interface DataFormProps {
  fields: FormField[];
  initialValues?: Record<string, any>;
  loading?: boolean;
  onSubmit: (data: Record<string, any>) => Promise<void>;
  submitLabel?: string;
  title?: string;
  description?: string;
  cancelPath?: string;
  onCancel?: () => void;
}

/**
 * Generic Data Form Component with 2-Column Responsive Layout
 * Usage: <DataForm fields={fields} onSubmit={handleSubmit} />
 */
export function DataForm({
  fields,
  initialValues = {},
  loading = false,
  onSubmit,
  submitLabel = "Submit",
  title,
  description,
  cancelPath,
  onCancel,
}: DataFormProps) {
  const [formData, setFormData] = useState(initialValues);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitting, setSubmitting] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear error on change
    if (errors[name]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    fields.forEach((field) => {
      const value = formData[field.name];

      // Check required
      if (field.required && !value) {
        newErrors[field.name] = `${field.label} is required`;
        return;
      }

      // Custom validation
      if (field.validation && value) {
        const error = field.validation(value);
        if (error) {
          newErrors[field.name] = error;
        }
      }
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    try {
      setSubmitting(true);
      await onSubmit(formData);
    } catch (err) {
      console.error("Form submission error:", err);
    } finally {
      setSubmitting(false);
    }
  };

  // Determine if field should span full width
  const isFullWidth = (field: FormField) => {
    return (
      field.type === "textarea" ||
      field.fullWidth === true ||
      field.colSpan === 2
    );
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {title && (
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
          {title}
        </h2>
      )}
      {description && (
        <p className="text-slate-600 dark:text-slate-400">{description}</p>
      )}

      {/* 2-Column Responsive Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {fields.map((field) => (
          <div
            key={field.name}
            className={`space-y-2 ${
              isFullWidth(field) ? "md:col-span-2" : ""
            }`}
          >
            <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300">
              {field.label}
              {field.required && (
                <span className="text-red-500 ml-1 font-bold">*</span>
              )}
            </label>

            {field.type === "select" ? (
              <select
                name={field.name}
                value={formData[field.name] || ""}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-xl border border-blue-200 dark:border-blue-900/40 bg-white dark:bg-slate-900 text-slate-900 dark:text-white font-medium transition-all focus:border-blue-500 focus:ring-2 focus:ring-blue-300 dark:focus:ring-blue-900/40"
              >
                <option value="">Select {field.label}</option>
                {field.options?.map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </select>
            ) : field.type === "textarea" ? (
              <textarea
                name={field.name}
                value={formData[field.name] || ""}
                onChange={handleChange}
                placeholder={field.placeholder}
                rows={4}
                className="w-full px-4 py-3 rounded-xl border border-blue-200 dark:border-blue-900/40 bg-white dark:bg-slate-900 text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 font-medium transition-all resize-none focus:border-blue-500 focus:ring-2 focus:ring-blue-300 dark:focus:ring-blue-900/40"
              />
            ) : (
              <input
                type={field.type}
                name={field.name}
                value={formData[field.name] || ""}
                onChange={handleChange}
                placeholder={field.placeholder}
                className="w-full px-4 py-3 rounded-xl border border-blue-200 dark:border-blue-900/40 bg-white dark:bg-slate-900 text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 font-medium transition-all focus:border-blue-500 focus:ring-2 focus:ring-blue-300 dark:focus:ring-blue-900/40"
              />
            )}

            {errors[field.name] && (
              <p className="text-red-600 dark:text-red-400 text-sm font-medium">
                ✗ {errors[field.name]}
              </p>
            )}
          </div>
        ))}
      </div>

      {/* Action Buttons - Right Aligned */}
      <div className="flex flex-col sm:flex-row justify-end gap-3 pt-4">
        {(onCancel || cancelPath) && (
          <Button
            type="button"
            variant="outline"
            onClick={onCancel}
            className="px-6 py-2 order-2 sm:order-1"
          >
            Cancel
          </Button>
        )}
        <Button
          type="submit"
          disabled={loading || submitting}
          className="bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 disabled:opacity-50 text-white font-semibold px-6 py-2 rounded-lg transition-all order-1 sm:order-2"
        >
          {submitting ? "Submitting..." : submitLabel}
        </Button>
      </div>
    </form>
  );
}
