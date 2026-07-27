import { BarChart3, TrendingUp, Users, DollarSign, Target, Eye, Activity, Zap } from "lucide-react";
import type { LucideIcon } from "lucide-react";

interface MarketingReportStatsCardProps {
  label: string;
  value: string | number;
  icon: LucideIcon;
  color: string;
}

export function MarketingReportStatsCard({ label, value, icon: Icon, color }: MarketingReportStatsCardProps) {
  return (
    <div className={`rounded-xl bg-gradient-to-br ${color} p-6 text-white shadow-sm hover:shadow-lg transition-all duration-300`}>
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-sm font-semibold text-white/80">{label}</h3>
        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-white/20 backdrop-blur-md">
          <Icon className="h-5 w-5" />
        </div>
      </div>
      <div className="text-3xl font-bold">{value}</div>
    </div>
  );
}

export const STAT_COLORS = [
  "from-blue-500 to-blue-600",
  "from-green-500 to-green-600",
  "from-purple-500 to-purple-600",
  "from-cyan-500 to-cyan-600",
  "from-amber-500 to-amber-600",
  "from-emerald-500 to-emerald-600",
  "from-rose-500 to-rose-600",
  "from-indigo-500 to-indigo-600",
];
