import { useParams, useNavigate } from "react-router-dom";
import DetailsPage from "@/components/common/DetailsPage";
import type { DetailSection } from "@/components/common/DetailsPage";
import { 
  ClipboardList, Phone, Video, Mail, CalendarCheck, MoreHorizontal,
  User, Building2, Briefcase, CalendarDays, Clock, FileText, Zap
} from "lucide-react";
import { useState, useEffect } from "react";
import { activityService } from "../services/activityService";
import { ActivityStatusBadge } from "../components/ActivityStatusBadge";
import { ActivityPriorityBadge } from "../components/ActivityPriorityBadge";
import type { Activity, ActivityType } from "../types/activity";

const activityTypeConfig: Record<ActivityType, { icon: typeof Phone; label: string; color: string; bg: string }> = {
  CALL: { icon: Phone, label: "Call", color: "text-green-600 dark:text-green-400", bg: "bg-green-100 dark:bg-green-900/30" },
  MEETING: { icon: Video, label: "Meeting", color: "text-purple-600 dark:text-purple-400", bg: "bg-purple-100 dark:bg-purple-900/30" },
  FOLLOW_UP: { icon: CalendarCheck, label: "Follow Up", color: "text-blue-600 dark:text-blue-400", bg: "bg-blue-100 dark:bg-blue-900/30" },
  EMAIL: { icon: Mail, label: "Email", color: "text-cyan-600 dark:text-cyan-400", bg: "bg-cyan-100 dark:bg-cyan-900/30" },
  OTHER: { icon: MoreHorizontal, label: "Other", color: "text-slate-600 dark:text-slate-400", bg: "bg-slate-100 dark:bg-slate-800" },
};

