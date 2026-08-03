import { useState } from "react";
import { X, Plus, Trash2, GripVertical } from "lucide-react";
import { Button } from "@/components/ui/button";
import type {
  FormFieldDefinition,
  FormFieldType,
  DropdownOption,
  FieldPosition,
  FormFieldAssignment,
} from "../types/dynamicForm";
import { FIELD_TYPE_LABELS } from "../types/dynamicForm";
import {
  existingFormsRegistry,
  getFormsForModule,
  getSectionsForForm,
  getFieldsForSection,
} from "../data/existingFormsRegistry";

interface FormFieldEditorProps {
  field: FormFieldDefinition | null;
  onSave: (field: FormFieldDefinition) => void;
  onClose: () => void;
  isOpen: boolean;
}

const FIELD_TYPES: FormFieldType[] = [
  "text",
  "textarea",
  "number",
  "currency",
  "email",
  "phone",
  "date",
  "dropdown",
  "radio",
  "checkbox",
  "switch",
  "file",
  "multiSelect",
  "password",
  "url",
  "hidden",
];

const POSITIONS: { value: FieldPosition; label: string }[] = [
  { value: "top", label: "Top" },
  { value: "bottom", label: "Bottom" },
  { value: "before", label: "Before Field" },
  { value: "after", label: "After Field" },
  { value: "custom", label: "Custom Order" },
];

