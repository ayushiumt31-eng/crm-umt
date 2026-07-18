import type { ReactNode } from "react";
import { FormField } from "./FormField";
import type { FormField as FormFieldType } from "./FormField";

interface FormRendererProps {
  fields: FormFieldType[];
  sections?: Array<{
    title: string;
    description?: string;
    icon?: ReactNode;
    fields: string[]; // Field IDs
  }>;
  children?: ReactNode;
}

export function FormRenderer({ fields, sections, children }: FormRendererProps) {
  const fieldMap = new Map(fields.map((f) => [f.id, f]));

  if (!sections) {
    return (
      <div className="space-y-4">
        {fields.map((field) => (
          <FormField key={field.id} field={field} />
        ))}
        {children}
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {sections.map((section, idx) => (
        <div
          key={idx}
          className="rounded-2xl border border-blue-200/50 bg-gradient-to-br from-blue-50/80 via-blue-50/50 to-cyan-50/80 p-8 shadow-sm hover:shadow-md transition-all dark:border-blue-900/30 dark:from-blue-950/30 dark:via-blue-950/20 dark:to-cyan-950/30"
        >
          <div className="flex items-center gap-4 mb-8">
            {section.icon && <div className="flex-shrink-0">{section.icon}</div>}
            <div>
              <h3 className="text-xl font-bold bg-gradient-to-r from-blue-600 to-cyan-600 dark:from-blue-400 dark:to-cyan-400 bg-clip-text text-transparent">
                {section.title}
              </h3>
              {section.description && (
                <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
                  {section.description}
                </p>
              )}
            </div>
          </div>

          <div className="space-y-5">
            {section.fields
              .map((fieldId) => fieldMap.get(fieldId))
              .filter(Boolean)
              .map((field) => (
                <FormField key={field!.id} field={field!} />
              ))}
          </div>
        </div>
      ))}
      {children}
    </div>
  );
}
