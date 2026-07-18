export interface FormField {
  id: string;
  label: string;
  type: "text" | "email" | "tel" | "textarea" | "select";
  placeholder?: string;
  required?: boolean;
  options?: Array<{ value: string; label: string }>;
  helper?: string;
  error?: string;
  value?: string;
  onChange?: (value: string) => void;
}

interface FormFieldComponentProps {
  field: FormField;
}

export function FormField({ field }: FormFieldComponentProps) {
  return (
    <div>
      <label className="flex items-center gap-2 text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2.5">
        {field.label}
        {field.required && <span className="text-red-500 font-bold">*</span>}
      </label>

      {field.type === "textarea" ? (
        <textarea
          id={field.id}
          placeholder={field.placeholder}
          value={field.value || ""}
          onChange={(e) => field.onChange?.(e.target.value)}
          className="w-full px-4 py-3 rounded-xl border border-blue-200 bg-white text-slate-900 placeholder-slate-400 font-medium transition-all resize-none focus:border-blue-500 focus:ring-2 focus:ring-blue-300 dark:border-blue-900/40 dark:bg-slate-900 dark:text-white dark:placeholder-slate-500 dark:focus:ring-blue-900/40"
          rows={4}
        />
      ) : field.type === "select" ? (
        <select
          id={field.id}
          value={field.value || ""}
          onChange={(e) => field.onChange?.(e.target.value)}
          className="w-full px-4 py-3 rounded-xl border border-blue-200 bg-white text-slate-900 font-medium transition-all cursor-pointer focus:border-blue-500 focus:ring-2 focus:ring-blue-300 dark:border-blue-900/40 dark:bg-slate-900 dark:text-white dark:focus:ring-blue-900/40"
        >
          <option value="">Select an option</option>
          {field.options?.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
      ) : (
        <input
          id={field.id}
          type={field.type}
          placeholder={field.placeholder}
          value={field.value || ""}
          onChange={(e) => field.onChange?.(e.target.value)}
          className="w-full px-4 py-3 rounded-xl border border-blue-200 bg-white text-slate-900 placeholder-slate-400 font-medium transition-all focus:border-blue-500 focus:ring-2 focus:ring-blue-300 dark:border-blue-900/40 dark:bg-slate-900 dark:text-white dark:placeholder-slate-500 dark:focus:ring-blue-900/40"
        />
      )}

      {field.helper && !field.error && (
        <p className="text-xs text-slate-500 dark:text-slate-400 mt-2.5 font-medium">
          💡 {field.helper}
        </p>
      )}

      {field.error && (
        <p className="text-sm text-red-600 dark:text-red-400 mt-2 font-medium">
          ✗ {field.error}
        </p>
      )}
    </div>
  );
}
