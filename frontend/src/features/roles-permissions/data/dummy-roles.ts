import type { Role } from "../types/role";

export const dummyRoles: Role[] = [
  {
    id: "role-super-admin",
    name: "Super Admin",
    description:
      "Full access to all CRM modules, system settings, users, roles, and permissions.",
    permissions: [
      {
        module: "DASHBOARD",
        actions: ["VIEW"],
      },
      {
        module: "CUSTOMERS",
        actions: ["VIEW", "CREATE", "EDIT", "DELETE"],
      },
      {
        module: "LEADS",
        actions: ["VIEW", "CREATE", "EDIT", "DELETE"],
      },
      {
        module: "EMPLOYEES",
        actions: ["VIEW", "CREATE", "EDIT", "DELETE"],
      },
      {
        module: "SALES",
        actions: ["VIEW", "CREATE", "EDIT", "DELETE"],
      },
      {
        module: "TASKS",
        actions: ["VIEW", "CREATE", "EDIT", "DELETE"],
      },
      {
        module: "MARKETING",
        actions: ["VIEW", "CREATE", "EDIT", "DELETE"],
      },
      {
        module: "PAYROLL",
        actions: ["VIEW", "CREATE", "EDIT", "DELETE"],
      },
      {
        module: "REPORTS",
        actions: ["VIEW"],
      },
      {
        module: "ROLES_PERMISSIONS",
        actions: ["VIEW", "CREATE", "EDIT", "DELETE"],
      },
      {
        module: "SETTINGS",
        actions: ["VIEW", "EDIT"],
      },
    ],
    userCount: 1,
    status: "ACTIVE",
    createdAt: "2026-01-01T00:00:00.000Z",
  },

  {
    id: "role-admin",
    name: "Admin",
    description:
      "Manages CRM operations, customers, leads, sales, marketing, and assigned users.",
    permissions: [
      {
        module: "DASHBOARD",
        actions: ["VIEW"],
      },
      {
        module: "CUSTOMERS",
        actions: ["VIEW", "CREATE", "EDIT", "DELETE"],
      },
      {
        module: "LEADS",
        actions: ["VIEW", "CREATE", "EDIT", "DELETE"],
      },
      {
        module: "SALES",
        actions: ["VIEW", "CREATE", "EDIT", "DELETE"],
      },
      {
        module: "TASKS",
        actions: ["VIEW", "CREATE", "EDIT"],
      },
      {
        module: "MARKETING",
        actions: ["VIEW", "CREATE", "EDIT"],
      },
      {
        module: "REPORTS",
        actions: ["VIEW"],
      },
      {
        module: "ROLES_PERMISSIONS",
        actions: ["VIEW", "CREATE", "EDIT"],
      },
      {
        module: "SETTINGS",
        actions: ["VIEW"],
      },
    ],
    userCount: 5,
    status: "ACTIVE",
    createdAt: "2026-01-02T00:00:00.000Z",
  },

  {
    id: "role-user",
    name: "User",
    description:
      "Basic CRM user with access to assigned customers, leads, tasks, and dashboard.",
    permissions: [
      {
        module: "DASHBOARD",
        actions: ["VIEW"],
      },
      {
        module: "CUSTOMERS",
        actions: ["VIEW", "CREATE", "EDIT"],
      },
      {
        module: "LEADS",
        actions: ["VIEW", "CREATE", "EDIT"],
      },
      {
        module: "TASKS",
        actions: ["VIEW", "CREATE", "EDIT"],
      },
      {
        module: "REPORTS",
        actions: ["VIEW"],
      },
    ],
    userCount: 20,
    status: "ACTIVE",
    createdAt: "2026-01-03T00:00:00.000Z",
  },

  {
    id: "role-sales-manager",
    name: "Sales Manager",
    description:
      "Manages sales activities, leads, customers, and sales reports.",
    permissions: [
      {
        module: "DASHBOARD",
        actions: ["VIEW"],
      },
      {
        module: "CUSTOMERS",
        actions: ["VIEW", "CREATE", "EDIT"],
      },
      {
        module: "LEADS",
        actions: ["VIEW", "CREATE", "EDIT", "DELETE"],
      },
      {
        module: "SALES",
        actions: ["VIEW", "CREATE", "EDIT", "DELETE"],
      },
      {
        module: "TASKS",
        actions: ["VIEW", "CREATE", "EDIT"],
      },
      {
        module: "REPORTS",
        actions: ["VIEW"],
      },
    ],
    userCount: 3,
    status: "ACTIVE",
    createdAt: "2026-01-04T00:00:00.000Z",
  },

  {
    id: "role-hr-manager",
    name: "HR Manager",
    description:
      "Manages employees, payroll, and HR-related operations.",
    permissions: [
      {
        module: "DASHBOARD",
        actions: ["VIEW"],
      },
      {
        module: "EMPLOYEES",
        actions: ["VIEW", "CREATE", "EDIT", "DELETE"],
      },
      {
        module: "PAYROLL",
        actions: ["VIEW", "CREATE", "EDIT"],
      },
      {
        module: "REPORTS",
        actions: ["VIEW"],
      },
    ],
    userCount: 2,
    status: "ACTIVE",
    createdAt: "2026-01-05T00:00:00.000Z",
  },

  {
    id: "role-marketing-manager",
    name: "Marketing Manager",
    description:
      "Manages marketing campaigns, customer engagement, and marketing reports.",
    permissions: [
      {
        module: "DASHBOARD",
        actions: ["VIEW"],
      },
      {
        module: "CUSTOMERS",
        actions: ["VIEW"],
      },
      {
        module: "MARKETING",
        actions: ["VIEW", "CREATE", "EDIT", "DELETE"],
      },
      {
        module: "REPORTS",
        actions: ["VIEW"],
      },
    ],
    userCount: 2,
    status: "ACTIVE",
    createdAt: "2026-01-06T00:00:00.000Z",
  },

  {
    id: "role-old-admin",
    name: "Old Admin",
    description:
      "Legacy administrator role that is currently inactive.",
    permissions: [
      {
        module: "DASHBOARD",
        actions: ["VIEW"],
      },
      {
        module: "CUSTOMERS",
        actions: ["VIEW"],
      },
    ],
    userCount: 0,
    status: "INACTIVE",
    createdAt: "2026-01-07T00:00:00.000Z",
  },
];