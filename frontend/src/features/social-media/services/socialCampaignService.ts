import type { SocialCampaign } from "../types/socialCampaign";
import { dummySocialCampaigns } from "../data/dummy-social-campaigns";

class SocialCampaignService {
  private campaigns: SocialCampaign[] = [...dummySocialCampaigns];

  async getSocialCampaigns(): Promise<SocialCampaign[]> {
    return [...this.campaigns];
  }

  async getSocialCampaignById(id: string): Promise<SocialCampaign | null> {
    const campaign = this.campaigns.find((c) => c.id === id);
    return campaign || null;
  }

  async createSocialCampaign(
    data: Partial<SocialCampaign>
  ): Promise<SocialCampaign> {
    const newCampaign: SocialCampaign = {
      ...data,
      id: `sc-${Math.random().toString(36).substr(2, 9)}`,
      createdAt: new Date().toISOString(),
    } as SocialCampaign;
    this.campaigns.push(newCampaign);
    return newCampaign;
  }

  async updateSocialCampaign(
    id: string,
    data: Partial<SocialCampaign>
  ): Promise<SocialCampaign> {
    const index = this.campaigns.findIndex((c) => c.id === id);
    if (index === -1) throw new Error("Social campaign not found");

    this.campaigns[index] = {
      ...this.campaigns[index],
      ...data,
      updatedAt: new Date().toISOString(),
    };
    return this.campaigns[index];
  }

  async deleteSocialCampaign(id: string): Promise<void> {
    const index = this.campaigns.findIndex((c) => c.id === id);
    if (index !== -1) {
      this.campaigns.splice(index, 1);
    }
  }
}

export const socialCampaignService = new SocialCampaignService();

