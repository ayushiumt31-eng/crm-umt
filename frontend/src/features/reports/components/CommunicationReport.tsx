import { Mail, MessageCircle, MessageSquare, Phone, Calendar, FileText, BarChart3 } from "lucide-react";
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
import type { CommunicationReportData } from "../types/report";
import { dummyCommunications } from "@/features/communication/data/dummy-communications";
import type { Communication } from "@/features/communication/types/communication";

const TYPE_COLORS: Record<string, string> = {
  EMAIL: "#3b82f6",
  WHATSAPP: "#22c55e",
  SMS: "#f59e0b",
  CALL: "#8b5cf6",
  MEETING: "#06b6d4",
  NOTE: "#64748b",
};

const STATUS_COLORS: Record<string, string> = {
  DRAFT: "#64748b",
  SENT: "#3b82f6",
  DELIVERED: "#10b981",
  COMPLETED: "#8b5cf6",
  FAILED: "#ef4444",
};

interface CommunicationReportProps {
  data: CommunicationReportData;
}

export function CommunicationReport({ data }: CommunicationReportProps) {
  const communicationColumns = [
    {
      key: "type",
      label: "Type",
      render: (c: Communication) => (
        <span
          className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold"
          style={{
            backgroundColor: `${TYPE_COLORS[c.type] || "#64748b"}20`,
            color: TYPE_COLORS[c.type] || "#64748b",
          }}
        >
          {c.type}
        </span>
      ),
    },
    {
      key: "subject",
      label: "Subject",
      render: (c: Communication) => (
        <span className="font-medium text-slate-900 dark:text-white">
          {c.subject || "—"}
        </span>
      ),
    },
    {
      key: "customerName",
      label: "Customer",
      render: (c: Communication) => (
        <span className="text-slate-600 dark:text-slate-400">
          {c.customerName || "—"}
        </span>
      ),
    },
    {
      key: "leadName",
      label: "Lead",
      render: (c: Communication) => (
        <span className="text-slate-600 dark:text-slate-400">
          {c.leadName || "—"}
        </span>
      ),
    },
    {
      key: "dealName",
      label: "Deal",
      render: (c: Communication) => (
        <span className="text-slate-600 dark:text-slate-400">
          {c.dealName || "—"}
        </span>
      ),
    },
    {
      key: "assignedToName",
      label: "Assigned To",
      render: (c: Communication) => (
        <span className="text-slate-600 dark:text-slate-400">
          {c.assignedToName}
        </span>
      ),
    },
    {
      key: "communicationDate",
      label: "Date",
      render: (c: Communication) => (
        <span className="text-slate-600 dark:text-slate-400">
          {c.communicationDate
            ? new Date(c.communicationDate).toLocaleDateString()
            : "—"}
        </span>
      ),
    },
    {
      key: "status",
      label: "Status",
      render: (c: Communication) => (
        <span
          className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold"
          style={{
            backgroundColor: `${STATUS_COLORS[c.status] || "#64748b"}20`,
            color: STATUS_COLORS[c.status] || "#64748b",
          }}
        >
          {c.status}
        </span>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      {/* Summary Cards */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
        <ReportSummaryCard
          title="Total"
          value={data.totalCommunications}
          icon={BarChart3}
          gradient="from-slate-50 to-slate-100 dark:from-slate-950/40 dark:to-slate-900/20"
          iconBg="from-slate-500 to-slate-600"
        />
        <ReportSummaryCard
          title="Emails"
          value={data.emails}
          icon={Mail}
          gradient="from-blue-50 to-cyan-100 dark:from-blue-950/40 dark:to-cyan-900/20"
          iconBg="from-blue-500 to-cyan-600"
        />
        <ReportSummaryCard
          title="WhatsApp"
          value={data.whatsapp}
          icon={MessageCircle}
          gradient="from-green-50 to-emerald-100 dark:from-green-950/40 dark:to-emerald-900/20"
          iconBg="from-green-500 to-emerald-600"
        />
        <ReportSummaryCard
          title="SMS"
          value={data.sms}
          icon={MessageSquare}
          gradient="from-amber-50 to-yellow-100 dark:from-amber-950/40 dark:to-yellow-900/20"
          iconBg="from-amber-500 to-yellow-600"
        />
        <ReportSummaryCard
          title="Calls"
          value={data.calls}
          icon={Phone}
          gradient="from-purple-50 to-violet-100 dark:from-purple-950/40 dark:to-violet-900/20"
          iconBg="from-purple-500 to-violet-600"
        />
        <ReportSummaryCard
          title="Meetings"
          value={data.meetings}
          icon={Calendar}
          gradient="from-cyan-50 to-teal-100 dark:from-cyan-950/40 dark:to-teal-900/20"
          iconBg="from-cyan-500 to-teal-600"
        />
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Communications by Type */}
        <div className="rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 p-6">
          <h3 className="text-sm font-semibold text-slate-700 dark:text-slate-300 mb-4">
            Communications by Type
          </h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={data.communicationsByType}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                <XAxis dataKey="type" tick={{ fontSize: 12 }} />
                <YAxis tick={{ fontSize: 12 }} />
                <Tooltip />
                <Bar dataKey="count" radius={[4, 4, 0, 0]}>
                  {data.communicationsByType.map((entry) => (
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

        {/* Communications by Status */}
        <div className="rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 p-6">
          <h3 className="text-sm font-semibold text-slate-700 dark:text-slate-300 mb-4">
            Communications by Status
          </h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={data.communicationsByStatus}
                  dataKey="count"
                  nameKey="status"
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  label={({ status, count }) => `${status}: ${count}`}
                >
                  {data.communicationsByStatus.map((entry) => (
                    <Cell
                      key={entry.status}
                      fill={STATUS_COLORS[entry.status] || "#64748b"}
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
            All Communications
          </h3>
        </div>
        <ReportTable
          title="Communications"
          columns={communicationColumns}
          data={dummyCommunications}
        />
      </div>
    </div>
  );
}

