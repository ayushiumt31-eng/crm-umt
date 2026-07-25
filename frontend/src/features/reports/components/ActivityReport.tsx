import { ClipboardList, CheckCircle2, Clock, AlertTriangle } from "lucide-react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  CartesianGrid,
} from "recharts";
import { ReportSummaryCard } from "./ReportSummaryCard";
import { ReportTable } from "./ReportTable";
import type { ActivityReportData } from "../types/report";
import { dummyActivities } from "@/features/activities/data/dummy-activities";
import type { Activity } from "@/features/activities/types/activity";

const STATUS_COLORS: Record<string, string> = {
  PENDING: "#f59e0b",
  IN_PROGRESS: "#3b82f6",
  COMPLETED: "#10b981",
  CANCELLED: "#ef4444",
};

const TYPE_COLORS: Record<string, string> = {
  CALL: "#22c55e",
  MEETING: "#8b5cf6",
  FOLLOW_UP: "#3b82f6",
  EMAIL: "#06b6d4",
  OTHER: "#64748b",
};

interface ActivityReportProps {
  data: ActivityReportData;
}

export function ActivityReport({ data }: ActivityReportProps) {
  const activityColumns = [
    {
      key: "title",
      label: "Activity",
      render: (a: Activity) => (
        <span className="font-medium text-slate-900 dark:text-white">
          {a.title}
        </span>
      ),
    },
    {
      key: "type",
      label: "Type",
      render: (a: Activity) => (
        <span
          className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold"
          style={{
            backgroundColor: `${TYPE_COLORS[a.type] || "#64748b"}20`,
            color: TYPE_COLORS[a.type] || "#64748b",
          }}
        >
          {a.type.replace(/_/g, " ")}
        </span>
      ),
    },
    {
      key: "customerName",
      label: "Related To",
      render: (a: Activity) => (
        <span className="text-slate-600 dark:text-slate-400">
          {a.customerName || a.leadName || a.dealName || "—"}
        </span>
      ),
    },
    {
      key: "assignedToName",
      label: "Assigned To",
      render: (a: Activity) => (
        <span className="text-slate-600 dark:text-slate-400">
          {a.assignedToName}
        </span>
      ),
    },
    {
      key: "dueDate",
      label: "Due Date",
      render: (a: Activity) => (
        <span className="text-slate-600 dark:text-slate-400">
          {new Date(a.dueDate).toLocaleDateString()}
        </span>
      ),
    },
    {
      key: "status",
      label: "Status",
      render: (a: Activity) => (
        <span
          className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold"
          style={{
            backgroundColor: `${STATUS_COLORS[a.status] || "#64748b"}20`,
            color: STATUS_COLORS[a.status] || "#64748b",
          }}
        >
          {a.status.replace(/_/g, " ")}
        </span>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <ReportSummaryCard
          title="Total Activities"
          value={data.totalActivities}
          icon={ClipboardList}
          gradient="from-violet-50 to-purple-100 dark:from-violet-950/40 dark:to-purple-900/20"
          iconBg="from-violet-500 to-purple-600"
        />
        <ReportSummaryCard
          title="Completed"
          value={data.completedActivities}
          icon={CheckCircle2}
          gradient="from-green-50 to-emerald-100 dark:from-green-950/40 dark:to-emerald-900/20"
          iconBg="from-green-500 to-emerald-600"
        />
        <ReportSummaryCard
          title="Pending"
          value={data.pendingActivities}
          icon={Clock}
          gradient="from-amber-50 to-yellow-100 dark:from-amber-950/40 dark:to-yellow-900/20"
          iconBg="from-amber-500 to-yellow-600"
        />
        <ReportSummaryCard
          title="Overdue"
          value={data.overdueActivities}
          icon={AlertTriangle}
          gradient="from-red-50 to-rose-100 dark:from-red-950/40 dark:to-rose-900/20"
          iconBg="from-red-500 to-rose-600"
        />
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Activities by Type */}
        <div className="rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 p-6">
          <h3 className="text-sm font-semibold text-slate-700 dark:text-slate-300 mb-4">
            Activities by Type
          </h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={data.activitiesByType}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                <XAxis dataKey="type" tick={{ fontSize: 12 }} />
                <YAxis tick={{ fontSize: 12 }} />
                <Tooltip />
                <Bar dataKey="count" radius={[4, 4, 0, 0]}>
                  {data.activitiesByType.map((entry) => (
                    <Cell
                      key={entry.type}
                      fill={TYPE_COLORS[entry.type] || "#64748b"}
                    />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Activities by Employee */}
        <div className="rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 p-6">
          <h3 className="text-sm font-semibold text-slate-700 dark:text-slate-300 mb-4">
            Activities by Employee
          </h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={data.activitiesByEmployee}
                layout="vertical"
              >
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                <XAxis type="number" tick={{ fontSize: 12 }} />
                <YAxis
                  type="category"
                  dataKey="employee"
                  tick={{ fontSize: 11 }}
                  width={100}
                />
                <Tooltip />
                <Bar
                  dataKey="count"
                  fill="#8b5cf6"
                  radius={[0, 4, 4, 0]}
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
            All Activities
          </h3>
        </div>
        <ReportTable
          title="Activities"
          columns={activityColumns}
          data={dummyActivities}
        />
      </div>
    </div>
  );
}

