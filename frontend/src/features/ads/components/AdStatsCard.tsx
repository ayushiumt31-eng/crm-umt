import { TrendingUp, PlayCircle, Layers, FolderOpen, DollarSign, Wallet } from "lucide-react";
import type { AdCampaign } from "../types/adCampaign";
import type { AdSet } from "../types/adSet";
import type { Ad } from "../types/ad";

interface AdStatsCardProps {
  campaigns: AdCampaign[];
  adSets: AdSet[];
  ads: Ad[];
}

interface StatItem {
  label: string;
  value: number | string;
  icon: typeof TrendingUp;
  gradient: string;
  iconGradient: string;
}

export function AdStatsCard({ campaigns, adSets, ads }: AdStatsCardProps) {
  const totalBudget = campaigns.reduce((sum, c) => sum + c.budget, 0);
  const totalSpend = campaigns.reduce((sum, c) => sum + c.spent, 0);

  const stats: StatItem[] = [
    {
      label: "Total Campaigns",
      value: campaigns.length,
      icon: TrendingUp,
      gradient: "bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-950/40 dark:to-blue-900/20",
      iconGradient: "bg-gradient-to-br from-blue-500 to-blue-600",
    },
    {
      label: "Active Campaigns",
      value: campaigns.filter((c) => c.status === "ACTIVE").length,
      icon: PlayCircle,
      gradient: "bg-gradient-to-br from-green-50 to-green-100 dark:from-green-950/40 dark:to-green-900/20",
      iconGradient: "bg-gradient-to-br from-green-500 to-green-600",
    },
    {
      label: "Total Ad Sets",
      value: adSets.length,
      icon: Layers,
      gradient: "bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-950/40 dark:to-purple-900/20",
      iconGradient: "bg-gradient-to-br from-purple-500 to-purple-600",
    },
    {
      label: "Total Ads",
      value: ads.length,
      icon: FolderOpen,
      gradient: "bg-gradient-to-br from-cyan-50 to-cyan-100 dark:from-cyan-950/40 dark:to-cyan-900/20",
      iconGradient: "bg-gradient-to-br from-cyan-500 to-cyan-600",
    },
    {
      label: "Total Budget",
      value: `₹${(totalBudget / 1000).toFixed(0)}K`,
      icon: DollarSign,
      gradient: "bg-gradient-to-br from-orange-50 to-amber-100 dark:from-orange-950/40 dark:to-amber-900/20",
      iconGradient: "bg-gradient-to-br from-orange-500 to-amber-600",
    },
    {
      label: "Total Spend",
      value: `₹${(totalSpend / 1000).toFixed(0)}K`,
      icon: Wallet,
      gradient: "bg-gradient-to-br from-rose-50 to-rose-100 dark:from-rose-950/40 dark:to-rose-900/20",
      iconGradient: "bg-gradient-to-br from-rose-500 to-rose-600",
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
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
