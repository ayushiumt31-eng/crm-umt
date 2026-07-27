import type { SocialHistory } from "../types/socialHistory";
import { dummySocialHistory } from "../data/dummy-social-history";

class SocialHistoryService {
  private history: SocialHistory[] = [...dummySocialHistory];

  async getSocialMediaHistory(): Promise<SocialHistory[]> {
    return [...this.history];
  }
}

export const socialHistoryService = new SocialHistoryService();

