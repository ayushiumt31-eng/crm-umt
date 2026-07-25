import { Receipt, DollarSign, CheckCircle2, Clock, XCircle, TrendingDown } from "lucide-react";
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
  PieChart,
  Pie,
  Cell,
} from "recharts";
import { ReportSummaryCard } from "./ReportSummaryCard";
import { ReportTable } from "./ReportTable";
import type { SalesReportData } from "../types/report";
import { dummySales } from "@/features/sales/data/dummy-sales";
import type { Sale } from "@/features/sales/types/sale";

const STATUS_COLORS: Record<string, string> = {
  DRAFT: "#64748b",
  CONFIRMED: "#3b82f6",
  COMPLETED: "#10b981",
  CANCELLED: "#ef4444",
};

const STATUS_ORDER: Record<string, number> = {
  DRAFT: 1,
  CONFIRMED: 2,
  COMPLETED: 3,
  CANCELLED: 4,
};

interface SalesReportProps {
  data: SalesReportData;
}

const formatCurrency = (value: number) =>
  new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(value);

export function SalesReport({ data }: SalesReportProps) {
  const saleColumns = [
    {
      key: "saleNumber",
      label: "Sale ID",
      render: (s: Sale) => (
        <span className="font-medium text-slate-900 dark:text-white">
          {s.saleNumber}
        </span>
      ),
    },
    {
      key: "customerName",
      label: "Customer",
      render: (s: Sale) => (
        <span className="text-slate-600 dark:text-slate-400">
          {s.customerName}
        </span>
      ),
    },
    {
      key: "dealName",
      label: "Deal",
      render: (s: Sale) => (
        <span className="text-slate-600 dark:text-slate-400">
          {s.dealName || "—"}
        </span>
      ),
    },
    {
      key: "finalAmount",
      label: "Amount",
      render: (s: Sale) => (
        <span className="font-medium text-slate-900 dark:text-white">
          {formatCurrency(s.finalAmount)}
        </span>
      ),
    },
    {
      key: "status",
      label: "Status",
      render: (s: Sale) => (
        <span
          className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold"
          style={{
            backgroundColor: `${STATUS_COLORS[s.status] || "#64748b"}20`,
            color: STATUS_COLORS[s.status] || "#64748b",
          }}
        >
          {s.status}
        </span>
      ),
    },
    {
      key: "assignedToName",
      label: "Assigned To",
      render: (s: Sale) => (
        <span className="text-slate-600 dark:text-slate-400">
          {s.assignedToName}
        </span>
      ),
    },
    {
      key: "saleDate",
      label: "Sale Date",
      render: (s: Sale) => (
        <span className="text-slate-600 dark:text-slate-400">
          {new Date(s.saleDate).toLocaleDateString()}
        </span>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <ReportSummaryCard
          title="Total Sales"
          value={data.totalSales}
          icon={Receipt}
          gradient="from-blue-50 to-cyan-100 dark:from-blue-950/40 dark:to-cyan-900/20"
          iconBg="from-blue-500 to-cyan-600"
        />
        <ReportSummaryCard
          title="Total Revenue"
          value={data.totalRevenue}
          icon={DollarSign}
          formatter={formatCurrency}
          gradient="from-green-50 to-emerald-100 dark:from-green-950/40 dark:to-emerald-900/20"
          iconBg="from-green-500 to-emerald-600"
        />
        <ReportSummaryCard
          title="Avg Sale Value"
          value={data.averageSaleValue}
          icon={TrendingDown}
          formatter={formatCurrency}
          gradient="from-purple-50 to-violet-100 dark:from-purple-950/40 dark:to-violet-900/20"
          iconBg="from-purple-500 to-violet-600"
        />
        <ReportSummaryCard
          title="Completed"
          value={data.completedSales}
          icon={CheckCircle2}
          gradient="from-cyan-50 to-teal-100 dark:from-cyan-950/40 dark:to-teal-900/20"
          iconBg="from-cyan-500 to-teal-600"
        />
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Monthly Revenue Trend */}
        <div className="rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 p-6">
          <h3 className="text-sm font-semibold text-slate-700 dark:text-slate-300 mb-4">
            Monthly Revenue Trend
          </h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={data.monthlyRevenue}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                <XAxis dataKey="month" tick={{ fontSize: 12 }} />
                <YAxis
                  tick={{ fontSize: 12 }}
                  tickFormatter={(v) => `$${(v / 1000).toFixed(0)}k`}
                />
                <Tooltip
                  formatter={(value: number) => formatCurrency(value)}
                />
                <Line
                  type="monotone"
                  dataKey="revenue"
                  stroke="#3b82f6"
                  strokeWidth={2}
                  dot={{ fill: "#3b82f6", r: 4 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Sales by Status */}
        <div className="rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 p-6">
          <h3 className="text-sm font-semibold text-slate-700 dark:text-slate-300 mb-4">
            Sales Status Distribution
          </h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={data.salesByStatus}
                  dataKey="count"
                  nameKey="status"
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  label={({ status, count }) =>
                    `${status}: ${count}`
                  }
                >
                  {data.salesByStatus.map((entry) => (
                    <Cell
                      key={entry.status}
                      fill={
                        STATUS_COLORS[entry.status] || "#64748b"
                      }
                    />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 overflow-hidden">
        <div className="px-4 py-3 border-b border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/50">
          <h3 className="font-semibold text-slate-900 dark:text-white text-sm">
            All Sales
          </h3>
        </div>
        <ReportTable title="Sales" columns={saleColumns} data={dummySales} />
      </div>
    </div>
  );
}

