interface LeadSourceBadgeProps {
  source: "Website" | "Referral" | "Social Media" | "Campaign" | "Walk-in";
  className?: string;
}

const sourceConfig = {
  Website: {
    bg: "bg-blue-100 dark:bg-blue-900/50",
    text: "text-blue-700 dark:text-blue-300",
    icon: "🌐",
  },
  Referral: {
    bg: "bg-green-100 dark:bg-green-900/50",
    text: "text-green-700 dark:text-green-300",
    icon: "👥",
  },
  "Social Media": {
    bg: "bg-purple-100 dark:bg-purple-900/50",
    text: "text-purple-700 dark:text-purple-300",
    icon: "📱",
  },
  Campaign: {
    bg: "bg-orange-100 dark:bg-orange-900/50",
    text: "text-orange-700 dark:text-orange-300",
    icon: "📢",
  },
  "Walk-in": {
    bg: "bg-pink-100 dark:bg-pink-900/50",
    text: "text-pink-700 dark:text-pink-300",
    icon: "🚶",
  },
};

export function LeadSourceBadge({ source, className = "" }: LeadSourceBadgeProps) {
  const config = sourceConfig[source];

  return (
    <span className={`inline-flex items-center gap-1.5 rounded-full ${config.bg} px-2.5 py-1 text-xs font-semibold ${config.text} ${className}`}>
      {config.icon}
      {source}
    </span>
  );
}
