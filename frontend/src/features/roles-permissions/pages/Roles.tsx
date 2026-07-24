import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Plus,
  Search,
  ShieldCheck,
  Users,
  CheckCircle,
  XCircle,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import { DataTable } from "@/components/common/DataTable";
import { dummyRoles } from "../data/dummy-roles";
import { rolesTableColumns } from "../components/RoleTableColumns";

export default function RolesPermissions() {
  const navigate = useNavigate();

  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("ALL");

  const filteredRoles = useMemo(() => {
    return dummyRoles.filter((role) => {
      const searchQuery = search.toLowerCase();

      const matchesSearch =
        role.name.toLowerCase().includes(searchQuery) ||
        role.description.toLowerCase().includes(searchQuery);

      const matchesStatus =
        status === "ALL" || role.status === status;

      return matchesSearch && matchesStatus;
    });
  }, [search, status]);

  // Stats
  const totalRoles = dummyRoles.length;

  const activeRoles = dummyRoles.filter(
    (role) => role.status === "ACTIVE"
  ).length;

  const inactiveRoles = dummyRoles.filter(
    (role) => role.status === "INACTIVE"
  ).length;

  const totalUsers = dummyRoles.reduce(
    (total, role) => total + role.userCount,
    0
  );

  const handleView = (id: string) => {
    navigate(`/roles-permissions/${id}`);
  };

  const handleEdit = (id: string) => {
    navigate(`/roles-permissions/${id}/edit`);
  };

  const handleDelete = (id: string) => {
    console.log("Delete role:", id);
  };

  return (
    <div className="space-y-8">

      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-100 dark:bg-blue-900/30">
              <ShieldCheck className="h-6 w-6 text-blue-600 dark:text-blue-400" />
            </div>

            <div>
              <h1 className="text-3xl font-bold text-slate-900 dark:text-white">
                Roles & Permissions
              </h1>

              <p className="mt-1 text-slate-600 dark:text-slate-400">
                Manage roles and control user access across the CRM.
              </p>
            </div>
          </div>
        </div>

        <Button
          onClick={() => navigate("/roles-permissions/add")}
          className="gap-2"
        >
          <Plus className="h-4 w-4" />
          Add Role
        </Button>
      </div>

      {/* Stats */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">

        {/* Total Roles */}
        <div className="rounded-xl border bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-500 dark:text-slate-400">
                Total Roles
              </p>

              <h3 className="mt-2 text-2xl font-bold text-slate-900 dark:text-white">
                {totalRoles}
              </h3>
            </div>

            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-100 dark:bg-blue-900/30">
              <ShieldCheck className="h-5 w-5 text-blue-600" />
            </div>
          </div>
        </div>

        {/* Active Roles */}
        <div className="rounded-xl border bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-500 dark:text-slate-400">
                Active Roles
              </p>

              <h3 className="mt-2 text-2xl font-bold text-slate-900 dark:text-white">
                {activeRoles}
              </h3>
            </div>

            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-green-100 dark:bg-green-900/30">
              <CheckCircle className="h-5 w-5 text-green-600" />
            </div>
          </div>
        </div>

        {/* Inactive Roles */}
        <div className="rounded-xl border bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-500 dark:text-slate-400">
                Inactive Roles
              </p>

              <h3 className="mt-2 text-2xl font-bold text-slate-900 dark:text-white">
                {inactiveRoles}
              </h3>
            </div>

            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-red-100 dark:bg-red-900/30">
              <XCircle className="h-5 w-5 text-red-600" />
            </div>
          </div>
        </div>

        {/* Assigned Users */}
        <div className="rounded-xl border bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-500 dark:text-slate-400">
                Assigned Users
              </p>

              <h3 className="mt-2 text-2xl font-bold text-slate-900 dark:text-white">
                {totalUsers}
              </h3>
            </div>

            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-purple-100 dark:bg-purple-900/30">
              <Users className="h-5 w-5 text-purple-600" />
            </div>
          </div>
        </div>

      </div>

      {/* Toolbar */}
      <div className="flex flex-col gap-4 rounded-xl border bg-white p-4 shadow-sm dark:border-slate-800 dark:bg-slate-900 sm:flex-row">

        {/* Search */}
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />

          <Input
            placeholder="Search roles..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-9"
          />
        </div>

        {/* Status */}
        <select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          className="h-10 rounded-md border border-slate-200 bg-white px-3 text-sm dark:border-slate-700 dark:bg-slate-900"
        >
          <option value="ALL">All Status</option>
          <option value="ACTIVE">Active</option>
          <option value="INACTIVE">Inactive</option>
        </select>

      </div>

      {/* Roles Table */}
      <DataTable
        data={filteredRoles}
        columns={rolesTableColumns}
        onView={handleView}
        onEdit={handleEdit}
        onDelete={handleDelete}
        showActions={true}
      />

    </div>
  );
}