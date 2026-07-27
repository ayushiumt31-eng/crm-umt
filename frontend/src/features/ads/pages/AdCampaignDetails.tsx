import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect, useMemo } from "react";
import { ArrowLeft, Edit3, Printer, Trash2, TrendingUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/common/DataTable";
import { AdCampaignDetailsCard } from "../components/AdCampaignDetailsCard";
import { adSetTableColumns } from "../components/AdSetTableColumns";
import { DeleteAdCampaignDialog } from "../components/DeleteAdCampaignDialog";
import { adCampaignService } from "../services/adCampaignService";
import { adSetService } from "../services/adSetService";
import { adService } from "../services/adService";
import type { AdCampaign } from "../types/adCampaign";
import type { AdSet } from "../types/adSet";
import type { Ad } from "../types/ad";

export default function AdCampaignDetails() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [campaign, setCampaign] = useState<AdCampaign | null>(null);
  const [adSets, setAdSets] = useState<AdSet[]>([]);
  const [ads, setAds] = useState<Ad[]>([]);
  const [showDelete, setShowDelete] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;
    Promise.all([
      adCampaignService.getAdCampaignById(id),
      adSetService.getAdSets(),
      adService.getAds(),
    ]).then(([c, sets, adList]) => {
      if (c) setCampaign(c);
      setAdSets(sets.filter((s) => s.campaignId === id));
      setAds(adList.filter((a) => a.campaignId === id));
      setLoading(false);
    });
  }, [id]);

  const totalImpressions = useMemo(() => ads.reduce((sum, a) => sum + a.impressions, 0), [ads]);
  const totalClicks = useMemo(() => ads.reduce((sum, a) => sum + a.clicks, 0), [ads]);
  const totalLeads = useMemo(() => ads.reduce((sum, a) => sum + a.leads, 0), [ads]);

  const handleDelete = async () => {
    if (!id) return;
    setIsDeleting(true);
    try {
      await adCampaignService.deleteAdCampaign(id);
      navigate("/marketing/ads/campaigns");
    } finally {
      setIsDeleting(false);
    }
  };

const handlePrint = () => window.print();

  const adSetsColumns = useMemo(() => {
    return adSetTableColumns.map((col) => {
      if (col.key === "id") {
        return { ...col, render: () => null };
      }
      return col;
    });
  }, []);

  if (loading) {
    return <div className="max-w-6xl mx-auto text-center py-12"><p className="text-slate-500">Loading...</p></div>;
  }

  if (!campaign) {
    return (
      <div className="max-w-6xl mx-auto text-center py-12">
        <p className="text-slate-500">Campaign not found.</p>
        <button onClick={() => navigate("/marketing/ads/campaigns")} className="mt-4 text-blue-600 hover:underline">Back to Campaigns</button>
      </div>
    );
  }

