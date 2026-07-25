export interface ImportField {
  key: string;
  label: string;
  required: boolean;
  type: "text" | "email" | "phone" | "select" | "number" | "date";
  options?: { label: string; value: string }[];
  description?: string;
}

export interface ImportRow<T = Record<string, unknown>> {
  rowNumber: number;
  data: T;
  isValid: boolean;
  errors: string[];
}

export interface ImportSummary {
  totalRows: number;
  validRows: number;
  invalidRows: number;
  importedRows: number;
  failedRows: number;
  errors: string[];
}

export type ImportStatus = "idle" | "uploading" | "parsing" | "validating" | "preview" | "importing" | "completed" | "error";

export type ModuleType = "customers" | "leads" | "sales";

export interface BulkImportConfig<T = Record<string, unknown>> {
  module: ModuleType;
  fields: ImportField[];
  validateRow: (row: Record<string, unknown>, rowNumber: number) => string[];
  onImport: (validRows: Record<string, unknown>[]) => Promise<ImportResult>;
  sampleData: Record<string, unknown>;
  label: string;
  description: string;
}

export interface ImportResult {
  importedCount: number;
  failedCount: number;
  errors: string[];
}

export interface BulkImportState {
  status: ImportStatus;
  file: File | null;
  parsedRows: Record<string, unknown>[];
  validatedRows: ImportRow[];
  summary: ImportSummary | null;
  importResult: ImportResult | null;
  error: string | null;
}

export interface TemplateColumn {
  header: string;
  sampleValue: string;
}

