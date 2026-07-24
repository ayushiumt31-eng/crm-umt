export const permissionModules = [
  {
    key: "customers",
    label: "Customers",
    permissions: [
      { key: "customer.view", label: "View" },
      { key: "customer.create", label: "Create" },
      { key: "customer.edit", label: "Edit" },
      { key: "customer.delete", label: "Delete" },
    ],
  },

  {
    key: "leads",
    label: "Leads",
    permissions: [
      { key: "lead.view", label: "View" },
      { key: "lead.create", label: "Create" },
      { key: "lead.edit", label: "Edit" },
      { key: "lead.delete", label: "Delete" },
    ],
  },

  {
    key: "sales",
    label: "Sales",
    permissions: [
      { key: "sales.view", label: "View" },
      { key: "sales.create", label: "Create" },
      { key: "sales.edit", label: "Edit" },
      { key: "sales.delete", label: "Delete" },
    ],
  },

  {
    key: "employees",
    label: "Employees",
    permissions: [
      { key: "employee.view", label: "View" },
      { key: "employee.create", label: "Create" },
      { key: "employee.edit", label: "Edit" },
      { key: "employee.delete", label: "Delete" },
    ],
  },

  {
    key: "payroll",
    label: "Payroll",
    permissions: [
      { key: "payroll.view", label: "View" },
      { key: "payroll.create", label: "Create" },
      { key: "payroll.edit", label: "Edit" },
      { key: "payroll.delete", label: "Delete" },
    ],
  },

  {
    key: "marketing",
    label: "Marketing",
    permissions: [
      { key: "marketing.view", label: "View" },
      { key: "marketing.create", label: "Create" },
      { key: "marketing.edit", label: "Edit" },
      { key: "marketing.delete", label: "Delete" },
    ],
  },

  {
    key: "reports",
    label: "Reports",
    permissions: [
      { key: "report.view", label: "View" },
      { key: "report.export", label: "Export" },
    ],
  },
];