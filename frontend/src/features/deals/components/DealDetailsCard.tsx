import type { Deal } from "../types/deal";
import { 
  Building2, 
  DollarSign, 
  CalendarDays, 
  Mail, 
  Phone, 
  UserRound, 
  Tag, 
  Clock,
  Briefcase
} from "lucide-react";

interface DealDetailsCardProps {
  deal: Deal;
}

export function DealDetailsCard({ deal }: DealDetailsCardProps) {
  const stageStyles: Record<string, string> = {
    PROSPECTING: "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300",
    QUALIFICATION: "bg-cyan-100 text-cyan-700 dark:bg-cyan-900/30 dark:text-cyan-300",
    PROPOSAL: "bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-300",
    NEGOTIATION: "bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-300",
    CLOSED_WON: "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-300",
    CLOSED_LOST: "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-300",
  };

  const priorityStyles: Record<string, string> = {
    LOW: "bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300",
    MEDIUM: "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-300",
    HIGH: "bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-300",
    URGENT: "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-300",
  };

  return (
    <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-800 overflow-hidden">
      {/* Header section */}
      <div className="p-6 border-b border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/20">
        <div className="flex justify-between items-start mb-4">
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-100 dark:bg-blue-900/40 text-blue-600 dark:text-blue-400">
              <Briefcase className="h-6 w-6" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-slate-900 dark:text-white">
                {deal.title}
              </h2>
              <div className="flex items-center gap-2 text-slate-500 mt-1">
                <Building2 className="h-4 w-4" />
                <span>{deal.company}</span>
              </div>
            </div>
          </div>
          <div className="text-right">
            <div className="text-2xl font-bold text-slate-900 dark:text-white flex items-center justify-end">
              <DollarSign className="h-6 w-6 text-emerald-500" />
              {deal.value.toLocaleString()}
            </div>
          </div>
        </div>

        <div className="flex flex-wrap gap-2">
          <span className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold ${stageStyles[deal.stage] || "bg-slate-100 text-slate-700"}`}>
            <Tag className="h-3.5 w-3.5" />
            {deal.stage.replace("_", " ")}
          </span>
          <span className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold ${priorityStyles[deal.priority] || "bg-slate-100 text-slate-700"}`}>
            Priority: {deal.priority}
          </span>
        </div>
      </div>

      {/* Body section */}
      <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-8">
        
        {/* Contact Info */}
        <div className="space-y-4">
          <h3 className="text-sm font-semibold text-slate-900 dark:text-white uppercase tracking-wider">
            Contact Details
          </h3>
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-slate-100 dark:bg-slate-800">
                <UserRound className="h-4 w-4 text-slate-500" />
              </div>
              <div>
                <p className="text-xs text-slate-500 dark:text-slate-400">Point of Contact</p>
                <p className="text-sm font-medium text-slate-900 dark:text-white">{deal.contactPerson}</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-slate-100 dark:bg-slate-800">
                <Mail className="h-4 w-4 text-slate-500" />
              </div>
              <div>
                <p className="text-xs text-slate-500 dark:text-slate-400">Email Address</p>
                <a href={`mailto:${deal.contactEmail}`} className="text-sm font-medium text-blue-600 hover:underline dark:text-blue-400">
                  {deal.contactEmail}
                </a>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-slate-100 dark:bg-slate-800">
                <Phone className="h-4 w-4 text-slate-500" />
              </div>
              <div>
                <p className="text-xs text-slate-500 dark:text-slate-400">Phone Number</p>
                <a href={`tel:${deal.contactPhone}`} className="text-sm font-medium text-blue-600 hover:underline dark:text-blue-400">
                  {deal.contactPhone}
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Timeline & Ownership */}
        <div className="space-y-4">
          <h3 className="text-sm font-semibold text-slate-900 dark:text-white uppercase tracking-wider">
            Timeline & Owner
          </h3>
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-slate-100 dark:bg-slate-800">
                <CalendarDays className="h-4 w-4 text-slate-500" />
              </div>
              <div>
                <p className="text-xs text-slate-500 dark:text-slate-400">Expected Close</p>
                <p className="text-sm font-medium text-slate-900 dark:text-white">
                  {new Date(deal.expectedCloseDate).toLocaleDateString(undefined, {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-slate-100 dark:bg-slate-800">
                <UserRound className="h-4 w-4 text-slate-500" />
              </div>
              <div>
                <p className="text-xs text-slate-500 dark:text-slate-400">Assigned To</p>
                <p className="text-sm font-medium text-slate-900 dark:text-white">{deal.assignedTo}</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-slate-100 dark:bg-slate-800">
                <Clock className="h-4 w-4 text-slate-500" />
              </div>
              <div>
                <p className="text-xs text-slate-500 dark:text-slate-400">Created At</p>
                <p className="text-sm font-medium text-slate-900 dark:text-white">
                  {new Date(deal.createdAt).toLocaleDateString()}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {deal.notes && (
        <div className="p-6 border-t border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/20">
          <h3 className="text-sm font-semibold text-slate-900 dark:text-white uppercase tracking-wider mb-2">
            Notes
          </h3>
          <p className="text-sm text-slate-600 dark:text-slate-400">
            {deal.notes}
          </p>
        </div>
      )}
    </div>
  );
}
