import type { TableColumn } from "@/components/common/DataTable";
import type { SocialPost } from "../types/socialPost";
import { SocialPlatformBadge } from "./SocialPlatformBadge";
import { SocialPostStatusBadge } from "./SocialPostStatusBadge";

export const socialPostTableColumns: TableColumn<SocialPost>[] = [
  {
    key: "title",
    label: "Post Title",
    width: "200px",
    render: (value: string) => (
      <p className="font-semibold text-slate-900 dark:text-slate-100">
        {value}
      </p>
    ),
  },
  {
    key: "platform",
    label: "Platform",
    render: (value: SocialPost["platform"]) => (
      <SocialPlatformBadge platform={value} />
    ),
  },
//   {
//     key: "content",
//     label: "Content Preview",
//     width: "250px",
//     render: (value: string) => (
//       <span className="text-sm text-slate-600 dark:text-slate-400 truncate block max-w-[250px]">
//         {value.length > 80 ? `${value.substring(0, 80)}...` : value}
//       </span>
//     ),
//   },
  {
    key: "mediaType",
    label: "Media",
    render: (value: SocialPost["mediaType"]) => {
      if (!value || value === "NONE") {
        return <span className="text-sm text-slate-400">—</span>;
      }
      return (
        <span className="text-sm text-slate-600 dark:text-slate-400">
          {value}
        </span>
      );
    },
  },
  {
    key: "scheduledAt",
    label: "Scheduled Date",
    render: (value: string | undefined) => (
      <span className="text-sm text-slate-600 dark:text-slate-400">
        {value
          ? new Date(value).toLocaleDateString("en-US", {
              year: "numeric",
              month: "short",
              day: "numeric",
            })
          : "—"}
      </span>
    ),
  },
  {
    key: "status",
    label: "Status",
    render: (value: SocialPost["status"]) => (
      <SocialPostStatusBadge status={value} />
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

