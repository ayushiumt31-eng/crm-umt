import { useState, useMemo, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Plus, Search, Megaphone, TrendingUp } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/common/DataTable";
import { campaignTableColumns } from "../components/CampaignTableColumns";
import { CampaignStatsCard } from "../components/CampaignStatsCard";
import { DeleteCampaignDialog } from "../components/DeleteCampaignDialog";
import { campaignService } from "../services/campaignService";
import type { Campaign, CampaignType, CampaignStatus, CampaignAudience } from "../types/campaign";

export default function Campaigns() {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [typeFilter, setTypeFilter] = useState<string>("ALL");
  const [statusFilter, setStatusFilter] = useState<string>("ALL");
  const [audienceFilter, setAudienceFilter] = useState<string>("ALL");
  const [deleteCampaign, setDeleteCampaign] = useState<Campaign | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);

  // Load campaigns on mount
  useEffect(() => {
    campaignService.getCampaigns().then(setCampaigns);
  }, []);

  // Refresh campaigns after delete
  const refreshCampaigns = () => {
    campaignService.getCampaigns().then(setCampaigns);
  };

  const filteredCampaigns = useMemo(() => {
    return campaigns.filter((campaign) => {
      // Search
      const searchStr = searchTerm.toLowerCase();
      const matchesSearch =
        !searchTerm ||
        campaign.name.toLowerCase().includes(searchStr) ||
        campaign.description.toLowerCase().includes(searchStr) ||
        campaign.assignedToName.toLowerCase().includes(searchStr) ||
        campaign.createdByName.toLowerCase().includes(searchStr);

      // Type filter
      const matchesType = typeFilter === "ALL" || campaign.type === typeFilter;

      // Status filter
      const matchesStatus =
        statusFilter === "ALL" || campaign.status === statusFilter;

      // Audience filter
      const matchesAudience =
        audienceFilter === "ALL" || campaign.audience === audienceFilter;

      return matchesSearch && matchesType && matchesStatus && matchesAudience;
    });
  }, [campaigns, searchTerm, typeFilter, statusFilter, audienceFilter]);

  const handleDeleteClick = (id: string) => {
    const campaign = campaigns.find((c) => c.id === id);
    if (campaign) {
      setDeleteCampaign(campaign);
    }
  };

  const handleDeleteConfirm = async () => {
    if (!deleteCampaign) return;
    setIsDeleting(true);
    try {
      await campaignService.deleteCampaign(deleteCampaign.id);
      setDeleteCampaign(null);
      refreshCampaigns();
    } finally {
      setIsDeleting(false);
    }
  };

  // Build columns with action buttons
  const columns = useMemo(() => {
    return campaignTableColumns.map((col) => {
      if (col.key === "id") {
        return {
          ...col,
          render: (_value: string, row: Campaign) => (
            <div className="flex items-center gap-2">
              <button
                onClick={() => navigate(`/marketing/campaigns/${row.id}`)}
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
                  navigate(`/marketing/campaigns/${row.id}/edit`)
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
      {/* Header with gradient background */}
      <div className="rounded-2xl bg-gradient-to-r from-purple-600 via-pink-500 to-purple-600 dark:from-purple-900 dark:via-pink-900 dark:to-purple-900 p-8 shadow-lg overflow-hidden relative">
        <div className="absolute inset-0 opacity-20">
          <div
            className="absolute top-0 left-0 w-96 h-96 bg-white/20 rounded-full blur-3xl animate-pulse"
            style={{ animation: "pulse 6s ease-in-out infinite" }}
          ></div>
          <div
            className="absolute bottom-0 right-0 w-96 h-96 bg-pink-300/20 rounded-full blur-3xl animate-pulse"
            style={{ animationDelay: "3s" }}
          ></div>
        </div>

        <div className="relative z-10">
          <div className="flex items-center gap-4 mb-4">
            <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-white/20 backdrop-blur-md text-white border border-white/30 shadow-lg transform transition-transform hover:scale-110">
              <Megaphone className="h-7 w-7" />
            </div>
            <div>
              <h1 className="text-4xl font-bold text-white drop-shadow-lg">
                Marketing Campaigns
              </h1>
              <p className="text-purple-100 text-lg">
                Create, manage, and track your marketing campaigns.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <CampaignStatsCard campaigns={campaigns} />

      {/* Filters & Toolbar */}
      <div className="rounded-2xl border border-slate-200/50 dark:border-slate-800/50 bg-white dark:bg-slate-900 shadow-sm overflow-hidden">
        {/* Title & Add Button */}
        <div className="px-6 py-4 border-b border-slate-200/50 dark:border-slate-800/50 bg-gradient-to-r from-purple-50/50 to-pink-50/50 dark:from-purple-950/20 dark:to-pink-950/20">
          <div className="flex items-center justify-between flex-wrap gap-2">
            <div className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-purple-600 dark:text-purple-400" />
              <h2 className="font-bold text-slate-900 dark:text-white">
                All Campaigns
              </h2>
              <span className="inline-flex items-center rounded-full bg-purple-100 dark:bg-purple-900/50 px-3 py-1 text-sm font-semibold text-purple-700 dark:text-purple-300">
                {filteredCampaigns.length} results
              </span>
            </div>
            <Button
              onClick={() => navigate("/marketing/campaigns/add")}
              className="gap-2"
            >
              <Plus className="h-4 w-4" />
              Create Campaign
            </Button>
          </div>
        </div>

        {/* Search & Filters */}
        <div className="p-4 border-b border-slate-200/50 dark:border-slate-800/50 space-y-4">
          <div className="relative w-full md:w-96">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-slate-500" />
            <Input
              placeholder="Search campaigns by name, description, assigned employee..."
              className="pl-9"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="flex flex-wrap gap-3">
            <select
              value={typeFilter}
              onChange={(e) => setTypeFilter(e.target.value)}
              className="h-10 rounded-md border border-slate-200 bg-white px-3 text-sm dark:border-slate-700 dark:bg-slate-900"
            >
              <option value="ALL">All Types</option>
              <option value="EMAIL">Email</option>
              <option value="WHATSAPP">WhatsApp</option>
              <option value="SMS">SMS</option>
            </select>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="h-10 rounded-md border border-slate-200 bg-white px-3 text-sm dark:border-slate-700 dark:bg-slate-900"
            >
              <option value="ALL">All Status</option>
              <option value="DRAFT">Draft</option>
              <option value="SCHEDULED">Scheduled</option>
              <option value="RUNNING">Running</option>
              <option value="COMPLETED">Completed</option>
              <option value="PAUSED">Paused</option>
              <option value="CANCELLED">Cancelled</option>
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
            <Megaphone className="h-8 w-8 text-slate-600 dark:text-slate-400" />
          </div>
          <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">
            No campaigns found
          </h3>
          <p className="text-slate-600 dark:text-slate-400 mb-6">
            Try adjusting your search or filter criteria, or create a new
            campaign
          </p>
          <button
            onClick={() => navigate("/marketing/campaigns/add")}
            className="inline-flex items-center gap-2 rounded-lg bg-gradient-to-r from-purple-600 to-pink-600 px-6 py-2 font-semibold text-white shadow-lg hover:shadow-xl transition-all duration-200 hover:from-purple-700 hover:to-pink-700 transform hover:-translate-y-0.5"
          >
            <Plus className="h-4 w-4" />
            Create Your First Campaign
          </button>
        </div>
      )}

      <DeleteCampaignDialog
        campaign={deleteCampaign}
        isOpen={!!deleteCampaign}
        onClose={() => setDeleteCampaign(null)}
        onConfirm={handleDeleteConfirm}
        isLoading={isDeleting}
      />
    </div>
  );
}
