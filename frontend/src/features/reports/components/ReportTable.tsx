import { Eye, Download, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { Report } from "@/types/reports";

interface ReportTableProps {
  reports?: Report[];
  isLoading?: boolean;
  onView?: (id: string) => void;
  onDownload?: (id: string) => void;
  onDelete?: (id: string) => void;
}

export function ReportTable({
  reports = [],
  isLoading = false,
  onView,
  onDownload,
  onDelete,
}: ReportTableProps) {
  if (isLoading) {
    return (
      <div className="border border-slate-200 dark:border-slate-700 rounded-2xl p-8 text-center">
        <p className="text-muted-foreground">Loading reports...</p>
      </div>
    );
  }

  if (reports.length === 0) {
    return (
      <div className="border border-slate-200 dark:border-slate-700 rounded-2xl p-8 text-center">
        <p className="text-muted-foreground">No reports found</p>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto rounded-2xl border border-slate-200/50 dark:border-slate-700/50">
      <table className="w-full">
        <thead>
          <tr className="border-b border-slate-200/50 dark:border-slate-700/50 bg-slate-50 dark:bg-slate-800/50">
            <th className="px-6 py-4 text-left text-sm font-semibold text-slate-700 dark:text-slate-300">Report Name</th>
            <th className="px-6 py-4 text-left text-sm font-semibold text-slate-700 dark:text-slate-300">Type</th>
            <th className="px-6 py-4 text-left text-sm font-semibold text-slate-700 dark:text-slate-300">Frequency</th>
            <th className="px-6 py-4 text-right text-sm font-semibold text-slate-700 dark:text-slate-300">Records</th>
            <th className="px-6 py-4 text-left text-sm font-semibold text-slate-700 dark:text-slate-300">Generated</th>
            <th className="px-6 py-4 text-left text-sm font-semibold text-slate-700 dark:text-slate-300">Status</th>
            <th className="px-6 py-4 text-right text-sm font-semibold text-slate-700 dark:text-slate-300">Actions</th>
          </tr>
        </thead>
        <tbody>
          {reports.map((report, index) => (
            <tr
              key={report.id}
              className={`border-b border-slate-200/50 dark:border-slate-700/50 hover:bg-blue-50/50 dark:hover:bg-slate-800/50 transition-colors ${
                index % 2 === 0 ? "bg-white/50 dark:bg-slate-900/20" : "bg-slate-50/30 dark:bg-slate-800/20"
              }`}
            >
              <td className="px-6 py-4">
                <p className="font-semibold text-slate-900 dark:text-slate-100">{report.name}</p>
              </td>
              <td className="px-6 py-4">
                <span className="inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-300">
                  {report.type}
                </span>
              </td>
              <td className="px-6 py-4">
                <span className="text-slate-600 dark:text-slate-400 text-sm">{report.frequency}</span>
              </td>
              <td className="px-6 py-4 text-right">
                <p className="text-slate-600 dark:text-slate-400 text-sm">{report.metrics.totalRecords}</p>
              </td>
              <td className="px-6 py-4">
                <p className="text-slate-600 dark:text-slate-400 text-sm">
                  {new Date(report.generatedDate).toLocaleDateString()}
                </p>
              </td>
              <td className="px-6 py-4">
                <span
                  className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold ${
                    report.status === "Ready"
                      ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300"
                      : report.status === "Pending"
                      ? "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-300"
                      : "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-300"
                  }`}
                >
                  {report.status}
                </span>
              </td>
              <td className="px-6 py-4">
                <div className="flex justify-end gap-2">
                  <Button
                    variant="ghost"
                    size="icon-sm"
                    onClick={() => onView?.(report.id)}
                    title="View report"
                    className="hover:bg-blue-100 dark:hover:bg-blue-900/30 text-blue-600 dark:text-blue-400"
                  >
                    <Eye className="h-4 w-4" />
                  </Button>
                  {report.fileUrl && (
                    <Button
                      variant="ghost"
                      size="icon-sm"
                      onClick={() => onDownload?.(report.id)}
                      title="Download report"
                      className="hover:bg-green-100 dark:hover:bg-green-900/30 text-green-600 dark:text-green-400"
                    >
                      <Download className="h-4 w-4" />
                    </Button>
                  )}
                  <Button
                    variant="ghost"
                    size="icon-sm"
                    onClick={() => onDelete?.(report.id)}
                    title="Delete report"
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
