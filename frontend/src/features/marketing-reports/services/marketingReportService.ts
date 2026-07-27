import type {
  MarketingOverview,
  CampaignPerformance,
  ChannelPerformance,
  EmailReport,
  WhatsAppReport,
  SocialReport,
  AdsReport,
  AutomationReport,
  LeadSourceReport,
  ConversionReport,
  MarketingSpendReport,
  MarketingReportFilters,
  MarketingReportDetail,
} from "../types/marketingReport";

import { dummyMarketingOverview, dummyMarketingReportDetails } from "../data/dummy-marketing-report";
import { dummyCampaignPerformance } from "../data/dummy-campaign-report";
import { dummyChannelPerformance } from "../data/dummy-channel-report";
import { dummyEmailReports } from "../data/dummy-email-report";
import { dummyWhatsAppReports } from "../data/dummy-whatsapp-report";
import { dummySocialReports } from "../data/dummy-social-report";
import { dummyAdsReports } from "../data/dummy-ads-report";
import { dummyAutomationReports } from "../data/dummy-automation-report";

class MarketingReportService {
  async getMarketingOverviewReport(_filters?: MarketingReportFilters): Promise<MarketingOverview> {
    return { ...dummyMarketingOverview };
  }

  async getCampaignPerformanceReport(_filters?: MarketingReportFilters): Promise<CampaignPerformance[]> {
    let data = [...dummyCampaignPerformance];
    if (_filters?.channel && _filters.channel !== "ALL") {
      data = data.filter((c) => c.channel === _filters.channel);
    }
    if (_filters?.campaignId) {
      data = data.filter((c) => c.id === _filters.campaignId);
    }
    return data;
  }

  async getChannelPerformanceReport(_filters?: MarketingReportFilters): Promise<ChannelPerformance[]> {
    return [...dummyChannelPerformance];
  }

  async getEmailMarketingReport(_filters?: MarketingReportFilters): Promise<EmailReport[]> {
    let data = [...dummyEmailReports];
    if (_filters?.campaignId) {
      data = data.filter((e) => e.campaignId === _filters.campaignId);
    }
    return data;
  }

  async getWhatsAppMarketingReport(_filters?: MarketingReportFilters): Promise<WhatsAppReport[]> {
    let data = [...dummyWhatsAppReports];
    if (_filters?.campaignId) {
      data = data.filter((w) => w.campaignId === _filters.campaignId);
    }
    return data;
  }

  async getSocialMediaReport(_filters?: MarketingReportFilters): Promise<SocialReport[]> {
    return [...dummySocialReports];
  }

  async getAdsReport(_filters?: MarketingReportFilters): Promise<AdsReport[]> {
    let data = [...dummyAdsReports];
    if (_filters?.campaignId) {
      data = data.filter((a) => a.campaignId === _filters.campaignId);
    }
    return data;
  }

  async getAutomationReport(_filters?: MarketingReportFilters): Promise<AutomationReport[]> {
    let data = [...dummyAutomationReports];
    if (_filters?.campaignId) {
      data = data.filter((a) => a.automationId === _filters.campaignId);
    }
    return data;
  }

  async getLeadGenerationReport(_filters?: MarketingReportFilters): Promise<LeadSourceReport[]> {
    return [
      { source: "Website", totalLeads: 450, qualifiedLeads: 180, convertedLeads: 72, conversionRate: 16 },
      { source: "Facebook", totalLeads: 320, qualifiedLeads: 128, convertedLeads: 51, conversionRate: 15.94 },
      { source: "Instagram", totalLeads: 280, qualifiedLeads: 112, convertedLeads: 45, conversionRate: 16.07 },
      { source: "Google Ads", totalLeads: 390, qualifiedLeads: 156, convertedLeads: 62, conversionRate: 15.9 },
      { source: "Referral", totalLeads: 180, qualifiedLeads: 90, convertedLeads: 45, conversionRate: 25 },
      { source: "WhatsApp", totalLeads: 220, qualifiedLeads: 88, convertedLeads: 35, conversionRate: 15.91 },
      { source: "Email", totalLeads: 160, qualifiedLeads: 64, convertedLeads: 26, conversionRate: 16.25 },
    ];
  }

  async getConversionReport(_filters?: MarketingReportFilters): Promise<ConversionReport> {
    return {
      totalLeads: 2000,
      qualifiedLeads: 818,
      opportunities: 600,
      wonDeals: 345,
      overallConversionRate: 17.25,
    };
  }

  async getMarketingSpendReport(_filters?: MarketingReportFilters): Promise<MarketingSpendReport> {
    return {
      totalSpend: 853000,
      totalRevenue: 9489000,
      grossReturn: 8636000,
      roi: 1012.44,
      channelBreakdown: [
        { channel: "EMAIL", channelLabel: "Email", spend: 59000, revenue: 1470000, roi: 2391.53 },
        { channel: "WHATSAPP", channelLabel: "WhatsApp", spend: 32500, revenue: 920000, roi: 2730.77 },
        { channel: "SOCIAL_MEDIA", channelLabel: "Social Media", spend: 105000, revenue: 690000, roi: 557.14 },
        { channel: "ADS", channelLabel: "Ads / Meta Ads", spend: 640000, revenue: 2759000, roi: 331.09 },
        { channel: "AUTOMATION", channelLabel: "Marketing Automation", spend: 16500, revenue: 3650000, roi: 22021.21 },
      ],
    };
  }

  async getReportDetail(id: string): Promise<MarketingReportDetail | null> {
    // First try exact match from predefined reports
    const report = dummyMarketingReportDetails.find((r) => r.id === id);
    if (report) return report;

    // If not found, generate a detail from campaign performance data
    const campaign = dummyCampaignPerformance.find((c) => c.id === id);
    if (campaign) {
      return {
        id: campaign.id,
        reportName: `${campaign.campaignName} - Performance Report`,
        channel: campaign.channel,
        campaign: campaign.campaignName,
        dateRange: "Custom Range",
        totalLeads: campaign.leads,
        conversions: campaign.conversions,
        spend: campaign.spend,
        revenue: campaign.revenue,
        roi: campaign.roi,
        createdAt: new Date().toISOString(),
        lastUpdated: new Date().toISOString(),
      };
    }

    return null;
  }
}

export const marketingReportService = new MarketingReportService();
