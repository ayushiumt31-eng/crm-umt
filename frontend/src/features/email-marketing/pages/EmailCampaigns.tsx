import { useState, useMemo, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Plus, Search, Mail, TrendingUp, ArrowLeft } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/common/DataTable";
import { emailCampaignTableColumns } from "../components/EmailCampaignTableColumns";
import { DeleteEmailCampaignDialog } from "../components/DeleteEmailCampaignDialog";
import { emailCampaignService } from "../services/emailCampaignService";
import type { EmailCampaign } from "../types/emailCampaign";

export default function EmailCampaigns() {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("ALL");
  const [audienceFilter, setAudienceFilter] = useState("ALL");
  const [deleteCampaign, setDeleteCampaign] =
    useState<EmailCampaign | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const [campaigns, setCampaigns] = useState<EmailCampaign[]>([]);

  useEffect(() => {
    emailCampaignService.getEmailCampaigns().then(setCampaigns);
  }, []);

  const refreshCampaigns = () => {
    emailCampaignService.getEmailCampaigns().then(setCampaigns);
  };

  const filteredCampaigns = useMemo(() => {
    return campaigns.filter((c) => {
      const searchStr = searchTerm.toLowerCase();
      const matchesSearch =
        !searchTerm ||
        c.name.toLowerCase().includes(searchStr) ||
        c.subject.toLowerCase().includes(searchStr) ||
        c.templateName.toLowerCase().includes(searchStr) ||
        c.createdByName.toLowerCase().includes(searchStr);

      const matchesStatus =
        statusFilter === "ALL" || c.status === statusFilter;

      const matchesAudience =
        audienceFilter === "ALL" || c.audienceType === audienceFilter;

      return matchesSearch && matchesStatus && matchesAudience;
    });
  }, [campaigns, searchTerm, statusFilter, audienceFilter]);

  const handleDeleteConfirm = async () => {
    if (!deleteCampaign) return;
    setIsDeleting(true);
    try {
      await emailCampaignService.deleteEmailCampaign(deleteCampaign.id);
      setDeleteCampaign(null);
      refreshCampaigns();
    } finally {
      setIsDeleting(false);
    }
  };

  const columns = useMemo(() => {
    return emailCampaignTableColumns.map((col) => {
      if (col.key === "id") {
        return {
          ...col,
          render: (_value: string, row: EmailCampaign) => (
            <div className="flex items-center gap-2">
              <button
                onClick={() =>
                  navigate(
                    `/marketing/email-marketing/campaigns/${row.id}`
                  )
                }
                title="View"
                className="h-8 w-8 flex items-center justify-center rounded-md hover:bg-blue-100 dark:hover:bg-blue-900/30 text-blue-600 dark:text-blue-400"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" />
                  <circle cx="12" cy="12" r="3" />
                </svg>
              </button>
              <button
                onClick={() =>
                  navigate(
                    `/marketing/email-marketing/campaigns/${row.id}/edit`
                  )
                }
                title="Edit"
                className="h-8 w-8 flex items-center justify-center rounded-md hover:bg-cyan-100 dark:hover:bg-cyan-900/30 text-cyan-600 dark:text-cyan-400"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M17 3a2.85 2.85 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z" />
                  <path d="m15 5 4 4" />
                </svg>
              </button>
              <button
                title="Delete"
                className="h-8 w-8 flex items-center justify-center rounded-md hover:bg-red-100 dark:hover:bg-red-900/30 text-red-600 dark:text-red-400"
                onClick={() => {
                  const c = campaigns.find((x) => x.id === row.id);
                  if (c) setDeleteCampaign(c);
                }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M3 6h18" />
                  <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
                  <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
                </svg>
              </button>
            </div>
          ),
        };
      }
      return col;
    });
  }, [navigate, campaigns]);

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="rounded-2xl bg-gradient-to-r from-blue-600 via-cyan-500 to-blue-600 dark:from-blue-900 dark:via-cyan-900 dark:to-blue-900 p-8 shadow-lg overflow-hidden relative">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-0 left-0 w-96 h-96 bg-white/20 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-cyan-300/20 rounded-full blur-3xl animate-pulse"></div>
        </div>
        <div className="relative z-10">
          <div className="flex items-center gap-4 mb-4">
            <button
              onClick={() => navigate("/marketing/email-marketing")}
              className="flex h-10 w-10 items-center justify-center rounded-lg bg-white/20 backdrop-blur-md text-white border border-white/30 shadow-lg hover:bg-white/30 transition-all"
              title="Back to Email Marketing"
            >
              <ArrowLeft className="h-5 w-5" />
            </button>
            <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-white/20 backdrop-blur-md text-white border border-white/30 shadow-lg">
              <Mail className="h-7 w-7" />
            </div>
            <div>
              <h1 className="text-4xl font-bold text-white drop-shadow-lg">
                Email Campaigns
              </h1>
              <p className="text-cyan-100 text-lg">
                Manage all email marketing campaigns
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Filters & Toolbar */}
      <div className="rounded-2xl border border-slate-200/50 dark:border-slate-800/50 bg-white dark:bg-slate-900 shadow-sm overflow-hidden">
        <div className="px-6 py-4 border-b border-slate-200/50 dark:border-slate-800/50 bg-gradient-to-r from-blue-50/50 to-cyan-50/50 dark:from-blue-950/20 dark:to-cyan-950/20">
          <div className="flex items-center justify-between flex-wrap gap-2">
            <div className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-blue-600 dark:text-blue-400" />
              <h2 className="font-bold text-slate-900 dark:text-white">
                All Email Campaigns
              </h2>
              <span className="inline-flex items-center rounded-full bg-blue-100 dark:bg-blue-900/50 px-3 py-1 text-sm font-semibold text-blue-700 dark:text-blue-300">
                {filteredCampaigns.length} results
              </span>
            </div>
            <Button
              onClick={() =>
                navigate("/marketing/email-marketing/campaigns/add")
              }
              className="gap-2"
            >
              <Plus className="h-4 w-4" />
              Create Campaign
            </Button>
          </div>
        </div>

        <div className="p-4 border-b border-slate-200/50 dark:border-slate-800/50 space-y-4">
          <div className="relative w-full md:w-96">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-slate-500" />
            <Input
              placeholder="Search campaigns..."
              className="pl-9"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="flex flex-wrap gap-3">
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="h-10 rounded-md border border-slate-200 bg-white px-3 text-sm dark:border-slate-700 dark:bg-slate-900"
            >
              <option value="ALL">All Status</option>
              <option value="DRAFT">Draft</option>
              <option value="SCHEDULED">Scheduled</option>
              <option value="PROCESSING">Processing</option>
              <option value="SENT">Sent</option>
              <option value="PAUSED">Paused</option>
              <option value="CANCELLED">Cancelled</option>
              <option value="FAILED">Failed</option>
            </select>
            <select
              value={audienceFilter}
              onChange={(e) => setAudienceFilter(e.target.value)}
              className="h-10 rounded-md border border-slate-200 bg-white px-3 text-sm dark:border-slate-700 dark:bg-slate-900"
            >
              <option value="ALL">All Audiences</option>
              <option value="ALL_CUSTOMERS">All Customers</option>
              <option value="ALL_LEADS">All Leads</option>
              <option value="CUSTOMERS">Customers</option>
              <option value="LEADS">Leads</option>
              <option value="CUSTOM">Custom</option>
            </select>
          </div>
        </div>

        <DataTable
          columns={columns}
          data={filteredCampaigns}
          showActions={false}
        />
      </div>

      {/* Empty State */}
      {filteredCampaigns.length === 0 && (
        <div className="rounded-2xl border border-dashed border-slate-300 dark:border-slate-600 bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900/50 dark:to-slate-800/50 p-12 text-center">
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-slate-200 dark:bg-slate-700 mx-auto mb-4">
            <Mail className="h-8 w-8 text-slate-600 dark:text-slate-400" />
          </div>
          <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">
            No campaigns found
          </h3>
          <p className="text-slate-600 dark:text-slate-400 mb-6">
            Try adjusting your search or filter criteria
          </p>
          <button
            onClick={() =>
              navigate("/marketing/email-marketing/campaigns/add")
            }
            className="inline-flex items-center gap-2 rounded-lg bg-gradient-to-r from-blue-600 to-cyan-600 px-6 py-2 font-semibold text-white shadow-lg hover:shadow-xl transition-all duration-200 hover:from-blue-700 hover:to-cyan-700 transform hover:-translate-y-0.5"
          >
            <Plus className="h-4 w-4" />
            Create Your First Campaign
          </button>
        </div>
      )}

      <DeleteEmailCampaignDialog
        campaign={deleteCampaign}
        isOpen={!!deleteCampaign}
        onClose={() => setDeleteCampaign(null)}
        onConfirm={handleDeleteConfirm}
        isLoading={isDeleting}
      />
    </div>
  );
}

