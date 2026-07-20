import { LocalDataService } from "./baseService";
import type { Campaign } from "@/types/marketing";
import { dummyCampaigns } from "@/data/campaigns";

class CampaignService extends LocalDataService<Campaign> {
  getDummyData(): Campaign[] {
    return dummyCampaigns;
  }
}

export const campaignService = new CampaignService();
