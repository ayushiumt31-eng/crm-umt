import { Form } from "@/components/common/Form";
import { rolesFields } from "./rolesFields";
import { useState } from "react";
import { PermissionMatrix } from "../components/PermissionMatrix";

interface RoleFormProps {
  mode: "create" | "edit";
  initialValues?: Record<string, any>;
  onSubmit: (data: Record<string, any>) => Promise<void>;
  isLoading?: boolean;
}

export default function RoleForm({
  mode,
  initialValues = {},
  onSubmit,
  isLoading = false,
}: RoleFormProps) {
  const isEdit = mode === "edit";

  const [permissions, setPermissions] = useState<string[]>(
    initialValues.permissions || []
  );

  const handleSubmit = async (
    data: Record<string, any>
  ) => {
    await onSubmit({
      ...data,
      permissions,
    });
  };

  return (
    <div className="space-y-8">
      {/* Role Basic Information */}
      <Form
        title={isEdit ? "Edit Role" : "Add Role"}
        description={
          isEdit
            ? "Update role details"
            : "Create a new role"
        }
        fields={rolesFields}
        initialValues={initialValues}
        onSubmit={handleSubmit}
        submitLabel={
          isEdit ? "Update Role" : "Add Role"
        }
        cancelPath="/roles-permissions"
        isLoading={isLoading}
      />

      {/* Permissions */}
      <div className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm dark:border-slate-800 dark:bg-slate-900">
        <PermissionMatrix
          permissions={permissions}
          onChange={setPermissions}
        />
      </div>
    </div>
  );
}