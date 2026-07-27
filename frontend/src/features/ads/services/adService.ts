import type { Ad } from "../types/ad";
import { dummyAds } from "../data/dummy-ads";

class AdService {
  private ads: Ad[] = [...dummyAds];

  async getAds(): Promise<Ad[]> {
    return [...this.ads];
  }

  async getAdById(id: string): Promise<Ad | null> {
    const ad = this.ads.find((a) => a.id === id);
    return ad || null;
  }

  async createAd(data: Partial<Ad>): Promise<Ad> {
    const newAd: Ad = {
      ...data,
      id: `ad-${Math.random().toString(36).substr(2, 9)}`,
      impressions: 0,
      clicks: 0,
      leads: 0,
      createdAt: new Date().toISOString(),
    } as Ad;
    this.ads.push(newAd);
    return newAd;
  }

  async updateAd(id: string, data: Partial<Ad>): Promise<Ad> {
    const index = this.ads.findIndex((a) => a.id === id);
    if (index === -1) throw new Error("Ad not found");

    this.ads[index] = {
      ...this.ads[index],
      ...data,
      updatedAt: new Date().toISOString(),
    };
    return this.ads[index];
  }

  async deleteAd(id: string): Promise<void> {
    const index = this.ads.findIndex((a) => a.id === id);
    if (index !== -1) {
      this.ads.splice(index, 1);
    }
  }

  async pauseAd(id: string): Promise<Ad> {
    return this.updateAd(id, { status: "PAUSED" });
  }

  async resumeAd(id: string): Promise<Ad> {
    return this.updateAd(id, { status: "ACTIVE" });
  }
}

export const adService = new AdService();
