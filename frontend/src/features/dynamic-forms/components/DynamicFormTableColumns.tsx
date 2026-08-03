import { FileText, Layers, Package } from "lucide-react";
import type { DynamicForm } from "../types/dynamicForm";
import type { TableColumn } from "@/components/common/DataTable";
import { DynamicFormStatusBadge } from "./DynamicFormStatusBadge";

function FormNameCell({ form }: { form: DynamicForm }) {
  return (
    <div className="flex items-center gap-3">
      <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-blue-50 dark:bg-blue-900/30">
        <FileText className="h-4 w-4 text-blue-600 dark:text-blue-400" />
      </div>
      <div>
        <p className="font-semibold text-slate-900 dark:text-slate-100">{form.formName}</p>
      </div>
    </div>
  );
}

function AssignedModulesCell({ modules }: { modules: string[] }) {
  return (
    <div className="flex flex-wrap gap-1.5">
      {modules.map((mod) => (
        <span
          key={mod}
          className="inline-flex items-center rounded-full bg-purple-100 px-2.5 py-0.5 text-xs font-semibold text-purple-700 dark:bg-purple-900/30 dark:text-purple-300"
        >
          {mod}
        </span>
      ))}
    </div>
  );
}

function TotalFieldsCell({ count }: { count: number }) {
  return (
    <div className="flex items-center gap-2">
      <div className="flex h-7 w-7 items-center justify-center rounded-md bg-slate-100 dark:bg-slate-800">
        <Layers className="h-3.5 w-3.5 text-slate-600 dark:text-slate-400" />
      </div>
      <span className="text-sm font-medium text-slate-700 dark:text-slate-300">{count || 0}</span>
    </div>
  );
}

function CreatedByCell({ name }: { name: string }) {
  return (
    <div className="flex items-center gap-2">
      <div className="flex h-7 w-7 items-center justify-center rounded-full bg-slate-200 dark:bg-slate-700 text-xs font-bold text-slate-600 dark:text-slate-300">
        {name.charAt(0).toUpperCase()}
      </div>
      <span className="text-sm font-medium text-slate-700 dark:text-slate-300">{name}</span>
    </div>
  );
}

function CreatedDateCell({ date }: { date: string }) {
  return (
    <span className="text-sm text-slate-600 dark:text-slate-400">
      {new Date(date).toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
      })}
    </span>
  );
}

export const dynamicFormTableColumns: TableColumn<DynamicForm>[] = [
  {
    key: "formName",
    label: "Form Name",
    render: (_value, row) => <FormNameCell form={row} />,
  },
  {
    key: "assignedModules",
    label: "Assigned Module",
    render: (value) => <AssignedModulesCell modules={value as string[]} />,
  },
  {
    key: "totalFields",
    label: "Total Fields",
    render: (value) => <TotalFieldsCell count={value as number} />,
  },
  {
    key: "status",
    label: "Status",
    render: (value) => <DynamicFormStatusBadge status={value as DynamicForm["status"]} />,
  },
  {
    key: "createdBy",
    label: "Created By",
    render: (value) => <CreatedByCell name={value as string} />,
  },
  {
    key: "createdAt",
    label: "Created Date",
    render: (value) => <CreatedDateCell date={value as string} />,
  },
];

