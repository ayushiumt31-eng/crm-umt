/**
 * Centralized Route Configuration
 * All routes in one place for easy access and management
 */

export interface RouteConfig {
  path: string;
  name: string;
  label?: string;
}

export const ROUTES = {
  // Auth
  AUTH: {
    LOGIN: "/login",
  } as const,

  // Dashboard
  DASHBOARD: {
    HOME: "/dashboard",
  } as const,

  // Customers Module
  CUSTOMERS: {
    LIST: "/customers",
    ADD: "/customers/add",
    VIEW: (id: string) => `/customers/${id}`,
    EDIT: (id: string) => `/customers/${id}/edit`,
  } as const,

  // Employees Module
  EMPLOYEES: {
    LIST: "/employees",
    ADD: "/employees/add",
    VIEW: (id: string) => `/employees/${id}`,
    EDIT: (id: string) => `/employees/${id}/edit`,
  } as const,

  // Leads Module
  LEADS: {
    LIST: "/leads",
    ADD: "/leads/add",
    VIEW: (id: string) => `/leads/${id}`,
    EDIT: (id: string) => `/leads/${id}/edit`,
  } as const,

  // Other Modules
  PAYROLL: {
    LIST: "/payroll",
  } as const,

  SALES: {
    LIST: "/sales",
  } as const,

  MARKETING: {
    LIST: "/marketing",
  } as const,

  REPORTS: {
    LIST: "/reports",
  } as const,

  SETTINGS: {
    LIST: "/settings",
  } as const,
} as const;

/**
 * Utility function to navigate to a page
 * Usage: navigate(ROUTES.LEADS.VIEW(leadId))
 */
export const getRoute = (path: string | (() => string)): string => {
  return typeof path === "function" ? path() : path;
};

/**
 * Create a generic route config for modules
 * Usage: createModuleRoutes('leads', 'Leads')
 */
export function createModuleRoutes(moduleName: string, displayName: string) {
  const base = `/${moduleName}`;
  return {
    LIST: base,
    ADD: `${base}/add`,
    VIEW: (id: string) => `${base}/${id}`,
    EDIT: (id: string) => `${base}/${id}/edit`,
    displayName,
  } as const;
}

/**
 * All routes as an array for navigation menus
 */
export const ROUTE_GROUPS = [
  {
    name: "CRM",
    routes: [
      { path: ROUTES.CUSTOMERS.LIST, label: "Customers" },
      { path: ROUTES.LEADS.LIST, label: "Leads" },
    ],
  },
  {
    name: "HR",
    routes: [{ path: ROUTES.EMPLOYEES.LIST, label: "Employees" }],
  },
] as const;
