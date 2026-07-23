import { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { DataTable } from "@/components/common/DataTable";
import { DeleteCustomerDialog } from "@/features/customers/components/DeleteCustomerDialog";
import { useDebounce } from "@/hooks";
import type { Lead } from "../types/lead";
import { Users, TrendingUp, UserCheck, UserPlus, Mail, Phone } from "lucide-react";
import { dummyLead } from "../data/dummy-lead";
import { leadTableColumns } from "../components/LeadTableColumns";
import { LeadToolbar } from "../components/LeadToolbar";

export default function Lead() {
    const navigate = useNavigate();
    const [lead, setLead] = useState<Lead[]>(dummyLead);
    const [searchQuery, setSearchQuery] = useState("");
    const [deleteDialog, setDeleteDialog] = useState<{ open: boolean; id?: string; name?: string }>({ open: false });
    const [isDeleting, setIsDeleting] = useState(false);
    const debouncedSearch = useDebounce(searchQuery, 300);

    // Filter leads based on search query
    const filteredLead = useMemo(() => {
        if (!debouncedSearch) return lead;

        return lead.filter(
            (l) =>
                l.firstName.toLowerCase().includes(debouncedSearch.toLowerCase()) ||
                l.email.toLowerCase().includes(debouncedSearch.toLowerCase()) ||
                (l.company && l.company.toLowerCase().includes(debouncedSearch.toLowerCase())) ||
                l.phone.includes(debouncedSearch)
        );
    }, [lead, debouncedSearch]);

    // Calculate stats
    const activeLead = lead.filter((l) =>
        l.status === "QUALIFIED" || l.status === "PROPOSAL" || l.status === "NEGOTIATION"
    ).length;
    const convertedLead = lead.filter((l) => l.status === "CONVERTED").length;
    const lostLead = lead.filter((l) => l.status === "LOST").length;
    const newLead = lead.filter((l) => l.status === "NEW").length;

    const handleView = (id: string) => {
        navigate(`/lead/${id}`);
    };

    const handleEdit = (id: string) => {
        navigate(`/lead/${id}/edit`);
    };

    const handleAdd = () => {
        navigate("/lead/add");
    };

    const handleDeleteClick = (id: string) => {
        const selectedLead = lead.find((l) => l.id === id);
        setDeleteDialog({
            open: true,
            id,
            name: `${selectedLead?.firstName} ${selectedLead?.lastName}`,
        });
    };

    const handleConfirmDelete = async () => {
        if (!deleteDialog.id) return;
        setIsDeleting(true);
        await new Promise((resolve) => setTimeout(resolve, 500));
        setLead((prev) => prev.filter((l) => l.id !== deleteDialog.id));
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
                <div className="absolute inset-0 opacity-20">
                    <div className="absolute top-0 left-0 w-96 h-96 bg-white/20 rounded-full blur-3xl animate-pulse" style={{ animation: "pulse 6s ease-in-out infinite" }}></div>
                    <div className="absolute bottom-0 right-0 w-96 h-96 bg-cyan-300/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: "3s" }}></div>
                </div>

                <div className="relative z-10">
                    <div className="flex items-center gap-4 mb-4">
                        <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-white/20 backdrop-blur-md text-white border border-white/30 shadow-lg transform transition-transform hover:scale-110">
                            <Users className="h-7 w-7" />
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
                            <Users className="h-5 w-5" />
                        </div>
                    </div>
                    <div className="text-3xl font-bold text-blue-900 dark:text-blue-100">{lead.length}</div>
                    <p className="text-xs text-blue-700 dark:text-blue-300 mt-2">Managed records</p>
                </div>

                {/* Active Leads (Qualified/Proposal/Negotiation) */}
                <div className="group rounded-xl bg-gradient-to-br from-green-50 to-emerald-100 dark:from-green-950/40 dark:to-emerald-900/20 p-6 border border-green-200/50 dark:border-green-800/50 shadow-sm hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
                    <div className="flex items-center justify-between mb-3">
                        <h3 className="text-sm font-semibold text-green-900 dark:text-green-200">Active Leads</h3>
                        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-green-500 to-emerald-600 text-white shadow-md">
                            <UserCheck className="h-5 w-5" />
                        </div>
                    </div>
                    <div className="text-3xl font-bold text-green-900 dark:text-green-100">{activeLead}</div>
                    <p className="text-xs text-green-700 dark:text-green-300 mt-2">{lead.length > 0 ? Math.round((activeLead / lead.length) * 100) : 0}% in pipeline</p>
                </div>

                {/* Converted Leads */}
                <div className="group rounded-xl bg-gradient-to-br from-blue-50 to-cyan-100 dark:from-blue-950/40 dark:to-cyan-900/20 p-6 border border-blue-200/50 dark:border-blue-800/50 shadow-sm hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
                    <div className="flex items-center justify-between mb-3">
                        <h3 className="text-sm font-semibold text-blue-900 dark:text-blue-200">Converted</h3>
                        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-blue-500 to-cyan-600 text-white shadow-md">
                            <TrendingUp className="h-5 w-5" />
                        </div>
                    </div>
                    <div className="text-3xl font-bold text-blue-900 dark:text-blue-100">{convertedLead}</div>
                    <p className="text-xs text-blue-700 dark:text-blue-300 mt-2">{lead.length > 0 ? Math.round((convertedLead / lead.length) * 100) : 0}% conversion rate</p>
                </div>

                {/* New Leads */}
                <div className="group rounded-xl bg-gradient-to-br from-purple-50 to-pink-100 dark:from-purple-950/40 dark:to-pink-900/20 p-6 border border-purple-200/50 dark:border-purple-800/50 shadow-sm hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
                    <div className="flex items-center justify-between mb-3">
                        <h3 className="text-sm font-semibold text-purple-900 dark:text-purple-200">New Leads</h3>
                        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-purple-500 to-pink-600 text-white shadow-md">
                            <UserPlus className="h-5 w-5" />
                        </div>
                    </div>
                    <div className="text-3xl font-bold text-purple-900 dark:text-purple-100">{newLead}</div>
                    <p className="text-xs text-purple-700 dark:text-purple-300 mt-2">Awaiting contact</p>
                </div>
            </div>

            {/* Toolbar */}
            <LeadToolbar onSearch={setSearchQuery} onAdd={handleAdd} />

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
                                {filteredLead.length} results
                            </span>
                        </div>
                        <p className="text-sm text-slate-600 dark:text-slate-400">
                            {searchQuery ? `Filtered results showing ${filteredLead.length} of ${lead.length}` : `Showing all ${lead.length} leads`}
                        </p>
                    </div>
                </div>

                <DataTable
                    data={filteredLead}
                    columns={
                        leadTableColumns
                    }
                    onView={handleView}
                    onEdit={handleEdit}
                    onDelete={handleDeleteClick}
                    showActions={true}
                />
            </div>

            {/* Empty State */}
            {filteredLead.length === 0 && (
                <div className="rounded-2xl border border-dashed border-slate-300 dark:border-slate-600 bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900/50 dark:to-slate-800/50 p-12 text-center">
                    <div className="flex h-16 w-16 items-center justify-center rounded-full bg-slate-200 dark:bg-slate-700 mx-auto mb-4">
                        <Users className="h-8 w-8 text-slate-600 dark:text-slate-400" />
                    </div>
                    <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">No leads found</h3>
                    <p className="text-slate-600 dark:text-slate-400 mb-6">Try adjusting your search criteria or add a new lead</p>
                    <button
                        onClick={handleAdd}
                        className="inline-flex items-center gap-2 rounded-lg bg-gradient-to-r from-blue-600 to-cyan-600 px-6 py-2 font-semibold text-white shadow-lg hover:shadow-xl transition-all duration-200 hover:from-blue-700 hover:to-cyan-700 transform hover:-translate-y-0.5"
                    >
                        <UserPlus className="h-4 w-4" />
                        Add Your First Lead
                    </button>
                </div>
            )}

            <DeleteCustomerDialog
                open={deleteDialog.open}
                customerName={deleteDialog.name || ""}
                onConfirm={handleConfirmDelete}
                onCancel={handleCancelDelete}
                isLoading={isDeleting}
            />
        </div>
    );
}
