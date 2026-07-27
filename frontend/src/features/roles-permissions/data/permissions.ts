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
    key: "marketing-campaigns",
    label: "Marketing Campaigns",
    permissions: [
      { key: "marketing.campaign.view", label: "View" },
      { key: "marketing.campaign.create", label: "Create" },
      { key: "marketing.campaign.update", label: "Update" },
      { key: "marketing.campaign.delete", label: "Delete" },
    ],
  },

  {
    key: "marketing-email",
    label: "Email Marketing",
    permissions: [
      { key: "marketing.email.view", label: "View" },
      { key: "marketing.email.create", label: "Create" },
      { key: "marketing.email.update", label: "Update" },
      { key: "marketing.email.delete", label: "Delete" },
      { key: "marketing.email.send", label: "Send" },
      { key: "marketing.email.export", label: "Export" },
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

  {
    key: "communications",
    label: "Communications",
    permissions: [
      { key: "communication.view", label: "View" },
      { key: "communication.create", label: "Create" },
      { key: "communication.edit", label: "Edit" },
      { key: "communication.delete", label: "Delete" },
    ],
  },

  {
    key: "social-media",
    label: "Social Media Marketing",
    permissions: [
      { key: "marketing.social.view", label: "View" },
      { key: "marketing.social.create", label: "Create" },
      { key: "marketing.social.update", label: "Update" },
      { key: "marketing.social.delete", label: "Delete" },
      { key: "marketing.social.publish", label: "Publish" },
      { key: "marketing.social.export", label: "Export" },
    ],
  },
];