const generateId = () =>
  `field-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;

const createEmptyField = (): FormFieldDefinition => ({
  id: generateId(),
  fieldLabel: "",
  fieldName: "",
  fieldType: "text",
  placeholder: "",
  required: false,
  defaultValue: "",
  validation: {},
  helpText: "",
  sortOrder: 0,
  status: "ACTIVE",
  options: [],
});

export function FormFieldEditor({
  field,
  onSave,
  onClose,
  isOpen,
}: FormFieldEditorProps) {
  const [editField, setEditField] = useState<FormFieldDefinition>(
    field ?? createEmptyField()
  );
  const [newOptionLabel, setNewOptionLabel] = useState("");
  const [newOptionValue, setNewOptionValue] = useState("");

  const hasOptions = ["dropdown", "radio", "checkbox", "multiSelect"].includes(
    editField.fieldType
  );

  // Assignment-derived values
  const assignment = editField.assignment;
  const selectedModule = assignment?.module || "";
  const selectedForm = assignment?.existingForm || "";
  const selectedSection = assignment?.section || "";
  const selectedPosition = assignment?.position || "bottom";

  const moduleOptions = existingFormsRegistry.map((m) => ({
    value: m.key,
    label: m.label,
  }));

  const formOptions = getFormsForModule(selectedModule).map((f) => ({
    value: f.key,
    label: f.label,
  }));

  const sectionOptions = getSectionsForForm(selectedModule, selectedForm).map(
    (s) => ({ value: s.key, label: s.label })
  );

  const fieldOptions = getFieldsForSection(
    selectedModule,
    selectedForm,
    selectedSection
  ).map((fieldName) => ({ value: fieldName, label: fieldName }));

  const updateAssignment = (patch: Partial<FormFieldAssignment>) => {
    setEditField({
      ...editField,
      assignment: {
        module: selectedModule,
        existingForm: selectedForm,
        section: selectedSection,
        position: selectedPosition,
        beforeField: assignment?.beforeField,
        afterField: assignment?.afterField,
        customOrder: assignment?.customOrder,
        ...patch,
      },
    });
  };

  const addOption = () => {
    if (!newOptionLabel.trim() || !newOptionValue.trim()) return;
    const newOption: DropdownOption = {
      id: `opt-${Date.now()}`,
      label: newOptionLabel.trim(),
      value: newOptionValue.trim().toUpperCase().replace(/ /g, "_"),
    };
    setEditField({ ...editField, options: [...editField.options, newOption] });
    setNewOptionLabel("");
    setNewOptionValue("");
  };

  const removeOption = (optionId: string) => {
    setEditField({
      ...editField,
      options: editField.options.filter((o) => o.id !== optionId),
    });
  };

  const handleSave = () => {
    if (!editField.fieldLabel.trim() || !editField.fieldName.trim()) return;
    onSave(editField);
  };

  if (!isOpen) return null;

  const inputClass =
    "w-full px-4 py-3 rounded-xl border border-blue-200 dark:border-blue-900/40 bg-white dark:bg-slate-900 text-slate-900 dark:text-white placeholder-slate-400 font-medium transition-all focus:border-blue-500 focus:ring-2 focus:ring-blue-300 dark:focus:ring-blue-900/40";
  const labelClass =
    "block text-sm font-semibold text-slate-700 dark:text-slate-300";

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 animate-in fade-in duration-200 overflow-y-auto">
      <div className="w-full max-w-2xl my-8 animate-in zoom-in-95 slide-in-from-bottom-4 duration-200">
        <div className="rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 shadow-2xl max-h-[90vh] flex flex-col overflow-hidden">
          <div className="border-b border-slate-200 dark:border-slate-700 bg-gradient-to-r from-blue-50 to-cyan-50 dark:from-slate-900 dark:to-slate-800 px-6 py-4 flex items-center justify-between shrink-0">
            <h2 className="text-xl font-bold text-slate-900 dark:text-white">
              {field ? "Edit Field" : "Add Field"}
            </h2>
            <button
              onClick={onClose}
              className="p-1 rounded-lg hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
            >
              <X className="h-5 w-5 text-slate-500" />
            </button>
          </div>

          <div className="overflow-y-auto flex-1 p-6 space-y-6">
            {/* Label + Name */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className={labelClass}>
                  Field Label <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={editField.fieldLabel}
                  onChange={(e) => {
                    const label = e.target.value;
                    const name = label
                      .toLowerCase()
                      .replace(/[^a-z0-9]/g, "_");
                    setEditField({
                      ...editField,
                      fieldLabel: label,
                      fieldName: name,
                    });
                  }}
                  placeholder="Enter field label"
                  className={inputClass}
                />
              </div>
              <div className="space-y-2">
                <label className={labelClass}>
                  Field Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={editField.fieldName}
                  onChange={(e) =>
                    setEditField({ ...editField, fieldName: e.target.value })
                  }
                  placeholder="field_name"
                  className={inputClass}
                />
              </div>
            </div>

            {/* Field Type */}
            <div className="space-y-2">
              <label className={labelClass}>
                Field Type <span className="text-red-500">*</span>
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {FIELD_TYPES.map((type) => (
                  <button
                    key={type}
                    type="button"
                    onClick={() =>
                      setEditField({ ...editField, fieldType: type })
                    }
                    className={`px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                      editField.fieldType === type
                        ? "bg-blue-600 text-white shadow-md"
                        : "bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700"
                    }`}
                  >
                    {FIELD_TYPE_LABELS[type]}
                  </button>
                ))}
              </div>
            </div>

            {/* Placeholder + Default */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className={labelClass}>Placeholder</label>
                <input
                  type="text"
                  value={editField.placeholder}
                  onChange={(e) =>
                    setEditField({
                      ...editField,
                      placeholder: e.target.value,
                    })
                  }
                  placeholder="Placeholder text"
                  className={inputClass}
                />
              </div>
              <div className="space-y-2">
                <label className={labelClass}>Default Value</label>
                <input
                  type="text"
                  value={editField.defaultValue}
                  onChange={(e) =>
                    setEditField({
                      ...editField,
                      defaultValue: e.target.value,
                    })
                  }
                  placeholder="Default value"
                  className={inputClass}
                />
              </div>
            </div>

            {/* Required + Status */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className={labelClass}>Required</label>
                <label className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={editField.required}
                    onChange={(e) =>
                      setEditField({
                        ...editField,
                        required: e.target.checked,
                      })
                    }
                    className="w-5 h-5 rounded border-blue-300 text-blue-600 focus:ring-blue-500"
                  />
                  <span className="text-sm text-slate-600 dark:text-slate-400">
                    {editField.required
                      ? "This field is required"
                      : "Optional field"}
                  </span>
                </label>
              </div>
              <div className="space-y-2">
                <label className={labelClass}>Status</label>
                <select
                  value={editField.status}
                  onChange={(e) =>
                    setEditField({
                      ...editField,
                      status: e.target.value as "ACTIVE" | "INACTIVE",
                    })
                  }
                  className={inputClass}
                >
                  <option value="ACTIVE">Active</option>
                  <option value="INACTIVE">Inactive</option>
                </select>
              </div>
            </div>

            {/* Assignment to Existing Form */}
            <div className="space-y-3 rounded-xl border border-purple-200 dark:border-purple-900/40 p-4">
              <div>
                <label className={labelClass}>
                  Assign to Existing Form
                </label>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                  Select the module, form, section and position where this
                  dynamic field should appear.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className={labelClass}>Module</label>
                  <select
                    value={selectedModule}
                    onChange={(e) =>
                      updateAssignment({ module: e.target.value })
                    }
                    className={inputClass}
                  >
                    <option value="">Select Module</option>
                    {moduleOptions.map((m) => (
                      <option key={m.value} value={m.value}>
                        {m.label}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="space-y-2">
                  <label className={labelClass}>Existing Form</label>
                  <select
                    value={selectedForm}
                    onChange={(e) =>
                      updateAssignment({ existingForm: e.target.value })
                    }
                    className={inputClass}
                    disabled={!selectedModule}
                  >
                    <option value="">Select Form</option>
                    {formOptions.map((f) => (
                      <option key={f.value} value={f.value}>
                        {f.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className={labelClass}>Section</label>
                  <select
                    value={selectedSection}
                    onChange={(e) =>
                      updateAssignment({ section: e.target.value })
                    }
                    className={inputClass}
                    disabled={!selectedForm}
                  >
                    <option value="">Select Section</option>
                    {sectionOptions.map((s) => (
                      <option key={s.value} value={s.value}>
                        {s.label}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="space-y-2">
                  <label className={labelClass}>Position</label>
                  <select
                    value={selectedPosition}
                    onChange={(e) =>
                      updateAssignment({
                        position: e.target.value as FieldPosition,
                      })
                    }
                    className={inputClass}
                  >
                    {POSITIONS.map((p) => (
                      <option key={p.value} value={p.value}>
                        {p.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {(selectedPosition === "before" ||
                selectedPosition === "after") && (
                <div className="space-y-2">
                  <label className={labelClass}>
                    {selectedPosition === "before"
                      ? "Before Field"
                      : "After Field"}
                  </label>
                  <select
                    value={
                      selectedPosition === "before"
                        ? assignment?.beforeField || ""
                        : assignment?.afterField || ""
                    }
                    onChange={(e) =>
                      updateAssignment(
                        selectedPosition === "before"
                          ? { beforeField: e.target.value }
                          : { afterField: e.target.value }
                      )
                    }
                    className={inputClass}
                    disabled={fieldOptions.length === 0}
                  >
                    <option value="">Select Field</option>
                    {fieldOptions.map((f) => (
                      <option key={f.value} value={f.value}>
                        {f.label}
                      </option>
                    ))}
                  </select>
                </div>
              )}

              {selectedPosition === "custom" && (
                <div className="space-y-2">
                  <label className={labelClass}>Custom Order</label>
                  <input
                    type="number"
                    value={assignment?.customOrder ?? ""}
                    onChange={(e) =>
                      updateAssignment({
                        customOrder: e.target.value
                          ? Number(e.target.value)
                          : undefined,
                      })
                    }
                    placeholder="Custom order number"
                    className={inputClass}
                  />
                </div>
              )}
            </div>

            {/* Validation */}
            <div className="space-y-2">
              <label className={labelClass}>Validation</label>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                <div className="space-y-1">
                  <label className="block text-xs text-slate-500 dark:text-slate-400">
                    Min Length
                  </label>
                  <input
                    type="number"
                    value={editField.validation.minLength ?? ""}
                    onChange={(e) =>
                      setEditField({
                        ...editField,
                        validation: {
                          ...editField.validation,
                          minLength: e.target.value
                            ? Number(e.target.value)
                            : undefined,
                        },
                      })
                    }
                    placeholder="Min"
                    className="w-full px-3 py-2 rounded-lg border border-blue-200 dark:border-blue-900/40 bg-white dark:bg-slate-900 text-slate-900 dark:text-white text-sm"
                  />
                </div>
                <div className="space-y-1">
                  <label className="block text-xs text-slate-500 dark:text-slate-400">
                    Max Length
                  </label>
                  <input
                    type="number"
                    value={editField.validation.maxLength ?? ""}
                    onChange={(e) =>
                      setEditField({
                        ...editField,
                        validation: {
                          ...editField.validation,
                          maxLength: e.target.value
                            ? Number(e.target.value)
                            : undefined,
                        },
                      })
                    }
                    placeholder="Max"
                    className="w-full px-3 py-2 rounded-lg border border-blue-200 dark:border-blue-900/40 bg-white dark:bg-slate-900 text-slate-900 dark:text-white text-sm"
                  />
                </div>
                <div className="space-y-1">
                  <label className="block text-xs text-slate-500 dark:text-slate-400">
                    Min Value
                  </label>
                  <input
                    type="number"
                    value={editField.validation.minValue ?? ""}
                    onChange={(e) =>
                      setEditField({
                        ...editField,
                        validation: {
                          ...editField.validation,
                          minValue: e.target.value
                            ? Number(e.target.value)
                            : undefined,
                        },
                      })
                    }
                    placeholder="Min"
                    className="w-full px-3 py-2 rounded-lg border border-blue-200 dark:border-blue-900/40 bg-white dark:bg-slate-900 text-slate-900 dark:text-white text-sm"
                  />
                </div>
                <div className="space-y-1">
                  <label className="block text-xs text-slate-500 dark:text-slate-400">
                    Max Value
                  </label>
                  <input
                    type="number"
                    value={editField.validation.maxValue ?? ""}
                    onChange={(e) =>
                      setEditField({
                        ...editField,
                        validation: {
                          ...editField.validation,
                          maxValue: e.target.value
                            ? Number(e.target.value)
                            : undefined,
                        },
                      })
                    }
                    placeholder="Max"
                    className="w-full px-3 py-2 rounded-lg border border-blue-200 dark:border-blue-900/40 bg-white dark:bg-slate-900 text-slate-900 dark:text-white text-sm"
                  />
                </div>
              </div>
            </div>

            {/* Help Text */}
            <div className="space-y-2">
              <label className={labelClass}>Help Text</label>
              <textarea
                value={editField.helpText}
                onChange={(e) =>
                  setEditField({ ...editField, helpText: e.target.value })
                }
                placeholder="Help text to display below the field"
                rows={2}
                className={`${inputClass} resize-none`}
              />
            </div>

            {/* Options */}
            {hasOptions && (
              <div className="space-y-3 rounded-xl border border-blue-200 dark:border-blue-900/40 p-4">
                <label className={labelClass}>Options</label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={newOptionLabel}
                    onChange={(e) => setNewOptionLabel(e.target.value)}
                    placeholder="Label (e.g., Male)"
                    className="flex-1 px-4 py-2 rounded-lg border border-blue-200 dark:border-blue-900/40 bg-white dark:bg-slate-900 text-slate-900 dark:text-white text-sm"
                  />
                  <input
                    type="text"
                    value={newOptionValue}
                    onChange={(e) => setNewOptionValue(e.target.value)}
                    placeholder="Value (e.g., MALE)"
                    className="flex-1 px-4 py-2 rounded-lg border border-blue-200 dark:border-blue-900/40 bg-white dark:bg-slate-900 text-slate-900 dark:text-white text-sm"
                  />
                  <Button
                    type="button"
                    onClick={addOption}
                    size="sm"
                    className="gap-1"
                  >
                    <Plus className="h-4 w-4" />
                    Add
                  </Button>
                </div>
                {editField.options.length === 0 ? (
                  <p className="text-sm text-slate-500 dark:text-slate-400">
                    No options added yet.
                  </p>
                ) : (
                  <div className="space-y-2 max-h-48 overflow-y-auto">
                    {editField.options.map((option) => (
                      <div
                        key={option.id}
                        className="flex items-center gap-2 rounded-lg bg-slate-50 dark:bg-slate-800 p-2"
                      >
                        <GripVertical className="h-4 w-4 text-slate-400 cursor-grab" />
                        <span className="flex-1 text-sm font-medium text-slate-700 dark:text-slate-300">
                          {option.label}
                        </span>
                        <span className="text-xs text-slate-500 dark:text-slate-400 font-mono">
                          {option.value}
                        </span>
                        <button
                          onClick={() => removeOption(option.id)}
                          className="p-1 rounded hover:bg-red-50 dark:hover:bg-red-900/30 text-red-500"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>

          <div className="border-t border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/50 px-6 py-4 flex gap-3 justify-end shrink-0">
            <Button variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button
              onClick={handleSave}
              disabled={
                !editField.fieldLabel.trim() || !editField.fieldName.trim()
              }
              className="bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700"
            >
              {field ? "Update Field" : "Add Field"}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
