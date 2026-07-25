import type { EmailTemplate } from "../types/emailTemplate";
import { dummyEmailTemplates } from "../data/dummy-email-templates";

class EmailTemplateService {
  private templates: EmailTemplate[] = [...dummyEmailTemplates];

  async getEmailTemplates(): Promise<EmailTemplate[]> {
    return [...this.templates];
  }

  async getEmailTemplateById(id: string): Promise<EmailTemplate | null> {
    const template = this.templates.find((t) => t.id === id);
    return template || null;
  }

  async createEmailTemplate(
    data: Partial<EmailTemplate>
  ): Promise<EmailTemplate> {
    const newTemplate: EmailTemplate = {
      ...data,
      id: `etpl-${Math.random().toString(36).substr(2, 9)}`,
      createdAt: new Date().toISOString(),
    } as EmailTemplate;
    this.templates.push(newTemplate);
    return newTemplate;
  }

  async updateEmailTemplate(
    id: string,
    data: Partial<EmailTemplate>
  ): Promise<EmailTemplate> {
    const index = this.templates.findIndex((t) => t.id === id);
    if (index === -1) throw new Error("Email template not found");

    this.templates[index] = {
      ...this.templates[index],
      ...data,
      updatedAt: new Date().toISOString(),
    };
    return this.templates[index];
  }

  async deleteEmailTemplate(id: string): Promise<void> {
    const index = this.templates.findIndex((t) => t.id === id);
    if (index !== -1) {
      this.templates.splice(index, 1);
    }
  }
}

export const emailTemplateService = new EmailTemplateService();

