import type { AdSet } from "../types/adSet";
import { dummyAdSets } from "../data/dummy-ad-sets";

class AdSetService {
  private adSets: AdSet[] = [...dummyAdSets];

  async getAdSets(): Promise<AdSet[]> {
    return [...this.adSets];
  }

  async getAdSetById(id: string): Promise<AdSet | null> {
    const adSet = this.adSets.find((s) => s.id === id);
    return adSet || null;
  }

  async createAdSet(data: Partial<AdSet>): Promise<AdSet> {
    const newAdSet: AdSet = {
      ...data,
      id: `ads-${Math.random().toString(36).substr(2, 9)}`,
      createdAt: new Date().toISOString(),
    } as AdSet;
    this.adSets.push(newAdSet);
    return newAdSet;
  }

  async updateAdSet(id: string, data: Partial<AdSet>): Promise<AdSet> {
    const index = this.adSets.findIndex((s) => s.id === id);
    if (index === -1) throw new Error("Ad set not found");

    this.adSets[index] = {
      ...this.adSets[index],
      ...data,
      updatedAt: new Date().toISOString(),
    };
    return this.adSets[index];
  }

  async deleteAdSet(id: string): Promise<void> {
    const index = this.adSets.findIndex((s) => s.id === id);
    if (index !== -1) {
      this.adSets.splice(index, 1);
    }
  }
}

export const adSetService = new AdSetService();
