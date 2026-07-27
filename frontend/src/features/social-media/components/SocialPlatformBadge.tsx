import type { SocialPlatform } from "../types/socialPost";

interface SocialPlatformBadgeProps {
  platform: SocialPlatform;
  className?: string;
}

const platformConfig: Record<SocialPlatform, { label: string; color: string }> =
  {
    FACEBOOK: {
      label: "Facebook",
      color: "bg-blue-100 text-blue-700 dark:bg-blue-900/50 dark:text-blue-300 border-blue-200 dark:border-blue-800",
    },
    INSTAGRAM: {
      label: "Instagram",
      color: "bg-pink-100 text-pink-700 dark:bg-pink-900/50 dark:text-pink-300 border-pink-200 dark:border-pink-800",
    },
    LINKEDIN: {
      label: "LinkedIn",
      color: "bg-sky-100 text-sky-700 dark:bg-sky-900/50 dark:text-sky-300 border-sky-200 dark:border-sky-800",
    },
  };

export function SocialPlatformBadge({
  platform,
  className = "",
}: SocialPlatformBadgeProps) {
  const config = platformConfig[platform] || platformConfig.FACEBOOK;

  return (
    <span
      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold border ${config.color} ${className}`}
    >
      {config.label}
    </span>
  );
}

