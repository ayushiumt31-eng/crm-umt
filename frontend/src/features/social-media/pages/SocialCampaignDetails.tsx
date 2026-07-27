import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import DetailsPage from "@/components/common/DetailsPage";
import type { DetailSection } from "@/components/common/DetailsPage";
import {
  Layers,
  CalendarDays,
  Clock,
  User,
  BadgeInfo,
  FileText,
  Share2,
} from "lucide-react";
import { socialCampaignService } from "../services/socialCampaignService";
import { SocialPlatformBadge } from "../components/SocialPlatformBadge";
import { SocialCampaignStatusBadge } from "../components/SocialCampaignStatusBadge";
import type { SocialCampaign } from "../types/socialCampaign";

export default function SocialCampaignDetails() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [campaign, setCampaign] = useState<SocialCampaign | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (id) {
      socialCampaignService.getSocialCampaignById(id).then((result) => {
        if (result) {
          setCampaign(result);
        }
        setLoading(false);
      });
    }
  }, [id]);

  const handleDelete = async () => {
    if (id) {
      await socialCampaignService.deleteSocialCampaign(id);
      setTimeout(() => navigate("/marketing/social-media/campaigns"), 300);
    }
  };

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
        title="Social Campaign Not Found"
        subtitle="Error"
        onBack={() => navigate("/marketing/social-media/campaigns")}
        sections={[]}
        customLayout={
          <div className="rounded-2xl border-2 border-dashed border-red-300 dark:border-red-700 bg-gradient-to-br from-red-50 to-red-100 dark:from-red-950/30 dark:to-red-900/30 p-16 text-center">
            <div className="flex h-20 w-20 items-center justify-center rounded-full bg-red-100 dark:bg-red-900/50 mx-auto mb-4">
              <Layers className="h-10 w-10 text-red-600 dark:text-red-400" />
            </div>
            <h3 className="text-2xl font-bold text-red-900 dark:text-red-100 mb-2">
              Campaign Not Found
            </h3>
            <p className="text-red-700 dark:text-red-300">
              This social campaign may have been deleted or doesn't exist.
            </p>
          </div>
        }
      />
    );
  }

  const sections: DetailSection[] = [];

  sections.push({
    title: "Campaign Overview",
    icon: Layers,
    iconColor: "text-blue-600 dark:text-blue-400",
    headerGradient:
      "bg-gradient-to-r from-blue-50 to-blue-100 dark:from-blue-950/20 dark:to-blue-950/20",
    columns: 2,
    fields: [
      {
        icon: Layers,
        iconBgColor: "bg-blue-100 dark:bg-blue-900/30",
        iconColor: "text-blue-600 dark:text-blue-400",
        label: "Campaign Name",
        value: campaign.name,
      },
      {
        icon: Layers,
        iconBgColor: "bg-blue-100 dark:bg-blue-900/30",
        iconColor: "text-blue-600 dark:text-blue-400",
        label: "Status",
        value: <SocialCampaignStatusBadge status={campaign.status} />,
        type: "custom",
      },
      {
        icon: Share2,
        iconBgColor: "bg-purple-100 dark:bg-purple-900/30",
        iconColor: "text-purple-600 dark:text-purple-400",
        label: "Platforms",
        value: (
          <div className="flex flex-wrap gap-1">
            {campaign.platforms.map((p) => (
              <SocialPlatformBadge key={p} platform={p} />
            ))}
          </div>
        ),
        type: "custom",
      },
      {
        icon: Layers,
        iconBgColor: "bg-indigo-100 dark:bg-indigo-900/30",
        iconColor: "text-indigo-600 dark:text-indigo-400",
        label: "Total Posts",
        value: campaign.totalPosts,
      },
    ],
  });

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
        label: "Start Date",
        value: new Date(campaign.startDate).toLocaleDateString("en-US", {
          year: "numeric",
          month: "long",
          day: "numeric",
        }),
      },
      {
        icon: CalendarDays,
        iconBgColor: "bg-emerald-100 dark:bg-emerald-900/30",
        iconColor: "text-emerald-600 dark:text-emerald-400",
        label: "End Date",
        value: new Date(campaign.endDate).toLocaleDateString("en-US", {
          year: "numeric",
          month: "long",
          day: "numeric",
        }),
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
        icon: User,
        iconBgColor: "bg-amber-100 dark:bg-amber-900/30",
        iconColor: "text-amber-600 dark:text-amber-400",
        label: "Created By",
        value: campaign.createdByName,
      },
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

  const statusConfig = {
    DRAFT: { label: "Draft", variant: "default" as const },
    SCHEDULED: { label: "Scheduled", variant: "info" as const },
    RUNNING: { label: "Running", variant: "success" as const },
    COMPLETED: { label: "Completed", variant: "success" as const },
    PAUSED: { label: "Paused", variant: "warning" as const },
    CANCELLED: { label: "Cancelled", variant: "error" as const },
  };

  return (
    <DetailsPage
      title={campaign.name}
      subtitle="Social Campaign Details"
      status={statusConfig[campaign.status]}
      headerGradient="from-blue-600 via-blue-500 to-blue-600 dark:from-blue-900 dark:via-blue-900 dark:to-blue-900"
      onBack={() => navigate("/marketing/social-media/campaigns")}
      onDelete={handleDelete}
      sections={sections}
      gridLayout="2-col"
      deleteConfirmation={{
        title: "Delete Social Campaign?",
        message: `Are you sure you want to permanently delete "${campaign.name}"? This action cannot be undone.`,
        confirmLabel: "Yes, Delete Campaign",
        cancelLabel: "Cancel",
      }}
    />
  );
}

