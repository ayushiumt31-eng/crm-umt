import type { LucideIcon } from "lucide-react";

interface PayrollStatsCardProps {
  title: string;
  value: string | number;
  icon: LucideIcon;
  gradient: string;
  iconBg: string;
}

export function PayrollStatsCard({ title, value, icon: Icon, gradient, iconBg }: PayrollStatsCardProps) {
  return (
    <div className={`group rounded-xl bg-gradient-to-br ${gradient} p-6 border shadow-sm hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1`}>
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-sm font-semibold opacity-90">{title}</h3>
        <div className={`flex h-10 w-10 items-center justify-center rounded-lg ${iconBg} text-white shadow-md`}>
          <Icon className="h-5 w-5" />
        </div>
      <div className="text-2xl font-bold">{value}</div>
      <p className="text-xs opacity-70 mt-2">Demo data</p>
    </div>
  );
}
