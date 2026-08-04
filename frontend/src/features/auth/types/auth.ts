/**
 * Authentication Types
 * Frontend-only contract. Mirrors the future NestJS + JWT backend response shape.
 */

export type UserRole = "SUPER_ADMIN" | "ADMIN" | "HR" | "USER";

export type AccountStatus = "PENDING" | "APPROVED" | "REJECTED" | "INACTIVE";

export type OtpContext = "login" | "register" | "forgot-password";

export interface AuthUser {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  department: string;
  phone: string;
  designation: string;
  avatar?: string;
}

export interface AuthResponse {
  accessToken: string;
  refreshToken: string;
  user: AuthUser;
}

export interface LoginCredentials {
  email: string;
  password: string;
  rememberMe: boolean;
}

export interface ForgotPasswordPayload {
  email: string;
}

export interface ResetPasswordPayload {
  token: string;
  newPassword: string;
  confirmPassword: string;
}

export interface ChangePasswordPayload {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}

/**
 * A user record created via self-registration.
 * Stored in localStorage (`crm_registered_users`) until the future backend
 * provides real persistence (Register / OTP / Approval / Login APIs).
 * `password` is only kept for the demo; a real backend must hash it.
 */
export interface RegisteredUser extends AuthUser {
  status: AccountStatus;
  password: string;
  termsAccepted: boolean;
  createdAt: string;
  updatedAt?: string;
}

export interface RegistrationPayload {
  fullName: string;
  email: string;
  phone: string;
  password: string;
  confirmPassword: string;
  department?: string;
  designation?: string;
  role?: UserRole;
  termsAccepted: boolean;
}

export interface OtpResponse {
  message: string;
  otp: string;
}

export interface AuthFormState {
  isSubmitting: boolean;
  error: string | null;
  success: string | null;
}

/**
 * Minimal credentials validated on the Login page before OTP.
 * No session is created — the user must verify OTP first, then
 * their account status is checked and an APPROVED session is created.
 */
export interface PendingLogin {
  email: string;
}

/**
 * Session persisted to localStorage after OTP verification +
 * account status check. Only user, tokens, role and status are stored.
 */
export interface AuthStorage {
  accessToken: string;
  refreshToken: string;
  user: AuthUser;
  role: UserRole;
  status: AccountStatus;
  permissions?: string[];
}

