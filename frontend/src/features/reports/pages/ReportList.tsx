import { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { ReportTable } from "../components/ReportTable";
import { reportService } from "@/services/report.service";
import { useDebounce } from "@/hooks";
import type { Report } from "@/types/reports";
import { FileText, TrendingUp, CheckCircle, Database } from "lucide-react";

export function ReportList() {
  const navigate = useNavigate();
  const [reports, setReports] = useState<Report[]>(reportService.getAllSync());
  const [searchQuery, setSearchQuery] = useState("");
  const [typeFilter, setTypeFilter] = useState("All");
  const debouncedSearch = useDebounce(searchQuery, 300);

  const filteredReports = useMemo(() => {
    let filtered = reports;

    if (debouncedSearch) {
      const query = debouncedSearch.toLowerCase();
      filtered = filtered.filter((r) =>
        r.name.toLowerCase().includes(query)
      );
    }

    if (typeFilter !== "All") {
      filtered = filtered.filter((r) => r.type === typeFilter);
    }

    return filtered;
  }, [reports, debouncedSearch, typeFilter]);

  const stats = {
    totalReports: reports.length,
    readyReports: reports.filter((r) => r.status === "Ready").length,
    totalRecords: reports.reduce((sum, r) => sum + r.metrics.totalRecords, 0),
    activeRecords: reports.reduce((sum, r) => sum + r.metrics.activeRecords, 0),
  };

  const handleDelete = (id: string) => {
    setReports((prev) => prev.filter((r) => r.id !== id));
  };

  const handleDownload = (id: string) => {
    const report = reports.find((r) => r.id === id);
    if (report?.fileUrl) {
      console.log("Downloading:", report.fileUrl);
      // In real app, would trigger download
    }
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="rounded-2xl bg-gradient-to-r from-indigo-600 via-blue-500 to-indigo-600 dark:from-indigo-900 dark:via-blue-900 dark:to-indigo-900 p-8 shadow-lg overflow-hidden relative">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-0 left-0 w-96 h-96 bg-white/20 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-blue-300/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: "3s" }}></div>
        </div>

        <div className="relative z-10">
          <div className="flex items-center gap-4 mb-4">
            <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-white/20 backdrop-blur-md text-white border border-white/30 shadow-lg transform transition-transform hover:scale-110">
              <FileText className="h-7 w-7" />
            </div>
            <div>
              <h1 className="text-4xl font-bold text-white drop-shadow-lg">Reports</h1>
              <p className="text-indigo-100 text-lg">Business analytics and reporting dashboard</p>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="group rounded-xl bg-gradient-to-br from-indigo-50 to-indigo-100 dark:from-indigo-950/40 dark:to-indigo-900/20 p-6 border border-indigo-200/50 dark:border-indigo-800/50 shadow-sm hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-sm font-semibold text-indigo-900 dark:text-indigo-200">Total Reports</h3>
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-indigo-500 to-blue-600 text-white shadow-md">
              <FileText className="h-5 w-5" />
            </div>
          </div>
          <div className="text-3xl font-bold text-indigo-900 dark:text-indigo-100">{stats.totalReports}</div>
          <p className="text-xs text-indigo-700 dark:text-indigo-300 mt-2">Available reports</p>
        </div>

        <div className="group rounded-xl bg-gradient-to-br from-green-50 to-green-100 dark:from-green-950/40 dark:to-green-900/20 p-6 border border-green-200/50 dark:border-green-800/50 shadow-sm hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-sm font-semibold text-green-900 dark:text-green-200">Ready</h3>
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-green-500 to-emerald-600 text-white shadow-md">
              <CheckCircle className="h-5 w-5" />
            </div>
          </div>
          <div className="text-3xl font-bold text-green-900 dark:text-green-100">{stats.readyReports}</div>
          <p className="text-xs text-green-700 dark:text-green-300 mt-2">Ready to download</p>
        </div>

        <div className="group rounded-xl bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-950/40 dark:to-blue-900/20 p-6 border border-blue-200/50 dark:border-blue-800/50 shadow-sm hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-sm font-semibold text-blue-900 dark:text-blue-200">Total Records</h3>
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-blue-500 to-blue-600 text-white shadow-md">
              <Database className="h-5 w-5" />
            </div>
          </div>
          <div className="text-3xl font-bold text-blue-900 dark:text-blue-100">{stats.totalRecords.toLocaleString()}</div>
          <p className="text-xs text-blue-700 dark:text-blue-300 mt-2">Analyzed entries</p>
        </div>

        <div className="group rounded-xl bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-950/40 dark:to-purple-900/20 p-6 border border-purple-200/50 dark:border-purple-800/50 shadow-sm hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-sm font-semibold text-purple-900 dark:text-purple-200">Active Records</h3>
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-purple-500 to-purple-600 text-white shadow-md">
              <TrendingUp className="h-5 w-5" />
            </div>
          </div>
          <div className="text-3xl font-bold text-purple-900 dark:text-purple-100">
            {Math.round((stats.activeRecords / stats.totalRecords) * 100)}%
          </div>
          <p className="text-xs text-purple-700 dark:text-purple-300 mt-2">Active percentage</p>
        </div>
      </div>

      {/* Filters */}
      <div className="rounded-2xl border border-slate-200/50 dark:border-slate-800/50 bg-white dark:bg-slate-900 shadow-sm p-6 flex gap-4 flex-wrap">
        <input
          type="text"
          placeholder="Search reports..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="flex-1 min-w-[200px] rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 px-4 py-2 text-sm"
        />
        <select
          value={typeFilter}
          onChange={(e) => setTypeFilter(e.target.value)}
          className="rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 px-4 py-2 text-sm"
        >
          <option>All</option>
          <option>Sales</option>
          <option>Revenue</option>
          <option>Customer</option>
          <option>Employee</option>
          <option>Lead</option>
        </select>
      </div>

      {/* Table */}
      <div className="rounded-2xl border border-slate-200/50 dark:border-slate-800/50 bg-white dark:bg-slate-900 shadow-sm overflow-hidden">
        <div className="px-6 py-4 border-b border-slate-200/50 dark:border-slate-800/50 bg-gradient-to-r from-indigo-50/50 to-blue-50/50 dark:from-indigo-950/20 dark:to-blue-950/20">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-indigo-600 dark:text-indigo-400" />
              <h2 className="font-bold text-slate-900 dark:text-white">All Reports</h2>
              <span className="inline-flex items-center rounded-full bg-indigo-100 dark:bg-indigo-900/50 px-3 py-1 text-sm font-semibold text-indigo-700 dark:text-indigo-300">
                {filteredReports.length} results
              </span>
            </div>
          </div>
        </div>

        <ReportTable
          reports={filteredReports}
          onView={(id) => navigate(`/reports/${id}`)}
          onDownload={handleDownload}
          onDelete={handleDelete}
        />
      </div>
    </div>
  );
}
