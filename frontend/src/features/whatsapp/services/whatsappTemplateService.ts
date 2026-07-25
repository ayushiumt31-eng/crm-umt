import type { WhatsAppTemplate } from "../types/whatsappTemplate";
import { dummyWhatsAppTemplates } from "../data/dummy-whatsapp-templates";

class WhatsAppTemplateService {
  private templates: WhatsAppTemplate[] = [...dummyWhatsAppTemplates];

  async getWhatsAppTemplates(): Promise<WhatsAppTemplate[]> {
    return [...this.templates];
  }

  async getWhatsAppTemplateById(id: string): Promise<WhatsAppTemplate | null> {
    const template = this.templates.find((t) => t.id === id);
    return template || null;
  }

  async createWhatsAppTemplate(
    data: Partial<WhatsAppTemplate>
  ): Promise<WhatsAppTemplate> {
    const newTemplate: WhatsAppTemplate = {
      id: `wtpl-${Math.random().toString(36).substr(2, 9)}`,
      name: data.name || "",
      category: data.category || "CUSTOM",
      message: data.message || "",
      status: data.status || "ACTIVE",
      createdBy: data.createdBy || "",
      createdByName: data.createdByName || "",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    this.templates.push(newTemplate);
    return newTemplate;
  }

  async updateWhatsAppTemplate(
    id: string,
    data: Partial<WhatsAppTemplate>
  ): Promise<WhatsAppTemplate> {
    const index = this.templates.findIndex((t) => t.id === id);
    if (index === -1) throw new Error("WhatsApp template not found");

    this.templates[index] = {
      ...this.templates[index],
      ...data,
      updatedAt: new Date().toISOString(),
    };
    return this.templates[index];
  }

  async deleteWhatsAppTemplate(id: string): Promise<void> {
    const index = this.templates.findIndex((t) => t.id === id);
    if (index !== -1) {
      this.templates.splice(index, 1);
    }
  }
}

export const whatsappTemplateService = new WhatsAppTemplateService();

