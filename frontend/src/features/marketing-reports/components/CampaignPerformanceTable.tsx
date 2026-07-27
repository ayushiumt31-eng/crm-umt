import { useNavigate } from "react-router-dom";
import { DataTable } from "@/components/common/DataTable";
import type { TableColumn } from "@/components/common/DataTable";
import type { CampaignPerformance } from "../types/marketingReport";

interface CampaignPerformanceTableProps {
  data: CampaignPerformance[];
  loading?: boolean;
}

export function CampaignPerformanceTable({ data, loading }: CampaignPerformanceTableProps) {
  const navigate = useNavigate();

  const columns: TableColumn<CampaignPerformance>[] = [
    {
      key: "campaignName",
      label: "Campaign Name",
      width: "200px",
      render: (value: string) => (
        <p className="font-semibold text-slate-900 dark:text-slate-100">{value}</p>
      ),
    },
    {
      key: "channel",
      label: "Channel",
      render: (value: CampaignPerformance["channel"]) => {
        const labels: Record<string, string> = {
          EMAIL: "Email",
          WHATSAPP: "WhatsApp",
          SOCIAL_MEDIA: "Social Media",
          ADS: "Ads",
          AUTOMATION: "Automation",
        };
        return (
          <span className="text-sm text-slate-600 dark:text-slate-400">
            {labels[value] || value}
          </span>
        );
      },
    },
    {
      key: "leads",
      label: "Leads",
      render: (value: number) => (
        <span className="text-sm font-medium text-slate-700 dark:text-slate-300">
          {value.toLocaleString()}
        </span>
      ),
    },
    {
      key: "conversions",
      label: "Conversions",
      render: (value: number) => (
        <span className="text-sm text-slate-600 dark:text-slate-400">
          {value.toLocaleString()}
        </span>
      ),
    },
    {
      key: "conversionRate",
      label: "Conv. Rate",
      render: (value: number) => (
        <span className="text-sm font-medium text-slate-700 dark:text-slate-300">
          {value.toFixed(1)}%
        </span>
      ),
    },
    {
      key: "spend",
      label: "Spend",
      render: (value: number) => (
        <span className="text-sm text-slate-600 dark:text-slate-400">
          ₹{value.toLocaleString()}
        </span>
      ),
    },
    {
      key: "revenue",
      label: "Revenue",
      render: (value: number) => (
        <span className="text-sm font-medium text-green-600 dark:text-green-400">
          ₹{value.toLocaleString()}
        </span>
      ),
    },
    {
      key: "roi",
      label: "ROI",
      render: (value: number) => (
        <span className="text-sm font-semibold text-emerald-600 dark:text-emerald-400">
          {value.toFixed(0)}%
        </span>
      ),
    },
    {
      key: "status",
      label: "Status",
      render: (value: string) => (
        <span className="text-sm text-slate-600 dark:text-slate-400">{value}</span>
      ),
    },
    {
      key: "id",
      label: "Actions",
      width: "80px",
      render: (_value: string, row: CampaignPerformance) => (
        <button
          onClick={() => navigate(`/marketing/reports/${row.id}`)}
          className="text-sm font-medium text-blue-600 dark:text-blue-400 hover:underline"
        >
          View
        </button>
      ),
    },
  ];

  return <DataTable columns={columns} data={data} loading={loading} showActions={false} />;
}
