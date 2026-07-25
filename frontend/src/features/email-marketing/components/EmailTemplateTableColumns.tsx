import type { TableColumn } from "@/components/common/DataTable";
import type { EmailTemplate, EmailTemplateStatus } from "../types/emailTemplate";

const statusStyles: Record<EmailTemplateStatus, string> = {
  ACTIVE:
    "bg-green-100 text-green-700 dark:bg-green-900/50 dark:text-green-300",
  INACTIVE:
    "bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300",
};

export const emailTemplateTableColumns: TableColumn<EmailTemplate>[] = [
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
  // {
  //   key: "subject",
  //   label: "Subject",
  //   width: "250px",
  //   render: (value: string) => (
  //     <span className="text-sm text-slate-600 dark:text-slate-400 truncate block max-w-[250px]">
  //       {value}
  //     </span>
  //   ),
  // },
  {
    key: "category",
    label: "Category",
    render: (value: EmailTemplate["category"]) => (
      <span className="inline-flex items-center rounded-full px-3 py-0.5 text-xs font-medium bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300">
        {value.charAt(0) + value.slice(1).toLowerCase()}
      </span>
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
    key: "updatedAt",
    label: "Updated",
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
    render: (value: EmailTemplate["status"]) => (
      <span
        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold ${statusStyles[value]}`}
      >
        {value.charAt(0) + value.slice(1).toLowerCase()}
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

