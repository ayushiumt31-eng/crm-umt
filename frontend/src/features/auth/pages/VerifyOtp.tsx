import { useEffect, useMemo, useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { ArrowLeft, Loader2, ShieldCheck, Mail } from "lucide-react";

import { Button } from "@/components/ui/button";
import AuthPageShell from "../components/AuthPageShell";
import OtpInput from "../components/OtpInput";
import ResendCountdown from "../components/ResendCountdown";
import { useAuth } from "../hooks/useAuth";
import {
  OTP_CONTEXT_LABELS,
  OTP_CONTEXT_SUBTITLES,
} from "../utils/authUtils";
import type { OtpContext } from "../types/auth";

const VALID_CONTEXTS: OtpContext[] = ["login", "register", "forgot-password"];

/**
 * VerifyOtp
 *
 * A SINGLE shared OTP verification page used by:
 *  - /verify-otp?context=login&email=...        (Login flow)
 *  - /verify-otp?context=register&email=...     (Registration flow)
 *  - /verify-otp?context=forgot-password&email=... (Forgot Password flow)
 *
 * The context query param determines the flow and the next navigation target:
 *  - login            -> after verification, check account status + create session
 *  - register         -> after verification, show PENDING approval message
 *  - forgot-password  -> after verification, go to /reset-password
 */
function VerifyOtp() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { verifyOtp, sendOtp, completeLogin } = useAuth();

  const context = useMemo<OtpContext>(() => {
    const value = searchParams.get("context") as OtpContext | null;
    return value && VALID_CONTEXTS.includes(value) ? value : "login";
  }, [searchParams]);

  const email = useMemo(() => {
    const value = searchParams.get("email") || "";
    return decodeURIComponent(value);
  }, [searchParams]);

  const [otp, setOtp] = useState("");
  const [serverError, setServerError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (!email) {
      setServerError("Missing email. Please restart the flow.");
    }
  }, [email]);

  const handleVerify = async () => {
    setServerError(null);
    setSuccess(null);

    if (!email) {
      setServerError("Missing email. Please restart the flow.");
      return;
    }
    if (otp.length !== 6) {
      setServerError("Please enter all 6 digits of the OTP.");
      return;
    }

    setIsSubmitting(true);
    try {
      await verifyOtp(email, otp);
      setSuccess("OTP verified successfully.");

      if (context === "login") {
        await completeLogin(email);
        navigate("/dashboard", { replace: true });
      } else if (context === "register") {
        navigate(
          "/login?registered=true",
          {
            replace: true,
          }
        );
      } else {
        navigate(`/reset-password?email=${encodeURIComponent(email)}`, {
          replace: true,
        });
      }
    } catch (err) {
      setServerError(
        err instanceof Error ? err.message : "OTP verification failed."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleResend = async () => {
    setServerError(null);
    setSuccess(null);
    try {
      const result = await sendOtp(email, context);
      setSuccess(result.message);
    } catch (err) {
      setServerError(
        err instanceof Error ? err.message : "Failed to resend OTP."
      );
    }
  };

  return (
    <AuthPageShell
      title={OTP_CONTEXT_LABELS[context]}
      subtitle={OTP_CONTEXT_SUBTITLES[context]}
      success={success}
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
      <div className="space-y-6">
        {/* Email display + icon */}
        <div className="flex flex-col items-center gap-3 text-center">
          <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-500 to-cyan-500 text-white shadow-lg">
            <Mail className="h-8 w-8" />
          </div>
          <div>
            <p className="text-sm font-medium text-slate-700 dark:text-slate-300">
              We sent a code to
            </p>
            <p className="text-sm font-bold text-slate-900 dark:text-white">
              {email || "your email"}
            </p>
          </div>
        </div>

        {/* OTP input */}
        <div className="space-y-2">
          <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">
            6-Digit OTP
          </label>
          <OtpInput
            value={otp}
            onChange={(value) => {
              setOtp(value);
              setServerError(null);
            }}
            error={!!serverError}
            disabled={isSubmitting}
            autoFocus
          />
        </div>

        {/* Dummy OTP hint */}
        <p className="text-center text-xs text-slate-500 dark:text-slate-400">
          Dummy OTP: <code className="font-bold">123456</code>
        </p>

        {/* Verify button */}
        <Button
          type="button"
          disabled={isSubmitting || otp.length !== 6}
          onClick={handleVerify}
          className="w-full gap-2 bg-gradient-to-r from-blue-600 to-cyan-600 py-6 text-base hover:from-blue-700 hover:to-cyan-700"
        >
          {isSubmitting ? (
            <>
              <Loader2 className="h-5 w-5 animate-spin" />
              Verifying...
            </>
          ) : (
            <>
              <ShieldCheck className="h-5 w-5" />
              Verify & Continue
            </>
          )}
        </Button>

        {/* Resend */}
        <div className="flex justify-center">
          <ResendCountdown
            onResend={handleResend}
            className="flex items-center gap-2"
          />
        </div>
      </div>
    </AuthPageShell>
  );
}

export default VerifyOtp;
