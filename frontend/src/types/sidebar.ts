import type { LucideIcon } from "lucide-react";

export type UserRole = "SUPER_ADMIN" | "ADMIN" | "USER";

export interface SidebarSubItem {
  id: number;
  title: string;
  path: string;
  icon: LucideIcon;
  roles: UserRole[];
}

export interface SidebarGroup {
  id: number;
  title: string;
  icon?: LucideIcon;
  roles: UserRole[];
  children: SidebarSubItem[];
}