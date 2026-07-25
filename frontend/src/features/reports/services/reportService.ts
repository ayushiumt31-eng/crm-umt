import type { Customer } from "@/features/customers/types/customer";
import type { Lead } from "@/features/lead/types/lead";
import type { Deal } from "@/features/deals/types/deal";
import type { Sale } from "@/features/sales/types/sale";
import type { Activity } from "@/features/activities/types/activity";
import type { Communication } from "@/features/communication/types/communication";
import type { Employee } from "@/features/employees/types/employee";

import { dummyCustomers } from "@/features/customers/data/dummy-customers";
import { dummyLead } from "@/features/lead/data/dummy-lead";
import { dummyDeals } from "@/features/deals/data/dummy-deals";
import { dummySales } from "@/features/sales/data/dummy-sales";
import { dummyActivities } from "@/features/activities/data/dummy-activities";
import { dummyCommunications } from "@/features/communication/data/dummy-communications";
import { dummyEmployees } from "@/features/employees/data/dummy-employees";

import type {
  ReportFilters,
  ReportSummary,
  CustomerReportData,
  LeadReportData,
  DealReportData,
  SalesReportData,
  ActivityReportData,
  CommunicationReportData,
} from "../types/report";

function getMonthName(dateStr: string): string {
  const date = new Date(dateStr);
  const months = [
    "Jan", "Feb", "Mar", "Apr", "May", "Jun",
    "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
  ];
  return months[date.getMonth()];
}

class ReportsService {
  /**
   * Compute summary from all existing dummy data
   */
  async getSummary(_filters?: ReportFilters): Promise<ReportSummary> {
    const customers = dummyCustomers;
    const leads = dummyLead;
    const deals = dummyDeals;
    const sales = dummySales;
    const activities = dummyActivities;
    const communications = dummyCommunications;

    const totalRevenue = sales
      .filter((s) => s.status === "COMPLETED")
      .reduce((sum, s) => sum + s.finalAmount, 0);

    return {
      totalCustomers: customers.length,
      totalLeads: leads.length,
      openDeals: deals.filter(
        (d) => d.stage !== "CLOSED_WON" && d.stage !== "CLOSED_LOST"
      ).length,
      totalSales: sales.length,
      totalRevenue,
      pendingTasks: activities.filter(
        (a) => a.status === "PENDING" || a.status === "IN_PROGRESS"
      ).length,
      completedActivities: activities.filter(
        (a) => a.status === "COMPLETED"
      ).length,
      totalCommunications: communications.length,
    };
  }

  /**
   * Customer report data
   */
  async getCustomerReport(_filters?: ReportFilters): Promise<CustomerReportData> {
    const customers = dummyCustomers;

    const activeCount = customers.filter((c) => c.status === "Active").length;
    const inactiveCount = customers.filter((c) => c.status === "Inactive").length;

    // Customers by month
    const monthMap = new Map<string, number>();
    customers.forEach((c) => {
      const month = getMonthName(c.createdAt);
      monthMap.set(month, (monthMap.get(month) || 0) + 1);
    });
    const customersByMonth = Array.from(monthMap.entries())
      .map(([month, count]) => ({ month, count }))
      .sort((a, b) => {
        const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
        return months.indexOf(a.month) - months.indexOf(b.month);
      });

    return {
      totalCustomers: customers.length,
      activeCustomers: activeCount,
      inactiveCustomers: inactiveCount,
      newCustomers: customers.filter(
        (c) => new Date(c.createdAt).getMonth() === new Date().getMonth()
      ).length,
      customersByMonth,
      customersByStatus: [
        { status: "Active", count: activeCount },
        { status: "Inactive", count: inactiveCount },
      ],
    };
  }

  /**
   * Lead report data
   */
  async getLeadReport(_filters?: ReportFilters): Promise<LeadReportData> {
    const leads = dummyLead;

    const total = leads.length;
    const converted = leads.filter((l) => l.status === "CONVERTED").length;
    const conversionRate = total > 0 ? Math.round((converted / total) * 100) : 0;

    // Leads by status
    const statusMap = new Map<string, number>();
    leads.forEach((l) => {
      statusMap.set(l.status, (statusMap.get(l.status) || 0) + 1);
    });

    // Leads by source
    const sourceMap = new Map<string, number>();
    leads.forEach((l) => {
      sourceMap.set(l.source, (sourceMap.get(l.source) || 0) + 1);
    });

    return {
      totalLeads: total,
      newLeads: leads.filter((l) => l.status === "NEW").length,
      qualifiedLeads: leads.filter((l) => l.status === "QUALIFIED").length,
      convertedLeads: converted,
      lostLeads: leads.filter((l) => l.status === "LOST").length,
      conversionRate,
      leadsByStatus: Array.from(statusMap.entries()).map(([status, count]) => ({
        status,
        count,
      })),
      leadsBySource: Array.from(sourceMap.entries()).map(([source, count]) => ({
        source,
        count,
      })),
    };
  }

