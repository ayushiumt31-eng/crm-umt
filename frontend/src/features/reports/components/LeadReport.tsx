import { Zap, UserPlus, ThumbsUp, Target, XCircle, TrendingUp } from "lucide-react";
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
import type { LeadReportData } from "../types/report";
import { dummyLead } from "@/features/lead/data/dummy-lead";
import type { Lead, LeadStatus, LeadSource } from "@/features/lead/types/lead";

const STATUS_COLORS: Record<string, string> = {
  NEW: "#3b82f6",
  CONTACTED: "#06b6d4",
  QUALIFIED: "#8b5cf6",
  PROPOSAL: "#f59e0b",
  NEGOTIATION: "#f97316",
  CONVERTED: "#10b981",
  LOST: "#ef4444",
};

const SOURCE_COLORS: Record<string, string> = {
  WEBSITE: "#3b82f6",
  REFERRAL: "#10b981",
  SOCIAL_MEDIA: "#8b5cf6",
  ADVERTISEMENT: "#f59e0b",
  EMAIL: "#06b6d4",
  PHONE: "#f97316",
  WHATSAPP: "#22c55e",
  OTHER: "#64748b",
};

interface LeadReportProps {
  data: LeadReportData;
}

export function LeadReport({ data }: LeadReportProps) {
  const leadColumns = [
    {
      key: "name",
      label: "Lead Name",
      render: (l: Lead) => (
        <span className="font-medium text-slate-900 dark:text-white">
          {l.firstName} {l.lastName}
        </span>
      ),
    },
    {
      key: "company",
      label: "Company",
      render: (l: Lead) => (
        <span className="text-slate-600 dark:text-slate-400">
          {l.company || "—"}
        </span>
      ),
    },
    {
      key: "source",
      label: "Source",
      render: (l: Lead) => (
        <span className="text-slate-600 dark:text-slate-400">{l.source}</span>
      ),
    },
    {
      key: "status",
      label: "Status",
      render: (l: Lead) => (
        <span
          className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold"
          style={{
            backgroundColor: `${STATUS_COLORS[l.status] || "#64748b"}20`,
            color: STATUS_COLORS[l.status] || "#64748b",
          }}
        >
          {l.status}
        </span>
      ),
    },
    {
      key: "assignedTo",
      label: "Assigned To",
      render: (l: Lead) => (
        <span className="text-slate-600 dark:text-slate-400">
          {l.assignedTo || "—"}
        </span>
      ),
    },
    {
      key: "createdAt",
      label: "Created",
      render: (l: Lead) => (
        <span className="text-slate-600 dark:text-slate-400">
          {new Date(l.createdAt).toLocaleDateString()}
        </span>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <ReportSummaryCard
          title="Total Leads"
          value={data.totalLeads}
          icon={Zap}
          gradient="from-amber-50 to-yellow-100 dark:from-amber-950/40 dark:to-yellow-900/20"
          iconBg="from-amber-500 to-yellow-600"
        />
        <ReportSummaryCard
          title="New Leads"
          value={data.newLeads}
          icon={UserPlus}
          gradient="from-blue-50 to-cyan-100 dark:from-blue-950/40 dark:to-cyan-900/20"
          iconBg="from-blue-500 to-cyan-600"
        />
        <ReportSummaryCard
          title="Qualified"
          value={data.qualifiedLeads}
          icon={ThumbsUp}
          gradient="from-purple-50 to-violet-100 dark:from-purple-950/40 dark:to-violet-900/20"
          iconBg="from-purple-500 to-violet-600"
        />
        <ReportSummaryCard
          title="Conversion Rate"
          value={`${data.conversionRate}%`}
          icon={TrendingUp}
          gradient="from-green-50 to-emerald-100 dark:from-green-950/40 dark:to-emerald-900/20"
          iconBg="from-green-500 to-emerald-600"
        />
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Leads by Status */}
        <div className="rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 p-6">
          <h3 className="text-sm font-semibold text-slate-700 dark:text-slate-300 mb-4">
            Leads by Status
          </h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={data.leadsByStatus}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                <XAxis dataKey="status" tick={{ fontSize: 12 }} />
                <YAxis tick={{ fontSize: 12 }} />
                <Tooltip />
                <Bar dataKey="count" radius={[4, 4, 0, 0]}>
                  {data.leadsByStatus.map((entry) => (
                    <Cell
                      key={entry.status}
                      fill={STATUS_COLORS[entry.status] || "#64748b"}
                    />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Leads by Source */}
        <div className="rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 p-6">
          <h3 className="text-sm font-semibold text-slate-700 dark:text-slate-300 mb-4">
            Leads by Source
          </h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={data.leadsBySource}
                  dataKey="count"
                  nameKey="source"
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  label={({ source, count }) => `${source}: ${count}`}
                >
                  {data.leadsBySource.map((entry) => (
                    <Cell
                      key={entry.source}
                      fill={SOURCE_COLORS[entry.source] || "#64748b"}
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
            All Leads
          </h3>
        </div>
        <ReportTable title="Leads" columns={leadColumns} data={dummyLead} />
      </div>
    </div>
  );
}

