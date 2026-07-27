import type { AutomationReport } from "../types/marketingReport";

export const dummyAutomationReports: AutomationReport[] = [
  { automationId: "auto-001", automationName: "New Website Lead Follow-up", trigger: "New Lead Created", executions: 145, success: 132, failed: 8, successRate: 91.03, status: "ACTIVE" },
  { automationId: "auto-002", automationName: "New Customer Welcome", trigger: "Customer Created", executions: 89, success: 85, failed: 2, successRate: 95.51, status: "ACTIVE" },
  { automationId: "auto-003", automationName: "Deal Won Notification", trigger: "Deal Won", executions: 67, success: 65, failed: 1, successRate: 98.51, status: "ACTIVE" },
  { automationId: "auto-004", automationName: "Lead Status Follow-up", trigger: "Lead Status Changed", executions: 234, success: 210, failed: 12, successRate: 89.74, status: "ACTIVE" },
  { automationId: "auto-005", automationName: "Overdue Task Reminder", trigger: "Task Overdue", executions: 178, success: 156, failed: 15, successRate: 87.64, status: "ACTIVE" },
  { automationId: "auto-006", automationName: "Website Lead WhatsApp Notification", trigger: "New Lead Created", executions: 56, success: 52, failed: 3, successRate: 92.86, status: "INACTIVE" },
  { automationId: "auto-007", automationName: "Customer Re-engagement", trigger: "Customer Status Changed", executions: 0, success: 0, failed: 0, successRate: 0, status: "DRAFT" },
  { automationId: "auto-008", automationName: "Sales Follow-up Automation", trigger: "New Lead Created", executions: 312, success: 298, failed: 10, successRate: 95.51, status: "ACTIVE" },
  { automationId: "auto-009", automationName: "Campaign Completion Cleanup", trigger: "Campaign Completed", executions: 23, success: 20, failed: 2, successRate: 86.96, status: "PAUSED" },
  { automationId: "auto-010", automationName: "Lead Status Update Notification", trigger: "Lead Stage Changed", executions: 98, success: 92, failed: 4, successRate: 93.88, status: "ACTIVE" },
];
