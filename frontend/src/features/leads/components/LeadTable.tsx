import { Mail, Phone, Eye, Edit, Trash2 } from "lucide-react";
import type { Lead } from "../types/lead";
import { LeadStatusBadge } from "./LeadStatusBadge";
import { LeadSourceBadge } from "./LeadSourceBadge";
import { Button } from "@/components/ui/button";

interface LeadTableProps {
  leads: Lead[];
  onView: (id: string) => void;
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
}

export function LeadTable({ leads, onView, onEdit, onDelete }: LeadTableProps) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead className="bg-slate-50 dark:bg-slate-800/50 border-b border-slate-200 dark:border-slate-700">
          <tr>
            <th className="px-6 py-4 text-left text-sm font-semibold text-slate-900 dark:text-white">Lead Name</th>
            <th className="px-6 py-4 text-left text-sm font-semibold text-slate-900 dark:text-white">Contact</th>
            <th className="px-6 py-4 text-left text-sm font-semibold text-slate-900 dark:text-white">Company</th>
            <th className="px-6 py-4 text-left text-sm font-semibold text-slate-900 dark:text-white">Deal Value</th>
            <th className="px-6 py-4 text-left text-sm font-semibold text-slate-900 dark:text-white">Status</th>
            <th className="px-6 py-4 text-left text-sm font-semibold text-slate-900 dark:text-white">Source</th>
            <th className="px-6 py-4 text-left text-sm font-semibold text-slate-900 dark:text-white">Assigned To</th>
            <th className="px-6 py-4 text-right text-sm font-semibold text-slate-900 dark:text-white">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-200 dark:divide-slate-700">
          {leads.map((lead) => (
            <tr
              key={lead.id}
              className="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors duration-150"
            >
              <td className="px-6 py-4">
                <div className="font-semibold text-slate-900 dark:text-white">{lead.leadName}</div>
              </td>
              <td className="px-6 py-4">
                <div className="space-y-1">
                  <div className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-300">
                    <Mail className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                    <a
                      href={`mailto:${lead.email}`}
                      className="hover:text-blue-600 dark:hover:text-blue-400 underline"
                    >
                      {lead.email}
                    </a>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-300">
                    <Phone className="h-4 w-4 text-green-600 dark:text-green-400" />
                    <a
                      href={`tel:${lead.phone}`}
                      className="hover:text-green-600 dark:hover:text-green-400 underline"
                    >
                      {lead.phone}
                    </a>
                  </div>
                </div>
              </td>
              <td className="px-6 py-4">
                <span className="text-sm text-slate-600 dark:text-slate-300">{lead.companyName}</span>
              </td>
              <td className="px-6 py-4">
                <span className="font-semibold text-slate-900 dark:text-white">
                  ${(lead.expectedDealValue / 1000).toFixed(0)}k
                </span>
              </td>
              <td className="px-6 py-4">
                <LeadStatusBadge status={lead.status} />
              </td>
              <td className="px-6 py-4">
                <LeadSourceBadge source={lead.source} />
              </td>
              <td className="px-6 py-4">
                <span className="inline-flex items-center rounded-full bg-slate-100 dark:bg-slate-700 px-3 py-1 text-sm font-medium text-slate-700 dark:text-slate-200">
                  {lead.assignedTo}
                </span>
              </td>
              <td className="px-6 py-4 text-right">
                <div className="flex justify-end gap-2">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => onView(lead.id)}
                    title="View lead"
                    className="hover:bg-blue-100 dark:hover:bg-blue-900/30 text-blue-600 dark:text-blue-400"
                  >
                    <Eye className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => onEdit(lead.id)}
                    title="Edit lead"
                    className="hover:bg-cyan-100 dark:hover:bg-cyan-900/30 text-cyan-600 dark:text-cyan-400"
                  >
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => onDelete(lead.id)}
                    title="Delete lead"
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
