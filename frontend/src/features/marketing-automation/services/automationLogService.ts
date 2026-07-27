import type { AutomationLog } from "../types/automationLog";
import { dummyAutomationLogs } from "../data/dummy-automation-logs";

class AutomationLogService {
  private logs: AutomationLog[] = [...dummyAutomationLogs];

  async getAutomationLogs(): Promise<AutomationLog[]> {
    return [...this.logs];
  }

  async getAutomationLogById(id: string): Promise<AutomationLog | null> {
    const log = this.logs.find((l) => l.id === id);
    return log || null;
  }

  async getLogsByAutomation(automationId: string): Promise<AutomationLog[]> {
    return this.logs.filter((l) => l.automationId === automationId);
  }
}

export const automationLogService = new AutomationLogService();
