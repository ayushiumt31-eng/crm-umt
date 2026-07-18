import type { ReactNode } from "react";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

interface FormModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  description?: string;
  children: ReactNode;
  submitButtonText?: string;
  cancelButtonText?: string;
  onSubmit?: () => void;
  isLoading?: boolean;
  size?: "sm" | "md" | "lg";
  icon?: ReactNode;
  variant?: "modal" | "card" | "drawer";
}

export function FormModal({
  isOpen,
  onClose,
  title,
  description,
  children,
  submitButtonText = "Submit",
  cancelButtonText = "Cancel",
  onSubmit,
  isLoading = false,
  size = "md",
  icon,
  variant = "modal",
}: FormModalProps) {
  if (!isOpen && variant === "modal") {
    return null;
  }

  const sizeClasses = {
    sm: "max-w-md",
    md: "max-w-2xl",
    lg: "max-w-4xl",
  };

  // Modal Variant
  if (variant === "modal") {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 animate-in fade-in duration-200 overflow-y-auto">
        <div className={`w-full ${sizeClasses[size]} my-8 animate-in zoom-in-95 slide-in-from-bottom-4 duration-200`}>
          <Card className="border-slate-200 dark:border-slate-700 shadow-2xl max-h-[90vh] flex flex-col overflow-hidden">
            <CardHeader className="border-b border-slate-200 dark:border-slate-700 bg-gradient-to-r from-blue-50 to-cyan-50 dark:from-slate-900 dark:to-slate-800 flex flex-row items-start justify-between shrink-0">
              <div className="flex items-center gap-3 min-w-0">
                {icon && <div className="flex-shrink-0">{icon}</div>}
                <div className="min-w-0">
                  <CardTitle className="text-xl truncate">{title}</CardTitle>
                  {description && <CardDescription className="mt-1 line-clamp-2">{description}</CardDescription>}
                </div>
              </div>
              <Button
                variant="ghost"
                size="icon"
                onClick={onClose}
                className="h-8 w-8 -mt-2 -mr-2 flex-shrink-0"
              >
                <X className="h-5 w-5" />
              </Button>
            </CardHeader>
            <CardContent className="pt-6 overflow-y-auto flex-1 min-h-0">{children}</CardContent>
            {onSubmit && (
              <div className="flex gap-3 justify-end p-6 border-t border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/50 shrink-0">
                <Button
                  variant="outline"
                  onClick={onClose}
                  disabled={isLoading}
                >
                  {cancelButtonText}
                </Button>
                <Button
                  onClick={onSubmit}
                  disabled={isLoading}
                  className="bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700"
                >
                  {submitButtonText}
                </Button>
              </div>
            )}
          </Card>
        </div>
      </div>
    );
  }

  // Card Variant
  if (variant === "card") {
    return (
      <Card className="border-slate-200 dark:border-slate-700 shadow-lg">
        <CardHeader className="border-b border-slate-200 dark:border-slate-700 bg-gradient-to-r from-blue-50 to-cyan-50 dark:from-slate-900 dark:to-slate-800">
          <div className="flex items-center gap-3">
            {icon && <div className="flex-shrink-0">{icon}</div>}
            <div>
              <CardTitle className="text-xl">{title}</CardTitle>
              {description && <CardDescription className="mt-1">{description}</CardDescription>}
            </div>
          </div>
        </CardHeader>
        <CardContent className="pt-6">{children}</CardContent>
        {onSubmit && (
          <div className="flex gap-3 justify-end p-6 border-t border-slate-200 dark:border-slate-700">
            <Button
              variant="outline"
              onClick={onClose}
              disabled={isLoading}
            >
              {cancelButtonText}
            </Button>
            <Button
              onClick={onSubmit}
              disabled={isLoading}
              className="bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700"
            >
              {submitButtonText}
            </Button>
          </div>
        )}
      </Card>
    );
  }

  // Drawer Variant
  return (
    <>
      {isOpen && <div className="fixed inset-0 z-40 bg-black/30 animate-in fade-in duration-200" onClick={onClose} />}
      <div
        className={`fixed right-0 top-0 z-50 h-screen w-full max-w-md bg-white dark:bg-slate-900 shadow-2xl transition-transform duration-200 ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex h-full flex-col">
          <div className="border-b border-slate-200 dark:border-slate-700 bg-gradient-to-r from-blue-50 to-cyan-50 dark:from-slate-900 dark:to-slate-800 px-6 py-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              {icon && <div className="flex-shrink-0">{icon}</div>}
              <div>
                <h2 className="font-bold text-lg text-slate-900 dark:text-white">{title}</h2>
                {description && <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">{description}</p>}
              </div>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={onClose}
              className="h-8 w-8"
            >
              <X className="h-5 w-5" />
            </Button>
          </div>

          <div className="flex-1 overflow-y-auto px-6 py-6">{children}</div>

          {onSubmit && (
            <div className="border-t border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 px-6 py-4 flex gap-3 justify-end">
              <Button
                variant="outline"
                onClick={onClose}
                disabled={isLoading}
              >
                {cancelButtonText}
              </Button>
              <Button
                onClick={onSubmit}
                disabled={isLoading}
                className="bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700"
              >
                {submitButtonText}
              </Button>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
