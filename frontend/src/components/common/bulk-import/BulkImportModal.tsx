import type { ReactNode } from "react";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

interface BulkImportModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  description?: string;
  children: ReactNode;
  size?: "md" | "lg" | "xl";
}

export function BulkImportModal({
  isOpen,
  onClose,
  title,
  description,
  children,
  size = "lg",
}: BulkImportModalProps) {
  if (!isOpen) return null;

  const sizeClasses = {
    md: "max-w-2xl",
    lg: "max-w-4xl",
    xl: "max-w-6xl",
  };

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center bg-black/50 p-4 animate-in fade-in duration-200 overflow-y-auto">
      <div className={`w-full ${sizeClasses[size]} my-8 animate-in zoom-in-95 slide-in-from-bottom-4 duration-200`}>
        <Card className="border-slate-200 dark:border-slate-700 shadow-2xl max-h-[90vh] flex flex-col overflow-hidden">
          <CardHeader className="border-b border-slate-200 dark:border-slate-700 bg-gradient-to-r from-blue-50 to-cyan-50 dark:from-slate-900 dark:to-slate-800 flex flex-row items-start justify-between shrink-0">
            <div className="min-w-0">
              <CardTitle className="text-xl truncate">{title}</CardTitle>
              {description && <CardDescription className="mt-1 line-clamp-2">{description}</CardDescription>}
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
          <CardContent className="pt-6 overflow-y-auto flex-1 min-h-0">
            {children}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

