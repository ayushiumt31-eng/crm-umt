import { AlertTriangle, Loader2, X } from "lucide-react";

interface DeleteEmployeeDialogProps {
  open: boolean;
  employeeName: string;
  onConfirm: () => Promise<void> | void;
  onCancel: () => void;
  isLoading?: boolean;
}

export function DeleteEmployeeDialog({
  open,
  employeeName,
  onConfirm,
  onCancel,
  isLoading = false,
}: DeleteEmployeeDialogProps) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className="w-full max-w-sm rounded-2xl bg-white dark:bg-slate-900 shadow-2xl overflow-hidden">
        {/* Red gradient header with icon */}
        <div className="bg-gradient-to-r from-red-600 to-rose-600 dark:from-red-900 dark:to-rose-900 p-6 flex items-center gap-3">
          <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-white/20 backdrop-blur-md">
            <AlertTriangle className="h-6 w-6 text-white" />
          </div>
          <h2 className="flex-1 text-lg font-bold text-white">Delete Employee</h2>
          <button
            onClick={onCancel}
            disabled={isLoading}
            className="p-1 rounded-lg hover:bg-white/20 transition-colors disabled:opacity-50"
          >
            <X className="h-5 w-5 text-white" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-4">
          <p className="text-slate-600 dark:text-slate-300">
            Are you sure you want to delete <span className="font-semibold text-slate-900 dark:text-white">{employeeName}</span>? This action cannot be undone.
          </p>

          {/* Buttons */}
          <div className="flex gap-3 pt-4">
            <button
              onClick={onCancel}
              disabled={isLoading}
              className="flex-1 px-4 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white font-semibold hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Cancel
            </button>
            <button
              onClick={onConfirm}
              disabled={isLoading}
              className="flex-1 px-4 py-2 rounded-lg bg-gradient-to-r from-red-600 to-rose-600 dark:from-red-700 dark:to-rose-700 text-white font-semibold shadow-lg hover:shadow-xl transition-all duration-200 hover:from-red-700 hover:to-rose-700 disabled:opacity-50 disabled:cursor-not-allowed inline-flex items-center justify-center gap-2"
            >
              {isLoading && <Loader2 className="h-4 w-4 animate-spin" />}
              {isLoading ? "Deleting..." : "Delete"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
