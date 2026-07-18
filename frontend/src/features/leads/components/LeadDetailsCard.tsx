import { Copy, Mail, Phone, Building2, Calendar, DollarSign, User } from "lucide-react";
import { useState } from "react";
import type { Lead } from "../types/lead";
import { LeadStatusBadge } from "./LeadStatusBadge";
import { LeadSourceBadge } from "./LeadSourceBadge";

interface LeadDetailsCardProps {
  icon: React.ReactNode;
  label: string;
  value: string | number;
  colorClass: string;
  subValue?: string;
}

export function LeadDetailsCard({
  icon,
  label,
  value,
  colorClass,
  subValue,
}: LeadDetailsCardProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(String(value));
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className={`group rounded-xl bg-gradient-to-br ${colorClass} p-6 border border-opacity-50 shadow-sm hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 cursor-pointer relative overflow-hidden`}>
      {/* Background glow */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-10 bg-white transition-opacity duration-300"></div>

      <div className="relative z-10">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-sm font-semibold text-opacity-80">{label}</h3>
          <button
            onClick={handleCopy}
            className="p-1 rounded-lg hover:bg-white/20 transition-colors opacity-0 group-hover:opacity-100"
            title="Copy to clipboard"
          >
            <Copy className="h-4 w-4" />
          </button>
        </div>

        <div className="flex items-end gap-2">
          <div className="flex-1">
            <div className="text-2xl font-bold break-words">{value}</div>
            {subValue && <p className="text-xs text-opacity-70 mt-1">{subValue}</p>}
          </div>
          <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg bg-white/20 backdrop-blur-md">
            {icon}
          </div>
        </div>
      </div>

      {copied && (
        <div className="absolute inset-0 bg-white/20 rounded-xl flex items-center justify-center z-20 animate-pulse">
          <span className="text-sm font-semibold">Copied!</span>
        </div>
      )}
    </div>
  );
}

interface LeadDetailsSectionProps {
  lead: Lead;
}

export function LeadDetailsSection({ lead }: LeadDetailsSectionProps) {
  return (
    <div className="space-y-8">
      {/* Quick Info Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <LeadDetailsCard
          icon={<Mail className="h-5 w-5 text-white" />}
          label="Email"
          value={lead.email}
          colorClass="from-blue-50 to-blue-100 dark:from-blue-950/40 dark:to-blue-900/20 text-blue-900 dark:text-blue-100 border-blue-200/50 dark:border-blue-800/50"
        />

        <LeadDetailsCard
          icon={<Phone className="h-5 w-5 text-white" />}
          label="Phone"
          value={lead.phone}
          colorClass="from-green-50 to-emerald-100 dark:from-green-950/40 dark:to-emerald-900/20 text-green-900 dark:text-green-100 border-green-200/50 dark:border-green-800/50"
        />

        <LeadDetailsCard
          icon={<DollarSign className="h-5 w-5 text-white" />}
          label="Expected Deal Value"
          value={`$${lead.expectedDealValue.toLocaleString()}`}
          colorClass="from-purple-50 to-purple-100 dark:from-purple-950/40 dark:to-purple-900/20 text-purple-900 dark:text-purple-100 border-purple-200/50 dark:border-purple-800/50"
        />

        <LeadDetailsCard
          icon={<Calendar className="h-5 w-5 text-white" />}
          label="Follow-up Date"
          value={new Date(lead.followUpDate).toLocaleDateString()}
          colorClass="from-orange-50 to-amber-100 dark:from-orange-950/40 dark:to-amber-900/20 text-orange-900 dark:text-orange-100 border-orange-200/50 dark:border-orange-800/50"
        />
      </div>

      {/* Detailed Information */}
      <div className="rounded-2xl border border-slate-200/50 dark:border-slate-800/50 bg-white dark:bg-slate-900 p-8 shadow-sm">
        <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-6">Detailed Information</h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Left Column */}
          <div className="space-y-6">
            {/* Contact Person */}
            <div>
              <div className="flex items-center gap-2 mb-2">
                <User className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">Contact Person</label>
              </div>
              <p className="text-slate-900 dark:text-white font-medium">{lead.contactPerson}</p>
            </div>

            {/* Company */}
            <div>
              <div className="flex items-center gap-2 mb-2">
                <Building2 className="h-4 w-4 text-purple-600 dark:text-purple-400" />
                <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">Company</label>
              </div>
              <p className="text-slate-900 dark:text-white font-medium">{lead.companyName}</p>
            </div>

            {/* Source */}
            <div>
              <label className="text-sm font-semibold text-slate-700 dark:text-slate-300 block mb-2">Source</label>
              <LeadSourceBadge source={lead.source} />
            </div>
          </div>

          {/* Right Column */}
          <div className="space-y-6">
            {/* Status */}
            <div>
              <label className="text-sm font-semibold text-slate-700 dark:text-slate-300 block mb-2">Status</label>
              <LeadStatusBadge status={lead.status} />
            </div>

            {/* Assigned To */}
            <div>
              <div className="flex items-center gap-2 mb-2">
                <User className="h-4 w-4 text-orange-600 dark:text-orange-400" />
                <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">Assigned To</label>
              </div>
              <p className="text-slate-900 dark:text-white font-medium">{lead.assignedTo}</p>
            </div>

            {/* Notes */}
            {lead.notes && (
              <div>
                <label className="text-sm font-semibold text-slate-700 dark:text-slate-300 block mb-2">Notes</label>
                <p className="text-slate-900 dark:text-white text-sm bg-slate-50 dark:bg-slate-800 p-3 rounded-lg">{lead.notes}</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
