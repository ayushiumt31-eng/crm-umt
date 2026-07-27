import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, TrendingUp, BarChart3, Users, Target, DollarSign, Zap } from "lucide-react";
import { marketingReportService } from "../services/marketingReportService";
import { MarketingChannelChart } from "../components/MarketingChannelChart";
import { MarketingReportExport } from "../components/MarketingReportExport";
import { ReportSection } from "../components/ReportSection";
import type { ChannelPerformance } from "../types/marketingReport";

export default function ChannelReports() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<ChannelPerformance[]>([]);

  useEffect(() => {
    marketingReportService.getChannelPerformanceReport().then((result) => {
      setData(result);
      setLoading(false);
    });
  }, []);

  const formatCurrency = (value: number) =>
    new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(value);

  const formatPercentage = (value: number) => `${value.toFixed(2)}%`;

  return (
    <div className="space-y-8">
      <div className="rounded-2xl bg-gradient-to-r from-purple-600 via-indigo-500 to-blue-600 dark:from-purple-900 dark:via-indigo-900 dark:to-blue-900 p-8 shadow-lg overflow-hidden relative">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-0 left-0 w-96 h-96 bg-white/20 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-blue-300/20 rounded-full blur-3xl animate-pulse" />
        </div>
        <div className="relative z-10">
          <div className="flex items-center gap-4 mb-4">
            <button onClick={() => navigate("/marketing/reports")}
              className="flex h-10 w-10 items-center justify-center rounded-lg bg-white/20 backdrop-blur-md text-white border border-white/30 shadow-lg hover:bg-white/30 transition-all">
              <ArrowLeft className="h-5 w-5" />
            </button>
            <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-white/20 backdrop-blur-md text-white border border-white/30 shadow-lg">
              <BarChart3 className="h-7 w-7" />
            </div>
            <div>
              <h1 className="text-4xl font-bold text-white drop-shadow-lg">Channel Reports</h1>
              <p className="text-indigo-100 text-lg">Compare marketing channel performance</p>
            </div>
            <div className="ml-auto">
              <MarketingReportExport
                data={data as unknown as Record<string, unknown>[]}
                filename="channel-performance"
                label="Export"
              />
            </div>
          </div>
        </div>
      </div>

      {loading ? (
        <div className="text-center py-12">
          <div className="inline-flex h-10 w-10 items-center justify-center rounded-full border-2 border-blue-600 border-t-transparent animate-spin" />
          <p className="mt-4 text-slate-500">Loading channel data...</p>
        </div>
      ) : (
        <>
          <MarketingChannelChart data={data} metrics={["leads", "conversions", "spend", "revenue"]} title="Channel Comparison" />

          {/* Channel comparison table */}
          <ReportSection title="Channel Details" subtitle="Detailed metrics by marketing channel">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-slate-50 dark:bg-slate-800/50 border-b border-slate-200 dark:border-slate-700">
                  <tr>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-slate-900 dark:text-white">Channel</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-slate-900 dark:text-white">Leads</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-slate-900 dark:text-white">Conversions</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-slate-900 dark:text-white">Spend</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-slate-900 dark:text-white">Revenue</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-slate-900 dark:text-white">ROI</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200 dark:divide-slate-700">
                  {data.map((channel) => (
                    <tr key={channel.channel} className="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                      <td className="px-6 py-4 text-sm font-semibold text-slate-900 dark:text-white">
                        <div className="flex items-center gap-2">
                          {channel.channel === "EMAIL" && <TrendingUp className="h-4 w-4 text-blue-500" />}
                          {channel.channel === "WHATSAPP" && <TrendingUp className="h-4 w-4 text-green-500" />}
                          {channel.channel === "SOCIAL_MEDIA" && <TrendingUp className="h-4 w-4 text-purple-500" />}
                          {channel.channel === "ADS" && <TrendingUp className="h-4 w-4 text-cyan-500" />}
                          {channel.channel === "AUTOMATION" && <TrendingUp className="h-4 w-4 text-amber-500" />}
                          {channel.channelLabel}
                        </div>
                      </td>
                      <td className="px-6 py-4 text-sm text-slate-600 dark:text-slate-400">{channel.leads.toLocaleString()}</td>
                      <td className="px-6 py-4 text-sm text-slate-600 dark:text-slate-400">{channel.conversions.toLocaleString()}</td>
                      <td className="px-6 py-4 text-sm text-slate-600 dark:text-slate-400">{formatCurrency(channel.spend)}</td>
                      <td className="px-6 py-4 text-sm font-medium text-green-600 dark:text-green-400">{formatCurrency(channel.revenue)}</td>
                      <td className="px-6 py-4 text-sm font-semibold text-emerald-600 dark:text-emerald-400">{formatPercentage(channel.roi)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </ReportSection>

          <div className="rounded-xl bg-gradient-to-br from-amber-50 to-yellow-50 dark:from-amber-950/20 dark:to-yellow-950/20 border border-amber-200 dark:border-amber-800 p-4">
            <p className="text-sm text-amber-700 dark:text-amber-300">
              <strong>Demo data:</strong> Channel performance comparisons are based on demo data. Real channel analytics will be available after backend integration.
            </p>
          </div>
        </>
      )}
    </div>
  );
}
