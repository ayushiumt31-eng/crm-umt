export type AutomationTrigger =
  | "NEW_LEAD_CREATED"
  | "LEAD_STATUS_CHANGED"
  | "LEAD_STAGE_CHANGED"
  | "CUSTOMER_CREATED"
  | "CUSTOMER_STATUS_CHANGED"
  | "DEAL_CREATED"
  | "DEAL_STATUS_CHANGED"
  | "DEAL_WON"
  | "DEAL_LOST"
  | "TASK_COMPLETED"
  | "TASK_OVERDUE"
  | "CAMPAIGN_COMPLETED";

export interface TriggerConfig {
  value: AutomationTrigger;
  label: string;
  description: string;
  icon?: string;
}

export const automationTriggers: TriggerConfig[] = [
  {
    value: "NEW_LEAD_CREATED",
    label: "New Lead Created",
    description: "Triggers when a new lead is created in the system",
  },
  {
    value: "LEAD_STATUS_CHANGED",
    label: "Lead Status Changed",
    description: "Triggers when a lead's status is updated",
  },
  {
    value: "LEAD_STAGE_CHANGED",
    label: "Lead Stage Changed",
    description: "Triggers when a lead moves to a different stage",
  },
  {
    value: "CUSTOMER_CREATED",
    label: "Customer Created",
    description: "Triggers when a new customer is created",
  },
  {
    value: "CUSTOMER_STATUS_CHANGED",
    label: "Customer Status Changed",
    description: "Triggers when a customer's status changes",
  },
  {
    value: "DEAL_CREATED",
    label: "Deal Created",
    description: "Triggers when a new deal/opportunity is created",
  },
  {
    value: "DEAL_STATUS_CHANGED",
    label: "Deal Status Changed",
    description: "Triggers when a deal's status is updated",
  },
  {
    value: "DEAL_WON",
    label: "Deal Won",
    description: "Triggers when a deal is marked as won",
  },
  {
    value: "DEAL_LOST",
    label: "Deal Lost",
    description: "Triggers when a deal is marked as lost",
  },
  {
    value: "TASK_COMPLETED",
    label: "Task Completed",
    description: "Triggers when a task is marked as completed",
  },
  {
    value: "TASK_OVERDUE",
    label: "Task Overdue",
    description: "Triggers when a task becomes overdue",
  },
  {
    value: "CAMPAIGN_COMPLETED",
    label: "Campaign Completed",
    description: "Triggers when a marketing campaign is completed",
  },
];

export const automationTriggerOptions = automationTriggers.map((t) => ({
  label: t.label,
  value: t.value,
}));

export function getTriggerLabel(trigger: AutomationTrigger): string {
  const config = automationTriggers.find((t) => t.value === trigger);
  return config?.label || trigger;
}
