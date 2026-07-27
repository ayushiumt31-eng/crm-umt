import type { TableColumn } from "@/components/common/DataTable";
import type { AdCampaign } from "../types/adCampaign";
import { AdCampaignStatusBadge } from "./AdCampaignStatusBadge";
import { AdPlatformBadge } from "./AdPlatformBadge";

export const adCampaignTableColumns: TableColumn<AdCampaign>[] = [
  {
    key: "name",
    label: "Campaign Name",
    width: "200px",
    render: (value: string) => (
      <p className="font-semibold text-slate-900 dark:text-slate-100">
        {value}
      </p>
    ),
  },
  {
    key: "objective",
    label: "Objective",
    render: (value: AdCampaign["objective"]) => (
      <span className="text-sm text-slate-600 dark:text-slate-400">
        {value.replace(/_/g, " ").replace(/\b\w/g, (c) => c.toUpperCase())}
      </span>
    ),
  },
  {
    key: "platform",
    label: "Platform",
    render: (value: AdCampaign["platform"]) => (
      <AdPlatformBadge platform={value} />
    ),
  },
  // {
  //   key: "budget",
  //   label: "Budget",
  //   render: (value: number) => (
  //     <span className="text-sm font-medium text-slate-700 dark:text-slate-300">
  //       ₹{value.toLocaleString()}
  //     </span>
  //   ),
  // },
  // {
  //   key: "spent",
  //   label: "Spent",
  //   render: (value: number) => (
  //     <span className="text-sm text-slate-600 dark:text-slate-400">
  //       ₹{value.toLocaleString()}
  //     </span>
  //   ),
  // },
  // {
  //   key: "startDate",
  //   label: "Start Date",
  //   render: (value: string) => (
  //     <span className="text-sm text-slate-600 dark:text-slate-400">
  //       {new Date(value).toLocaleDateString("en-US", {
  //         year: "numeric",
  //         month: "short",
  //         day: "numeric",
  //       })}
  //     </span>
  //   ),
  // },
  // {
  //   key: "endDate",
  //   label: "End Date",
  //   render: (value: string) => (
  //     <span className="text-sm text-slate-600 dark:text-slate-400">
  //       {new Date(value).toLocaleDateString("en-US", {
  //         year: "numeric",
  //         month: "short",
  //         day: "numeric",
  //       })}
  //     </span>
  //   ),
  // },
  {
    key: "status",
    label: "Status",
    render: (value: AdCampaign["status"]) => (
      <AdCampaignStatusBadge status={value} />
    ),
  },
  {
    key: "createdByName",
    label: "Created By",
    render: (value: string) => (
      <span className="text-sm text-slate-600 dark:text-slate-400">
        {value}
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
