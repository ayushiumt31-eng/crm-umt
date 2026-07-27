import type { Automation } from "../types/automation";
import { dummyAutomations } from "../data/dummy-automations";

class AutomationService {
  private automations: Automation[] = [...dummyAutomations];

  async getAutomations(): Promise<Automation[]> {
    return [...this.automations];
  }

  async getAutomationById(id: string): Promise<Automation | null> {
    const automation = this.automations.find((a) => a.id === id);
    return automation || null;
  }

  async createAutomation(data: Partial<Automation>): Promise<Automation> {
    const newAutomation: Automation = {
      ...data,
      id: `auto-${Math.random().toString(36).substr(2, 9)}`,
      executionCount: 0,
      successCount: 0,
      failedCount: 0,
      createdAt: new Date().toISOString(),
    } as Automation;
    this.automations.push(newAutomation);
    return newAutomation;
  }

  async updateAutomation(id: string, data: Partial<Automation>): Promise<Automation> {
    const index = this.automations.findIndex((a) => a.id === id);
    if (index === -1) throw new Error("Automation not found");

    this.automations[index] = {
      ...this.automations[index],
      ...data,
      updatedAt: new Date().toISOString(),
    };
    return this.automations[index];
  }

  async deleteAutomation(id: string): Promise<void> {
    const index = this.automations.findIndex((a) => a.id === id);
    if (index !== -1) {
      this.automations.splice(index, 1);
    }
  }

  async activateAutomation(id: string): Promise<Automation> {
    return this.updateAutomation(id, { status: "ACTIVE" });
  }

  async pauseAutomation(id: string): Promise<Automation> {
    return this.updateAutomation(id, { status: "PAUSED" });
  }

  async duplicateAutomation(id: string): Promise<Automation> {
    const source = this.automations.find((a) => a.id === id);
    if (!source) throw new Error("Automation not found");

    const duplicate: Automation = {
      ...source,
      id: `auto-${Math.random().toString(36).substr(2, 9)}`,
      name: `Copy of ${source.name}`,
      status: "DRAFT",
      executionCount: 0,
      successCount: 0,
      failedCount: 0,
      lastExecutedAt: undefined,
      createdAt: new Date().toISOString(),
      updatedAt: undefined,
    };

    this.automations.push(duplicate);
    return duplicate;
  }
}

export const automationService = new AutomationService();
