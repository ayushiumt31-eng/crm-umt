import { useNavigate } from "react-router-dom";
import { ArrowLeft, Workflow, Layers, Plus, Sparkles } from "lucide-react";
import { AutomationWorkflowPreview } from "../components/AutomationWorkflowPreview";
import { dummyAutomationTemplates } from "../data/dummy-automation-templates";

export default function AutomationTemplates() {
  const navigate = useNavigate();

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="rounded-2xl bg-gradient-to-r from-purple-600 via-indigo-500 to-purple-600 dark:from-purple-900 dark:via-indigo-900 dark:to-purple-900 p-8 shadow-lg overflow-hidden relative">
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
              <Layers className="h-7 w-7" />
            </div>
            <div>
              <h1 className="text-4xl font-bold text-white drop-shadow-lg">Automation Templates</h1>
              <p className="text-indigo-100 text-lg">Start from pre-built automation workflows</p>
            </div>
          </div>
        </div>
      </div>

      {/* Template Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {dummyAutomationTemplates.map((template) => (
          <div
            key={template.id}
            className="rounded-2xl border border-slate-200/50 dark:border-slate-800/50 bg-white dark:bg-slate-900 shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden flex flex-col"
          >
            <div className="px-6 py-4 border-b border-slate-200/50 dark:border-slate-800/50 bg-gradient-to-r from-purple-50/50 to-indigo-50/50 dark:from-purple-950/20 dark:to-indigo-950/20">
              <div className="flex items-center gap-2 mb-1">
                <Sparkles className="h-4 w-4 text-purple-600 dark:text-purple-400" />
                <span className="text-xs font-semibold text-purple-600 dark:text-purple-400 uppercase tracking-wide">
                  {template.category}
                </span>
              </div>
              <h3 className="font-bold text-slate-900 dark:text-white">{template.name}</h3>
              <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">{template.description}</p>
            </div>
            <div className="p-6 flex-1">
              <AutomationWorkflowPreview
                trigger={template.defaultValues.trigger!}
                conditions={template.defaultValues.conditions || []}
                conditionLogic={template.defaultValues.conditionLogic || "AND"}
                actions={template.defaultValues.actions || []}
              />
            </div>
            <div className="px-6 py-4 border-t border-slate-200/50 dark:border-slate-800/50 bg-slate-50 dark:bg-slate-900/50">
              <button
                onClick={() => navigate("/marketing/automation/add")}
                className="w-full inline-flex items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-purple-600 to-indigo-600 px-4 py-2 font-semibold text-white shadow-md hover:shadow-lg transition-all duration-200 text-sm"
              >
                <Plus className="h-4 w-4" /> Use Template
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Disclaimer */}
      <div className="rounded-xl bg-gradient-to-br from-amber-50 to-yellow-50 dark:from-amber-950/20 dark:to-yellow-950/20 border border-amber-200 dark:border-amber-800 p-4">
        <p className="text-sm text-amber-700 dark:text-amber-300">
          <strong>Note:</strong> Templates provide pre-configured automation workflows. You can customize them after creation.
        </p>
      </div>
    </div>
  );
}
