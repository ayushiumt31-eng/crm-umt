export type AdHistoryAction =
  | "CREATED"
  | "UPDATED"
  | "PAUSED"
  | "RESUMED"
  | "COMPLETED"
  | "CANCELLED";

export interface AdHistory {
  id: string;
  campaignId: string;
  campaignName: string;
  adSetId?: string;
  adSetName?: string;
  adId?: string;
  adName?: string;
  platform: string;
  action: AdHistoryAction;
  status: string;
  date: string;
  performedBy: string;
  performedByName: string;
}

