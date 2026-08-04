# Enterprise Authentication Module — Implementation TODO

## New Files
- [x] `features/auth/utils/authUtils.ts` — shared helpers (initials, labels, status messages, date format)
- [x] `features/auth/hooks/useCountdown.ts` — reusable 60s countdown hook
- [x] `features/auth/components/OtpInput.tsx` — 6-digit OTP input (auto-focus, auto-next, backspace, paste)
- [x] `features/auth/components/ResendCountdown.tsx` — resend button with countdown
- [x] `features/auth/pages/VerifyOtp.tsx` — single common verify-OTP page (context: login/register/forgot-password)

## Modified Files
- [x] `types/auth.ts` — role/department/designation optional; add OtpContext, status/createdAt/lastLogin, AuthStorage
- [x] `schemas/auth.schemas.ts` — remove Role from registration; dept/designation optional; add verifyOtpSchema
- [x] `services/authService.ts` — register forces USER + PENDING; pending-login storage; completeLogin(); status check; lastLogin
- [x] `hooks/useAuth.ts` — expose login (no session), verifyOtp, completeLogin, logout
- [x] `pages/Login.tsx` — navigate to /verify-otp?context=login after credential validation
- [x] `pages/Register.tsx` — remove Role dropdown; dept/designation optional; navigate to /verify-otp?context=register
- [x] `pages/ForgotPassword.tsx` — OTP flow (send OTP → verify-otp)
- [x] `pages/ResetPassword.tsx` — read email from query; call resetPassword with email
- [x] `pages/Profile.tsx` — add status/createdAt/lastLogin; inline Edit Profile
- [x] `pages/index.ts` — export VerifyOtp
- [x] `components/index.ts` — export OtpInput, ResendCountdown
- [x] `constants/routes.ts` — add AUTH.VERIFY_OTP
- [x] `routes/AppRoutes.tsx` — add /verify-otp route

## UI / UX Improvements (current phase)
- [x] `components/AuthLayout.tsx` — h-screen (100vh), overflow-hidden, compact brand panel, centered form panel
- [x] `components/AuthPageShell.tsx` — reduced padding (p-8→p-5), reduced title margin (mb-8→mb-4), reduced footer margin (mt-6→mt-4), compact banners
- [x] `pages/Login.tsx` — compact spacing (space-y-5→space-y-3), size="sm" inputs, compact button (py-2.5), compact demo box
- [x] `pages/Register.tsx` — two-column grid layout (sm:grid-cols-2), reduced spacing, size="sm" inputs, password/confirm/terms/submit span full width

## Final Check
- [x] Run `tsc -b --force` — 17 errors, ALL pre-existing in payroll module (out of scope). Zero errors in auth module.
- [x] Confirm no existing CRM modules broken (auth changes isolated; payroll errors pre-existing and untouched)
- [x] Reuse existing components (AuthLayout, AuthPageShell, PasswordStrength, Button, Input, Avatar, Badge, UserDropdown, useAuth)
