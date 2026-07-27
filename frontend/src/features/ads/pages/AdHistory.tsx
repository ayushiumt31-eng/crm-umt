import { useState, useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { Search, History, TrendingUp, Download, ArrowLeft } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/common/DataTable";
import { adHistoryService } from "../services/adHistoryService";
import type { AdHistory as AdHistoryType } from "../types/adHistory";

export default function AdHistoryPage() {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [history, setHistory] = useState<AdHistoryType[]>([]);

  useEffect(() => {
    adHistoryService.getAdHistory().then(setHistory);
  }, []);

  const filteredHistory = useMemo(() => {
    return history.filter((h) => {
      const searchStr = searchTerm.toLowerCase();
      return (
        !searchTerm ||
        h.campaignName.toLowerCase().includes(searchStr) ||
        (h.adSetName && h.adSetName.toLowerCase().includes(searchStr)) ||
        (h.adName && h.adName.toLowerCase().includes(searchStr)) ||
        h.performedByName.toLowerCase().includes(searchStr)
      );
    });
  }, [history, searchTerm]);

  const handleExportCSV = () => {
    const headers = ["Campaign", "Ad Set", "Ad", "Platform", "Action", "Status", "Date", "Performed By"];
    const rows = filteredHistory.map((h) => [
      h.campaignName,
      h.adSetName || "",
      h.adName || "",
      h.platform,
      h.action,
      h.status,
      new Date(h.date).toLocaleDateString("en-US"),
      h.performedByName,
    ]);
    const csv = [headers.join(","), ...rows.map((r) => r.join(","))].join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `ad-history-${new Date().toISOString().split("T")[0]}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const renderActionBadge = (action: string) => {
    const config: Record<string, string> = {
      CREATED: "bg-green-100 text-green-700 dark:bg-green-900/50 dark:text-green-300",
      UPDATED: "bg-blue-100 text-blue-700 dark:bg-blue-900/50 dark:text-blue-300",
      PAUSED: "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/50 dark:text-yellow-300",
      RESUMED: "bg-green-100 text-green-700 dark:bg-green-900/50 dark:text-green-300",
      COMPLETED: "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/50 dark:text-emerald-300",
      CANCELLED: "bg-red-100 text-red-700 dark:bg-red-900/50 dark:text-red-300",
    };
    return (
      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold ${config[action] || "bg-slate-100 text-slate-700"}`}>
        {action}
      </span>
    );
  };

  const columns = useMemo(() => [
    { key: "campaignName" as keyof AdHistoryType, label: "Campaign", width: "180px" as const, render: (value: string) => <p className="font-semibold text-slate-900 dark:text-slate-100">{value}</p> },
    { key: "adSetName" as keyof AdHistoryType, label: "Ad Set", render: (value: string | undefined) => <span className="text-sm text-slate-600 dark:text-slate-400">{value || "\u2014"}</span> },
    { key: "adName" as keyof AdHistoryType, label: "Ad", render: (value: string | undefined) => <span className="text-sm text-slate-600 dark:text-slate-400">{value || "\u2014"}</span> },
    { key: "platform" as keyof AdHistoryType, label: "Platform", render: (value: string) => <span className="text-sm text-slate-600 dark:text-slate-400">{value === "FACEBOOK_INSTAGRAM" ? "FB + IG" : value}</span> },
    { key: "action" as keyof AdHistoryType, label: "Action", render: (value: string) => renderActionBadge(value) },
    { key: "status" as keyof AdHistoryType, label: "Status", render: (value: string) => <span className="text-sm text-slate-600 dark:text-slate-400">{value}</span> },
    { key: "date" as keyof AdHistoryType, label: "Date", render: (value: string) => (
      <span className="text-sm text-slate-600 dark:text-slate-400">{new Date(value).toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric", hour: "2-digit", minute: "2-digit" })}</span>
    )},
    { key: "performedByName" as keyof AdHistoryType, label: "Performed By", render: (value: string) => <span className="text-sm text-slate-600 dark:text-slate-400">{value}</span> },
  ], []);

  return (
    <div className="space-y-8">
      <div className="rounded-2xl bg-gradient-to-r from-amber-600 via-orange-500 to-amber-600 dark:from-amber-900 dark:via-orange-900 dark:to-amber-900 p-8 shadow-lg overflow-hidden relative">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-0 left-0 w-96 h-96 bg-white/20 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-orange-300/20 rounded-full blur-3xl animate-pulse" />
        </div>
        <div className="relative z-10">
          <div className="flex items-center gap-4 mb-4">
            <button onClick={() => navigate("/marketing/ads")}
              className="flex h-10 w-10 items-center justify-center rounded-lg bg-white/20 backdrop-blur-md text-white border border-white/30 shadow-lg hover:bg-white/30 transition-all" title="Back">
              <ArrowLeft className="h-5 w-5" />
            </button>
            <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-white/20 backdrop-blur-md text-white border border-white/30 shadow-lg">
              <History className="h-7 w-7" />
            </div>
            <div>
              <h1 className="text-4xl font-bold text-white drop-shadow-lg">Ad History</h1>
              <p className="text-amber-100 text-lg">View campaign activity log</p>
              <p className="text-xs text-amber-200 mt-1">These are dummy records only. Real history tracking will be available after Meta Ads API integration.</p>
            </div>
          </div>
        </div>
      </div>

      <div className="rounded-2xl border border-slate-200/50 dark:border-slate-800/50 bg-white dark:bg-slate-900 shadow-sm overflow-hidden">
        <div className="px-6 py-4 border-b border-slate-200/50 dark:border-slate-800/50 bg-gradient-to-r from-amber-50/50 to-orange-50/50 dark:from-amber-950/20 dark:to-orange-950/20">
          <div className="flex items-center justify-between flex-wrap gap-2">
            <div className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-amber-600 dark:text-amber-400" />
              <h2 className="font-bold text-slate-900 dark:text-white">Ad History</h2>
              <span className="inline-flex items-center rounded-full bg-amber-100 dark:bg-amber-900/50 px-3 py-1 text-sm font-semibold text-amber-700 dark:text-amber-300">{filteredHistory.length} records</span>
            </div>
            <Button variant="outline" onClick={handleExportCSV} className="gap-2" disabled={filteredHistory.length === 0}>
              <Download className="h-4 w-4" /> Export CSV
            </Button>
          </div>
        </div>

        <div className="p-4 border-b border-slate-200/50 dark:border-slate-800/50">
          <div className="relative w-full md:w-96">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-slate-500" />
            <Input placeholder="Search history..." className="pl-9" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
          </div>
        </div>

        <DataTable columns={columns} data={filteredHistory} showActions={false} />
      </div>

      <div className="rounded-xl bg-gradient-to-br from-amber-50 to-yellow-50 dark:from-amber-950/20 dark:to-yellow-950/20 border border-amber-200 dark:border-amber-800 p-4">
        <p className="text-sm text-amber-700 dark:text-amber-300"><strong>Note:</strong> These are dummy/local records only. Real ad activity tracking will be available after Meta Ads API integration.</p>
      </div>
    </div>
  );
}
