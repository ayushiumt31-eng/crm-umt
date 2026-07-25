import { useState, useMemo, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Search, History, TrendingUp, Download, ArrowLeft } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/common/DataTable";
import { whatsappHistoryService } from "../services/whatsappHistoryService";
import { WhatsAppStatusBadge } from "../components/WhatsAppStatusBadge";
import type { WhatsAppHistory } from "../types/whatsappHistory";

export default function WhatsAppHistoryPage() {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("ALL");
  const [history, setHistory] = useState<WhatsAppHistory[]>([]);

  useEffect(() => {
    whatsappHistoryService.getWhatsAppHistory().then(setHistory);
  }, []);

  const filteredHistory = useMemo(() => {
    return history.filter((h) => {
      const searchStr = searchTerm.toLowerCase();
      const matchesSearch =
        !searchTerm ||
        h.campaignName.toLowerCase().includes(searchStr) ||
        h.recipientName.toLowerCase().includes(searchStr) ||
        h.recipientPhone.toLowerCase().includes(searchStr);

      const matchesStatus =
        statusFilter === "ALL" || h.status === statusFilter;

      return matchesSearch && matchesStatus;
    });
  }, [history, searchTerm, statusFilter]);

  const handleExportCSV = () => {
    const headers = [
      "Campaign Name",
      "Recipient",
      "Phone Number",
      "Status",
      "Sent Date",
      "Delivered",
      "Read",
    ];
    const rows = filteredHistory.map((h) => [
      h.campaignName,
      h.recipientName,
      h.recipientPhone,
      h.status,
      new Date(h.sentAt).toLocaleDateString("en-US"),
      h.delivered ? "Yes" : "No",
      h.read ? "Yes" : "No",
    ]);

    const csv = [headers.join(","), ...rows.map((r) => r.join(","))].join(
      "\n"
    );
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `whatsapp-history-${new Date().toISOString().split("T")[0]}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const columns = useMemo(() => {
    return [
      {
        key: "campaignName" as keyof WhatsAppHistory,
        label: "Campaign Name",
        width: "200px" as const,
        render: (value: string) => (
          <p className="font-semibold text-slate-900 dark:text-slate-100">
            {value}
          </p>
        ),
      },
      {
        key: "recipientName" as keyof WhatsAppHistory,
        label: "Recipient",
        render: (value: string) => (
          <span className="text-sm text-slate-600 dark:text-slate-400">
            {value}
          </span>
        ),
      },
      {
        key: "recipientPhone" as keyof WhatsAppHistory,
        label: "Phone Number",
        render: (value: string) => (
          <span className="text-sm text-slate-600 dark:text-slate-400 truncate block max-w-[160px]">
            {value}
          </span>
        ),
      },
      {
        key: "status" as keyof WhatsAppHistory,
        label: "Status",
        render: (value: WhatsAppHistory["status"]) => (
          <WhatsAppStatusBadge status={value} />
        ),
      },
      {
        key: "sentAt" as keyof WhatsAppHistory,
        label: "Sent Date",
        render: (value: string) => (
          <span className="text-sm text-slate-600 dark:text-slate-400">
            {new Date(value).toLocaleDateString("en-US", {
              year: "numeric",
              month: "short",
              day: "numeric",
              hour: "2-digit",
              minute: "2-digit",
            })}
          </span>
        ),
      },
      {
        key: "delivered" as keyof WhatsAppHistory,
        label: "Delivered",
        render: (value: boolean) => (
          <span
            className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold ${
              value
                ? "bg-green-100 text-green-700 dark:bg-green-900/50 dark:text-green-300"
                : "bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-400"
            }`}
          >
            {value ? "Yes" : "No"}
          </span>
        ),
      },
      {
        key: "read" as keyof WhatsAppHistory,
        label: "Read",
        render: (value: boolean) => (
          <span
            className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold ${
              value
                ? "bg-blue-100 text-blue-700 dark:bg-blue-900/50 dark:text-blue-300"
                : "bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-400"
            }`}
          >
            {value ? "Yes" : "No"}
          </span>
        ),
      },
    ];
  }, []);

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
              onClick={() => navigate("/marketing/whatsapp")}
              className="flex h-10 w-10 items-center justify-center rounded-lg bg-white/20 backdrop-blur-md text-white border border-white/30 shadow-lg hover:bg-white/30 transition-all"
              title="Back to WhatsApp Marketing"
            >
              <ArrowLeft className="h-5 w-5" />
            </button>
            <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-white/20 backdrop-blur-md text-white border border-white/30 shadow-lg">
              <History className="h-7 w-7" />
            </div>
            <div>
              <h1 className="text-4xl font-bold text-white drop-shadow-lg">
                WhatsApp History
              </h1>
              <p className="text-cyan-100 text-lg">
                View WhatsApp message delivery history
              </p>
              <p className="text-xs text-cyan-200 mt-1">
                These are dummy records only. Real delivery tracking will be
                available after backend WhatsApp API integration.
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
                WhatsApp History
              </h2>
              <span className="inline-flex items-center rounded-full bg-cyan-100 dark:bg-cyan-900/50 px-3 py-1 text-sm font-semibold text-cyan-700 dark:text-cyan-300">
                {filteredHistory.length} records
              </span>
            </div>
            <Button
              variant="outline"
              onClick={handleExportCSV}
              className="gap-2"
              disabled={filteredHistory.length === 0}
            >
              <Download className="h-4 w-4" />
              Export CSV
            </Button>
          </div>
        </div>

        <div className="p-4 border-b border-slate-200/50 dark:border-slate-800/50 space-y-4">
          <div className="relative w-full md:w-96">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-slate-500" />
            <Input
              placeholder="Search WhatsApp history..."
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
              <option value="PENDING">Pending</option>
              <option value="SENT">Sent</option>
              <option value="DELIVERED">Delivered</option>
              <option value="FAILED">Failed</option>
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
          <strong>Note:</strong> These are dummy/local records only. Real
          WhatsApp delivery status, delivery tracking, and read receipts will be
          available after backend WhatsApp API integration.
        </p>
      </div>
    </div>
  );
}

