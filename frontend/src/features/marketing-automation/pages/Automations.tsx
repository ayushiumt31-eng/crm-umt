import { useState, useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { Plus, Search, Workflow, ArrowLeft, Play, Pause, Copy, Eye, Edit3, Trash2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/common/DataTable";
import { automationTableColumns } from "../components/AutomationTableColumns";
import { DeleteAutomationDialog } from "../components/DeleteAutomationDialog";
import { automationService } from "../services/automationService";
import type { Automation } from "../types/automation";

export default function Automations() {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("ALL");
  const [triggerFilter, setTriggerFilter] = useState("ALL");
  const [deleteItem, setDeleteItem] = useState<Automation | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const [automations, setAutomations] = useState<Automation[]>([]);

  useEffect(() => {
    automationService.getAutomations().then(setAutomations);
  }, []);

  const refreshData = () => {
    automationService.getAutomations().then(setAutomations);
  };

  const filteredData = useMemo(() => {
    return automations.filter((a) => {
      const searchStr = searchTerm.toLowerCase();
      const matchesSearch =
        !searchTerm ||
        a.name.toLowerCase().includes(searchStr) ||
        a.description.toLowerCase().includes(searchStr) ||
        a.createdByName.toLowerCase().includes(searchStr);
      const matchesStatus = statusFilter === "ALL" || a.status === statusFilter;
      const matchesTrigger = triggerFilter === "ALL" || a.trigger === triggerFilter;
      return matchesSearch && matchesStatus && matchesTrigger;
    });
  }, [automations, searchTerm, statusFilter, triggerFilter]);

  const handleDeleteConfirm = async () => {
    if (!deleteItem) return;
    setIsDeleting(true);
    try {
      await automationService.deleteAutomation(deleteItem.id);
      setDeleteItem(null);
      refreshData();
    } finally {
      setIsDeleting(false);
    }
  };

  const handlePauseResume = async (auto: Automation) => {
    if (auto.status === "ACTIVE") {
      await automationService.pauseAutomation(auto.id);
    } else if (auto.status === "PAUSED") {
      await automationService.activateAutomation(auto.id);
    }
    refreshData();
  };

  const handleDuplicate = async (auto: Automation) => {
    await automationService.duplicateAutomation(auto.id);
    refreshData();
  };

  const columns = useMemo(() => {
    return automationTableColumns.map((col) => {
      if (col.key === "id") {
        return {
          ...col,
          render: (_value: string, row: Automation) => (
            <div className="flex items-center gap-2">
              {(row.status === "ACTIVE" || row.status === "PAUSED") && (
                <button
                  onClick={() => handlePauseResume(row)}
                  title={row.status === "ACTIVE" ? "Pause" : "Resume"}
                  className={`h-8 w-8 flex items-center justify-center rounded-md hover:bg-amber-100 dark:hover:bg-amber-900/30 ${
                    row.status === "ACTIVE"
                      ? "text-amber-600 dark:text-amber-400"
                      : "text-green-600 dark:text-green-400"
                  }`}
                >
                  {row.status === "ACTIVE" ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
                </button>
              )}
              <button
                onClick={() => navigate(`/marketing/automation/${row.id}`)}
                title="View"
                className="h-8 w-8 flex items-center justify-center rounded-md hover:bg-blue-100 dark:hover:bg-blue-900/30 text-blue-600 dark:text-blue-400"
              >
                <Eye className="h-4 w-4" />
              </button>
              <button
                onClick={() => navigate(`/marketing/automation/${row.id}/edit`)}
                title="Edit"
                className="h-8 w-8 flex items-center justify-center rounded-md hover:bg-cyan-100 dark:hover:bg-cyan-900/30 text-cyan-600 dark:text-cyan-400"
              >
                <Edit3 className="h-4 w-4" />
              </button>
              <button
                onClick={() => handleDuplicate(row)}
                title="Duplicate"
                className="h-8 w-8 flex items-center justify-center rounded-md hover:bg-purple-100 dark:hover:bg-purple-900/30 text-purple-600 dark:text-purple-400"
              >
                <Copy className="h-4 w-4" />
              </button>
              <button
                title="Delete"
                className="h-8 w-8 flex items-center justify-center rounded-md hover:bg-red-100 dark:hover:bg-red-900/30 text-red-600 dark:text-red-400"
                onClick={() => { const item = automations.find((x) => x.id === row.id); if (item) setDeleteItem(item); }}
              >
                <Trash2 className="h-4 w-4" />
              </button>
            </div>
          ),
        };
      }
      return col;
    });
  }, [navigate, automations]);

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="rounded-2xl bg-gradient-to-r from-indigo-600 via-purple-500 to-indigo-600 dark:from-indigo-900 dark:via-purple-900 dark:to-indigo-900 p-8 shadow-lg overflow-hidden relative">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-0 left-0 w-96 h-96 bg-white/20 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-purple-300/20 rounded-full blur-3xl animate-pulse" />
        </div>
        <div className="relative z-10">
          <div className="flex items-center gap-4 mb-4">
            <button onClick={() => navigate("/marketing/automation")}
              className="flex h-10 w-10 items-center justify-center rounded-lg bg-white/20 backdrop-blur-md text-white border border-white/30 shadow-lg hover:bg-white/30 transition-all" title="Back">
              <ArrowLeft className="h-5 w-5" />
            </button>
            <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-white/20 backdrop-blur-md text-white border border-white/30 shadow-lg">
              <Workflow className="h-7 w-7" />
            </div>
            <div>
              <h1 className="text-4xl font-bold text-white drop-shadow-lg">Automations</h1>
              <p className="text-indigo-100 text-lg">Manage automation workflows</p>
            </div>
          </div>
        </div>
      </div>

      {/* Filters & Toolbar */}
      <div className="rounded-2xl border border-slate-200/50 dark:border-slate-800/50 bg-white dark:bg-slate-900 shadow-sm overflow-hidden">
        <div className="px-6 py-4 border-b border-slate-200/50 dark:border-slate-800/50 bg-gradient-to-r from-indigo-50/50 to-purple-50/50 dark:from-indigo-950/20 dark:to-purple-950/20">
          <div className="flex items-center justify-between flex-wrap gap-2">
            <div className="flex items-center gap-2">
              <Workflow className="h-5 w-5 text-indigo-600 dark:text-indigo-400" />
              <h2 className="font-bold text-slate-900 dark:text-white">All Automations</h2>
              <span className="inline-flex items-center rounded-full bg-indigo-100 dark:bg-indigo-900/50 px-3 py-1 text-sm font-semibold text-indigo-700 dark:text-indigo-300">{filteredData.length} results</span>
            </div>
            <Button onClick={() => navigate("/marketing/automation/add")} className="gap-2">
              <Plus className="h-4 w-4" /> Create Automation
            </Button>
          </div>
        </div>

        <div className="p-4 border-b border-slate-200/50 dark:border-slate-800/50 space-y-4">
          <div className="relative w-full md:w-96">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-slate-500" />
            <Input placeholder="Search automations..." className="pl-9" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
          </div>
          <div className="flex flex-wrap gap-3">
            <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}
              className="h-10 rounded-md border border-slate-200 bg-white px-3 text-sm dark:border-slate-700 dark:bg-slate-900">
              <option value="ALL">All Status</option>
              <option value="DRAFT">Draft</option>
              <option value="ACTIVE">Active</option>
              <option value="INACTIVE">Inactive</option>
              <option value="PAUSED">Paused</option>
            </select>
            <select value={triggerFilter} onChange={(e) => setTriggerFilter(e.target.value)}
              className="h-10 rounded-md border border-slate-200 bg-white px-3 text-sm dark:border-slate-700 dark:bg-slate-900">
              <option value="ALL">All Triggers</option>
              <option value="NEW_LEAD_CREATED">New Lead Created</option>
              <option value="LEAD_STATUS_CHANGED">Lead Status Changed</option>
              <option value="LEAD_STAGE_CHANGED">Lead Stage Changed</option>
              <option value="CUSTOMER_CREATED">Customer Created</option>
              <option value="CUSTOMER_STATUS_CHANGED">Customer Status Changed</option>
              <option value="DEAL_CREATED">Deal Created</option>
              <option value="DEAL_STATUS_CHANGED">Deal Status Changed</option>
              <option value="DEAL_WON">Deal Won</option>
              <option value="DEAL_LOST">Deal Lost</option>
              <option value="TASK_COMPLETED">Task Completed</option>
              <option value="TASK_OVERDUE">Task Overdue</option>
              <option value="CAMPAIGN_COMPLETED">Campaign Completed</option>
            </select>
          </div>
        </div>

        <DataTable columns={columns} data={filteredData} showActions={false} />
      </div>

      {/* Empty State */}
      {filteredData.length === 0 && (
        <div className="rounded-2xl border border-dashed border-slate-300 dark:border-slate-600 bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900/50 dark:to-slate-800/50 p-12 text-center">
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-slate-200 dark:bg-slate-700 mx-auto mb-4">
            <Workflow className="h-8 w-8 text-slate-600 dark:text-slate-400" />
          </div>
          <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">No automations found</h3>
          <p className="text-slate-600 dark:text-slate-400 mb-6">Try adjusting your search or filter criteria</p>
          <button onClick={() => navigate("/marketing/automation/add")}
            className="inline-flex items-center gap-2 rounded-lg bg-gradient-to-r from-indigo-600 to-purple-600 px-6 py-2 font-semibold text-white shadow-lg hover:shadow-xl transition-all duration-200">
            <Plus className="h-4 w-4" /> Create Your First Automation
          </button>
        </div>
      )}

      <DeleteAutomationDialog title="Automation" isOpen={!!deleteItem} onClose={() => setDeleteItem(null)} onConfirm={handleDeleteConfirm} isLoading={isDeleting} />
    </div>
  );
}
