import { useState, useEffect, useMemo } from "react";
import { BarChart3, Download, FileSpreadsheet } from "lucide-react";
import * as XLSX from "xlsx";
import type {
  ReportFilters,
  ReportSummary,
  CustomerReportData,
  LeadReportData,
  DealReportData,
  SalesReportData,
  ActivityReportData,
  CommunicationReportData,
  DateRangePreset,
  ReportTypeOption,
} from "../types/report";
import { reportService } from "../services/reportService";
import { ReportSummaryCard } from "../components/ReportSummaryCard";
import { ReportFilters as ReportFiltersComponent } from "../components/ReportFilters";
import { CustomerReport } from "../components/CustomerReport";
import { LeadReport } from "../components/LeadReport";
import { DealReport } from "../components/DealReport";
import { SalesReport } from "../components/SalesReport";
import { ActivityReport } from "../components/ActivityReport";
import { CommunicationReport } from "../components/CommunicationReport";

export default function Reports() {
  const [filters, setFilters] = useState<ReportFilters>({
    dateRange: "THIS_MONTH" as DateRangePreset,
    reportType: "ALL" as ReportTypeOption,
    employeeId: "All",
    status: "All",
  });

  const [summary, setSummary] = useState<ReportSummary | null>(null);
  const [customerData, setCustomerData] = useState<CustomerReportData | null>(null);
  const [leadData, setLeadData] = useState<LeadReportData | null>(null);
  const [dealData, setDealData] = useState<DealReportData | null>(null);
  const [salesData, setSalesData] = useState<SalesReportData | null>(null);
  const [activityData, setActivityData] = useState<ActivityReportData | null>(null);
  const [communicationData, setCommunicationData] = useState<CommunicationReportData | null>(null);
  const [loading, setLoading] = useState(true);

  const loadData = async (currentFilters: ReportFilters) => {
    setLoading(true);
    try {
      const [summaryResult, customer, lead, deal, sales, activity, communication] =
        await Promise.all([
          reportService.getSummary(currentFilters),
          reportService.getCustomerReport(currentFilters),
          reportService.getLeadReport(currentFilters),
          reportService.getDealReport(currentFilters),
          reportService.getSalesReport(currentFilters),
          reportService.getActivityReport(currentFilters),
          reportService.getCommunicationReport(currentFilters),
        ]);

      setSummary(summaryResult);
      setCustomerData(customer);
      setLeadData(lead);
      setDealData(deal);
      setSalesData(sales);
      setActivityData(activity);
      setCommunicationData(communication);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData(filters);
  }, []);

  const handleApply = () => {
    loadData(filters);
  };

  const handleReset = () => {
    const reset: ReportFilters = {
      dateRange: "THIS_MONTH",
      reportType: "ALL",
      employeeId: "All",
      status: "All",
    };
    setFilters(reset);
    loadData(reset);
  };

  const showSection = (section: ReportTypeOption) => {
    return filters.reportType === "ALL" || filters.reportType === section;
  };

  const formatCurrency = (value: number) =>
    new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      maximumFractionDigits: 0,
    }).format(value);

  // Export to CSV
  const exportToCSV = () => {
    if (!summary) return;
    const rows = [
      ["Metric", "Value"],
      ["Total Customers", summary.totalCustomers],
      ["Total Leads", summary.totalLeads],
      ["Open Deals", summary.openDeals],
      ["Total Sales", summary.totalSales],
      ["Total Revenue", summary.totalRevenue],
      ["Pending Tasks", summary.pendingTasks],
      ["Completed Activities", summary.completedActivities],
      ["Total Communications", summary.totalCommunications],
    ];

    const csv = rows.map((row) => row.join(",")).join("\n");
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", `crm-report-${new Date().toISOString().split("T")[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Export to Excel
  const exportToExcel = () => {
    if (!summary) return;
    const wb = XLSX.utils.book_new();

    const summaryData = [
      ["CRM Reports Summary"],
      [],
      ["Metric", "Value"],
      ["Total Customers", summary.totalCustomers],
      ["Total Leads", summary.totalLeads],
      ["Open Deals", summary.openDeals],
      ["Total Sales", summary.totalSales],
      ["Total Revenue", summary.totalRevenue],
      ["Pending Tasks", summary.pendingTasks],
      ["Completed Activities", summary.completedActivities],
      ["Total Communications", summary.totalCommunications],
    ];

    const ws = XLSX.utils.aoa_to_sheet(summaryData);
    XLSX.utils.book_append_sheet(wb, ws, "Summary");
    XLSX.writeFile(wb, `crm-report-${new Date().toISOString().split("T")[0]}.xlsx`);
  };

  const hasData = !!summary;

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="rounded-2xl bg-gradient-to-r from-indigo-600 via-blue-500 to-indigo-600 dark:from-indigo-900 dark:via-blue-900 dark:to-indigo-900 p-8 shadow-lg overflow-hidden relative">
        <div className="absolute inset-0 opacity-20">
          <div
            className="absolute top-0 left-0 w-96 h-96 bg-white/20 rounded-full blur-3xl animate-pulse"
          ></div>
          <div
            className="absolute bottom-0 right-0 w-96 h-96 bg-blue-300/20 rounded-full blur-3xl animate-pulse"
            style={{ animationDelay: "3s" }}
          ></div>
        </div>

        <div className="relative z-10">
          <div className="flex items-center gap-4 mb-4">
            <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-white/20 backdrop-blur-md text-white border border-white/30 shadow-lg transform transition-transform hover:scale-110">
              <BarChart3 className="h-7 w-7" />
            </div>
            <div>
              <h1 className="text-4xl font-bold text-white drop-shadow-lg">
                CRM Reports
              </h1>
              <p className="text-indigo-100 text-lg">
                Track and analyse your CRM performance across customers, leads,
                deals, sales, activities, and communications.
              </p>
            </div>
          </div>

          {/* Export Buttons */}
          {hasData && (
            <div className="flex flex-wrap gap-3 mt-4">
              <button
                onClick={exportToCSV}
                className="inline-flex items-center gap-2 rounded-lg bg-white/20 hover:bg-white/30 backdrop-blur-md text-white border border-white/30 px-4 py-2 text-sm font-semibold transition-all"
              >
                <Download className="h-4 w-4" />
                Export CSV
              </button>
              <button
                onClick={exportToExcel}
                className="inline-flex items-center gap-2 rounded-lg bg-white/20 hover:bg-white/30 backdrop-blur-md text-white border border-white/30 px-4 py-2 text-sm font-semibold transition-all"
              >
                <FileSpreadsheet className="h-4 w-4" />
                Export Excel
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Filters */}
      <ReportFiltersComponent
        dateRange={filters.dateRange}
        reportType={filters.reportType}
        employeeId={filters.employeeId}
        status={filters.status}
        onDateRangeChange={(v) => setFilters((prev) => ({ ...prev, dateRange: v }))}
        onReportTypeChange={(v) => setFilters((prev) => ({ ...prev, reportType: v }))}
        onEmployeeChange={(v) => setFilters((prev) => ({ ...prev, employeeId: v }))}
        onStatusChange={(v) => setFilters((prev) => ({ ...prev, status: v }))}
        onApply={handleApply}
        onReset={handleReset}
      />

      {loading ? (
        <div className="text-center py-12">
          <div className="inline-flex h-10 w-10 items-center justify-center rounded-full border-2 border-blue-600 border-t-transparent animate-spin"></div>
          <p className="mt-4 text-slate-500">Loading report data...</p>
        </div>
      ) : (
        <>
          {/* Summary Cards */}
          {hasData && (
            <div>
              <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-4">
                Summary Overview
              </h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <ReportSummaryCard
                  title="Total Customers"
                  value={summary!.totalCustomers}
                  icon={BarChart3}
                  gradient="from-blue-50 to-cyan-100 dark:from-blue-950/40 dark:to-cyan-900/20"
                  iconBg="from-blue-500 to-cyan-600"
                />
                <ReportSummaryCard
                  title="Total Leads"
                  value={summary!.totalLeads}
                  icon={BarChart3}
                  gradient="from-amber-50 to-yellow-100 dark:from-amber-950/40 dark:to-yellow-900/20"
                  iconBg="from-amber-500 to-yellow-600"
                />
                <ReportSummaryCard
                  title="Open Deals"
                  value={summary!.openDeals}
                  icon={BarChart3}
                  gradient="from-indigo-50 to-blue-100 dark:from-indigo-950/40 dark:to-blue-900/20"
                  iconBg="from-indigo-500 to-blue-600"
                />
                <ReportSummaryCard
                  title="Total Sales"
                  value={summary!.totalSales}
                  icon={BarChart3}
                  gradient="from-purple-50 to-violet-100 dark:from-purple-950/40 dark:to-violet-900/20"
                  iconBg="from-purple-500 to-violet-600"
                />
                <ReportSummaryCard
                  title="Total Revenue"
                  value={summary!.totalRevenue}
                  icon={BarChart3}
                  formatter={formatCurrency}
                  gradient="from-green-50 to-emerald-100 dark:from-green-950/40 dark:to-emerald-900/20"
                  iconBg="from-green-500 to-emerald-600"
                />
                <ReportSummaryCard
                  title="Pending Tasks"
                  value={summary!.pendingTasks}
                  icon={BarChart3}
                  gradient="from-red-50 to-rose-100 dark:from-red-950/40 dark:to-rose-900/20"
                  iconBg="from-red-500 to-rose-600"
                />
                <ReportSummaryCard
                  title="Completed Activities"
                  value={summary!.completedActivities}
                  icon={BarChart3}
                  gradient="from-teal-50 to-emerald-100 dark:from-teal-950/40 dark:to-emerald-900/20"
                  iconBg="from-teal-500 to-emerald-600"
                />
                <ReportSummaryCard
                  title="Total Communications"
                  value={summary!.totalCommunications}
                  icon={BarChart3}
                  gradient="from-cyan-50 to-teal-100 dark:from-cyan-950/40 dark:to-teal-900/20"
                  iconBg="from-cyan-500 to-teal-600"
                />
              </div>
            </div>
          )}

          {/* Customer Report */}
          {showSection("CUSTOMERS") && customerData && (
            <div className="rounded-2xl border border-slate-200/50 dark:border-slate-800/50 bg-white dark:bg-slate-900 shadow-sm p-6">
              <h2 className="text-lg font-bold text-slate-900 dark:text-white mb-4">
                Customers Report
              </h2>
              <CustomerReport data={customerData} />
            </div>
          )}

          {/* Lead Report */}
          {showSection("LEADS") && leadData && (
            <div className="rounded-2xl border border-slate-200/50 dark:border-slate-800/50 bg-white dark:bg-slate-900 shadow-sm p-6">
              <h2 className="text-lg font-bold text-slate-900 dark:text-white mb-4">
                Leads Report
              </h2>
              <LeadReport data={leadData} />
            </div>
          )}

          {/* Deal Report */}
          {showSection("DEALS") && dealData && (
            <div className="rounded-2xl border border-slate-200/50 dark:border-slate-800/50 bg-white dark:bg-slate-900 shadow-sm p-6">
              <h2 className="text-lg font-bold text-slate-900 dark:text-white mb-4">
                Deals / Opportunities Report
              </h2>
              <DealReport data={dealData} />
            </div>
          )}

          {/* Sales Report */}
          {showSection("SALES") && salesData && (
            <div className="rounded-2xl border border-slate-200/50 dark:border-slate-800/50 bg-white dark:bg-slate-900 shadow-sm p-6">
              <h2 className="text-lg font-bold text-slate-900 dark:text-white mb-4">
                Sales Report
              </h2>
              <SalesReport data={salesData} />
            </div>
          )}

          {/* Activity Report */}
          {showSection("ACTIVITIES") && activityData && (
            <div className="rounded-2xl border border-slate-200/50 dark:border-slate-800/50 bg-white dark:bg-slate-900 shadow-sm p-6">
              <h2 className="text-lg font-bold text-slate-900 dark:text-white mb-4">
                Activities / Tasks Report
              </h2>
              <ActivityReport data={activityData} />
            </div>
          )}

          {/* Communication Report */}
          {showSection("COMMUNICATIONS") && communicationData && (
            <div className="rounded-2xl border border-slate-200/50 dark:border-slate-800/50 bg-white dark:bg-slate-900 shadow-sm p-6">
              <h2 className="text-lg font-bold text-slate-900 dark:text-white mb-4">
                Communication Report
              </h2>
              <CommunicationReport data={communicationData} />
            </div>
          )}
        </>
      )}
    </div>
  );
}

