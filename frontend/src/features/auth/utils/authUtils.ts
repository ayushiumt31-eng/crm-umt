import type {
  AccountStatus,
  AuthUser,
  OtpContext,
  UserRole,
} from "../types/auth";

/**
 * Shared UI helpers for the auth module.
 * Kept separate from the service layer so pages only render UI.
 */

export const ROLE_LABELS: Record<UserRole, string> = {
  SUPER_ADMIN: "Super Admin",
  ADMIN: "Admin",
  HR: "HR",
  USER: "User",
};

export const STATUS_LABELS: Record<AccountStatus, string> = {
  PENDING: "Pending",
  APPROVED: "Approved",
  REJECTED: "Rejected",
  INACTIVE: "Inactive",
};

export const STATUS_MESSAGES: Record<AccountStatus, string> = {
  PENDING: "Your account is waiting for administrator approval.",
  APPROVED: "Your account is approved.",
  REJECTED: "Your registration request has been rejected.",
  INACTIVE: "Your account has been disabled.",
};

export const STATUS_STYLES: Record<AccountStatus, string> = {
  PENDING: "bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-300",
  APPROVED: "bg-green-100 text-green-700 dark:bg-green-900/40 dark:text-green-300",
  REJECTED: "bg-red-100 text-red-700 dark:bg-red-900/40 dark:text-red-300",
  INACTIVE: "bg-slate-200 text-slate-700 dark:bg-slate-800 dark:text-slate-300",
};

export const OTP_CONTEXT_LABELS: Record<OtpContext, string> = {
  login: "Login Verification",
  register: "Email Verification",
  "forgot-password": "Password Reset Verification",
};

export const OTP_CONTEXT_SUBTITLES: Record<OtpContext, string> = {
  login: "Enter the 6-digit OTP sent to your email to securely sign in.",
  register: "Enter the 6-digit OTP sent to your email to activate your account.",
  "forgot-password":
    "Enter the 6-digit OTP sent to your email to reset your password.",
};

export function getInitials(name?: string | null): string {
  if (!name) return "U";
  return name
    .split(" ")
    .map((part) => part.charAt(0))
    .filter(Boolean)
    .slice(0, 2)
    .join("")
    .toUpperCase();
}

export function formatDate(value?: string | Date | null): string {
  if (!value) return "—";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "—";
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

export function formatDateTime(value?: string | Date | null): string {
  if (!value) return "—";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "—";
  return date.toLocaleString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

export function getStatusMessage(status: AccountStatus): string {
  return STATUS_MESSAGES[status];
}

export function getRoleLabel(role: UserRole): string {
  return ROLE_LABELS[role];
}

export function getStatusLabel(status: AccountStatus): string {
  return STATUS_LABELS[status];
}

export function getStatusStyle(status: AccountStatus): string {
  return STATUS_STYLES[status];
}

export function asAuthUser(user: AuthUser): AuthUser {
  return {
    id: user.id,
    name: user.name,
    email: user.email,
    role: user.role,
    department: user.department,
    phone: user.phone,
    designation: user.designation,
    avatar: user.avatar,
  };
}
