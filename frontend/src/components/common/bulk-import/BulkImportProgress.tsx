import { Loader2, CheckCircle2, XCircle } from "lucide-react";

interface BulkImportProgressProps {
  status: "importing" | "completed" | "error";
  progress?: number;
  importedCount?: number;
  failedCount?: number;
  message?: string;
}

export function BulkImportProgress({
  status,
  progress,
  importedCount,
  failedCount,
  message,
}: BulkImportProgressProps) {
  if (status === "importing") {
    return (
      <div className="flex flex-col items-center justify-center py-8 space-y-4">
        <div className="relative">
          <Loader2 className="h-12 w-12 animate-spin text-blue-600 dark:text-blue-400" />
          {progress !== undefined && (
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-xs font-bold text-blue-600 dark:text-blue-400">
                {progress}%
              </span>
            </div>
          )}
        </div>
        <div className="text-center">
          <p className="font-semibold text-slate-900 dark:text-white">
            Importing records...
          </p>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
            {message || "Please wait while we process your data."}
          </p>
        </div>
      </div>
    );
  }

  if (status === "completed") {
    return (
      <div className="flex flex-col items-center justify-center py-8 space-y-4">
        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-emerald-100 dark:bg-emerald-900/30">
          <CheckCircle2 className="h-10 w-10 text-emerald-600 dark:text-emerald-400" />
        </div>
        <div className="text-center">
          <p className="text-lg font-bold text-emerald-700 dark:text-emerald-300">
            Import Complete
          </p>
          {importedCount !== undefined && (
            <p className="text-sm text-slate-600 dark:text-slate-400 mt-2">
              <span className="font-semibold text-emerald-600 dark:text-emerald-400">
                {importedCount}
              </span>{" "}
              records imported successfully.
              {failedCount && failedCount > 0 ? (
                <span className="text-red-600 dark:text-red-400">
                  {" "}
                  <span className="font-semibold">{failedCount}</span> records
                  could not be imported.
                </span>
              ) : null}
            </p>
          )}
          {message && (
            <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
              {message}
            </p>
          )}
        </div>
      </div>
    );
  }

  if (status === "error") {
    return (
      <div className="flex flex-col items-center justify-center py-8 space-y-4">
        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-red-100 dark:bg-red-900/30">
          <XCircle className="h-10 w-10 text-red-600 dark:text-red-400" />
        </div>
        <div className="text-center">
          <p className="text-lg font-bold text-red-700 dark:text-red-300">
            Import Failed
          </p>
          <p className="text-sm text-slate-600 dark:text-slate-400 mt-2">
            {message || "An error occurred during import. Please try again."}
          </p>
        </div>
      </div>
    );
  }

  return null;
}

