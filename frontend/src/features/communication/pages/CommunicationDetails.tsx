import { useParams, useNavigate } from "react-router-dom";
import DetailsPage from "@/components/common/DetailsPage";
import type { DetailSection } from "@/components/common/DetailsPage";
import {
  MessageCircle,
  Mail,
  MessageSquare,
  Phone,
  Calendar,
  FileText,
  User,
  Building2,
  Briefcase,
  CalendarDays,
  Clock,
} from "lucide-react";
import { useState, useEffect } from "react";
import { communicationService } from "../services/communicationService";
import { CommunicationTypeBadge } from "../components/CommunicationTypeBadge";
import { CommunicationStatusBadge } from "../components/CommunicationStatusBadge";
import type { Communication, CommunicationType } from "../types/communication";

const commTypeConfig: Record<
  CommunicationType,
  { icon: typeof Mail; label: string; color: string; bg: string }
> = {
  EMAIL: {
    icon: Mail,
    label: "Email",
    color: "text-blue-600 dark:text-blue-400",
    bg: "bg-blue-100 dark:bg-blue-900/30",
  },
  WHATSAPP: {
    icon: MessageCircle,
    label: "WhatsApp",
    color: "text-green-600 dark:text-green-400",
    bg: "bg-green-100 dark:bg-green-900/30",
  },
  SMS: {
    icon: MessageSquare,
    label: "SMS",
    color: "text-purple-600 dark:text-purple-400",
    bg: "bg-purple-100 dark:bg-purple-900/30",
  },
  CALL: {
    icon: Phone,
    label: "Call",
    color: "text-cyan-600 dark:text-cyan-400",
    bg: "bg-cyan-100 dark:bg-cyan-900/30",
  },
  MEETING: {
    icon: Calendar,
    label: "Meeting",
    color: "text-orange-600 dark:text-orange-400",
    bg: "bg-orange-100 dark:bg-orange-900/30",
  },
  NOTE: {
    icon: FileText,
    label: "Note",
    color: "text-slate-600 dark:text-slate-400",
    bg: "bg-slate-100 dark:bg-slate-800",
  },
};

