import type { AdCampaign } from "../types/adCampaign";
import { dummyAdCampaigns } from "../data/dummy-ad-campaigns";

class AdCampaignService {
  private campaigns: AdCampaign[] = [...dummyAdCampaigns];

  async getAdCampaigns(): Promise<AdCampaign[]> {
    return [...this.campaigns];
  }

  async getAdCampaignById(id: string): Promise<AdCampaign | null> {
    const campaign = this.campaigns.find((c) => c.id === id);
    return campaign || null;
  }

  async createAdCampaign(data: Partial<AdCampaign>): Promise<AdCampaign> {
    const newCampaign: AdCampaign = {
      ...data,
      id: `adc-${Math.random().toString(36).substr(2, 9)}`,
      spent: 0,
      createdAt: new Date().toISOString(),
    } as AdCampaign;
    this.campaigns.push(newCampaign);
    return newCampaign;
  }

  async updateAdCampaign(id: string, data: Partial<AdCampaign>): Promise<AdCampaign> {
    const index = this.campaigns.findIndex((c) => c.id === id);
    if (index === -1) throw new Error("Ad campaign not found");

    this.campaigns[index] = {
      ...this.campaigns[index],
      ...data,
      updatedAt: new Date().toISOString(),
    };
    return this.campaigns[index];
  }

  async deleteAdCampaign(id: string): Promise<void> {
    const index = this.campaigns.findIndex((c) => c.id === id);
    if (index !== -1) {
      this.campaigns.splice(index, 1);
    }
  }

  async pauseAdCampaign(id: string): Promise<AdCampaign> {
    return this.updateAdCampaign(id, { status: "PAUSED" });
  }

  async resumeAdCampaign(id: string): Promise<AdCampaign> {
    return this.updateAdCampaign(id, { status: "ACTIVE" });
  }
}

export const adCampaignService = new AdCampaignService();
