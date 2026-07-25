import type { WhatsAppHistory } from "../types/whatsappHistory";
import { dummyWhatsAppHistory } from "../data/dummy-whatsapp-history";

class WhatsAppHistoryService {
  private history: WhatsAppHistory[] = [...dummyWhatsAppHistory];

  async getWhatsAppHistory(): Promise<WhatsAppHistory[]> {
    return [...this.history];
  }

  async getWhatsAppHistoryByCampaign(
    campaignId: string
  ): Promise<WhatsAppHistory[]> {
    return this.history.filter((h) => h.campaignId === campaignId);
  }
}

export const whatsappHistoryService = new WhatsAppHistoryService();

