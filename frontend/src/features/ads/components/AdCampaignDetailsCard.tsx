import type { AdCampaign } from "../types/adCampaign";
import { AdCampaignStatusBadge } from "./AdCampaignStatusBadge";

interface AdCampaignDetailsCardProps {
  campaign: AdCampaign;
  totalImpressions?: number;
  totalClicks?: number;
  totalLeads?: number;
}

export function AdCampaignDetailsCard({
  campaign,
  totalImpressions = 0,
  totalClicks = 0,
  totalLeads = 0,
}: AdCampaignDetailsCardProps) {
  const ctr = totalImpressions > 0
    ? ((totalClicks / totalImpressions) * 100).toFixed(2)
    : "0.00";
  const cpc = totalClicks > 0
    ? (campaign.spent / totalClicks).toFixed(2)
    : "0.00";
  const cpl = totalLeads > 0
    ? (campaign.spent / totalLeads).toFixed(2)
    : "0.00";

  return (
    <div className="rounded-2xl border border-slate-200/50 dark:border-slate-800/50 bg-white dark:bg-slate-900 shadow-sm overflow-hidden">
      <div className="px-6 py-4 border-b border-slate-200/50 dark:border-slate-800/50 bg-gradient-to-r from-blue-50/50 to-cyan-50/50 dark:from-blue-950/20 dark:to-cyan-950/20">
        <h3 className="font-bold text-slate-900 dark:text-white">
          Campaign Performance (Demo)
        </h3>
      </div>
      <div className="p-6">
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          <div className="p-3 rounded-lg bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-700">
            <p className="text-xs font-medium text-slate-500 dark:text-slate-400">Impressions</p>
            <p className="text-xl font-bold text-slate-900 dark:text-white">
              {totalImpressions.toLocaleString()}
            </p>
          </div>
          <div className="p-3 rounded-lg bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-700">
            <p className="text-xs font-medium text-slate-500 dark:text-slate-400">Clicks</p>
            <p className="text-xl font-bold text-slate-900 dark:text-white">
              {totalClicks.toLocaleString()}
            </p>
          </div>
          <div className="p-3 rounded-lg bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-700">
            <p className="text-xs font-medium text-slate-500 dark:text-slate-400">Leads</p>
            <p className="text-xl font-bold text-slate-900 dark:text-white">
              {totalLeads.toLocaleString()}
            </p>
          </div>
          <div className="p-3 rounded-lg bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-700">
            <p className="text-xs font-medium text-slate-500 dark:text-slate-400">Spend</p>
            <p className="text-xl font-bold text-slate-900 dark:text-white">
              ₹{campaign.spent.toLocaleString()}
            </p>
          </div>
          <div className="p-3 rounded-lg bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-700">
            <p className="text-xs font-medium text-slate-500 dark:text-slate-400">CTR</p>
            <p className="text-xl font-bold text-slate-900 dark:text-white">{ctr}%</p>
          </div>
          <div className="p-3 rounded-lg bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-700">
            <p className="text-xs font-medium text-slate-500 dark:text-slate-400">CPC</p>
            <p className="text-xl font-bold text-slate-900 dark:text-white">₹{cpc}</p>
          </div>
          <div className="p-3 rounded-lg bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-700">
            <p className="text-xs font-medium text-slate-500 dark:text-slate-400">CPL</p>
            <p className="text-xl font-bold text-slate-900 dark:text-white">₹{cpl}</p>
          </div>
          <div className="p-3 rounded-lg bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-700">
            <p className="text-xs font-medium text-slate-500 dark:text-slate-400">Status</p>
            <div className="mt-1">
              <AdCampaignStatusBadge status={campaign.status} />
            </div>
          </div>
        </div>
        <p className="text-xs text-amber-600 dark:text-amber-400 italic mt-4">
          Demo analytics — real advertising metrics will be available after
          Meta Ads API integration.
        </p>
      </div>
    </div>
  );
}
