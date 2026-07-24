import type { Deal } from "../types/deal";

export const dummyDeals: Deal[] = [
  {
    id: "DL-001",
    title: "Enterprise Software License",
    value: 125000,
    stage: "NEGOTIATION",
    priority: "HIGH",
    expectedCloseDate: "2026-08-15T00:00:00Z",
    company: "Acme Corp",
    contactPerson: "John Doe",
    contactEmail: "john@acmecorp.com",
    contactPhone: "+1234567890",
    assignedTo: "Sarah Jenkins",
    createdAt: "2026-07-01T10:00:00Z",
    notes: "Awaiting final legal review."
  },
  {
    id: "DL-002",
    title: "Cloud Migration Services",
    value: 75000,
    stage: "PROPOSAL",
    priority: "MEDIUM",
    expectedCloseDate: "2026-09-01T00:00:00Z",
    company: "TechFlow Inc",
    contactPerson: "Jane Smith",
    contactEmail: "jane.s@techflow.io",
    contactPhone: "+1987654321",
    assignedTo: "Mike Ross",
    createdAt: "2026-07-10T09:30:00Z"
  },
  {
    id: "DL-003",
    title: "Annual Support Contract",
    value: 45000,
    stage: "CLOSED_WON",
    priority: "LOW",
    expectedCloseDate: "2026-07-20T00:00:00Z",
    company: "Global Industries",
    contactPerson: "Robert Chen",
    contactEmail: "rchen@globalind.com",
    contactPhone: "+1122334455",
    assignedTo: "Sarah Jenkins",
    createdAt: "2026-06-15T14:20:00Z"
  },
  {
    id: "DL-004",
    title: "Security Assessment",
    value: 30000,
    stage: "PROSPECTING",
    priority: "MEDIUM",
    expectedCloseDate: "2026-10-10T00:00:00Z",
    company: "SecureNet Ltd",
    contactPerson: "Alice Wong",
    contactEmail: "alice@securenet.com",
    contactPhone: "+1555666777",
    assignedTo: "David Kim",
    createdAt: "2026-07-22T11:45:00Z"
  }
];
