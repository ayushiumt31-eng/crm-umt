import { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { DataTable } from "@/components/common/DataTable";
import { DeleteCustomerDialog } from "@/features/customers/components/DeleteCustomerDialog";
import { useDebounce } from "@/hooks";
import type { Deal } from "../types/deal";
import { Briefcase, TrendingUp, CheckCircle, Handshake, AlertCircle, Plus } from "lucide-react";
import { dummyDeals } from "../data/dummy-deals";
import { dealsTableColumns } from "../components/DealsTableColumns";
import { DealToolbar } from "../components/DealToolbar";

export default function Deals() {
    const navigate = useNavigate();
    const [deals, setDeals] = useState<Deal[]>(dummyDeals);
    const [searchQuery, setSearchQuery] = useState("");
    const [deleteDialog, setDeleteDialog] = useState<{ open: boolean; id?: string; name?: string }>({ open: false });
    const [isDeleting, setIsDeleting] = useState(false);
    const debouncedSearch = useDebounce(searchQuery, 300);

    // Filter deals based on search query
    const filteredDeals = useMemo(() => {
        if (!debouncedSearch) return deals;

        return deals.filter(
            (d) =>
                d.title.toLowerCase().includes(debouncedSearch.toLowerCase()) ||
                d.company.toLowerCase().includes(debouncedSearch.toLowerCase()) ||
                d.contactPerson.toLowerCase().includes(debouncedSearch.toLowerCase())
        );
    }, [deals, debouncedSearch]);

    // Calculate stats
    const activeDeals = deals.filter((d) =>
        d.stage === "QUALIFICATION" || d.stage === "PROPOSAL" || d.stage === "NEGOTIATION"
    ).length;
    const wonDeals = deals.filter((d) => d.stage === "CLOSED_WON").length;
    const lostDeals = deals.filter((d) => d.stage === "CLOSED_LOST").length;
    const prospectingDeals = deals.filter((d) => d.stage === "PROSPECTING").length;

    const totalValue = deals.reduce((acc, curr) => acc + curr.value, 0);

    const handleView = (id: string) => {
        navigate(`/deals/${id}`);
    };

    const handleEdit = (id: string) => {
        navigate(`/deals/${id}/edit`);
    };

    const handleAdd = () => {
        navigate("/deals/add");
    };

    const handleDeleteClick = (id: string) => {
        const selectedDeal = deals.find((d) => d.id === id);
        setDeleteDialog({
            open: true,
            id,
            name: selectedDeal?.title,
        });
    };

    const handleConfirmDelete = async () => {
        if (!deleteDialog.id) return;
        setIsDeleting(true);
        await new Promise((resolve) => setTimeout(resolve, 500));
        setDeals((prev) => prev.filter((d) => d.id !== deleteDialog.id));
        setDeleteDialog({ open: false });
        setIsDeleting(false);
    };

    const handleCancelDelete = () => {
        setDeleteDialog({ open: false });
    };

    return (
        <div className="space-y-8">
            {/* Header with gradient background */}
            <div className="rounded-2xl bg-gradient-to-r from-indigo-600 via-purple-500 to-indigo-600 dark:from-indigo-900 dark:via-purple-900 dark:to-indigo-900 p-8 shadow-lg overflow-hidden relative">
                <div className="absolute inset-0 opacity-20">
                    <div className="absolute top-0 left-0 w-96 h-96 bg-white/20 rounded-full blur-3xl animate-pulse" style={{ animation: "pulse 6s ease-in-out infinite" }}></div>
                    <div className="absolute bottom-0 right-0 w-96 h-96 bg-purple-300/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: "3s" }}></div>
                </div>

                <div className="relative z-10">
                    <div className="flex items-center gap-4 mb-4">
                        <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-white/20 backdrop-blur-md text-white border border-white/30 shadow-lg transform transition-transform hover:scale-110">
                            <Briefcase className="h-7 w-7" />
                        </div>
                        <div>
                            <h1 className="text-4xl font-bold text-white drop-shadow-lg">Deals</h1>
                            <p className="text-indigo-100 text-lg">Manage your sales pipeline and opportunities</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {/* Total Value */}
                <div className="group rounded-xl bg-gradient-to-br from-indigo-50 to-indigo-100 dark:from-indigo-950/40 dark:to-indigo-900/20 p-6 border border-indigo-200/50 dark:border-indigo-800/50 shadow-sm hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
                    <div className="flex items-center justify-between mb-3">
                        <h3 className="text-sm font-semibold text-indigo-900 dark:text-indigo-200">Pipeline Value</h3>
                        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-indigo-500 to-indigo-600 text-white shadow-md">
                            <TrendingUp className="h-5 w-5" />
                        </div>
                    </div>
                    <div className="text-3xl font-bold text-indigo-900 dark:text-indigo-100">${totalValue.toLocaleString()}</div>
                    <p className="text-xs text-indigo-700 dark:text-indigo-300 mt-2">Total across {deals.length} deals</p>
                </div>

                {/* Active Deals */}
                <div className="group rounded-xl bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-950/40 dark:to-blue-900/20 p-6 border border-blue-200/50 dark:border-blue-800/50 shadow-sm hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
                    <div className="flex items-center justify-between mb-3">
                        <h3 className="text-sm font-semibold text-blue-900 dark:text-blue-200">Active Deals</h3>
                        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-blue-500 to-blue-600 text-white shadow-md">
                            <Handshake className="h-5 w-5" />
                        </div>
                    </div>
                    <div className="text-3xl font-bold text-blue-900 dark:text-blue-100">{activeDeals}</div>
                    <p className="text-xs text-blue-700 dark:text-blue-300 mt-2">In active negotiation</p>
                </div>

                {/* Won Deals */}
                <div className="group rounded-xl bg-gradient-to-br from-emerald-50 to-emerald-100 dark:from-emerald-950/40 dark:to-emerald-900/20 p-6 border border-emerald-200/50 dark:border-emerald-800/50 shadow-sm hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
                    <div className="flex items-center justify-between mb-3">
                        <h3 className="text-sm font-semibold text-emerald-900 dark:text-emerald-200">Closed Won</h3>
                        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-emerald-500 to-emerald-600 text-white shadow-md">
                            <CheckCircle className="h-5 w-5" />
                        </div>
                    </div>
                    <div className="text-3xl font-bold text-emerald-900 dark:text-emerald-100">{wonDeals}</div>
                    <p className="text-xs text-emerald-700 dark:text-emerald-300 mt-2">{deals.length > 0 ? Math.round((wonDeals / deals.length) * 100) : 0}% win rate</p>
                </div>

                {/* Prospecting */}
                <div className="group rounded-xl bg-gradient-to-br from-purple-50 to-pink-100 dark:from-purple-950/40 dark:to-pink-900/20 p-6 border border-purple-200/50 dark:border-purple-800/50 shadow-sm hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
                    <div className="flex items-center justify-between mb-3">
                        <h3 className="text-sm font-semibold text-purple-900 dark:text-purple-200">Prospecting</h3>
                        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-purple-500 to-pink-600 text-white shadow-md">
                            <AlertCircle className="h-5 w-5" />
                        </div>
                    </div>
                    <div className="text-3xl font-bold text-purple-900 dark:text-purple-100">{prospectingDeals}</div>
                    <p className="text-xs text-purple-700 dark:text-purple-300 mt-2">New opportunities</p>
                </div>
            </div>

            {/* Toolbar */}
            <DealToolbar onSearch={setSearchQuery} onAdd={handleAdd} />

            {/* Table */}
            <div className="rounded-2xl border border-slate-200/50 dark:border-slate-800/50 bg-white dark:bg-slate-900 shadow-sm overflow-hidden">
                <div className="px-6 py-4 border-b border-slate-200/50 dark:border-slate-800/50 bg-gradient-to-r from-indigo-50/50 to-purple-50/50 dark:from-indigo-950/20 dark:to-purple-950/20">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                            <Briefcase className="h-5 w-5 text-indigo-600 dark:text-indigo-400" />
                            <h2 className="font-bold text-slate-900 dark:text-white">
                                All Deals
                            </h2>
                            <span className="inline-flex items-center rounded-full bg-indigo-100 dark:bg-indigo-900/50 px-3 py-1 text-sm font-semibold text-indigo-700 dark:text-indigo-300">
                                {filteredDeals.length} results
                            </span>
                        </div>
                        <p className="text-sm text-slate-600 dark:text-slate-400">
                            {searchQuery ? `Filtered results showing ${filteredDeals.length} of ${deals.length}` : `Showing all ${deals.length} deals`}
                        </p>
                    </div>
                </div>

                <DataTable
                    data={filteredDeals}
                    columns={dealsTableColumns}
                    onView={handleView}
                    onEdit={handleEdit}
                    onDelete={handleDeleteClick}
                    showActions={true}
                />
            </div>

            {/* Empty State */}
            {filteredDeals.length === 0 && (
                <div className="rounded-2xl border border-dashed border-slate-300 dark:border-slate-600 bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900/50 dark:to-slate-800/50 p-12 text-center">
                    <div className="flex h-16 w-16 items-center justify-center rounded-full bg-slate-200 dark:bg-slate-700 mx-auto mb-4">
                        <Briefcase className="h-8 w-8 text-slate-600 dark:text-slate-400" />
                    </div>
                    <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">No deals found</h3>
                    <p className="text-slate-600 dark:text-slate-400 mb-6">Try adjusting your search criteria or add a new deal</p>
                    <button
                        onClick={handleAdd}
                        className="inline-flex items-center gap-2 rounded-lg bg-gradient-to-r from-indigo-600 to-purple-600 px-6 py-2 font-semibold text-white shadow-lg hover:shadow-xl transition-all duration-200 hover:from-indigo-700 hover:to-purple-700 transform hover:-translate-y-0.5"
                    >
                        <Plus className="h-4 w-4" />
                        Create Deal
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
