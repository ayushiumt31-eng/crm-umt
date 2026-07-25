import { Mail, MessageCircle, MessageSquare } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import type { CampaignType } from "../types/campaign";

interface CampaignTypeBadgeProps {
  type: CampaignType;
  showLabel?: boolean;
  className?: string;
}

const typeConfig: Record<
  CampaignType,
  { icon: LucideIcon; label: string; color: string; bg: string }
> = {
  EMAIL: {
    icon: Mail,
    label: "Email",
    color: "text-blue-600 dark:text-blue-400",
    bg: "bg-blue-100 dark:bg-blue-900/30",
  },
  WHATSAPP: {
    icon: MessageCircle,
    label: "WhatsApp",
    color: "text-green-600 dark:text-green-400",
    bg: "bg-green-100 dark:bg-green-900/30",
  },
  SMS: {
    icon: MessageSquare,
    label: "SMS",
    color: "text-purple-600 dark:text-purple-400",
    bg: "bg-purple-100 dark:bg-purple-900/30",
  },
};

export function CampaignTypeBadge({
  type,
  showLabel = true,
  className = "",
}: CampaignTypeBadgeProps) {
  const config = typeConfig[type];
  const Icon = config.icon;

  return (
    <span
      className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold border ${config.bg} ${config.color} border-transparent ${className}`}
    >
      <Icon className="h-3.5 w-3.5" />
      {showLabel && config.label}
    </span>
  );
}

