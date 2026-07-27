import { useState, useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { Search, History, ArrowLeft, Download, TrendingUp, Activity, CheckCircle2, XCircle, AlertTriangle, SkipForward } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/common/DataTable";
import { automationLogService } from "../services/automationLogService";
import type { AutomationLog } from "../types/automationLog";
import type { TableColumn } from "@/components/common/DataTable";

export default function AutomationLogs() {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("ALL");
  const [logs, setLogs] = useState<AutomationLog[]>([]);

  useEffect(() => {
    automationLogService.getAutomationLogs().then(setLogs);
  }, []);

  const filteredLogs = useMemo(() => {
    return logs.filter((l) => {
      const searchStr = searchTerm.toLowerCase();
      return (
        !searchTerm ||
        l.automationName.toLowerCase().includes(searchStr) ||
        l.target.toLowerCase().includes(searchStr) ||
        l.executedByName.toLowerCase().includes(searchStr)
      );
    }).filter((l) => statusFilter === "ALL" || l.status === statusFilter);
  }, [logs, searchTerm, statusFilter]);

  const handleExportCSV = () => {
    const headers = ["Automation", "Trigger", "Target", "Target Type", "Status", "Actions Count", "Duration", "Date", "Executed By"];
    const rows = filteredLogs.map((l) => [
      l.automationName,
      l.trigger,
      l.target,
      l.targetType,
      l.status,
      l.actionsCount.toString(),
      `${l.duration}s`,
      new Date(l.executionDate).toLocaleDateString("en-US"),
      l.executedByName,
    ]);
    const csv = [headers.join(","), ...rows.map((r) => r.join(","))].join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `automation-logs-${new Date().toISOString().split("T")[0]}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const renderStatusBadge = (status: AutomationLog["status"]) => {
    const config: Record<string, { label: string; classes: string }> = {
      SUCCESS: { label: "Success", classes: "bg-green-100 text-green-700 dark:bg-green-900/50 dark:text-green-300" },
      FAILED: { label: "Failed", classes: "bg-red-100 text-red-700 dark:bg-red-900/50 dark:text-red-300" },
      PARTIAL: { label: "Partial", classes: "bg-amber-100 text-amber-700 dark:bg-amber-900/50 dark:text-amber-300" },
      SKIPPED: { label: "Skipped", classes: "bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300" },
    };
    const c = config[status] || config.SKIPPED;
    return (
      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold ${c.classes}`}>
        {c.label}
      </span>
    );
  };

  const columns: TableColumn<AutomationLog>[] = useMemo(() => [
    {
      key: "automationName",
      label: "Automation",
      width: "180px",
      render: (value: string) => <p className="font-semibold text-slate-900 dark:text-slate-100">{value}</p>,
    },
    {
      key: "trigger",
      label: "Trigger",
      render: (value: AutomationLog["trigger"]) => (
        <span className="text-sm text-slate-600 dark:text-slate-400">
          {value.replace(/_/g, " ").replace(/\b\w/g, (c) => c.toUpperCase())}
        </span>
      ),
    },
    {
      key: "target",
      label: "Target",
      render: (value: string) => <span className="text-sm text-slate-600 dark:text-slate-400">{value}</span>,
    },
    {
      key: "targetType",
      label: "Type",
      render: (value: string) => <span className="text-sm text-slate-600 dark:text-slate-400">{value}</span>,
    },
    {
      key: "status",
      label: "Status",
      render: (value: AutomationLog["status"]) => renderStatusBadge(value),
    },
   //  {
   //    key: "actionsCount",
   //    label: "Actions",
   //    render: (value: number) => <span className="text-sm font-medium text-slate-700 dark:text-slate-300">{value}</span>,
   //  },
   //  {
   //    key: "duration",
   //    label: "Duration",
   //    render: (value: number) => <span className="text-sm text-slate-600 dark:text-slate-400">{value.toFixed(1)}s</span>,
   //  },
    {
      key: "executionDate",
      label: "Date",
      render: (value: string) => (
        <span className="text-sm text-slate-600 dark:text-slate-400">
          {new Date(value).toLocaleDateString("en-US", { month: "short", day: "numeric", hour: "2-digit", minute: "2-digit" })}
        </span>
      ),
    },
    {
      key: "executedByName",
      label: "Executed By",
      render: (value: string) => <span className="text-sm text-slate-600 dark:text-slate-400">{value}</span>,
    },
   //  {
   //    key: "id",
   //    label: "Details",
   //    width: "80px",
   //    render: (_value: string, row: AutomationLog) => (
   //      <span className="text-xs text-slate-500 dark:text-slate-400 truncate block max-w-[150px]">
   //        {row.errorMessage || "—"}
   //      </span>
   //    ),
   //  },
  ], []);

  const summaryStats = useMemo(() => {
    return {
      total: logs.length,
      success: logs.filter((l) => l.status === "SUCCESS").length,
      failed: logs.filter((l) => l.status === "FAILED").length,
      partial: logs.filter((l) => l.status === "PARTIAL").length,
      skipped: logs.filter((l) => l.status === "SKIPPED").length,
    };
  }, [logs]);

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="rounded-2xl bg-gradient-to-r from-amber-600 via-orange-500 to-amber-600 dark:from-amber-900 dark:via-orange-900 dark:to-amber-900 p-8 shadow-lg overflow-hidden relative">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-0 left-0 w-96 h-96 bg-white/20 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-orange-300/20 rounded-full blur-3xl animate-pulse" />
        </div>
        <div className="relative z-10">
          <div className="flex items-center gap-4 mb-4">
            <button onClick={() => navigate("/marketing/automation")}
              className="flex h-10 w-10 items-center justify-center rounded-lg bg-white/20 backdrop-blur-md text-white border border-white/30 shadow-lg hover:bg-white/30 transition-all" title="Back">
              <ArrowLeft className="h-5 w-5" />
            </button>
            <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-white/20 backdrop-blur-md text-white border border-white/30 shadow-lg">
              <History className="h-7 w-7" />
            </div>
            <div>
              <h1 className="text-4xl font-bold text-white drop-shadow-lg">Automation Logs</h1>
              <p className="text-amber-100 text-lg">View automation execution history</p>
            </div>
          </div>
        </div>
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        {[
          { label: "Total", value: summaryStats.total, icon: Activity, color: "bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300" },
          { label: "Success", value: summaryStats.success, icon: CheckCircle2, color: "bg-green-100 text-green-700 dark:bg-green-900/50 dark:text-green-300" },
          { label: "Failed", value: summaryStats.failed, icon: XCircle, color: "bg-red-100 text-red-700 dark:bg-red-900/50 dark:text-red-300" },
          { label: "Partial", value: summaryStats.partial, icon: AlertTriangle, color: "bg-amber-100 text-amber-700 dark:bg-amber-900/50 dark:text-amber-300" },
          { label: "Skipped", value: summaryStats.skipped, icon: SkipForward, color: "bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300" },
        ].map((stat) => {
          const Icon = stat.icon;
          return (
            <div key={stat.label} className="rounded-xl border border-slate-200/50 dark:border-slate-800/50 bg-white dark:bg-slate-900 p-4 shadow-sm">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-xs font-semibold text-slate-500">{stat.label}</h3>
                <div className={`flex h-8 w-8 items-center justify-center rounded-lg ${stat.color}`}>
                  <Icon className="h-4 w-4" />
                </div>
              </div>
              <p className="text-2xl font-bold text-slate-900 dark:text-white">{stat.value}</p>
            </div>
          );
        })}
      </div>

      {/* Filters & Table */}
      <div className="rounded-2xl border border-slate-200/50 dark:border-slate-800/50 bg-white dark:bg-slate-900 shadow-sm overflow-hidden">
        <div className="px-6 py-4 border-b border-slate-200/50 dark:border-slate-800/50 bg-gradient-to-r from-amber-50/50 to-orange-50/50 dark:from-amber-950/20 dark:to-orange-950/20">
          <div className="flex items-center justify-between flex-wrap gap-2">
            <div className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-amber-600 dark:text-amber-400" />
              <h2 className="font-bold text-slate-900 dark:text-white">Execution Logs</h2>
              <span className="inline-flex items-center rounded-full bg-amber-100 dark:bg-amber-900/50 px-3 py-1 text-sm font-semibold text-amber-700 dark:text-amber-300">{filteredLogs.length} records</span>
            </div>
            <Button variant="outline" onClick={handleExportCSV} className="gap-2" disabled={filteredLogs.length === 0}>
              <Download className="h-4 w-4" /> Export CSV
            </Button>
          </div>
        </div>

        <div className="p-4 border-b border-slate-200/50 dark:border-slate-800/50 space-y-4">
          <div className="relative w-full md:w-96">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-slate-500" />
            <Input placeholder="Search logs..." className="pl-9" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
          </div>
          <div className="flex flex-wrap gap-3">
            <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}
              className="h-10 rounded-md border border-slate-200 bg-white px-3 text-sm dark:border-slate-700 dark:bg-slate-900">
              <option value="ALL">All Status</option>
              <option value="SUCCESS">Success</option>
              <option value="FAILED">Failed</option>
              <option value="PARTIAL">Partial</option>
              <option value="SKIPPED">Skipped</option>
            </select>
          </div>
        </div>

        <DataTable columns={columns} data={filteredLogs} showActions={false} />
      </div>

      {/* Disclaimer */}
      <div className="rounded-xl bg-gradient-to-br from-amber-50 to-yellow-50 dark:from-amber-950/20 dark:to-yellow-950/20 border border-amber-200 dark:border-amber-800 p-4">
        <p className="text-sm text-amber-700 dark:text-amber-300">
          <strong>Note:</strong> These are demo/local records only. Real automation execution logs will be available after backend integration.
        </p>
      </div>
    </div>
  );
}
