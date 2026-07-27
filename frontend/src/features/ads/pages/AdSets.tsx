import { useState, useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { Plus, Search, Layers, TrendingUp, ArrowLeft } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/common/DataTable";
import { adSetTableColumns } from "../components/AdSetTableColumns";
import { DeleteAdCampaignDialog } from "../components/DeleteAdCampaignDialog";
import { adSetService } from "../services/adSetService";
import type { AdSet } from "../types/adSet";

export default function AdSets() {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("ALL");
  const [deleteItem, setDeleteItem] = useState<AdSet | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const [adSets, setAdSets] = useState<AdSet[]>([]);

  useEffect(() => {
    adSetService.getAdSets().then(setAdSets);
  }, []);

  const refreshData = () => {
    adSetService.getAdSets().then(setAdSets);
  };

  const filteredData = useMemo(() => {
    return adSets.filter((s) => {
      const searchStr = searchTerm.toLowerCase();
      const matchesSearch =
        !searchTerm ||
        s.name.toLowerCase().includes(searchStr) ||
        s.campaignName.toLowerCase().includes(searchStr) ||
        (s.audienceName && s.audienceName.toLowerCase().includes(searchStr));
      const matchesStatus = statusFilter === "ALL" || s.status === statusFilter;
      return matchesSearch && matchesStatus;
    });
  }, [adSets, searchTerm, statusFilter]);

  const handleDeleteConfirm = async () => {
    if (!deleteItem) return;
    setIsDeleting(true);
    try {
      await adSetService.deleteAdSet(deleteItem.id);
      setDeleteItem(null);
      refreshData();
    } finally {
      setIsDeleting(false);
    }
  };

  const columns = useMemo(() => {
    return adSetTableColumns.map((col) => {
      if (col.key === "id") {
        return {
          ...col,
          render: (_value: string, row: AdSet) => (
            <div className="flex items-center gap-2">
              <button title="Delete"
                className="h-8 w-8 flex items-center justify-center rounded-md hover:bg-red-100 dark:hover:bg-red-900/30 text-red-600 dark:text-red-400"
                onClick={() => { const item = adSets.find((x) => x.id === row.id); if (item) setDeleteItem(item); }}>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 6h18"/><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/></svg>
              </button>
            </div>
          ),
        };
      }
      return col;
    });
  }, [adSets]);

  return (
    <div className="space-y-8">
      <div className="rounded-2xl bg-gradient-to-r from-purple-600 via-indigo-500 to-purple-600 dark:from-purple-900 dark:via-indigo-900 dark:to-purple-900 p-8 shadow-lg overflow-hidden relative">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-0 left-0 w-96 h-96 bg-white/20 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-purple-300/20 rounded-full blur-3xl animate-pulse" />
        </div>
        <div className="relative z-10">
          <div className="flex items-center gap-4 mb-4">
            <button onClick={() => navigate("/marketing/ads")}
              className="flex h-10 w-10 items-center justify-center rounded-lg bg-white/20 backdrop-blur-md text-white border border-white/30 shadow-lg hover:bg-white/30 transition-all" title="Back">
              <ArrowLeft className="h-5 w-5" />
            </button>
            <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-white/20 backdrop-blur-md text-white border border-white/30 shadow-lg">
              <Layers className="h-7 w-7" />
            </div>
            <div>
              <h1 className="text-4xl font-bold text-white drop-shadow-lg">Ad Sets</h1>
              <p className="text-indigo-100 text-lg">Manage ad sets within campaigns</p>
            </div>
          </div>
        </div>
      </div>

      <div className="rounded-2xl border border-slate-200/50 dark:border-slate-800/50 bg-white dark:bg-slate-900 shadow-sm overflow-hidden">
        <div className="px-6 py-4 border-b border-slate-200/50 dark:border-slate-800/50 bg-gradient-to-r from-purple-50/50 to-indigo-50/50 dark:from-purple-950/20 dark:to-indigo-950/20">
          <div className="flex items-center justify-between flex-wrap gap-2">
            <div className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-purple-600 dark:text-purple-400" />
              <h2 className="font-bold text-slate-900 dark:text-white">All Ad Sets</h2>
              <span className="inline-flex items-center rounded-full bg-purple-100 dark:bg-purple-900/50 px-3 py-1 text-sm font-semibold text-purple-700 dark:text-purple-300">{filteredData.length} results</span>
            </div>
            <Button onClick={() => navigate("/marketing/ads/sets/add")} className="gap-2"><Plus className="h-4 w-4" />Create Ad Set</Button>
          </div>
        </div>

        <div className="p-4 border-b border-slate-200/50 dark:border-slate-800/50 space-y-4">
          <div className="relative w-full md:w-96">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-slate-500" />
            <Input placeholder="Search ad sets..." className="pl-9" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
          </div>
          <div className="flex flex-wrap gap-3">
            <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}
              className="h-10 rounded-md border border-slate-200 bg-white px-3 text-sm dark:border-slate-700 dark:bg-slate-900">
              <option value="ALL">All Status</option>
              <option value="DRAFT">Draft</option>
              <option value="ACTIVE">Active</option>
              <option value="PAUSED">Paused</option>
              <option value="COMPLETED">Completed</option>
              <option value="CANCELLED">Cancelled</option>
            </select>
          </div>
        </div>

        <DataTable columns={columns} data={filteredData} showActions={false} />
      </div>

      {filteredData.length === 0 && (
        <div className="rounded-2xl border border-dashed border-slate-300 dark:border-slate-600 bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900/50 dark:to-slate-800/50 p-12 text-center">
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-slate-200 dark:bg-slate-700 mx-auto mb-4"><Layers className="h-8 w-8 text-slate-600 dark:text-slate-400" /></div>
          <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">No ad sets found</h3>
          <p className="text-slate-600 dark:text-slate-400 mb-6">Try adjusting your search or filter criteria</p>
          <button onClick={() => navigate("/marketing/ads/sets/add")}
            className="inline-flex items-center gap-2 rounded-lg bg-gradient-to-r from-purple-600 to-indigo-600 px-6 py-2 font-semibold text-white shadow-lg hover:shadow-xl transition-all duration-200">
            <Plus className="h-4 w-4" /> Create Your First Ad Set
          </button>
        </div>
      )}

      <DeleteAdCampaignDialog title="Ad Set" isOpen={!!deleteItem} onClose={() => setDeleteItem(null)} onConfirm={handleDeleteConfirm} isLoading={isDeleting} />
    </div>
  );
}