export default function ActivityDetails() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [activity, setActivity] = useState<Activity | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (id) {
      activityService.getActivityById(id).then((result) => {
        if (result) {
          setActivity(result);
        }
        setLoading(false);
      });
    }
  }, [id]);

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto text-center py-12">
        <p className="text-slate-500">Loading...</p>
      </div>
    );
  }

  if (!activity) {
    return (
      <DetailsPage
        title="Activity Not Found"
        subtitle="Error"
        onBack={() => navigate("/activities")}
        sections={[]}
        customLayout={
          <div className="rounded-2xl border-2 border-dashed border-red-300 dark:border-red-700 bg-gradient-to-br from-red-50 to-red-100 dark:from-red-950/30 dark:to-red-900/30 p-16 text-center">
            <div className="flex h-20 w-20 items-center justify-center rounded-full bg-red-100 dark:bg-red-900/50 mx-auto mb-4">
              <ClipboardList className="h-10 w-10 text-red-600 dark:text-red-400" />
            </div>
            <h3 className="text-2xl font-bold text-red-900 dark:text-red-100 mb-2">Activity Not Found</h3>
            <p className="text-red-700 dark:text-red-300">This activity may have been deleted or doesn't exist.</p>
          </div>
        }
      />
    );
  }

  const typeConfig = activityTypeConfig[activity.type] || activityTypeConfig.OTHER;
  const TypeIcon = typeConfig.icon;

  const sections: DetailSection[] = [];

  // ACTIVITY OVERVIEW SECTION
  sections.push({
    title: "Activity Overview",
    icon: ClipboardList,
    iconColor: "text-violet-600 dark:text-violet-400",
    headerGradient: "bg-gradient-to-r from-violet-50 to-purple-50 dark:from-violet-950/20 dark:to-purple-950/20",
    columns: 2,
    fields: [
      {
        icon: ClipboardList,
        iconBgColor: typeConfig.bg,
        iconColor: typeConfig.color,
        label: "Activity Title",
        value: activity.title,
      },
      {
        icon: TypeIcon,
        iconBgColor: typeConfig.bg,
        iconColor: typeConfig.color,
        label: "Activity Type",
        value: typeConfig.label,
      },
      {
        icon: Zap,
        iconBgColor: "bg-amber-100 dark:bg-amber-900/30",
        iconColor: "text-amber-600 dark:text-amber-400",
        label: "Priority",
        value: <ActivityPriorityBadge priority={activity.priority} />,
        type: "custom",
      },
      {
        icon: ClipboardList,
        iconBgColor: "bg-blue-100 dark:bg-blue-900/30",
        iconColor: "text-blue-600 dark:text-blue-400",
        label: "Status",
        value: <ActivityStatusBadge status={activity.status} />,
        type: "custom",
      },
    ],
  });

  // RELATIONSHIPS SECTION
  sections.push({
    title: "Related Records",
    icon: Building2,
    iconColor: "text-blue-600 dark:text-blue-400",
    headerGradient: "bg-gradient-to-r from-blue-50 to-cyan-50 dark:from-blue-950/30 dark:to-cyan-950/30",
    columns: 2,
    fields: [
      {
        icon: Building2,
        iconBgColor: "bg-blue-100 dark:bg-blue-900/40",
        iconColor: "text-blue-600 dark:text-blue-400",
        label: "Customer",
        value: activity.customerName || "N/A",
      },
      {
        icon: User,
        iconBgColor: "bg-indigo-100 dark:bg-indigo-900/40",
        iconColor: "text-indigo-600 dark:text-indigo-400",
        label: "Lead",
        value: activity.leadName || "N/A",
      },
      {
        icon: Briefcase,
        iconBgColor: "bg-cyan-100 dark:bg-cyan-900/40",
        iconColor: "text-cyan-600 dark:text-cyan-400",
        label: "Deal / Opportunity",
        value: activity.dealName || "N/A",
      },
      {
        icon: User,
        iconBgColor: "bg-slate-100 dark:bg-slate-800",
        iconColor: "text-slate-600 dark:text-slate-400",
        label: "Assigned To",
        value: activity.assignedToName,
      },
    ],
  });

  // SCHEDULE SECTION
  sections.push({
    title: "Schedule",
    icon: CalendarDays,
    iconColor: "text-emerald-600 dark:text-emerald-400",
    headerGradient: "bg-gradient-to-r from-emerald-50 to-teal-50 dark:from-emerald-950/20 dark:to-teal-950/20",
    columns: 2,
    fields: [
      {
        icon: CalendarDays,
        iconBgColor: "bg-emerald-100 dark:bg-emerald-900/30",
        iconColor: "text-emerald-600 dark:text-emerald-400",
        label: "Due Date",
        value: new Date(activity.dueDate).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" }),
      },
      {
        icon: Clock,
        iconBgColor: "bg-amber-100 dark:bg-amber-900/30",
        iconColor: "text-amber-600 dark:text-amber-400",
        label: "Due Time",
        value: activity.dueTime || "—",
      },
    ],
  });

  // TIMELINE SECTION
  sections.push({
    title: "Timeline & Meta",
    icon: Clock,
    iconColor: "text-slate-600 dark:text-slate-400",
    headerGradient: "bg-gradient-to-r from-slate-50 to-slate-100 dark:from-slate-950/30 dark:to-slate-900/30",
    columns: 2,
    fields: [
      {
        icon: Clock,
        iconBgColor: "bg-slate-200 dark:bg-slate-800",
        iconColor: "text-slate-700 dark:text-slate-300",
        label: "Created",
        value: new Date(activity.createdAt).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric", hour: "2-digit", minute: "2-digit" }),
      },
      {
        icon: Clock,
        iconBgColor: "bg-slate-200 dark:bg-slate-800",
        iconColor: "text-slate-700 dark:text-slate-300",
        label: "Last Updated",
        value: activity.updatedAt
          ? new Date(activity.updatedAt).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric", hour: "2-digit", minute: "2-digit" })
          : "—",
      },
    ],
  });

  // DESCRIPTION
  if (activity.description) {
    sections.push({
      title: "Description",
      icon: FileText,
      iconColor: "text-slate-600 dark:text-slate-400",
      headerGradient: "bg-gradient-to-r from-slate-50 to-slate-100 dark:from-slate-950/30 dark:to-slate-900/30",
      fields: [
        {
          icon: FileText,
          iconBgColor: "bg-slate-100 dark:bg-slate-900/40",
          iconColor: "text-slate-600 dark:text-slate-400",
          label: "Notes",
          value: (
            <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-900/50 border-2 border-slate-200 dark:border-slate-700">
              <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed whitespace-pre-wrap">{activity.description}</p>
            </div>
          ),
          type: "custom",
        },
      ],
    });
  }

  const statusConfig = {
    PENDING: { label: "Pending", variant: "warning" as const },
    IN_PROGRESS: { label: "In Progress", variant: "info" as const },
    COMPLETED: { label: "Completed", variant: "success" as const },
    CANCELLED: { label: "Cancelled", variant: "error" as const },
  };

  const handleDelete = async () => {
    if (id) {
      await activityService.deleteActivity(id);
      // Delay navigation to let the dialog close animation finish
      setTimeout(() => navigate("/activities"), 300);
    }
  };

  return (
    <DetailsPage
      title={activity.title}
      subtitle="Activity Details"
      status={statusConfig[activity.status]}
      headerGradient="from-violet-600 via-purple-500 to-violet-600 dark:from-violet-900 dark:via-purple-900 dark:to-violet-900"
      onBack={() => navigate("/activities")}
      onEdit={() => navigate(`/activities/${id}/edit`)}
      onDelete={handleDelete}
      sections={sections}
      gridLayout="2-col"
      deleteConfirmation={{
        title: "Delete Activity?",
        message: `Are you sure you want to permanently delete "${activity.title}"? This action cannot be undone.`,
        confirmLabel: "Yes, Delete Activity",
        cancelLabel: "Cancel",
      }}
    />
  );
}

