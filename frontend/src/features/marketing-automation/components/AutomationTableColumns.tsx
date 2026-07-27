import type { TableColumn } from "@/components/common/DataTable";
import type { Automation } from "../types/automation";
import { AutomationStatusBadge } from "./AutomationStatusBadge";
import { AutomationTriggerBadge } from "./AutomationTriggerBadge";
import { AutomationActionBadge } from "./AutomationActionBadge";

export const automationTableColumns: TableColumn<Automation>[] = [
  {
    key: "name",
    label: "Automation Name",
    width: "200px",
    render: (value: string) => (
      <p className="font-semibold text-slate-900 dark:text-slate-100">{value}</p>
    ),
  },
  {
    key: "trigger",
    label: "Trigger",
    render: (value: Automation["trigger"]) => (
      <AutomationTriggerBadge trigger={value} />
    ),
  },
  {
    key: "conditions",
    label: "Conditions",
    render: (value: Automation["conditions"]) => (
      <span className="text-sm text-slate-600 dark:text-slate-400">
        {value.length > 0 ? `${value.length} condition${value.length > 1 ? "s" : ""}` : "—"}
      </span>
    ),
  },
  {
    key: "actions",
    label: "Actions",
    render: (value: Automation["actions"]) => (
      <div className="flex flex-wrap gap-1">
        {value.slice(0, 2).map((action) => (
          <AutomationActionBadge key={action.id} action={action.type} />
        ))}
        {value.length > 2 && (
          <span className="text-xs text-slate-500">+{value.length - 2}</span>
        )}
      </div>
    ),
  },
  {
    key: "status",
    label: "Status",
    render: (value: Automation["status"]) => (
      <AutomationStatusBadge status={value} />
    ),
  },
//   {
//     key: "executionCount",
//     label: "Executions",
//     render: (value: number) => (
//       <span className="text-sm font-medium text-slate-700 dark:text-slate-300">
//         {value.toLocaleString()}
//       </span>
//     ),
//   },
//   {
//     key: "successCount",
//     label: "Success",
//     render: (value: number) => (
//       <span className="text-sm text-green-600 dark:text-green-400 font-medium">
//         {value.toLocaleString()}
//       </span>
//     ),
//   },
//   {
//     key: "failedCount",
//     label: "Failed",
//     render: (value: number) => (
//       <span className="text-sm text-red-600 dark:text-red-400 font-medium">
//         {value.toLocaleString()}
//       </span>
//     ),
//   },
//   {
//     key: "lastExecutedAt",
//     label: "Last Executed",
//     render: (value: string | undefined) => (
//       <span className="text-sm text-slate-600 dark:text-slate-400">
//         {value
//           ? new Date(value).toLocaleDateString("en-US", {
//               month: "short",
//               day: "numeric",
//               hour: "2-digit",
//               minute: "2-digit",
//             })
//           : "—"}
//       </span>
//     ),
//   },
  {
    key: "createdByName",
    label: "Created By",
    render: (value: string) => (
      <span className="text-sm text-slate-600 dark:text-slate-400">{value}</span>
    ),
  },
  {
    key: "id",
    label: "Actions",
    width: "120px",
    render: () => null,
  },
];
