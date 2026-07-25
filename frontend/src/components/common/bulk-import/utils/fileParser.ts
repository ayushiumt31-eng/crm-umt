import { parseCSVFile } from "./csvParser";
import { parseExcelFile } from "./excelParser";
import type { ParseResult } from "./csvParser";

export type { ParseResult };

const ALLOWED_EXTENSIONS = [".csv", ".xlsx"];

const ALLOWED_MIME_TYPES = [
  "text/csv",
  "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  "application/csv",
  "text/x-csv",
  "application/x-csv",
];

const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10 MB

export interface FileValidationResult {
  valid: boolean;
  error: string | null;
}

export function validateFile(file: File): FileValidationResult {
  const extension = "." + file.name.split(".").pop()?.toLowerCase();

  if (!ALLOWED_EXTENSIONS.includes(extension)) {
    return {
      valid: false,
      error: "Please upload a valid CSV or Excel (.xlsx) file.",
    };
  }

  if (file.size > MAX_FILE_SIZE) {
    const sizeMB = (file.size / (1024 * 1024)).toFixed(2);
    return {
      valid: false,
      error: `File size (${sizeMB} MB) exceeds the maximum allowed size of 10 MB.`,
    };
  }

  return { valid: true, error: null };
}

export async function parseFile(file: File): Promise<ParseResult> {
  const extension = "." + file.name.split(".").pop()?.toLowerCase();

  switch (extension) {
    case ".csv":
      return parseCSVFile(file);
    case ".xlsx":
      return parseExcelFile(file);
    default:
      throw new Error("Unsupported file format. Please upload a CSV or Excel (.xlsx) file.");
  }
}

export { generateCSVTemplate, downloadCSV } from "./csvParser";
export { generateExcelTemplate } from "./excelParser";

