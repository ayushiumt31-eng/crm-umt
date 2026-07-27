import type { Automation } from "../types/automation";

export interface AutomationTemplate {
  id: string;
  name: string;
  description: string;
  category: string;
  defaultValues: Partial<Automation>;
}

export const dummyAutomationTemplates: AutomationTemplate[] = [
  {
    id: "tpl-001",
    name: "New Lead Follow-up",
    description: "Automatically follow up with new leads by creating a task and sending an email",
    category: "Lead Management",
    defaultValues: {
      name: "New Lead Follow-up",
      description: "Automatically follow up with new leads",
      trigger: "NEW_LEAD_CREATED",
      conditions: [],
      conditionLogic: "AND",
      actions: [
        {
          id: "tpl-act-001",
          type: "CREATE_TASK",
          order: 1,
          config: {
            taskTitle: "Follow up with new lead",
            taskDescription: "Contact the lead within 24 hours",
            dueDate: "1",
          },
        },
        {
          id: "tpl-act-002",
          type: "SEND_EMAIL",
          order: 2,
          config: {
            emailTemplate: "Welcome Email",
            recipientType: "LEAD",
          },
        },
      ],
      status: "DRAFT",
    },
  },
  {
    id: "tpl-002",
    name: "Website Lead Notification",
    description: "Notify sales team and send WhatsApp when a lead comes from the website",
    category: "Lead Management",
    defaultValues: {
      name: "Website Lead Notification",
      description: "Send notifications for website leads",
      trigger: "NEW_LEAD_CREATED",
      conditions: [
        {
          id: "tpl-cond-001",
          field: "leadSource",
          operator: "EQUALS",
          value: "Website",
        },
      ],
      conditionLogic: "AND",
      actions: [
        {
          id: "tpl-act-003",
          type: "SEND_EMAIL",
          order: 1,
          config: {
            emailTemplate: "Lead Notification",
            recipientType: "ASSIGNED_EMPLOYEE",
          },
        },
        {
          id: "tpl-act-004",
          type: "SEND_WHATSAPP",
          order: 2,
          config: {
            whatsAppTemplate: "New Lead Alert",
            whatsAppRecipientType: "ASSIGNED_EMPLOYEE",
          },
        },
      ],
      status: "DRAFT",
    },
  },
  {
    id: "tpl-003",
    name: "Deal Won Follow-up",
    description: "Send congratulatory email and create handover tasks when a deal is won",
    category: "Sales",
    defaultValues: {
      name: "Deal Won Follow-up",
      description: "Post-deal won follow-up automation",
      trigger: "DEAL_WON",
      conditions: [],
      conditionLogic: "AND",
      actions: [
        {
          id: "tpl-act-005",
          type: "CREATE_TASK",
          order: 1,
          config: {
            taskTitle: "Customer handover process",
            taskDescription: "Initiate the customer handover and onboarding",
            dueDate: "3",
          },
        },
        {
          id: "tpl-act-006",
          type: "ADD_NOTE",
          order: 2,
          config: {
            note: "Deal was won. Begin onboarding process.",
          },
        },
      ],
      status: "DRAFT",
    },
  },
  {
    id: "tpl-004",
    name: "Overdue Task Reminder",
    description: "Send reminder and create follow-up task when a task becomes overdue",
    category: "Task Management",
    defaultValues: {
      name: "Overdue Task Reminder",
      description: "Automated reminders for overdue tasks",
      trigger: "TASK_OVERDUE",
      conditions: [],
      conditionLogic: "AND",
      actions: [
        {
          id: "tpl-act-007",
          type: "SEND_EMAIL",
          order: 1,
          config: {
            emailTemplate: "Task Overdue Reminder",
            recipientType: "ASSIGNED_EMPLOYEE",
          },
        },
        {
          id: "tpl-act-008",
          type: "CREATE_TASK",
          order: 2,
          config: {
            taskTitle: "Follow up on overdue task",
            taskDescription: "The original task is overdue. Please follow up.",
            dueDate: "1",
          },
        },
      ],
      status: "DRAFT",
    },
  },
  {
    id: "tpl-005",
    name: "Customer Welcome",
    description: "Send welcome email and add tag when a new customer is created",
    category: "Customer Management",
    defaultValues: {
      name: "Customer Welcome",
      description: "Welcome new customers with email and tagging",
      trigger: "CUSTOMER_CREATED",
      conditions: [],
      conditionLogic: "AND",
      actions: [
        {
          id: "tpl-act-009",
          type: "SEND_EMAIL",
          order: 1,
          config: {
            emailTemplate: "Welcome Email",
            recipientType: "CUSTOMER",
          },
        },
        {
          id: "tpl-act-010",
          type: "ADD_TAG",
          order: 2,
          config: {
            tag: "New Customer",
          },
        },
      ],
      status: "DRAFT",
    },
  },
];
