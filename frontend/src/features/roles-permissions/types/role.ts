import type { PermissionAction, PermissionModule } from "./permission";

export type RoleStatus = "ACTIVE" | "INACTIVE";

export interface RolePermission {
  module: PermissionModule;
  actions: PermissionAction[];
}

export interface Role {
  department: string;
  level: string;
  id: string;
  name: string;
  description: string;
  permissions: RolePermission[];
  userCount: number;
  status: RoleStatus;
  createdAt: string;
  updatedAt?: string;
}