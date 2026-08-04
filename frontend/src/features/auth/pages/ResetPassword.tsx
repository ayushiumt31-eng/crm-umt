import { useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowLeft, Eye, EyeOff, KeyRound, Loader2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  resetPasswordSchema,
  type ResetPasswordFormValues,
} from "../schemas/auth.schemas";
import { resetPassword as resetPasswordService } from "../services/authService";
import AuthPageShell from "../components/AuthPageShell";
import PasswordStrength from "../components/PasswordStrength";

export default function ResetPassword() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token") || "dummy-token";
  const email = searchParams.get("email") || "";

  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<ResetPasswordFormValues>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: { newPassword: "", confirmPassword: "" },
  });

  const newPassword = watch("newPassword");

  const onSubmit = async (values: ResetPasswordFormValues) => {
    setServerError(null);
    try {
      await resetPasswordService({ ...values, token, email });
      navigate("/login", {
        replace: true,
        state: { resetSuccess: "Password reset successfully. Please log in." },
      });
    } catch (err) {
      setServerError(
        err instanceof Error ? err.message : "Failed to reset password."
      );
    }
  };

  return (
    <AuthPageShell
      title="Reset Password"
      subtitle="Choose a new password for your account"
      error={serverError}
      footer={
        <Link
          to="/login"
          className="inline-flex items-center gap-1.5 font-medium text-blue-600 hover:underline dark:text-blue-400"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Login
        </Link>
      }
    >
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        {/* New password */}
        <div className="space-y-2">
          <label
            htmlFor="newPassword"
            className="text-sm font-semibold text-slate-700 dark:text-slate-300"
          >
            New Password
          </label>
          <div className="relative">
            <Input
              id="newPassword"
              type={showNew ? "text" : "password"}
              placeholder="Enter new password"
              className="pr-10"
              {...register("newPassword")}
              aria-invalid={!!errors.newPassword}
            />
            <button
              type="button"
              onClick={() => setShowNew((v) => !v)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300"
              aria-label={showNew ? "Hide password" : "Show password"}
            >
              {showNew ? (
                <EyeOff className="h-4 w-4" />
              ) : (
                <Eye className="h-4 w-4" />
              )}
            </button>
          </div>
          {errors.newPassword && (
            <p className="text-sm text-red-600 dark:text-red-400">
              {errors.newPassword.message}
            </p>
          )}
          <PasswordStrength password={newPassword} />
        </div>

        {/* Confirm password */}
        <div className="space-y-2">
          <label
            htmlFor="confirmPassword"
            className="text-sm font-semibold text-slate-700 dark:text-slate-300"
          >
            Confirm Password
          </label>
          <div className="relative">
            <Input
              id="confirmPassword"
              type={showConfirm ? "text" : "password"}
              placeholder="Re-enter new password"
              className="pr-10"
              {...register("confirmPassword")}
              aria-invalid={!!errors.confirmPassword}
            />
            <button
              type="button"
              onClick={() => setShowConfirm((v) => !v)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300"
              aria-label={showConfirm ? "Hide password" : "Show password"}
            >
              {showConfirm ? (
                <EyeOff className="h-4 w-4" />
              ) : (
                <Eye className="h-4 w-4" />
              )}
            </button>
          </div>
          {errors.confirmPassword && (
            <p className="text-sm text-red-600 dark:text-red-400">
              {errors.confirmPassword.message}
            </p>
          )}
        </div>

        <Button
          type="submit"
          disabled={isSubmitting}
          className="w-full gap-2 bg-gradient-to-r from-blue-600 to-cyan-600 py-6 text-base hover:from-blue-700 hover:to-cyan-700"
        >
          {isSubmitting ? (
            <>
              <Loader2 className="h-5 w-5 animate-spin" />
              Resetting...
            </>
          ) : (
            <>
              <KeyRound className="h-5 w-5" />
              Reset Password
            </>
          )}
        </Button>
      </form>
    </AuthPageShell>
  );
}
