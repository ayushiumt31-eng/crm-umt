export type PermissionAction =
  | "VIEW"
  | "CREATE"
  | "EDIT"
  | "DELETE";

export type PermissionModule =
  | "DASHBOARD"
  | "CUSTOMERS"
  | "LEADS"
  | "EMPLOYEES"
  | "SALES"
  | "TASKS"
  | "MARKETING"
  | "PAYROLL"
  | "REPORTS"
  | "SETTINGS"
  | "ROLES_PERMISSIONS";

export interface Permission {
  id: string;
  module: PermissionModule;
  action: PermissionAction;
  key: string;
  label: string;
}