import { useState, useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { Plus, Search, FolderOpen, TrendingUp, ArrowLeft } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/common/DataTable";
import { adTableColumns } from "../components/AdTableColumns";
import { DeleteAdCampaignDialog } from "../components/DeleteAdCampaignDialog";
import { adService } from "../services/adService";
import type { Ad } from "../types/ad";

export default function Ads() {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("ALL");
  const [platformFilter, setPlatformFilter] = useState<string>("ALL");
  const [deleteItem, setDeleteItem] = useState<Ad | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const [ads, setAds] = useState<Ad[]>([]);

  useEffect(() => {
    adService.getAds().then(setAds);
  }, []);

  const refreshData = () => {
    adService.getAds().then(setAds);
  };

  const filteredData = useMemo(() => {
    return ads.filter((a) => {
      const searchStr = searchTerm.toLowerCase();
      const matchesSearch =
        !searchTerm ||
        a.name.toLowerCase().includes(searchStr) ||
        a.headline.toLowerCase().includes(searchStr) ||
        a.adSetName.toLowerCase().includes(searchStr) ||
        a.campaignName.toLowerCase().includes(searchStr);
      const matchesStatus = statusFilter === "ALL" || a.status === statusFilter;
      const matchesPlatform = platformFilter === "ALL" || a.platform === platformFilter;
      return matchesSearch && matchesStatus && matchesPlatform;
    });
  }, [ads, searchTerm, statusFilter, platformFilter]);

  const handleDeleteConfirm = async () => {
    if (!deleteItem) return;
    setIsDeleting(true);
    try {
      await adService.deleteAd(deleteItem.id);
      setDeleteItem(null);
      refreshData();
    } finally {
      setIsDeleting(false);
    }
  };

  const columns = useMemo(() => {
    return adTableColumns.map((col) => {
      if (col.key === "id") {
        return {
          ...col,
          render: (_value: string, row: Ad) => (
            <div className="flex items-center gap-2">
              <button title="Delete"
                className="h-8 w-8 flex items-center justify-center rounded-md hover:bg-red-100 dark:hover:bg-red-900/30 text-red-600 dark:text-red-400"
                onClick={() => { const item = ads.find((x) => x.id === row.id); if (item) setDeleteItem(item); }}>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 6h18"/><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/></svg>
              </button>
            </div>
          ),
        };
      }
      return col;
    });
  }, [ads]);

  return (
    <div className="space-y-8">
      <div className="rounded-2xl bg-gradient-to-r from-cyan-600 via-teal-500 to-cyan-600 dark:from-cyan-900 dark:via-teal-900 dark:to-cyan-900 p-8 shadow-lg overflow-hidden relative">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-0 left-0 w-96 h-96 bg-white/20 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-teal-300/20 rounded-full blur-3xl animate-pulse" />
        </div>
        <div className="relative z-10">
          <div className="flex items-center gap-4 mb-4">
            <button onClick={() => navigate("/marketing/ads")}
              className="flex h-10 w-10 items-center justify-center rounded-lg bg-white/20 backdrop-blur-md text-white border border-white/30 shadow-lg hover:bg-white/30 transition-all" title="Back">
              <ArrowLeft className="h-5 w-5" />
            </button>
            <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-white/20 backdrop-blur-md text-white border border-white/30 shadow-lg">
              <FolderOpen className="h-7 w-7" />
            </div>
            <div>
              <h1 className="text-4xl font-bold text-white drop-shadow-lg">Ads</h1>
              <p className="text-cyan-100 text-lg">Manage individual ad creatives</p>
            </div>
          </div>
        </div>
      </div>

      <div className="rounded-2xl border border-slate-200/50 dark:border-slate-800/50 bg-white dark:bg-slate-900 shadow-sm overflow-hidden">
        <div className="px-6 py-4 border-b border-slate-200/50 dark:border-slate-800/50 bg-gradient-to-r from-cyan-50/50 to-teal-50/50 dark:from-cyan-950/20 dark:to-teal-950/20">
          <div className="flex items-center justify-between flex-wrap gap-2">
            <div className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-cyan-600 dark:text-cyan-400" />
              <h2 className="font-bold text-slate-900 dark:text-white">All Ads</h2>
              <span className="inline-flex items-center rounded-full bg-cyan-100 dark:bg-cyan-900/50 px-3 py-1 text-sm font-semibold text-cyan-700 dark:text-cyan-300">{filteredData.length} results</span>
            </div>
            <Button onClick={() => navigate("/marketing/ads/ads/add")} className="gap-2"><Plus className="h-4 w-4" />Create Ad</Button>
          </div>
        </div>

        <div className="p-4 border-b border-slate-200/50 dark:border-slate-800/50 space-y-4">
          <div className="relative w-full md:w-96">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-slate-500" />
            <Input placeholder="Search ads..." className="pl-9" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
          </div>
          <div className="flex flex-wrap gap-3">
            <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}
              className="h-10 rounded-md border border-slate-200 bg-white px-3 text-sm dark:border-slate-700 dark:bg-slate-900">
              <option value="ALL">All Status</option>
              <option value="DRAFT">Draft</option>
              <option value="ACTIVE">Active</option>
              <option value="PAUSED">Paused</option>
              <option value="REJECTED">Rejected</option>
              <option value="COMPLETED">Completed</option>
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
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-slate-200 dark:bg-slate-700 mx-auto mb-4"><FolderOpen className="h-8 w-8 text-slate-600 dark:text-slate-400" /></div>
          <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">No ads found</h3>
          <p className="text-slate-600 dark:text-slate-400 mb-6">Try adjusting your search or filter criteria</p>
          <button onClick={() => navigate("/marketing/ads/ads/add")}
            className="inline-flex items-center gap-2 rounded-lg bg-gradient-to-r from-cyan-600 to-teal-600 px-6 py-2 font-semibold text-white shadow-lg hover:shadow-xl transition-all duration-200">
            <Plus className="h-4 w-4" /> Create Your First Ad
          </button>
        </div>
      )}

      <DeleteAdCampaignDialog title="Ad" isOpen={!!deleteItem} onClose={() => setDeleteItem(null)} onConfirm={handleDeleteConfirm} isLoading={isDeleting} />
    </div>
  );
}

