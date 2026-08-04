import type {
  AuthResponse,
  AuthUser,
  AccountStatus,
  ChangePasswordPayload,
  ForgotPasswordPayload,
  LoginCredentials,
  OtpContext,
  OtpResponse,
  PendingLogin,
  RegisteredUser,
  RegistrationPayload,
  ResetPasswordPayload,
} from "../types/auth";
import { asAuthUser } from "../utils/authUtils";

/**
 * Auth Service (Frontend Only)
 *
 * Returns dummy responses only. No backend API calls.
 * The shape of these functions mirrors the future NestJS + JWT + Prisma backend,
 * so swapping them for real axios calls later is a drop-in change.
 *
 * Future backend endpoints to map:
 *  - POST /auth/register           -> register()
 *  - POST /auth/send-otp           -> sendOtp()
 *  - POST /auth/verify-otp         -> verifyOtp()
 *  - POST /auth/login              -> login()
 *  - GET  /auth/profile            -> getProfile()
 *  - POST /auth/refresh-token      -> refreshToken()
 *  - POST /auth/change-password    -> changePassword()
 *  - PATCH /admin/users/:id/status -> updateUserStatus()
 */

export const AUTH_STORAGE_KEY = "crm_auth";
export const REGISTERED_USERS_KEY = "crm_registered_users";
export const PENDING_LOGIN_KEY = "crm_pending_login";

export const DUMMY_OTP = "123456";

// Dummy seeded users (internal CRM — created by Super Admin only, already approved)
const seededUsers: AuthUser[] = [
  {
    id: "u-super",
    name: "Super Admin",
    email: "superadmin@crm.com",
    role: "SUPER_ADMIN",
    department: "Management",
    phone: "+1 (555) 000-0001",
    designation: "System Administrator",
  },
  {
    id: "u-admin",
    name: "Admin",
    email: "admin@crm.com",
    role: "ADMIN",
    department: "Operations",
    phone: "+1 (555) 000-0002",
    designation: "CRM Administrator",
  },
  {
    id: "u-user",
    name: "User",
    email: "user@crm.com",
    role: "USER",
    department: "Sales",
    phone: "+1 (555) 000-0003",
    designation: "Sales Executive",
  },
  {
    id: "u-hr",
    name: "HR Manager",
    email: "hr@crm.com",
    role: "HR",
    department: "Human Resources",
    phone: "+1 (555) 000-0004",
    designation: "HR Manager",
  },
];

const DUMMY_PASSWORDS: Record<string, string> = {
  "superadmin@crm.com": "Super@123",
  "admin@crm.com": "Admin@123",
  "user@crm.com": "User@123",
  "hr@crm.com": "Hr@12345",
};

const SEEDED_STATUSES: Record<string, AccountStatus> = {
  "superadmin@crm.com": "APPROVED",
  "admin@crm.com": "APPROVED",
  "user@crm.com": "APPROVED",
  "hr@crm.com": "APPROVED",
};

const simulateDelay = (): Promise<void> =>
  new Promise((resolve) => setTimeout(resolve, 600));

function generateToken(user: AuthUser): string {
  return `dummy-jwt-${user.id}-${Date.now().toString(36)}`;
}

/* ------------------------------------------------------------------ */
/* localStorage helpers                                                */
/* ------------------------------------------------------------------ */

function readRegisteredUsers(): RegisteredUser[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(REGISTERED_USERS_KEY);
    return raw ? (JSON.parse(raw) as RegisteredUser[]) : [];
  } catch {
    return [];
  }
}

function writeRegisteredUsers(users: RegisteredUser[]): void {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(REGISTERED_USERS_KEY, JSON.stringify(users));
}

/**
 * Look up a user that may be a seeded admin OR a self-registered user.
 * Used by the login flow to enforce account status.
 */
function findUserByEmail(email: string): RegisteredUser | AuthUser | null {
  const normalized = email.toLowerCase().trim();
  const registered = readRegisteredUsers().find(
    (u) => u.email.toLowerCase() === normalized
  );
  if (registered) return registered;
  return seededUsers.find((u) => u.email.toLowerCase() === normalized) || null;
}

