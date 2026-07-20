import React from "react";
import { Eye, Edit, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";

export interface TableColumn<T> {
  key: keyof T;
  label: string;
  render?: (value: any, row: T) => React.ReactNode;
  width?: string;
}

export interface DataTableProps<T extends { id: string }> {
  data: T[];
  columns: TableColumn<T>[];
  loading?: boolean;
  onView?: (id: string) => void;
  onEdit?: (id: string) => void;
  onDelete?: (id: string) => void;
  showActions?: boolean;
}

/**
 * Generic Data Table Component
 * Usage: <DataTable columns={columns} data={data} onView={handleView} onEdit={handleEdit} onDelete={handleDelete} />
 */
export function DataTable<T extends { id: string }>({
  data,
  columns,
  loading = false,
  onView,
  onEdit,
  onDelete,
  showActions = true,
}: DataTableProps<T>) {
  if (loading) {
    return <div className="text-center py-8">Loading...</div>;
  }

  if (data.length === 0) {
    return (
      <div className="text-center py-8 text-gray-500">
        No data available
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead className="bg-slate-50 dark:bg-slate-800/50 border-b border-slate-200 dark:border-slate-700">
          <tr>
            {columns.map((col) => (
              <th
                key={String(col.key)}
                className="px-6 py-4 text-left text-sm font-semibold text-slate-900 dark:text-white"
                style={{ width: col.width }}
              >
                {col.label}
              </th>
            ))}
            {showActions && (
              <th className="px-6 py-4 text-right text-sm font-semibold text-slate-900 dark:text-white">
                Actions
              </th>
            )}
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-200 dark:divide-slate-700">
          {data.map((row) => (
            <tr
              key={row.id}
              className="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors duration-150"
            >
              {columns.map((col) => (
                <td
                  key={String(col.key)}
                  className="px-6 py-4 text-sm text-slate-600 dark:text-slate-300"
                >
                  {col.render
                    ? col.render(row[col.key], row)
                    : String(row[col.key])}
                </td>
              ))}
              {showActions && (
                <td className="px-6 py-4 text-right">
                  <div className="flex justify-end gap-2">
                    {onView && (
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => onView(row.id)}
                        title="View"
                        className="hover:bg-blue-100 dark:hover:bg-blue-900/30 text-blue-600 dark:text-blue-400"
                      >
                        <Eye className="h-4 w-4" />
                      </Button>
                    )}
                    {onEdit && (
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => onEdit(row.id)}
                        title="Edit"
                        className="hover:bg-cyan-100 dark:hover:bg-cyan-900/30 text-cyan-600 dark:text-cyan-400"
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                    )}
                    {onDelete && (
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => onDelete(row.id)}
                        title="Delete"
                        className="hover:bg-red-100 dark:hover:bg-red-900/30 text-red-600 dark:text-red-400"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    )}
                  </div>
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
