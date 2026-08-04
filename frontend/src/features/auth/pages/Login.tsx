import { useState } from "react";
import { Link, useLocation, useNavigate, useSearchParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Eye, EyeOff, LogIn, Loader2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { loginSchema, type LoginFormValues } from "../schemas/auth.schemas";
import { useAuth } from "../hooks/useAuth";
import AuthPageShell from "../components/AuthPageShell";

export default function Login() {
  const navigate = useNavigate();
  const location = useLocation();
  const [searchParams] = useSearchParams();
  const { login } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);
  const [successMessage] = useState<string | null>(
    (location.state as { resetSuccess?: string } | null)?.resetSuccess ||
      (searchParams.get("registered") === "true"
        ? "Registration submitted successfully. Your account is waiting for administrator approval."
        : null)
  );

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
      rememberMe: false,
    },
  });

  const onSubmit = async (values: LoginFormValues) => {
    setServerError(null);
try {
      // Step 1: validate credentials (no session yet)
      const pending = await login({
        ...values,
        rememberMe: values.rememberMe === true,
      });
      // Step 2: navigate to OTP verification
      navigate(
        `/verify-otp?context=login&email=${encodeURIComponent(pending.email)}`,
        { replace: true }
      );
    } catch (err) {
      setServerError(
        err instanceof Error ? err.message : "Login failed. Please try again."
      );
    }
  };

  return (
    <AuthPageShell
      title="Welcome Back"
      subtitle="Sign in to your CRM account to continue"
      success={successMessage}
      error={serverError}
      footer={
        <>
          Don&apos;t have an account?{" "}
          <Link
            to="/register"
            className="font-medium text-blue-600 hover:underline dark:text-blue-400"
          >
            Register here
          </Link>
        </>
      }
    >
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
        {/* Email */}
        <div className="space-y-1">
          <label
            htmlFor="email"
            className="text-sm font-semibold text-slate-700 dark:text-slate-300"
          >
            Email
          </label>
          <Input
            id="email"
            type="email"
            placeholder="you@company.com"
            autoComplete="email"
            size="sm"
            {...register("email")}
            aria-invalid={!!errors.email}
          />
          {errors.email && (
            <p className="text-xs text-red-600 dark:text-red-400">
              {errors.email.message}
            </p>
          )}
        </div>

        {/* Password */}
        <div className="space-y-1">
          <div className="flex items-center justify-between">
            <label
              htmlFor="password"
              className="text-sm font-semibold text-slate-700 dark:text-slate-300"
            >
              Password
            </label>
            <Link
              to="/forgot-password"
              className="text-xs font-medium text-blue-600 hover:underline dark:text-blue-400"
            >
              Forgot Password?
            </Link>
          </div>
          <div className="relative">
            <Input
              id="password"
              type={showPassword ? "text" : "password"}
              placeholder="Enter your password"
              autoComplete="current-password"
              className="pr-10"
              size="sm"
              {...register("password")}
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
        </div>

        {/* Remember me */}
        <div className="flex items-center gap-2">
          <input
            id="rememberMe"
            type="checkbox"
            className="h-4 w-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500"
            {...register("rememberMe")}
          />
          <label
            htmlFor="rememberMe"
            className="text-sm text-slate-600 dark:text-slate-400"
          >
            Remember me
          </label>
        </div>

        {/* Submit */}
        <Button
          type="submit"
          disabled={isSubmitting}
          className="w-full gap-2 bg-gradient-to-r from-blue-600 to-cyan-600 py-2.5 text-sm hover:from-blue-700 hover:to-cyan-700"
        >
          {isSubmitting ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" />
              Signing in...
            </>
          ) : (
            <>
              <LogIn className="h-4 w-4" />
              Login
            </>
          )}
        </Button>

        {/* Dummy credentials hint */}
        <div className="rounded-lg border border-dashed border-slate-300 bg-slate-50 p-2.5 text-xs text-slate-500 dark:border-slate-700 dark:bg-slate-800/50 dark:text-slate-400">
          <p className="font-semibold mb-0.5">Demo credentials</p>
          <p>
            Admin: <code>admin@crm.com</code> / <code>Admin@123</code>
          </p>
          <p>
            User: <code>user@crm.com</code> / <code>User@123</code>
          </p>
        </div>
      </form>
    </AuthPageShell>
  );
}
