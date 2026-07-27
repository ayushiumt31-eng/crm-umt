import type { WhatsAppReport } from "../types/marketingReport";

export const dummyWhatsAppReports: WhatsAppReport[] = [
  { campaignId: "wc-001", campaignName: "Welcome New Customers", sent: 8000, delivered: 7840, read: 6272, failed: 160, replies: 1568, responseRate: 25, status: "SCHEDULED" },
  { campaignId: "wc-002", campaignName: "Flash Sale Alert", sent: 8000, delivered: 7800, read: 6240, failed: 200, replies: 1560, responseRate: 25, status: "DRAFT" },
  { campaignId: "wc-003", campaignName: "Lead Follow-up Campaign", sent: 3000, delivered: 2940, read: 2352, failed: 60, replies: 588, responseRate: 25, status: "SCHEDULED" },
  { campaignId: "wc-004", campaignName: "Payment Reminder", sent: 8000, delivered: 7760, read: 6208, failed: 240, replies: 1552, responseRate: 25, status: "SENT" },
  { campaignId: "wc-005", campaignName: "Customer Feedback Request", sent: 3000, delivered: 2940, read: 2352, failed: 60, replies: 588, responseRate: 25, status: "DRAFT" },
  { campaignId: "wc-006", campaignName: "Event Invitation - Product Webinar", sent: 8000, delivered: 7840, read: 6272, failed: 160, replies: 1568, responseRate: 25, status: "SCHEDULED" },
  { campaignId: "wc-007", campaignName: "Re-engagement Campaign", sent: 2000, delivered: 1940, read: 1552, failed: 60, replies: 388, responseRate: 25, status: "DRAFT" },
  { campaignId: "wc-008", campaignName: "Lead Qualification Follow-up", sent: 1000, delivered: 980, read: 784, failed: 20, replies: 196, responseRate: 25, status: "SENT" },
  { campaignId: "wc-009", campaignName: "Holiday Greeting", sent: 8000, delivered: 7760, read: 6208, failed: 240, replies: 1552, responseRate: 25, status: "CANCELLED" },
  { campaignId: "wc-010", campaignName: "Support Ticket Follow-up", sent: 2000, delivered: 1960, read: 1568, failed: 40, replies: 392, responseRate: 25, status: "DRAFT" },
];
