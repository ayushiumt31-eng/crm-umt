import { useNavigate, useParams } from "react-router-dom";
import { useMemo, useState } from "react";
import {
  ArrowLeft,
  Edit2,
  Printer,
  Trash2,
  ShieldCheck,
} from "lucide-react";

import { dummyRoles } from "../data/dummy-roles";
import { RoleStatusBadge } from "../components/RoleStatusBadge";
import { DeleteRoleDialog } from "../components/DeleteRoleDialog";
import { RoleDetailsSection } from "../components/RoleDetailsCard";

export function ViewRoles() {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();

  const [deleteDialog, setDeleteDialog] = useState({
    open: false,
  });

  const [isDeleting, setIsDeleting] = useState(false);

  // Find Role
  const role = useMemo(() => {
    if (!id) return null;

    return dummyRoles.find((item) => item.id === id) || null;
  }, [id]);

  // Back to Roles
  const handleBack = () => {
    navigate("/roles-permissions");
  };

  // Print
  const handlePrint = () => {
    window.print();
  };

  // Open Delete Dialog
  const handleDelete = () => {
    setDeleteDialog({
      open: true,
    });
  };

  // Confirm Delete
  const handleConfirmDelete = async () => {
    if (!id) return;

    setIsDeleting(true);

    try {
      // TODO: Replace with API / useSubmit hook
      console.log("Delete role:", id);

      navigate("/roles-permissions");
    } catch (error) {
      console.error("Failed to delete role:", error);

      alert("Failed to delete role. Please try again.");
    } finally {
      setIsDeleting(false);

      setDeleteDialog({
        open: false,
      });
    }
  };

  // Role Not Found
  if (!role) {
    return (
      <div className="space-y-8">

        {/* Header */}
        <div className="flex items-center gap-4">

          <button
            onClick={handleBack}
            className="flex h-10 w-10 items-center justify-center rounded-lg transition-colors hover:bg-slate-100 dark:hover:bg-slate-800"
          >
            <ArrowLeft className="h-5 w-5 text-slate-600 dark:text-slate-400" />
          </button>

          <div>
            <h1 className="text-3xl font-bold text-slate-900 dark:text-white">
              Role Not Found
            </h1>

            <p className="mt-1 text-slate-600 dark:text-slate-400">
              The role you are looking for could not be found.
            </p>
          </div>

        </div>

        {/* Not Found Card */}
        <div className="rounded-2xl border border-dashed border-slate-300 bg-gradient-to-br from-slate-50 to-slate-100 p-12 text-center dark:border-slate-600 dark:from-slate-900/50 dark:to-slate-800/50">

          <ShieldCheck className="mx-auto mb-4 h-12 w-12 text-slate-400" />

          <h3 className="mb-2 text-lg font-bold text-slate-900 dark:text-white">
            This role does not exist
          </h3>

          <p className="mb-6 text-slate-600 dark:text-slate-400">
            The role you are looking for could not be found or may have been removed.
          </p>

          <button
            onClick={handleBack}
            className="inline-flex items-center gap-2 rounded-lg bg-gradient-to-r from-blue-600 to-cyan-600 px-6 py-2 font-semibold text-white shadow-lg transition-all duration-200 hover:from-blue-700 hover:to-cyan-700 hover:shadow-xl"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Roles & Permissions
          </button>

        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">

      {/* Page Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

        {/* Left Side */}
        <div className="flex items-center gap-4">

          <button
            onClick={handleBack}
            className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg transition-colors hover:bg-slate-100 dark:hover:bg-slate-800"
          >
            <ArrowLeft className="h-5 w-5 text-slate-600 dark:text-slate-400" />
          </button>

          <div>
            <div className="flex items-center gap-3">

              <h1 className="text-3xl font-bold text-slate-900 dark:text-white">
                {role.name}
              </h1>

              <RoleStatusBadge status={role.status} />

            </div>

            <p className="mt-1 text-slate-600 dark:text-slate-400">
              {role.department || "No department assigned"}
            </p>
          </div>

        </div>

        {/* Status */}
        <div className="sm:hidden">
          <RoleStatusBadge status={role.status} />
        </div>

      </div>

      {/* Role Details */}
      <RoleDetailsSection role={role} />

      {/* Action Buttons */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center">

        {/* Edit */}
        <button
          onClick={() =>
            navigate(`/roles-permissions/${id}/edit`)
          }
          className="inline-flex items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-blue-600 to-cyan-600 px-6 py-3 font-semibold text-white shadow-lg transition-all duration-200 hover:from-blue-700 hover:to-cyan-700 hover:shadow-xl"
        >
          <Edit2 className="h-5 w-5" />
          Edit Role
        </button>

        {/* Print */}
        <button
          onClick={handlePrint}
          className="inline-flex items-center justify-center gap-2 rounded-lg border border-slate-200 bg-white px-6 py-3 font-semibold text-slate-900 transition-all duration-200 hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-800 dark:text-white dark:hover:bg-slate-700/50"
        >
          <Printer className="h-5 w-5" />
          Print
        </button>

        {/* Delete */}
        <button
          onClick={handleDelete}
          className="inline-flex items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-red-600 to-rose-600 px-6 py-3 font-semibold text-white shadow-lg transition-all duration-200 hover:from-red-700 hover:to-rose-700 hover:shadow-xl"
        >
          <Trash2 className="h-5 w-5" />
          Delete
        </button>

      </div>

      {/* Delete Dialog */}
      <DeleteRoleDialog
        open={deleteDialog.open}
        roleName={role.name}
        onConfirm={handleConfirmDelete}
        onCancel={() =>
          setDeleteDialog({
            open: false,
          })
        }
        isLoading={isDeleting}
      />

    </div>
  );
}