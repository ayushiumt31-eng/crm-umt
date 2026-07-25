import type { TableColumn } from "@/components/common/DataTable";
import type { WhatsAppTemplate } from "../types/whatsappTemplate";

const categoryLabels: Record<string, string> = {
  WELCOME: "Welcome",
  PROMOTION: "Promotion",
  REMINDER: "Reminder",
  FOLLOW_UP: "Follow-up",
  ANNOUNCEMENT: "Announcement",
  SUPPORT: "Support",
  CUSTOM: "Custom",
};

export const whatsappTemplateTableColumns: TableColumn<WhatsAppTemplate>[] = [
  {
    key: "name",
    label: "Template Name",
    width: "200px",
    render: (value: string) => (
      <p className="font-semibold text-slate-900 dark:text-slate-100">
        {value}
      </p>
    ),
  },
  {
    key: "category",
    label: "Category",
    render: (value: WhatsAppTemplate["category"]) => (
      <span className="text-sm text-slate-600 dark:text-slate-400">
        {categoryLabels[value] || value}
      </span>
    ),
  },
//   {
//     key: "message",
//     label: "Message Preview",
//     width: "280px",
//     render: (value: string) => (
//       <span className="text-sm text-slate-600 dark:text-slate-400 truncate block max-w-[280px]">
//         {value.length > 90 ? value.substring(0, 90) + "..." : value}
//       </span>
//     ),
//   },
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
    key: "updatedAt",
    label: "Updated Date",
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
    render: (value: WhatsAppTemplate["status"]) => (
      <span
        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold ${
          value === "ACTIVE"
            ? "bg-green-100 text-green-700 dark:bg-green-900/50 dark:text-green-300 border border-green-200 dark:border-green-800"
            : "bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-400 border border-slate-200 dark:border-slate-700"
        }`}
      >
        {value === "ACTIVE" ? "Active" : "Inactive"}
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

