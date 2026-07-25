import type { TableColumn } from "@/components/common/DataTable";
import type { EmailCampaign } from "../types/emailCampaign";
import { EmailCampaignStatusBadge } from "./EmailCampaignStatusBadge";

export const emailCampaignTableColumns: TableColumn<EmailCampaign>[] = [
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
  // {
  //   key: "subject",
  //   label: "Subject",
  //   width: "220px",
  //   render: (value: string) => (
  //     <span className="text-sm text-slate-600 dark:text-slate-400 truncate block max-w-[220px]">
  //       {value}
  //     </span>
  //   ),
  // },
  {
    key: "templateName",
    label: "Template",
    render: (value: string) => (
      <span className="text-sm text-slate-600 dark:text-slate-400">
        {value}
      </span>
    ),
  },
  {
    key: "audienceType",
    label: "Audience",
    render: (value: EmailCampaign["audienceType"]) => {
      const label = value
        .replace(/_/g, " ")
        .replace(/\b\w/g, (c) => c.toUpperCase());
      return (
        <span className="text-sm text-slate-600 dark:text-slate-400">
          {label}
        </span>
      );
    },
  },
  // {
  //   key: "recipientCount",
  //   label: "Recipients",
  //   render: (value: number) => (
  //     <span className="text-sm font-medium text-slate-700 dark:text-slate-300">
  //       {value}
  //     </span>
  //   ),
  // },
  {
    key: "scheduledAt",
    label: "Scheduled Date",
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
    render: (value: EmailCampaign["status"]) => (
      <EmailCampaignStatusBadge status={value} />
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

