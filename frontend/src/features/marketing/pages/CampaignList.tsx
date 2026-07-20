import { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { CampaignTable } from "../components/CampaignTable";
import { campaignService } from "@/services/campaign.service";
import { useDebounce } from "@/hooks";
import type { Campaign } from "@/types/marketing";
import { Megaphone, TrendingUp, Zap, Target, BarChart3 } from "lucide-react";

export function CampaignList() {
  const navigate = useNavigate();
  const [campaigns, setCampaigns] = useState<Campaign[]>(campaignService.getAllSync());
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [channelFilter, setChannelFilter] = useState("All");
  const debouncedSearch = useDebounce(searchQuery, 300);

  const filteredCampaigns = useMemo(() => {
    let filtered = campaigns;

    if (debouncedSearch) {
      const query = debouncedSearch.toLowerCase();
      filtered = filtered.filter((c) =>
        c.name.toLowerCase().includes(query) ||
        c.description.toLowerCase().includes(query)
      );
    }

    if (statusFilter !== "All") {
      filtered = filtered.filter((c) => c.status === statusFilter);
    }

    if (channelFilter !== "All") {
      filtered = filtered.filter((c) => c.channel === channelFilter);
    }

    return filtered;
  }, [campaigns, debouncedSearch, statusFilter, channelFilter]);

  const stats = {
    totalCampaigns: campaigns.length,
    activeCampaigns: campaigns.filter((c) => c.status === "Active").length,
    totalBudget: campaigns.reduce((sum, c) => sum + c.budget, 0),
    averageROI: campaigns.length > 0 ? (campaigns.reduce((sum, c) => sum + c.roi, 0) / campaigns.length).toFixed(1) : 0,
  };

  const handleDelete = (id: string) => {
    setCampaigns((prev) => prev.filter((c) => c.id !== id));
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="rounded-2xl bg-gradient-to-r from-purple-600 via-pink-500 to-purple-600 dark:from-purple-900 dark:via-pink-900 dark:to-purple-900 p-8 shadow-lg overflow-hidden relative">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-0 left-0 w-96 h-96 bg-white/20 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-pink-300/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: "3s" }}></div>
        </div>

        <div className="relative z-10">
          <div className="flex items-center gap-4 mb-4">
            <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-white/20 backdrop-blur-md text-white border border-white/30 shadow-lg transform transition-transform hover:scale-110">
              <Megaphone className="h-7 w-7" />
            </div>
            <div>
              <h1 className="text-4xl font-bold text-white drop-shadow-lg">Marketing Campaigns</h1>
              <p className="text-purple-100 text-lg">Multi-channel campaign management</p>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="group rounded-xl bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-950/40 dark:to-purple-900/20 p-6 border border-purple-200/50 dark:border-purple-800/50 shadow-sm hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-sm font-semibold text-purple-900 dark:text-purple-200">Total Campaigns</h3>
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-purple-500 to-pink-600 text-white shadow-md">
              <Megaphone className="h-5 w-5" />
            </div>
          </div>
          <div className="text-3xl font-bold text-purple-900 dark:text-purple-100">{stats.totalCampaigns}</div>
          <p className="text-xs text-purple-700 dark:text-purple-300 mt-2">Active and archived</p>
        </div>

        <div className="group rounded-xl bg-gradient-to-br from-pink-50 to-pink-100 dark:from-pink-950/40 dark:to-pink-900/20 p-6 border border-pink-200/50 dark:border-pink-800/50 shadow-sm hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-sm font-semibold text-pink-900 dark:text-pink-200">Active</h3>
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-pink-500 to-rose-600 text-white shadow-md">
              <Zap className="h-5 w-5" />
            </div>
          </div>
          <div className="text-3xl font-bold text-pink-900 dark:text-pink-100">{stats.activeCampaigns}</div>
          <p className="text-xs text-pink-700 dark:text-pink-300 mt-2">Running campaigns</p>
        </div>

        <div className="group rounded-xl bg-gradient-to-br from-orange-50 to-orange-100 dark:from-orange-950/40 dark:to-orange-900/20 p-6 border border-orange-200/50 dark:border-orange-800/50 shadow-sm hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-sm font-semibold text-orange-900 dark:text-orange-200">Total Budget</h3>
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-orange-500 to-orange-600 text-white shadow-md">
              <Target className="h-5 w-5" />
            </div>
          </div>
          <div className="text-2xl font-bold text-orange-900 dark:text-orange-100">${(stats.totalBudget / 1000).toFixed(0)}K</div>
          <p className="text-xs text-orange-700 dark:text-orange-300 mt-2">Allocated spend</p>
        </div>

        <div className="group rounded-xl bg-gradient-to-br from-green-50 to-green-100 dark:from-green-950/40 dark:to-green-900/20 p-6 border border-green-200/50 dark:border-green-800/50 shadow-sm hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-sm font-semibold text-green-900 dark:text-green-200">Avg ROI</h3>
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-green-500 to-green-600 text-white shadow-md">
              <BarChart3 className="h-5 w-5" />
            </div>
          </div>
          <div className="text-3xl font-bold text-green-900 dark:text-green-100">{stats.averageROI}%</div>
          <p className="text-xs text-green-700 dark:text-green-300 mt-2">Average return</p>
        </div>
      </div>

      {/* Filters */}
      <div className="rounded-2xl border border-slate-200/50 dark:border-slate-800/50 bg-white dark:bg-slate-900 shadow-sm p-6 flex gap-4 flex-wrap">
        <input
          type="text"
          placeholder="Search campaigns..."
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
          <option>Draft</option>
          <option>Active</option>
          <option>Completed</option>
          <option>Paused</option>
        </select>
        <select
          value={channelFilter}
          onChange={(e) => setChannelFilter(e.target.value)}
          className="rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 px-4 py-2 text-sm"
        >
          <option>All</option>
          <option>Email</option>
          <option>Social Media</option>
          <option>SMS</option>
          <option>Push</option>
        </select>
      </div>

      {/* Table */}
      <div className="rounded-2xl border border-slate-200/50 dark:border-slate-800/50 bg-white dark:bg-slate-900 shadow-sm overflow-hidden">
        <div className="px-6 py-4 border-b border-slate-200/50 dark:border-slate-800/50 bg-gradient-to-r from-purple-50/50 to-pink-50/50 dark:from-purple-950/20 dark:to-pink-950/20">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-purple-600 dark:text-purple-400" />
              <h2 className="font-bold text-slate-900 dark:text-white">All Campaigns</h2>
              <span className="inline-flex items-center rounded-full bg-purple-100 dark:bg-purple-900/50 px-3 py-1 text-sm font-semibold text-purple-700 dark:text-purple-300">
                {filteredCampaigns.length} results
              </span>
            </div>
          </div>
        </div>

        <CampaignTable
          campaigns={filteredCampaigns}
          onView={(id) => navigate(`/marketing/${id}`)}
          onEdit={(id) => navigate(`/marketing/${id}/edit`)}
          onDelete={handleDelete}
        />
      </div>
    </div>
  );
}
