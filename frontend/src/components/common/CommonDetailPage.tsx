import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Edit, Trash2 } from "lucide-react";

export interface DetailField {
  label: string;
  render: (data: any) => React.ReactNode;
}

export interface CommonDetailPageProps {
  data: Record<string, any> | null;
  loading?: boolean;
  error?: string | null;
  fields: Record<string, DetailField>;
  title: string;
  subtitle?: string;
  onEdit?: () => void;
  onDelete?: () => void;
  backPath: string;
  editPath?: string;
  deleteConfirmMessage?: string;
}

export function CommonDetailPage({
  data,
  loading = false,
  error = null,
  fields,
  title,
  subtitle,
  onEdit,
  onDelete,
  backPath,
  editPath,
  deleteConfirmMessage = "Are you sure you want to delete this?",
}: CommonDetailPageProps) {
  const navigate = useNavigate();

  if (loading) {
    return (
      <div className="text-center py-12">
        <p className="text-slate-600 dark:text-slate-400">Loading...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="space-y-6">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => navigate(backPath)}
          className="hover:bg-slate-100 dark:hover:bg-slate-800"
        >
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <div className="rounded-2xl border-2 border-dashed border-red-300 dark:border-red-600 bg-gradient-to-br from-red-50 to-red-100 dark:from-red-950/50 dark:to-red-900/50 p-12 text-center">
          <h3 className="text-lg font-bold text-red-900 dark:text-red-100 mb-2">{error}</h3>
          <Button
            onClick={() => navigate(backPath)}
            className="bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back
          </Button>
        </div>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="space-y-6">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => navigate(backPath)}
          className="hover:bg-slate-100 dark:hover:bg-slate-800"
        >
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <div className="rounded-2xl border-2 border-dashed border-slate-300 dark:border-slate-600 bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900/50 dark:to-slate-800/50 p-12 text-center">
          <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">Data Not Found</h3>
          <Button
            onClick={() => navigate(backPath)}
            className="bg-gradient-to-r from-slate-600 to-slate-700 hover:from-slate-700 hover:to-slate-800 text-white"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Header with Back Button */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => navigate(backPath)}
            className="hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg h-10 w-10 transition-all"
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <div>
            <p className="text-sm text-slate-600 dark:text-slate-400">{subtitle || title}</p>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-cyan-600 dark:from-blue-400 dark:to-cyan-400 bg-clip-text text-transparent">
              {data.name || data.title || "Details"}
            </h1>
          </div>
        </div>

        {/* Status Badge if available */}
        {data.status && (
          <div
            className={`flex items-center gap-2 rounded-full px-4 py-2 font-semibold ${
              data.status === "Active" || data.status === "Paid" || data.status === "Ready" || data.status === "Closed Won"
                ? "bg-gradient-to-r from-green-100 to-emerald-100 dark:from-green-950/40 dark:to-emerald-950/30 text-green-700 dark:text-green-300 border border-green-200/50 dark:border-green-800/50"
                : "bg-gradient-to-r from-slate-100 to-slate-200 dark:from-slate-950/40 dark:to-slate-900/30 text-slate-700 dark:text-slate-300 border border-slate-200/50 dark:border-slate-800/50"
            }`}
          >
            <span className={`inline-block w-2 h-2 rounded-full ${
              data.status === "Active" || data.status === "Paid" || data.status === "Ready" || data.status === "Closed Won"
                ? "bg-green-500"
                : "bg-slate-500"
            }`}></span>
            {data.status}
          </div>
        )}
      </div>

      {/* Details Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {Object.entries(fields).map(([key, field]) => (
          <div
            key={key}
            className="bg-white dark:bg-slate-800 rounded-xl p-6 border border-slate-200 dark:border-slate-700 shadow-sm hover:shadow-md transition-shadow"
          >
            <label className="block text-sm font-semibold text-slate-600 dark:text-slate-400 mb-3">
              {field.label}
            </label>
            <div className="text-lg text-slate-900 dark:text-white font-medium">
              {field.render(data)}
            </div>
          </div>
        ))}
      </div>

      {/* Actions */}
      <div className="flex gap-3 mt-8 flex-wrap">
        {onEdit && (
          <Button
            onClick={onEdit}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg flex items-center gap-2"
          >
            <Edit className="h-4 w-4" />
            Edit
          </Button>
        )}
        {editPath && (
          <Button
            onClick={() => navigate(editPath)}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg flex items-center gap-2"
          >
            <Edit className="h-4 w-4" />
            Edit
          </Button>
        )}
        {onDelete && (
          <Button
            onClick={() => {
              if (window.confirm(deleteConfirmMessage)) {
                onDelete();
              }
            }}
            className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-lg flex items-center gap-2"
          >
            <Trash2 className="h-4 w-4" />
            Delete
          </Button>
        )}
        <Button
          onClick={() => navigate(backPath)}
          variant="outline"
          className="px-6 py-2 rounded-lg"
        >
          Back
        </Button>
      </div>
    </div>
  );
}