function getStatusFor(user: RegisteredUser | AuthUser): AccountStatus {
  if ("status" in user && user.status) return user.status;
  const normalized = user.email.toLowerCase().trim();
  return SEEDED_STATUSES[normalized] ?? "APPROVED";
}

function buildAuthUser(user: RegisteredUser | AuthUser): AuthUser {
  return asAuthUser({
    id: user.id,
    name: user.name,
    email: user.email,
    role: user.role,
    department: user.department,
    phone: user.phone,
    designation: user.designation,
    avatar: user.avatar,
  });
}

/* ------------------------------------------------------------------ */
/* Registration                                                        */
/* ------------------------------------------------------------------ */

/**
 * Registers a new user.
 * IMPORTANT: Role is ALWAYS "USER" and status is ALWAYS "PENDING".
 * A registered user cannot choose SUPER_ADMIN / ADMIN / HR.
 * Mock of POST /auth/register.
 */
export async function register(
  payload: RegistrationPayload
): Promise<RegisteredUser> {
  await simulateDelay();

  const normalizedEmail = payload.email.toLowerCase().trim();

  // Duplicate email check against both seeded + registered users
  const existing = findUserByEmail(normalizedEmail);
  if (existing) {
    throw new Error("An account with this email already exists.");
  }

  const registered: RegisteredUser = {
    id: `u-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 7)}`,
    name: payload.fullName.trim(),
    email: normalizedEmail,
    phone: payload.phone.trim(),
    department: payload.department ?? "",
    designation: payload.designation ?? "",
    // Enterprise rule: self-registered users always get USER role + PENDING status
    role: "USER",
    status: "PENDING",
    password: payload.password,
    termsAccepted: payload.termsAccepted,
    createdAt: new Date().toISOString(),
  };

  const users = readRegisteredUsers();
  users.push(registered);
  writeRegisteredUsers(users);

  return registered;
}

/* ------------------------------------------------------------------ */
/* OTP                                                                 */
/* ------------------------------------------------------------------ */

/**
 * Sends a dummy OTP to the user's email. Mock of POST /auth/send-otp.
 */
export async function sendOtp(
  email: string,
  _context?: OtpContext
): Promise<OtpResponse> {
  await simulateDelay();
  return {
    message: `A 6-digit OTP has been sent to ${email}.`,
    otp: DUMMY_OTP,
  };
}

/**
 * Verifies the submitted OTP against the dummy OTP. Mock of POST /auth/verify-otp.
 */
export async function verifyOtp(
  email: string,
  otp: string
): Promise<{ message: string }> {
  await simulateDelay();
  if (otp !== DUMMY_OTP) {
    throw new Error("Invalid OTP. Please try again.");
  }
  return { message: "OTP verified successfully." };
}

/* ------------------------------------------------------------------ */
/* Login (Step 1: validate credentials, NO session yet)                */
/* ------------------------------------------------------------------ */

/**
 * Validates credentials only. Returns a PendingLogin (email) — NOT a session.
 * The user must verify OTP next, then their account status is checked
 * and a session is created via completeLogin().
 *
 * Mock of POST /auth/login + POST /auth/send-otp.
 */
export async function login(
  credentials: LoginCredentials
): Promise<PendingLogin> {
  await simulateDelay();

  const user = findUserByEmail(credentials.email);

  if (!user) {
    throw new Error("Invalid email or password");
  }

  // Validate password for registered users
  if ("password" in user && user.password !== credentials.password) {
    throw new Error("Invalid email or password");
  }

  // Validate password for seeded users
  if (!("password" in user)) {
    if (DUMMY_PASSWORDS[user.email] !== credentials.password) {
      throw new Error("Invalid email or password");
    }
  }

  const pending: PendingLogin = { email: user.email };
  if (typeof window !== "undefined") {
    window.localStorage.setItem(PENDING_LOGIN_KEY, JSON.stringify(pending));
  }

  return pending;
}

/* ------------------------------------------------------------------ */
/* Login (Step 2: verify OTP + check status + create session)          */
/* ------------------------------------------------------------------ */

