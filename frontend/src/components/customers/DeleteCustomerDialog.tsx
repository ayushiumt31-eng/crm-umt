import { Button } from "@/components/ui/button";
import { AlertTriangle, Trash2, X } from "lucide-react";

interface DeleteCustomerDialogProps {
  open: boolean;
  customerName: string;
  onConfirm: () => void;
  onCancel: () => void;
  isLoading?: boolean;
}

export function DeleteCustomerDialog({
  open,
  customerName,
  onConfirm,
  onCancel,
  isLoading = false,
}: DeleteCustomerDialogProps) {
  if (!open) return null;

  return (
    <>
      {/* Backdrop */}
      <div 
        className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm animate-in fade-in duration-200"
        onClick={onCancel}
      />
      
      {/* Dialog */}
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none">
        <div className="w-full max-w-sm bg-white dark:bg-slate-900 rounded-xl shadow-xl border border-slate-200/50 dark:border-slate-700/50 overflow-hidden animate-in zoom-in-95 slide-in-from-bottom-4 duration-300 pointer-events-auto">
          
          {/* Header */}
          <div className="bg-gradient-to-r from-red-50 to-rose-50 dark:from-red-950/30 dark:to-rose-950/30 px-6 py-5 border-b border-red-200/50 dark:border-red-800/50 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-red-500 to-rose-600 text-white">
                <AlertTriangle className="h-5 w-5" />
              </div>
              <h2 className="text-lg font-bold text-red-900 dark:text-red-100">Delete Customer?</h2>
            </div>
            
            <button
              onClick={onCancel}
              disabled={isLoading}
              className="flex h-7 w-7 items-center justify-center rounded hover:bg-red-100 dark:hover:bg-red-900/50 transition-colors text-red-600 dark:text-red-400 disabled:opacity-50"
            >
              <X className="h-4 w-4" />
            </button>
          </div>

          {/* Content - Simple message only */}
          <div className="px-6 py-5">
            <p className="text-sm text-slate-700 dark:text-slate-300">
              Are you sure you want to delete <span className="font-bold text-red-600 dark:text-red-400">{customerName}</span>? This action cannot be undone.
            </p>
          </div>

          {/* Buttons */}
          <div className="bg-slate-50/50 dark:bg-slate-800/30 px-6 py-4 border-t border-slate-200/50 dark:border-slate-700/50 flex gap-3 justify-end">
            <Button
              onClick={onCancel}
              disabled={isLoading}
              className="px-4 py-2 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 text-slate-900 dark:text-white text-sm font-medium hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Cancel
            </Button>
            
            <Button
              onClick={onConfirm}
              disabled={isLoading}
              className="px-4 py-2 rounded-lg bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-700 hover:to-rose-700 text-white text-sm font-medium shadow-md hover:shadow-lg transition-all duration-200 flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Trash2 className="h-4 w-4" />
              {isLoading ? (
                <span className="flex items-center gap-1.5">
                  <span className="inline-block w-2 h-2 rounded-full border border-white border-t-transparent animate-spin"></span>
                  Deleting...
                </span>
              ) : (
                "Delete"
              )}
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}
