import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { Share2, Printer } from "lucide-react";
import DetailsPage from "@/components/common/DetailsPage";
import type { DetailSection } from "@/components/common/DetailsPage";
import {
  MessageSquare,
  CalendarDays,
  Clock,
  User,
  BadgeInfo,
  FileText,
  Hash,
} from "lucide-react";
import { socialPostService } from "../services/socialPostService";
import { SocialPlatformBadge } from "../components/SocialPlatformBadge";
import { SocialPostStatusBadge } from "../components/SocialPostStatusBadge";
import { SocialPostPreview } from "../components/SocialPostPreview";
import type { SocialPost } from "../types/socialPost";

export default function SocialPostDetails() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [post, setPost] = useState<SocialPost | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (id) {
      socialPostService.getSocialPostById(id).then((result) => {
        if (result) {
          setPost(result);
        }
        setLoading(false);
      });
    }
  }, [id]);

  const handlePrint = () => {
    window.print();
  };

  const handleDelete = async () => {
    if (id) {
      await socialPostService.deleteSocialPost(id);
      setTimeout(() => navigate("/marketing/social-media/posts"), 300);
    }
  };

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto text-center py-12">
        <p className="text-slate-500">Loading...</p>
      </div>
    );
  }

  if (!post) {
    return (
      <DetailsPage
        title="Social Post Not Found"
        subtitle="Error"
        onBack={() => navigate("/marketing/social-media/posts")}
        sections={[]}
        customLayout={
          <div className="rounded-2xl border-2 border-dashed border-red-300 dark:border-red-700 bg-gradient-to-br from-red-50 to-red-100 dark:from-red-950/30 dark:to-red-900/30 p-16 text-center">
            <div className="flex h-20 w-20 items-center justify-center rounded-full bg-red-100 dark:bg-red-900/50 mx-auto mb-4">
              <Share2 className="h-10 w-10 text-red-600 dark:text-red-400" />
            </div>
            <h3 className="text-2xl font-bold text-red-900 dark:text-red-100 mb-2">
              Post Not Found
            </h3>
            <p className="text-red-700 dark:text-red-300">
              This social post may have been deleted or doesn't exist.
            </p>
          </div>
        }
      />
    );
  }

  const sections: DetailSection[] = [];

  sections.push({
    title: "Post Overview",
    icon: MessageSquare,
    iconColor: "text-violet-600 dark:text-violet-400",
    headerGradient:
      "bg-gradient-to-r from-violet-50 to-purple-50 dark:from-violet-950/20 dark:to-purple-950/20",
    columns: 2,
    fields: [
      {
        icon: MessageSquare,
        iconBgColor: "bg-violet-100 dark:bg-violet-900/30",
        iconColor: "text-violet-600 dark:text-violet-400",
        label: "Post Title",
        value: post.title,
      },
      {
        icon: MessageSquare,
        iconBgColor: "bg-violet-100 dark:bg-violet-900/30",
        iconColor: "text-violet-600 dark:text-violet-400",
        label: "Status",
        value: <SocialPostStatusBadge status={post.status} />,
        type: "custom",
      },
      {
        icon: Share2,
        iconBgColor: "bg-blue-100 dark:bg-blue-900/30",
        iconColor: "text-blue-600 dark:text-blue-400",
        label: "Platform",
        value: <SocialPlatformBadge platform={post.platform} />,
        type: "custom",
      },
      {
        icon: Hash,
        iconBgColor: "bg-purple-100 dark:bg-purple-900/30",
        iconColor: "text-purple-600 dark:text-purple-400",
        label: "Campaign",
        value: post.campaignName || "—",
      },
    ],
  });

  sections.push({
    title: "Content",
    icon: FileText,
    iconColor: "text-slate-600 dark:text-slate-400",
    headerGradient:
      "bg-gradient-to-r from-slate-50 to-slate-100 dark:from-slate-950/30 dark:to-slate-900/30",
    fields: [
      {
        icon: FileText,
        iconBgColor: "bg-slate-100 dark:bg-slate-900/40",
        iconColor: "text-slate-600 dark:text-slate-400",
        label: "Post Content",
        value: (
          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-900/50 border-2 border-slate-200 dark:border-slate-700">
            <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed whitespace-pre-wrap">
              {post.content}
            </p>
          </div>
        ),
        type: "custom",
      },
    ],
  });

  sections.push({
    title: "Post Preview",
    icon: MessageSquare,
    iconColor: "text-violet-600 dark:text-violet-400",
    headerGradient:
      "bg-gradient-to-r from-violet-50 to-purple-50 dark:from-violet-950/20 dark:to-purple-950/20",
    fields: [
      {
        icon: MessageSquare,
        iconBgColor: "bg-violet-100 dark:bg-violet-900/40",
        iconColor: "text-violet-600 dark:text-violet-400",
        label: "Platform Preview",
        value: (
          <div className="max-w-md mx-auto">
            <SocialPostPreview post={post} />
          </div>
        ),
        type: "custom",
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
        value: post.scheduledAt
          ? new Date(post.scheduledAt).toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
              hour: "2-digit",
              minute: "2-digit",
            })
          : "Not scheduled",
      },
      {
        icon: User,
        iconBgColor: "bg-amber-100 dark:bg-amber-900/30",
        iconColor: "text-amber-600 dark:text-amber-400",
        label: "Created By",
        value: post.createdByName,
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
        value: new Date(post.createdAt).toLocaleDateString("en-US", {
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
        value: post.updatedAt
          ? new Date(post.updatedAt).toLocaleDateString("en-US", {
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

  if (post.notes) {
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
          label: "Post Notes",
          value: (
            <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-900/50 border-2 border-slate-200 dark:border-slate-700">
              <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed whitespace-pre-wrap">
                {post.notes}
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
    title: "Social Media Analytics (Demo)",
    icon: BadgeInfo,
    iconColor: "text-amber-600 dark:text-amber-400",
    headerGradient:
      "bg-gradient-to-r from-amber-50 to-yellow-50 dark:from-amber-950/20 dark:to-yellow-950/20",
    fields: [
      {
        icon: BadgeInfo,
        iconBgColor: "bg-amber-100 dark:bg-amber-900/40",
        iconColor: "text-amber-600 dark:text-amber-400",
        label: "Engagement Metrics",
        value: (
          <div className="space-y-4">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {[
                { label: "Likes", value: 0 },
                { label: "Comments", value: 0 },
                { label: "Shares", value: 0 },
                { label: "Reach", value: 0 },
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
              Demo analytics — real social media analytics will be available
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
    PUBLISHED: { label: "Published", variant: "success" as const },
    PAUSED: { label: "Paused", variant: "warning" as const },
    FAILED: { label: "Failed", variant: "error" as const },
    CANCELLED: { label: "Cancelled", variant: "error" as const },
  };

  return (
    <DetailsPage
      title={post.title}
      subtitle="Social Post Details"
      status={statusConfig[post.status]}
      headerGradient="from-violet-600 via-purple-500 to-violet-600 dark:from-violet-900 dark:via-purple-900 dark:to-violet-900"
      onBack={() => navigate("/marketing/social-media/posts")}
      onEdit={() => navigate(`/marketing/social-media/posts/${id}/edit`)}
      onDelete={handleDelete}
      customActions={[
        {
          label: "Print",
          icon: Printer,
          onClick: handlePrint,
          variant: "ghost",
        },
      ]}
      sections={sections}
      gridLayout="2-col"
      deleteConfirmation={{
        title: "Delete Social Post?",
        message: `Are you sure you want to permanently delete "${post.title}"? This action cannot be undone.`,
        confirmLabel: "Yes, Delete Post",
        cancelLabel: "Cancel",
      }}
    />
  );
}

