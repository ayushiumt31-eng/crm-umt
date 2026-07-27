import type { TableColumn } from "@/components/common/DataTable";
import type { Ad } from "../types/ad";

export const adTableColumns: TableColumn<Ad>[] = [
  {
    key: "name",
    label: "Ad Name",
    width: "180px",
    render: (value: string) => (
      <p className="font-semibold text-slate-900 dark:text-slate-100">
        {value}
      </p>
    ),
  },
  {
    key: "adSetName",
    label: "Ad Set",
    render: (value: string) => (
      <span className="text-sm text-slate-600 dark:text-slate-400">
        {value}
      </span>
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
    key: "platform",
    label: "Platform",
    render: (value: string) => {
      const config: Record<string, { label: string; color: string; bg: string }> = {
        FACEBOOK: { label: "Facebook", color: "text-blue-600 dark:text-blue-400", bg: "bg-blue-100 dark:bg-blue-900/30" },
        INSTAGRAM: { label: "Instagram", color: "text-pink-600 dark:text-pink-400", bg: "bg-pink-100 dark:bg-pink-900/30" },
        FACEBOOK_INSTAGRAM: { label: "FB + IG", color: "text-purple-600 dark:text-purple-400", bg: "bg-purple-100 dark:bg-purple-900/30" },
      };
      const c = config[value] || { label: value, color: "text-slate-600", bg: "bg-slate-100" };
      return (
        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold ${c.bg} ${c.color}`}>
          {c.label}
        </span>
      );
    },
  },
  {
    key: "headline",
    label: "Creative",
    render: (value: string) => (
      <span className="text-sm text-slate-600 dark:text-slate-400 truncate block max-w-[150px]">
        {value}
      </span>
    ),
  },
  {
    key: "status",
    label: "Status",
    render: (value: Ad["status"]) => {
      const config: Record<string, { label: string; classes: string }> = {
        DRAFT: { label: "Draft", classes: "bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300" },
        ACTIVE: { label: "Active", classes: "bg-green-100 text-green-700 dark:bg-green-900/50 dark:text-green-300" },
        PAUSED: { label: "Paused", classes: "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/50 dark:text-yellow-300" },
        REJECTED: { label: "Rejected", classes: "bg-red-100 text-red-700 dark:bg-red-900/50 dark:text-red-300" },
        COMPLETED: { label: "Completed", classes: "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/50 dark:text-emerald-300" },
      };
      const c = config[value];
      return (
        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold ${c.classes}`}>
          {c.label}
        </span>
      );
    },
  },
  {
    key: "impressions",
    label: "Impressions",
    render: (value: number) => (
      <span className="text-sm font-medium text-slate-700 dark:text-slate-300">
        {value.toLocaleString()}
      </span>
    ),
  },
  {
    key: "clicks",
    label: "Clicks",
    render: (value: number) => (
      <span className="text-sm text-slate-600 dark:text-slate-400">
        {value.toLocaleString()}
      </span>
    ),
  },
  {
    key: "leads",
    label: "Leads",
    render: (value: number) => (
      <span className="text-sm text-slate-600 dark:text-slate-400">
        {value.toLocaleString()}
      </span>
    ),
  },
  {
    key: "id",
    label: "Actions",
    width: "120px",
    render: () => null,
  },
];
