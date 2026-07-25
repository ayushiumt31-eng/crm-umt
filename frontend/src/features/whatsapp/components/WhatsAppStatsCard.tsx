import { MessageCircle, Clock, Rocket, CheckCircle2, Users } from "lucide-react";
import type { WhatsAppCampaign } from "../types/whatsappCampaign";

interface WhatsAppStatsCardProps {
  campaigns: WhatsAppCampaign[];
}

interface StatItem {
  label: string;
  value: number | string;
  icon: typeof MessageCircle;
  gradient: string;
  iconGradient: string;
}

export function WhatsAppStatsCard({ campaigns }: WhatsAppStatsCardProps) {
  const totalRecipients = campaigns.reduce(
    (sum, c) => sum + c.recipientCount,
    0
  );

  const stats: StatItem[] = [
    {
      label: "Total Campaigns",
      value: campaigns.length,
      icon: MessageCircle,
      gradient:
        "bg-gradient-to-br from-green-50 to-green-100 dark:from-green-950/40 dark:to-green-900/20",
      iconGradient: "bg-gradient-to-br from-green-500 to-green-600",
    },
    {
      label: "Draft",
      value: campaigns.filter((c) => c.status === "DRAFT").length,
      icon: Clock,
      gradient:
        "bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-950/40 dark:to-slate-900/20",
      iconGradient: "bg-gradient-to-br from-slate-500 to-slate-600",
    },
    {
      label: "Scheduled",
      value: campaigns.filter((c) => c.status === "SCHEDULED").length,
      icon: Rocket,
      gradient:
        "bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-950/40 dark:to-blue-900/20",
      iconGradient: "bg-gradient-to-br from-blue-500 to-blue-600",
    },
    {
      label: "Sent",
      value: campaigns.filter((c) => c.status === "SENT").length,
      icon: CheckCircle2,
      gradient:
        "bg-gradient-to-br from-emerald-50 to-emerald-100 dark:from-emerald-950/40 dark:to-emerald-900/20",
      iconGradient: "bg-gradient-to-br from-emerald-500 to-emerald-600",
    },
    {
      label: "Total Recipients",
      value: totalRecipients.toLocaleString(),
      icon: Users,
      gradient:
        "bg-gradient-to-br from-cyan-50 to-cyan-100 dark:from-cyan-950/40 dark:to-cyan-900/20",
      iconGradient: "bg-gradient-to-br from-cyan-500 to-cyan-600",
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
      {stats.map((stat) => {
        const Icon = stat.icon;
        return (
          <div
            key={stat.label}
            className={`group rounded-xl ${stat.gradient} p-6 border border-slate-200/50 dark:border-slate-800/50 shadow-sm hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1`}
          >
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-sm font-semibold text-slate-900 dark:text-slate-200">
                {stat.label}
              </h3>
              <div
                className={`flex h-10 w-10 items-center justify-center rounded-lg ${stat.iconGradient} text-white shadow-md`}
              >
                <Icon className="h-5 w-5" />
              </div>
            </div>
            <div className="text-3xl font-bold text-slate-900 dark:text-slate-100">
              {stat.value}
            </div>
          </div>
        );
      })}
    </div>
  );
}

