import { MessageCircle, CalendarDays, User, Clock, Users, FileText, BadgeInfo } from "lucide-react";
import type { WhatsAppCampaign } from "../types/whatsappCampaign";
import { WhatsAppCampaignStatusBadge } from "./WhatsAppCampaignStatusBadge";

interface WhatsAppCampaignDetailsCardProps {
  campaign: WhatsAppCampaign;
}

export function WhatsAppCampaignDetailsCard({
  campaign,
}: WhatsAppCampaignDetailsCardProps) {
  const audienceLabel = campaign.audienceType
    .replace(/_/g, " ")
    .replace(/\b\w/g, (c) => c.toUpperCase());

  const analyticsItems = [
    { label: "Total Recipients", value: campaign.recipientCount },
    { label: "Sent", value: 0 },
    { label: "Delivered", value: 0 },
    { label: "Failed", value: 0 },
    { label: "Read", value: 0 },
  ];

  const detailFields = [
    {
      icon: MessageCircle,
      iconBg: "bg-green-100 dark:bg-green-900/30",
      iconColor: "text-green-600 dark:text-green-400",
      label: "Campaign Name",
      value: campaign.name,
    },
    {
      icon: MessageCircle,
      iconBg: "bg-blue-100 dark:bg-blue-900/30",
      iconColor: "text-blue-600 dark:text-blue-400",
      label: "Status",
      value: <WhatsAppCampaignStatusBadge status={campaign.status} />,
    },
    {
      icon: MessageCircle,
      iconBg: "bg-purple-100 dark:bg-purple-900/30",
      iconColor: "text-purple-600 dark:text-purple-400",
      label: "Template",
      value: campaign.templateName,
    },
    {
      icon: FileText,
      iconBg: "bg-indigo-100 dark:bg-indigo-900/30",
      iconColor: "text-indigo-600 dark:text-indigo-400",
      label: "Message",
      value: (
        <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-700">
          <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed whitespace-pre-wrap">
            {campaign.message}
          </p>
        </div>
      ),
    },
    {
      icon: Users,
      iconBg: "bg-teal-100 dark:bg-teal-900/30",
      iconColor: "text-teal-600 dark:text-teal-400",
      label: "Audience",
      value: audienceLabel,
    },
    {
      icon: Users,
      iconBg: "bg-cyan-100 dark:bg-cyan-900/30",
      iconColor: "text-cyan-600 dark:text-cyan-400",
      label: "Recipients",
      value: campaign.recipientCount.toLocaleString(),
    },
    {
      icon: CalendarDays,
      iconBg: "bg-amber-100 dark:bg-amber-900/30",
      iconColor: "text-amber-600 dark:text-amber-400",
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
      iconBg: "bg-orange-100 dark:bg-orange-900/30",
      iconColor: "text-orange-600 dark:text-orange-400",
      label: "Created By",
      value: campaign.createdByName,
    },
    {
      icon: Clock,
      iconBg: "bg-slate-200 dark:bg-slate-800",
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
      iconBg: "bg-slate-200 dark:bg-slate-800",
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
  ];

  return (
    <div className="space-y-8">
      {/* Details Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {detailFields.map((field, idx) => (
          <div
            key={idx}
            className="bg-white dark:bg-slate-800 rounded-xl p-6 border border-slate-200 dark:border-slate-700 shadow-sm hover:shadow-md transition-shadow"
          >
            <div className="flex items-start gap-4">
              <div
                className={`flex h-12 w-12 items-center justify-center rounded-lg flex-shrink-0 ${field.iconBg} ${field.iconColor}`}
              >
                <field.icon className="h-6 w-6" />
              </div>
              <div className="flex-1">
                <label className="block text-sm font-semibold text-slate-600 dark:text-slate-400 mb-1">
                  {field.label}
                </label>
                <div className="text-lg text-slate-900 dark:text-white font-medium">
                  {field.value}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Notes Section */}
      {campaign.notes && (
        <div className="bg-white dark:bg-slate-800 rounded-xl p-6 border border-slate-200 dark:border-slate-700 shadow-sm">
          <div className="flex items-start gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-slate-100 dark:bg-slate-900/40 text-slate-600 dark:text-slate-400 flex-shrink-0">
              <FileText className="h-6 w-6" />
            </div>
            <div className="flex-1">
              <label className="block text-sm font-semibold text-slate-600 dark:text-slate-400 mb-1">
                Notes
              </label>
              <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-900/50 border-2 border-slate-200 dark:border-slate-700">
                <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed whitespace-pre-wrap">
                  {campaign.notes}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Analytics Placeholder */}
      <div className="bg-white dark:bg-slate-800 rounded-xl p-6 border border-slate-200 dark:border-slate-700 shadow-sm">
        <div className="flex items-start gap-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-amber-100 dark:bg-amber-900/40 text-amber-600 dark:text-amber-400 flex-shrink-0">
            <BadgeInfo className="h-6 w-6" />
          </div>
          <div className="flex-1">
            <label className="block text-sm font-semibold text-slate-600 dark:text-slate-400 mb-3">
              WhatsApp Analytics (Demo)
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
              {analyticsItems.map((item) => (
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
            <p className="text-xs text-amber-600 dark:text-amber-400 italic mt-3">
              Demo analytics — real WhatsApp delivery tracking will be available
              after backend/API integration.
            </p>
          </div>
        </div>
      </div>

      {/* Info Notice */}
      <div className="rounded-xl bg-gradient-to-br from-amber-50 to-yellow-50 dark:from-amber-950/20 dark:to-yellow-950/20 border border-amber-200 dark:border-amber-800 p-4">
        <p className="text-sm text-amber-700 dark:text-amber-300">
          <strong>Note:</strong> WhatsApp messaging and delivery analytics will be
          available after backend WhatsApp API integration.
        </p>
      </div>
    </div>
  );
}

