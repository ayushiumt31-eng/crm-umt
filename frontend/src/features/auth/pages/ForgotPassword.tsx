import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowLeft, Loader2, Send, Mail } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  forgotPasswordSchema,
  type ForgotPasswordFormValues,
} from "../schemas/auth.schemas";
import { forgotPassword as forgotPasswordService } from "../services/authService";
import AuthPageShell from "../components/AuthPageShell";

export default function ForgotPassword() {
  const navigate = useNavigate();
  const [serverError, setServerError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ForgotPasswordFormValues>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: { email: "" },
  });

  const onSubmit = async (values: ForgotPasswordFormValues) => {
    setServerError(null);
    setIsSubmitting(true);
    try {
      // Send OTP first
      await forgotPasswordService(values);
      // Then navigate to the shared OTP verification page
      navigate(
        `/verify-otp?context=forgot-password&email=${encodeURIComponent(
          values.email
        )}`,
        { replace: true }
      );
    } catch (err) {
      setServerError(
        err instanceof Error ? err.message : "Something went wrong. Try again."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <AuthPageShell
      title="Forgot Password?"
      subtitle="Enter your email and we'll send you a 6-digit OTP to reset your password"
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
        {/* Email icon */}
        <div className="flex justify-center">
          <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-500 to-cyan-500 text-white shadow-lg">
            <Mail className="h-8 w-8" />
          </div>
        </div>

        <div className="space-y-2">
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
            {...register("email")}
            aria-invalid={!!errors.email}
          />
          {errors.email && (
            <p className="text-sm text-red-600 dark:text-red-400">
              {errors.email.message}
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
              Sending...
            </>
          ) : (
            <>
              <Send className="h-5 w-5" />
              Send OTP
            </>
          )}
        </Button>

        <p className="text-center text-xs text-slate-500 dark:text-slate-400">
          Dummy OTP: <code className="font-bold">123456</code>
        </p>
      </form>
    </AuthPageShell>
  );
}

