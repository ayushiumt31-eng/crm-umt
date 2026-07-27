export type AutomationActionType =
  | "SEND_EMAIL"
  | "SEND_WHATSAPP"
  | "SEND_SMS"
  | "CREATE_TASK"
  | "UPDATE_LEAD_STATUS"
  | "UPDATE_LEAD_STAGE"
  | "ASSIGN_LEAD"
  | "ADD_TAG"
  | "REMOVE_TAG"
  | "ADD_NOTE"
  | "CREATE_DEAL";

export interface ActionConfig {
  value: AutomationActionType;
  label: string;
  description: string;
  category: "COMMUNICATION" | "TASK" | "LEAD" | "TAG" | "NOTE" | "DEAL";
}

export const automationActions: ActionConfig[] = [
  {
    value: "SEND_EMAIL",
    label: "Send Email",
    description: "Send an email to the lead, customer, or assigned employee",
    category: "COMMUNICATION",
  },
  {
    value: "SEND_WHATSAPP",
    label: "Send WhatsApp Message",
    description: "Send a WhatsApp message to the lead or customer",
    category: "COMMUNICATION",
  },
  {
    value: "SEND_SMS",
    label: "Send SMS",
    description: "Send an SMS to the lead or customer",
    category: "COMMUNICATION",
  },
  {
    value: "CREATE_TASK",
    label: "Create Follow-up Task",
    description: "Create a follow-up task for the assigned employee",
    category: "TASK",
  },
  {
    value: "UPDATE_LEAD_STATUS",
    label: "Update Lead Status",
    description: "Update the status of the lead",
    category: "LEAD",
  },
  {
    value: "UPDATE_LEAD_STAGE",
    label: "Update Lead Stage",
    description: "Move the lead to a different stage",
    category: "LEAD",
  },
  {
    value: "ASSIGN_LEAD",
    label: "Assign Lead",
    description: "Assign the lead to an employee",
    category: "LEAD",
  },
  {
    value: "ADD_TAG",
    label: "Add Tag",
    description: "Add a tag to the lead or customer",
    category: "TAG",
  },
  {
    value: "REMOVE_TAG",
    label: "Remove Tag",
    description: "Remove a tag from the lead or customer",
    category: "TAG",
  },
  {
    value: "ADD_NOTE",
    label: "Add Note",
    description: "Add a note to the lead or customer record",
    category: "NOTE",
  },
  {
    value: "CREATE_DEAL",
    label: "Create Deal",
    description: "Create a new deal/opportunity",
    category: "DEAL",
  },
];

export const automationActionOptions = automationActions.map((a) => ({
  label: a.label,
  value: a.value,
}));

export function getActionLabel(action: AutomationActionType): string {
  const config = automationActions.find((a) => a.value === action);
  return config?.label || action;
}

export function getActionCategory(action: AutomationActionType): string {
  const config = automationActions.find((a) => a.value === action);
  return config?.category || "OTHER";
}
