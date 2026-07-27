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
    LIST: "/marketing/campaigns",
    ADD: "/marketing/campaigns/add",
    VIEW: (id: string) => `/marketing/campaigns/${id}`,
    EDIT: (id: string) => `/marketing/campaigns/${id}/edit`,
  } as const,

  EMAIL_MARKETING: {
    HOME: "/marketing/email-marketing",
    CAMPAIGNS: {
      LIST: "/marketing/email-marketing/campaigns",
      ADD: "/marketing/email-marketing/campaigns/add",
      VIEW: (id: string) => `/marketing/email-marketing/campaigns/${id}`,
      EDIT: (id: string) => `/marketing/email-marketing/campaigns/${id}/edit`,
    },
    TEMPLATES: {
      LIST: "/marketing/email-marketing/templates",
      ADD: "/marketing/email-marketing/templates/add",
      VIEW: (id: string) => `/marketing/email-marketing/templates/${id}`,
      EDIT: (id: string) => `/marketing/email-marketing/templates/${id}/edit`,
    },
    HISTORY: "/marketing/email-marketing/history",
  } as const,

  WHATSAPP: {
    HOME: "/marketing/whatsapp",
    CAMPAIGNS: {
      LIST: "/marketing/whatsapp/campaigns",
      ADD: "/marketing/whatsapp/campaigns/add",
      VIEW: (id: string) => `/marketing/whatsapp/campaigns/${id}`,
      EDIT: (id: string) => `/marketing/whatsapp/campaigns/${id}/edit`,
    },
    TEMPLATES: {
      LIST: "/marketing/whatsapp/templates",
      ADD: "/marketing/whatsapp/templates/add",
      VIEW: (id: string) => `/marketing/whatsapp/templates/${id}`,
      EDIT: (id: string) => `/marketing/whatsapp/templates/${id}/edit`,
    },
    HISTORY: "/marketing/whatsapp/history",
  } as const,

  SOCIAL_MEDIA: {
    HOME: "/marketing/social-media",
    POSTS: {
      LIST: "/marketing/social-media/posts",
      ADD: "/marketing/social-media/posts/add",
      VIEW: (id: string) => `/marketing/social-media/posts/${id}`,
      EDIT: (id: string) => `/marketing/social-media/posts/${id}/edit`,
    },
    CAMPAIGNS: {
      LIST: "/marketing/social-media/campaigns",
      ADD: "/marketing/social-media/campaigns/add",
      VIEW: (id: string) => `/marketing/social-media/campaigns/${id}`,
      EDIT: (id: string) => `/marketing/social-media/campaigns/${id}/edit`,
    },
    HISTORY: "/marketing/social-media/history",
  } as const,

  ADS: {
    HOME: "/marketing/ads",
    CAMPAIGNS: {
      LIST: "/marketing/ads/campaigns",
      ADD: "/marketing/ads/campaigns/add",
      VIEW: (id: string) => `/marketing/ads/campaigns/${id}`,
      EDIT: (id: string) => `/marketing/ads/campaigns/${id}/edit`,
    },
    SETS: {
      LIST: "/marketing/ads/sets",
      ADD: "/marketing/ads/sets/add",
    },
    ADS: {
      LIST: "/marketing/ads/ads",
      ADD: "/marketing/ads/ads/add",
    },
    HISTORY: "/marketing/ads/history",
    ANALYTICS: "/marketing/ads/analytics",
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
