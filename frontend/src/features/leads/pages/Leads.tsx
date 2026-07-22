import { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { LeadToolbar } from "../components/LeadToolbar";
import { LeadTable } from "../components/LeadTable";
import { DeleteLeadDialog } from "../components/DeleteLeadDialog";
import { dummyLeads } from "../data/dummy-leads";
import { useDebounce } from "@/hooks";
import type { Lead } from "../types/lead";
import { Zap, TrendingUp, Trophy, CheckCircle2, UserPlus } from "lucide-react";

export default function Leads() {
  const navigate = useNavigate();
  const [leads, setLeads] = useState<Lead[]>(dummyLeads);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [sourceFilter, setSourceFilter] = useState("All");
  const [assignedToFilter, setAssignedToFilter] = useState("All");
  const [deleteDialog, setDeleteDialog] = useState<{ open: boolean; id?: string; name?: string }>({ open: false });
  const [isDeleting, setIsDeleting] = useState(false);
  const debouncedSearch = useDebounce(searchQuery, 300);

  // Filter leads based on search query
  const filteredLeads = useMemo(() => {
    let filtered = leads;

    if (debouncedSearch) {
      const query = debouncedSearch.toLowerCase();
      filtered = filtered.filter(
        (lead) =>
          lead.leadName.toLowerCase().includes(query) ||
          lead.companyName.toLowerCase().includes(query) ||
          lead.contactPerson.toLowerCase().includes(query) ||
          lead.email.toLowerCase().includes(query) ||
          lead.phone.includes(query)
      );
    }

    if (statusFilter !== "All") {
      filtered = filtered.filter((lead) => lead.status === statusFilter);
    }

    if (sourceFilter !== "All") {
      filtered = filtered.filter((lead) => lead.source === sourceFilter);
    }

    if (assignedToFilter !== "All") {
      filtered = filtered.filter((lead) => lead.assignedTo === assignedToFilter);
    }

    return filtered;
  }, [leads, debouncedSearch, statusFilter, sourceFilter, assignedToFilter]);

  // Calculate stats
  const wonLeads = leads.filter((l) => l.status === "Won").length;
  const qualifiedLeads = leads.filter((l) => l.status === "Qualified").length;
  const newLeads = Math.floor(leads.length * 0.2); // Simulated

  // Get unique values for dropdowns
  const sources = Array.from(new Set(leads.map((l) => l.source))).sort();
  const assignedEmployees = Array.from(new Set(leads.map((l) => l.assignedTo))).sort();

  const handleView = (id: string) => {
    navigate(`/leads/${id}`);
  };

  const handleEdit = (id: string) => {
    navigate(`/leads/${id}/edit`);
  };

  const handleDeleteClick = (id: string) => {
    const lead = leads.find((l) => l.id === id);
    setDeleteDialog({
      open: true,
      id,
      name: lead?.leadName,
    });
  };

  const handleConfirmDelete = async () => {
    if (!deleteDialog.id) return;
    setIsDeleting(true);
    
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 500));
    
    setLeads((prev) => prev.filter((l) => l.id !== deleteDialog.id));
    setDeleteDialog({ open: false });
    setIsDeleting(false);
  };

  const handleCancelDelete = () => {
    setDeleteDialog({ open: false });
  };

  return (
    <div className="space-y-8">
      {/* Header with gradient background */}
      <div className="rounded-2xl bg-gradient-to-r from-blue-600 via-cyan-500 to-blue-600 dark:from-blue-900 dark:via-cyan-900 dark:to-blue-900 p-8 shadow-lg overflow-hidden relative">
        {/* Animated background elements */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-0 left-0 w-96 h-96 bg-white/20 rounded-full blur-3xl animate-pulse" style={{ animation: "pulse 6s ease-in-out infinite" }}></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-cyan-300/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: "3s" }}></div>
        </div>

        <div className="relative z-10">
          <div className="flex items-center gap-4 mb-4">
            <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-white/20 backdrop-blur-md text-white border border-white/30 shadow-lg transform transition-transform hover:scale-110">
              <Zap className="h-7 w-7" />
            </div>
            <div>
              <h1 className="text-4xl font-bold text-white drop-shadow-lg">Leads</h1>
              <p className="text-blue-100 text-lg">Complete lead management dashboard</p>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Total Leads */}
        <div className="group rounded-xl bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-950/40 dark:to-blue-900/20 p-6 border border-blue-200/50 dark:border-blue-800/50 shadow-sm hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-sm font-semibold text-blue-900 dark:text-blue-200">Total Leads</h3>
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-blue-500 to-blue-600 text-white shadow-md">
              <Zap className="h-5 w-5" />
            </div>
          </div>
          <div className="text-3xl font-bold text-blue-900 dark:text-blue-100">{leads.length}</div>
          <p className="text-xs text-blue-700 dark:text-blue-300 mt-2">Open opportunities</p>
        </div>

        {/* Won Leads */}
        <div className="group rounded-xl bg-gradient-to-br from-green-50 to-emerald-100 dark:from-green-950/40 dark:to-emerald-900/20 p-6 border border-green-200/50 dark:border-green-800/50 shadow-sm hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-sm font-semibold text-green-900 dark:text-green-200">Won</h3>
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-green-500 to-emerald-600 text-white shadow-md">
              <Trophy className="h-5 w-5" />
            </div>
          </div>
          <div className="text-3xl font-bold text-green-900 dark:text-green-100">{wonLeads}</div>
          <p className="text-xs text-green-700 dark:text-green-300 mt-2">{Math.round((wonLeads / leads.length) * 100)}% of total</p>
        </div>

        {/* Qualified Leads */}
        <div className="group rounded-xl bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-950/40 dark:to-purple-900/20 p-6 border border-purple-200/50 dark:border-purple-800/50 shadow-sm hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-sm font-semibold text-purple-900 dark:text-purple-200">Qualified</h3>
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-purple-500 to-purple-600 text-white shadow-md">
              <CheckCircle2 className="h-5 w-5" />
            </div>
          </div>
          <div className="text-3xl font-bold text-purple-900 dark:text-purple-100">{qualifiedLeads}</div>
          <p className="text-xs text-purple-700 dark:text-purple-300 mt-2">{Math.round((qualifiedLeads / leads.length) * 100)}% of total</p>
        </div>

        {/* New This Month */}
        <div className="group rounded-xl bg-gradient-to-br from-orange-50 to-amber-100 dark:from-orange-950/40 dark:to-amber-900/20 p-6 border border-orange-200/50 dark:border-orange-800/50 shadow-sm hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-sm font-semibold text-orange-900 dark:text-orange-200">New This Month</h3>
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-orange-500 to-amber-600 text-white shadow-md">
              <UserPlus className="h-5 w-5" />
            </div>
          </div>
          <div className="text-3xl font-bold text-orange-900 dark:text-orange-100">{newLeads}</div>
          <p className="text-xs text-orange-700 dark:text-orange-300 mt-2">Growth trend ↗ 12%</p>
        </div>
      </div>

      {/* Toolbar */}
      <LeadToolbar
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        statusFilter={statusFilter}
        onStatusChange={setStatusFilter}
        sourceFilter={sourceFilter}
        sources={sources}
        onSourceChange={setSourceFilter}
        assignedToFilter={assignedToFilter}
        assignedEmployees={assignedEmployees}
        onAssignedToChange={setAssignedToFilter}
      />

      {/* Table with enhanced styling */}
      <div className="rounded-2xl border border-slate-200/50 dark:border-slate-800/50 bg-white dark:bg-slate-900 shadow-sm overflow-hidden">
        <div className="px-6 py-4 border-b border-slate-200/50 dark:border-slate-800/50 bg-gradient-to-r from-blue-50/50 to-cyan-50/50 dark:from-blue-950/20 dark:to-cyan-950/20">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-blue-600 dark:text-blue-400" />
              <h2 className="font-bold text-slate-900 dark:text-white">
                All Leads
              </h2>
              <span className="inline-flex items-center rounded-full bg-blue-100 dark:bg-blue-900/50 px-3 py-1 text-sm font-semibold text-blue-700 dark:text-blue-300">
                {filteredLeads.length} results
              </span>
            </div>
            <p className="text-sm text-slate-600 dark:text-slate-400">
              {debouncedSearch ? `Filtered results showing ${filteredLeads.length} of ${leads.length}` : `Showing all ${leads.length} leads`}
            </p>
          </div>
        </div>
        
        <LeadTable
          leads={filteredLeads}
          onView={handleView}
          onEdit={handleEdit}
          onDelete={handleDeleteClick}
        />
      </div>

      {/* Empty State */}
      {filteredLeads.length === 0 && (
        <div className="rounded-2xl border border-dashed border-slate-300 dark:border-slate-600 bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900/50 dark:to-slate-800/50 p-12 text-center">
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-slate-200 dark:bg-slate-700 mx-auto mb-4">
            <Zap className="h-8 w-8 text-slate-600 dark:text-slate-400" />
          </div>
          <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">No leads found</h3>
          <p className="text-slate-600 dark:text-slate-400 mb-6">Try adjusting your search criteria or add a new lead</p>
          <button
            onClick={() => navigate("/leads/add")}
            className="inline-flex items-center gap-2 rounded-lg bg-gradient-to-r from-blue-600 to-cyan-600 px-6 py-2 font-semibold text-white shadow-lg hover:shadow-xl transition-all duration-200 hover:from-blue-700 hover:to-cyan-700 transform hover:-translate-y-0.5"
          >
            <UserPlus className="h-4 w-4" />
            Add Your First Lead
          </button>
        </div>
      )}

      <DeleteLeadDialog
        open={deleteDialog.open}
        leadName={deleteDialog.name || ""}
        onConfirm={handleConfirmDelete}
        onCancel={handleCancelDelete}
        isLoading={isDeleting}
      />
    </div>
  );
}
