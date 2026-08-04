import { useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Eye, EyeOff, UserPlus, Loader2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  registrationSchema,
  type RegistrationFormValues,
} from "../schemas/auth.schemas";
import { register as registerService } from "../services/authService";
import AuthPageShell from "../components/AuthPageShell";
import PasswordStrength from "../components/PasswordStrength";

const DEPARTMENTS = [
  { value: "SALES", label: "Sales" },
  { value: "MARKETING", label: "Marketing" },
  { value: "HR", label: "Human Resources" },
  { value: "FINANCE", label: "Finance" },
  { value: "OPERATIONS", label: "Operations" },
  { value: "IT", label: "IT / Engineering" },
  { value: "MANAGEMENT", label: "Management" },
  { value: "OTHER", label: "Other" },
] as const;

export default function Register() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // ---- Registration form ----
  const {
    register: reg,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<RegistrationFormValues>({
    resolver: zodResolver(registrationSchema),
    defaultValues: {
      fullName: "",
      email: "",
      phone: "",
      department: "",
      designation: "",
      password: "",
      confirmPassword: "",
      termsAccepted: false,
    },
  });

  const newPassword = watch("password");

  // ---- Step 1: Submit registration ----
  const onSubmitRegistration = async (values: RegistrationFormValues) => {
    setServerError(null);
    setIsSubmitting(true);
    try {
      // Enterprise rule: service layer forces role = USER, status = PENDING
      await registerService(values);
      // Navigate to the shared OTP verification page
      navigate(
        `/verify-otp?context=register&email=${encodeURIComponent(values.email)}`,
        { replace: true }
      );
    } catch (err) {
      setServerError(
        err instanceof Error
          ? err.message
          : "Registration failed. Please try again."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  // Department options (memoized)
  const departmentOptions = useMemo(() => DEPARTMENTS, []);

  /* ================================================================ */
  /* RENDER                                                           */
  /* ================================================================ */

  // ---- Registration Form Step ----
  return (
    <AuthPageShell
      title="Create Account"
      subtitle="Register to access the CRM"
      error={serverError}
      footer={
        <>
          Already have an account?{" "}
          <Link
            to="/login"
            className="font-medium text-blue-600 hover:underline dark:text-blue-400"
          >
            Sign in
          </Link>
        </>
      }
      className="max-w-lg"
    >
      <form
        onSubmit={handleSubmit(onSubmitRegistration)}
        className="grid grid-cols-1 gap-x-4 gap-y-2.5 sm:grid-cols-2"
      >
        {/* Full Name */}
        <div className="space-y-1">
          <label
            htmlFor="fullName"
            className="text-xs font-semibold text-slate-700 dark:text-slate-300"
          >
            Full Name <span className="text-red-500">*</span>
          </label>
          <Input
            id="fullName"
            placeholder="John Doe"
            size="sm"
            {...reg("fullName")}
            aria-invalid={!!errors.fullName}
          />
          {errors.fullName && (
            <p className="text-xs text-red-600 dark:text-red-400">
              {errors.fullName.message}
            </p>
          )}
        </div>

        {/* Email */}
        <div className="space-y-1">
          <label
            htmlFor="reg-email"
            className="text-xs font-semibold text-slate-700 dark:text-slate-300"
          >
            Email <span className="text-red-500">*</span>
          </label>
          <Input
            id="reg-email"
            type="email"
            placeholder="you@company.com"
            size="sm"
            {...reg("email")}
            aria-invalid={!!errors.email}
          />
          {errors.email && (
            <p className="text-xs text-red-600 dark:text-red-400">
              {errors.email.message}
            </p>
          )}
        </div>

        {/* Phone */}
        <div className="space-y-1">
          <label
            htmlFor="reg-phone"
            className="text-xs font-semibold text-slate-700 dark:text-slate-300"
          >
            Phone Number <span className="text-red-500">*</span>
          </label>
          <Input
            id="reg-phone"
            type="tel"
            placeholder="+1 (555) 123-4567"
            size="sm"
            {...reg("phone")}
            aria-invalid={!!errors.phone}
          />
          {errors.phone && (
            <p className="text-xs text-red-600 dark:text-red-400">
              {errors.phone.message}
            </p>
          )}
        </div>

        {/* Department (optional) */}
        <div className="space-y-1">
          <label
            htmlFor="reg-department"
            className="text-xs font-semibold text-slate-700 dark:text-slate-300"
          >
            Department <span className="text-xs font-normal text-slate-400">(optional)</span>
          </label>
          <select
            id="reg-department"
            className="w-full h-9 rounded-lg border border-input bg-transparent px-2.5 text-sm outline-hidden focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 dark:bg-input/30"
            {...reg("department")}
            aria-invalid={!!errors.department}
          >
            <option value="">Select Department</option>
            {departmentOptions.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
          {errors.department && (
            <p className="text-xs text-red-600 dark:text-red-400">
              {errors.department.message}
            </p>
          )}
        </div>

        {/* Designation (optional) */}
        <div className="space-y-1">
          <label
            htmlFor="reg-designation"
            className="text-xs font-semibold text-slate-700 dark:text-slate-300"
          >
            Designation <span className="text-xs font-normal text-slate-400">(optional)</span>
          </label>
          <Input
            id="reg-designation"
            placeholder="e.g. Sales Executive"
            size="sm"
            {...reg("designation")}
            aria-invalid={!!errors.designation}
          />
          {errors.designation && (
            <p className="text-xs text-red-600 dark:text-red-400">
              {errors.designation.message}
            </p>
          )}
        </div>

        {/* Password */}
        <div className="space-y-1 sm:col-span-2">
          <label
            htmlFor="reg-password"
            className="text-xs font-semibold text-slate-700 dark:text-slate-300"
          >
            Password <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <Input
              id="reg-password"
              type={showPassword ? "text" : "password"}
              placeholder="Create a strong password"
              autoComplete="new-password"
              className="pr-10"
              size="sm"
              {...reg("password")}
              aria-invalid={!!errors.password}
            />
            <button
              type="button"
              onClick={() => setShowPassword((v) => !v)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300"
              aria-label={showPassword ? "Hide password" : "Show password"}
            >
              {showPassword ? (
                <EyeOff className="h-4 w-4" />
              ) : (
                <Eye className="h-4 w-4" />
              )}
            </button>
          </div>
          {errors.password && (
            <p className="text-xs text-red-600 dark:text-red-400">
              {errors.password.message}
            </p>
          )}
          <PasswordStrength password={newPassword || ""} />
        </div>

        {/* Confirm Password */}
        <div className="space-y-1">
          <label
            htmlFor="reg-confirm-password"
            className="text-xs font-semibold text-slate-700 dark:text-slate-300"
          >
            Confirm Password <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <Input
              id="reg-confirm-password"
              type={showConfirmPassword ? "text" : "password"}
              placeholder="Re-enter your password"
              autoComplete="new-password"
              className="pr-10"
              size="sm"
              {...reg("confirmPassword")}
              aria-invalid={!!errors.confirmPassword}
            />
            <button
              type="button"
              onClick={() => setShowConfirmPassword((v) => !v)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300"
              aria-label={
                showConfirmPassword ? "Hide password" : "Show password"
              }
            >
              {showConfirmPassword ? (
                <EyeOff className="h-4 w-4" />
              ) : (
                <Eye className="h-4 w-4" />
              )}
            </button>
          </div>
{errors.confirmPassword && (
            <p className="text-xs text-red-600 dark:text-red-400">
              {errors.confirmPassword.message}
            </p>
          )}
        </div>

        {/* Terms & Conditions */}
        <div className="flex items-start gap-2 sm:col-span-2">
          <input
            id="termsAccepted"
            type="checkbox"
            className="mt-0.5 h-4 w-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500"
            {...reg("termsAccepted")}
          />
          <label
            htmlFor="termsAccepted"
            className="text-xs text-slate-600 dark:text-slate-400"
          >
            I accept the{" "}
            <button
              type="button"
              className="font-medium text-blue-600 hover:underline dark:text-blue-400"
            >
              Terms & Conditions
            </button>{" "}
            and{" "}
            <button
              type="button"
              className="font-medium text-blue-600 hover:underline dark:text-blue-400"
            >
              Privacy Policy
            </button>
            . <span className="text-red-500">*</span>
          </label>
        </div>
        {errors.termsAccepted && (
          <p className="text-xs text-red-600 dark:text-red-400 sm:col-span-2">
            {errors.termsAccepted.message}
          </p>
        )}

        {/* Submit */}
        <Button
          type="submit"
          disabled={isSubmitting}
          className="w-full gap-2 bg-gradient-to-r from-blue-600 to-cyan-600 py-2.5 text-sm hover:from-blue-700 hover:to-cyan-700 sm:col-span-2"
        >
          {isSubmitting ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" />
              Registering...
            </>
          ) : (
            <>
              <UserPlus className="h-4 w-4" />
              Create Account
            </>
          )}
        </Button>
      </form>
    </AuthPageShell>
  );
}

