import * as XLSX from "xlsx";

export interface ParseResult {
  headers: string[];
  rows: Record<string, unknown>[];
  errors: string[];
}

export async function parseExcelFile(file: File): Promise<ParseResult> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = (e) => {
      try {
        const data = new Uint8Array(e.target?.result as ArrayBuffer);
        const workbook = XLSX.read(data, { type: "array" });
        const firstSheetName = workbook.SheetNames[0];

        if (!firstSheetName) {
          reject(new Error("Excel file has no sheets."));
          return;
        }

        const worksheet = workbook.Sheets[firstSheetName];
        const jsonData = XLSX.utils.sheet_to_json<Record<string, unknown>>(worksheet, {
          defval: "",
          header: 1,
        });

        if (jsonData.length === 0) {
          resolve({ headers: [], rows: [], errors: [] });
          return;
        }

        const headerRow = jsonData[0] as unknown as string[];
        const headers = headerRow.map((h: string) => String(h).trim()).filter(Boolean);

        if (headers.length === 0) {
          reject(new Error("No headers found in the first row of the Excel file."));
          return;
        }

        const rows: Record<string, unknown>[] = [];
        const errors: string[] = [];

        for (let i = 1; i < jsonData.length; i++) {
          const row = jsonData[i] as unknown as unknown[];
          if (row.length === 0 || row.every((cell) => cell === "" || cell === undefined || cell === null)) {
            continue; // Skip empty rows
          }

          const rowData: Record<string, unknown> = {};
          for (let j = 0; j < headers.length; j++) {
            rowData[headers[j]] = row[j] !== undefined ? row[j] : "";
          }
          rows.push(rowData);
        }

        resolve({ headers, rows, errors });
      } catch (error) {
        reject(new Error(`Failed to parse Excel file: ${error instanceof Error ? error.message : "Unknown error"}`));
      }
    };

    reader.onerror = () => {
      reject(new Error("Failed to read file."));
    };

    reader.readAsArrayBuffer(file);
  });
}

export function generateExcelTemplate(headers: string[], sampleRow: Record<string, unknown>): void {
  const data = [headers];

  const sampleRowData = headers.map((h) => {
    const value = sampleRow[h];
    return value !== undefined && value !== null ? String(value) : "";
  });
  data.push(sampleRowData);

  const worksheet = XLSX.utils.aoa_to_sheet(data);
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, "Template");
  XLSX.writeFile(workbook, "Template.xlsx");
}

