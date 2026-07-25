import { useParams, useNavigate } from "react-router-dom";
import DetailsPage from "@/components/common/DetailsPage";
import type { DetailSection } from "@/components/common/DetailsPage";
import {
  Megaphone,
  Mail,
  MessageCircle,
  MessageSquare,
  Users,
  CalendarDays,
  Clock,
  User,
  DollarSign,
  FileText,
  BadgeInfo,
} from "lucide-react";
import { useState, useEffect } from "react";
import { campaignService } from "../services/campaignService";
import { CampaignStatusBadge } from "../components/CampaignStatusBadge";
import { CampaignTypeBadge } from "../components/CampaignTypeBadge";
import type { Campaign, CampaignType } from "../types/campaign";

const campaignTypeConfig: Record<
  CampaignType,
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
};

export default function CampaignDetails() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [campaign, setCampaign] = useState<Campaign | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (id) {
      campaignService.getCampaignById(id).then((result) => {
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
        title="Campaign Not Found"
        subtitle="Error"
        onBack={() => navigate("/marketing/campaigns")}
        sections={[]}
        customLayout={
          <div className="rounded-2xl border-2 border-dashed border-red-300 dark:border-red-700 bg-gradient-to-br from-red-50 to-red-100 dark:from-red-950/30 dark:to-red-900/30 p-16 text-center">
            <div className="flex h-20 w-20 items-center justify-center rounded-full bg-red-100 dark:bg-red-900/50 mx-auto mb-4">
              <Megaphone className="h-10 w-10 text-red-600 dark:text-red-400" />
            </div>
            <h3 className="text-2xl font-bold text-red-900 dark:text-red-100 mb-2">
              Campaign Not Found
            </h3>
            <p className="text-red-700 dark:text-red-300">
              This campaign may have been deleted or doesn't exist.
            </p>
          </div>
        }
      />
    );
  }

  const typeConfig =
    campaignTypeConfig[campaign.type] || campaignTypeConfig.EMAIL;
  const TypeIcon = typeConfig.icon;

  const audienceLabel = campaign.audience
    .replace(/_/g, " ")
    .replace(/\b\w/g, (c) => c.toUpperCase());

  const sections: DetailSection[] = [];

  // CAMPAIGN OVERVIEW SECTION
  sections.push({
    title: "Campaign Overview",
    icon: Megaphone,
    iconColor: "text-purple-600 dark:text-purple-400",
    headerGradient:
      "bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-950/20 dark:to-pink-950/20",
    columns: 2,
    fields: [
      {
        icon: TypeIcon,
        iconBgColor: typeConfig.bg,
        iconColor: typeConfig.color,
        label: "Campaign Type",
        value: <CampaignTypeBadge type={campaign.type} />,
        type: "custom",
      },
      {
        icon: Megaphone,
        iconBgColor: "bg-blue-100 dark:bg-blue-900/30",
        iconColor: "text-blue-600 dark:text-blue-400",
        label: "Status",
        value: <CampaignStatusBadge status={campaign.status} />,
        type: "custom",
      },
      {
        icon: Users,
        iconBgColor: "bg-indigo-100 dark:bg-indigo-900/30",
        iconColor: "text-indigo-600 dark:text-indigo-400",
        label: "Audience",
        value: audienceLabel,
      },
      {
        icon: Users,
        iconBgColor: "bg-cyan-100 dark:bg-cyan-900/30",
        iconColor: "text-cyan-600 dark:text-cyan-400",
        label: "Audience Count",
        value: campaign.audienceCount.toLocaleString(),
      },
    ],
  });

  // SCHEDULE SECTION
  sections.push({
    title: "Campaign Schedule",
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
        label: "Start Date",
        value: new Date(campaign.startDate).toLocaleDateString("en-US", {
          year: "numeric",
          month: "long",
          day: "numeric",
        }),
      },
      {
        icon: CalendarDays,
        iconBgColor: "bg-orange-100 dark:bg-orange-900/30",
        iconColor: "text-orange-600 dark:text-orange-400",
        label: "End Date",
        value: new Date(campaign.endDate).toLocaleDateString("en-US", {
          year: "numeric",
          month: "long",
          day: "numeric",
        }),
      },
    ],
  });

  // ASSIGNMENT SECTION
  sections.push({
    title: "Assignment & Budget",
    icon: User,
    iconColor: "text-slate-600 dark:text-slate-400",
    headerGradient:
      "bg-gradient-to-r from-slate-50 to-slate-100 dark:from-slate-950/30 dark:to-slate-900/30",
    columns: 2,
    fields: [
      {
        icon: User,
        iconBgColor: "bg-blue-100 dark:bg-blue-900/30",
        iconColor: "text-blue-600 dark:text-blue-400",
        label: "Assigned To",
        value: campaign.assignedToName,
      },
      {
        icon: User,
        iconBgColor: "bg-cyan-100 dark:bg-cyan-900/30",
        iconColor: "text-cyan-600 dark:text-cyan-400",
        label: "Created By",
        value: campaign.createdByName,
      },
      {
        icon: DollarSign,
        iconBgColor: "bg-amber-100 dark:bg-amber-900/30",
        iconColor: "text-amber-600 dark:text-amber-400",
        label: "Budget",
        value: campaign.budget
          ? `$${campaign.budget.toLocaleString()}`
          : "—",
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

  // DESCRIPTION SECTION
  if (campaign.description) {
    sections.push({
      title: "Description",
      icon: FileText,
      iconColor: "text-slate-600 dark:text-slate-400",
      headerGradient:
        "bg-gradient-to-r from-slate-50 to-slate-100 dark:from-slate-950/30 dark:to-slate-900/30",
      fields: [
        {
          icon: FileText,
          iconBgColor: "bg-slate-100 dark:bg-slate-900/40",
          iconColor: "text-slate-600 dark:text-slate-400",
          label: "Campaign Description",
          value: (
            <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-900/50 border-2 border-slate-200 dark:border-slate-700">
              <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed whitespace-pre-wrap">
                {campaign.description}
              </p>
            </div>
          ),
          type: "custom",
        },
      ],
    });
  }

  // NOTES SECTION
  if (campaign.notes) {
    sections.push({
      title: "Notes",
      icon: FileText,
      iconColor: "text-amber-600 dark:text-amber-400",
      headerGradient:
        "bg-gradient-to-r from-amber-50 to-yellow-50 dark:from-amber-950/20 dark:to-yellow-950/20",
      fields: [
        {
          icon: FileText,
          iconBgColor: "bg-amber-100 dark:bg-amber-900/30",
          iconColor: "text-amber-600 dark:text-amber-400",
          label: "Internal Notes",
          value: (
            <div className="p-4 rounded-xl bg-amber-50 dark:bg-amber-950/30 border-2 border-amber-200 dark:border-amber-800">
              <p className="text-sm text-amber-800 dark:text-amber-200 leading-relaxed whitespace-pre-wrap">
                {campaign.notes}
              </p>
            </div>
          ),
          type: "custom",
        },
      ],
    });
  }

  // PERFORMANCE PLACEHOLDER SECTION
  sections.push({
    title: "Campaign Performance",
    icon: BadgeInfo,
    iconColor: "text-amber-600 dark:text-amber-400",
    headerGradient:
      "bg-gradient-to-r from-amber-50 to-yellow-50 dark:from-amber-950/20 dark:to-yellow-950/20",
    fields: [
      {
        icon: BadgeInfo,
        iconBgColor: "bg-amber-100 dark:bg-amber-900/30",
        iconColor: "text-amber-600 dark:text-amber-400",
        label: "Performance Metrics",
        value: (
          <div className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="p-3 rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700">
                <p className="text-xs font-medium text-slate-500 dark:text-slate-400">
                  Audience Count
                </p>
                <p className="text-lg font-bold text-slate-900 dark:text-white">
                  {campaign.audienceCount.toLocaleString()}
                </p>
              </div>
              <div className="p-3 rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700">
                <p className="text-xs font-medium text-slate-500 dark:text-slate-400">
                  Estimated Reach
                </p>
                <p className="text-lg font-bold text-slate-900 dark:text-white">
                  {campaign.audienceCount.toLocaleString()}
                </p>
              </div>
              <div className="p-3 rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700">
                <p className="text-xs font-medium text-slate-500 dark:text-slate-400">
                  Campaign Status
                </p>
                <p className="text-lg font-bold text-slate-900 dark:text-white">
                  <CampaignStatusBadge status={campaign.status} />
                </p>
              </div>
              <div className="p-3 rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700">
                <p className="text-xs font-medium text-slate-500 dark:text-slate-400">
                  Duration
                </p>
                <p className="text-lg font-bold text-slate-900 dark:text-white">
                  {Math.ceil(
                    (new Date(campaign.endDate).getTime() -
                      new Date(campaign.startDate).getTime()) /
                      (1000 * 60 * 60 * 24)
                  )}{" "}
                  days
                </p>
              </div>
            </div>
            <p className="text-xs text-amber-600 dark:text-amber-400 italic">
              Campaign performance tracking (Sent, Delivered, Failed, Opened,
              Clicked, Conversion) will be available after backend/API
              integration.
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
    RUNNING: { label: "Running", variant: "success" as const },
    COMPLETED: { label: "Completed", variant: "success" as const },
    PAUSED: { label: "Paused", variant: "warning" as const },
    CANCELLED: { label: "Cancelled", variant: "error" as const },
  };

  const handleDelete = async () => {
    if (id) {
      await campaignService.deleteCampaign(id);
      setTimeout(() => navigate("/marketing/campaigns"), 300);
    }
  };

  return (
    <DetailsPage
      title={campaign.name}
      subtitle="Campaign Details"
      status={statusConfig[campaign.status]}
      headerGradient="from-purple-600 via-pink-500 to-purple-600 dark:from-purple-900 dark:via-pink-900 dark:to-purple-900"
      onBack={() => navigate("/marketing/campaigns")}
      onEdit={() => navigate(`/marketing/campaigns/${id}/edit`)}
      onDelete={handleDelete}
      sections={sections}
      gridLayout="2-col"
      deleteConfirmation={{
        title: "Delete Campaign?",
        message: `Are you sure you want to permanently delete "${campaign.name}"? This action cannot be undone.`,
        confirmLabel: "Yes, Delete Campaign",
        cancelLabel: "Cancel",
      }}
    />
  );
}
