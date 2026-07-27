import type { TableColumn } from "@/components/common/DataTable";
import type { AdSet } from "../types/adSet";

export const adSetTableColumns: TableColumn<AdSet>[] = [
  {
    key: "name",
    label: "Ad Set Name",
    width: "200px",
    render: (value: string) => (
      <p className="font-semibold text-slate-900 dark:text-slate-100">
        {value}
      </p>
    ),
  },
  {
    key: "campaignName",
    label: "Campaign",
    render: (value: string) => (
      <span className="text-sm text-slate-600 dark:text-slate-400">
        {value}
      </span>
    ),
  },
  {
    key: "audienceName",
    label: "Audience",
    render: (value: string | undefined) => (
      <span className="text-sm text-slate-600 dark:text-slate-400">
        {value || "—"}
      </span>
    ),
  },
  {
    key: "budget",
    label: "Budget",
    render: (value: number) => (
      <span className="text-sm font-medium text-slate-700 dark:text-slate-300">
        ₹{value.toLocaleString()}
      </span>
    ),
  },
  {
    key: "startDate",
    label: "Start Date",
    render: (value: string) => (
      <span className="text-sm text-slate-600 dark:text-slate-400">
        {new Date(value).toLocaleDateString("en-US", {
          year: "numeric",
          month: "short",
          day: "numeric",
        })}
      </span>
    ),
  },
  {
    key: "endDate",
    label: "End Date",
    render: (value: string) => (
      <span className="text-sm text-slate-600 dark:text-slate-400">
        {new Date(value).toLocaleDateString("en-US", {
          year: "numeric",
          month: "short",
          day: "numeric",
        })}
      </span>
    ),
  },
  {
    key: "status",
    label: "Status",
    render: (value: AdSet["status"]) => {
      const statusConfig: Record<string, { label: string; classes: string }> = {
        DRAFT: { label: "Draft", classes: "bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300" },
        SCHEDULED: { label: "Scheduled", classes: "bg-blue-100 text-blue-700 dark:bg-blue-900/50 dark:text-blue-300" },
        ACTIVE: { label: "Active", classes: "bg-green-100 text-green-700 dark:bg-green-900/50 dark:text-green-300" },
        PAUSED: { label: "Paused", classes: "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/50 dark:text-yellow-300" },
        COMPLETED: { label: "Completed", classes: "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/50 dark:text-emerald-300" },
        CANCELLED: { label: "Cancelled", classes: "bg-red-100 text-red-700 dark:bg-red-900/50 dark:text-red-300" },
      };
      const config = statusConfig[value];
      return (
        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold ${config.classes}`}>
          {config.label}
        </span>
      );
    },
  },
  {
    key: "id",
    label: "Actions",
    width: "120px",
    render: () => null,
  },
];
