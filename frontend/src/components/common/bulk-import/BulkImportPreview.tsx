import type { ImportRow, ImportField, ImportSummary } from "./types";
import { CheckCircle2, XCircle, AlertTriangle } from "lucide-react";
import { cn } from "@/lib/utils";

interface BulkImportPreviewProps {
  rows: ImportRow[];
  fields: ImportField[];
  summary: ImportSummary;
}

export function BulkImportPreview({ rows, fields, summary }: BulkImportPreviewProps) {
  // Only show first 50 rows for performance
  const displayRows = rows.slice(0, 50);
  const hasMoreRows = rows.length > 50;

  return (
    <div className="space-y-6">
      {/* Summary Cards */}
      <div className="grid grid-cols-3 gap-4">
        {/* Total Rows */}
        <div className="rounded-xl bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900/50 dark:to-slate-800/50 border border-slate-200 dark:border-slate-700 p-4 text-center">
          <p className="text-2xl font-bold text-slate-900 dark:text-white">{summary.totalRows}</p>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">Total Rows</p>
        </div>

        {/* Valid Rows */}
        <div className="rounded-xl bg-gradient-to-br from-emerald-50 to-emerald-100 dark:from-emerald-950/40 dark:to-emerald-900/20 border border-emerald-200 dark:border-emerald-800/50 p-4 text-center">
          <p className="text-2xl font-bold text-emerald-700 dark:text-emerald-300">{summary.validRows}</p>
          <p className="text-xs text-emerald-600 dark:text-emerald-400 mt-1">Valid Rows</p>
        </div>

        {/* Invalid Rows */}
        <div className="rounded-xl bg-gradient-to-br from-red-50 to-red-100 dark:from-red-950/40 dark:to-red-900/20 border border-red-200 dark:border-red-800/50 p-4 text-center">
          <p className="text-2xl font-bold text-red-700 dark:text-red-300">{summary.invalidRows}</p>
          <p className="text-xs text-red-600 dark:text-red-400 mt-1">Invalid Rows</p>
        </div>
      </div>

      {/* Preview Table */}
      <div className="overflow-x-auto rounded-xl border border-slate-200 dark:border-slate-700">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-gradient-to-r from-slate-50 to-slate-100 dark:from-slate-800/50 dark:to-slate-800/30 border-b border-slate-200 dark:border-slate-700">
              <th className="px-4 py-3 text-left font-semibold text-slate-700 dark:text-slate-300 w-16">
                Row
              </th>
              {fields.slice(0, 5).map((field) => (
                <th
                  key={field.key}
                  className="px-4 py-3 text-left font-semibold text-slate-700 dark:text-slate-300"
                >
                  {field.label}
                  {field.required && (
                    <span className="text-red-500 ml-0.5">*</span>
                  )}
                </th>
              ))}
              <th className="px-4 py-3 text-center font-semibold text-slate-700 dark:text-slate-300 w-20">
                Status
              </th>
              <th className="px-4 py-3 text-left font-semibold text-slate-700 dark:text-slate-300 min-w-[200px]">
                Error
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
            {displayRows.map((row) => {
              const fieldKeys = fields.slice(0, 5).map((f) => f.key);
              return (
                <tr
                  key={row.rowNumber}
                  className={cn(
                    "hover:bg-slate-50 dark:hover:bg-slate-800/30 transition-colors",
                    !row.isValid && "bg-red-50/40 dark:bg-red-950/10"
                  )}
                >
                  <td className="px-4 py-2.5 text-slate-500 dark:text-slate-400 font-mono text-xs">
                    {row.rowNumber}
                  </td>
                  {fieldKeys.map((key) => (
                    <td
                      key={key}
                      className="px-4 py-2.5 text-slate-700 dark:text-slate-300 max-w-[150px] truncate"
                      title={String(row.data[key] ?? "")}
                    >
                      {String(row.data[key] ?? "")}
                    </td>
                  ))}
                  <td className="px-4 py-2.5 text-center">
                    {row.isValid ? (
                      <span className="inline-flex items-center gap-1 rounded-full bg-emerald-100 dark:bg-emerald-900/30 px-2.5 py-0.5 text-xs font-medium text-emerald-700 dark:text-emerald-300">
                        <CheckCircle2 className="h-3 w-3" />
                        Valid
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 rounded-full bg-red-100 dark:bg-red-900/30 px-2.5 py-0.5 text-xs font-medium text-red-700 dark:text-red-300">
                        <XCircle className="h-3 w-3" />
                        Invalid
                      </span>
                    )}
                  </td>
                  <td className="px-4 py-2.5">
                    {row.errors.length > 0 ? (
                      <div className="flex flex-col gap-0.5">
                        {row.errors.map((err, i) => (
                          <span
                            key={i}
                            className="text-xs text-red-600 dark:text-red-400"
                          >
                            {err}
                          </span>
                        ))}
                      </div>
                    ) : (
                      <span className="text-xs text-slate-400 dark:text-slate-500">
                        -
                      </span>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>

        {hasMoreRows && (
          <div className="flex items-center justify-center gap-2 py-3 bg-slate-50/50 dark:bg-slate-800/20 border-t border-slate-200 dark:border-slate-700">
            <AlertTriangle className="h-4 w-4 text-amber-500" />
            <span className="text-sm text-slate-500 dark:text-slate-400">
              Showing first 50 rows. {rows.length - 50} more rows available.
            </span>
          </div>
        )}
      </div>
    </div>
  );
}