export default function CommunicationDetails() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [communication, setCommunication] =
    useState<Communication | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (id) {
      communicationService.getCommunicationById(id).then((result) => {
        if (result) {
          setCommunication(result);
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

  if (!communication) {
    return (
      <DetailsPage
        title="Communication Not Found"
        subtitle="Error"
        onBack={() => navigate("/communications")}
        sections={[]}
        customLayout={
          <div className="rounded-2xl border-2 border-dashed border-red-300 dark:border-red-700 bg-gradient-to-br from-red-50 to-red-100 dark:from-red-950/30 dark:to-red-900/30 p-16 text-center">
            <div className="flex h-20 w-20 items-center justify-center rounded-full bg-red-100 dark:bg-red-900/50 mx-auto mb-4">
              <MessageCircle className="h-10 w-10 text-red-600 dark:text-red-400" />
            </div>
            <h3 className="text-2xl font-bold text-red-900 dark:text-red-100 mb-2">
              Communication Not Found
            </h3>
            <p className="text-red-700 dark:text-red-300">
              This communication may have been deleted or doesn't exist.
            </p>
          </div>
        }
      />
    );
  }

  const typeConfig =
    commTypeConfig[communication.type] || commTypeConfig.NOTE;
  const TypeIcon = typeConfig.icon;

  const sections: DetailSection[] = [];

  // COMMUNICATION OVERVIEW SECTION
  sections.push({
    title: "Communication Overview",
    icon: MessageCircle,
    iconColor: "text-blue-600 dark:text-blue-400",
    headerGradient:
      "bg-gradient-to-r from-blue-50 to-cyan-50 dark:from-blue-950/20 dark:to-cyan-950/20",
    columns: 2,
    fields: [
      {
        icon: TypeIcon,
        iconBgColor: typeConfig.bg,
        iconColor: typeConfig.color,
        label: "Communication Type",
        value: <CommunicationTypeBadge type={communication.type} />,
        type: "custom",
      },
      {
        icon: MessageCircle,
        iconBgColor: "bg-blue-100 dark:bg-blue-900/30",
        iconColor: "text-blue-600 dark:text-blue-400",
        label: "Status",
        value: (
          <CommunicationStatusBadge status={communication.status} />
        ),
        type: "custom",
      },
      {
        icon: FileText,
        iconBgColor: "bg-slate-100 dark:bg-slate-800",
        iconColor: "text-slate-600 dark:text-slate-400",
        label: "Subject",
        value: communication.subject || "(No Subject)",
      },
      {
        icon: User,
        iconBgColor: "bg-slate-100 dark:bg-slate-800",
        iconColor: "text-slate-600 dark:text-slate-400",
        label: "Recipient",
        value: communication.recipient || "N/A",
      },
    ],
  });

  // RELATED RECORDS SECTION
  sections.push({
    title: "Related Records",
    icon: Building2,
    iconColor: "text-blue-600 dark:text-blue-400",
    headerGradient:
      "bg-gradient-to-r from-blue-50 to-cyan-50 dark:from-blue-950/30 dark:to-cyan-950/30",
    columns: 2,
    fields: [
      {
        icon: Building2,
        iconBgColor: "bg-blue-100 dark:bg-blue-900/40",
        iconColor: "text-blue-600 dark:text-blue-400",
        label: "Customer",
        value: communication.customerName || "N/A",
      },
      {
        icon: User,
        iconBgColor: "bg-indigo-100 dark:bg-indigo-900/40",
        iconColor: "text-indigo-600 dark:text-indigo-400",
        label: "Lead",
        value: communication.leadName || "N/A",
      },
      {
        icon: Briefcase,
        iconBgColor: "bg-cyan-100 dark:bg-cyan-900/40",
        iconColor: "text-cyan-600 dark:text-cyan-400",
        label: "Deal / Opportunity",
        value: communication.dealName || "N/A",
      },
      {
        icon: User,
        iconBgColor: "bg-slate-100 dark:bg-slate-800",
        iconColor: "text-slate-600 dark:text-slate-400",
        label: "Assigned To",
        value: communication.assignedToName,
      },
    ],
  });

  // DATE & TIME SECTION
  sections.push({
    title: "Date & Time",
    icon: CalendarDays,
    iconColor: "text-emerald-600 dark:text-emerald-400",
    headerGradient:
      "bg-gradient-to-r from-emerald-50 to-teal-50 dark:from-emerald-950/20 dark:to-teal-950/20",
    columns: 2,
    fields: [
      {
        icon: CalendarDays,
        iconBgColor: "bg-emerald-100 dark:bg-emerald-900/30",
        iconColor: "text-emerald-600 dark:text-emerald-400",
        label: "Communication Date",
        value: new Date(communication.communicationDate).toLocaleDateString(
          "en-US",
          {
            year: "numeric",
            month: "long",
            day: "numeric",
          }
        ),
      },
      {
        icon: Clock,
        iconBgColor: "bg-amber-100 dark:bg-amber-900/30",
        iconColor: "text-amber-600 dark:text-amber-400",
        label: "Communication Time",
        value: communication.communicationTime || "—",
      },
    ],
  });

  // TIMELINE SECTION
  sections.push({
    title: "Timeline & Meta",
    icon: Clock,
    iconColor: "text-slate-600 dark:text-slate-400",
    headerGradient:
      "bg-gradient-to-r from-slate-50 to-slate-100 dark:from-slate-950/30 dark:to-slate-900/30",
    columns: 2,
    fields: [
      {
        icon: Clock,
        iconBgColor: "bg-slate-200 dark:bg-slate-800",
        iconColor: "text-slate-700 dark:text-slate-300",
        label: "Created",
        value: new Date(communication.createdAt).toLocaleDateString(
          "en-US",
          {
            year: "numeric",
            month: "long",
            day: "numeric",
            hour: "2-digit",
            minute: "2-digit",
          }
        ),
      },
      {
        icon: Clock,
        iconBgColor: "bg-slate-200 dark:bg-slate-800",
        iconColor: "text-slate-700 dark:text-slate-300",
        label: "Last Updated",
        value: communication.updatedAt
          ? new Date(communication.updatedAt).toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
              hour: "2-digit",
              minute: "2-digit",
            })
          : "—",
      },
    ],
  });

  // MESSAGE SECTION
  if (communication.message) {
    sections.push({
      title: "Message",
      icon: FileText,
      iconColor: "text-slate-600 dark:text-slate-400",
      headerGradient:
        "bg-gradient-to-r from-slate-50 to-slate-100 dark:from-slate-950/30 dark:to-slate-900/30",
      fields: [
        {
          icon: FileText,
          iconBgColor: "bg-slate-100 dark:bg-slate-900/40",
          iconColor: "text-slate-600 dark:text-slate-400",
          label: "Full Message",
          value: (
            <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-900/50 border-2 border-slate-200 dark:border-slate-700">
              <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed whitespace-pre-wrap">
                {communication.message}
              </p>
            </div>
          ),
          type: "custom",
        },
      ],
    });
  }

  const statusConfig = {
    DRAFT: { label: "Draft", variant: "default" as const },
    SENT: { label: "Sent", variant: "info" as const },
    DELIVERED: { label: "Delivered", variant: "success" as const },
    COMPLETED: { label: "Completed", variant: "success" as const },
    FAILED: { label: "Failed", variant: "error" as const },
  };

  const handleDelete = async () => {
    if (id) {
      await communicationService.deleteCommunication(id);
      setTimeout(() => navigate("/communications"), 300);
    }
  };

  const displayTitle = communication.subject || "Communication Details";

  return (
    <DetailsPage
      title={displayTitle}
      subtitle="Communication Details"
      status={statusConfig[communication.status]}
      headerGradient="from-blue-600 via-cyan-500 to-blue-600 dark:from-blue-900 dark:via-cyan-900 dark:to-blue-900"
      onBack={() => navigate("/communications")}
      onEdit={() => navigate(`/communications/${id}/edit`)}
      onDelete={handleDelete}
      sections={sections}
      gridLayout="2-col"
      deleteConfirmation={{
        title: "Delete Communication?",
        message: `Are you sure you want to permanently delete "${displayTitle}"? This action cannot be undone.`,
        confirmLabel: "Yes, Delete Communication",
        cancelLabel: "Cancel",
      }}
    />
  );
}

