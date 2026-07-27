export type AdSetStatus = "DRAFT" | "ACTIVE" | "PAUSED" | "SCHEDULED" | "COMPLETED" | "CANCELLED";

export interface AdSet {
  id: string;
  name: string;
  campaignId: string;
  campaignName: string;
  audienceName?: string;
  budget: number;
  startDate: string;
  endDate: string;
  status: AdSetStatus;
  createdAt: string;
  updatedAt?: string;
}

