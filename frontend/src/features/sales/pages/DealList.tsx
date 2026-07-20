import { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { DealTable } from "../components/DealTable";
import { dealService } from "@/services/deal.service";
import { useDebounce } from "@/hooks";
import type { Deal } from "@/types/sales";
import { TrendingUp, PieChart, Zap, DollarSign, Target } from "lucide-react";

export function DealList() {
  const navigate = useNavigate();
  const [deals, setDeals] = useState<Deal[]>(dealService.getAllSync());
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [priorityFilter, setPriorityFilter] = useState("All");
  const debouncedSearch = useDebounce(searchQuery, 300);

  const filteredDeals = useMemo(() => {
    let filtered = deals;

    if (debouncedSearch) {
      const query = debouncedSearch.toLowerCase();
      filtered = filtered.filter(
        (d) =>
          d.title.toLowerCase().includes(query) ||
          d.customerName.toLowerCase().includes(query) ||
          d.owner.toLowerCase().includes(query)
      );
    }

    if (statusFilter !== "All") {
      filtered = filtered.filter((d) => d.status === statusFilter);
    }

    if (priorityFilter !== "All") {
      filtered = filtered.filter((d) => d.priority === priorityFilter);
    }

    return filtered;
  }, [deals, debouncedSearch, statusFilter, priorityFilter]);

  const stats = {
    totalDeals: deals.length,
    wonDeals: deals.filter((d) => d.status === "Closed Won").length,
    totalValue: deals.reduce((sum, d) => sum + d.value, 0),
    winRate: deals.length > 0 ? ((deals.filter((d) => d.status === "Closed Won").length / deals.length) * 100).toFixed(1) : 0,
  };

  const handleDelete = (id: string) => {
    setDeals((prev) => prev.filter((d) => d.id !== id));
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="rounded-2xl bg-gradient-to-r from-orange-600 via-red-500 to-orange-600 dark:from-orange-900 dark:via-red-900 dark:to-orange-900 p-8 shadow-lg overflow-hidden relative">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-0 left-0 w-96 h-96 bg-white/20 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-red-300/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: "3s" }}></div>
        </div>

        <div className="relative z-10">
          <div className="flex items-center gap-4 mb-4">
            <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-white/20 backdrop-blur-md text-white border border-white/30 shadow-lg transform transition-transform hover:scale-110">
              <TrendingUp className="h-7 w-7" />
            </div>
            <div>
              <h1 className="text-4xl font-bold text-white drop-shadow-lg">Sales Deals</h1>
              <p className="text-orange-100 text-lg">Pipeline and deal management system</p>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="group rounded-xl bg-gradient-to-br from-orange-50 to-orange-100 dark:from-orange-950/40 dark:to-orange-900/20 p-6 border border-orange-200/50 dark:border-orange-800/50 shadow-sm hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-sm font-semibold text-orange-900 dark:text-orange-200">Total Deals</h3>
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-orange-500 to-red-600 text-white shadow-md">
              <Target className="h-5 w-5" />
            </div>
          </div>
          <div className="text-3xl font-bold text-orange-900 dark:text-orange-100">{stats.totalDeals}</div>
          <p className="text-xs text-orange-700 dark:text-orange-300 mt-2">In pipeline</p>
        </div>

        <div className="group rounded-xl bg-gradient-to-br from-green-50 to-green-100 dark:from-green-950/40 dark:to-green-900/20 p-6 border border-green-200/50 dark:border-green-800/50 shadow-sm hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-sm font-semibold text-green-900 dark:text-green-200">Won</h3>
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-green-500 to-emerald-600 text-white shadow-md">
              <Zap className="h-5 w-5" />
            </div>
          </div>
          <div className="text-3xl font-bold text-green-900 dark:text-green-100">{stats.wonDeals}</div>
          <p className="text-xs text-green-700 dark:text-green-300 mt-2">Closed successfully</p>
        </div>

        <div className="group rounded-xl bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-950/40 dark:to-blue-900/20 p-6 border border-blue-200/50 dark:border-blue-800/50 shadow-sm hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-sm font-semibold text-blue-900 dark:text-blue-200">Total Value</h3>
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-blue-500 to-blue-600 text-white shadow-md">
              <DollarSign className="h-5 w-5" />
            </div>
          </div>
          <div className="text-2xl font-bold text-blue-900 dark:text-blue-100">${(stats.totalValue / 1000000).toFixed(1)}M</div>
          <p className="text-xs text-blue-700 dark:text-blue-300 mt-2">Pipeline total</p>
        </div>

        <div className="group rounded-xl bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-950/40 dark:to-purple-900/20 p-6 border border-purple-200/50 dark:border-purple-800/50 shadow-sm hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-sm font-semibold text-purple-900 dark:text-purple-200">Win Rate</h3>
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-purple-500 to-purple-600 text-white shadow-md">
              <PieChart className="h-5 w-5" />
            </div>
          </div>
          <div className="text-3xl font-bold text-purple-900 dark:text-purple-100">{stats.winRate}%</div>
          <p className="text-xs text-purple-700 dark:text-purple-300 mt-2">Success rate</p>
        </div>
      </div>

      {/* Filters */}
      <div className="rounded-2xl border border-slate-200/50 dark:border-slate-800/50 bg-white dark:bg-slate-900 shadow-sm p-6 flex gap-4 flex-wrap">
        <input
          type="text"
          placeholder="Search by deal title, customer, or owner..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="flex-1 min-w-[200px] rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 px-4 py-2 text-sm"
        />
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 px-4 py-2 text-sm"
        >
          <option>All</option>
          <option>Prospect</option>
          <option>Qualification</option>
          <option>Proposal</option>
          <option>Negotiation</option>
          <option>Closed Won</option>
          <option>Closed Lost</option>
        </select>
        <select
          value={priorityFilter}
          onChange={(e) => setPriorityFilter(e.target.value)}
          className="rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 px-4 py-2 text-sm"
        >
          <option>All</option>
          <option>Low</option>
          <option>Medium</option>
          <option>High</option>
          <option>Critical</option>
        </select>
      </div>

      {/* Table */}
      <div className="rounded-2xl border border-slate-200/50 dark:border-slate-800/50 bg-white dark:bg-slate-900 shadow-sm overflow-hidden">
        <div className="px-6 py-4 border-b border-slate-200/50 dark:border-slate-800/50 bg-gradient-to-r from-orange-50/50 to-red-50/50 dark:from-orange-950/20 dark:to-red-950/20">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-orange-600 dark:text-orange-400" />
              <h2 className="font-bold text-slate-900 dark:text-white">All Deals</h2>
              <span className="inline-flex items-center rounded-full bg-orange-100 dark:bg-orange-900/50 px-3 py-1 text-sm font-semibold text-orange-700 dark:text-orange-300">
                {filteredDeals.length} results
              </span>
            </div>
          </div>
        </div>

        <DealTable
          deals={filteredDeals}
          onView={(id) => navigate(`/sales/${id}`)}
          onEdit={(id) => navigate(`/sales/${id}/edit`)}
          onDelete={handleDelete}
        />
      </div>
    </div>
  );
}
