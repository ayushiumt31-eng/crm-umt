import type { AutomationTrigger } from "../config/triggers";
import type { AutomationActionType } from "../config/actions";

export type AutomationLogStatus = "SUCCESS" | "FAILED" | "PARTIAL" | "SKIPPED";

export interface AutomationLog {
  id: string;
  automationId: string;
  automationName: string;
  trigger: AutomationTrigger;
  target: string;
  targetType: string;
  actionsExecuted: AutomationActionType[];
  actionsCount: number;
  status: AutomationLogStatus;
  executionDate: string;
  duration: number;
  errorMessage?: string;
  executedBy: string;
  executedByName: string;
  details?: string;
}
