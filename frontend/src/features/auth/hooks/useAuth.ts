import { useCallback, useEffect, useState } from "react";
import type {
  AccountStatus,
  AuthResponse,
  AuthUser,
  LoginCredentials,
  OtpContext,
  PendingLogin,
  UserRole,
} from "../types/auth";
import {
  AUTH_STORAGE_KEY,
  completeLogin as authCompleteLogin,
  login as authServiceLogin,
  logout as authServiceLogout,
  sendOtp as authServiceSendOtp,
  verifyOtp as authServiceVerifyOtp,
} from "../services/authService";

interface UseAuthResult {
  user: AuthUser | null;
  role: UserRole | null;
  status: AccountStatus | null;
  isAuthenticated: boolean;
  loading: boolean;
  /** Step 1: validate credentials. Returns a PendingLogin (email + context). */
  login: (credentials: LoginCredentials) => Promise<PendingLogin>;
  /** Step 2: send OTP for a given context. */
  sendOtp: (email: string, context?: OtpContext) => Promise<{ message: string }>;
  /** Step 3: verify OTP. */
  verifyOtp: (email: string, otp: string) => Promise<{ message: string }>;
/** Step 4: complete login (check status + create session). */
  completeLogin: (email: string) => Promise<AuthResponse>;
  logout: () => Promise<{ message: string }>;
}

/**
 * useAuth hook — manages dummy authentication state backed by localStorage.
 *
 * Reads the persisted auth payload from localStorage, exposes login/logout
 * to the UI, and keeps `isAuthenticated` in sync. This is the single source
 * of truth for the ProtectedRoute guard.
 *
 * The login flow is split into steps so the UI can enforce the
 * Login -> Verify OTP -> Check Status -> Dashboard sequence.
 *
 * Future backend: swap the service functions for axios/JWT calls; the hook
 * contract stays the same.
 */
export function useAuth(): UseAuthResult {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [role, setRole] = useState<UserRole | null>(null);
  const [status, setStatus] = useState<AccountStatus | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    try {
      if (typeof window === "undefined") return;
      const stored = window.localStorage.getItem(AUTH_STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored) as AuthResponse & {
          role?: UserRole;
          status?: AccountStatus;
        };
        setUser(parsed.user);
        setRole(parsed.role ?? parsed.user.role);
        setStatus(parsed.status ?? "APPROVED");
      }
    } catch {
      setUser(null);
      setRole(null);
      setStatus(null);
    } finally {
      setLoading(false);
    }
  }, []);

  const login = useCallback(async (credentials: LoginCredentials) => {
    return await authServiceLogin(credentials);
  }, []);

  const sendOtp = useCallback(
    async (email: string, context?: OtpContext) => {
      return await authServiceSendOtp(email, context);
    },
    []
  );

  const verifyOtp = useCallback(async (email: string, otp: string) => {
    return await authServiceVerifyOtp(email, otp);
  }, []);

  const completeLogin = useCallback(async (email: string) => {
    const response = await authCompleteLogin(email);
    setUser(response.user);
    setRole(response.user.role);
    setStatus("APPROVED");
    return response;
  }, []);

  const logout = useCallback(async () => {
    const result = await authServiceLogout();
    setUser(null);
    setRole(null);
    setStatus(null);
    return result;
  }, []);

  return {
    user,
    role,
    status,
    isAuthenticated: !!user,
    loading,
    login,
    sendOtp,
    verifyOtp,
    completeLogin,
    logout,
  };
}
