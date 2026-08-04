import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Eye, EyeOff, KeyRound, Loader2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  changePasswordSchema,
  type ChangePasswordFormValues,
} from "../schemas/auth.schemas";
import { changePassword as changePasswordService } from "../services/authService";
import PasswordStrength from "../components/PasswordStrength";

export default function ChangePassword() {
  const navigate = useNavigate();
  const [show, setShow] = useState<Record<string, boolean>>({});
  const [success, setSuccess] = useState<string | null>(null);
  const [serverError, setServerError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ChangePasswordFormValues>({
    resolver: zodResolver(changePasswordSchema),
    defaultValues: {
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
  });

  const newPassword = watch("newPassword");

  const toggle = (key: string) =>
    setShow((prev) => ({ ...prev, [key]: !prev[key] }));

  const onSubmit = async (values: ChangePasswordFormValues) => {
    setServerError(null);
    setSuccess(null);
    try {
      await changePasswordService(values);
      setSuccess("Your password has been changed successfully.");
      reset();
      setShow({});
    } catch (err) {
      setServerError(
        err instanceof Error ? err.message : "Failed to change password."
      );
    }
  };

  const renderPasswordField = (
    id: keyof ChangePasswordFormValues,
    label: string,
    placeholder: string,
    autoComplete: string
  ) => {
    const isVisible = !!show[id];
    return (
      <div className="space-y-2">
        <label
          htmlFor={id}
          className="text-sm font-semibold text-slate-700 dark:text-slate-300"
        >
          {label}
        </label>
        <div className="relative">
          <Input
            id={id}
            type={isVisible ? "text" : "password"}
            placeholder={placeholder}
            autoComplete={autoComplete}
            className="pr-10"
            {...register(id)}
            aria-invalid={!!errors[id]}
          />
          <button
            type="button"
            onClick={() => toggle(id)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300"
            aria-label={isVisible ? `Hide ${label}` : `Show ${label}`}
          >
            {isVisible ? (
              <EyeOff className="h-4 w-4" />
            ) : (
              <Eye className="h-4 w-4" />
            )}
          </button>
        </div>
        {errors[id] && (
          <p className="text-sm text-red-600 dark:text-red-400">
            {errors[id].message}
          </p>
        )}
      </div>
    );
  };

  return (
    <div className="mx-auto max-w-2xl space-y-8">
      <div>
        <button
          type="button"
          onClick={() => navigate("/profile")}
          className="mb-4 inline-flex items-center gap-1.5 text-sm font-medium text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Profile
        </button>
        <h1 className="text-3xl font-bold text-slate-900 dark:text-white">
          Change Password
        </h1>
        <p className="mt-1 text-slate-600 dark:text-slate-400">
          Update your account password. Choose a strong password you don't use
          elsewhere.
        </p>
      </div>

      <div className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm dark:border-slate-800 dark:bg-slate-900">
        {success && (
          <div className="mb-6 rounded-xl border border-green-200 bg-green-50 p-4 text-sm text-green-700 dark:border-green-800 dark:bg-green-950/40 dark:text-green-300">
            {success}
          </div>
        )}
        {serverError && (
          <div className="mb-6 rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-700 dark:border-red-800 dark:bg-red-950/40 dark:text-red-300">
            {serverError}
          </div>
        )}

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          {renderPasswordField(
            "currentPassword",
            "Current Password",
            "Enter your current password",
            "current-password"
          )}

          <div className="space-y-2">
            {renderPasswordField(
              "newPassword",
              "New Password",
              "Enter new password",
              "new-password"
            )}
            <PasswordStrength password={newPassword} />
          </div>

          {renderPasswordField(
            "confirmPassword",
            "Confirm New Password",
            "Re-enter new password",
            "new-password"
          )}

          <div className="flex justify-end pt-2">
            <Button
              type="submit"
              disabled={isSubmitting}
              className="gap-2 bg-gradient-to-r from-blue-600 to-cyan-600 px-6 py-2.5 hover:from-blue-700 hover:to-cyan-700"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Updating...
                </>
              ) : (
                <>
                  <KeyRound className="h-4 w-4" />
                  Update Password
                </>
              )}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
