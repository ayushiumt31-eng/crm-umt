import {
  LayoutDashboard,
  Users,
  UserRound,
  Wallet,
  Megaphone,
  BarChart3,
  Settings,
  Zap,
  ShieldCheck,
  Handshake,
} from "lucide-react";

import type { SidebarGroup } from "../types/sidebar";

export const sidebarMenu: SidebarGroup[] = [
  // Dashboard
  {
    id: 1,
    title: "Dashboard",
    roles: ["SUPER_ADMIN", "ADMIN", "USER"],
    children: [
      {
        id: 1,
        title: "Dashboard",
        path: "/dashboard",
        icon: LayoutDashboard,
        roles: ["SUPER_ADMIN", "ADMIN", "USER"],
      },
    ],
  },

  // CRM
  {
    id: 2,
    title: "CRM",
    roles: ["SUPER_ADMIN", "ADMIN", "USER"],
    children: [
      {
        id: 1,
        title: "Customers",
        path: "/customers",
        icon: Users,
        roles: ["SUPER_ADMIN", "ADMIN", "USER"],
      },
      {
        id: 2,
        title: "Lead",
        path: "/lead",
        icon: Zap,
        roles: ["SUPER_ADMIN", "ADMIN", "USER"],
      },
       {
      id: 3,
      title: "Deals / Opportunities",
      path: "/deals",
      icon: Handshake,
      roles: ["SUPER_ADMIN", "ADMIN", "USER"],
    },
    ],
  },

  // HR
  {
    id: 3,
    title: "HR",
    roles: ["SUPER_ADMIN", "ADMIN"],
    children: [
      {
        id: 1,
        title: "Employees",
        path: "/employees",
        icon: UserRound,
        roles: ["SUPER_ADMIN", "ADMIN"],
      },
      {
        id: 2,
        title: "Payroll",
        path: "/payroll",
        icon: Wallet,
        roles: ["SUPER_ADMIN", "ADMIN"],
      },
    ],
  },

  // Marketing
  {
    id: 4,
    title: "Marketing",
    roles: ["SUPER_ADMIN", "ADMIN"],
    children: [
      {
        id: 1,
        title: "Marketing",
        path: "/marketing",
        icon: Megaphone,
        roles: ["SUPER_ADMIN", "ADMIN"],
      },
    ],
  },

  // Reports
  {
    id: 5,
    title: "Reports",
    roles: ["SUPER_ADMIN", "ADMIN"],
    children: [
      {
        id: 1,
        title: "Reports",
        path: "/reports",
        icon: BarChart3,
        roles: ["SUPER_ADMIN", "ADMIN"],
      },
    ],
  },

  // Settings
  {
    id: 6,
    title: "Settings",
    roles: ["SUPER_ADMIN", "ADMIN"],
    children: [
      {
        id: 1,
        title: "Settings",
        path: "/settings",
        icon: Settings,
        roles: ["SUPER_ADMIN", "ADMIN"],
      },
      {
        id: 2,
        title: "Roles & Permissions",
        path: "/roles-permissions",
        icon: ShieldCheck,
        roles: ["SUPER_ADMIN", "ADMIN"],
      },
    ],
  },
];