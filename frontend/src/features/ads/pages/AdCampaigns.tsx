import { useState, useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { Plus, Search, TrendingUp, ArrowLeft, Play, Pause } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/common/DataTable";
import { adCampaignTableColumns } from "../components/AdCampaignTableColumns";
import { DeleteAdCampaignDialog } from "../components/DeleteAdCampaignDialog";
import { adCampaignService } from "../services/adCampaignService";
import type { AdCampaign } from "../types/adCampaign";

export default function AdCampaigns() {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("ALL");
  const [platformFilter, setPlatformFilter] = useState<string>("ALL");
  const [deleteItem, setDeleteItem] = useState<AdCampaign | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const [campaigns, setCampaigns] = useState<AdCampaign[]>([]);

  useEffect(() => {
    adCampaignService.getAdCampaigns().then(setCampaigns);
  }, []);

  const refreshData = () => {
    adCampaignService.getAdCampaigns().then(setCampaigns);
  };

  const filteredData = useMemo(() => {
    return campaigns.filter((c) => {
      const searchStr = searchTerm.toLowerCase();
      const matchesSearch =
        !searchTerm ||
        c.name.toLowerCase().includes(searchStr) ||
        c.createdByName.toLowerCase().includes(searchStr) ||
        (c.notes && c.notes.toLowerCase().includes(searchStr));
      const matchesStatus = statusFilter === "ALL" || c.status === statusFilter;
      const matchesPlatform = platformFilter === "ALL" || c.platform === platformFilter;
      return matchesSearch && matchesStatus && matchesPlatform;
    });
  }, [campaigns, searchTerm, statusFilter, platformFilter]);

  const handleDeleteConfirm = async () => {
    if (!deleteItem) return;
    setIsDeleting(true);
    try {
      await adCampaignService.deleteAdCampaign(deleteItem.id);
      setDeleteItem(null);
      refreshData();
    } finally {
      setIsDeleting(false);
    }
  };

  const handlePauseResume = async (camp: AdCampaign) => {
    if (camp.status === "ACTIVE") {
      await adCampaignService.pauseAdCampaign(camp.id);
    } else if (camp.status === "PAUSED") {
      await adCampaignService.resumeAdCampaign(camp.id);
    }
    refreshData();
  };

  const columns = useMemo(() => {
    return adCampaignTableColumns.map((col) => {
      if (col.key === "id") {
        return {
          ...col,
          render: (_value: string, row: AdCampaign) => (
            <div className="flex items-center gap-2">
              {(row.status === "ACTIVE" || row.status === "PAUSED") && (
                <button
                  onClick={() => handlePauseResume(row)}
                  title={row.status === "ACTIVE" ? "Pause" : "Resume"}
                  className={`h-8 w-8 flex items-center justify-center rounded-md hover:bg-amber-100 dark:hover:bg-amber-900/30 ${
                    row.status === "ACTIVE"
                      ? "text-amber-600 dark:text-amber-400"
                      : "text-green-600 dark:text-green-400"
                  }`}
                >
                  {row.status === "ACTIVE" ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
                </button>
              )}
              <button
                onClick={() => navigate(`/marketing/ads/campaigns/${row.id}`)}
                title="View"
                className="h-8 w-8 flex items-center justify-center rounded-md hover:bg-blue-100 dark:hover:bg-blue-900/30 text-blue-600 dark:text-blue-400"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"/><circle cx="12" cy="12" r="3"/></svg>
              </button>
<button onClick={() => navigate(`/marketing/ads/campaigns/${row.id}/edit`)} title="Edit"
                className="h-8 w-8 flex items-center justify-center rounded-md hover:bg-cyan-100 dark:hover:bg-cyan-900/30 text-cyan-600 dark:text-cyan-400">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 3a2.85 2.85 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z"/><path d="m15 5 4 4"/></svg>
              </button>
              <button title="Delete"
                className="h-8 w-8 flex items-center justify-center rounded-md hover:bg-red-100 dark:hover:bg-red-900/30 text-red-600 dark:text-red-400"
                onClick={() => { const item = campaigns.find((x) => x.id === row.id); if (item) setDeleteItem(item); }}>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 6h18"/><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/></svg>
              </button>
            </div>
          ),
        };
      }
      return col;
    });
  }, [navigate, campaigns]);

  return (
    <div className="space-y-8">
      <div className="rounded-2xl bg-gradient-to-r from-blue-600 via-indigo-500 to-purple-600 dark:from-blue-900 dark:via-indigo-900 dark:to-purple-900 p-8 shadow-lg overflow-hidden relative">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-0 left-0 w-96 h-96 bg-white/20 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-purple-300/20 rounded-full blur-3xl animate-pulse" />
        </div>
        <div className="relative z-10">
          <div className="flex items-center gap-4 mb-4">
            <button onClick={() => navigate("/marketing/ads")}
              className="flex h-10 w-10 items-center justify-center rounded-lg bg-white/20 backdrop-blur-md text-white border border-white/30 shadow-lg hover:bg-white/30 transition-all" title="Back to Ads Dashboard">
              <ArrowLeft className="h-5 w-5" />
            </button>
            <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-white/20 backdrop-blur-md text-white border border-white/30 shadow-lg">
              <TrendingUp className="h-7 w-7" />
            </div>
            <div>
              <h1 className="text-4xl font-bold text-white drop-shadow-lg">Ad Campaigns</h1>
              <p className="text-indigo-100 text-lg">Manage all ad campaigns</p>
            </div>
          </div>
        </div>
      </div>

      <div className="rounded-2xl border border-slate-200/50 dark:border-slate-800/50 bg-white dark:bg-slate-900 shadow-sm overflow-hidden">
        <div className="px-6 py-4 border-b border-slate-200/50 dark:border-slate-800/50 bg-gradient-to-r from-blue-50/50 to-indigo-50/50 dark:from-blue-950/20 dark:to-indigo-950/20">
          <div className="flex items-center justify-between flex-wrap gap-2">
            <div className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-blue-600 dark:text-blue-400" />
              <h2 className="font-bold text-slate-900 dark:text-white">All Ad Campaigns</h2>
              <span className="inline-flex items-center rounded-full bg-blue-100 dark:bg-blue-900/50 px-3 py-1 text-sm font-semibold text-blue-700 dark:text-blue-300">{filteredData.length} results</span>
            </div>
            <Button onClick={() => navigate("/marketing/ads/campaigns/add")} className="gap-2"><Plus className="h-4 w-4" />Create Campaign</Button>
          </div>
        </div>

        <div className="p-4 border-b border-slate-200/50 dark:border-slate-800/50 space-y-4">
          <div className="relative w-full md:w-96">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-slate-500" />
            <Input placeholder="Search campaigns..." className="pl-9" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
          </div>
          <div className="flex flex-wrap gap-3">
            <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}
              className="h-10 rounded-md border border-slate-200 bg-white px-3 text-sm dark:border-slate-700 dark:bg-slate-900">
              <option value="ALL">All Status</option>
              <option value="DRAFT">Draft</option>
              <option value="SCHEDULED">Scheduled</option>
              <option value="ACTIVE">Active</option>
              <option value="PAUSED">Paused</option>
              <option value="COMPLETED">Completed</option>
              <option value="CANCELLED">Cancelled</option>
              <option value="FAILED">Failed</option>
            </select>
            <select value={platformFilter} onChange={(e) => setPlatformFilter(e.target.value)}
              className="h-10 rounded-md border border-slate-200 bg-white px-3 text-sm dark:border-slate-700 dark:bg-slate-900">
              <option value="ALL">All Platforms</option>
              <option value="FACEBOOK">Facebook</option>
              <option value="INSTAGRAM">Instagram</option>
              <option value="FACEBOOK_INSTAGRAM">Facebook + Instagram</option>
            </select>
          </div>
        </div>

        <DataTable columns={columns} data={filteredData} showActions={false} />
      </div>

      {filteredData.length === 0 && (
        <div className="rounded-2xl border border-dashed border-slate-300 dark:border-slate-600 bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900/50 dark:to-slate-800/50 p-12 text-center">
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-slate-200 dark:bg-slate-700 mx-auto mb-4">
            <TrendingUp className="h-8 w-8 text-slate-600 dark:text-slate-400" />
          </div>
          <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">No campaigns found</h3>
          <p className="text-slate-600 dark:text-slate-400 mb-6">Try adjusting your search or filter criteria</p>
          <button onClick={() => navigate("/marketing/ads/campaigns/add")}
            className="inline-flex items-center gap-2 rounded-lg bg-gradient-to-r from-blue-600 to-indigo-600 px-6 py-2 font-semibold text-white shadow-lg hover:shadow-xl transition-all duration-200">
            <Plus className="h-4 w-4" />Create Your First Campaign
          </button>
        </div>
      )}

      <DeleteAdCampaignDialog title="Ad Campaign" isOpen={!!deleteItem} onClose={() => setDeleteItem(null)} onConfirm={handleDeleteConfirm} isLoading={isDeleting} />
    </div>
  );
}

