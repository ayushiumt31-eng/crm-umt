import {
  Mail,
  MessageCircle,
  MessageSquare,
  Phone,
  Calendar,
  FileText,
  Building2,
  User,
  Briefcase,
  CalendarDays,
  Clock,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import type { Communication, CommunicationType } from "../types/communication";
import { CommunicationTypeBadge } from "./CommunicationTypeBadge";
import { CommunicationStatusBadge } from "./CommunicationStatusBadge";

const typeIcons: Record<CommunicationType, { icon: LucideIcon; label: string; color: string }> = {
  EMAIL: { icon: Mail, label: "Email", color: "text-blue-600 dark:text-blue-400" },
  WHATSAPP: { icon: MessageCircle, label: "WhatsApp", color: "text-green-600 dark:text-green-400" },
  SMS: { icon: MessageSquare, label: "SMS", color: "text-purple-600 dark:text-purple-400" },
  CALL: { icon: Phone, label: "Call", color: "text-cyan-600 dark:text-cyan-400" },
  MEETING: { icon: Calendar, label: "Meeting", color: "text-orange-600 dark:text-orange-400" },
  NOTE: { icon: FileText, label: "Note", color: "text-slate-600 dark:text-slate-400" },
};

interface CommunicationDetailsCardProps {
  communication: Communication;
}

export function CommunicationDetailsCard({ communication }: CommunicationDetailsCardProps) {
  const typeConfig = typeIcons[communication.type] || typeIcons.NOTE;
  const TypeIcon = typeConfig.icon;

  const detailItems = [
    { icon: Mail, iconColor: "text-blue-600 dark:text-blue-400", label: "Recipient", value: communication.recipient || "—" },
    { icon: Building2, iconColor: "text-blue-600 dark:text-blue-400", label: "Customer", value: communication.customerName || "N/A" },
    { icon: User, iconColor: "text-indigo-600 dark:text-indigo-400", label: "Lead", value: communication.leadName || "N/A" },
    { icon: Briefcase, iconColor: "text-cyan-600 dark:text-cyan-400", label: "Deal / Opportunity", value: communication.dealName || "N/A" },
    { icon: User, iconColor: "text-slate-600 dark:text-slate-400", label: "Assigned To", value: communication.assignedToName },
    { icon: CalendarDays, iconColor: "text-emerald-600 dark:text-emerald-400", label: "Communication Date", value: new Date(communication.communicationDate).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" }) },
    { icon: Clock, iconColor: "text-amber-600 dark:text-amber-400", label: "Time", value: communication.communicationTime || "—" },
  ];

  return (
    <div className="space-y-6">
      {/* Type & Status Header */}
      <div className="flex items-center justify-between p-4 rounded-xl bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-700">
        <div className="flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-white dark:bg-slate-800 shadow-sm">
            <TypeIcon className={`h-6 w-6 ${typeConfig.color}`} />
          </div>
          <div>
            <p className="text-sm font-medium text-slate-500 dark:text-slate-400">Communication Type</p>
            <p className="text-lg font-bold text-slate-900 dark:text-white">{typeConfig.label}</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <CommunicationTypeBadge type={communication.type} />
          <CommunicationStatusBadge status={communication.status} />
        </div>
      </div>

      {/* Subject */}
      {communication.subject && (
        <div className="rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 p-5">
          <h3 className="font-bold text-lg text-slate-900 dark:text-white mb-1">Subject</h3>
          <p className="text-slate-700 dark:text-slate-300">{communication.subject}</p>
        </div>
      )}

      {/* Details Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {detailItems.map((item, index) => (
          <div key={index} className="flex items-start gap-3 p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700">
            <div className={`flex h-10 w-10 items-center justify-center rounded-lg bg-slate-50 dark:bg-slate-800 ${item.iconColor}`}>
              <item.icon className="h-5 w-5" />
            </div>
            <div>
              <p className="text-sm font-medium text-slate-500 dark:text-slate-400">{item.label}</p>
              <p className="text-base font-semibold text-slate-900 dark:text-white">{item.value}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Message */}
      <div className="rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 p-5">
        <div className="flex items-center gap-2 mb-3">
          <FileText className="h-5 w-5 text-slate-500" />
          <h3 className="font-semibold text-slate-900 dark:text-white">Message</h3>
        </div>
        <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed whitespace-pre-wrap">
          {communication.message}
        </p>
      </div>

      {/* Timestamps */}
      <div className="flex gap-6 text-xs text-slate-500 dark:text-slate-500">
        <span>
          Created:{" "}
          {new Date(communication.createdAt).toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
            hour: "2-digit",
            minute: "2-digit",
          })}
        </span>
        {communication.updatedAt && (
          <span>
            Updated:{" "}
            {new Date(communication.updatedAt).toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
              hour: "2-digit",
              minute: "2-digit",
            })}
          </span>
        )}
      </div>
    </div>
  );
}

