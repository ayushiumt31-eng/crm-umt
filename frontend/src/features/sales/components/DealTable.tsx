import { Eye, Edit, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { Deal } from "@/types/sales";

interface DealTableProps {
  deals?: Deal[];
  isLoading?: boolean;
  onView?: (id: string) => void;
  onEdit?: (id: string) => void;
  onDelete?: (id: string) => void;
}

export function DealTable({
  deals = [],
  isLoading = false,
  onView,
  onEdit,
  onDelete,
}: DealTableProps) {
  if (isLoading) {
    return (
      <div className="border border-slate-200 dark:border-slate-700 rounded-2xl p-8 text-center">
        <p className="text-muted-foreground">Loading deals...</p>
      </div>
    );
  }

  if (deals.length === 0) {
    return (
      <div className="border border-slate-200 dark:border-slate-700 rounded-2xl p-8 text-center">
        <p className="text-muted-foreground">No deals found</p>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto rounded-2xl border border-slate-200/50 dark:border-slate-700/50">
      <table className="w-full">
        <thead>
          <tr className="border-b border-slate-200/50 dark:border-slate-700/50 bg-slate-50 dark:bg-slate-800/50">
            <th className="px-6 py-4 text-left text-sm font-semibold text-slate-700 dark:text-slate-300">Deal Title</th>
            <th className="px-6 py-4 text-left text-sm font-semibold text-slate-700 dark:text-slate-300">Customer</th>
            <th className="px-6 py-4 text-right text-sm font-semibold text-slate-700 dark:text-slate-300">Value</th>
            <th className="px-6 py-4 text-left text-sm font-semibold text-slate-700 dark:text-slate-300">Owner</th>
            <th className="px-6 py-4 text-center text-sm font-semibold text-slate-700 dark:text-slate-300">Probability</th>
            <th className="px-6 py-4 text-left text-sm font-semibold text-slate-700 dark:text-slate-300">Status</th>
            <th className="px-6 py-4 text-left text-sm font-semibold text-slate-700 dark:text-slate-300">Priority</th>
            <th className="px-6 py-4 text-right text-sm font-semibold text-slate-700 dark:text-slate-300">Actions</th>
          </tr>
        </thead>
        <tbody>
          {deals.map((deal, index) => (
            <tr
              key={deal.id}
              className={`border-b border-slate-200/50 dark:border-slate-700/50 hover:bg-blue-50/50 dark:hover:bg-slate-800/50 transition-colors ${
                index % 2 === 0 ? "bg-white/50 dark:bg-slate-900/20" : "bg-slate-50/30 dark:bg-slate-800/20"
              }`}
            >
              <td className="px-6 py-4">
                <p className="font-semibold text-slate-900 dark:text-slate-100">{deal.title}</p>
              </td>
              <td className="px-6 py-4">
                <p className="text-slate-600 dark:text-slate-400 text-sm">{deal.customerName}</p>
              </td>
              <td className="px-6 py-4 text-right">
                <p className="font-semibold text-slate-900 dark:text-slate-100">
                  ${deal.value.toLocaleString()} {deal.currency}
                </p>
              </td>
              <td className="px-6 py-4">
                <p className="text-slate-600 dark:text-slate-400 text-sm">{deal.owner}</p>
              </td>
              <td className="px-6 py-4 text-center">
                <div className="flex items-center justify-center">
                  <div className="w-12 bg-slate-200 dark:bg-slate-700 rounded-full h-2">
                    <div
                      className="bg-gradient-to-r from-blue-500 to-cyan-500 h-2 rounded-full"
                      style={{ width: `${deal.probability}%` }}
                    ></div>
                  </div>
                  <span className="ml-2 text-xs font-semibold text-slate-600 dark:text-slate-400 w-8">
                    {deal.probability}%
                  </span>
                </div>
              </td>
              <td className="px-6 py-4">
                <span
                  className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold ${
                    deal.status === "Closed Won"
                      ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300"
                      : deal.status === "Closed Lost"
                      ? "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-300"
                      : deal.status === "Negotiation"
                      ? "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-300"
                      : deal.status === "Proposal"
                      ? "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300"
                      : "bg-slate-100 text-slate-700 dark:bg-slate-900/30 dark:text-slate-300"
                  }`}
                >
                  {deal.status}
                </span>
              </td>
              <td className="px-6 py-4">
                <span
                  className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold ${
                    deal.priority === "Critical"
                      ? "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-300"
                      : deal.priority === "High"
                      ? "bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-300"
                      : deal.priority === "Medium"
                      ? "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-300"
                      : "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300"
                  }`}
                >
                  {deal.priority}
                </span>
              </td>
              <td className="px-6 py-4">
                <div className="flex justify-end gap-2">
                  <Button
                    variant="ghost"
                    size="icon-sm"
                    onClick={() => onView?.(deal.id)}
                    title="View deal"
                    className="hover:bg-blue-100 dark:hover:bg-blue-900/30 text-blue-600 dark:text-blue-400"
                  >
                    <Eye className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon-sm"
                    onClick={() => onEdit?.(deal.id)}
                    title="Edit deal"
                    className="hover:bg-cyan-100 dark:hover:bg-cyan-900/30 text-cyan-600 dark:text-cyan-400"
                  >
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon-sm"
                    onClick={() => onDelete?.(deal.id)}
                    title="Delete deal"
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
