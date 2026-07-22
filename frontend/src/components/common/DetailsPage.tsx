import { useState } from "react";
import type { ReactNode } from "react";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Edit, Trash2 } from "lucide-react";
import type { LucideIcon } from "lucide-react";

// Types for flexible configuration
export interface DetailField {
  icon?: LucideIcon;
  iconColor?: string;
  iconBgColor?: string;
  label: string;
  value: ReactNode;
  type?: "text" | "email" | "phone" | "link" | "custom";
  href?: string;
  onClick?: () => void;
}

export interface DetailSection {
  title: string;
  icon?: LucideIcon;
  iconColor?: string;
  headerGradient?: string;
  fields: DetailField[];
  columns?: 1 | 2;
}

export interface StatusBadge {
  label: string;
  variant?: "success" | "warning" | "error" | "info" | "default";
  animated?: boolean;
}

export interface HeaderAction {
  label: string;
  icon?: LucideIcon;
  onClick: () => void;
  variant?: "primary" | "danger" | "ghost";
  disabled?: boolean;
}

interface DetailsPageProps {
  // Header Configuration
  title: string;
  subtitle?: string;
  status?: StatusBadge;
  headerGradient?: string;
  
  // Actions
  onBack: () => void;
  onEdit?: () => void;
  onDelete?: () => void;
  customActions?: HeaderAction[];
  
  // Content Sections
  sections: DetailSection[];
  
  // Layout
  gridLayout?: "1-col" | "2-col" | "3-col" | "custom";
  customLayout?: ReactNode;
  
  // Delete Confirmation
  deleteConfirmation?: {
    title: string;
    message: string;
    confirmLabel?: string;
    cancelLabel?: string;
  };
  
  // Footer
  showBackButton?: boolean;
  footerContent?: ReactNode;
}

