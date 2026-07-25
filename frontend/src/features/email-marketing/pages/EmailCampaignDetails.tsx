import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import DetailsPage from "@/components/common/DetailsPage";
import type { DetailSection } from "@/components/common/DetailsPage";
import {
  Mail,
  CalendarDays,
  Clock,
  User,
  BadgeInfo,
  FileText,
  Users,
} from "lucide-react";
import { emailCampaignService } from "../services/emailCampaignService";
import { EmailCampaignStatusBadge } from "../components/EmailCampaignStatusBadge";
import type { EmailCampaign } from "../types/emailCampaign";

export default function EmailCampaignDetails() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [campaign, setCampaign] = useState<EmailCampaign | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (id) {
      emailCampaignService.getEmailCampaignById(id).then((result) => {
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
        title="Email Campaign Not Found"
        subtitle="Error"
        onBack={() => navigate("/marketing/email-marketing/campaigns")}
        sections={[]}
        customLayout={
          <div className="rounded-2xl border-2 border-dashed border-red-300 dark:border-red-700 bg-gradient-to-br from-red-50 to-red-100 dark:from-red-950/30 dark:to-red-900/30 p-16 text-center">
            <div className="flex h-20 w-20 items-center justify-center rounded-full bg-red-100 dark:bg-red-900/50 mx-auto mb-4">
              <Mail className="h-10 w-10 text-red-600 dark:text-red-400" />
            </div>
            <h3 className="text-2xl font-bold text-red-900 dark:text-red-100 mb-2">
              Campaign Not Found
            </h3>
            <p className="text-red-700 dark:text-red-300">
              This email campaign may have been deleted or doesn't exist.
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
    icon: Mail,
    iconColor: "text-blue-600 dark:text-blue-400",
    headerGradient:
      "bg-gradient-to-r from-blue-50 to-cyan-50 dark:from-blue-950/20 dark:to-cyan-950/20",
    columns: 2,
    fields: [
      {
        icon: Mail,
        iconBgColor: "bg-blue-100 dark:bg-blue-900/30",
        iconColor: "text-blue-600 dark:text-blue-400",
        label: "Campaign Name",
        value: campaign.name,
      },
      {
        icon: Mail,
        iconBgColor: "bg-blue-100 dark:bg-blue-900/30",
        iconColor: "text-blue-600 dark:text-blue-400",
        label: "Status",
        value: <EmailCampaignStatusBadge status={campaign.status} />,
        type: "custom",
      },
      {
        icon: Mail,
        iconBgColor: "bg-purple-100 dark:bg-purple-900/30",
        iconColor: "text-purple-600 dark:text-purple-400",
        label: "Subject",
        value: campaign.subject,
      },
      {
        icon: Mail,
        iconBgColor: "bg-indigo-100 dark:bg-indigo-900/30",
        iconColor: "text-indigo-600 dark:text-indigo-400",
        label: "Template",
        value: campaign.templateName,
      },
    ],
  });

  sections.push({
    title: "Audience",
    icon: Users,
    iconColor: "text-blue-600 dark:text-blue-400",
    headerGradient:
      "bg-gradient-to-r from-blue-50 to-cyan-50 dark:from-blue-950/30 dark:to-cyan-950/30",
    columns: 2,
    fields: [
      {
        icon: Users,
        iconBgColor: "bg-blue-100 dark:bg-blue-900/40",
        iconColor: "text-blue-600 dark:text-blue-400",
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
    title: "Email Analytics (Demo)",
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
                { label: "Opened", value: 0 },
                { label: "Clicked", value: 0 },
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
              Demo analytics — real email tracking will be available after
              backend/API integration.
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
      await emailCampaignService.deleteEmailCampaign(id);
      setTimeout(() => navigate("/marketing/email-marketing/campaigns"), 300);
    }
  };

  return (
    <DetailsPage
      title={campaign.name}
      subtitle="Email Campaign Details"
      status={statusConfig[campaign.status]}
      headerGradient="from-blue-600 via-cyan-500 to-blue-600 dark:from-blue-900 dark:via-cyan-900 dark:to-blue-900"
      onBack={() => navigate("/marketing/email-marketing/campaigns")}
      onEdit={() =>
        navigate(
          `/marketing/email-marketing/campaigns/${id}/edit`
        )
      }
      onDelete={handleDelete}
      sections={sections}
      gridLayout="2-col"
      deleteConfirmation={{
        title: "Delete Email Campaign?",
        message: `Are you sure you want to permanently delete "${campaign.name}"? This action cannot be undone.`,
        confirmLabel: "Yes, Delete Campaign",
        cancelLabel: "Cancel",
      }}
    />
  );
}

