import Papa from "papaparse";

export interface ParseResult {
  headers: string[];
  rows: Record<string, unknown>[];
  errors: string[];
}

export async function parseCSVFile(file: File): Promise<ParseResult> {
  return new Promise((resolve, reject) => {
    Papa.parse(file, {
      header: true,
      skipEmptyLines: true,
      dynamicTyping: false,
      complete: (results) => {
        const errors: string[] = [];
        
        if (results.errors && results.errors.length > 0) {
          results.errors.forEach((err) => {
            errors.push(`Row ${err.row ? err.row + 1 : "unknown"}: ${err.message}`);
          });
        }

        const headers = results.meta.fields || [];
        const rows = results.data as Record<string, unknown>[];

        resolve({
          headers,
          rows,
          errors,
        });
      },
      error: (error) => {
        reject(new Error(`Failed to parse CSV: ${error.message}`));
      },
    });
  });
}

export function generateCSVTemplate(headers: string[], sampleRow: Record<string, unknown>): string {
  const headerLine = headers.join(",");
  const sampleLine = headers
    .map((h) => {
      const value = sampleRow[h];
      const str = value !== undefined && value !== null ? String(value) : "";
      // Escape commas and quotes
      if (str.includes(",") || str.includes('"') || str.includes("\n")) {
        return `"${str.replace(/"/g, '""')}"`;
      }
      return str;
    })
    .join(",");
  
  return `${headerLine}\n${sampleLine}\n`;
}

export function downloadCSV(content: string, filename: string): void {
  const blob = new Blob([content], { type: "text/csv;charset=utf-8;" });
  const link = document.createElement("a");
  const url = URL.createObjectURL(blob);
  link.setAttribute("href", url);
  link.setAttribute("download", filename);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

