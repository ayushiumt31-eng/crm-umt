import { Eye, Edit, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { Campaign } from "@/types/marketing";

interface CampaignTableProps {
  campaigns?: Campaign[];
  isLoading?: boolean;
  onView?: (id: string) => void;
  onEdit?: (id: string) => void;
  onDelete?: (id: string) => void;
}

export function CampaignTable({
  campaigns = [],
  isLoading = false,
  onView,
  onEdit,
  onDelete,
}: CampaignTableProps) {
  if (isLoading) {
    return (
      <div className="border border-slate-200 dark:border-slate-700 rounded-2xl p-8 text-center">
        <p className="text-muted-foreground">Loading campaigns...</p>
      </div>
    );
  }

  if (campaigns.length === 0) {
    return (
      <div className="border border-slate-200 dark:border-slate-700 rounded-2xl p-8 text-center">
        <p className="text-muted-foreground">No campaigns found</p>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto rounded-2xl border border-slate-200/50 dark:border-slate-700/50">
      <table className="w-full">
        <thead>
          <tr className="border-b border-slate-200/50 dark:border-slate-700/50 bg-slate-50 dark:bg-slate-800/50">
            <th className="px-6 py-4 text-left text-sm font-semibold text-slate-700 dark:text-slate-300">Campaign Name</th>
            <th className="px-6 py-4 text-left text-sm font-semibold text-slate-700 dark:text-slate-300">Channel</th>
            <th className="px-6 py-4 text-right text-sm font-semibold text-slate-700 dark:text-slate-300">Budget</th>
            <th className="px-6 py-4 text-right text-sm font-semibold text-slate-700 dark:text-slate-300">Spent</th>
            <th className="px-6 py-4 text-right text-sm font-semibold text-slate-700 dark:text-slate-300">Reach</th>
            <th className="px-6 py-4 text-right text-sm font-semibold text-slate-700 dark:text-slate-300">ROI</th>
            <th className="px-6 py-4 text-left text-sm font-semibold text-slate-700 dark:text-slate-300">Status</th>
            <th className="px-6 py-4 text-right text-sm font-semibold text-slate-700 dark:text-slate-300">Actions</th>
          </tr>
        </thead>
        <tbody>
          {campaigns.map((campaign, index) => (
            <tr
              key={campaign.id}
              className={`border-b border-slate-200/50 dark:border-slate-700/50 hover:bg-blue-50/50 dark:hover:bg-slate-800/50 transition-colors ${
                index % 2 === 0 ? "bg-white/50 dark:bg-slate-900/20" : "bg-slate-50/30 dark:bg-slate-800/20"
              }`}
            >
              <td className="px-6 py-4">
                <p className="font-semibold text-slate-900 dark:text-slate-100">{campaign.name}</p>
              </td>
              <td className="px-6 py-4">
                <span className="inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300">
                  {campaign.channel}
                </span>
              </td>
              <td className="px-6 py-4 text-right">
                <p className="text-slate-600 dark:text-slate-400 text-sm">${campaign.budget.toLocaleString()}</p>
              </td>
              <td className="px-6 py-4 text-right">
                <p className="text-slate-600 dark:text-slate-400 text-sm">${campaign.spent.toLocaleString()}</p>
              </td>
              <td className="px-6 py-4 text-right">
                <p className="text-slate-600 dark:text-slate-400 text-sm">{campaign.reach.toLocaleString()}</p>
              </td>
              <td className="px-6 py-4 text-right">
                <p className="font-semibold text-green-600 dark:text-green-400">{campaign.roi.toFixed(1)}%</p>
              </td>
              <td className="px-6 py-4">
                <span
                  className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold ${
                    campaign.status === "Active"
                      ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300"
                      : campaign.status === "Completed"
                      ? "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300"
                      : campaign.status === "Paused"
                      ? "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-300"
                      : "bg-slate-100 text-slate-700 dark:bg-slate-900/30 dark:text-slate-300"
                  }`}
                >
                  {campaign.status}
                </span>
              </td>
              <td className="px-6 py-4">
                <div className="flex justify-end gap-2">
                  <Button
                    variant="ghost"
                    size="icon-sm"
                    onClick={() => onView?.(campaign.id)}
                    title="View campaign"
                    className="hover:bg-blue-100 dark:hover:bg-blue-900/30 text-blue-600 dark:text-blue-400"
                  >
                    <Eye className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon-sm"
                    onClick={() => onEdit?.(campaign.id)}
                    title="Edit campaign"
                    className="hover:bg-cyan-100 dark:hover:bg-cyan-900/30 text-cyan-600 dark:text-cyan-400"
                  >
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon-sm"
                    onClick={() => onDelete?.(campaign.id)}
                    title="Delete campaign"
                    className="hover:bg-red-100 dark:hover:bg-red-900/30 text-red-600 dark:text-red-400"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
