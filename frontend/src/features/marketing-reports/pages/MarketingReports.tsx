import { useState, useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import {
  BarChart3,
  TrendingUp,
  Users,
  DollarSign,
  Target,
  Eye,
  Activity,
  Zap,
  Mail,
  MessageCircle,
  Share2,
  Megaphone,
  Workflow,
} from "lucide-react";
import { marketingReportService } from "../services/marketingReportService";
import { MarketingReportStatsCard, STAT_COLORS } from "../components/MarketingReportStatsCard";
import { MarketingReportFilters } from "../components/MarketingReportFilters";
import { MarketingPerformanceChart } from "../components/MarketingPerformanceChart";
import { MarketingChannelChart } from "../components/MarketingChannelChart";
import { CampaignPerformanceTable } from "../components/CampaignPerformanceTable";
import { MarketingReportExport } from "../components/MarketingReportExport";
import { ReportSection } from "../components/ReportSection";
import type {
  MarketingOverview,
  CampaignPerformance,
  ChannelPerformance,
  EmailReport,
  WhatsAppReport,
  SocialReport,
  AdsReport,
  AutomationReport,
  DateRangePreset,
  MarketingChannel,
} from "../types/marketingReport";

export default function MarketingReports() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [dateRange, setDateRange] = useState<DateRangePreset>("LAST_30_DAYS");
  const [channel, setChannel] = useState<MarketingChannel | "ALL">("ALL");
  const [campaignId, setCampaignId] = useState("");

  const [overview, setOverview] = useState<MarketingOverview | null>(null);
  const [campaignData, setCampaignData] = useState<CampaignPerformance[]>([]);
  const [channelData, setChannelData] = useState<ChannelPerformance[]>([]);
  const [emailData, setEmailData] = useState<EmailReport[]>([]);
  const [whatsappData, setWhatsAppData] = useState<WhatsAppReport[]>([]);
  const [socialData, setSocialData] = useState<SocialReport[]>([]);
  const [adsData, setAdsData] = useState<AdsReport[]>([]);
  const [automationData, setAutomationData] = useState<AutomationReport[]>([]);

  const filters = useMemo(
    () => ({ dateRange, channel, campaignId }),
    [dateRange, channel, campaignId]
  );

  const loadData = async () => {
    setLoading(true);
    try {
      const [overviewResult, campaigns, channels, email, whatsapp, social, ads, automation] =
        await Promise.all([
          marketingReportService.getMarketingOverviewReport(filters),
          marketingReportService.getCampaignPerformanceReport(filters),
          marketingReportService.getChannelPerformanceReport(filters),
          marketingReportService.getEmailMarketingReport(filters),
          marketingReportService.getWhatsAppMarketingReport(filters),
          marketingReportService.getSocialMediaReport(filters),
          marketingReportService.getAdsReport(filters),
          marketingReportService.getAutomationReport(filters),
        ]);
      setOverview(overviewResult);
      setCampaignData(campaigns);
      setChannelData(channels);
      setEmailData(email);
      setWhatsAppData(whatsapp);
      setSocialData(social);
      setAdsData(ads);
      setAutomationData(automation);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleApply = () => loadData();
  const handleReset = () => {
    setDateRange("LAST_30_DAYS");
    setChannel("ALL");
    setCampaignId("");
    setTimeout(() => loadData(), 0);
  };

  const formatCurrency = (value: number) =>
    new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(value);

  const overviewStats = overview
    ? [
        { label: "Total Campaigns", value: overview.totalCampaigns, icon: TrendingUp, color: STAT_COLORS[0] },
        { label: "Total Leads Generated", value: overview.totalLeads.toLocaleString(), icon: Users, color: STAT_COLORS[1] },
        { label: "Total Conversions", value: overview.totalConversions.toLocaleString(), icon: Target, color: STAT_COLORS[2] },
        { label: "Conversion Rate", value: `${overview.conversionRate}%`, icon: Activity, color: STAT_COLORS[3] },
        { label: "Total Marketing Spend", value: formatCurrency(overview.totalSpend), icon: DollarSign, color: STAT_COLORS[4] },
        { label: "Total Revenue", value: formatCurrency(overview.totalRevenue), icon: TrendingUp, color: STAT_COLORS[5] },
        { label: "ROI", value: `${overview.roi}%`, icon: Zap, color: STAT_COLORS[6] },
        { label: "Total Engagement", value: overview.totalEngagement.toLocaleString(), icon: Eye, color: STAT_COLORS[7] },
      ]
    : [];

  const emailSummary = useMemo(() => {
    if (emailData.length === 0) return null;
    return {
      totalSent: emailData.reduce((s, e) => s + e.sent, 0),
      totalDelivered: emailData.reduce((s, e) => s + e.delivered, 0),
      totalOpened: emailData.reduce((s, e) => s + e.opened, 0),
      totalClicked: emailData.reduce((s, e) => s + e.clicked, 0),
      totalBounced: emailData.reduce((s, e) => s + e.bounced, 0),
      totalFailed: emailData.reduce((s, e) => s + e.failed, 0),
      totalUnsubscribed: emailData.reduce((s, e) => s + e.unsubscribed, 0),
      avgOpenRate: emailData.length > 0 ? (emailData.reduce((s, e) => s + e.openRate, 0) / emailData.length).toFixed(1) : "0",
      avgClickRate: emailData.length > 0 ? (emailData.reduce((s, e) => s + e.clickRate, 0) / emailData.length).toFixed(1) : "0",
    };
  }, [emailData]);

  const whatsappSummary = useMemo(() => {
    if (whatsappData.length === 0) return null;
    return {
      totalSent: whatsappData.reduce((s, w) => s + w.sent, 0),
      totalDelivered: whatsappData.reduce((s, w) => s + w.delivered, 0),
      totalRead: whatsappData.reduce((s, w) => s + w.read, 0),
      totalFailed: whatsappData.reduce((s, w) => s + w.failed, 0),
      totalReplies: whatsappData.reduce((s, w) => s + w.replies, 0),
      avgResponseRate: whatsappData.length > 0 ? (whatsappData.reduce((s, w) => s + w.responseRate, 0) / whatsappData.length).toFixed(1) : "0",
    };
  }, [whatsappData]);

  const socialSummary = useMemo(() => {
    if (socialData.length === 0) return null;
    return {
      totalPosts: socialData.reduce((s, p) => s + p.posts, 0),
      totalReach: socialData.reduce((s, p) => s + p.reach, 0),
      totalImpressions: socialData.reduce((s, p) => s + p.impressions, 0),
      totalLikes: socialData.reduce((s, p) => s + p.likes, 0),
      totalComments: socialData.reduce((s, p) => s + p.comments, 0),
      totalShares: socialData.reduce((s, p) => s + p.shares, 0),
      avgEngagementRate: socialData.length > 0 ? (socialData.reduce((s, p) => s + p.engagementRate, 0) / socialData.length).toFixed(1) : "0",
    };
  }, [socialData]);

  const adsSummary = useMemo(() => {
    if (adsData.length === 0) return null;
    const active = adsData.filter((a) => a.impressions > 0);
    return {
      totalCampaigns: adsData.length,
      totalImpressions: adsData.reduce((s, a) => s + a.impressions, 0),
      totalClicks: adsData.reduce((s, a) => s + a.clicks, 0),
      totalLeads: adsData.reduce((s, a) => s + a.leads, 0),
      totalSpend: adsData.reduce((s, a) => s + a.spend, 0),
      totalRevenue: adsData.reduce((s, a) => s + a.revenue, 0),
      avgCtr: active.length > 0 ? (active.reduce((s, a) => s + a.ctr, 0) / active.length).toFixed(2) : "0",
      avgCpc: active.length > 0 ? (active.reduce((s, a) => s + a.cpc, 0) / active.length).toFixed(2) : "0",
      avgCpl: active.filter((a) => a.cpl > 0).length > 0
        ? (active.filter((a) => a.cpl > 0).reduce((s, a) => s + a.cpl, 0) / active.filter((a) => a.cpl > 0).length).toFixed(2)
        : "0",
    };
  }, [adsData]);

  const automationSummary = useMemo(() => {
    if (automationData.length === 0) return null;
    return {
      totalAutomations: automationData.length,
      activeAutomations: automationData.filter((a) => a.status === "ACTIVE").length,
      totalExecutions: automationData.reduce((s, a) => s + a.executions, 0),
      totalSuccess: automationData.reduce((s, a) => s + a.success, 0),
      totalFailed: automationData.reduce((s, a) => s + a.failed, 0),
      avgSuccessRate: automationData.length > 0
        ? (automationData.reduce((s, a) => s + a.successRate, 0) / automationData.length).toFixed(1)
        : "0",
    };
  }, [automationData]);

  const channelQuickLinks = [
    { label: "Email Marketing", icon: Mail, path: "/marketing/email-marketing", color: "from-blue-500 to-blue-600" },
    { label: "WhatsApp Marketing", icon: MessageCircle, path: "/marketing/whatsapp", color: "from-green-500 to-green-600" },
    { label: "Social Media", icon: Share2, path: "/marketing/social-media", color: "from-purple-500 to-purple-600" },
    { label: "Ads / Meta Ads", icon: Megaphone, path: "/marketing/ads", color: "from-cyan-500 to-cyan-600" },
    { label: "Marketing Automation", icon: Workflow, path: "/marketing/automation", color: "from-amber-500 to-amber-600" },
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="rounded-2xl bg-gradient-to-r from-indigo-600 via-blue-500 to-purple-600 dark:from-indigo-900 dark:via-blue-900 dark:to-purple-900 p-8 shadow-lg overflow-hidden relative">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-0 left-0 w-96 h-96 bg-white/20 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-purple-300/20 rounded-full blur-3xl animate-pulse" />
        </div>
        <div className="relative z-10">
          <div className="flex items-center gap-4 mb-4">
            <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-white/20 backdrop-blur-md text-white border border-white/30 shadow-lg">
              <BarChart3 className="h-7 w-7" />
            </div>
            <div className="flex-1">
              <h1 className="text-4xl font-bold text-white drop-shadow-lg">Marketing Reports</h1>
              <p className="text-indigo-100 text-lg">
                Monitor marketing performance across campaigns, channels, advertising, and automation.
              </p>
            </div>
            <div className="flex gap-2">
              <MarketingReportExport
                data={campaignData as unknown as Record<string, unknown>[]}
                filename="campaign-performance"
                label="Export"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <MarketingReportFilters
        dateRange={dateRange}
        channel={channel}
        campaignId={campaignId}
        onDateRangeChange={setDateRange}
        onChannelChange={setChannel}
        onCampaignChange={setCampaignId}
        onApply={handleApply}
        onReset={handleReset}
      />

      {loading ? (
        <div className="text-center py-12">
          <div className="inline-flex h-10 w-10 items-center justify-center rounded-full border-2 border-blue-600 border-t-transparent animate-spin" />
          <p className="mt-4 text-slate-500">Loading report data...</p>
        </div>
      ) : (
        <>
          {/* Summary Stats */}
          {overviewStats.length > 0 && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {overviewStats.map((stat) => (
                <MarketingReportStatsCard key={stat.label} {...stat} />
              ))}
            </div>
          )}

          {/* Campaign Performance */}
          <ReportSection
            title="Campaign Performance"
            subtitle="Compare campaigns based on leads, conversions, and revenue"
          >
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
              <MarketingPerformanceChart data={campaignData} />
              <MarketingChannelChart data={channelData} />
            </div>
            <div className="mt-6">
              <CampaignPerformanceTable data={campaignData} />
            </div>
          </ReportSection>

          {/* Email Marketing */}
          <ReportSection
            title="Email Marketing"
            subtitle="Email campaign delivery and engagement metrics"
          >
            {emailSummary && (
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 mb-6">
                <div className="p-3 rounded-lg bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-700">
                  <p className="text-xs font-medium text-slate-500">Sent</p>
                  <p className="text-xl font-bold text-slate-900 dark:text-white">{emailSummary.totalSent.toLocaleString()}</p>
                </div>
                <div className="p-3 rounded-lg bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-700">
                  <p className="text-xs font-medium text-slate-500">Delivered</p>
                  <p className="text-xl font-bold text-green-600 dark:text-green-400">{emailSummary.totalDelivered.toLocaleString()}</p>
                </div>
                <div className="p-3 rounded-lg bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-700">
                  <p className="text-xs font-medium text-slate-500">Opened</p>
                  <p className="text-xl font-bold text-blue-600 dark:text-blue-400">{emailSummary.totalOpened.toLocaleString()}</p>
                </div>
                <div className="p-3 rounded-lg bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-700">
                  <p className="text-xs font-medium text-slate-500">Clicked</p>
                  <p className="text-xl font-bold text-cyan-600 dark:text-cyan-400">{emailSummary.totalClicked.toLocaleString()}</p>
                </div>
                <div className="p-3 rounded-lg bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-700">
                  <p className="text-xs font-medium text-slate-500">Bounced</p>
                  <p className="text-xl font-bold text-red-600 dark:text-red-400">{emailSummary.totalBounced.toLocaleString()}</p>
                </div>
                <div className="p-3 rounded-lg bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-700">
                  <p className="text-xs font-medium text-slate-500">Failed</p>
                  <p className="text-xl font-bold text-red-600 dark:text-red-400">{emailSummary.totalFailed.toLocaleString()}</p>
                </div>
                <div className="p-3 rounded-lg bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-700">
                  <p className="text-xs font-medium text-slate-500">Unsubscribed</p>
                  <p className="text-xl font-bold text-rose-600 dark:text-rose-400">{emailSummary.totalUnsubscribed.toLocaleString()}</p>
                </div>
                <div className="p-3 rounded-lg bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-700">
                  <p className="text-xs font-medium text-slate-500">Open Rate</p>
                  <p className="text-xl font-bold text-slate-900 dark:text-white">{emailSummary.avgOpenRate}%</p>
                </div>
                <div className="p-3 rounded-lg bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-700">
                  <p className="text-xs font-medium text-slate-500">Click Rate</p>
                  <p className="text-xl font-bold text-slate-900 dark:text-white">{emailSummary.avgClickRate}%</p>
                </div>
              </div>
            )}
            <p className="text-xs text-amber-600 dark:text-amber-400 italic mb-4">
              Demo email analytics — real delivery metrics will be available after backend integration.
            </p>
          </ReportSection>

          {/* WhatsApp Marketing */}
          <ReportSection
            title="WhatsApp Marketing"
            subtitle="WhatsApp campaign delivery and engagement metrics"
          >
            {whatsappSummary && (
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 mb-6">
                <div className="p-3 rounded-lg bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-700">
                  <p className="text-xs font-medium text-slate-500">Sent</p>
                  <p className="text-xl font-bold text-slate-900 dark:text-white">{whatsappSummary.totalSent.toLocaleString()}</p>
                </div>
                <div className="p-3 rounded-lg bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-700">
                  <p className="text-xs font-medium text-slate-500">Delivered</p>
                  <p className="text-xl font-bold text-green-600 dark:text-green-400">{whatsappSummary.totalDelivered.toLocaleString()}</p>
                </div>
                <div className="p-3 rounded-lg bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-700">
                  <p className="text-xs font-medium text-slate-500">Read</p>
                  <p className="text-xl font-bold text-blue-600 dark:text-blue-400">{whatsappSummary.totalRead.toLocaleString()}</p>
                </div>
                <div className="p-3 rounded-lg bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-700">
                  <p className="text-xs font-medium text-slate-500">Failed</p>
                  <p className="text-xl font-bold text-red-600 dark:text-red-400">{whatsappSummary.totalFailed.toLocaleString()}</p>
                </div>
                <div className="p-3 rounded-lg bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-700">
                  <p className="text-xs font-medium text-slate-500">Replies</p>
                  <p className="text-xl font-bold text-cyan-600 dark:text-cyan-400">{whatsappSummary.totalReplies.toLocaleString()}</p>
                </div>
                <div className="p-3 rounded-lg bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-700">
                  <p className="text-xs font-medium text-slate-500">Response Rate</p>
                  <p className="text-xl font-bold text-slate-900 dark:text-white">{whatsappSummary.avgResponseRate}%</p>
                </div>
              </div>
            )}
            <p className="text-xs text-amber-600 dark:text-amber-400 italic mb-4">
              Demo WhatsApp analytics — real delivery metrics will be available after backend integration.
            </p>
          </ReportSection>

          {/* Social Media */}
          <ReportSection
            title="Social Media"
            subtitle="Facebook, Instagram, and LinkedIn engagement metrics"
          >
            {socialSummary && (
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-7 gap-4 mb-6">
                <div className="p-3 rounded-lg bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-700">
                  <p className="text-xs font-medium text-slate-500">Total Posts</p>
                  <p className="text-xl font-bold text-slate-900 dark:text-white">{socialSummary.totalPosts}</p>
                </div>
                <div className="p-3 rounded-lg bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-700">
                  <p className="text-xs font-medium text-slate-500">Reach</p>
                  <p className="text-xl font-bold text-slate-900 dark:text-white">{socialSummary.totalReach.toLocaleString()}</p>
                </div>
                <div className="p-3 rounded-lg bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-700">
                  <p className="text-xs font-medium text-slate-500">Impressions</p>
                  <p className="text-xl font-bold text-slate-900 dark:text-white">{socialSummary.totalImpressions.toLocaleString()}</p>
                </div>
                <div className="p-3 rounded-lg bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-700">
                  <p className="text-xs font-medium text-slate-500">Likes</p>
                  <p className="text-xl font-bold text-blue-600 dark:text-blue-400">{socialSummary.totalLikes.toLocaleString()}</p>
                </div>
                <div className="p-3 rounded-lg bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-700">
                  <p className="text-xs font-medium text-slate-500">Comments</p>
                  <p className="text-xl font-bold text-cyan-600 dark:text-cyan-400">{socialSummary.totalComments.toLocaleString()}</p>
                </div>
                <div className="p-3 rounded-lg bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-700">
                  <p className="text-xs font-medium text-slate-500">Shares</p>
                  <p className="text-xl font-bold text-green-600 dark:text-green-400">{socialSummary.totalShares.toLocaleString()}</p>
                </div>
                <div className="p-3 rounded-lg bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-700">
                  <p className="text-xs font-medium text-slate-500">Engagement Rate</p>
                  <p className="text-xl font-bold text-slate-900 dark:text-white">{socialSummary.avgEngagementRate}%</p>
                </div>
              </div>
            )}
            <p className="text-xs text-amber-600 dark:text-amber-400 italic">
              Demo social media analytics — real engagement metrics will be available after backend integration.
            </p>
          </ReportSection>

          {/* Ads / Meta Ads */}
          <ReportSection
            title="Ads / Meta Ads"
            subtitle="Ad campaign performance metrics"
          >
            {adsSummary && (
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 mb-6">
                <div className="p-3 rounded-lg bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-700">
                  <p className="text-xs font-medium text-slate-500">Campaigns</p>
                  <p className="text-xl font-bold text-slate-900 dark:text-white">{adsSummary.totalCampaigns}</p>
                </div>
                <div className="p-3 rounded-lg bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-700">
                  <p className="text-xs font-medium text-slate-500">Impressions</p>
                  <p className="text-xl font-bold text-slate-900 dark:text-white">{adsSummary.totalImpressions.toLocaleString()}</p>
                </div>
                <div className="p-3 rounded-lg bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-700">
                  <p className="text-xs font-medium text-slate-500">Clicks</p>
                  <p className="text-xl font-bold text-blue-600 dark:text-blue-400">{adsSummary.totalClicks.toLocaleString()}</p>
                </div>
                <div className="p-3 rounded-lg bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-700">
                  <p className="text-xs font-medium text-slate-500">Leads</p>
                  <p className="text-xl font-bold text-green-600 dark:text-green-400">{adsSummary.totalLeads.toLocaleString()}</p>
                </div>
                <div className="p-3 rounded-lg bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-700">
                  <p className="text-xs font-medium text-slate-500">Spend</p>
                  <p className="text-xl font-bold text-amber-600 dark:text-amber-400">{formatCurrency(adsSummary.totalSpend)}</p>
                </div>
                <div className="p-3 rounded-lg bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-700">
                  <p className="text-xs font-medium text-slate-500">Revenue</p>
                  <p className="text-xl font-bold text-green-600 dark:text-green-400">{formatCurrency(adsSummary.totalRevenue)}</p>
                </div>
                <div className="p-3 rounded-lg bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-700">
                  <p className="text-xs font-medium text-slate-500">CTR</p>
                  <p className="text-xl font-bold text-slate-900 dark:text-white">{adsSummary.avgCtr}%</p>
                </div>
                <div className="p-3 rounded-lg bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-700">
                  <p className="text-xs font-medium text-slate-500">CPC</p>
                  <p className="text-xl font-bold text-slate-900 dark:text-white">{formatCurrency(Number(adsSummary.avgCpc))}</p>
                </div>
                <div className="p-3 rounded-lg bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-700">
                  <p className="text-xs font-medium text-slate-500">CPL</p>
                  <p className="text-xl font-bold text-slate-900 dark:text-white">{formatCurrency(Number(adsSummary.avgCpl))}</p>
                </div>
              </div>
            )}
            <p className="text-xs text-amber-600 dark:text-amber-400 italic">
              Demo ad metrics — real advertising metrics will be available after Meta Ads API integration.
            </p>
          </ReportSection>

          {/* Marketing Automation */}
          <ReportSection
            title="Marketing Automation"
            subtitle="Automation execution and success metrics"
          >
            {automationSummary && (
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 mb-6">
                <div className="p-3 rounded-lg bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-700">
                  <p className="text-xs font-medium text-slate-500">Total Automations</p>
                  <p className="text-xl font-bold text-slate-900 dark:text-white">{automationSummary.totalAutomations}</p>
                </div>
                <div className="p-3 rounded-lg bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-700">
                  <p className="text-xs font-medium text-slate-500">Active</p>
                  <p className="text-xl font-bold text-green-600 dark:text-green-400">{automationSummary.activeAutomations}</p>
                </div>
                <div className="p-3 rounded-lg bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-700">
                  <p className="text-xs font-medium text-slate-500">Total Executions</p>
                  <p className="text-xl font-bold text-slate-900 dark:text-white">{automationSummary.totalExecutions.toLocaleString()}</p>
                </div>
                <div className="p-3 rounded-lg bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-700">
                  <p className="text-xs font-medium text-slate-500">Successful</p>
                  <p className="text-xl font-bold text-green-600 dark:text-green-400">{automationSummary.totalSuccess.toLocaleString()}</p>
                </div>
                <div className="p-3 rounded-lg bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-700">
                  <p className="text-xs font-medium text-slate-500">Failed</p>
                  <p className="text-xl font-bold text-red-600 dark:text-red-400">{automationSummary.totalFailed.toLocaleString()}</p>
                </div>
                <div className="p-3 rounded-lg bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-700">
                  <p className="text-xs font-medium text-slate-500">Success Rate</p>
                  <p className="text-xl font-bold text-slate-900 dark:text-white">{automationSummary.avgSuccessRate}%</p>
                </div>
              </div>
            )}
          </ReportSection>

          {/* Channel Quick Links */}
          <ReportSection title="Channel Quick Links" subtitle="Navigate to individual marketing channels">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
              {channelQuickLinks.map((link) => {
                const Icon = link.icon;
                return (
                  <button
                    key={link.label}
                    onClick={() => navigate(link.path)}
                    className={`rounded-xl bg-gradient-to-br ${link.color} p-4 text-white shadow-sm hover:shadow-lg transition-all duration-300 text-left hover:-translate-y-1`}
                  >
                    <div className="flex items-center gap-3 mb-2">
                      <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-white/20 backdrop-blur-md">
                        <Icon className="h-5 w-5" />
                      </div>
                      <span className="font-semibold">{link.label}</span>
                    </div>
                    <p className="text-xs text-white/70">View details →</p>
                  </button>
                );
              })}
            </div>
          </ReportSection>

          {/* Demo disclaimer */}
          <div className="rounded-xl bg-gradient-to-br from-amber-50 to-yellow-50 dark:from-amber-950/20 dark:to-yellow-950/20 border border-amber-200 dark:border-amber-800 p-6">
            <div className="flex items-start gap-3">
              <BarChart3 className="h-6 w-6 text-amber-600 dark:text-amber-400 mt-0.5 flex-shrink-0" />
              <div>
                <h3 className="font-bold text-amber-800 dark:text-amber-200 mb-1">Demo Reports</h3>
                <p className="text-sm text-amber-700 dark:text-amber-300">
                  These reports contain demo/dummy data only. Real marketing analytics, including
                  campaign performance, delivery metrics, engagement statistics, and ROI calculations,
                  will be available after backend integration. No real marketing APIs are called.
                </p>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
