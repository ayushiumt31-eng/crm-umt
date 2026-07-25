import type { WhatsAppCampaign } from "../types/whatsappCampaign";
import { dummyWhatsAppCampaigns } from "../data/dummy-whatsapp-campaigns";

class WhatsAppCampaignService {
  private campaigns: WhatsAppCampaign[] = [...dummyWhatsAppCampaigns];

  async getWhatsAppCampaigns(): Promise<WhatsAppCampaign[]> {
    return [...this.campaigns];
  }

  async getWhatsAppCampaignById(id: string): Promise<WhatsAppCampaign | null> {
    const campaign = this.campaigns.find((c) => c.id === id);
    return campaign || null;
  }

  async createWhatsAppCampaign(
    data: Partial<WhatsAppCampaign>
  ): Promise<WhatsAppCampaign> {
    const newCampaign: WhatsAppCampaign = {
      id: `wc-${Math.random().toString(36).substr(2, 9)}`,
      name: data.name || "",
      templateId: data.templateId || "",
      templateName: data.templateName || "",
      message: data.message || "",
      audienceType: data.audienceType || "ALL_CUSTOMERS",
      recipientIds: data.recipientIds || [],
      recipientCount: data.recipientIds?.length || 0,
      scheduledAt: data.scheduledAt || new Date().toISOString(),
      status: data.status || "DRAFT",
      createdBy: data.createdBy || "",
      createdByName: data.createdByName || "",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      notes: data.notes,
    };
    this.campaigns.push(newCampaign);
    return newCampaign;
  }

  async updateWhatsAppCampaign(
    id: string,
    data: Partial<WhatsAppCampaign>
  ): Promise<WhatsAppCampaign> {
    const index = this.campaigns.findIndex((c) => c.id === id);
    if (index === -1) throw new Error("WhatsApp campaign not found");

    this.campaigns[index] = {
      ...this.campaigns[index],
      ...data,
      updatedAt: new Date().toISOString(),
    };
    return this.campaigns[index];
  }

  async deleteWhatsAppCampaign(id: string): Promise<void> {
    const index = this.campaigns.findIndex((c) => c.id === id);
    if (index !== -1) {
      this.campaigns.splice(index, 1);
    }
  }
}

export const whatsappCampaignService = new WhatsAppCampaignService();

