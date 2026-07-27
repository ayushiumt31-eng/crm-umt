import type { ChannelPerformance } from "../types/marketingReport";

export const dummyChannelPerformance: ChannelPerformance[] = [
  {
    channel: "EMAIL",
    channelLabel: "Email",
    leads: 1340,
    conversions: 327,
    spend: 59000,
    revenue: 1470000,
    roi: 2391.53,
  },
  {
    channel: "WHATSAPP",
    channelLabel: "WhatsApp",
    leads: 750,
    conversions: 184,
    spend: 32500,
    revenue: 920000,
    roi: 2730.77,
  },
  {
    channel: "SOCIAL_MEDIA",
    channelLabel: "Social Media",
    leads: 810,
    conversions: 138,
    spend: 105000,
    revenue: 690000,
    roi: 557.14,
  },
  {
    channel: "ADS",
    channelLabel: "Ads / Meta Ads",
    leads: 3080,
    conversions: 407,
    spend: 640000,
    revenue: 2759000,
    roi: 331.09,
  },
  {
    channel: "AUTOMATION",
    channelLabel: "Marketing Automation",
    leads: 1825,
    conversions: 730,
    spend: 16500,
    revenue: 3650000,
    roi: 22021.21,
  },
];
