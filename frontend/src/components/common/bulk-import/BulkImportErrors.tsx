import type { ImportRow } from "./types";
import { AlertTriangle, XCircle, ChevronDown, ChevronRight } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";

interface BulkImportErrorsProps {
  invalidRows: ImportRow[];
}

export function BulkImportErrors({ invalidRows }: BulkImportErrorsProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  if (invalidRows.length === 0) return null;

  return (
    <div className="rounded-xl border border-red-200 dark:border-red-800/50 bg-red-50/50 dark:bg-red-950/20 overflow-hidden">
      {/* Header */}
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="flex items-center justify-between w-full px-4 py-3 hover:bg-red-100/50 dark:hover:bg-red-950/30 transition-colors"
      >
        <div className="flex items-center gap-2">
          <AlertTriangle className="h-5 w-5 text-red-500" />
          <span className="font-semibold text-red-700 dark:text-red-300">
            {invalidRows.length} {invalidRows.length === 1 ? "Row" : "Rows"} with Errors
          </span>
        </div>
        {isExpanded ? (
          <ChevronDown className="h-4 w-4 text-red-500" />
        ) : (
          <ChevronRight className="h-4 w-4 text-red-500" />
        )}
      </button>

      {/* Expanded Error List */}
      {isExpanded && (
        <div className="border-t border-red-200 dark:border-red-800/50 divide-y divide-red-100 dark:divide-red-900/30">
          {invalidRows.map((row) => (
            <div key={row.rowNumber} className="px-4 py-2.5">
              <div className="flex items-start gap-2">
                <XCircle className="h-4 w-4 text-red-500 shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm font-medium text-red-700 dark:text-red-300">
                    Row {row.rowNumber}
                  </p>
                  <ul className="mt-1 space-y-0.5">
                    {row.errors.map((error, i) => (
                      <li
                        key={i}
                        className="text-xs text-red-600 dark:text-red-400"
                      >
                        {error}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

