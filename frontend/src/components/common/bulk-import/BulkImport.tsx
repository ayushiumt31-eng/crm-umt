import { useState, useCallback } from "react";
import { Download, FileSpreadsheet, Upload, ArrowLeft, CheckCircle2, AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import type {
  ModuleType,
  ImportRow,
  ImportSummary,
  ImportResult,
  ImportField,
} from "./types";
import { MODULE_FIELD_MAP, MODULE_LABELS, MODULE_DESCRIPTIONS } from "./constants";
import { BulkImportModal } from "./BulkImportModal";
import { BulkImportUploader } from "./BulkImportUploader";
import { BulkImportPreview } from "./BulkImportPreview";
import { BulkImportErrors } from "./BulkImportErrors";
import { BulkImportProgress } from "./BulkImportProgress";
import { validateFile, parseFile } from "./utils/fileParser";
import { validateRow, validateHeaders, detectDuplicateEmails, detectDuplicatePhones, detectExistingEmailDuplicates } from "./utils/validateImportData";
import { downloadTemplate } from "./utils/downloadTemplate";

interface BulkImportProps {
  isOpen: boolean;
  onClose: () => void;
  module: ModuleType;
  fields?: ImportField[];
  validateCustom?: (row: Record<string, unknown>, rowNumber: number) => string[];
  onImport: (validRows: Record<string, unknown>[]) => Promise<ImportResult>;
  existingEmails?: string[];
  existingPhones?: string[];
  title?: string;
  description?: string;
}

type Step = "select-module" | "upload" | "preview" | "importing" | "completed";

export function BulkImport({
  isOpen,
  onClose,
  module,
  fields,
  validateCustom,
  onImport,
  existingEmails = [],
  existingPhones = [],
  title,
  description,
}: BulkImportProps) {
  const [step, setStep] = useState<Step>("upload");
  const [file, setFile] = useState<File | null>(null);
  const [fileError, setFileError] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [parsedRows, setParsedRows] = useState<Record<string, unknown>[]>([]);
  const [validatedRows, setValidatedRows] = useState<ImportRow[]>([]);
  const [summary, setSummary] = useState<ImportSummary | null>(null);
  const [importResult, setImportResult] = useState<ImportResult | null>(null);
  const [importProgress, setImportProgress] = useState(0);

  const activeFields = fields || MODULE_FIELD_MAP[module];
  const modalTitle = title || `Bulk Import ${MODULE_LABELS[module]}`;
  const modalDescription = description || MODULE_DESCRIPTIONS[module];

  // Reset state when modal opens
  const handleClose = useCallback(() => {
    setStep("upload");
    setFile(null);
    setFileError(null);
    setIsProcessing(false);
    setParsedRows([]);
    setValidatedRows([]);
    setSummary(null);
    setImportResult(null);
    setImportProgress(0);
    onClose();
  }, [onClose]);

  const handleFileSelect = useCallback(async (selectedFile: File | null) => {
    setFileError(null);
    setImportResult(null);

    if (!selectedFile) {
      setFile(null);
      setParsedRows([]);
      return;
    }

    // Validate file
    const validation = validateFile(selectedFile);
    if (!validation.valid) {
      setFileError(validation.error);
      setFile(null);
      return;
    }

    setFile(selectedFile);
    setIsProcessing(true);
    setStep("preview");

    try {
      // Parse file
      const parseResult = await parseFile(selectedFile);
      
      if (parseResult.errors.length > 0) {
        setFileError(`Parse errors: ${parseResult.errors.join("; ")}`);
        setIsProcessing(false);
        return;
      }

      const rows = parseResult.rows;
      setParsedRows(rows);

      // Validate headers
      const headerErrors = validateHeaders(
        parseResult.headers,
        activeFields
      );

      if (headerErrors.some((e) => e.includes("Required column"))) {
        setFileError(headerErrors.join("; "));
        setIsProcessing(false);
        return;
      }

      // Validate each row
      const validated: ImportRow[] = rows.map((row, index) => {
        const rowErrors: string[] = [];

        // Field-level validation
        const fieldErrors = validateRow(row, activeFields, index + 2);
        rowErrors.push(...fieldErrors);

        // Custom validation (module-specific)
        if (validateCustom) {
          const customErrors = validateCustom(row, index + 2);
          rowErrors.push(...customErrors);
        }

        return {
          rowNumber: index + 2, // +2 because header is row 1
          data: row,
          isValid: rowErrors.length === 0,
          errors: rowErrors,
        };
      });

      // Detect duplicates within import data
      const duplicateEmailErrors = detectDuplicateEmails(rows);
      duplicateEmailErrors.forEach((errs, idx) => {
        if (validated[idx]) {
          validated[idx].errors.push(...errs);
          validated[idx].isValid = false;
        }
      });

      const duplicatePhoneErrors = detectDuplicatePhones(rows);
      duplicatePhoneErrors.forEach((errs, idx) => {
        if (validated[idx]) {
          validated[idx].errors.push(...errs);
          validated[idx].isValid = false;
        }
      });

      // Detect duplicates against existing data
      if (existingEmails.length > 0) {
        const existingEmailDups = detectExistingEmailDuplicates(rows, existingEmails);
        existingEmailDups.forEach((errs, idx) => {
          if (validated[idx]) {
            validated[idx].errors.push(...errs);
            validated[idx].isValid = false;
          }
        });
      }

      setValidatedRows(validated);

      // Calculate summary
      const validCount = validated.filter((r) => r.isValid).length;
      const invalidCount = validated.filter((r) => !r.isValid).length;
      setSummary({
        totalRows: validated.length,
        validRows: validCount,
        invalidRows: invalidCount,
        importedRows: 0,
        failedRows: 0,
        errors: [],
      });
    } catch (error) {
      setFileError(
        `Failed to process file: ${error instanceof Error ? error.message : "Unknown error"}`
      );
    } finally {
      setIsProcessing(false);
    }
  }, [activeFields, validateCustom, existingEmails, existingPhones]);

  const handleImport = useCallback(async () => {
    if (!summary || summary.validRows === 0) return;

    setStep("importing");
    setImportProgress(0);

    try {
      const validData = validatedRows
        .filter((r) => r.isValid)
        .map((r) => r.data);

      // Simulate progress
      const progressInterval = setInterval(() => {
        setImportProgress((prev) => {
          if (prev >= 90) {
            clearInterval(progressInterval);
            return 90;
          }
          return prev + 10;
        });
      }, 300);

      const result = await onImport(validData);
      clearInterval(progressInterval);
      setImportProgress(100);
      setImportResult(result);

      // Update summary with import results
      setSummary((prev) =>
        prev
          ? {
              ...prev,
              importedRows: result.importedCount,
              failedRows: result.failedCount,
              errors: result.errors,
            }
          : prev
      );

      setStep("completed");
    } catch (error) {
      setImportResult({
        importedCount: 0,
        failedCount: 0,
        errors: [
          `Import failed: ${error instanceof Error ? error.message : "Unknown error"}`,
        ],
      });
      setStep("completed");
    }
  }, [summary, validatedRows, onImport]);

  const handleDownloadTemplate = useCallback(
    (format: "csv" | "xlsx") => {
      downloadTemplate(module, format);
    },
    [module]
  );

  const handleBack = useCallback(() => {
    setStep("upload");
    setFile(null);
    setFileError(null);
    setParsedRows([]);
    setValidatedRows([]);
    setSummary(null);
    setImportResult(null);
  }, []);

  const handleRetry = useCallback(() => {
    setStep("upload");
    setFile(null);
    setFileError(null);
    setParsedRows([]);
    setValidatedRows([]);
    setSummary(null);
    setImportResult(null);
    setImportProgress(0);
  }, []);

  const invalidRows = validatedRows.filter((r) => !r.isValid);

  return (
    <BulkImportModal
      isOpen={isOpen}
      onClose={handleClose}
      title={modalTitle}
      description={modalDescription}
      size="xl"
    >
      <div className="space-y-6">
        {/* Template Download */}
        {step === "upload" && (
          <div className="flex items-center justify-between rounded-xl bg-gradient-to-r from-blue-50 to-cyan-50 dark:from-blue-950/30 dark:to-cyan-950/20 border border-blue-200/50 dark:border-blue-800/50 p-4">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-100 dark:bg-blue-900/50">
                <Download className="h-5 w-5 text-blue-600 dark:text-blue-400" />
              </div>
              <div>
                <p className="text-sm font-semibold text-slate-900 dark:text-white">
                  Download Sample Template
                </p>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Use the template to ensure correct format
                </p>
              </div>
            </div>
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => handleDownloadTemplate("csv")}
                className="gap-1.5"
              >
                <FileSpreadsheet className="h-4 w-4" />
                CSV
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => handleDownloadTemplate("xlsx")}
                className="gap-1.5"
              >
                <FileSpreadsheet className="h-4 w-4" />
                Excel
              </Button>
            </div>
          </div>
        )}

        {/* Upload Step */}
        {step === "upload" && (
          <BulkImportUploader
            onFileSelect={handleFileSelect}
            selectedFile={file}
            error={fileError}
            disabled={isProcessing}
          />
        )}

        {/* Back Button (after upload) */}
        {step === "preview" && (
          <Button
            variant="ghost"
            size="sm"
            onClick={handleBack}
            className="gap-1.5 -ml-2"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Upload
          </Button>
        )}

        {/* Loading State */}
        {isProcessing && (
          <div className="flex items-center justify-center py-8">
            <div className="flex flex-col items-center gap-3">
              <div className="h-8 w-8 animate-spin rounded-full border-4 border-blue-600 border-t-transparent dark:border-blue-400 dark:border-t-transparent" />
              <p className="text-sm text-slate-500 dark:text-slate-400">
                Processing file...
              </p>
            </div>
          </div>
        )}

        {/* Preview Step */}
        {step === "preview" && !isProcessing && summary && (
          <div className="space-y-6">
            <BulkImportPreview
              rows={validatedRows}
              fields={activeFields}
              summary={summary}
            />

            {invalidRows.length > 0 && (
              <BulkImportErrors invalidRows={invalidRows} />
            )}

            {/* Import Button */}
            <div className="flex items-center justify-end gap-3 pt-2">
              <Button
                variant="outline"
                onClick={handleBack}
              >
                Cancel
              </Button>
              <Button
                onClick={handleImport}
                disabled={summary.validRows === 0}
                className={cn(
                  "gap-2",
                  summary.validRows > 0
                    ? "bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700"
                    : ""
                )}
              >
                <Upload className="h-4 w-4" />
                Import Valid Records ({summary.validRows})
              </Button>
            </div>
          </div>
        )}

        {/* Import Progress */}
        {step === "importing" && (
          <BulkImportProgress
            status="importing"
            progress={importProgress}
            message={`Importing ${summary?.validRows || 0} records...`}
          />
        )}

        {/* Completed State */}
        {step === "completed" && importResult && (
          <div className="space-y-6">
            <BulkImportProgress
              status={
                importResult.importedCount > 0 ? "completed" : "error"
              }
              importedCount={importResult.importedCount}
              failedCount={importResult.failedCount}
              message={
                importResult.importedCount > 0
                  ? importResult.failedCount > 0
                    ? `${importResult.importedCount} records imported successfully. ${importResult.failedCount} records could not be imported.`
                    : undefined
                  : "No records were imported."
              }
            />

            {importResult.errors.length > 0 && (
              <div className="rounded-xl border border-amber-200 dark:border-amber-800/50 bg-amber-50/50 dark:bg-amber-950/20 p-4">
                <div className="flex items-start gap-2">
                  <AlertTriangle className="h-5 w-5 text-amber-500 shrink-0 mt-0.5" />
                  <div>
                    <p className="text-sm font-semibold text-amber-700 dark:text-amber-300 mb-1">
                      Import Notes
                    </p>
                    <ul className="space-y-0.5">
                      {importResult.errors.map((err, i) => (
                        <li
                          key={i}
                          className="text-xs text-amber-600 dark:text-amber-400"
                        >
                          {err}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            )}

            <div className="flex items-center justify-end gap-3 pt-2">
              <Button
                variant="outline"
                onClick={handleClose}
              >
                Close
              </Button>
              {importResult.failedCount > 0 && (
                <Button
                  onClick={handleRetry}
                  variant="outline"
                  className="gap-2"
                >
                  <Upload className="h-4 w-4" />
                  Import Another File
                </Button>
              )}
            </div>
          </div>
        )}
      </div>
    </BulkImportModal>
  );
}

