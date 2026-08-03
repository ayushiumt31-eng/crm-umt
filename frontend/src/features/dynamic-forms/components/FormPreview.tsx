import type { FormFieldDefinition } from "../types/dynamicForm";
import { FIELD_TYPE_LABELS } from "../types/dynamicForm";

interface FormPreviewProps {
  fields: FormFieldDefinition[];
  values?: Record<string, string>;
  onChange?: (fieldName: string, value: string) => void;
}

export function FormPreview({ fields = [], values = {}, onChange }: FormPreviewProps) {
  if (fields.length === 0) {
    return (
      <div className="text-center py-8 text-slate-400 dark:text-slate-500">
        <p>Add fields to see a live preview of your form.</p>
      </div>
    );
  }

  const sortedFields = [...fields].sort((a, b) => a.sortOrder - b.sortOrder);

  const renderField = (field: FormFieldDefinition) => {
    const value = values[field.fieldName] || "";
    const setValue = (val: string) => onChange?.(field.fieldName, val);
    const inputClass =
      "w-full px-4 py-3 rounded-xl border border-blue-200 dark:border-blue-900/40 bg-white dark:bg-slate-900 text-slate-900 dark:text-white placeholder-slate-400 font-medium transition-all focus:border-blue-500 focus:ring-2 focus:ring-blue-300 dark:focus:ring-blue-900/40";

    switch (field.fieldType) {
      case "text":
      case "password":
      case "url":
      case "hidden":
        return (
          <input
            type={
              field.fieldType === "password"
                ? "password"
                : field.fieldType === "url"
                ? "url"
                : field.fieldType === "hidden"
                ? "hidden"
                : "text"
            }
            value={value}
            onChange={(e) => setValue(e.target.value)}
            placeholder={field.placeholder}
            className={inputClass}
          />
        );

      case "textarea":
        return (
          <textarea
            value={value}
            onChange={(e) => setValue(e.target.value)}
            placeholder={field.placeholder}
            rows={4}
            className={`${inputClass} resize-none`}
          />
        );

      case "number":
        return (
          <input
            type="number"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            placeholder={field.placeholder}
            min={field.validation.minValue}
            max={field.validation.maxValue}
            className={inputClass}
          />
        );

      case "currency":
        return (
          <div className="relative">
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 dark:text-slate-400 font-semibold">
              $
            </span>
            <input
              type="number"
              value={value}
              onChange={(e) => setValue(e.target.value)}
              placeholder={field.placeholder}
              min={field.validation.minValue}
              max={field.validation.maxValue}
              className={`${inputClass} pl-8`}
            />
          </div>
        );

      case "email":
        return (
          <input
            type="email"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            placeholder={field.placeholder}
            className={inputClass}
          />
        );

      case "phone":
        return (
          <input
            type="tel"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            placeholder={field.placeholder}
            className={inputClass}
          />
        );

      case "date":
        return (
          <input
            type="date"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            className={inputClass}
          />
        );

      case "dropdown":
      case "multiSelect":
        return (
          <select
            value={value}
            onChange={(e) => setValue(e.target.value)}
            className={inputClass}
            multiple={field.fieldType === "multiSelect"}
          >
            <option value="">Select {field.fieldLabel}</option>
            {field.options.map((opt) => (
              <option key={opt.id} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
        );

      case "radio":
        return (
          <div className="space-y-2">
            {field.options.map((opt) => (
              <label key={opt.id} className="flex items-center gap-3 cursor-pointer">
                <input
                  type="radio"
                  name={field.fieldName}
                  value={opt.value}
                  checked={value === opt.value}
                  onChange={(e) => setValue(e.target.value)}
                  className="w-4 h-4 text-blue-600 border-blue-300 focus:ring-blue-500"
                />
                <span className="text-sm text-slate-700 dark:text-slate-300">{opt.label}</span>
              </label>
            ))}
          </div>
        );

      case "checkbox":
        return (
          <div className="space-y-2">
            {field.options.map((opt) => (
              <label key={opt.id} className="flex items-center gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  value={opt.value}
                  checked={value.includes(opt.value)}
                  onChange={(e) => {
                    const currentValues = value ? value.split(",") : [];
                    const newValues = e.target.checked
                      ? [...currentValues, opt.value]
                      : currentValues.filter((v) => v !== opt.value);
                    setValue(newValues.join(","));
                  }}
                  className="w-4 h-4 rounded border-blue-300 text-blue-600 focus:ring-blue-500"
                />
                <span className="text-sm text-slate-700 dark:text-slate-300">{opt.label}</span>
              </label>
            ))}
          </div>
        );

      case "switch":
        return (
          <label className="flex items-center gap-3 cursor-pointer">
            <input
              type="checkbox"
              checked={value === "true"}
              onChange={(e) => setValue(e.target.checked ? "true" : "false")}
              className="w-5 h-5 rounded border-blue-300 text-blue-600 focus:ring-blue-500"
            />
            <span className="text-sm text-slate-600 dark:text-slate-400">
              {value === "true" ? "Enabled" : "Disabled"}
            </span>
          </label>
        );

      case "file":
        return (
          <div className="border-2 border-dashed border-blue-200 dark:border-blue-900/40 rounded-xl p-6 text-center hover:bg-blue-50/50 dark:hover:bg-blue-950/20 transition-colors">
            <input type="file" className="hidden" id={`file-${field.id}`} />
            <label
              htmlFor={`file-${field.id}`}
              className="cursor-pointer text-sm text-blue-600 dark:text-blue-400 font-semibold"
            >
              Click to upload or drag and drop
            </label>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
              {field.helpText || "Upload file"}
            </p>
          </div>
        );

      default:
        return (
          <input
            type="text"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            placeholder={field.placeholder}
            className={inputClass}
          />
        );
    }
  };

  return (
    <div className="space-y-5">
      {sortedFields
        .filter((f) => f.status === "ACTIVE")
        .map((field) => (
          <div key={field.id} className="space-y-1.5">
            <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300">
              {field.fieldLabel}
              {field.required && <span className="text-red-500 ml-1">*</span>}
              <span className="ml-2 text-xs font-normal text-slate-400 dark:text-slate-500">
                ({FIELD_TYPE_LABELS[field.fieldType]})
              </span>
            </label>

            {renderField(field)}

            {field.helpText && (
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">{field.helpText}</p>
            )}
          </div>
        ))}
    </div>
  );
}
