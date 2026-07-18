import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Edit, Trash2, Eye } from "lucide-react";
import type { Customer } from "@/types/customer";

interface CustomerTableProps {
  customers?: Customer[];
  isLoading?: boolean;
  onView?: (id: string) => void;
  onEdit?: (id: string) => void;
  onDelete?: (id: string) => void;
}

export function CustomerTable({
  customers = [],
  isLoading = false,
  onView,
  onEdit,
  onDelete,
}: CustomerTableProps) {
  if (isLoading) {
    return (
      <Card className="border-border/50 shadow-md">
        <CardHeader>
          <CardTitle>Customers</CardTitle>
          <CardDescription>Loading customers...</CardDescription>
        </CardHeader>
        <CardContent className="text-center py-12">
          <p className="text-muted-foreground">Loading...</p>
        </CardContent>
      </Card>
    );
  }

  if (customers.length === 0) {
    return (
      <Card className="border-border/50 shadow-md">
        <CardHeader>
          <CardTitle>Customers</CardTitle>
          <CardDescription>No customers found</CardDescription>
        </CardHeader>
        <CardContent className="text-center py-12">
          <p className="text-muted-foreground">Start by adding a new customer</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="border-border/50 shadow-md overflow-hidden">
      <CardHeader className="bg-gradient-to-r from-blue-50 to-cyan-50 dark:from-slate-900 dark:to-slate-800 border-b border-border/50 pb-4">
        <CardTitle className="text-xl">Customers</CardTitle>
        <CardDescription>Total: {customers.length} customers</CardDescription>
      </CardHeader>
      <CardContent className="p-0">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border/50 bg-slate-50 dark:bg-slate-900/50">
                <th className="px-6 py-4 text-left text-sm font-semibold text-slate-700 dark:text-slate-300">Name</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-slate-700 dark:text-slate-300">Email</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-slate-700 dark:text-slate-300">Phone</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-slate-700 dark:text-slate-300">Company</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-slate-700 dark:text-slate-300">Status</th>
                <th className="px-6 py-4 text-right text-sm font-semibold text-slate-700 dark:text-slate-300">Actions</th>
              </tr>
            </thead>
            <tbody>
              {customers.map((customer, index) => (
                <tr
                  key={customer.id}
                  className={`border-b border-border/50 hover:bg-blue-50/50 dark:hover:bg-slate-800/50 transition-colors ${
                    index % 2 === 0 ? "bg-white/50 dark:bg-slate-900/20" : "bg-slate-50/30 dark:bg-slate-800/20"
                  }`}
                >
                  <td className="px-6 py-4">
                    <p className="font-semibold text-slate-900 dark:text-slate-100">{customer.name}</p>
                  </td>
                  <td className="px-6 py-4">
                    <p className="text-slate-600 dark:text-slate-400 text-sm">{customer.email}</p>
                  </td>
                  <td className="px-6 py-4">
                    <p className="text-slate-600 dark:text-slate-400 text-sm">{customer.phone}</p>
                  </td>
                  <td className="px-6 py-4">
                    <p className="text-slate-600 dark:text-slate-400 text-sm">{customer.company}</p>
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold ${
                        customer.status === "Active"
                          ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300"
                          : "bg-slate-100 text-slate-700 dark:bg-slate-900/30 dark:text-slate-400"
                      }`}
                    >
                      {customer.status === "Active" ? "🟢" : "⭕"} {customer.status}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex justify-end gap-2">
                      <Button
                        variant="ghost"
                        size="icon-sm"
                        onClick={() => onView?.(customer.id)}
                        title="View customer"
                        className="hover:bg-blue-100 dark:hover:bg-blue-900/30 text-blue-600 dark:text-blue-400"
                      >
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon-sm"
                        onClick={() => onEdit?.(customer.id)}
                        title="Edit customer"
                        className="hover:bg-cyan-100 dark:hover:bg-cyan-900/30 text-cyan-600 dark:text-cyan-400"
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon-sm"
                        onClick={() => onDelete?.(customer.id)}
                        title="Delete customer"
                        className="hover:bg-red-100 dark:hover:bg-red-900/30 text-red-600 dark:text-red-400"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  );
}
