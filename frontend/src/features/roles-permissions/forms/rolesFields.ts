import type { FormField } from "@/components/common/DataForm";

export const rolesFields: FormField[] = [
  {
    name: "name",
    label: "Role Name",
    type: "text",
    placeholder: "Enter role name",
    required: true,
  },

  {
    name: "description",
    label: "Description",
    type: "textarea",
    placeholder: "Enter role description",
    required: true,
  },

  {
    name: "department",
    label: "Department",
    type: "select",
    placeholder: "Select department",
    required: true,
    options: [
      {
        label: "Sales",
        value: "SALES",
      },
      {
        label: "HR",
        value: "HR",
      },
      {
        label: "Marketing",
        value: "MARKETING",
      },
      {
        label: "Finance",
        value: "FINANCE",
      },
      {
        label: "Operations",
        value: "OPERATIONS",
      },
      {
        label: "Management",
        value: "MANAGEMENT",
      },
      {
        label: "Other",
        value: "OTHER",
      },
    ],
  },

  {
    name: "level",
    label: "Role Level / Hierarchy",
    type: "select",
    placeholder: "Select role level",
    required: true,
    options: [
      {
        label: "Super Admin",
        value: "SUPER_ADMIN",
      },
      {
        label: "Admin",
        value: "ADMIN",
      },
      {
        label: "Manager",
        value: "MANAGER",
      },
      {
        label: "Team Lead",
        value: "TEAM_LEAD",
      },
      {
        label: "User",
        value: "USER",
      },
    ],
  },

  {
    name: "status",
    label: "Status",
    type: "select",
    required: true,
    options: [
      {
        label: "Active",
        value: "ACTIVE",
      },
      {
        label: "Inactive",
        value: "INACTIVE",
      },
    ],
  },
];