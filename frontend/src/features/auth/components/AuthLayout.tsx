import { Outlet } from "react-router-dom";
import { LayoutDashboard, ShieldCheck, Users, Zap } from "lucide-react";

/**
 * AuthLayout
 *
 * Modern split-screen layout for all public auth pages.
 * Left panel: brand + feature highlights (hidden on mobile).
 * Right panel: the actual form content (rendered via <Outlet />).
 */
export default function AuthLayout() {
  return (
    <div className="flex h-screen bg-slate-50 dark:bg-slate-950 overflow-hidden">
      {/* Brand panel */}
      <div className="relative hidden w-1/2 overflow-hidden bg-gradient-to-br from-blue-700 via-blue-600 to-cyan-500 lg:flex lg:flex-col lg:justify-between lg:p-8">
        {/* Decorative circles */}
        <div className="pointer-events-none absolute -top-24 -left-24 h-80 w-80 rounded-full bg-white/10 blur-2xl" />
        <div className="pointer-events-none absolute -bottom-24 -right-16 h-[20rem] w-[20rem] rounded-full bg-cyan-300/20 blur-3xl" />

        {/* Logo */}
        <div className="relative z-10 flex items-center gap-2.5">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-white/20 backdrop-blur">
            <LayoutDashboard className="h-5 w-5 text-white" />
          </div>
          <span className="text-xl font-bold text-white">CRM</span>
        </div>

        {/* Headline */}
        <div className="relative z-10">
          <h2 className="max-w-sm text-3xl font-bold leading-tight text-white">
            Manage your entire CRM from one place.
          </h2>
          <p className="mt-3 max-w-sm text-sm text-blue-100">
            Customers, leads, deals, payroll, marketing, and more — all unified
            in a modern, responsive workspace.
          </p>
        </div>

        {/* Feature highlights */}
        <div className="relative z-10 grid grid-cols-2 gap-3">
          <div className="flex items-center gap-2 rounded-xl bg-white/10 p-3 backdrop-blur">
            <Users className="h-5 w-5 shrink-0 text-white" />
            <div>
              <p className="text-sm font-semibold text-white">Customers & Leads</p>
              <p className="text-xs text-blue-100">Track your pipeline</p>
            </div>
          </div>
          <div className="flex items-center gap-2 rounded-xl bg-white/10 p-3 backdrop-blur">
            <ShieldCheck className="h-5 w-5 shrink-0 text-white" />
            <div>
              <p className="text-sm font-semibold text-white">Role-based access</p>
              <p className="text-xs text-blue-100">Secure permissions</p>
            </div>
          </div>
          <div className="flex items-center gap-2 rounded-xl bg-white/10 p-3 backdrop-blur">
            <Zap className="h-5 w-5 shrink-0 text-white" />
            <div>
              <p className="text-sm font-semibold text-white">Dynamic Forms</p>
              <p className="text-xs text-blue-100">Build without code</p>
            </div>
          </div>
          <div className="flex items-center gap-2 rounded-xl bg-white/10 p-3 backdrop-blur">
            <LayoutDashboard className="h-5 w-5 shrink-0 text-white" />
            <div>
              <p className="text-sm font-semibold text-white">Reports</p>
              <p className="text-xs text-blue-100">Real-time insights</p>
            </div>
          </div>
        </div>
      </div>

      {/* Form panel */}
      <div className="flex w-full flex-col items-center justify-center px-4 lg:w-1/2">
        {/* Mobile logo */}
        <div className="mb-4 flex items-center gap-2.5 lg:hidden">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-blue-600 to-cyan-500">
            <LayoutDashboard className="h-5 w-5 text-white" />
          </div>
          <span className="text-xl font-bold text-slate-900 dark:text-white">
            CRM
          </span>
        </div>

        <Outlet />
      </div>
    </div>
  );
}
