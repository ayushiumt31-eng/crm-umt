import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { ArrowLeft, Edit3, Trash2, Workflow, Play, Pause, Copy, Activity } from "lucide-react";
import { Button } from "@/components/ui/button";
import { AutomationWorkflowPreview } from "../components/AutomationWorkflowPreview";
import { AutomationTimeline } from "../components/AutomationTimeline";
import { AutomationStatusBadge } from "../components/AutomationStatusBadge";
import { AutomationTriggerBadge } from "../components/AutomationTriggerBadge";
import { DeleteAutomationDialog } from "../components/DeleteAutomationDialog";
import { automationService } from "../services/automationService";
import { automationLogService } from "../services/automationLogService";
import type { Automation } from "../types/automation";
import type { AutomationLog } from "../types/automationLog";

export default function AutomationDetails() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [automation, setAutomation] = useState<Automation | null>(null);
  const [logs, setLogs] = useState<AutomationLog[]>([]);
  const [showDelete, setShowDelete] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;
    Promise.all([
      automationService.getAutomationById(id),
      automationLogService.getLogsByAutomation(id),
    ]).then(([a, l]) => {
      if (a) setAutomation(a);
      setLogs(l);
      setLoading(false);
    });
  }, [id]);

  const handleDelete = async () => {
    if (!id) return;
    setIsDeleting(true);
    try {
      await automationService.deleteAutomation(id);
      navigate("/marketing/automation");
    } finally {
      setIsDeleting(false);
    }
  };

  const handlePauseResume = async () => {
    if (!automation || !id) return;
    if (automation.status === "ACTIVE") {
      const updated = await automationService.pauseAutomation(id);
      setAutomation(updated);
    } else if (automation.status === "PAUSED") {
      const updated = await automationService.activateAutomation(id);
      setAutomation(updated);
    }
  };

  const handleDuplicate = async () => {
    if (!automation) return;
    await automationService.duplicateAutomation(automation.id);
    navigate("/marketing/automation");
  };

  if (loading) {
    return <div className="max-w-6xl mx-auto text-center py-12"><p className="text-slate-500">Loading...</p></div>;
  }

  if (!automation) {
    return (
      <div className="max-w-6xl mx-auto text-center py-12">
        <p className="text-slate-500">Automation not found.</p>
        <button onClick={() => navigate("/marketing/automation")} className="mt-4 text-indigo-600 hover:underline">Back to Automations</button>
      </div>
    );
  }

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
            <div className="flex-1">
              <h1 className="text-4xl font-bold text-white drop-shadow-lg">{automation.name}</h1>
              <p className="text-indigo-100 text-lg">Automation Details</p>
            </div>
            <div className="flex gap-2">
              {(automation.status === "ACTIVE" || automation.status === "PAUSED") && (
                <Button onClick={handlePauseResume}
                  className={`gap-2 bg-white/20 backdrop-blur-md text-white border border-white/30 hover:bg-white/30`}>
                  {automation.status === "ACTIVE" ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
                  {automation.status === "ACTIVE" ? "Pause" : "Resume"}
                </Button>
              )}
              <Button onClick={handleDuplicate}
                className="gap-2 bg-white/20 backdrop-blur-md text-white border border-white/30 hover:bg-white/30">
                <Copy className="h-4 w-4" /> Duplicate
              </Button>
              <Button onClick={() => navigate(`/marketing/automation/${id}/edit`)}
                className="gap-2 bg-white/20 backdrop-blur-md text-white border border-white/30 hover:bg-white/30">
                <Edit3 className="h-4 w-4" /> Edit
              </Button>
              <Button variant="ghost" size="icon" onClick={() => setShowDelete(true)}
                className="h-10 w-10 bg-red-500/20 backdrop-blur-md text-red-200 border border-red-300/30 hover:bg-red-500/30">
                <Trash2 className="h-5 w-5" />
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="xl:col-span-2 space-y-8">
          {/* Info Card */}
          <div className="rounded-2xl border border-slate-200/50 dark:border-slate-800/50 bg-white dark:bg-slate-900 shadow-sm overflow-hidden">
            <div className="px-6 py-4 border-b border-slate-200/50 dark:border-slate-800/50 bg-gradient-to-r from-indigo-50/50 to-purple-50/50 dark:from-indigo-950/20 dark:to-purple-950/20">
              <h3 className="font-bold text-slate-900 dark:text-white">Automation Information</h3>
            </div>
            <div className="p-6">
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                <div>
                  <p className="text-xs font-medium text-slate-500">Status</p>
                  <div className="mt-1"><AutomationStatusBadge status={automation.status} /></div>
                </div>
                <div>
                  <p className="text-xs font-medium text-slate-500">Trigger</p>
                  <div className="mt-1"><AutomationTriggerBadge trigger={automation.trigger} /></div>
                </div>
                <div>
                  <p className="text-xs font-medium text-slate-500">Conditions</p>
                  <p className="text-sm font-semibold text-slate-900 dark:text-white">
                    {automation.conditions.length > 0 ? `${automation.conditions.length} condition${automation.conditions.length > 1 ? "s" : ""} (${automation.conditionLogic})` : "No conditions"}
                  </p>
                </div>
                <div>
                  <p className="text-xs font-medium text-slate-500">Actions</p>
                  <p className="text-sm font-semibold text-slate-900 dark:text-white">{automation.actions.length} action{automation.actions.length > 1 ? "s" : ""}</p>
                </div>
                <div>
                  <p className="text-xs font-medium text-slate-500">Total Executions</p>
                  <p className="text-sm font-semibold text-slate-900 dark:text-white">{automation.executionCount.toLocaleString()}</p>
                </div>
                <div>
                  <p className="text-xs font-medium text-slate-500">Created By</p>
                  <p className="text-sm font-semibold text-slate-900 dark:text-white">{automation.createdByName}</p>
                </div>
              </div>
              {automation.description && (
                <div className="mt-4">
                  <p className="text-xs font-medium text-slate-500">Description</p>
                  <p className="text-sm text-slate-700 dark:text-slate-300 mt-1">{automation.description}</p>
                </div>
              )}
              {automation.notes && (
                <div className="mt-4">
                  <p className="text-xs font-medium text-slate-500">Notes</p>
                  <p className="text-sm text-slate-700 dark:text-slate-300 mt-1">{automation.notes}</p>
                </div>
              )}
            </div>
          </div>

          {/* Execution Logs */}
          <div className="rounded-2xl border border-slate-200/50 dark:border-slate-800/50 bg-white dark:bg-slate-900 shadow-sm overflow-hidden">
            <div className="px-6 py-4 border-b border-slate-200/50 dark:border-slate-800/50 bg-gradient-to-r from-amber-50/50 to-yellow-50/50 dark:from-amber-950/20 dark:to-yellow-950/20">
              <h3 className="font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <Activity className="h-5 w-5 text-amber-600 dark:text-amber-400" />
                Recent Execution Logs
              </h3>
            </div>
            <div className="p-6">
              <AutomationTimeline logs={logs} />
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-8">
          {/* Workflow Preview */}
          <div className="rounded-2xl border border-slate-200/50 dark:border-slate-800/50 bg-white dark:bg-slate-900 shadow-sm overflow-hidden">
            <div className="px-6 py-4 border-b border-slate-200/50 dark:border-slate-800/50 bg-gradient-to-r from-blue-50/50 to-cyan-50/50 dark:from-blue-950/20 dark:to-cyan-950/20">
              <h3 className="font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <Workflow className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                Workflow
              </h3>
            </div>
            <div className="p-6">
              <AutomationWorkflowPreview
                trigger={automation.trigger}
                conditions={automation.conditions}
                conditionLogic={automation.conditionLogic}
                actions={automation.actions}
              />
            </div>
          </div>

          {/* Quick Stats */}
          <div className="rounded-2xl border border-slate-200/50 dark:border-slate-800/50 bg-white dark:bg-slate-900 shadow-sm overflow-hidden">
            <div className="px-6 py-4 border-b border-slate-200/50 dark:border-slate-800/50 bg-gradient-to-r from-emerald-50/50 to-teal-50/50 dark:from-emerald-950/20 dark:to-teal-950/20">
              <h3 className="font-bold text-slate-900 dark:text-white">Performance</h3>
            </div>
            <div className="p-6 grid grid-cols-2 gap-4">
              <div className="p-3 rounded-lg bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800">
                <p className="text-xs font-medium text-green-600 dark:text-green-400">Success</p>
                <p className="text-xl font-bold text-green-700 dark:text-green-300">{automation.successCount.toLocaleString()}</p>
              </div>
              <div className="p-3 rounded-lg bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800">
                <p className="text-xs font-medium text-red-600 dark:text-red-400">Failed</p>
                <p className="text-xl font-bold text-red-700 dark:text-red-300">{automation.failedCount.toLocaleString()}</p>
              </div>
              <div className="p-3 rounded-lg bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800">
                <p className="text-xs font-medium text-blue-600 dark:text-blue-400">Executions</p>
                <p className="text-xl font-bold text-blue-700 dark:text-blue-300">{automation.executionCount.toLocaleString()}</p>
              </div>
              <div className="p-3 rounded-lg bg-purple-50 dark:bg-purple-900/20 border border-purple-200 dark:border-purple-800">
                <p className="text-xs font-medium text-purple-600 dark:text-purple-400">Actions</p>
                <p className="text-xl font-bold text-purple-700 dark:text-purple-300">{automation.actions.length}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <DeleteAutomationDialog title="Automation" isOpen={showDelete} onClose={() => setShowDelete(false)} onConfirm={handleDelete} isLoading={isDeleting} />
    </div>
  );
}
