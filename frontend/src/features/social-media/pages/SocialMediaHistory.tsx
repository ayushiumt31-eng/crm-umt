import { useState, useMemo, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Search, History, TrendingUp, Download, ArrowLeft } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/common/DataTable";
import { socialHistoryService } from "../services/socialHistoryService";
import { SocialPlatformBadge } from "../components/SocialPlatformBadge";
import { SocialPostStatusBadge } from "../components/SocialPostStatusBadge";
import type { SocialHistory } from "../types/socialHistory";
import type { TableColumn } from "@/components/common/DataTable";

export default function SocialMediaHistory() {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("ALL");
  const [history, setHistory] = useState<SocialHistory[]>([]);

  useEffect(() => {
    socialHistoryService.getSocialMediaHistory().then(setHistory);
  }, []);

  const filteredHistory = useMemo(() => {
    return history.filter((h) => {
      const searchStr = searchTerm.toLowerCase();
      const matchesSearch =
        !searchTerm ||
        h.postTitle.toLowerCase().includes(searchStr) ||
        (h.campaign && h.campaign.toLowerCase().includes(searchStr)) ||
        h.createdByName.toLowerCase().includes(searchStr);

      const matchesStatus =
        statusFilter === "ALL" || h.status === statusFilter;

      return matchesSearch && matchesStatus;
    });
  }, [history, searchTerm, statusFilter]);

  const handleExportCSV = () => {
    const headers = [
      "Post Title",
      "Platform",
      "Campaign",
      "Status",
      "Scheduled Date",
      "Published Date",
      "Created By",
    ];
    const rows = filteredHistory.map((h) => [
      h.postTitle,
      h.platform,
      h.campaign || "",
      h.status,
      h.scheduledAt
        ? new Date(h.scheduledAt).toLocaleDateString("en-US")
        : "",
      h.publishedAt
        ? new Date(h.publishedAt).toLocaleDateString("en-US")
        : "",
      h.createdByName,
    ]);

    const csv = [headers.join(","), ...rows.map((r) => r.join(","))].join(
      "\n"
    );
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `social-media-history-${new Date().toISOString().split("T")[0]}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleExportExcel = () => {
    // Generate TSV (tab-separated) as a simple Excel-compatible export
    const headers = [
      "Post Title",
      "Platform",
      "Campaign",
      "Status",
      "Scheduled Date",
      "Published Date",
      "Created By",
    ];
    const rows = filteredHistory.map((h) => [
      h.postTitle,
      h.platform,
      h.campaign || "",
      h.status,
      h.scheduledAt
        ? new Date(h.scheduledAt).toLocaleDateString("en-US")
        : "",
      h.publishedAt
        ? new Date(h.publishedAt).toLocaleDateString("en-US")
        : "",
      h.createdByName,
    ]);

    const tsv = [headers.join("\t"), ...rows.map((r) => r.join("\t"))].join(
      "\n"
    );
    const blob = new Blob([tsv], {
      type: "application/vnd.ms-excel",
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `social-media-history-${new Date().toISOString().split("T")[0]}.xlsx`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const columns: TableColumn<SocialHistory>[] = useMemo(
    () => [
      {
        key: "postTitle",
        label: "Post Title",
        width: "200px",
        render: (value: string) => (
          <p className="font-semibold text-slate-900 dark:text-slate-100">
            {value}
          </p>
        ),
      },
      {
        key: "platform",
        label: "Platform",
        render: (value: SocialHistory["platform"]) => (
          <SocialPlatformBadge platform={value} />
        ),
      },
      {
        key: "campaign",
        label: "Campaign",
        render: (value: string | undefined) => (
          <span className="text-sm text-slate-600 dark:text-slate-400">
            {value || "—"}
          </span>
        ),
      },
      {
        key: "status",
        label: "Status",
        render: (value: SocialHistory["status"]) => (
          <SocialPostStatusBadge status={value} />
        ),
      },
      {
        key: "scheduledAt",
        label: "Scheduled Date",
        render: (value: string | undefined) => (
          <span className="text-sm text-slate-600 dark:text-slate-400">
            {value
              ? new Date(value).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "short",
                  day: "numeric",
                })
              : "—"}
          </span>
        ),
      },
      {
        key: "publishedAt",
        label: "Published Date",
        render: (value: string | undefined) => (
          <span className="text-sm text-slate-600 dark:text-slate-400">
            {value
              ? new Date(value).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "short",
                  day: "numeric",
                })
              : "—"}
          </span>
        ),
      },
      {
        key: "createdByName",
        label: "Created By",
        render: (value: string) => (
          <span className="text-sm text-slate-600 dark:text-slate-400">
            {value}
          </span>
        ),
      },
    ],
    []
  );

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="rounded-2xl bg-gradient-to-r from-cyan-600 via-teal-500 to-cyan-600 dark:from-cyan-900 dark:via-teal-900 dark:to-cyan-900 p-8 shadow-lg overflow-hidden relative">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-0 left-0 w-96 h-96 bg-white/20 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-teal-300/20 rounded-full blur-3xl animate-pulse"></div>
        </div>
        <div className="relative z-10">
          <div className="flex items-center gap-4 mb-4">
            <button
              onClick={() => navigate("/marketing/social-media")}
              className="flex h-10 w-10 items-center justify-center rounded-lg bg-white/20 backdrop-blur-md text-white border border-white/30 shadow-lg hover:bg-white/30 transition-all"
              title="Back to Social Media"
            >
              <ArrowLeft className="h-5 w-5" />
            </button>
            <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-white/20 backdrop-blur-md text-white border border-white/30 shadow-lg">
              <History className="h-7 w-7" />
            </div>
            <div>
              <h1 className="text-4xl font-bold text-white drop-shadow-lg">
                Social Media History
              </h1>
              <p className="text-cyan-100 text-lg">
                View social media posting history
              </p>
              <p className="text-xs text-cyan-200 mt-1">
                These are dummy records only. Real publishing history will be
                available after backend/API integration.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="rounded-2xl border border-slate-200/50 dark:border-slate-800/50 bg-white dark:bg-slate-900 shadow-sm overflow-hidden">
        <div className="px-6 py-4 border-b border-slate-200/50 dark:border-slate-800/50 bg-gradient-to-r from-cyan-50/50 to-teal-50/50 dark:from-cyan-950/20 dark:to-teal-950/20">
          <div className="flex items-center justify-between flex-wrap gap-2">
            <div className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-cyan-600 dark:text-cyan-400" />
              <h2 className="font-bold text-slate-900 dark:text-white">
                Social Media History
              </h2>
              <span className="inline-flex items-center rounded-full bg-cyan-100 dark:bg-cyan-900/50 px-3 py-1 text-sm font-semibold text-cyan-700 dark:text-cyan-300">
                {filteredHistory.length} records
              </span>
            </div>
            <div className="flex gap-2">
              <Button
                variant="outline"
                onClick={handleExportCSV}
                className="gap-2"
                disabled={filteredHistory.length === 0}
              >
                <Download className="h-4 w-4" />
                CSV
              </Button>
              <Button
                variant="outline"
                onClick={handleExportExcel}
                className="gap-2"
                disabled={filteredHistory.length === 0}
              >
                <Download className="h-4 w-4" />
                Excel
              </Button>
            </div>
          </div>
        </div>

        <div className="p-4 border-b border-slate-200/50 dark:border-slate-800/50 space-y-4">
          <div className="relative w-full md:w-96">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-slate-500" />
            <Input
              placeholder="Search history..."
              className="pl-9"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="flex flex-wrap gap-3">
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="h-10 rounded-md border border-slate-200 bg-white px-3 text-sm dark:border-slate-700 dark:bg-slate-900"
            >
              <option value="ALL">All Status</option>
              <option value="DRAFT">Draft</option>
              <option value="SCHEDULED">Scheduled</option>
              <option value="PUBLISHED">Published</option>
              <option value="FAILED">Failed</option>
              <option value="CANCELLED">Cancelled</option>
            </select>
          </div>
        </div>

        <DataTable
          columns={columns}
          data={filteredHistory}
          showActions={false}
        />
      </div>

      {/* Disclaimer */}
      <div className="rounded-xl bg-gradient-to-br from-amber-50 to-yellow-50 dark:from-amber-950/20 dark:to-yellow-950/20 border border-amber-200 dark:border-amber-800 p-4">
        <p className="text-sm text-amber-700 dark:text-amber-300">
          <strong>Note:</strong> These are dummy/local records only. Real social
          media publishing history, delivery status, and engagement tracking
          will be available after backend/API integration.
        </p>
      </div>
    </div>
  );
}

