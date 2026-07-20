export type ReportType = "Sales" | "Revenue" | "Customer" | "Employee" | "Lead";
export type ReportFrequency = "Daily" | "Weekly" | "Monthly" | "Quarterly" | "Annual";

export interface Report {
  id: string;
  name: string;
  type: ReportType;
  frequency: ReportFrequency;
  generatedDate: string;
  dueDate?: string;
  status: "Pending" | "Ready" | "Failed";
  metrics: {
    totalRecords: number;
    activeRecords: number;
    inactiveRecords: number;
    growthRate?: number;
  };
  fileUrl?: string;
  createdBy: string;
  lastUpdated: string;
}

export interface ReportFilter {
  type: ReportType | "All";
  frequency: ReportFrequency | "All";
}
