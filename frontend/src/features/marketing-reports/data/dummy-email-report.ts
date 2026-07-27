import type { EmailReport } from "../types/marketingReport";

export const dummyEmailReports: EmailReport[] = [
  { campaignId: "ec-001", campaignName: "Welcome New Customers", sent: 8000, delivered: 7840, opened: 3920, clicked: 1568, bounced: 120, failed: 40, unsubscribed: 25, openRate: 50, clickRate: 20, status: "SCHEDULED" },
  { campaignId: "ec-002", campaignName: "Q3 Product Update Newsletter", sent: 7500, delivered: 7350, opened: 3675, clicked: 1470, bounced: 105, failed: 45, unsubscribed: 30, openRate: 50, clickRate: 20, status: "DRAFT" },
  { campaignId: "ec-003", campaignName: "Lead Nurture Campaign", sent: 3000, delivered: 2940, opened: 1470, clicked: 588, bounced: 45, failed: 15, unsubscribed: 10, openRate: 50, clickRate: 20, status: "SCHEDULED" },
  { campaignId: "ec-004", campaignName: "Summer Sale Announcement", sent: 8000, delivered: 7760, opened: 3880, clicked: 1552, bounced: 160, failed: 80, unsubscribed: 35, openRate: 50, clickRate: 20, status: "SENT" },
  { campaignId: "ec-005", campaignName: "Customer Feedback Survey", sent: 3000, delivered: 2940, opened: 1470, clicked: 588, bounced: 45, failed: 15, unsubscribed: 8, openRate: 50, clickRate: 20, status: "DRAFT" },
  { campaignId: "ec-006", campaignName: "Event Invitation - Product Webinar", sent: 8000, delivered: 7840, opened: 3920, clicked: 1568, bounced: 120, failed: 40, unsubscribed: 20, openRate: 50, clickRate: 20, status: "SCHEDULED" },
  { campaignId: "ec-007", campaignName: "Re-engagement Campaign", sent: 2000, delivered: 1940, opened: 970, clicked: 388, bounced: 40, failed: 20, unsubscribed: 15, openRate: 50, clickRate: 20, status: "DRAFT" },
  { campaignId: "ec-008", campaignName: "Lead Qualification Follow-up", sent: 1000, delivered: 980, opened: 490, clicked: 196, bounced: 15, failed: 5, unsubscribed: 5, openRate: 50, clickRate: 20, status: "SENT" },
  { campaignId: "ec-009", campaignName: "Payment Reminder", sent: 1000, delivered: 970, opened: 485, clicked: 194, bounced: 20, failed: 10, unsubscribed: 12, openRate: 50, clickRate: 20, status: "CANCELLED" },
  { campaignId: "ec-010", campaignName: "Holiday Greeting Campaign", sent: 8000, delivered: 7840, opened: 3920, clicked: 1568, bounced: 120, failed: 40, unsubscribed: 18, openRate: 50, clickRate: 20, status: "DRAFT" },
];