export default function DetailsPage({
  title,
  subtitle = "Details",
  status,
  headerGradient = "from-blue-600 via-cyan-500 to-blue-600 dark:from-blue-900 dark:via-cyan-900 dark:to-blue-900",
  onBack,
  onEdit,
  onDelete,
  customActions,
  sections,
  gridLayout = "3-col",
  customLayout,
  deleteConfirmation,
  showBackButton = true,
  footerContent,
}: DetailsPageProps) {
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  // Handle delete with loading state
  const handleDelete = async () => {
    setIsDeleting(true);
    try {
      await onDelete?.();
    } finally {
      setIsDeleting(false);
      setShowDeleteConfirm(false);
    }
  };

  // Status badge variant styles
  const getStatusStyles = (variant?: StatusBadge["variant"]) => {
    switch (variant) {
      case "success":
        return "bg-green-500/30 text-white border-2 border-green-300/50";
      case "warning":
        return "bg-yellow-500/30 text-white border-2 border-yellow-300/50";
      case "error":
        return "bg-red-500/30 text-white border-2 border-red-300/50";
      case "info":
        return "bg-blue-500/30 text-white border-2 border-blue-300/50";
      default:
        return "bg-slate-500/30 text-white border-2 border-slate-300/50";
    }
  };

  // Get grid columns class
  const getGridClass = () => {
    switch (gridLayout) {
      case "1-col":
        return "grid grid-cols-1 gap-6";
      case "2-col":
        return "grid grid-cols-1 lg:grid-cols-2 gap-6";
      case "3-col":
        return "grid grid-cols-1 lg:grid-cols-3 gap-6";
      default:
        return "grid grid-cols-1 gap-6";
    }
  };

  // Render field value based on type
  const renderFieldValue = (field: DetailField) => {
    const baseClass = "text-lg font-semibold text-slate-900 dark:text-white";
    const linkClass = "text-lg font-semibold text-blue-600 dark:text-blue-400 hover:underline cursor-pointer";

    switch (field.type) {
      case "email":
        return (
          <a href={field.href || `mailto:${field.value}`} className={linkClass}>
            {field.value}
          </a>
        );
      case "phone":
        return (
          <a href={field.href || `tel:${field.value}`} className={linkClass}>
            {field.value}
          </a>
        );
      case "link":
        return (
          <a href={field.href} className={linkClass} target="_blank" rel="noopener noreferrer">
            {field.value}
          </a>
        );
      case "custom":
        return <div className="text-lg">{field.value}</div>;
      default:
        return <p className={baseClass}>{field.value}</p>;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header with Gradient Background */}
      <div className={`rounded-2xl bg-gradient-to-r ${headerGradient} p-8 shadow-lg overflow-hidden relative`}>
        {/* Animated background */}
        <div className="absolute inset-0 opacity-20">
          <div
            className="absolute top-0 left-0 w-96 h-96 bg-white/20 rounded-full blur-3xl animate-pulse"
            style={{ animation: "pulse 6s ease-in-out infinite" }}
          ></div>
          <div
            className="absolute bottom-0 right-0 w-96 h-96 bg-cyan-300/20 rounded-full blur-3xl animate-pulse"
            style={{ animationDelay: "3s" }}
          ></div>
        </div>

        <div className="relative z-10">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-4">
              <Button
                variant="ghost"
                size="icon"
                onClick={onBack}
                className="hover:bg-white/20 backdrop-blur-md text-white border border-white/30"
              >
                <ArrowLeft className="h-5 w-5" />
              </Button>
              <div>
                <p className="text-blue-100 text-sm mb-1">{subtitle}</p>
                <h1 className="text-4xl font-bold text-white drop-shadow-lg">{title}</h1>
              </div>
            </div>

            {/* Status Badge */}
            {status && (
              <div
                className={`flex items-center gap-2 rounded-full px-5 py-2.5 font-bold text-sm backdrop-blur-md ${getStatusStyles(
                  status.variant
                )}`}
              >
                {status.animated && (
                  <span
                    className={`inline-block w-2.5 h-2.5 rounded-full ${
                      status.variant === "success" ? "bg-green-200" : "bg-slate-200"
                    } animate-pulse`}
                  ></span>
                )}
                {status.label}
              </div>
            )}
          </div>

          {/* Quick Actions in Header */}
          <div className="flex flex-wrap gap-3">
            {onEdit && (
              <Button
                onClick={onEdit}
                className="bg-white/20 hover:bg-white/30 backdrop-blur-md text-white border border-white/30 px-6 py-2 rounded-lg flex items-center gap-2 transition-all"
              >
                <Edit className="h-4 w-4" />
                Edit
              </Button>
            )}
            
            {onDelete && (
              <Button
                onClick={() => setShowDeleteConfirm(true)}
                className="bg-red-500/20 hover:bg-red-500/30 backdrop-blur-md text-white border border-red-300/50 px-6 py-2 rounded-lg flex items-center gap-2 transition-all"
              >
                <Trash2 className="h-4 w-4" />
                Delete
              </Button>
            )}
            
            {customActions?.map((action, index) => (
              <Button
                key={index}
                onClick={action.onClick}
                disabled={action.disabled}
                className={`backdrop-blur-md text-white border px-6 py-2 rounded-lg flex items-center gap-2 transition-all ${
                  action.variant === "danger"
                    ? "bg-red-500/20 hover:bg-red-500/30 border-red-300/50"
                    : action.variant === "ghost"
                    ? "bg-white/10 hover:bg-white/20 border-white/20"
                    : "bg-white/20 hover:bg-white/30 border-white/30"
                }`}
              >
                {action.icon && <action.icon className="h-4 w-4" />}
                {action.label}
              </Button>
            ))}
          </div>
        </div>
      </div>

      {/* Delete Confirmation Dialog */}
      {showDeleteConfirm && deleteConfirmation && (
        <div className="fixed inset-0 bg-black/50 dark:bg-black/70 flex items-center justify-center z-50 p-4 backdrop-blur-sm">
          <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-2xl max-w-md w-full p-8 space-y-6 animate-in fade-in zoom-in duration-200">
            <div>
              <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">
                {deleteConfirmation.title}
              </h2>
              <p className="text-slate-600 dark:text-slate-400">{deleteConfirmation.message}</p>
            </div>
            <div className="flex gap-3 justify-end">
              <Button
                type="button"
                onClick={() => setShowDeleteConfirm(false)}
                variant="outline"
                className="px-6 py-2"
              >
                {deleteConfirmation.cancelLabel || "Cancel"}
              </Button>
              <Button
                type="button"
                onClick={handleDelete}
                disabled={isDeleting}
                className="bg-red-600 hover:bg-red-700 text-white px-6 py-2"
              >
                {isDeleting ? "Deleting..." : deleteConfirmation.confirmLabel || "Delete"}
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Content Sections */}
      {customLayout ? (
        customLayout
      ) : (
        <div className={getGridClass()}>
          {sections.map((section, sectionIndex) => (
            <div
              key={sectionIndex}
              className={`bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm overflow-hidden ${
                section.columns === 2 ? "lg:col-span-2" : ""
              }`}
            >
              {/* Section Header */}
              <div
                className={`${
                  section.headerGradient ||
                  "bg-gradient-to-r from-blue-50 to-cyan-50 dark:from-blue-950/20 dark:to-cyan-950/20"
                } px-6 py-4 border-b border-slate-200 dark:border-slate-700`}
              >
                <h3 className="font-bold text-slate-900 dark:text-white flex items-center gap-2">
                  {section.icon && (
                    <section.icon
                      className={`h-5 w-5 ${section.iconColor || "text-blue-600 dark:text-blue-400"}`}
                    />
                  )}
                  {section.title}
                </h3>
              </div>

              {/* Section Fields */}
              <div className="p-6 space-y-6">
                {section.fields.map((field, fieldIndex) => (
                  <div key={fieldIndex} className="flex items-start gap-4">
                    {field.icon && (
                      <div
                        className={`flex h-12 w-12 items-center justify-center rounded-lg flex-shrink-0 ${
                          field.iconBgColor || "bg-blue-100 dark:bg-blue-900/30"
                        } ${field.iconColor || "text-blue-600 dark:text-blue-400"}`}
                      >
                        <field.icon className="h-6 w-6" />
                      </div>
                    )}
                    <div className="flex-1">
                      <label className="block text-sm font-semibold text-slate-600 dark:text-slate-400 mb-1">
                        {field.label}
                      </label>
                      {renderFieldValue(field)}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Footer */}
      {(showBackButton || footerContent) && (
        <div className="flex justify-between items-center">
          {showBackButton && (
            <Button onClick={onBack} variant="outline" className="px-6 py-2 rounded-lg">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back
            </Button>
          )}
          {footerContent && <div className="flex-1 flex justify-end">{footerContent}</div>}
        </div>
      )}
    </div>
  );
}