import { Users, CheckCircle2, XCircle, UserPlus } from "lucide-react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  CartesianGrid,
} from "recharts";
import { ReportSummaryCard } from "./ReportSummaryCard";
import { ReportTable } from "./ReportTable";
import type { CustomerReportData } from "../types/report";
import type { Customer } from "@/features/customers/types/customer";
import { dummyCustomers } from "@/features/customers/data/dummy-customers";

interface CustomerReportProps {
  data: CustomerReportData;
}

export function CustomerReport({ data }: CustomerReportProps) {
  const customerColumns = [
    {
      key: "name",
      label: "Customer Name",
      render: (c: Customer) => (
        <span className="font-medium text-slate-900 dark:text-white">
          {c.name}
        </span>
      ),
    },
    {
      key: "email",
      label: "Email",
      render: (c: Customer) => (
        <span className="text-slate-600 dark:text-slate-400">{c.email}</span>
      ),
    },
    {
      key: "phone",
      label: "Phone",
      render: (c: Customer) => (
        <span className="text-slate-600 dark:text-slate-400">{c.phone}</span>
      ),
    },
    {
      key: "company",
      label: "Company",
      render: (c: Customer) => (
        <span className="text-slate-600 dark:text-slate-400">{c.company}</span>
      ),
    },
    {
      key: "status",
      label: "Status",
      render: (c: Customer) => (
        <span
          className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold ${
            c.status === "Active"
              ? "bg-green-100 text-green-700 dark:bg-green-900/50 dark:text-green-300"
              : "bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300"
          }`}
        >
          {c.status}
        </span>
      ),
    },
    {
      key: "createdAt",
      label: "Created",
      render: (c: Customer) => (
        <span className="text-slate-600 dark:text-slate-400">
          {new Date(c.createdAt).toLocaleDateString()}
        </span>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <ReportSummaryCard
          title="Total Customers"
          value={data.totalCustomers}
          icon={Users}
          gradient="from-blue-50 to-cyan-100 dark:from-blue-950/40 dark:to-cyan-900/20"
          iconBg="from-blue-500 to-cyan-600"
        />
        <ReportSummaryCard
          title="Active Customers"
          value={data.activeCustomers}
          icon={CheckCircle2}
          gradient="from-green-50 to-emerald-100 dark:from-green-950/40 dark:to-emerald-900/20"
          iconBg="from-green-500 to-emerald-600"
        />
        <ReportSummaryCard
          title="Inactive Customers"
          value={data.inactiveCustomers}
          icon={XCircle}
          gradient="from-red-50 to-rose-100 dark:from-red-950/40 dark:to-rose-900/20"
          iconBg="from-red-500 to-rose-600"
        />
        <ReportSummaryCard
          title="New This Month"
          value={data.newCustomers}
          icon={UserPlus}
          gradient="from-purple-50 to-violet-100 dark:from-purple-950/40 dark:to-violet-900/20"
          iconBg="from-purple-500 to-violet-600"
        />
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Customer Growth Chart */}
        <div className="rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 p-6">
          <h3 className="text-sm font-semibold text-slate-700 dark:text-slate-300 mb-4">
            Customer Growth
          </h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={data.customersByMonth}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                <XAxis dataKey="month" tick={{ fontSize: 12 }} />
                <YAxis tick={{ fontSize: 12 }} />
                <Tooltip />
                <Line
                  type="monotone"
                  dataKey="count"
                  stroke="#3b82f6"
                  strokeWidth={2}
                  dot={{ fill: "#3b82f6", r: 4 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Customer Status Distribution */}
        <div className="rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 p-6">
          <h3 className="text-sm font-semibold text-slate-700 dark:text-slate-300 mb-4">
            Customers by Status
          </h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={data.customersByStatus}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                <XAxis dataKey="status" tick={{ fontSize: 12 }} />
                <YAxis tick={{ fontSize: 12 }} />
                <Tooltip />
                <Bar
                  dataKey="count"
                  fill="#3b82f6"
                  radius={[4, 4, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 overflow-hidden">
        <div className="px-4 py-3 border-b border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/50">
          <h3 className="font-semibold text-slate-900 dark:text-white text-sm">
            All Customers
          </h3>
        </div>
        <ReportTable
          title="Customers"
          columns={customerColumns}
          data={dummyCustomers}
        />
      </div>
    </div>
  );
}

