import type { ModuleType } from "../types";
import {
  MODULE_FIELD_MAP,
  MODULE_SAMPLE_DATA_MAP,
} from "../constants";
import { generateCSVTemplate, downloadCSV } from "./csvParser";

export type TemplateFormat = "csv" | "xlsx";

/**
 * Downloads a template file for the given module and format
 */
export function downloadTemplate(
  module: ModuleType,
  format: TemplateFormat
): void {
  const fields = MODULE_FIELD_MAP[module];
  const sampleData = MODULE_SAMPLE_DATA_MAP[module];
  const headers = fields.map((f) => f.key);
  const moduleLabel = module.charAt(0).toUpperCase() + module.slice(1);

  if (format === "csv") {
    const csvContent = generateCSVTemplate(headers, sampleData);
    downloadCSV(csvContent, `${moduleLabel}_Template.csv`);
  } else {
    // For Excel, we pass the headers and sample data
    const xlsxHeaders = [...headers];
    // Generate single row data
    const rowData = headers.map((h) => {
      const value = sampleData[h];
      return value !== undefined && value !== null ? String(value) : "";
    });
    // Use the excel generator
    generateExcelTemplateWithName(xlsxHeaders, rowData, `${moduleLabel}_Template.xlsx`);
  }
}

/**
 * Generate and download Excel template with custom filename
 */
function generateExcelTemplateWithName(
  headers: string[],
  sampleRow: string[],
  filename: string
): void {
  // Dynamic import style - using xlsx directly
  const XLSX = require("xlsx") as typeof import("xlsx");
  const data = [headers, sampleRow];
  const worksheet = XLSX.utils.aoa_to_sheet(data);
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, "Template");
  XLSX.writeFile(workbook, filename);
}

/**
 * Get template columns with sample values for display
 */
export function getTemplatePreview(module: ModuleType): { header: string; sample: string; required: boolean }[] {
  const fields = MODULE_FIELD_MAP[module];
  const sampleData = MODULE_SAMPLE_DATA_MAP[module];

  return fields.map((field) => ({
    header: field.key,
    sample: sampleData[field.key] !== undefined ? String(sampleData[field.key]) : "",
    required: field.required,
  }));
}

