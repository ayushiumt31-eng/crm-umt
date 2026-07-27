import {
  MessageSquare,
  CalendarDays,
  Clock,
  User,
  BadgeInfo,
  FileText,
  Hash,
} from "lucide-react";
import type { SocialPost } from "../types/socialPost";
import { SocialPlatformBadge } from "./SocialPlatformBadge";
import { SocialPostStatusBadge } from "./SocialPostStatusBadge";
import { SocialPostPreview } from "./SocialPostPreview";

interface SocialPostDetailsCardProps {
  post: SocialPost;
}

export function SocialPostDetailsCard({ post }: SocialPostDetailsCardProps) {
  const detailItems = [
    {
      icon: MessageSquare,
      color: "text-blue-600 dark:text-blue-400",
      label: "Platform",
      value: <SocialPlatformBadge platform={post.platform} />,
    },
    {
      icon: Hash,
      color: "text-purple-600 dark:text-purple-400",
      label: "Campaign",
      value: post.campaignName || "—",
    },
    {
      icon: CalendarDays,
      color: "text-emerald-600 dark:text-emerald-400",
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
      color: "text-cyan-600 dark:text-cyan-400",
      label: "Created By",
      value: post.createdByName,
    },
    {
      icon: BadgeInfo,
      color: "text-amber-600 dark:text-amber-400",
      label: "Media",
      value: post.mediaType
        ? post.mediaType === "NONE"
          ? "No media"
          : `${post.mediaType}${post.mediaUrl ? " (URL provided)" : ""}`
        : "No media",
    },
  ];

  if (post.notes) {
    detailItems.push({
      icon: FileText,
      color: "text-amber-600 dark:text-amber-400",
      label: "Notes",
      value: post.notes,
    });
  }

  return (
    <div className="space-y-6">
      {/* Status Header */}
      <div className="flex items-center justify-between p-4 rounded-xl bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-700">
        <div className="flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-white dark:bg-slate-800 shadow-sm">
            <MessageSquare className="h-6 w-6 text-blue-600 dark:text-blue-400" />
          </div>
          <div>
            <p className="text-sm font-medium text-slate-500 dark:text-slate-400">
              Post Title
            </p>
            <p className="text-lg font-bold text-slate-900 dark:text-white">
              {post.title}
            </p>
          </div>
        </div>
        <SocialPostStatusBadge status={post.status} />
      </div>

      {/* Content */}
      <div className="p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700">
        <p className="text-sm font-medium text-slate-500 dark:text-slate-400 mb-2">
          Content
        </p>
        <p className="text-sm text-slate-800 dark:text-slate-200 leading-relaxed whitespace-pre-wrap">
          {post.content}
        </p>
      </div>

      {/* Details Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {detailItems.map((item, index) => (
          <div
            key={index}
            className="flex items-start gap-3 p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700"
          >
            <div
              className={`flex h-10 w-10 items-center justify-center rounded-lg bg-slate-50 dark:bg-slate-800 ${item.color}`}
            >
              <item.icon className="h-5 w-5" />
            </div>
            <div>
              <p className="text-sm font-medium text-slate-500 dark:text-slate-400">
                {item.label}
              </p>
              <div className="text-base font-semibold text-slate-900 dark:text-white">
                {item.value}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Post Preview */}
      <div className="rounded-xl border border-slate-200 dark:border-slate-700 overflow-hidden">
        <div className="px-4 py-3 bg-gradient-to-r from-slate-50 to-slate-100 dark:from-slate-900/50 dark:to-slate-800/50 border-b border-slate-200 dark:border-slate-700">
          <h3 className="font-semibold text-sm text-slate-900 dark:text-white">
            Post Preview
          </h3>
        </div>
        <div className="p-4">
          <SocialPostPreview post={post} />
        </div>
      </div>

      {/* Analytics Placeholder */}
      <div className="rounded-xl bg-gradient-to-br from-amber-50 to-yellow-50 dark:from-amber-950/20 dark:to-yellow-950/20 border border-amber-200 dark:border-amber-800 p-5">
        <div className="flex items-center gap-2 mb-3">
          <BadgeInfo className="h-5 w-5 text-amber-600 dark:text-amber-400" />
          <h3 className="font-semibold text-amber-900 dark:text-amber-200">
            Social Media Analytics (Demo)
          </h3>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-4">
          {[
            { label: "Likes", value: 0 },
            { label: "Comments", value: 0 },
            { label: "Shares", value: 0 },
            { label: "Reach", value: 0 },
          ].map((item) => (
            <div
              key={item.label}
              className="p-3 rounded-lg bg-white/60 dark:bg-slate-900/60 border border-amber-100 dark:border-amber-800/50"
            >
              <p className="text-xs font-medium text-amber-700 dark:text-amber-300">
                {item.label}
              </p>
              <p className="text-lg font-bold text-amber-900 dark:text-amber-100">
                {item.value}
              </p>
            </div>
          ))}
        </div>
        <p className="text-xs text-amber-600 dark:text-amber-400 italic">
          Demo analytics — real social media analytics will be available after
          backend/API integration.
        </p>
      </div>

      {/* Timestamps */}
      <div className="flex gap-6 text-xs text-slate-500 dark:text-slate-500">
        <span>
          Created:{" "}
          {new Date(post.createdAt).toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
            hour: "2-digit",
            minute: "2-digit",
          })}
        </span>
        {post.updatedAt && (
          <span>
            Updated:{" "}
            {new Date(post.updatedAt).toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
              hour: "2-digit",
              minute: "2-digit",
            })}
          </span>
        )}
      </div>
    </div>
  );
}

