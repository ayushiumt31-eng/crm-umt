import { Mail, Phone, MoreVertical } from "lucide-react";
import type { Employee } from "../types/employee";
import { EmployeeStatusBadge } from "./EmployeeStatusBadge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";

interface EmployeeTableProps {
  employees: Employee[];
  onView: (id: string) => void;
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
}

export function EmployeeTable({ employees, onView, onEdit, onDelete }: EmployeeTableProps) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead className="bg-slate-50 dark:bg-slate-800/50 border-b border-slate-200 dark:border-slate-700">
          <tr>
            <th className="px-6 py-4 text-left text-sm font-semibold text-slate-900 dark:text-white">Employee</th>
            <th className="px-6 py-4 text-left text-sm font-semibold text-slate-900 dark:text-white">Contact</th>
            <th className="px-6 py-4 text-left text-sm font-semibold text-slate-900 dark:text-white">Department</th>
            <th className="px-6 py-4 text-left text-sm font-semibold text-slate-900 dark:text-white">Designation</th>
            <th className="px-6 py-4 text-left text-sm font-semibold text-slate-900 dark:text-white">Salary</th>
            <th className="px-6 py-4 text-left text-sm font-semibold text-slate-900 dark:text-white">Status</th>
            <th className="px-6 py-4 text-right text-sm font-semibold text-slate-900 dark:text-white">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-200 dark:divide-slate-700">
          {employees.map((employee) => (
            <tr
              key={employee.id}
              className="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors duration-150"
            >
              <td className="px-6 py-4">
                <div>
                  <div className="font-semibold text-slate-900 dark:text-white">
                    {employee.firstName} {employee.lastName}
                  </div>
                  <div className="text-xs text-slate-500 dark:text-slate-400">
                    {employee.employeeId}
                  </div>
                </div>
              </td>
              <td className="px-6 py-4">
                <div className="space-y-1">
                  <div className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-300">
                    <Mail className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                    <a
                      href={`mailto:${employee.email}`}
                      className="hover:text-blue-600 dark:hover:text-blue-400 underline"
                    >
                      {employee.email}
                    </a>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-300">
                    <Phone className="h-4 w-4 text-green-600 dark:text-green-400" />
                    <a
                      href={`tel:${employee.phone}`}
                      className="hover:text-green-600 dark:hover:text-green-400 underline"
                    >
                      {employee.phone}
                    </a>
                  </div>
                </div>
              </td>
              <td className="px-6 py-4">
                <span className="inline-flex items-center rounded-full bg-slate-100 dark:bg-slate-700 px-3 py-1 text-sm font-medium text-slate-700 dark:text-slate-200">
                  {employee.department}
                </span>
              </td>
              <td className="px-6 py-4">
                <span className="text-sm text-slate-600 dark:text-slate-300">{employee.designation}</span>
              </td>
              <td className="px-6 py-4">
                <span className="font-semibold text-slate-900 dark:text-white">
                  ${(employee.salary / 1000).toFixed(0)}k
                </span>
              </td>
              <td className="px-6 py-4">
                <EmployeeStatusBadge status={employee.status} />
              </td>
              <td className="px-6 py-4 text-right">
                <DropdownMenu>
                  <DropdownMenuTrigger className="inline-flex items-center justify-center p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors duration-150">
                    <MoreVertical className="h-5 w-5 text-slate-600 dark:text-slate-400" />
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-40">
                    <DropdownMenuItem onClick={() => onView(employee.id)} className="cursor-pointer">
                      View Details
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => onEdit(employee.id)} className="cursor-pointer">
                      Edit
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem
                      onClick={() => onDelete(employee.id)}
                      className="cursor-pointer text-red-600 dark:text-red-400 focus:bg-red-50 dark:focus:bg-red-950/50"
                    >
                      Delete
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
