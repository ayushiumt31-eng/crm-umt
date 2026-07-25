import {
  Mail,
  Users,
  CalendarDays,
  Clock,
  User,
  BadgeInfo,
  FileText,
} from "lucide-react";
import type { EmailCampaign } from "../types/emailCampaign";
import { EmailCampaignStatusBadge } from "./EmailCampaignStatusBadge";

interface EmailCampaignDetailsCardProps {
  campaign: EmailCampaign;
}

export function EmailCampaignDetailsCard({
  campaign,
}: EmailCampaignDetailsCardProps) {
  const audienceLabel = campaign.audienceType
    .replace(/_/g, " ")
    .replace(/\b\w/g, (c) => c.toUpperCase());

  const detailItems = [
    {
      icon: Mail,
      color: "text-blue-600 dark:text-blue-400",
      label: "Subject",
      value: campaign.subject,
    },
    {
      icon: Mail,
      color: "text-purple-600 dark:text-purple-400",
      label: "Template",
      value: campaign.templateName,
    },
    {
      icon: Users,
      color: "text-blue-600 dark:text-blue-400",
      label: "Audience",
      value: audienceLabel,
    },
    {
      icon: Users,
      color: "text-indigo-600 dark:text-indigo-400",
      label: "Recipient Count",
      value: campaign.recipientCount.toLocaleString(),
    },
    {
      icon: CalendarDays,
      color: "text-emerald-600 dark:text-emerald-400",
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
      color: "text-cyan-600 dark:text-cyan-400",
      label: "Created By",
      value: campaign.createdByName,
    },
  ];

  if (campaign.notes) {
    detailItems.push({
      icon: FileText,
      color: "text-amber-600 dark:text-amber-400",
      label: "Notes",
      value: campaign.notes,
    });
  }

  return (
    <div className="space-y-6">
      {/* Status Header */}
      <div className="flex items-center justify-between p-4 rounded-xl bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-700">
        <div className="flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-white dark:bg-slate-800 shadow-sm">
            <Mail className="h-6 w-6 text-blue-600 dark:text-blue-400" />
          </div>
          <div>
            <p className="text-sm font-medium text-slate-500 dark:text-slate-400">
              Campaign Name
            </p>
            <p className="text-lg font-bold text-slate-900 dark:text-white">
              {campaign.name}
            </p>
          </div>
        </div>
        <EmailCampaignStatusBadge status={campaign.status} />
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
              <p className="text-base font-semibold text-slate-900 dark:text-white">
                {item.value}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Analytics Placeholder */}
      <div className="rounded-xl bg-gradient-to-br from-amber-50 to-yellow-50 dark:from-amber-950/20 dark:to-yellow-950/20 border border-amber-200 dark:border-amber-800 p-5">
        <div className="flex items-center gap-2 mb-3">
          <BadgeInfo className="h-5 w-5 text-amber-600 dark:text-amber-400" />
          <h3 className="font-semibold text-amber-900 dark:text-amber-200">
            Email Analytics (Demo)
          </h3>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-4">
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
          Demo analytics — real email tracking will be available after
          backend/API integration.
        </p>
      </div>

      {/* Timestamps */}
      <div className="flex gap-6 text-xs text-slate-500 dark:text-slate-500">
        <span>
          Created:{" "}
          {new Date(campaign.createdAt).toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
            hour: "2-digit",
            minute: "2-digit",
          })}
        </span>
        {campaign.updatedAt && (
          <span>
            Updated:{" "}
            {new Date(campaign.updatedAt).toLocaleDateString("en-US", {
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

