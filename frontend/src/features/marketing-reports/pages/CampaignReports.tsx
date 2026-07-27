import { useState, useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, TrendingUp } from "lucide-react";
import { marketingReportService } from "../services/marketingReportService";
import { MarketingPerformanceChart } from "../components/MarketingPerformanceChart";
import { CampaignPerformanceTable } from "../components/CampaignPerformanceTable";
import { MarketingReportExport } from "../components/MarketingReportExport";
import type { CampaignPerformance } from "../types/marketingReport";

export default function CampaignReports() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<CampaignPerformance[]>([]);

  useEffect(() => {
    marketingReportService.getCampaignPerformanceReport().then((result) => {
      setData(result);
      setLoading(false);
    });
  }, []);

  return (
    <div className="space-y-8">
      <div className="rounded-2xl bg-gradient-to-r from-blue-600 via-indigo-500 to-purple-600 dark:from-blue-900 dark:via-indigo-900 dark:to-purple-900 p-8 shadow-lg overflow-hidden relative">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-0 left-0 w-96 h-96 bg-white/20 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-purple-300/20 rounded-full blur-3xl animate-pulse" />
        </div>
        <div className="relative z-10">
          <div className="flex items-center gap-4 mb-4">
            <button onClick={() => navigate("/marketing/reports")}
              className="flex h-10 w-10 items-center justify-center rounded-lg bg-white/20 backdrop-blur-md text-white border border-white/30 shadow-lg hover:bg-white/30 transition-all">
              <ArrowLeft className="h-5 w-5" />
            </button>
            <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-white/20 backdrop-blur-md text-white border border-white/30 shadow-lg">
              <TrendingUp className="h-7 w-7" />
            </div>
            <div>
              <h1 className="text-4xl font-bold text-white drop-shadow-lg">Campaign Reports</h1>
              <p className="text-indigo-100 text-lg">Detailed campaign performance analysis</p>
            </div>
            <div className="ml-auto">
              <MarketingReportExport
                data={data as unknown as Record<string, unknown>[]}
                filename="campaign-reports"
                label="Export"
              />
            </div>
          </div>
        </div>
      </div>

      {loading ? (
        <div className="text-center py-12">
          <div className="inline-flex h-10 w-10 items-center justify-center rounded-full border-2 border-blue-600 border-t-transparent animate-spin" />
          <p className="mt-4 text-slate-500">Loading campaign data...</p>
        </div>
      ) : (
        <>
          <MarketingPerformanceChart data={data} />
          <div className="rounded-2xl border border-slate-200/50 dark:border-slate-800/50 bg-white dark:bg-slate-900 shadow-sm p-6">
            <h3 className="font-bold text-slate-900 dark:text-white mb-4">All Campaigns</h3>
            <CampaignPerformanceTable data={data} />
          </div>

          <div className="rounded-xl bg-gradient-to-br from-amber-50 to-yellow-50 dark:from-amber-950/20 dark:to-yellow-950/20 border border-amber-200 dark:border-amber-800 p-4">
            <p className="text-sm text-amber-700 dark:text-amber-300">
              <strong>Demo data:</strong> These campaign performance metrics are for demonstration only. Real metrics will be available after backend integration.
            </p>
          </div>
        </>
      )}
    </div>
  );
}
