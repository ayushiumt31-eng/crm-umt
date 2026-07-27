import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Workflow, History, Layers, Plus, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
import { AutomationStatsCard } from "../components/AutomationStatsCard";
import { automationService } from "../services/automationService";
import type { Automation } from "../types/automation";

export default function MarketingAutomation() {
  const navigate = useNavigate();
  const [automations, setAutomations] = useState<Automation[]>([]);

  useEffect(() => {
    automationService.getAutomations().then(setAutomations);
  }, []);

  const quickLinks = [
    { title: "Automations", description: "Manage automation workflows", icon: Workflow, path: "/marketing/automation/list", gradient: "from-blue-500 to-blue-600", bg: "from-blue-50 to-blue-100 dark:from-blue-950/40 dark:to-blue-900/20" },
    { title: "Templates", description: "Start from pre-built templates", icon: Layers, path: "/marketing/automation/templates", gradient: "from-purple-500 to-purple-600", bg: "from-purple-50 to-purple-100 dark:from-purple-950/40 dark:to-purple-900/20" },
    { title: "Execution Logs", description: "View automation execution history", icon: History, path: "/marketing/automation/logs", gradient: "from-amber-500 to-amber-600", bg: "from-amber-50 to-amber-100 dark:from-amber-950/40 dark:to-amber-900/20" },
  ];

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
            <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-white/20 backdrop-blur-md text-white border border-white/30 shadow-lg">
              <Workflow className="h-7 w-7" />
            </div>
            <div>
              <h1 className="text-4xl font-bold text-white drop-shadow-lg">Marketing Automation</h1>
              <p className="text-indigo-100 text-lg">Create and manage automated workflows</p>
            </div>
          </div>
        </div>
      </div>

      {/* Stats */}
      <AutomationStatsCard automations={automations} />

      {/* Quick Links */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {quickLinks.map((link) => {
          const Icon = link.icon;
          return (
            <button
              key={link.title}
              onClick={() => navigate(link.path)}
              className={`group rounded-xl bg-gradient-to-br ${link.bg} p-6 border border-slate-200/50 dark:border-slate-800/50 shadow-sm hover:shadow-lg transition-all duration-300 text-left hover:-translate-y-1`}
            >
              <div className="flex items-center gap-4 mb-3">
                <div className={`flex h-12 w-12 items-center justify-center rounded-lg bg-gradient-to-br ${link.gradient} text-white shadow-md`}>
                  <Icon className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="font-bold text-slate-900 dark:text-white">{link.title}</h3>
                  <p className="text-sm text-slate-600 dark:text-slate-400">{link.description}</p>
                </div>
              </div>
              <div className="flex items-center gap-1 text-sm font-medium text-indigo-600 dark:text-indigo-400 opacity-0 group-hover:opacity-100 transition-opacity">
                <span>Go to {link.title}</span>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
              </div>
            </button>
          );
        })}
      </div>

      {/* CTA */}
      <div className="rounded-2xl border border-dashed border-slate-300 dark:border-slate-600 bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900/50 dark:to-slate-800/50 p-12 text-center">
        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-slate-200 dark:bg-slate-700 mx-auto mb-4">
          <Workflow className="h-8 w-8 text-slate-600 dark:text-slate-400" />
        </div>
        <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">Ready to automate?</h3>
        <p className="text-slate-600 dark:text-slate-400 mb-6">Create your first automation workflow or start from a template</p>
        <div className="flex flex-wrap gap-3 justify-center">
          <Button onClick={() => navigate("/marketing/automation/add")} className="gap-2">
            <Plus className="h-4 w-4" /> Create Automation
          </Button>
          <Button variant="outline" onClick={() => navigate("/marketing/automation/templates")} className="gap-2">
            <FileText className="h-4 w-4" /> Browse Templates
          </Button>
        </div>
        <p className="text-xs text-slate-500 mt-6">
          Automation rules and triggers are configured locally. Actual execution will be handled by the backend.
        </p>
      </div>

      {/* Disclaimer */}
      <div className="rounded-xl bg-gradient-to-br from-amber-50 to-yellow-50 dark:from-amber-950/20 dark:to-yellow-950/20 border border-amber-200 dark:border-amber-800 p-4">
        <p className="text-sm text-amber-700 dark:text-amber-300">
          <strong>Demo automations</strong> &mdash; these are sample workflows. Real automation execution will be available after backend integration.
        </p>
      </div>
    </div>
  );
}
