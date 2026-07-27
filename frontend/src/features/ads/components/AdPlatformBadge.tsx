import type { AdPlatform } from "../types/adCampaign";

interface AdPlatformBadgeProps {
  platform: AdPlatform;
}

const platformConfig: Record<AdPlatform, { label: string; color: string; bg: string }> = {
  FACEBOOK: {
    label: "Facebook",
    color: "text-blue-600 dark:text-blue-400",
    bg: "bg-blue-100 dark:bg-blue-900/30",
  },
  INSTAGRAM: {
    label: "Instagram",
    color: "text-pink-600 dark:text-pink-400",
    bg: "bg-pink-100 dark:bg-pink-900/30",
  },
  FACEBOOK_INSTAGRAM: {
    label: "Facebook + Instagram",
    color: "text-purple-600 dark:text-purple-400",
    bg: "bg-purple-100 dark:bg-purple-900/30",
  },
};

export function AdPlatformBadge({ platform }: AdPlatformBadgeProps) {
  const config = platformConfig[platform];

  return (
    <span
      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold ${config.bg} ${config.color}`}
    >
      {config.label}
    </span>
  );
}

export const adPlatformOptions = [
  { label: "Facebook", value: "FACEBOOK" },
  { label: "Instagram", value: "INSTAGRAM" },
  { label: "Facebook + Instagram", value: "FACEBOOK_INSTAGRAM" },
];
