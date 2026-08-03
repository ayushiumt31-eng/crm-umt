import { useState } from "react";
import { Plus, Copy, Edit3, Trash2, GripVertical, Eye } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { FormFieldDefinition } from "../types/dynamicForm";
import { FIELD_TYPE_LABELS } from "../types/dynamicForm";
import { FormFieldEditor } from "./FormFieldEditor";
import { FormPreview } from "./FormPreview";

interface FormBuilderProps {
  fields: FormFieldDefinition[];
  onChange: (fields: FormFieldDefinition[]) => void;
}

const generateId = () => `field-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;

export function FormBuilder({ fields, onChange }: FormBuilderProps) {
  const [editorOpen, setEditorOpen] = useState(false);
  const [editingField, setEditingField] = useState<FormFieldDefinition | null>(null);
  const [previewValues, setPreviewValues] = useState<Record<string, string>>({});
  const [showPreview, setShowPreview] = useState(false);

  const addField = () => {
    setEditingField(null);
    setEditorOpen(true);
  };

  const editField = (field: FormFieldDefinition) => {
    setEditingField(field);
    setEditorOpen(true);
  };

  const handleSaveField = (field: FormFieldDefinition) => {
    if (editingField) {
      onChange(
        fields.map((f) =>
          f.id === editingField.id
            ? { ...field, sortOrder: f.sortOrder }
            : f
        )
      );
    } else {
      onChange([...fields, { ...field, sortOrder: fields.length + 1 }]);
    }
    setEditorOpen(false);
    setEditingField(null);
  };

  const duplicateField = (field: FormFieldDefinition) => {
    const newField: FormFieldDefinition = {
      ...field,
      id: generateId(),
      fieldLabel: `${field.fieldLabel} (Copy)`,
      fieldName: `${field.fieldName}_copy`,
      sortOrder: fields.length + 1,
    };
    onChange([...fields, newField]);
  };

  const removeField = (fieldId: string) => {
    onChange(fields.filter((f) => f.id !== fieldId));
  };

  const moveField = (index: number, direction: "up" | "down") => {
    const target = direction === "up" ? index - 1 : index + 1;
    if (target < 0 || target >= fields.length) return;
    const newFields = [...fields];
    const [moved] = newFields.splice(index, 1);
    newFields.splice(target, 0, moved);
    onChange(newFields.map((f, i) => ({ ...f, sortOrder: i + 1 })));
  };

  const sortedFields = [...fields].sort((a, b) => a.sortOrder - b.sortOrder);

  return (
    <div className="space-y-6">
      {/* Toolbar */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-3">
          <Button onClick={addField} className="gap-2 bg-gradient-to-r from-blue-600 to-cyan-600">
            <Plus className="h-4 w-4" />
            Add Field
          </Button>
          <span className="text-sm text-slate-500 dark:text-slate-400">
            {fields.length} field{fields.length !== 1 ? "s" : ""}
          </span>
        </div>
        <Button
          variant="outline"
          onClick={() => setShowPreview(!showPreview)}
          className="gap-2"
        >
          <Eye className="h-4 w-4" />
          {showPreview ? "Hide Preview" : "Show Preview"}
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Fields List */}
        <div className="space-y-3">
          {sortedFields.length === 0 ? (
            <div className="rounded-2xl border-2 border-dashed border-slate-300 dark:border-slate-600 p-10 text-center">
              <p className="text-slate-500 dark:text-slate-400">
                No fields yet. Click "Add Field" to start building your form.
              </p>
            </div>
          ) : (
            sortedFields.map((field, index) => (
              <div
                key={field.id}
                className="flex items-center gap-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 p-4 shadow-sm"
              >
                <GripVertical className="h-5 w-5 text-slate-400 cursor-grab" />
                <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-slate-100 dark:bg-slate-800 text-sm font-bold text-slate-500 dark:text-slate-400">
                  {index + 1}
                </span>
<div className="flex-1 min-w-0">
                  <p className="font-semibold text-slate-900 dark:text-white truncate">
                    {field.fieldLabel}
                    {field.required && <span className="text-red-500 ml-1">*</span>}
                  </p>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    {FIELD_TYPE_LABELS[field.fieldType]} · {field.fieldName}
                  </p>
                  {field.assignment && (
                    <p className="text-xs text-purple-600 dark:text-purple-400 mt-0.5">
                      → {field.assignment.module} / {field.assignment.existingForm} /{" "}
                      {field.assignment.section} /{" "}
                      <span className="capitalize">{field.assignment.position}</span>
                      {field.assignment.beforeField &&
                        ` · before ${field.assignment.beforeField}`}
                      {field.assignment.afterField &&
                        ` · after ${field.assignment.afterField}`}
                      {field.assignment.customOrder !== undefined &&
                        ` · order ${field.assignment.customOrder}`}
                    </p>
                  )}
                </div>
                <div className="flex items-center gap-1">
                  <button
                    onClick={() => moveField(index, "up")}
                    disabled={index === 0}
                    className="p-1.5 rounded hover:bg-slate-100 dark:hover:bg-slate-800 disabled:opacity-30 text-slate-500"
                    title="Move up"
                  >
                    ↑
                  </button>
                  <button
                    onClick={() => moveField(index, "down")}
                    disabled={index === sortedFields.length - 1}
                    className="p-1.5 rounded hover:bg-slate-100 dark:hover:bg-slate-800 disabled:opacity-30 text-slate-500"
                    title="Move down"
                  >
                    ↓
                  </button>
                  <button
                    onClick={() => duplicateField(field)}
                    className="p-1.5 rounded hover:bg-slate-100 dark:hover:bg-slate-800 text-blue-600"
                    title="Duplicate"
                  >
                    <Copy className="h-4 w-4" />
                  </button>
                  <button
                    onClick={() => editField(field)}
                    className="p-1.5 rounded hover:bg-slate-100 dark:hover:bg-slate-800 text-cyan-600"
                    title="Edit"
                  >
                    <Edit3 className="h-4 w-4" />
                  </button>
                  <button
                    onClick={() => removeField(field.id)}
                    className="p-1.5 rounded hover:bg-red-50 dark:hover:bg-red-900/30 text-red-600"
                    title="Remove"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Preview */}
        {showPreview && (
          <div className="rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 p-6 shadow-sm">
            <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-4">Live Preview</h3>
            <FormPreview
              fields={fields}
              values={previewValues}
              onChange={(name, value) =>
                setPreviewValues((prev) => ({ ...prev, [name]: value }))
              }
            />
          </div>
        )}
      </div>

      <FormFieldEditor
        field={editingField}
        isOpen={editorOpen}
        onClose={() => {
          setEditorOpen(false);
          setEditingField(null);
        }}
        onSave={handleSaveField}
      />
    </div>
  );
}
