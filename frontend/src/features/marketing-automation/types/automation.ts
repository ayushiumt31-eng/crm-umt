import type { AutomationTrigger } from "../config/triggers";
import type { AutomationActionType } from "../config/actions";
import type { ConditionField, ConditionOperator, ConditionLogic } from "../config/conditions";

export type AutomationStatus = "DRAFT" | "ACTIVE" | "INACTIVE" | "PAUSED";

export interface AutomationCondition {
  id: string;
  field: ConditionField;
  operator: ConditionOperator;
  value: string;
}

export interface ActionConfigData {
  // SEND_EMAIL
  emailTemplate?: string;
  recipientType?: "LEAD" | "CUSTOMER" | "ASSIGNED_EMPLOYEE";

  // SEND_WHATSAPP
  whatsAppTemplate?: string;
  whatsAppRecipientType?: "LEAD" | "CUSTOMER" | "ASSIGNED_EMPLOYEE";

  // SEND_SMS
  smsTemplate?: string;
  smsRecipientType?: "LEAD" | "CUSTOMER" | "ASSIGNED_EMPLOYEE";

  // CREATE_TASK
  taskTitle?: string;
  taskDescription?: string;
  assignTo?: string;
  dueDate?: string;

  // UPDATE_LEAD_STATUS
  newLeadStatus?: string;

  // UPDATE_LEAD_STAGE
  newLeadStage?: string;

  // ASSIGN_LEAD
  employee?: string;

  // ADD_TAG / REMOVE_TAG
  tag?: string;

  // ADD_NOTE
  note?: string;

  // CREATE_DEAL
  dealTitle?: string;
  dealValue?: number;
  dealStage?: string;
}

export interface AutomationAction {
  id: string;
  type: AutomationActionType;
  order: number;
  config: ActionConfigData;
}

export interface Automation {
  id: string;
  name: string;
  description: string;
  trigger: AutomationTrigger;
  conditions: AutomationCondition[];
  conditionLogic: ConditionLogic;
  actions: AutomationAction[];
  status: AutomationStatus;
  executionCount: number;
  successCount: number;
  failedCount: number;
  createdBy: string;
  createdByName: string;
  createdAt: string;
  updatedAt?: string;
  lastExecutedAt?: string;
  notes?: string;
}
