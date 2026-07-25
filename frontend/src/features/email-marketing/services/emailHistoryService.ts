import type { EmailHistory } from "../types/emailHistory";
import { dummyEmailHistory } from "../data/dummy-email-history";

class EmailHistoryService {
  private history: EmailHistory[] = [...dummyEmailHistory];

  async getEmailHistory(): Promise<EmailHistory[]> {
    return [...this.history];
  }

  async getEmailHistoryByCampaign(
    campaignId: string
  ): Promise<EmailHistory[]> {
    return this.history.filter((h) => h.campaignId === campaignId);
  }
}

export const emailHistoryService = new EmailHistoryService();