/**
 * Completes the login flow AFTER OTP verification.
 * Checks account status:
 *  - APPROVED  -> creates session, stores user + tokens + role + status, returns AuthResponse
 *  - PENDING   -> throws "waiting for administrator approval"
 *  - REJECTED  -> throws "registration request has been rejected"
 *  - INACTIVE  -> throws "account has been disabled"
 *
 * Mock of POST /auth/verify-otp + GET /auth/me.
 */
export async function completeLogin(email: string): Promise<AuthResponse> {
  await simulateDelay();

  const user = findUserByEmail(email);
  if (!user) {
    throw new Error("Account not found. Please register first.");
  }

  const status = getStatusFor(user);

  if (status === "PENDING") {
    throw new Error("Your account is waiting for administrator approval.");
  }
  if (status === "REJECTED") {
    throw new Error("Your registration request has been rejected.");
  }
  if (status === "INACTIVE") {
    throw new Error(
      "Your account has been disabled. Please contact the administrator."
    );
  }

  const authUser = buildAuthUser(user);
  const response: AuthResponse = {
    accessToken: generateToken(authUser),
    refreshToken: generateToken(authUser),
    user: authUser,
  };

  if (typeof window !== "undefined") {
    const session: {
      accessToken: string;
      refreshToken: string;
      user: AuthUser;
      role: AuthUser["role"];
      status: AccountStatus;
      permissions?: string[];
    } = {
      ...response,
      role: authUser.role,
      status,
      permissions: [],
    };
    window.localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(session));
    window.localStorage.removeItem(PENDING_LOGIN_KEY);
  }

  return response;
}

export async function logout(): Promise<{ message: string }> {
  await simulateDelay();
  if (typeof window !== "undefined") {
    // Clear authentication session
    window.localStorage.removeItem(AUTH_STORAGE_KEY);
    // Clear OTP / pending-login session
    window.localStorage.removeItem(PENDING_LOGIN_KEY);
  }
  return { message: "You have been logged out successfully." };
}

/* ------------------------------------------------------------------ */
/* Admin approval: Pending -> Approved / Rejected / Inactive           */
/* ------------------------------------------------------------------ */

/**
 * Updates a registered user's account status. Mock of an admin endpoint.
 */
export async function updateUserStatus(
  userId: string,
  status: AccountStatus
): Promise<RegisteredUser> {
  await simulateDelay();
  const users = readRegisteredUsers();
  const index = users.findIndex((u) => u.id === userId);
  if (index === -1) {
    throw new Error("User not found.");
  }
  users[index] = { ...users[index], status, updatedAt: new Date().toISOString() };
  writeRegisteredUsers(users);
  return users[index];
}

/* ------------------------------------------------------------------ */
/* Password helpers                                                    */
/* ------------------------------------------------------------------ */

export async function forgotPassword(
  payload: ForgotPasswordPayload
): Promise<{ message: string }> {
  await simulateDelay();
  return {
    message: `A 6-digit OTP has been sent to ${payload.email}.`,
  };
}

export async function resetPassword(
  payload: ResetPasswordPayload & { email?: string }
): Promise<{ message: string }> {
  await simulateDelay();

  // For the demo, find the registered user and update the stored password.
  if (payload.email) {
    const normalizedEmail = payload.email.toLowerCase().trim();
    const users = readRegisteredUsers();
    const index = users.findIndex(
      (u) => u.email.toLowerCase() === normalizedEmail
    );
    if (index !== -1) {
      users[index] = {
        ...users[index],
        password: payload.newPassword,
        updatedAt: new Date().toISOString(),
      };
      writeRegisteredUsers(users);
    }
  }

  return {
    message: "Your password has been reset successfully. You can now log in.",
  };
}

export async function changePassword(
  _payload: ChangePasswordPayload
): Promise<{ message: string }> {
  await simulateDelay();
  return {
    message: "Your password has been changed successfully.",
  };
}

export async function getProfile(): Promise<AuthUser | null> {
  await simulateDelay();
  if (typeof window === "undefined") return null;
  const stored = window.localStorage.getItem(AUTH_STORAGE_KEY);
  if (!stored) return null;
  try {
    const parsed = JSON.parse(stored) as AuthResponse;
    return parsed.user;
  } catch {
    return null;
  }
}

