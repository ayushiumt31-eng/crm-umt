export type DateRangePreset =
  | "TODAY"
  | "THIS_WEEK"
  | "THIS_MONTH"
  | "LAST_MONTH"
  | "THIS_QUARTER"
  | "THIS_YEAR"
  | "CUSTOM";

export type ReportTypeOption =
  | "ALL"
  | "CUSTOMERS"
  | "LEADS"
  | "DEALS"
  | "SALES"
  | "ACTIVITIES"
  | "COMMUNICATIONS";

export interface ReportFilters {
  dateRange: DateRangePreset;
  reportType: ReportTypeOption;
  employeeId: string;
  status: string;
}

export interface ReportSummary {
  totalCustomers: number;
  totalLeads: number;
  openDeals: number;
  totalSales: number;
  totalRevenue: number;
  pendingTasks: number;
  completedActivities: number;
  totalCommunications: number;
}

export interface CustomerReportData {
  totalCustomers: number;
  activeCustomers: number;
  inactiveCustomers: number;
  newCustomers: number;
  customersByMonth: { month: string; count: number }[];
  customersByStatus: { status: string; count: number }[];
}

export interface LeadReportData {
  totalLeads: number;
  newLeads: number;
  qualifiedLeads: number;
  convertedLeads: number;
  lostLeads: number;
  conversionRate: number;
  leadsByStatus: { status: string; count: number }[];
  leadsBySource: { source: string; count: number }[];
}

export interface DealReportData {
  totalDeals: number;
  openDeals: number;
  wonDeals: number;
  lostDeals: number;
  totalPipelineValue: number;
  wonDealValue: number;
  dealsByStage: { stage: string; count: number; value: number }[];
}

export interface SalesReportData {
  totalSales: number;
  totalRevenue: number;
  completedSales: number;
  pendingSales: number;
  cancelledSales: number;
  averageSaleValue: number;
  monthlyRevenue: { month: string; revenue: number }[];
  salesByStatus: { status: string; count: number }[];
  salesByEmployee: { employee: string; count: number; revenue: number }[];
}

export interface ActivityReportData {
  totalActivities: number;
  completedActivities: number;
  pendingActivities: number;
  overdueActivities: number;
  activitiesByEmployee: { employee: string; count: number }[];
  activitiesByType: { type: string; count: number }[];
}

export interface CommunicationReportData {
  totalCommunications: number;
  emails: number;
  whatsapp: number;
  sms: number;
  calls: number;
  meetings: number;
  notes: number;
  communicationsByType: { type: string; count: number }[];
  communicationsByStatus: { status: string; count: number }[];
}

