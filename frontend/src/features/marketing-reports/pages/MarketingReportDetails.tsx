import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, TrendingUp, Download, Printer, FileSpreadsheet } from "lucide-react";
import { marketingReportService } from "../services/marketingReportService";
import type { MarketingReportDetail } from "../types/marketingReport";

export default function MarketingReportDetails() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [report, setReport] = useState<MarketingReportDetail | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;
    marketingReportService.getReportDetail(id).then((result) => {
      setReport(result);
      setLoading(false);
    });
  }, [id]);

  const formatCurrency = (value: number) =>
    new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(value);

  const handlePrint = () => window.print();

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto text-center py-12">
        <div className="inline-flex h-10 w-10 items-center justify-center rounded-full border-2 border-blue-600 border-t-transparent animate-spin" />
        <p className="mt-4 text-slate-500">Loading report details...</p>
      </div>
    );
  }

  if (!report) {
    return (
      <div className="max-w-4xl mx-auto text-center py-12">
        <p className="text-slate-500">Report not found.</p>
        <button
          onClick={() => navigate("/marketing/reports")}
          className="mt-4 text-blue-600 hover:underline"
        >
          Back to Reports
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="rounded-2xl bg-gradient-to-r from-indigo-600 via-blue-500 to-purple-600 dark:from-indigo-900 dark:via-blue-900 dark:to-purple-900 p-8 shadow-lg overflow-hidden relative">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-0 left-0 w-96 h-96 bg-white/20 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-purple-300/20 rounded-full blur-3xl animate-pulse" />
        </div>
        <div className="relative z-10">
          <div className="flex items-center gap-4 mb-4">
            <button
              onClick={() => navigate("/marketing/reports")}
              className="flex h-10 w-10 items-center justify-center rounded-lg bg-white/20 backdrop-blur-md text-white border border-white/30 shadow-lg hover:bg-white/30 transition-all"
              title="Back to Reports"
            >
              <ArrowLeft className="h-5 w-5" />
            </button>
            <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-white/20 backdrop-blur-md text-white border border-white/30 shadow-lg">
              <TrendingUp className="h-7 w-7" />
            </div>
            <div className="flex-1">
              <h1 className="text-4xl font-bold text-white drop-shadow-lg">{report.reportName}</h1>
              <p className="text-indigo-100 text-lg">Report Details</p>
            </div>
            <div className="flex gap-2">
              <button
                onClick={handlePrint}
                className="flex h-10 w-10 items-center justify-center rounded-lg bg-white/20 backdrop-blur-md text-white border border-white/30 hover:bg-white/30 transition-all"
                title="Print"
              >
                <Printer className="h-5 w-5" />
              </button>
              <button
                className="inline-flex items-center gap-2 rounded-lg bg-white/20 hover:bg-white/30 backdrop-blur-md text-white border border-white/30 px-4 py-2 text-sm font-semibold transition-all"
              >
                <Download className="h-4 w-4" />
                Export
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
        <div className="xl:col-span-2 space-y-8">
          <div className="rounded-2xl border border-slate-200/50 dark:border-slate-800/50 bg-white dark:bg-slate-900 shadow-sm overflow-hidden">
            <div className="px-6 py-4 border-b border-slate-200/50 dark:border-slate-800/50 bg-gradient-to-r from-blue-50/50 to-indigo-50/50 dark:from-blue-950/20 dark:to-indigo-950/20">
              <h3 className="font-bold text-slate-900 dark:text-white">Report Information</h3>
            </div>
            <div className="p-6">
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                <div>
                  <p className="text-xs font-medium text-slate-500">Report Name</p>
                  <p className="text-sm font-semibold text-slate-900 dark:text-white">{report.reportName}</p>
                </div>
                <div>
                  <p className="text-xs font-medium text-slate-500">Channel</p>
                  <p className="text-sm font-semibold text-slate-900 dark:text-white">{report.channel}</p>
                </div>
                <div>
                  <p className="text-xs font-medium text-slate-500">Campaign</p>
                  <p className="text-sm font-semibold text-slate-900 dark:text-white">{report.campaign}</p>
                </div>
                <div>
                  <p className="text-xs font-medium text-slate-500">Date Range</p>
                  <p className="text-sm font-semibold text-slate-900 dark:text-white">{report.dateRange}</p>
                </div>
                <div>
                  <p className="text-xs font-medium text-slate-500">Total Leads</p>
                  <p className="text-sm font-semibold text-slate-900 dark:text-white">{report.totalLeads.toLocaleString()}</p>
                </div>
                <div>
                  <p className="text-xs font-medium text-slate-500">Conversions</p>
                  <p className="text-sm font-semibold text-slate-900 dark:text-white">{report.conversions.toLocaleString()}</p>
                </div>
                <div>
                  <p className="text-xs font-medium text-slate-500">Spend</p>
                  <p className="text-sm font-semibold text-slate-900 dark:text-white">{formatCurrency(report.spend)}</p>
                </div>
                <div>
                  <p className="text-xs font-medium text-slate-500">Revenue</p>
                  <p className="text-sm font-semibold text-green-600 dark:text-green-400">{formatCurrency(report.revenue)}</p>
                </div>
                <div>
                  <p className="text-xs font-medium text-slate-500">ROI</p>
                  <p className="text-sm font-semibold text-emerald-600 dark:text-emerald-400">{report.roi}%</p>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4 mt-4 pt-4 border-t border-slate-200 dark:border-slate-700">
                <div>
                  <p className="text-xs font-medium text-slate-500">Created Date</p>
                  <p className="text-sm text-slate-900 dark:text-white">
                    {new Date(report.createdAt).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </p>
                </div>
                <div>
                  <p className="text-xs font-medium text-slate-500">Last Updated</p>
                  <p className="text-sm text-slate-900 dark:text-white">
                    {new Date(report.lastUpdated).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-8">
          <div className="rounded-2xl border border-slate-200/50 dark:border-slate-800/50 bg-white dark:bg-slate-900 shadow-sm overflow-hidden">
            <div className="px-6 py-4 border-b border-slate-200/50 dark:border-slate-800/50 bg-gradient-to-r from-amber-50/50 to-yellow-50/50 dark:from-amber-950/20 dark:to-yellow-950/20">
              <h3 className="font-bold text-slate-900 dark:text-white">Quick Summary</h3>
            </div>
            <div className="p-6 space-y-4">
              <div className="flex justify-between items-center pb-2 border-b border-slate-100 dark:border-slate-800">
                <span className="text-sm text-slate-600 dark:text-slate-400">Total Leads</span>
                <span className="text-sm font-bold text-slate-900 dark:text-white">{report.totalLeads.toLocaleString()}</span>
              </div>
              <div className="flex justify-between items-center pb-2 border-b border-slate-100 dark:border-slate-800">
                <span className="text-sm text-slate-600 dark:text-slate-400">Conversions</span>
                <span className="text-sm font-bold text-slate-900 dark:text-white">{report.conversions.toLocaleString()}</span>
              </div>
              <div className="flex justify-between items-center pb-2 border-b border-slate-100 dark:border-slate-800">
                <span className="text-sm text-slate-600 dark:text-slate-400">Conversion Rate</span>
                <span className="text-sm font-bold text-green-600 dark:text-green-400">
                  {report.totalLeads > 0
                    ? ((report.conversions / report.totalLeads) * 100).toFixed(1)
                    : 0}%
                </span>
              </div>
              <div className="flex justify-between items-center pb-2 border-b border-slate-100 dark:border-slate-800">
                <span className="text-sm text-slate-600 dark:text-slate-400">Cost per Conversion</span>
                <span className="text-sm font-bold text-amber-600 dark:text-amber-400">
                  {report.conversions > 0 ? formatCurrency(report.spend / report.conversions) : "—"}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-slate-600 dark:text-slate-400">Revenue per Lead</span>
                <span className="text-sm font-bold text-emerald-600 dark:text-emerald-400">
                  {report.totalLeads > 0 ? formatCurrency(report.revenue / report.totalLeads) : "—"}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="rounded-xl bg-gradient-to-br from-amber-50 to-yellow-50 dark:from-amber-950/20 dark:to-yellow-950/20 border border-amber-200 dark:border-amber-800 p-4">
        <p className="text-sm text-amber-700 dark:text-amber-300">
          <strong>Demo data:</strong> This report contains demo/dummy data. Real marketing analytics will be available after backend integration.
        </p>
      </div>
    </div>
  );
}
