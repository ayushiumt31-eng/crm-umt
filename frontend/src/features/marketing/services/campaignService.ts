import type { Campaign } from "../types/campaign";
import { dummyCampaigns } from "../data/dummy-campaigns";

class CampaignService {
  private campaigns: Campaign[] = [...dummyCampaigns];

  async getCampaigns(): Promise<Campaign[]> {
    return [...this.campaigns];
  }

  async getCampaignById(id: string): Promise<Campaign | null> {
    const campaign = this.campaigns.find((c) => c.id === id);
    return campaign || null;
  }

  async createCampaign(data: Partial<Campaign>): Promise<Campaign> {
    const newCampaign: Campaign = {
      ...data,
      id: `cmp-${Math.random().toString(36).substr(2, 9)}`,
      createdAt: new Date().toISOString(),
    } as Campaign;
    this.campaigns.push(newCampaign);
    return newCampaign;
  }

  async updateCampaign(
    id: string,
    data: Partial<Campaign>
  ): Promise<Campaign> {
    const index = this.campaigns.findIndex((c) => c.id === id);
    if (index === -1) throw new Error("Campaign not found");

    this.campaigns[index] = {
      ...this.campaigns[index],
      ...data,
      updatedAt: new Date().toISOString(),
    };
    return this.campaigns[index];
  }

  async deleteCampaign(id: string): Promise<void> {
    const index = this.campaigns.findIndex((c) => c.id === id);
    if (index !== -1) {
      this.campaigns.splice(index, 1);
    }
  }
}

export const campaignService = new CampaignService();

