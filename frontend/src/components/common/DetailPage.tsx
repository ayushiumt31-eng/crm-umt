import React from "react";
import { ArrowLeft, Edit, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { COMMON_STYLES } from "@/constants/theme";

export interface DetailField {
  label: string;
  render: (data: any) => React.ReactNode;
}

export interface DetailPageProps {
  data: Record<string, any> | null;
  loading?: boolean;
  error?: string | null;
  fields: Record<string, DetailField>;
  title: string;
  icon: React.ReactNode;
  onEdit?: () => void;
  onDelete?: () => void;
  onBack: () => void;
}

/**
 * Generic Detail Page Component
 * Usage: <DetailPage data={data} fields={fields} onEdit={handleEdit} onBack={handleBack} />
 */
export function DetailPage({
  data,
  loading = false,
  error = null,
  fields,
  title,
  icon,
  onEdit,
  onDelete,
  onBack,
}: DetailPageProps) {
  if (loading) {
    return <div className="text-center py-12">Loading...</div>;
  }

  if (error) {
    return <div className="text-center py-12 text-red-600">{error}</div>;
  }

  if (!data) {
    return <div className="text-center py-12 text-gray-600">No data found</div>;
  }

  return (
    <div className="space-y-8">
      {/* Back Button */}
      <button
        onClick={onBack}
        className="flex items-center gap-2 mb-6 text-blue-600 hover:text-blue-700 dark:text-blue-400"
      >
        <ArrowLeft className="h-4 w-4" />
        Back
      </button>

      {/* Header */}
      <div className={COMMON_STYLES.pageHeader}>
        <div className="relative z-10">
          <div className="flex items-center gap-4">
            <div className={COMMON_STYLES.headerIcon}>{icon}</div>
            <div>
              <h1 className={COMMON_STYLES.headerTitle}>{title}</h1>
              <p className={COMMON_STYLES.headerSubtitle}>
                {data.name || data.firstName || "Details"}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {Object.entries(fields).map(([key, field]) => (
          <div
            key={key}
            className="bg-white dark:bg-slate-800 rounded-lg p-4 border border-slate-200 dark:border-slate-700"
          >
            <label className="block text-sm font-semibold text-slate-600 dark:text-slate-400 mb-2">
              {field.label}
            </label>
            <div className="text-lg text-slate-900 dark:text-white">
              {field.render(data)}
            </div>
          </div>
        ))}
      </div>

      {/* Actions */}
      <div className="flex gap-3 mt-8">
        {onEdit && (
          <Button
            onClick={onEdit}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2"
          >
            <Edit className="h-4 w-4 mr-2" />
            Edit
          </Button>
        )}
        {onDelete && (
          <Button
            onClick={onDelete}
            className="bg-red-600 hover:bg-red-700 text-white px-6 py-2"
          >
            <Trash2 className="h-4 w-4 mr-2" />
            Delete
          </Button>
        )}
        <Button
          onClick={onBack}
          variant="outline"
          className="px-6 py-2"
        >
          Back
        </Button>
      </div>
    </div>
  );
}
