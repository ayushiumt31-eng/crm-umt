import { useState, useMemo, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Plus,
  Search,
  MessageCircle,
  Mail,
  Phone,
  Calendar,
  FileText,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/common/DataTable";
import { communicationTableColumns } from "../components/CommunicationTableColumns";
import { DeleteCommunicationDialog } from "../components/DeleteCommunicationDialog";
import { communicationService } from "../services/communicationService";
import type { Communication } from "../types/communication";

export default function Communications() {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [typeFilter, setTypeFilter] = useState("ALL");
  const [statusFilter, setStatusFilter] = useState("ALL");
  const [deleteCommunication, setDeleteCommunication] =
    useState<Communication | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const [communications, setCommunications] = useState<Communication[]>([]);

  // Load communications on mount
  useEffect(() => {
    communicationService.getCommunications().then(setCommunications);
  }, []);

  // Refresh after delete
  const refreshCommunications = () => {
    communicationService.getCommunications().then(setCommunications);
  };

  const filteredCommunications = useMemo(() => {
    return communications.filter((comm) => {
      // Search
      const searchStr = searchTerm.toLowerCase();
      const matchesSearch =
        !searchTerm ||
        (comm.subject &&
          comm.subject.toLowerCase().includes(searchStr)) ||
        comm.message.toLowerCase().includes(searchStr) ||
        (comm.recipient &&
          comm.recipient.toLowerCase().includes(searchStr)) ||
        (comm.customerName &&
          comm.customerName.toLowerCase().includes(searchStr)) ||
        (comm.leadName &&
          comm.leadName.toLowerCase().includes(searchStr)) ||
        (comm.dealName &&
          comm.dealName.toLowerCase().includes(searchStr)) ||
        comm.assignedToName.toLowerCase().includes(searchStr);

      // Type filter
      const matchesType =
        typeFilter === "ALL" || comm.type === typeFilter;

      // Status filter
      const matchesStatus =
        statusFilter === "ALL" || comm.status === statusFilter;

      return matchesSearch && matchesType && matchesStatus;
    });
  }, [communications, searchTerm, typeFilter, statusFilter]);

  const handleDeleteClick = (id: string) => {
    const comm = communications.find((c) => c.id === id);
    if (comm) {
      setDeleteCommunication(comm);
    }
  };

  const handleDeleteConfirm = async () => {
    if (!deleteCommunication) return;
    setIsDeleting(true);
    try {
      await communicationService.deleteCommunication(deleteCommunication.id);
      setDeleteCommunication(null);
      refreshCommunications();
    } finally {
      setIsDeleting(false);
    }
  };

  // Compute stats
  const totalCommunications = communications.length;
  const emailCount = communications.filter((c) => c.type === "EMAIL").length;
  const callMeetingCount = communications.filter(
    (c) => c.type === "CALL" || c.type === "MEETING"
  ).length;
  const noteCount = communications.filter((c) => c.type === "NOTE").length;

  // Build columns with delete handler
  const columns = useMemo(() => {
    return communicationTableColumns.map((col) => {
      if (col.key === "id") {
        return {
          ...col,
          render: (_value: string, row: Communication) => (
            <div className="flex items-center gap-2">
              <button
                onClick={() => navigate(`/communications/${row.id}`)}
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
                onClick={() => navigate(`/communications/${row.id}/edit`)}
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
                  const comm = communications.find(
                    (c) => c.id === row.id
                  );
                  if (comm) setDeleteCommunication(comm);
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
  }, [navigate, communications]);

  return (
    <div className="space-y-8">
      {/* Header with gradient background */}
      <div className="rounded-2xl bg-gradient-to-r from-blue-600 via-cyan-500 to-blue-600 dark:from-blue-900 dark:via-cyan-900 dark:to-blue-900 p-8 shadow-lg overflow-hidden relative">
        <div className="absolute inset-0 opacity-20">
          <div
            className="absolute top-0 left-0 w-96 h-96 bg-white/20 rounded-full blur-3xl animate-pulse"
            style={{ animation: "pulse 6s ease-in-out infinite" }}
          ></div>
          <div
            className="absolute bottom-0 right-0 w-96 h-96 bg-cyan-300/20 rounded-full blur-3xl animate-pulse"
            style={{ animationDelay: "3s" }}
          ></div>
        </div>

        <div className="relative z-10">
          <div className="flex items-center gap-4 mb-4">
            <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-white/20 backdrop-blur-md text-white border border-white/30 shadow-lg transform transition-transform hover:scale-110">
              <MessageCircle className="h-7 w-7" />
            </div>
            <div>
              <h1 className="text-4xl font-bold text-white drop-shadow-lg">
                Communications
              </h1>
              <p className="text-cyan-100 text-lg">
                Track and manage all communication history
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Total Communications */}
        <div className="group rounded-xl bg-gradient-to-br from-blue-50 to-cyan-100 dark:from-blue-950/40 dark:to-cyan-900/20 p-6 border border-blue-200/50 dark:border-blue-800/50 shadow-sm hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-sm font-semibold text-blue-900 dark:text-blue-200">
              Total Communications
            </h3>
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-blue-500 to-cyan-600 text-white shadow-md">
              <MessageCircle className="h-5 w-5" />
            </div>
          </div>
          <div className="text-3xl font-bold text-blue-900 dark:text-blue-100">
            {totalCommunications}
          </div>
          <p className="text-xs text-blue-700 dark:text-blue-300 mt-2">
            All records
          </p>
        </div>

        {/* Emails */}
        <div className="group rounded-xl bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-950/40 dark:to-purple-900/20 p-6 border border-purple-200/50 dark:border-purple-800/50 shadow-sm hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-sm font-semibold text-purple-900 dark:text-purple-200">
              Emails
            </h3>
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-purple-500 to-purple-600 text-white shadow-md">
              <Mail className="h-5 w-5" />
            </div>
          </div>
          <div className="text-3xl font-bold text-purple-900 dark:text-purple-100">
            {emailCount}
          </div>
          <p className="text-xs text-purple-700 dark:text-purple-300 mt-2">
            Email communications
          </p>
        </div>

        {/* Calls & Meetings */}
        <div className="group rounded-xl bg-gradient-to-br from-orange-50 to-amber-100 dark:from-orange-950/40 dark:to-amber-900/20 p-6 border border-orange-200/50 dark:border-orange-800/50 shadow-sm hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-sm font-semibold text-orange-900 dark:text-orange-200">
              Calls & Meetings
            </h3>
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-orange-500 to-amber-600 text-white shadow-md">
              <Phone className="h-5 w-5" />
            </div>
          </div>
          <div className="text-3xl font-bold text-orange-900 dark:text-orange-100">
            {callMeetingCount}
          </div>
          <p className="text-xs text-orange-700 dark:text-orange-300 mt-2">
            Calls and meetings
          </p>
        </div>

        {/* Notes */}
        <div className="group rounded-xl bg-gradient-to-br from-emerald-50 to-emerald-100 dark:from-emerald-950/40 dark:to-emerald-900/20 p-6 border border-emerald-200/50 dark:border-emerald-800/50 shadow-sm hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-sm font-semibold text-emerald-900 dark:text-emerald-200">
              Notes
            </h3>
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-emerald-500 to-emerald-600 text-white shadow-md">
              <FileText className="h-5 w-5" />
            </div>
          </div>
          <div className="text-3xl font-bold text-emerald-900 dark:text-emerald-100">
            {noteCount}
          </div>
          <p className="text-xs text-emerald-700 dark:text-emerald-300 mt-2">
            Internal notes
          </p>
        </div>
      </div>

      {/* Filters & Toolbar */}
      <div className="rounded-2xl border border-slate-200/50 dark:border-slate-800/50 bg-white dark:bg-slate-900 shadow-sm overflow-hidden">
        {/* Title & Add Button */}
        <div className="px-6 py-4 border-b border-slate-200/50 dark:border-slate-800/50 bg-gradient-to-r from-blue-50/50 to-cyan-50/50 dark:from-blue-950/20 dark:to-cyan-950/20">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <MessageCircle className="h-5 w-5 text-blue-600 dark:text-blue-400" />
              <h2 className="font-bold text-slate-900 dark:text-white">
                All Communications
              </h2>
              <span className="inline-flex items-center rounded-full bg-blue-100 dark:bg-blue-900/50 px-3 py-1 text-sm font-semibold text-blue-700 dark:text-blue-300">
                {filteredCommunications.length} results
              </span>
            </div>
            <Button
              onClick={() => navigate("/communications/add")}
              className="gap-2"
            >
              <Plus className="h-4 w-4" />
              Add Communication
            </Button>
          </div>
        </div>

        {/* Search & Filters */}
        <div className="p-4 border-b border-slate-200/50 dark:border-slate-800/50 space-y-4">
          <div className="relative w-full md:w-96">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-slate-500" />
            <Input
              placeholder="Search communications..."
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
              <option value="CALL">Call</option>
              <option value="MEETING">Meeting</option>
              <option value="NOTE">Note</option>
            </select>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="h-10 rounded-md border border-slate-200 bg-white px-3 text-sm dark:border-slate-700 dark:bg-slate-900"
            >
              <option value="ALL">All Status</option>
              <option value="DRAFT">Draft</option>
              <option value="SENT">Sent</option>
              <option value="DELIVERED">Delivered</option>
              <option value="COMPLETED">Completed</option>
              <option value="FAILED">Failed</option>
            </select>
          </div>
        </div>

        <DataTable
          columns={columns}
          data={filteredCommunications}
          showActions={false}
        />
      </div>

      {/* Empty State */}
      {filteredCommunications.length === 0 && (
        <div className="rounded-2xl border border-dashed border-slate-300 dark:border-slate-600 bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900/50 dark:to-slate-800/50 p-12 text-center">
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-slate-200 dark:bg-slate-700 mx-auto mb-4">
            <MessageCircle className="h-8 w-8 text-slate-600 dark:text-slate-400" />
          </div>
          <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">
            No communications found
          </h3>
          <p className="text-slate-600 dark:text-slate-400 mb-6">
            Try adjusting your search or filter criteria, or log a new
            communication
          </p>
          <button
            onClick={() => navigate("/communications/add")}
            className="inline-flex items-center gap-2 rounded-lg bg-gradient-to-r from-blue-600 to-cyan-600 px-6 py-2 font-semibold text-white shadow-lg hover:shadow-xl transition-all duration-200 hover:from-blue-700 hover:to-cyan-700 transform hover:-translate-y-0.5"
          >
            <Plus className="h-4 w-4" />
            Log Your First Communication
          </button>
        </div>
      )}

      <DeleteCommunicationDialog
        communication={deleteCommunication}
        isOpen={!!deleteCommunication}
        onClose={() => setDeleteCommunication(null)}
        onConfirm={handleDeleteConfirm}
        isLoading={isDeleting}
      />
    </div>
  );
}

