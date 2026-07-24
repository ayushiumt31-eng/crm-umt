import { ShieldCheck, Users } from "lucide-react";
import type { Role } from "../types/role";
import type { TableColumn } from "@/components/common/DataTable";

export const rolesTableColumns: TableColumn<Role>[] = [
  {
    key: "name",
    label: "Role",
    render: (value: string, row: Role) => (
      <div className="flex items-center gap-3">
        <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-blue-50 dark:bg-blue-900/30">
          <ShieldCheck className="h-4 w-4 text-blue-600 dark:text-blue-400" />
        </div>

        <div>
          <p className="font-semibold text-slate-900 dark:text-slate-100">
            {value}
          </p>

          <p className="text-xs text-slate-500 dark:text-slate-400">
            Role ID: {row.id}
          </p>
        </div>
      </div>
    ),
  },

  {
    key: "description",
    label: "Description",
    render: (value: string) => (
      <p className="max-w-xs truncate text-sm text-slate-600 dark:text-slate-400">
        {value || "—"}
      </p>
    ),
  },

  {
    key: "permissions",
    label: "Permissions",
    render: (value: Role["permissions"]) => {
      const permissionCount =
        value?.reduce(
          (total, permission) => total + permission.actions.length,
          0
        ) || 0;

      return (
        <div className="flex items-center gap-2">
          <span className="inline-flex items-center rounded-full bg-purple-100 px-3 py-1 text-xs font-semibold text-purple-700 dark:bg-purple-900/30 dark:text-purple-300">
            {permissionCount} Permissions
          </span>
        </div>
      );
    },
  },

  {
    key: "userCount",
    label: "Users",
    render: (value: number) => (
      <div className="flex items-center gap-2">
        <div className="flex h-7 w-7 items-center justify-center rounded-md bg-slate-100 dark:bg-slate-800">
          <Users className="h-3.5 w-3.5 text-slate-600 dark:text-slate-400" />
        </div>

        <span className="text-sm font-medium text-slate-700 dark:text-slate-300">
          {value || 0}
        </span>
      </div>
    ),
  },

  {
    key: "status",
    label: "Status",
    render: (value: Role["status"]) => {
      const statusStyles = {
        ACTIVE:
          "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300",
        INACTIVE:
          "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-300",
      };

      return (
        <span
          className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold ${
            statusStyles[value] ||
            "bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300"
          }`}
        >
          <span
            className={`mr-2 h-1.5 w-1.5 rounded-full ${
              value === "ACTIVE" ? "bg-green-500" : "bg-red-500"
            }`}
          />

          {value}
        </span>
      );
    },
  },
];