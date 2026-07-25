import {
  Mail,
  MessageCircle,
  MessageSquare,
  Phone,
  Calendar,
  FileText,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import type { CommunicationType } from "../types/communication";

interface CommunicationTypeBadgeProps {
  type: CommunicationType;
  showLabel?: boolean;
  className?: string;
}

const typeConfig: Record<
  CommunicationType,
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
  CALL: {
    icon: Phone,
    label: "Call",
    color: "text-cyan-600 dark:text-cyan-400",
    bg: "bg-cyan-100 dark:bg-cyan-900/30",
  },
  MEETING: {
    icon: Calendar,
    label: "Meeting",
    color: "text-orange-600 dark:text-orange-400",
    bg: "bg-orange-100 dark:bg-orange-900/30",
  },
  NOTE: {
    icon: FileText,
    label: "Note",
    color: "text-slate-600 dark:text-slate-400",
    bg: "bg-slate-100 dark:bg-slate-800",
  },
};

export function CommunicationTypeBadge({
  type,
  showLabel = true,
  className = "",
}: CommunicationTypeBadgeProps) {
  const config = typeConfig[type] || typeConfig.NOTE;
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

