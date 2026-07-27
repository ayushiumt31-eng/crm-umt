export type DateRangePreset =
  | "TODAY"
  | "YESTERDAY"
  | "LAST_7_DAYS"
  | "LAST_30_DAYS"
  | "THIS_MONTH"
  | "LAST_MONTH"
  | "CUSTOM";

export type MarketingChannel = "EMAIL" | "WHATSAPP" | "SOCIAL_MEDIA" | "ADS" | "AUTOMATION";

export interface MarketingReportFilters {
  dateRange: DateRangePreset;
  channel: MarketingChannel | "ALL";
  campaignId: string;
  startDate?: string;
  endDate?: string;
}

export interface MarketingOverview {
  totalCampaigns: number;
  totalLeads: number;
  totalConversions: number;
  conversionRate: number;
  totalSpend: number;
  totalRevenue: number;
  roi: number;
  totalEngagement: number;
}

export interface CampaignPerformance {
  id: string;
  campaignName: string;
  channel: MarketingChannel;
  leads: number;
  conversions: number;
  conversionRate: number;
  spend: number;
  revenue: number;
  roi: number;
  status: string;
}

export interface ChannelPerformance {
  channel: MarketingChannel;
  channelLabel: string;
  leads: number;
  conversions: number;
  spend: number;
  revenue: number;
  roi: number;
}

export interface EmailReport {
  campaignId: string;
  campaignName: string;
  sent: number;
  delivered: number;
  opened: number;
  clicked: number;
  bounced: number;
  failed: number;
  unsubscribed: number;
  openRate: number;
  clickRate: number;
  status: string;
}

export interface WhatsAppReport {
  campaignId: string;
  campaignName: string;
  sent: number;
  delivered: number;
  read: number;
  failed: number;
  replies: number;
  responseRate: number;
  status: string;
}

export interface SocialReport {
  platform: string;
  posts: number;
  reach: number;
  impressions: number;
  likes: number;
  comments: number;
  shares: number;
  engagementRate: number;
}

export interface AdsReport {
  campaignId: string;
  campaignName: string;
  platform: string;
  impressions: number;
  clicks: number;
  leads: number;
  spend: number;
  revenue: number;
  ctr: number;
  cpc: number;
  cpl: number;
  roi: number;
}

export interface AutomationReport {
  automationId: string;
  automationName: string;
  trigger: string;
  executions: number;
  success: number;
  failed: number;
  successRate: number;
  status: string;
}

export interface LeadSourceReport {
  source: string;
  totalLeads: number;
  qualifiedLeads: number;
  convertedLeads: number;
  conversionRate: number;
}

export interface ConversionReport {
  totalLeads: number;
  qualifiedLeads: number;
  opportunities: number;
  wonDeals: number;
  overallConversionRate: number;
}

export interface MarketingSpendReport {
  totalSpend: number;
  totalRevenue: number;
  grossReturn: number;
  roi: number;
  channelBreakdown: {
    channel: MarketingChannel;
    channelLabel: string;
    spend: number;
    revenue: number;
    roi: number;
  }[];
}

export interface MarketingReportDetail {
  id: string;
  reportName: string;
  channel: MarketingChannel;
  campaign: string;
  dateRange: string;
  totalLeads: number;
  conversions: number;
  spend: number;
  revenue: number;
  roi: number;
  createdAt: string;
  lastUpdated: string;
}
