import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import DetailsPage from "@/components/common/DetailsPage";
import type { DetailSection } from "@/components/common/DetailsPage";
import {
  MessageCircle,
  CalendarDays,
  Clock,
  User,
  BadgeInfo,
  FileText,
  Users,
} from "lucide-react";
import { whatsappCampaignService } from "../services/whatsappCampaignService";
import { WhatsAppCampaignStatusBadge } from "../components/WhatsAppCampaignStatusBadge";
import type { WhatsAppCampaign } from "../types/whatsappCampaign";

export default function WhatsAppCampaignDetails() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [campaign, setCampaign] = useState<WhatsAppCampaign | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (id) {
      whatsappCampaignService.getWhatsAppCampaignById(id).then((result) => {
        if (result) {
          setCampaign(result);
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

  if (!campaign) {
    return (
      <DetailsPage
        title="WhatsApp Campaign Not Found"
        subtitle="Error"
        onBack={() => navigate("/marketing/whatsapp/campaigns")}
        sections={[]}
        customLayout={
          <div className="rounded-2xl border-2 border-dashed border-red-300 dark:border-red-700 bg-gradient-to-br from-red-50 to-red-100 dark:from-red-950/30 dark:to-red-900/30 p-16 text-center">
            <div className="flex h-20 w-20 items-center justify-center rounded-full bg-red-100 dark:bg-red-900/50 mx-auto mb-4">
              <MessageCircle className="h-10 w-10 text-red-600 dark:text-red-400" />
            </div>
            <h3 className="text-2xl font-bold text-red-900 dark:text-red-100 mb-2">
              Campaign Not Found
            </h3>
            <p className="text-red-700 dark:text-red-300">
              This WhatsApp campaign may have been deleted or doesn't exist.
            </p>
          </div>
        }
      />
    );
  }

  const audienceLabel = campaign.audienceType
    .replace(/_/g, " ")
    .replace(/\b\w/g, (c) => c.toUpperCase());

  const sections: DetailSection[] = [];

  sections.push({
    title: "Campaign Overview",
    icon: MessageCircle,
    iconColor: "text-green-600 dark:text-green-400",
    headerGradient:
      "bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-950/20 dark:to-emerald-950/20",
    columns: 2,
    fields: [
      {
        icon: MessageCircle,
        iconBgColor: "bg-green-100 dark:bg-green-900/30",
        iconColor: "text-green-600 dark:text-green-400",
        label: "Campaign Name",
        value: campaign.name,
      },
      {
        icon: MessageCircle,
        iconBgColor: "bg-green-100 dark:bg-green-900/30",
        iconColor: "text-green-600 dark:text-green-400",
        label: "Status",
        value: <WhatsAppCampaignStatusBadge status={campaign.status} />,
        type: "custom",
      },
      {
        icon: MessageCircle,
        iconBgColor: "bg-purple-100 dark:bg-purple-900/30",
        iconColor: "text-purple-600 dark:text-purple-400",
        label: "Template",
        value: campaign.templateName,
      },
      {
        icon: FileText,
        iconBgColor: "bg-indigo-100 dark:bg-indigo-900/30",
        iconColor: "text-indigo-600 dark:text-indigo-400",
        label: "Message",
        value: (
          <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-700">
            <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed whitespace-pre-wrap">
              {campaign.message}
            </p>
          </div>
        ),
        type: "custom",
      },
    ],
  });

  sections.push({
    title: "Audience",
    icon: Users,
    iconColor: "text-green-600 dark:text-green-400",
    headerGradient:
      "bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-950/30 dark:to-emerald-950/30",
    columns: 2,
    fields: [
      {
        icon: Users,
        iconBgColor: "bg-green-100 dark:bg-green-900/40",
        iconColor: "text-green-600 dark:text-green-400",
        label: "Audience",
        value: audienceLabel,
      },
      {
        icon: Users,
        iconBgColor: "bg-indigo-100 dark:bg-indigo-900/40",
        iconColor: "text-indigo-600 dark:text-indigo-400",
        label: "Recipients",
        value: campaign.recipientCount.toLocaleString(),
      },
    ],
  });

  sections.push({
    title: "Schedule",
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
        label: "Scheduled Date",
        value: new Date(campaign.scheduledAt).toLocaleDateString("en-US", {
          year: "numeric",
          month: "long",
          day: "numeric",
          hour: "2-digit",
          minute: "2-digit",
        }),
      },
      {
        icon: User,
        iconBgColor: "bg-amber-100 dark:bg-amber-900/30",
        iconColor: "text-amber-600 dark:text-amber-400",
        label: "Created By",
        value: campaign.createdByName,
      },
    ],
  });

  sections.push({
    title: "Timeline",
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
        value: new Date(campaign.createdAt).toLocaleDateString("en-US", {
          year: "numeric",
          month: "long",
          day: "numeric",
          hour: "2-digit",
          minute: "2-digit",
        }),
      },
      {
        icon: Clock,
        iconBgColor: "bg-slate-200 dark:bg-slate-800",
        iconColor: "text-slate-700 dark:text-slate-300",
        label: "Last Updated",
        value: campaign.updatedAt
          ? new Date(campaign.updatedAt).toLocaleDateString("en-US", {
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

  if (campaign.notes) {
    sections.push({
      title: "Notes",
      icon: FileText,
      iconColor: "text-slate-600 dark:text-slate-400",
      headerGradient:
        "bg-gradient-to-r from-slate-50 to-slate-100 dark:from-slate-950/30 dark:to-slate-900/30",
      fields: [
        {
          icon: FileText,
          iconBgColor: "bg-slate-100 dark:bg-slate-900/40",
          iconColor: "text-slate-600 dark:text-slate-400",
          label: "Campaign Notes",
          value: (
            <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-900/50 border-2 border-slate-200 dark:border-slate-700">
              <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed whitespace-pre-wrap">
                {campaign.notes}
              </p>
            </div>
          ),
          type: "custom",
        },
      ],
    });
  }

  // Analytics placeholder section
  sections.push({
    title: "WhatsApp Analytics (Demo)",
    icon: BadgeInfo,
    iconColor: "text-amber-600 dark:text-amber-400",
    headerGradient:
      "bg-gradient-to-r from-amber-50 to-yellow-50 dark:from-amber-950/20 dark:to-yellow-950/20",
    fields: [
      {
        icon: BadgeInfo,
        iconBgColor: "bg-amber-100 dark:bg-amber-900/40",
        iconColor: "text-amber-600 dark:text-amber-400",
        label: "Delivery & Analytics",
        value: (
          <div className="space-y-4">
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {[
                { label: "Total Recipients", value: campaign.recipientCount },
                { label: "Sent", value: 0 },
                { label: "Delivered", value: 0 },
                { label: "Failed", value: 0 },
                { label: "Read", value: 0 },
              ].map((item) => (
                <div
                  key={item.label}
                  className="p-3 rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700"
                >
                  <p className="text-xs font-medium text-slate-500 dark:text-slate-400">
                    {item.label}
                  </p>
                  <p className="text-xl font-bold text-slate-900 dark:text-white">
                    {item.value}
                  </p>
                </div>
              ))}
            </div>
            <p className="text-xs text-amber-600 dark:text-amber-400 italic">
              Demo analytics — real WhatsApp delivery tracking will be available
              after backend/API integration.
            </p>
          </div>
        ),
        type: "custom",
      },
    ],
  });

  const statusConfig = {
    DRAFT: { label: "Draft", variant: "default" as const },
    SCHEDULED: { label: "Scheduled", variant: "info" as const },
    PROCESSING: { label: "Processing", variant: "warning" as const },
    SENT: { label: "Sent", variant: "success" as const },
    PAUSED: { label: "Paused", variant: "warning" as const },
    CANCELLED: { label: "Cancelled", variant: "error" as const },
    FAILED: { label: "Failed", variant: "error" as const },
  };

  const handleDelete = async () => {
    if (id) {
      await whatsappCampaignService.deleteWhatsAppCampaign(id);
      setTimeout(() => navigate("/marketing/whatsapp/campaigns"), 300);
    }
  };

  return (
    <DetailsPage
      title={campaign.name}
      subtitle="WhatsApp Campaign Details"
      status={statusConfig[campaign.status]}
      headerGradient="from-green-600 via-emerald-500 to-green-600 dark:from-green-900 dark:via-emerald-900 dark:to-green-900"
      onBack={() => navigate("/marketing/whatsapp/campaigns")}
      onEdit={() => navigate(`/marketing/whatsapp/campaigns/${id}/edit`)}
      onDelete={handleDelete}
      sections={sections}
      gridLayout="2-col"
      deleteConfirmation={{
        title: "Delete WhatsApp Campaign?",
        message: `Are you sure you want to permanently delete "${campaign.name}"? This action cannot be undone.`,
        confirmLabel: "Yes, Delete Campaign",
        cancelLabel: "Cancel",
      }}
    />
  );
}

