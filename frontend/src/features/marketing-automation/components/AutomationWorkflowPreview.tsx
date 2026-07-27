import { ArrowDown } from "lucide-react";
import type { AutomationTrigger } from "../config/triggers";
import type { AutomationActionType } from "../config/actions";
import type { AutomationCondition, AutomationAction } from "../types/automation";
import { getTriggerLabel } from "../config/triggers";
import { getActionLabel } from "../config/actions";
import { getConditionFieldLabel } from "../config/conditions";
import { AutomationTriggerBadge } from "./AutomationTriggerBadge";
import { AutomationActionBadge } from "./AutomationActionBadge";

interface AutomationWorkflowPreviewProps {
  trigger: AutomationTrigger;
  conditions: AutomationCondition[];
  conditionLogic: "AND" | "OR";
  actions: AutomationAction[];
}

export function AutomationWorkflowPreview({
  trigger,
  conditions,
  conditionLogic,
  actions,
}: AutomationWorkflowPreviewProps) {
  const sortedActions = [...actions].sort((a, b) => a.order - b.order);

  return (
    <div className="space-y-2">
      {/* Trigger */}
      <div className="flex items-start gap-3">
        <div className="flex flex-col items-center">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-green-100 dark:bg-green-900/50 border-2 border-green-300 dark:border-green-700">
            <span className="text-green-700 dark:text-green-300 font-bold text-sm">T</span>
          </div>
          <div className="w-0.5 h-8 bg-green-300 dark:bg-green-700" />
        </div>
        <div className="flex-1 pt-1">
          <p className="text-xs font-semibold text-green-600 dark:text-green-400 uppercase tracking-wide">Trigger</p>
          <p className="text-sm font-semibold text-slate-900 dark:text-white mt-0.5">
            {getTriggerLabel(trigger)}
          </p>
        </div>
      </div>

      {/* Conditions */}
      {conditions.length > 0 && (
        <div className="flex items-start gap-3">
          <div className="flex flex-col items-center">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-amber-100 dark:bg-amber-900/50 border-2 border-amber-300 dark:border-amber-700">
              <span className="text-amber-700 dark:text-amber-300 font-bold text-sm">C</span>
            </div>
            <div className="w-0.5 h-8 bg-amber-300 dark:bg-amber-700" />
          </div>
          <div className="flex-1 pt-1 space-y-1">
            <p className="text-xs font-semibold text-amber-600 dark:text-amber-400 uppercase tracking-wide">Conditions</p>
            {conditions.map((cond, idx) => (
              <div key={cond.id} className="flex items-center gap-1.5 flex-wrap">
                <span className="text-sm font-medium text-slate-700 dark:text-slate-300">
                  {getConditionFieldLabel(cond.field)}
                </span>
                <span className="text-xs text-slate-500">{cond.operator.replace(/_/g, " ")}</span>
                <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-semibold bg-amber-50 dark:bg-amber-900/30 text-amber-700 dark:text-amber-300 border border-amber-200 dark:border-amber-700">
                  {cond.value}
                </span>
                {idx < conditions.length - 1 && (
                  <span className="text-xs font-bold text-slate-500 uppercase mx-1">{conditionLogic}</span>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Arrow between conditions and actions */}
      <div className="flex justify-center py-1">
        <ArrowDown className="h-4 w-4 text-slate-400" />
      </div>

      {/* Actions */}
      {sortedActions.map((action, idx) => (
        <div key={action.id} className="flex items-start gap-3">
          <div className="flex flex-col items-center">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-100 dark:bg-blue-900/50 border-2 border-blue-300 dark:border-blue-700">
              <span className="text-blue-700 dark:text-blue-300 font-bold text-sm">A{idx + 1}</span>
            </div>
            {idx < sortedActions.length - 1 && <div className="w-0.5 h-8 bg-blue-300 dark:bg-blue-700" />}
          </div>
          <div className="flex-1 pt-1">
            <p className="text-xs font-semibold text-blue-600 dark:text-blue-400 uppercase tracking-wide">
              Action {idx + 1}
            </p>
            <div className="mt-0.5">
              <AutomationActionBadge action={action.type} />
              {action.type === "CREATE_TASK" && action.config.taskTitle && (
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                  Task: {action.config.taskTitle}
                </p>
              )}
              {action.type === "SEND_EMAIL" && action.config.emailTemplate && (
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                  Template: {action.config.emailTemplate}
                </p>
              )}
              {action.type === "SEND_WHATSAPP" && action.config.whatsAppTemplate && (
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                  Template: {action.config.whatsAppTemplate}
                </p>
              )}
            </div>
          </div>
        </div>
      ))}

      <div className="pt-4 text-center">
        <p className="text-xs text-amber-600 dark:text-amber-400 italic">
          This is a visual workflow preview only. No actions are executed.
        </p>
      </div>
    </div>
  );
}
