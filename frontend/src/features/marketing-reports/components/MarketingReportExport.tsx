import { useState } from "react";
import { Download, FileSpreadsheet } from "lucide-react";
import * as XLSX from "xlsx";

interface MarketingReportExportProps {
  data: Record<string, unknown>[];
  filename?: string;
  label?: string;
}

export function MarketingReportExport({
  data,
  filename = "marketing-report",
  label = "Export",
}: MarketingReportExportProps) {
  const [exporting, setExporting] = useState(false);

  const exportToCSV = () => {
    if (data.length === 0) return;
    setExporting(true);

    const headers = Object.keys(data[0]);
    const csvRows = [
      headers.join(","),
      ...data.map((row) =>
        headers
          .map((h) => {
            const val = row[h];
            if (typeof val === "string" && (val.includes(",") || val.includes('"'))) {
              return `"${val.replace(/"/g, '""')}"`;
            }
            return String(val ?? "");
          })
          .join(",")
      ),
    ];

    const csv = csvRows.join("\n");
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", `${filename}-${new Date().toISOString().split("T")[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    setExporting(false);
  };

  const exportToExcel = () => {
    if (data.length === 0) return;
    setExporting(true);

    const wb = XLSX.utils.book_new();
    const ws = XLSX.utils.json_to_sheet(data);
    XLSX.utils.book_append_sheet(wb, ws, "Report");
    XLSX.writeFile(wb, `${filename}-${new Date().toISOString().split("T")[0]}.xlsx`);
    setExporting(false);
  };

  return (
    <div className="flex flex-wrap gap-2">
      <button
        onClick={exportToCSV}
        disabled={exporting || data.length === 0}
        className="inline-flex items-center gap-2 rounded-lg bg-white/20 hover:bg-white/30 backdrop-blur-md text-white border border-white/30 px-4 py-2 text-sm font-semibold transition-all disabled:opacity-50"
      >
        <Download className="h-4 w-4" />
        {label} CSV
      </button>
      <button
        onClick={exportToExcel}
        disabled={exporting || data.length === 0}
        className="inline-flex items-center gap-2 rounded-lg bg-white/20 hover:bg-white/30 backdrop-blur-md text-white border border-white/30 px-4 py-2 text-sm font-semibold transition-all disabled:opacity-50"
      >
        <FileSpreadsheet className="h-4 w-4" />
        {label} Excel
      </button>
    </div>
  );
}
