import { CalendarDays, Clock, User, Building2, Briefcase, Phone, Video, Mail, CalendarCheck, MoreHorizontal, FileText } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import type { Activity, ActivityType } from "../types/activity";
import { ActivityStatusBadge } from "./ActivityStatusBadge";
import { ActivityPriorityBadge } from "./ActivityPriorityBadge";

const activityTypeIcons: Record<ActivityType, { icon: LucideIcon; label: string; color: string }> = {
  CALL: { icon: Phone, label: "Call", color: "text-green-600 dark:text-green-400" },
  MEETING: { icon: Video, label: "Meeting", color: "text-purple-600 dark:text-purple-400" },
  FOLLOW_UP: { icon: CalendarCheck, label: "Follow Up", color: "text-blue-600 dark:text-blue-400" },
  EMAIL: { icon: Mail, label: "Email", color: "text-cyan-600 dark:text-cyan-400" },
  OTHER: { icon: MoreHorizontal, label: "Other", color: "text-slate-600 dark:text-slate-400" },
};

interface ActivityDetailsCardProps {
  activity: Activity;
}

export function ActivityDetailsCard({ activity }: ActivityDetailsCardProps) {
  const typeConfig = activityTypeIcons[activity.type] || activityTypeIcons.OTHER;
  const TypeIcon = typeConfig.icon;

  const detailItems = [
    { icon: typeConfig.icon, iconColor: typeConfig.color, label: "Activity Type", value: typeConfig.label },
    { icon: Building2, iconColor: "text-blue-600 dark:text-blue-400", label: "Customer", value: activity.customerName || "N/A" },
    { icon: Briefcase, iconColor: "text-indigo-600 dark:text-indigo-400", label: "Lead", value: activity.leadName || "N/A" },
    { icon: Briefcase, iconColor: "text-cyan-600 dark:text-cyan-400", label: "Deal / Opportunity", value: activity.dealName || "N/A" },
    { icon: User, iconColor: "text-slate-600 dark:text-slate-400", label: "Assigned To", value: activity.assignedToName },
    { icon: CalendarDays, iconColor: "text-emerald-600 dark:text-emerald-400", label: "Due Date", value: new Date(activity.dueDate).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" }) },
    { icon: Clock, iconColor: "text-amber-600 dark:text-amber-400", label: "Due Time", value: activity.dueTime || "—" },
  ];

  return (
    <div className="space-y-6">
      {/* Activity Type & Status Header */}
      <div className="flex items-center justify-between p-4 rounded-xl bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-700">
        <div className="flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-white dark:bg-slate-800 shadow-sm">
            <TypeIcon className={`h-6 w-6 ${typeConfig.color}`} />
          </div>
          <div>
            <p className="text-sm font-medium text-slate-500 dark:text-slate-400">Activity Type</p>
            <p className="text-lg font-bold text-slate-900 dark:text-white">{typeConfig.label}</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <div className="text-right">
            <p className="text-sm font-medium text-slate-500 dark:text-slate-400">Priority</p>
            <ActivityPriorityBadge priority={activity.priority} />
          </div>
          <div className="text-right">
            <p className="text-sm font-medium text-slate-500 dark:text-slate-400">Status</p>
            <ActivityStatusBadge status={activity.status} />
          </div>
        </div>
      </div>

      {/* Details Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {detailItems.map((item, index) => (
          <div key={index} className="flex items-start gap-3 p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700">
            <div className={`flex h-10 w-10 items-center justify-center rounded-lg bg-slate-50 dark:bg-slate-800 ${item.iconColor}`}>
              <item.icon className="h-5 w-5" />
            </div>
            <div>
              <p className="text-sm font-medium text-slate-500 dark:text-slate-400">{item.label}</p>
              <p className="text-base font-semibold text-slate-900 dark:text-white">{item.value}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Description */}
      {activity.description && (
        <div className="rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 p-5">
          <div className="flex items-center gap-2 mb-3">
            <FileText className="h-5 w-5 text-slate-500" />
            <h3 className="font-semibold text-slate-900 dark:text-white">Description</h3>
          </div>
          <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed whitespace-pre-wrap">
            {activity.description}
          </p>
        </div>
      )}

      {/* Timestamps */}
      <div className="flex gap-6 text-xs text-slate-500 dark:text-slate-500">
        <span>Created: {new Date(activity.createdAt).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric", hour: "2-digit", minute: "2-digit" })}</span>
        {activity.updatedAt && (
          <span>Updated: {new Date(activity.updatedAt).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric", hour: "2-digit", minute: "2-digit" })}</span>
        )}
      </div>
    </div>
  );
}