  /**
   * Deal report data
   */
  async getDealReport(_filters?: ReportFilters): Promise<DealReportData> {
    const deals = dummyDeals;

    const wonDeals = deals.filter((d) => d.stage === "CLOSED_WON");
    const lostDeals = deals.filter((d) => d.stage === "CLOSED_LOST");
    const openDeals = deals.filter(
      (d) => d.stage !== "CLOSED_WON" && d.stage !== "CLOSED_LOST"
    );

    // Deals by stage
    const stageMap = new Map<string, { count: number; value: number }>();
    deals.forEach((d) => {
      const existing = stageMap.get(d.stage) || { count: 0, value: 0 };
      existing.count += 1;
      existing.value += d.value;
      stageMap.set(d.stage, existing);
    });

    return {
      totalDeals: deals.length,
      openDeals: openDeals.length,
      wonDeals: wonDeals.length,
      lostDeals: lostDeals.length,
      totalPipelineValue: deals.reduce((sum, d) => sum + d.value, 0),
      wonDealValue: wonDeals.reduce((sum, d) => sum + d.value, 0),
      dealsByStage: Array.from(stageMap.entries()).map(
        ([stage, { count, value }]) => ({
          stage,
          count,
          value,
        })
      ),
    };
  }

  /**
   * Sales report data
   */
  async getSalesReport(_filters?: ReportFilters): Promise<SalesReportData> {
    const sales = dummySales;

    const completedSales = sales.filter((s) => s.status === "COMPLETED");
    const totalRevenue = completedSales.reduce((sum, s) => sum + s.finalAmount, 0);
    const averageSaleValue =
      sales.length > 0 ? Math.round(totalRevenue / sales.length) : 0;

    // Monthly revenue
    const monthMap = new Map<string, number>();
    sales.forEach((s) => {
      const month = getMonthName(s.saleDate);
      monthMap.set(month, (monthMap.get(month) || 0) + s.finalAmount);
    });
    const monthlyRevenue = Array.from(monthMap.entries())
      .map(([month, revenue]) => ({ month, revenue }))
      .sort((a, b) => {
        const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
        return months.indexOf(a.month) - months.indexOf(b.month);
      });

    // Sales by status
    const statusMap = new Map<string, number>();
    sales.forEach((s) => {
      statusMap.set(s.status, (statusMap.get(s.status) || 0) + 1);
    });

    // Sales by employee
    const employeeMap = new Map<string, { count: number; revenue: number }>();
    sales.forEach((s) => {
      const existing = employeeMap.get(s.assignedToName) || {
        count: 0,
        revenue: 0,
      };
      existing.count += 1;
      existing.revenue += s.finalAmount;
      employeeMap.set(s.assignedToName, existing);
    });

    return {
      totalSales: sales.length,
      totalRevenue,
      completedSales: completedSales.length,
      pendingSales: sales.filter((s) => s.status === "CONFIRMED" || s.status === "DRAFT").length,
      cancelledSales: sales.filter((s) => s.status === "CANCELLED").length,
      averageSaleValue,
      monthlyRevenue,
      salesByStatus: Array.from(statusMap.entries()).map(([status, count]) => ({
        status,
        count,
      })),
      salesByEmployee: Array.from(employeeMap.entries()).map(
        ([employee, { count, revenue }]) => ({
          employee,
          count,
          revenue,
        })
      ),
    };
  }

  /**
   * Activity report data
   */
  async getActivityReport(_filters?: ReportFilters): Promise<ActivityReportData> {
    const activities = dummyActivities;

    const pending = activities.filter(
      (a) => a.status === "PENDING" || a.status === "IN_PROGRESS"
    );
    const completed = activities.filter((a) => a.status === "COMPLETED");

    const now = new Date();
    const overdue = pending.filter((a) => new Date(a.dueDate) < now);

    // Activities by employee
    const employeeMap = new Map<string, number>();
    activities.forEach((a) => {
      employeeMap.set(
        a.assignedToName,
        (employeeMap.get(a.assignedToName) || 0) + 1
      );
    });

    // Activities by type
    const typeMap = new Map<string, number>();
    activities.forEach((a) => {
      typeMap.set(a.type, (typeMap.get(a.type) || 0) + 1);
    });

    return {
      totalActivities: activities.length,
      completedActivities: completed.length,
      pendingActivities: pending.length,
      overdueActivities: overdue.length,
      activitiesByEmployee: Array.from(employeeMap.entries()).map(
        ([employee, count]) => ({ employee, count })
      ),
      activitiesByType: Array.from(typeMap.entries()).map(([type, count]) => ({
        type,
        count,
      })),
    };
  }

  /**
   * Communication report data
   */
  async getCommunicationReport(
    _filters?: ReportFilters
  ): Promise<CommunicationReportData> {
    const communications = dummyCommunications;

    const emails = communications.filter((c) => c.type === "EMAIL").length;
    const whatsapp = communications.filter((c) => c.type === "WHATSAPP").length;
    const sms = communications.filter((c) => c.type === "SMS").length;
    const calls = communications.filter((c) => c.type === "CALL").length;
    const meetings = communications.filter((c) => c.type === "MEETING").length;
    const notes = communications.filter((c) => c.type === "NOTE").length;

    // Communications by type
    const typeMap = new Map<string, number>();
    communications.forEach((c) => {
      typeMap.set(c.type, (typeMap.get(c.type) || 0) + 1);
    });

    // Communications by status
    const statusMap = new Map<string, number>();
    communications.forEach((c) => {
      statusMap.set(c.status, (statusMap.get(c.status) || 0) + 1);
    });

    return {
      totalCommunications: communications.length,
      emails,
      whatsapp,
      sms,
      calls,
      meetings,
      notes,
      communicationsByType: Array.from(typeMap.entries()).map(([type, count]) => ({
        type,
        count,
      })),
      communicationsByStatus: Array.from(statusMap.entries()).map(
        ([status, count]) => ({ status, count })
      ),
    };
  }
}

export const reportService = new ReportsService();

