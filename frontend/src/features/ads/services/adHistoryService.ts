import type { AdHistory } from "../types/adHistory";
import { dummyAdHistory } from "../data/dummy-ad-history";

class AdHistoryService {
  private history: AdHistory[] = [...dummyAdHistory];

  async getAdHistory(): Promise<AdHistory[]> {
    return [...this.history];
  }

  async getAdHistoryByCampaign(campaignId: string): Promise<AdHistory[]> {
    return this.history.filter((h) => h.campaignId === campaignId);
  }
}

export const adHistoryService = new AdHistoryService();
