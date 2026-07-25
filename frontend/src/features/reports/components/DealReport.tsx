import { Handshake, TrendingUp, CheckCircle2, XCircle, DollarSign } from "lucide-react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";
import { ReportSummaryCard } from "./ReportSummaryCard";
import { ReportTable } from "./ReportTable";
import type { DealReportData } from "../types/report";
import { dummyDeals } from "@/features/deals/data/dummy-deals";
import type { Deal } from "@/features/deals/types/deal";

const STAGE_COLORS: Record<string, string> = {
  PROSPECTING: "#3b82f6",
  QUALIFICATION: "#06b6d4",
  PROPOSAL: "#8b5cf6",
  NEGOTIATION: "#f59e0b",
  CLOSED_WON: "#10b981",
  CLOSED_LOST: "#ef4444",
};

interface DealReportProps {
  data: DealReportData;
}

const formatCurrency = (value: number) =>
  new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(value);

export function DealReport({ data }: DealReportProps) {
  const dealColumns = [
    {
      key: "title",
      label: "Deal Name",
      render: (d: Deal) => (
        <span className="font-medium text-slate-900 dark:text-white">
          {d.title}
        </span>
      ),
    },
    {
      key: "company",
      label: "Company",
      render: (d: Deal) => (
        <span className="text-slate-600 dark:text-slate-400">{d.company}</span>
      ),
    },
    {
      key: "contactPerson",
      label: "Contact",
      render: (d: Deal) => (
        <span className="text-slate-600 dark:text-slate-400">
          {d.contactPerson}
        </span>
      ),
    },
    {
      key: "value",
      label: "Amount",
      render: (d: Deal) => (
        <span className="font-medium text-slate-900 dark:text-white">
          {formatCurrency(d.value)}
        </span>
      ),
    },
    {
      key: "stage",
      label: "Stage",
      render: (d: Deal) => (
        <span
          className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold"
          style={{
            backgroundColor: `${STAGE_COLORS[d.stage] || "#64748b"}20`,
            color: STAGE_COLORS[d.stage] || "#64748b",
          }}
        >
          {d.stage.replace(/_/g, " ")}
        </span>
      ),
    },
    {
      key: "assignedTo",
      label: "Assigned To",
      render: (d: Deal) => (
        <span className="text-slate-600 dark:text-slate-400">
          {d.assignedTo}
        </span>
      ),
    },
    {
      key: "expectedCloseDate",
      label: "Expected Close",
      render: (d: Deal) => (
        <span className="text-slate-600 dark:text-slate-400">
          {new Date(d.expectedCloseDate).toLocaleDateString()}
        </span>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <ReportSummaryCard
          title="Total Deals"
          value={data.totalDeals}
          icon={Handshake}
          gradient="from-indigo-50 to-blue-100 dark:from-indigo-950/40 dark:to-blue-900/20"
          iconBg="from-indigo-500 to-blue-600"
        />
        <ReportSummaryCard
          title="Total Pipeline Value"
          value={data.totalPipelineValue}
          icon={DollarSign}
          formatter={formatCurrency}
          gradient="from-green-50 to-emerald-100 dark:from-green-950/40 dark:to-emerald-900/20"
          iconBg="from-green-500 to-emerald-600"
        />
        <ReportSummaryCard
          title="Won Deals"
          value={data.wonDeals}
          icon={CheckCircle2}
          gradient="from-teal-50 to-emerald-100 dark:from-teal-950/40 dark:to-emerald-900/20"
          iconBg="from-teal-500 to-emerald-600"
        />
        <ReportSummaryCard
          title="Won Deal Value"
          value={data.wonDealValue}
          icon={TrendingUp}
          formatter={formatCurrency}
          gradient="from-cyan-50 to-teal-100 dark:from-cyan-950/40 dark:to-teal-900/20"
          iconBg="from-cyan-500 to-teal-600"
        />
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Pipeline by Stage */}
        <div className="rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 p-6">
          <h3 className="text-sm font-semibold text-slate-700 dark:text-slate-300 mb-4">
            Deal Pipeline by Stage
          </h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={data.dealsByStage}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                <XAxis
                  dataKey="stage"
                  tick={{ fontSize: 10 }}
                  tickFormatter={(val) => val.replace(/_/g, " ")}
                />
                <YAxis yAxisId="left" tick={{ fontSize: 12 }} />
                <YAxis
                  yAxisId="right"
                  orientation="right"
                  tick={{ fontSize: 12 }}
                />
                <Tooltip contentStyle={{ fontSize: "13px" }} />
                <Bar
                  yAxisId="left"
                  dataKey="count"
                  fill="#3b82f6"
                  radius={[4, 4, 0, 0]}
                  name="count"
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Stage by Value */}
        <div className="rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 p-6">
          <h3 className="text-sm font-semibold text-slate-700 dark:text-slate-300 mb-4">
            Pipeline Value by Stage
          </h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={data.dealsByStage}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                <XAxis
                  dataKey="stage"
                  tick={{ fontSize: 10 }}
                  tickFormatter={(val) => val.replace(/_/g, " ")}
                />
                <YAxis tick={{ fontSize: 12 }} />
                <Tooltip contentStyle={{ fontSize: "13px" }} />
                <Bar
                  dataKey="value"
                  fill="#22c55e"
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
            All Deals
          </h3>
        </div>
        <ReportTable title="Deals" columns={dealColumns} data={dummyDeals} />
      </div>
    </div>
  );
}

