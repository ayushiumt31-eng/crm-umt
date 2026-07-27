import { useState, useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { BarChart3, TrendingUp, ArrowLeft, Eye, MousePointerClick, Users, DollarSign } from "lucide-react";
import { adCampaignService } from "../services/adCampaignService";
import { adService } from "../services/adService";
import type { AdCampaign } from "../types/adCampaign";
import type { Ad } from "../types/ad";

export default function AdAnalytics() {
  const navigate = useNavigate();
  const [campaigns, setCampaigns] = useState<AdCampaign[]>([]);
  const [ads, setAds] = useState<Ad[]>([]);

  useEffect(() => {
    Promise.all([
      adCampaignService.getAdCampaigns(),
      adService.getAds(),
    ]).then(([c, a]) => {
      setCampaigns(c);
      setAds(a);
    });
  }, []);

  const metrics = useMemo(() => {
    const totalImpressions = ads.reduce((sum, a) => sum + a.impressions, 0);
    const totalClicks = ads.reduce((sum, a) => sum + a.clicks, 0);
    const totalLeads = ads.reduce((sum, a) => sum + a.leads, 0);
    const totalSpend = campaigns.reduce((sum, c) => sum + c.spent, 0);
    const totalBudget = campaigns.reduce((sum, c) => sum + c.budget, 0);
    const ctr = totalImpressions > 0 ? ((totalClicks / totalImpressions) * 100).toFixed(2) : "0.00";
    const cpc = totalClicks > 0 ? (totalSpend / totalClicks).toFixed(2) : "0.00";
    const cpl = totalLeads > 0 ? (totalSpend / totalLeads).toFixed(2) : "0.00";
    return { totalImpressions, totalClicks, totalLeads, totalSpend, totalBudget, ctr, cpc, cpl };
  }, [campaigns, ads]);

  const activeCampaigns = campaigns.filter((c) => c.status === "ACTIVE").length;

  const statCards = [
    { label: "Total Campaigns", value: campaigns.length, icon: TrendingUp, color: "from-blue-500 to-blue-600" },
    { label: "Active Campaigns", value: activeCampaigns, icon: TrendingUp, color: "from-green-500 to-green-600" },
    { label: "Total Impressions", value: metrics.totalImpressions.toLocaleString(), icon: Eye, color: "from-purple-500 to-purple-600" },
    { label: "Total Clicks", value: metrics.totalClicks.toLocaleString(), icon: MousePointerClick, color: "from-cyan-500 to-cyan-600" },
    { label: "Total Leads", value: metrics.totalLeads.toLocaleString(), icon: Users, color: "from-emerald-500 to-emerald-600" },
    { label: "Total Spend", value: `\u20B9${metrics.totalSpend.toLocaleString()}`, icon: DollarSign, color: "from-amber-500 to-amber-600" },
    { label: "CTR", value: `${metrics.ctr}%`, icon: TrendingUp, color: "from-indigo-500 to-indigo-600" },
    { label: "CPC", value: `\u20B9${metrics.cpc}`, icon: DollarSign, color: "from-rose-500 to-rose-600" },
    { label: "CPL", value: `\u20B9${metrics.cpl}`, icon: DollarSign, color: "from-teal-500 to-teal-600" },
  ];

  return (
    <div className="space-y-8">
      <div className="rounded-2xl bg-gradient-to-r from-emerald-600 via-teal-500 to-emerald-600 dark:from-emerald-900 dark:via-teal-900 dark:to-emerald-900 p-8 shadow-lg overflow-hidden relative">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-0 left-0 w-96 h-96 bg-white/20 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-emerald-300/20 rounded-full blur-3xl animate-pulse" />
        </div>
        <div className="relative z-10">
          <div className="flex items-center gap-4 mb-4">
            <button onClick={() => navigate("/marketing/ads")}
              className="flex h-10 w-10 items-center justify-center rounded-lg bg-white/20 backdrop-blur-md text-white border border-white/30 shadow-lg hover:bg-white/30 transition-all" title="Back">
              <ArrowLeft className="h-5 w-5" />
            </button>
            <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-white/20 backdrop-blur-md text-white border border-white/30 shadow-lg">
              <BarChart3 className="h-7 w-7" />
            </div>
            <div>
              <h1 className="text-4xl font-bold text-white drop-shadow-lg">Ad Analytics</h1>
              <p className="text-emerald-100 text-lg">View ad performance metrics</p>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {statCards.map((stat) => {
          const Icon = stat.icon;
          return (
            <div key={stat.label} className={`rounded-xl bg-gradient-to-br ${stat.color} p-6 text-white shadow-sm hover:shadow-lg transition-all duration-300`}>
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-sm font-semibold text-white/80">{stat.label}</h3>
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-white/20 backdrop-blur-md">
                  <Icon className="h-5 w-5" />
                </div>
              </div>
              <div className="text-3xl font-bold">{stat.value}</div>
            </div>
          );
        })}
      </div>

      <div className="rounded-xl bg-gradient-to-br from-amber-50 to-yellow-50 dark:from-amber-950/20 dark:to-yellow-950/20 border border-amber-200 dark:border-amber-800 p-6">
        <div className="flex items-start gap-3">
          <BarChart3 className="h-6 w-6 text-amber-600 dark:text-amber-400 mt-0.5 flex-shrink-0" />
          <div>
            <h3 className="font-bold text-amber-800 dark:text-amber-200 mb-1">Demo Analytics</h3>
            <p className="text-sm text-amber-700 dark:text-amber-300">
              These analytics are calculated from dummy/local data. Real advertising metrics, including
              impressions, clicks, CTR, CPC, and conversion tracking, will be available after Meta Ads API
              integration. No real ads are being served or tracked.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
