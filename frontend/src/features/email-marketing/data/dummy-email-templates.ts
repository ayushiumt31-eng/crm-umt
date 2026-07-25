import type { EmailTemplate } from "../types/emailTemplate";

export const dummyEmailTemplates: EmailTemplate[] = [
  {
    id: "etpl-001",
    name: "Welcome Email",
    subject: "Welcome to {{companyName}}! Let's Get Started",
    category: "WELCOME",
    body: `<h1>Welcome aboard, {{firstName}}!</h1>
<p>Thank you for choosing {{companyName}}. We're thrilled to have you with us.</p>
<p>Your account has been created successfully. Here's what you can do next:</p>
<ul>
<li>Complete your profile</li>
<li>Explore our features</li>
<li>Schedule an onboarding call</li>
</ul>
<p>If you have any questions, reply to this email.</p>
<p>Best regards,<br/>{{companyName}} Team</p>`,
    status: "ACTIVE",
    createdBy: "emp-001",
    createdByName: "Rahul Sharma",
    createdAt: "2026-06-01T09:00:00Z",
    updatedAt: "2026-07-15T10:00:00Z",
  },
  {
    id: "etpl-002",
    name: "Summer Sale Promotion",
    subject: "🔥 Summer Sale - Up to 40% Off!",
    category: "PROMOTION",
    body: `<h1>Hi {{firstName}},</h1>
<p>Summer is here, and so are our biggest discounts of the year!</p>
<p>For a limited time, enjoy up to 40% off on all premium plans.</p>
<h3>Offer Highlights:</h3>
<ul>
<li>40% off Annual Plans</li>
<li>Free onboarding support</li>
<li>Dedicated account manager</li>
</ul>
<p>Offer ends July 31st. Don't miss out!</p>
<p>Cheers,<br/>{{companyName}} Team</p>`,
    status: "ACTIVE",
    createdBy: "emp-004",
    createdByName: "Neha Gupta",
    createdAt: "2026-06-15T11:00:00Z",
  },
  {
    id: "etpl-003",
    name: "Monthly Newsletter",
    subject: "{{companyName}} Insider - Your Monthly Update",
    category: "NEWSLETTER",
    body: `<h1>Hello {{firstName}},</h1>
<p>Welcome to this month's edition of {{companyName}} Insider!</p>
<h3>What's New:</h3>
<ul>
<li>New feature: AI-powered analytics dashboard</li>
<li>Customer success story: How Acme Corp scaled with our platform</li>
<li>Upcoming webinar: Advanced CRM strategies</li>
</ul>
<p>Stay tuned for more updates next month!</p>
<p>The {{companyName}} Team</p>`,
    status: "ACTIVE",
    createdBy: "emp-004",
    createdByName: "Neha Gupta",
    createdAt: "2026-07-01T08:00:00Z",
  },
  {
    id: "etpl-004",
    name: "Follow-up After Demo",
    subject: "Thanks for your time, {{firstName}}!",
    category: "FOLLOW_UP",
    body: `<h1>Hi {{firstName}},</h1>
<p>Thank you for attending our product demo!</p>
<p>As promised, here are the resources we discussed:</p>
<ul>
<li>Product brochure: [link]</li>
<li>Pricing details: [link]</li>
<li>Case studies: [link]</li>
</ul>
<p>Would you like to schedule a follow-up call with our product specialist?</p>
<p>Best,<br/>{{firstName}} {{lastName}}<br/>{{companyName}}</p>`,
    status: "ACTIVE",
    createdBy: "emp-002",
    createdByName: "Priya Verma",
    createdAt: "2026-07-10T14:00:00Z",
  },
  {
    id: "etpl-005",
    name: "Payment Reminder",
    subject: "Payment Reminder: Your invoice is due soon",
    category: "REMINDER",
    body: `<h1>Dear {{firstName}},</h1>
<p>This is a friendly reminder that your invoice for {{companyName}} services is due in 7 days.</p>
<p>Invoice Details:</p>
<ul>
<li>Amount: $X,XXX</li>
<li>Due Date: [Date]</li>
<li>Plan: [Plan Name]</li>
</ul>
<p>To make a payment, log in to your account and visit the billing section.</p>
<p>Thank you for your business!</p>
<p>Regards,<br/>{{companyName}} Billing Team</p>`,
    status: "ACTIVE",
    createdBy: "emp-005",
    createdByName: "Vikas Mehta",
    createdAt: "2026-07-20T10:00:00Z",
  },
  {
    id: "etpl-006",
    name: "New Feature Announcement",
    subject: "Introducing AI Analytics Dashboard 🚀",
    category: "ANNOUNCEMENT",
    body: `<h1>Exciting News, {{firstName}}!</h1>
<p>We're thrilled to announce the launch of our AI Analytics Dashboard!</p>
<h3>Features:</h3>
<ul>
<li>Real-time sales insights</li>
<li>Predictive lead scoring</li>
<li>Automated reporting</li>
<li>Custom dashboards</li>
</ul>
<p>Log in to explore the new dashboard today.</p>
<p>The {{companyName}} Team</p>`,
    status: "ACTIVE",
    createdBy: "emp-001",
    createdByName: "Rahul Sharma",
    createdAt: "2026-08-01T09:00:00Z",
  },
  {
    id: "etpl-007",
    name: "Custom Follow-up",
    subject: "Checking in, {{firstName}}",
    category: "CUSTOM",
    body: `<h1>Hi {{firstName}},</h1>
<p>Hope you're doing well!</p>
<p>I'm reaching out to see if you have any questions about {{companyName}} solutions. Our team is here to help you make the most of your experience.</p>
<p>Feel free to book a call at your convenience.</p>
<p>Cheers,<br/>{{firstName}} {{lastName}}</p>`,
    status: "INACTIVE",
    createdBy: "emp-002",
    createdByName: "Priya Verma",
    createdAt: "2026-08-05T11:00:00Z",
  },
  {
    id: "etpl-008",
    name: "Re-engagement Campaign",
    subject: "We miss you, {{firstName}}! Come back for 20% off",
    category: "PROMOTION",
    body: `<h1>Hi {{firstName}},</h1>
<p>We noticed you haven't logged in recently. We'd love to have you back!</p>
<p>As a special offer, here's 20% off your next 3 months:</p>
<p style="font-size: 24px; font-weight: bold;">CODE: WELCOME20</p>
<p>This offer is valid for the next 14 days.</p>
<p>See you soon!<br/>{{companyName}} Team</p>`,
    status: "ACTIVE",
    createdBy: "emp-004",
    createdByName: "Neha Gupta",
    createdAt: "2026-08-10T15:00:00Z",
  },
];

