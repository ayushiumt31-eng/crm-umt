import { FileText, Layers, Package, User, Calendar, Clock } from "lucide-react";
import type { DynamicForm } from "../types/dynamicForm";
import { FIELD_TYPE_LABELS } from "../types/dynamicForm";
import { DynamicFormStatusBadge } from "./DynamicFormStatusBadge";

interface DynamicFormDetailsCardProps {
  icon: React.ReactNode;
  label: string;
  value: string | number;
  colorClass: string;
  subValue?: string;
}

function DetailsCard({ icon, label, value, colorClass, subValue }: DynamicFormDetailsCardProps) {
  return (
    <div
      className={`group relative overflow-hidden rounded-xl border border-opacity-50 bg-gradient-to-br ${colorClass} p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg`}
    >
      <div className="absolute inset-0 bg-white opacity-0 transition-opacity duration-300 group-hover:opacity-10" />
      <div className="relative z-10">
        <div className="mb-3 flex items-center justify-between">
          <h3 className="text-sm font-semibold">{label}</h3>
        </div>
        <div className="flex items-end gap-2">
          <div className="flex-1">
            <div className="break-words text-2xl font-bold">{value}</div>
            {subValue && <p className="mt-1 text-xs opacity-70">{subValue}</p>}
          </div>
          <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg bg-white/20 backdrop-blur-md">
            {icon}
          </div>
        </div>
      </div>
    </div>
  );
}

interface DynamicFormDetailsSectionProps {
  form: DynamicForm;
}

export function DynamicFormDetailsSection({ form }: DynamicFormDetailsSectionProps) {
  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
        <DetailsCard
          icon={<FileText className="h-5 w-5 text-blue-600" />}
          label="Form Name"
          value={form.formName}
          colorClass="from-blue-50 to-blue-100 dark:from-blue-950/40 dark:to-blue-900/20 text-blue-900 dark:text-blue-100 border-blue-200/50 dark:border-blue-800/50"
        />
        <DetailsCard
          icon={<Layers className="h-5 w-5 text-purple-600" />}
          label="Total Fields"
          value={form.totalFields}
          subValue={`${form.fields.length} field${form.fields.length !== 1 ? "s" : ""} defined`}
          colorClass="from-purple-50 to-purple-100 dark:from-purple-950/40 dark:to-purple-900/20 text-purple-900 dark:text-purple-100 border-purple-200/50 dark:border-purple-800/50"
        />
        <DetailsCard
          icon={<Package className="h-5 w-5 text-green-600" />}
          label="Assigned Modules"
          value={form.assignedModules.length}
          subValue={form.assignedModules.join(", ") || "None"}
          colorClass="from-green-50 to-emerald-100 dark:from-green-950/40 dark:to-emerald-900/20 text-green-900 dark:text-green-100 border-green-200/50 dark:border-green-800/50"
        />
        <DetailsCard
          icon={<User className="h-5 w-5 text-orange-600" />}
          label="Created By"
          value={form.createdBy}
          subValue={new Date(form.createdAt).toLocaleDateString("en-US", {
            year: "numeric",
            month: "short",
            day: "numeric",
          })}
          colorClass="from-orange-50 to-amber-100 dark:from-orange-950/40 dark:to-amber-900/20 text-orange-900 dark:text-orange-100 border-orange-200/50 dark:border-orange-800/50"
        />
      </div>

      <div className="rounded-2xl border border-slate-200/50 bg-white p-8 shadow-sm dark:border-slate-800/50 dark:bg-slate-900">
        <h3 className="mb-6 text-lg font-bold text-slate-900 dark:text-white">Form Information</h3>
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
          <div>
            <div className="mb-2 flex items-center gap-2">
              <FileText className="h-4 w-4 text-blue-600 dark:text-blue-400" />
              <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">
                Form Name
              </label>
            </div>
            <p className="font-medium text-slate-900 dark:text-white">{form.formName}</p>
          </div>

          <div>
            <div className="mb-2 flex items-center gap-2">
              <Package className="h-4 w-4 text-purple-600 dark:text-purple-400" />
              <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">
                Assigned Modules
              </label>
            </div>
            <div className="flex flex-wrap gap-1.5">
              {form.assignedModules.map((mod) => (
                <span
                  key={mod}
                  className="inline-flex items-center rounded-full bg-purple-100 dark:bg-purple-900/30 px-3 py-1 text-xs font-semibold text-purple-700 dark:text-purple-300"
                >
                  {mod}
                </span>
              ))}
            </div>
          </div>

          <div>
            <div className="mb-2 flex items-center gap-2">
              <User className="h-4 w-4 text-cyan-600 dark:text-cyan-400" />
              <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">
                Created By
              </label>
            </div>
            <p className="font-medium text-slate-900 dark:text-white">{form.createdBy}</p>
          </div>

          <div>
            <div className="mb-2 flex items-center gap-2">
              <Calendar className="h-4 w-4 text-green-600 dark:text-green-400" />
              <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">
                Created Date
              </label>
            </div>
            <p className="font-medium text-slate-900 dark:text-white">
              {new Date(form.createdAt).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </p>
          </div>

          {form.updatedAt && (
            <div>
              <div className="mb-2 flex items-center gap-2">
                <Clock className="h-4 w-4 text-orange-600 dark:text-orange-400" />
                <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">
                  Last Updated
                </label>
              </div>
              <p className="font-medium text-slate-900 dark:text-white">
                {new Date(form.updatedAt).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </p>
            </div>
          )}

          <div className="md:col-span-2">
            <div className="mb-2 flex items-center gap-2">
              <FileText className="h-4 w-4 text-orange-600 dark:text-orange-400" />
              <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">
                Description
              </label>
            </div>
            <p className="leading-6 text-slate-700 dark:text-slate-300">
              {form.description || "No description available."}
            </p>
          </div>
        </div>
      </div>

      <div className="rounded-2xl border border-slate-200/50 bg-white p-8 shadow-sm dark:border-slate-800/50 dark:bg-slate-900">
        <div className="mb-6">
          <h3 className="text-lg font-bold text-slate-900 dark:text-white">Form Fields</h3>
          <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
            {form.fields.length} field{form.fields.length !== 1 ? "s" : ""} configured in this form
          </p>
        </div>

        <div className="space-y-3">
          {form.fields
            .slice()
            .sort((a, b) => a.sortOrder - b.sortOrder)
            .map((field, index) => (
              <div
                key={field.id}
                className="flex items-center gap-4 rounded-xl border border-slate-200 dark:border-slate-800 p-4 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors"
              >
                <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-slate-100 dark:bg-slate-800 text-sm font-bold text-slate-500 dark:text-slate-400">
                  {index + 1}
                </span>
<div className="flex-1 min-w-0">
                  <p className="font-semibold text-slate-900 dark:text-white truncate">
                    {field.fieldLabel}
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
                <div className="flex items-center gap-2">
                  {field.required && (
                    <span className="text-xs font-semibold text-red-500 dark:text-red-400">
                      Required
                    </span>
                  )}
                  <DynamicFormStatusBadge status={field.status} />
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}
