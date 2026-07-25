import type { EmailCampaign } from "../types/emailCampaign";
import { dummyEmailCampaigns } from "../data/dummy-email-campaigns";

class EmailCampaignService {
  private campaigns: EmailCampaign[] = [...dummyEmailCampaigns];

  async getEmailCampaigns(): Promise<EmailCampaign[]> {
    return [...this.campaigns];
  }

  async getEmailCampaignById(id: string): Promise<EmailCampaign | null> {
    const campaign = this.campaigns.find((c) => c.id === id);
    return campaign || null;
  }

  async createEmailCampaign(
    data: Partial<EmailCampaign>
  ): Promise<EmailCampaign> {
    const newCampaign: EmailCampaign = {
      ...data,
      id: `ec-${Math.random().toString(36).substr(2, 9)}`,
      createdAt: new Date().toISOString(),
    } as EmailCampaign;
    this.campaigns.push(newCampaign);
    return newCampaign;
  }

  async updateEmailCampaign(
    id: string,
    data: Partial<EmailCampaign>
  ): Promise<EmailCampaign> {
    const index = this.campaigns.findIndex((c) => c.id === id);
    if (index === -1) throw new Error("Email campaign not found");

    this.campaigns[index] = {
      ...this.campaigns[index],
      ...data,
      updatedAt: new Date().toISOString(),
    };
    return this.campaigns[index];
  }

  async deleteEmailCampaign(id: string): Promise<void> {
    const index = this.campaigns.findIndex((c) => c.id === id);
    if (index !== -1) {
      this.campaigns.splice(index, 1);
    }
  }
}

export const emailCampaignService = new EmailCampaignService();

