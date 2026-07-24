import { Copy, Building2, Layers3, ShieldCheck, Users, FileText } from "lucide-react";
import { useState } from "react";
import type { Role } from "../types/role";

interface RoleDetailsCardProps {
  icon: React.ReactNode;
  label: string;
  value: string | number;
  colorClass: string;
  subValue?: string;
}

export function RoleDetailsCard({
  icon,
  label,
  value,
  colorClass,
  subValue,
}: RoleDetailsCardProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(String(value));
    setCopied(true);

    setTimeout(() => {
      setCopied(false);
    }, 2000);
  };

  return (
    <div
      className={`group relative overflow-hidden rounded-xl border border-opacity-50 bg-gradient-to-br ${colorClass} p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg`}
    >
      {/* Background Glow */}
      <div className="absolute inset-0 bg-white opacity-0 transition-opacity duration-300 group-hover:opacity-10" />

      <div className="relative z-10">
        <div className="mb-3 flex items-center justify-between">
          <h3 className="text-sm font-semibold">{label}</h3>

          <button
            onClick={handleCopy}
            className="rounded-lg p-1 opacity-0 transition-colors hover:bg-white/20 group-hover:opacity-100"
            title="Copy to clipboard"
          >
            <Copy className="h-4 w-4" />
          </button>
        </div>

        <div className="flex items-end gap-2">
          <div className="flex-1">
            <div className="break-words text-2xl font-bold">
              {value}
            </div>

            {subValue && (
              <p className="mt-1 text-xs opacity-70">
                {subValue}
              </p>
            )}
          </div>

          <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg bg-white/20 backdrop-blur-md">
            {icon}
          </div>
        </div>
      </div>

      {copied && (
        <div className="absolute inset-0 z-20 flex items-center justify-center rounded-xl bg-white/20">
          <span className="text-sm font-semibold">
            Copied!
          </span>
        </div>
      )}
    </div>
  );
}

interface RoleDetailsSectionProps {
  role: Role;
}

export function RoleDetailsSection({
  role,
}: RoleDetailsSectionProps) {
  const totalPermissions =
    role.permissions?.reduce(
      (total, permission) => total + permission.actions.length,
      0
    ) || 0;

  return (
    <div className="space-y-8">

      {/* Quick Info Cards */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">

        <RoleDetailsCard
          icon={<ShieldCheck className="h-5 w-5 text-blue-600" />}
          label="Role Name"
          value={role.name}
          colorClass="from-blue-50 to-blue-100 dark:from-blue-950/40 dark:to-blue-900/20 text-blue-900 dark:text-blue-100 border-blue-200/50 dark:border-blue-800/50"
        />

        <RoleDetailsCard
          icon={<Building2 className="h-5 w-5 text-purple-600" />}
          label="Department"
          value={role.department || "—"}
          colorClass="from-purple-50 to-purple-100 dark:from-purple-950/40 dark:to-purple-900/20 text-purple-900 dark:text-purple-100 border-purple-200/50 dark:border-purple-800/50"
        />

        <RoleDetailsCard
          icon={<Layers3 className="h-5 w-5 text-green-600" />}
          label="Role Level"
          value={role.level || "—"}
          colorClass="from-green-50 to-emerald-100 dark:from-green-950/40 dark:to-emerald-900/20 text-green-900 dark:text-green-100 border-green-200/50 dark:border-green-800/50"
        />

        <RoleDetailsCard
          icon={<Users className="h-5 w-5 text-orange-600" />}
          label="Permissions"
          value={totalPermissions}
          subValue="Total permissions"
          colorClass="from-orange-50 to-amber-100 dark:from-orange-950/40 dark:to-amber-900/20 text-orange-900 dark:text-orange-100 border-orange-200/50 dark:border-orange-800/50"
        />

      </div>

      {/* Detailed Information */}
      <div className="rounded-2xl border border-slate-200/50 bg-white p-8 shadow-sm dark:border-slate-800/50 dark:bg-slate-900">

        <h3 className="mb-6 text-lg font-bold text-slate-900 dark:text-white">
          Role Information
        </h3>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-2">

          {/* Role Name */}
          <div>
            <div className="mb-2 flex items-center gap-2">
              <ShieldCheck className="h-4 w-4 text-blue-600 dark:text-blue-400" />

              <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">
                Role Name
              </label>
            </div>

            <p className="font-medium text-slate-900 dark:text-white">
              {role.name}
            </p>
          </div>

          {/* Department */}
          <div>
            <div className="mb-2 flex items-center gap-2">
              <Building2 className="h-4 w-4 text-purple-600 dark:text-purple-400" />

              <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">
                Department
              </label>
            </div>

            <p className="font-medium text-slate-900 dark:text-white">
              {role.department || "—"}
            </p>
          </div>

          {/* Role Level */}
          <div>
            <div className="mb-2 flex items-center gap-2">
              <Layers3 className="h-4 w-4 text-green-600 dark:text-green-400" />

              <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">
                Role Level / Hierarchy
              </label>
            </div>

            <p className="font-medium text-slate-900 dark:text-white">
              {role.level || "—"}
            </p>
          </div>

          {/* Status */}
          <div>
            <div className="mb-2 flex items-center gap-2">
              <ShieldCheck className="h-4 w-4 text-cyan-600 dark:text-cyan-400" />

              <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">
                Status
              </label>
            </div>

            <p className="font-medium text-slate-900 dark:text-white">
              {role.status}
            </p>
          </div>

          {/* Description */}
          <div className="md:col-span-2">
            <div className="mb-2 flex items-center gap-2">
              <FileText className="h-4 w-4 text-orange-600 dark:text-orange-400" />

              <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">
                Description
              </label>
            </div>

            <p className="leading-6 text-slate-700 dark:text-slate-300">
              {role.description || "No description available."}
            </p>
          </div>

        </div>
      </div>

      {/* Permissions Section */}
      <div className="rounded-2xl border border-slate-200/50 bg-white p-8 shadow-sm dark:border-slate-800/50 dark:bg-slate-900">

        <div className="mb-6">
          <h3 className="text-lg font-bold text-slate-900 dark:text-white">
            Permissions
          </h3>

          <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
            Modules and actions assigned to this role
          </p>
        </div>

        <div className="space-y-4">
          {role.permissions?.map((permission) => (
            <div
              key={permission.module}
              className="rounded-xl border border-slate-200 p-4 dark:border-slate-800"
            >
              <div className="mb-3 flex items-center gap-2">
                <ShieldCheck className="h-4 w-4 text-blue-600" />

                <h4 className="font-semibold text-slate-900 dark:text-white">
                  {permission.module.replaceAll("_", " ")}
                </h4>
              </div>

              <div className="flex flex-wrap gap-2">
                {permission.actions.map((action) => (
                  <span
                    key={action}
                    className="rounded-full bg-blue-100 px-3 py-1 text-xs font-semibold text-blue-700 dark:bg-blue-900/30 dark:text-blue-300"
                  >
                    {action}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>

      </div>

    </div>
  );
}