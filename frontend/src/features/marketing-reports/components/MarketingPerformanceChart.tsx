import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import type { CampaignPerformance } from "../types/marketingReport";

interface MarketingPerformanceChartProps {
  data: CampaignPerformance[];
  metrics?: ("leads" | "conversions" | "revenue")[];
  title?: string;
}

const METRIC_COLORS: Record<string, string> = {
  leads: "#3b82f6",
  conversions: "#10b981",
  revenue: "#f59e0b",
};

const METRIC_LABELS: Record<string, string> = {
  leads: "Leads",
  conversions: "Conversions",
  revenue: "Revenue",
};

export function MarketingPerformanceChart({
  data,
  metrics = ["leads", "conversions", "revenue"],
  title = "Campaign Performance",
}: MarketingPerformanceChartProps) {
  const chartData = data.slice(0, 10).map((item) => ({
    name: item.campaignName.length > 20 ? item.campaignName.substring(0, 20) + "..." : item.campaignName,
    leads: item.leads,
    conversions: item.conversions,
    revenue: Math.round(item.revenue / 1000),
  }));

  return (
    <div className="rounded-2xl border border-slate-200/50 dark:border-slate-800/50 bg-white dark:bg-slate-900 shadow-sm p-6">
      <h3 className="font-bold text-slate-900 dark:text-white mb-4">{title}</h3>
      <div className="h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={chartData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
            <XAxis dataKey="name" tick={{ fontSize: 11 }} stroke="#94a3b8" />
            <YAxis tick={{ fontSize: 11 }} stroke="#94a3b8" />
            <Tooltip
              contentStyle={{
                backgroundColor: "#1e293b",
                border: "none",
                borderRadius: "8px",
                color: "#f1f5f9",
              }}
            />
            <Legend />
            {metrics.map((metric) => (
              <Bar
                key={metric}
                dataKey={metric}
                name={METRIC_LABELS[metric]}
                fill={METRIC_COLORS[metric]}
                radius={[4, 4, 0, 0]}
              />
            ))}
          </BarChart>
        </ResponsiveContainer>
      </div>
      <p className="text-xs text-amber-600 dark:text-amber-400 italic mt-4">
        Demo analytics — real marketing metrics will be available after backend integration.
      </p>
    </div>
  );
}
