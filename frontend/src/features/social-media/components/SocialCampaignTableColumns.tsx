import type { TableColumn } from "@/components/common/DataTable";
import type { SocialCampaign } from "../types/socialCampaign";
import { SocialPlatformBadge } from "./SocialPlatformBadge";
import { SocialCampaignStatusBadge } from "./SocialCampaignStatusBadge";

export const socialCampaignTableColumns: TableColumn<SocialCampaign>[] = [
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
    key: "platforms",
    label: "Platforms",
    render: (value: SocialCampaign["platforms"]) => (
      <div className="flex flex-wrap gap-1">
        {value.map((p) => (
          <SocialPlatformBadge key={p} platform={p} />
        ))}
      </div>
    ),
  },
  {
    key: "totalPosts",
    label: "Total Posts",
    render: (value: number) => (
      <span className="text-sm font-medium text-slate-700 dark:text-slate-300">
        {value}
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
    render: (value: SocialCampaign["status"]) => (
      <SocialCampaignStatusBadge status={value} />
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