return (
    <div className="space-y-8">
      <div className="rounded-2xl bg-gradient-to-r from-blue-600 via-indigo-500 to-purple-600 dark:from-blue-900 dark:via-indigo-900 dark:to-purple-900 p-8 shadow-lg overflow-hidden relative">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-0 left-0 w-96 h-96 bg-white/20 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-purple-300/20 rounded-full blur-3xl animate-pulse" />
        </div>
        <div className="relative z-10">
          <div className="flex items-center gap-4 mb-4">
            <button onClick={() => navigate("/marketing/ads/campaigns")}
              className="flex h-10 w-10 items-center justify-center rounded-lg bg-white/20 backdrop-blur-md text-white border border-white/30 shadow-lg hover:bg-white/30 transition-all" title="Back">
              <ArrowLeft className="h-5 w-5" />
            </button>
            <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-white/20 backdrop-blur-md text-white border border-white/30 shadow-lg">
              <TrendingUp className="h-7 w-7" />
            </div>
            <div className="flex-1">
              <h1 className="text-4xl font-bold text-white drop-shadow-lg">{campaign.name}</h1>
              <p className="text-indigo-100 text-lg">Ad Campaign Details</p>
            </div>
            <div className="flex gap-2">
              <Button variant="ghost" size="icon" onClick={handlePrint}
                className="h-10 w-10 bg-white/20 backdrop-blur-md text-white border border-white/30 hover:bg-white/30">
                <Printer className="h-5 w-5" />
              </Button>
              <Button onClick={() => navigate(`/marketing/ads/campaigns/${id}/edit`)}
                className="gap-2 bg-white/20 backdrop-blur-md text-white border border-white/30 hover:bg-white/30">
                <Edit3 className="h-4 w-4" /> Edit
              </Button>
              <Button variant="ghost" size="icon" onClick={() => setShowDelete(true)}
                className="h-10 w-10 bg-red-500/20 backdrop-blur-md text-red-200 border border-red-300/30 hover:bg-red-500/30">
                <Trash2 className="h-5 w-5" />
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
        <div className="xl:col-span-2 space-y-8">
          <div className="rounded-2xl border border-slate-200/50 dark:border-slate-800/50 bg-white dark:bg-slate-900 shadow-sm overflow-hidden">
            <div className="px-6 py-4 border-b border-slate-200/50 dark:border-slate-800/50 bg-gradient-to-r from-blue-50/50 to-indigo-50/50 dark:from-blue-950/20 dark:to-indigo-950/20">
              <h3 className="font-bold text-slate-900 dark:text-white">Campaign Information</h3>
            </div>
            <div className="p-6">
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                <div><p className="text-xs font-medium text-slate-500">Objective</p><p className="text-sm font-semibold text-slate-900 dark:text-white">{campaign.objective.replace(/_/g, " ").replace(/\b\w/g, (c) => c.toUpperCase())}</p></div>
                <div><p className="text-xs font-medium text-slate-500">Platform</p><p className="text-sm font-semibold text-slate-900 dark:text-white">{campaign.platform === "FACEBOOK_INSTAGRAM" ? "Facebook + Instagram" : campaign.platform}</p></div>
                <div><p className="text-xs font-medium text-slate-500">Budget Type</p><p className="text-sm font-semibold text-slate-900 dark:text-white">{campaign.budgetType === "DAILY" ? "Daily" : "Lifetime"}</p></div>
                <div><p className="text-xs font-medium text-slate-500">Budget</p><p className="text-sm font-semibold text-slate-900 dark:text-white">₹{campaign.budget.toLocaleString()}</p></div>
                <div><p className="text-xs font-medium text-slate-500">Spent</p><p className="text-sm font-semibold text-slate-900 dark:text-white">₹{campaign.spent.toLocaleString()}</p></div>
                <div><p className="text-xs font-medium text-slate-500">Audience</p><p className="text-sm font-semibold text-slate-900 dark:text-white">{campaign.audienceName || "—"}</p></div>
                <div><p className="text-xs font-medium text-slate-500">Start Date</p><p className="text-sm font-semibold text-slate-900 dark:text-white">{new Date(campaign.startDate).toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" })}</p></div>
                <div><p className="text-xs font-medium text-slate-500">End Date</p><p className="text-sm font-semibold text-slate-900 dark:text-white">{new Date(campaign.endDate).toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" })}</p></div>
                <div><p className="text-xs font-medium text-slate-500">Created By</p><p className="text-sm font-semibold text-slate-900 dark:text-white">{campaign.createdByName}</p></div>
              </div>
              {campaign.notes && <div className="mt-4"><p className="text-xs font-medium text-slate-500">Notes</p><p className="text-sm text-slate-700 dark:text-slate-300 mt-1">{campaign.notes}</p></div>}
            </div>
          </div>

          <div className="rounded-2xl border border-slate-200/50 dark:border-slate-800/50 bg-white dark:bg-slate-900 shadow-sm overflow-hidden">
            <div className="px-6 py-4 border-b border-slate-200/50 dark:border-slate-800/50 bg-gradient-to-r from-blue-50/50 to-indigo-50/50 dark:from-blue-950/20 dark:to-indigo-950/20">
              <h3 className="font-bold text-slate-900 dark:text-white">Ad Sets ({adSets.length})</h3>
            </div>
            <DataTable columns={adSetsColumns} data={adSets} showActions={false} />
          </div>
        </div>

        <div className="space-y-8">
          <AdCampaignDetailsCard campaign={campaign} totalImpressions={totalImpressions} totalClicks={totalClicks} totalLeads={totalLeads} />

          <div className="rounded-2xl border border-slate-200/50 dark:border-slate-800/50 bg-white dark:bg-slate-900 shadow-sm overflow-hidden">
            <div className="px-6 py-4 border-b border-slate-200/50 dark:border-slate-800/50 bg-gradient-to-r from-amber-50/50 to-yellow-50/50 dark:from-amber-950/20 dark:to-yellow-950/20">
              <h3 className="font-bold text-slate-900 dark:text-white">Quick Actions</h3>
            </div>
            <div className="p-6 space-y-3">
              <Button onClick={() => navigate(`/marketing/ads/sets/add?campaignId=${id}`)} className="w-full gap-2" variant="outline"><TrendingUp className="h-4 w-4" /> Add Ad Set</Button>
              <Button onClick={() => navigate(`/marketing/ads/ads/add?campaignId=${id}`)} className="w-full gap-2" variant="outline"><TrendingUp className="h-4 w-4" /> Add Ad Creative</Button>
            </div>
          </div>
        </div>
      </div>

      <DeleteAdCampaignDialog title="Ad Campaign" isOpen={showDelete} onClose={() => setShowDelete(false)} onConfirm={handleDelete} isLoading={isDeleting} />
    </div>
  );
}

