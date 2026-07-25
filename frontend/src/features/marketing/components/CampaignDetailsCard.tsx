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
import type { LucideIcon } from "lucide-react";
import type { Campaign, CampaignType } from "../types/campaign";
import { CampaignTypeBadge } from "./CampaignTypeBadge";
import { CampaignStatusBadge } from "./CampaignStatusBadge";

const typeIcons: Record<
  CampaignType,
  { icon: LucideIcon; label: string; color: string }
> = {
  EMAIL: {
    icon: Mail,
    label: "Email",
    color: "text-blue-600 dark:text-blue-400",
  },
  WHATSAPP: {
    icon: MessageCircle,
    label: "WhatsApp",
    color: "text-green-600 dark:text-green-400",
  },
  SMS: {
    icon: MessageSquare,
    label: "SMS",
    color: "text-purple-600 dark:text-purple-400",
  },
};

interface CampaignDetailsCardProps {
  campaign: Campaign;
}

export function CampaignDetailsCard({
  campaign,
}: CampaignDetailsCardProps) {
  const typeConfig = typeIcons[campaign.type];
  const TypeIcon = typeConfig.icon;

  const audienceLabel = campaign.audience
    .replace(/_/g, " ")
    .replace(/\b\w/g, (c) => c.toUpperCase());

  const detailItems = [
    {
      icon: Users,
      color: "text-blue-600 dark:text-blue-400",
      label: "Audience",
      value: audienceLabel,
    },
    {
      icon: Users,
      color: "text-indigo-600 dark:text-indigo-400",
      label: "Audience Count",
      value: campaign.audienceCount.toLocaleString(),
    },
    {
      icon: CalendarDays,
      color: "text-emerald-600 dark:text-emerald-400",
      label: "Start Date",
      value: new Date(campaign.startDate).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      }),
    },
    {
      icon: CalendarDays,
      color: "text-orange-600 dark:text-orange-400",
      label: "End Date",
      value: new Date(campaign.endDate).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      }),
    },
    {
      icon: User,
      color: "text-slate-600 dark:text-slate-400",
      label: "Assigned To",
      value: campaign.assignedToName,
    },
    {
      icon: User,
      color: "text-cyan-600 dark:text-cyan-400",
      label: "Created By",
      value: campaign.createdByName,
    },
    {
      icon: DollarSign,
      color: "text-amber-600 dark:text-amber-400",
      label: "Budget",
      value: campaign.budget
        ? `$${campaign.budget.toLocaleString()}`
        : "—",
    },
  ];

  if (campaign.notes) {
    detailItems.push({
      icon: FileText,
      color: "text-slate-600 dark:text-slate-400",
      label: "Notes",
      value: campaign.notes,
    });
  }

  return (
    <div className="space-y-6">
      {/* Type & Status Header */}
      <div className="flex items-center justify-between p-4 rounded-xl bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-700">
        <div className="flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-white dark:bg-slate-800 shadow-sm">
            <TypeIcon className={`h-6 w-6 ${typeConfig.color}`} />
          </div>
          <div>
            <p className="text-sm font-medium text-slate-500 dark:text-slate-400">
              Campaign Type
            </p>
            <p className="text-lg font-bold text-slate-900 dark:text-white">
              {typeConfig.label}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <CampaignTypeBadge type={campaign.type} />
          <CampaignStatusBadge status={campaign.status} />
        </div>
      </div>

      {/* Description */}
      {campaign.description && (
        <div className="rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 p-5">
          <h3 className="font-bold text-lg text-slate-900 dark:text-white mb-1">
            Description
          </h3>
          <p className="text-slate-700 dark:text-slate-300">
            {campaign.description}
          </p>
        </div>
      )}

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

      {/* Performance Placeholder */}
      <div className="rounded-xl bg-gradient-to-br from-amber-50 to-yellow-50 dark:from-amber-950/20 dark:to-yellow-950/20 border border-amber-200 dark:border-amber-800 p-5">
        <div className="flex items-center gap-2 mb-3">
          <BadgeInfo className="h-5 w-5 text-amber-600 dark:text-amber-400" />
          <h3 className="font-semibold text-amber-900 dark:text-amber-200">
            Campaign Performance
          </h3>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
          <div className="p-3 rounded-lg bg-white/60 dark:bg-slate-900/60 border border-amber-100 dark:border-amber-800/50">
            <p className="text-xs font-medium text-amber-700 dark:text-amber-300">
              Audience Count
            </p>
            <p className="text-lg font-bold text-amber-900 dark:text-amber-100">
              {campaign.audienceCount.toLocaleString()}
            </p>
          </div>
          <div className="p-3 rounded-lg bg-white/60 dark:bg-slate-900/60 border border-amber-100 dark:border-amber-800/50">
            <p className="text-xs font-medium text-amber-700 dark:text-amber-300">
              Estimated Reach
            </p>
            <p className="text-lg font-bold text-amber-900 dark:text-amber-100">
              {campaign.audienceCount.toLocaleString()}
            </p>
          </div>
          <div className="p-3 rounded-lg bg-white/60 dark:bg-slate-900/60 border border-amber-100 dark:border-amber-800/50">
            <p className="text-xs font-medium text-amber-700 dark:text-amber-300">
              Status
            </p>
            <p className="text-lg font-bold text-amber-900 dark:text-amber-100">
              <CampaignStatusBadge status={campaign.status} />
            </p>
          </div>
          <div className="p-3 rounded-lg bg-white/60 dark:bg-slate-900/60 border border-amber-100 dark:border-amber-800/50">
            <p className="text-xs font-medium text-amber-700 dark:text-amber-300">
              Campaign Duration
            </p>
            <p className="text-lg font-bold text-amber-900 dark:text-amber-100">
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
          Clicked, Conversion) will be available after backend/API integration.
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

