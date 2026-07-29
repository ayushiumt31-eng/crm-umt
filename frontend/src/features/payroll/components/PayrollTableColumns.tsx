import { Eye, Edit2, Trash2, CheckCircle, XCircle, Download, DollarSign } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PayrollStatusBadge } from "./PayrollStatusBadge";
import type { Payroll } from "../types/payroll";
import type { TableColumn } from "@/components/common/DataTable";

const formatCurrency = (value: number) =>
  new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR", maximumFractionDigits: 0 }).format(value);

const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

export const payrollTableColumns = (
  onView: (id: string) => void,
  onApprove?: (id: string) => void,
  onReject?: (id: string) => void,
  onMarkPaid?: (id: string) => void,
  onDownloadPayslip?: (id: string) => void,
): TableColumn<Payroll>[] => [
  {
    key: "employeeName",
    label: "Employee",
    render: (value: string, row: Payroll) => (
      <div>
        <p className="font-semibold text-slate-900 dark:text-white">{value}</p>
        <p className="text-xs text-slate-500">{row.employeeCode}</p>
      </div>
    ),
  },
  {
    key: "department",
    label: "Department",
    render: (value: string) => <span className="text-sm text-slate-600 dark:text-slate-400">{value}</span>,
  },
  {
    key: "payrollMonth",
    label: "Pay Period",
    render: (_: number, row: Payroll) => (
      <span className="text-sm text-slate-600 dark:text-slate-400">
        {monthNames[row.payrollMonth - 1]} {row.payrollYear}
      </span>
    ),
  },
  {
    key: "grossSalary",
    label: "Gross Salary",
    render: (value: number) => (
      <span className="text-sm font-medium text-slate-700 dark:text-slate-300">{formatCurrency(value)}</span>
    ),
  },
  {
    key: "totalDeductions",
    label: "Deductions",
    render: (value: number) => (
      <span className="text-sm text-red-600 dark:text-red-400">{formatCurrency(value)}</span>
    ),
  },
  {
    key: "netSalary",
    label: "Net Salary",
    render: (value: number) => (
      <span className="text-sm font-bold text-green-600 dark:text-green-400">{formatCurrency(value)}</span>
    ),
  },
  {
    key: "status",
    label: "Status",
    render: (value: Payroll["status"]) => <PayrollStatusBadge status={value} />,
  },
  {
    key: "id",
    label: "Actions",
    render: (id: string, row: Payroll) => (
      <div className="flex items-center gap-1">
        <Button variant="ghost" size="icon" onClick={() => onView(id)} title="View" className="h-8 w-8">
          <Eye className="h-4 w-4" />
        </Button>
        {row.status === "PENDING_APPROVAL" && onApprove && (
          <Button variant="ghost" size="icon" onClick={() => onApprove(id)} title="Approve" className="h-8 w-8 text-green-600">
            <CheckCircle className="h-4 w-4" />
          </Button>
        )}
        {row.status === "PENDING_APPROVAL" && onReject && (
          <Button variant="ghost" size="icon" onClick={() => onReject(id)} title="Reject" className="h-8 w-8 text-red-600">
            <XCircle className="h-4 w-4" />
          </Button>
        )}
        {row.status === "APPROVED" && onMarkPaid && (
          <Button variant="ghost" size="icon" onClick={() => onMarkPaid(id)} title="Mark as Paid" className="h-8 w-8 text-green-600">
            <DollarSign className="h-4 w-4" />
          </Button>
        )}
        {onDownloadPayslip && (
          <Button variant="ghost" size="icon" onClick={() => onDownloadPayslip(id)} title="Download Payslip" className="h-8 w-8 text-blue-600">
            <Download className="h-4 w-4" />
          </Button>
        )}
      </div>
    ),
  },
];
