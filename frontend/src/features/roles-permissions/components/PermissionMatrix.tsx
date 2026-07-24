import { permissionModules } from "../data/permissions";

interface PermissionMatrixProps {
  permissions: string[];
  onChange: (permissions: string[]) => void;
}

export function PermissionMatrix({
  permissions,
  onChange,
}: PermissionMatrixProps) {
  const handleChange = (
    permissionKey: string,
    checked: boolean
  ) => {
    if (checked) {
      onChange([...permissions, permissionKey]);
    } else {
      onChange(
        permissions.filter(
          (permission) => permission !== permissionKey
        )
      );
    }
  };

  return (
    <div className="space-y-4">
      <div>
        <h3 className="text-lg font-semibold text-slate-900 dark:text-white">
          Permissions
        </h3>

        <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
          Manage module access and permissions for this role.
        </p>
      </div>

      <div className="overflow-x-auto rounded-xl border border-slate-200 dark:border-slate-700">
        <table className="w-full text-sm">
          <thead className="bg-slate-50 dark:bg-slate-800">
            <tr>
              <th className="px-5 py-4 text-left font-semibold text-slate-700 dark:text-slate-300">
                Module
              </th>

              <th className="px-5 py-4 text-center font-semibold text-slate-700 dark:text-slate-300">
                View
              </th>

              <th className="px-5 py-4 text-center font-semibold text-slate-700 dark:text-slate-300">
                Create
              </th>

              <th className="px-5 py-4 text-center font-semibold text-slate-700 dark:text-slate-300">
                Edit
              </th>

              <th className="px-5 py-4 text-center font-semibold text-slate-700 dark:text-slate-300">
                Delete
              </th>
            </tr>
          </thead>

          <tbody className="divide-y divide-slate-200 dark:divide-slate-700">
            {permissionModules.map((module) => (
              <tr
                key={module.key}
                className="hover:bg-slate-50 dark:hover:bg-slate-800/50"
              >
                <td className="px-5 py-4 font-medium text-slate-900 dark:text-white">
                  {module.label}
                </td>

                {["view", "create", "edit", "delete"].map(
                  (action) => {
                    const permissionKey = `${module.key.slice(
                      0,
                      -1
                    )}.${action}`;

                    const permission = module.permissions.find(
                      (item) => item.key === permissionKey
                    );

                    return (
                      <td
                        key={action}
                        className="px-5 py-4 text-center"
                      >
                        {permission ? (
                          <input
                            type="checkbox"
                            checked={permissions.includes(
                              permission.key
                            )}
                            onChange={(e) =>
                              handleChange(
                                permission.key,
                                e.target.checked
                              )
                            }
                            className="h-4 w-4 cursor-pointer rounded border-slate-300 text-blue-600 focus:ring-blue-500"
                          />
                        ) : (
                          <span className="text-slate-300">
                            —
                          </span>
                        )}
                      </td>
                    );
                  }
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}