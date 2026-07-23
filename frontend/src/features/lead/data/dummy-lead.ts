import type { Lead } from "../types/lead";

export const dummyLead: Lead[] = [
  {
    id: "lead-001",
    firstName: "Rahul",
    lastName: "Sharma",
    email: "rahul.sharma@example.com",
    phone: "+91 9876543210",

    company: "Sharma Enterprises",
    jobTitle: "Business Owner",
    industry: "Manufacturing",

    source: "WEBSITE",
    status: "NEW",
    priority: "HIGH",

    assignedTo: "EMP001",
    estimatedValue: 250000,
    expectedCloseDate: "2026-08-15",

    address: "MG Road",
    city: "Delhi",
    state: "Delhi",
    country: "India",
    postalCode: "110001",

    notes: "Interested in CRM solution. Follow up required.",
    tags: ["CRM", "Hot Lead"],

    createdAt: "2026-07-01T10:00:00Z",
    updatedAt: "2026-07-01T10:00:00Z",
  },

  {
    id: "lead-002",
    firstName: "Priya",
    lastName: "Verma",
    email: "priya.verma@example.com",
    phone: "+91 9876543211",

    company: "Verma Technologies",
    jobTitle: "HR Manager",
    industry: "Technology",

    source: "REFERRAL",
    status: "CONTACTED",
    priority: "MEDIUM",

    assignedTo: "EMP002",
    estimatedValue: 150000,
    expectedCloseDate: "2026-09-10",

    address: "Sector 62",
    city: "Noida",
    state: "Uttar Pradesh",
    country: "India",
    postalCode: "201301",

    notes: "Initial call completed. Waiting for requirements.",
    tags: ["Technology"],

    createdAt: "2026-07-02T09:30:00Z",
    updatedAt: "2026-07-03T11:00:00Z",
  },

  {
    id: "lead-003",
    firstName: "Amit",
    lastName: "Gupta",
    email: "amit.gupta@example.com",
    phone: "+91 9876543212",

    company: "Gupta Solutions",
    jobTitle: "Director",
    industry: "Consulting",

    source: "SOCIAL_MEDIA",
    status: "QUALIFIED",
    priority: "HIGH",

    assignedTo: "EMP003",
    estimatedValue: 500000,
    expectedCloseDate: "2026-08-30",

    address: "Banjara Hills",
    city: "Hyderabad",
    state: "Telangana",
    country: "India",
    postalCode: "500034",

    notes: "Qualified lead. Demo scheduled.",
    tags: ["Qualified", "Demo"],

    createdAt: "2026-07-05T12:00:00Z",
    updatedAt: "2026-07-06T10:30:00Z",
  },
];