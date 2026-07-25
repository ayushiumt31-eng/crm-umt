import { Eye, Edit2 } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import type { TableColumn } from "@/components/common/DataTable";
import type { Communication } from "../types/communication";
import { CommunicationTypeBadge } from "./CommunicationTypeBadge";
import { CommunicationStatusBadge } from "./CommunicationStatusBadge";

export const communicationTableColumns: TableColumn<Communication>[] = [
  {
    key: "type",
    label: "Type",
    render: (value: Communication["type"]) => (
      <CommunicationTypeBadge type={value} />
    ),
  },
  {
    key: "subject",
    label: "Subject",
    render: (value: string | undefined, row: Communication) => (
      <div className="flex flex-col">
        <span className="font-semibold text-slate-900 dark:text-white text-sm">
          {value || "(No Subject)"}
        </span>
        <span className="text-xs text-slate-500 dark:text-slate-500 truncate max-w-[200px]">
          {row.message?.substring(0, 60)}
          {row.message && row.message.length > 60 ? "..." : ""}
        </span>
      </div>
    ),
  },
  {
    key: "recipient",
    label: "Contact",
    render: (value: string | undefined) => (
      <span className="text-sm text-slate-600 dark:text-slate-400">
        {value || "—"}
      </span>
    ),
  },
//   {
//     key: "customerName",
//     label: "Customer",
//     render: (value: string | undefined) => (
//       <span className="text-sm text-slate-600 dark:text-slate-400">
//         {value || "—"}
//       </span>
//     ),
//   },
//   {
//     key: "leadName",
//     label: "Lead",
//     render: (value: string | undefined) => (
//       <span className="text-sm text-slate-600 dark:text-slate-400">
//         {value || "—"}
//       </span>
//     ),
//   },
//   {
//     key: "dealName",
//     label: "Deal",
//     render: (value: string | undefined) => (
//       <span className="text-sm text-slate-600 dark:text-slate-400">
//         {value || "—"}
//       </span>
//     ),
//   },
  {
    key: "assignedToName",
    label: "Assigned To",
    render: (value: string) => (
      <span className="text-sm font-medium text-slate-700 dark:text-slate-300">
        {value}
      </span>
    ),
  },
//   {
//     key: "communicationDate",
//     label: "Date",
//     render: (value: string) => (
//       <span className="text-sm text-slate-600 dark:text-slate-400">
//         {new Date(value).toLocaleDateString()}
//       </span>
//     ),
//   },
  {
    key: "status",
    label: "Status",
    render: (value: Communication["status"]) => (
      <CommunicationStatusBadge status={value} />
    ),
  },
  {
    key: "id",
    label: "Actions",
    render: (_value: string, row: Communication) => (
      <div className="flex items-center gap-2">
        <Link to={`/communications/${row.id}`}>
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 hover:bg-blue-100 dark:hover:bg-blue-900/30 text-blue-600 dark:text-blue-400"
          >
            <Eye className="h-4 w-4" />
          </Button>
        </Link>
        <Link to={`/communications/${row.id}/edit`}>
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 hover:bg-cyan-100 dark:hover:bg-cyan-900/30 text-cyan-600 dark:text-cyan-400"
          >
            <Edit2 className="h-4 w-4" />
          </Button>
        </Link>
      </div>
    ),
  },
];

