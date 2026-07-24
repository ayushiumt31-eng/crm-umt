import { Phone, Video, Mail, CalendarCheck, MoreHorizontal, Eye, Edit2, Trash2 } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import type { TableColumn } from "@/components/common/DataTable";
import type { Activity, ActivityType } from "../types/activity";
import { ActivityStatusBadge } from "./ActivityStatusBadge";
import { ActivityPriorityBadge } from "./ActivityPriorityBadge";

const activityTypeConfig: Record<ActivityType, { icon: typeof Phone; label: string; color: string; bg: string }> = {
  CALL: { icon: Phone, label: "Call", color: "text-green-600 dark:text-green-400", bg: "bg-green-50 dark:bg-green-900/30" },
  MEETING: { icon: Video, label: "Meeting", color: "text-purple-600 dark:text-purple-400", bg: "bg-purple-50 dark:bg-purple-900/30" },
  FOLLOW_UP: { icon: CalendarCheck, label: "Follow Up", color: "text-blue-600 dark:text-blue-400", bg: "bg-blue-50 dark:bg-blue-900/30" },
  EMAIL: { icon: Mail, label: "Email", color: "text-cyan-600 dark:text-cyan-400", bg: "bg-cyan-50 dark:bg-cyan-900/30" },
  OTHER: { icon: MoreHorizontal, label: "Other", color: "text-slate-600 dark:text-slate-400", bg: "bg-slate-50 dark:bg-slate-800" },
};

export const activitiesTableColumns: TableColumn<Activity>[] = [
  {
    key: "title",
    label: "Activity",
    render: (value: string, row: Activity) => {
      const config = activityTypeConfig[row.type] || activityTypeConfig.OTHER;
      const Icon = config.icon;

      return (
        <div className="flex items-center gap-3">
          <div className={`flex h-9 w-9 items-center justify-center rounded-lg ${config.bg}`}>
            <Icon className={`h-4 w-4 ${config.color}`} />
          </div>
          <div>
            <p className="font-semibold text-slate-900 dark:text-white">{value}</p>
            <span className={`text-xs ${config.color}`}>{config.label}</span>
          </div>
        </div>
      );
    },
  },
  {
    key: "customerName",
    label: "Customer",
    render: (value: string | undefined) => (
      <span className="text-sm text-slate-600 dark:text-slate-400">
        {value || "—"}
      </span>
    ),
  },
  {
    key: "leadName",
    label: "Lead / Deal",
    render: (value: string | undefined, row: Activity) => (
      <div className="flex flex-col">
        {row.leadName && <span className="text-sm text-slate-600 dark:text-slate-400">{row.leadName}</span>}
        {row.dealName && <span className="text-xs text-slate-500 dark:text-slate-500">{row.dealName}</span>}
        {!row.leadName && !row.dealName && <span className="text-sm text-slate-400">—</span>}
      </div>
    ),
  },
  {
    key: "assignedToName",
    label: "Assigned To",
    render: (value: string) => (
      <span className="text-sm font-medium text-slate-700 dark:text-slate-300">{value}</span>
    ),
  },
  {
    key: "dueDate",
    label: "Due Date",
    render: (value: string) => (
      <span className="text-sm text-slate-600 dark:text-slate-400">
        {new Date(value).toLocaleDateString()}
      </span>
    ),
  },
  {
    key: "priority",
    label: "Priority",
    render: (value: Activity["priority"]) => <ActivityPriorityBadge priority={value} />,
  },
  {
    key: "status",
    label: "Status",
    render: (value: Activity["status"]) => <ActivityStatusBadge status={value} />,
  },
  {
    key: "id",
    label: "Actions",
    render: (_value: string, row: Activity) => (
      <div className="flex items-center gap-2">
        <Link to={`/activities/${row.id}`}>
          <Button variant="ghost" size="icon" className="h-8 w-8 hover:bg-blue-100 dark:hover:bg-blue-900/30 text-blue-600 dark:text-blue-400">
            <Eye className="h-4 w-4" />
          </Button>
        </Link>
        <Link to={`/activities/${row.id}/edit`}>
          <Button variant="ghost" size="icon" className="h-8 w-8 hover:bg-cyan-100 dark:hover:bg-cyan-900/30 text-cyan-600 dark:text-cyan-400">
            <Edit2 className="h-4 w-4" />
          </Button>
        </Link>
      </div>
    ),
  },
];

