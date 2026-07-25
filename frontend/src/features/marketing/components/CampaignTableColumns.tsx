import type { TableColumn } from "@/components/common/DataTable";
import type { Campaign } from "../types/campaign";
import { CampaignTypeBadge } from "./CampaignTypeBadge";
import { CampaignStatusBadge } from "./CampaignStatusBadge";

export const campaignTableColumns: TableColumn<Campaign>[] = [
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
    key: "type",
    label: "Type",
    render: (value: Campaign["type"]) => (
      <CampaignTypeBadge type={value} />
    ),
  },
  // {
  //   key: "audience",
  //   label: "Audience",
  //   render: (value: Campaign["audience"]) => {
  //     const label = value
  //       .replace(/_/g, " ")
  //       .replace(/\b\w/g, (c) => c.toUpperCase());
  //     return (
  //       <span className="text-sm text-slate-600 dark:text-slate-400">
  //         {label}
  //       </span>
  //     );
  //   },
  // },
  // {
  //   key: "audienceCount",
  //   label: "Audience Count",
  //   width: "100px",
  //   render: (value: number) => (
  //     <span className="text-sm font-medium text-slate-700 dark:text-slate-300">
  //       {value}
  //     </span>
  //   ),
  // },
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
    key: "assignedToName",
    label: "Assigned To",
    render: (value: string) => (
      <span className="text-sm text-slate-600 dark:text-slate-400">
        {value}
      </span>
    ),
  },
  {
    key: "status",
    label: "Status",
    render: (value: Campaign["status"]) => (
      <CampaignStatusBadge status={value} />
    ),
  },
  {
    key: "id",
    label: "Actions",
    width: "120px",
    render: () => null,
  },
];

