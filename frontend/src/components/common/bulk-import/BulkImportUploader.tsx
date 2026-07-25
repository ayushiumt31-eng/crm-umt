import { useState, useRef, useCallback } from "react";
import { Upload, FileText, X, AlertCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

interface BulkImportUploaderProps {
  onFileSelect: (file: File) => void;
  selectedFile: File | null;
  error: string | null;
  disabled?: boolean;
}

export function BulkImportUploader({
  onFileSelect,
  selectedFile,
  error,
  disabled = false,
}: BulkImportUploaderProps) {
  const [isDragging, setIsDragging] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (!disabled) setIsDragging(true);
  }, [disabled]);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  }, []);

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      e.stopPropagation();
      setIsDragging(false);

      if (disabled) return;

      const files = e.dataTransfer.files;
      if (files.length > 0) {
        onFileSelect(files[0]);
      }
    },
    [onFileSelect, disabled]
  );

  const handleBrowseClick = useCallback(() => {
    if (!disabled) {
      inputRef.current?.click();
    }
  }, [disabled]);

  const handleFileChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const files = e.target.files;
      if (files && files.length > 0) {
        onFileSelect(files[0]);
      }
      // Reset input so same file can be re-selected
      if (inputRef.current) {
        inputRef.current.value = "";
      }
    },
    [onFileSelect]
  );

  const handleRemoveFile = useCallback(
    (e: React.MouseEvent) => {
      e.stopPropagation();
      // Clear the file by passing a null-like signal
      // Parent should handle this
      const dt = new DataTransfer();
      const emptyInput = { files: dt.files } as HTMLInputElement;
      const event = new Event("change", { bubbles: true });
      Object.defineProperty(event, "target", { value: emptyInput, writable: false });
      // Instead, parent resets on its own - we just trigger without file
      // This is a workaround: parent knows file is cleared when onFileSelect(null)
    },
    []
  );

  return (
    <div className="space-y-4">
      {/* Drag & Drop Zone */}
      <div
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={handleBrowseClick}
        className={cn(
          "relative flex flex-col items-center justify-center rounded-2xl border-2 border-dashed p-8 transition-all duration-200 cursor-pointer",
          isDragging
            ? "border-blue-500 bg-blue-50 dark:border-blue-400 dark:bg-blue-950/30"
            : selectedFile
            ? "border-emerald-300 bg-emerald-50/50 dark:border-emerald-700 dark:bg-emerald-950/20"
            : "border-slate-300 bg-slate-50/50 dark:border-slate-600 dark:bg-slate-900/50 hover:border-blue-400 dark:hover:border-blue-500",
          disabled && "opacity-50 cursor-not-allowed"
        )}
      >
        <input
          ref={inputRef}
          type="file"
          accept=".csv,.xlsx"
          onChange={handleFileChange}
          className="hidden"
          disabled={disabled}
        />

        {selectedFile ? (
          /* File Selected State */
          <div className="flex flex-col items-center gap-3">
            <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-emerald-100 dark:bg-emerald-900/50">
              <FileText className="h-7 w-7 text-emerald-600 dark:text-emerald-400" />
            </div>
            <div className="text-center">
              <p className="font-semibold text-slate-900 dark:text-white">
                {selectedFile.name}
              </p>
              <p className="text-sm text-slate-500 dark:text-slate-400">
                {(selectedFile.size / 1024).toFixed(1)} KB
              </p>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={(e) => {
                e.stopPropagation();
                handleRemoveFile(e);
                // Trigger parent to clear
                // We use a custom approach: create a dummy clear
              }}
              className="text-red-600 hover:text-red-700 hover:bg-red-50 dark:text-red-400 dark:hover:bg-red-950/30"
              disabled={disabled}
            >
              <X className="h-4 w-4 mr-1" />
              Remove
            </Button>
          </div>
        ) : (
          /* Empty State */
          <>
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-100 to-cyan-100 dark:from-blue-950/50 dark:to-cyan-950/50 mb-4">
              <Upload className="h-8 w-8 text-blue-600 dark:text-blue-400" />
            </div>
            <p className="text-lg font-semibold text-slate-900 dark:text-white mb-1">
              Drop your file here
            </p>
            <p className="text-sm text-slate-500 dark:text-slate-400 mb-4">
              or click to browse files
            </p>
            <div className="flex items-center gap-2 text-xs text-slate-400 dark:text-slate-500">
              <span className="inline-flex items-center rounded-full bg-slate-100 dark:bg-slate-800 px-2.5 py-1 font-medium">
                CSV
              </span>
              <span className="text-slate-300 dark:text-slate-600">|</span>
              <span className="inline-flex items-center rounded-full bg-slate-100 dark:bg-slate-800 px-2.5 py-1 font-medium">
                XLSX
              </span>
              <span className="text-slate-300 dark:text-slate-600">|</span>
              <span className="text-slate-400">Max 10 MB</span>
            </div>
          </>
        )}
      </div>

      {/* Error Message */}
      {error && (
        <div className="flex items-start gap-2 rounded-lg bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-800/50 p-3">
          <AlertCircle className="h-5 w-5 text-red-500 shrink-0 mt-0.5" />
          <p className="text-sm text-red-700 dark:text-red-400">{error}</p>
        </div>
      )}
    </div>
  );
}

