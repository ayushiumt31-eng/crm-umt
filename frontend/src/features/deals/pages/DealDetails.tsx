import { useParams, useNavigate } from "react-router-dom";
import DetailsPage from "@/components/common/DetailsPage";
import type { DetailSection } from "@/components/common/DetailsPage";
import { 
  User, Mail, Phone, Building2, Calendar, Briefcase, 
  DollarSign, Target, Clock,
  BarChart3, Award, FileText, Tag, Handshake
} from "lucide-react";
import { dummyDeals } from "../data/dummy-deals";

export default function DealDetails() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const deal = dummyDeals.find((d) => d.id === id);

  if (!deal) {
    return (
      <DetailsPage
        title="Deal Not Found"
        subtitle="Error"
        onBack={() => navigate("/deals")}
        sections={[]}
        customLayout={
          <div className="rounded-2xl border-2 border-dashed border-red-300 dark:border-red-700 bg-gradient-to-br from-red-50 to-red-100 dark:from-red-950/30 dark:to-red-900/30 p-16 text-center">
            <div className="flex h-20 w-20 items-center justify-center rounded-full bg-red-100 dark:bg-red-900/50 mx-auto mb-4">
              <Briefcase className="h-10 w-10 text-red-600 dark:text-red-400" />
            </div>
            <h3 className="text-2xl font-bold text-red-900 dark:text-red-100 mb-2">Deal Not Found</h3>
            <p className="text-red-700 dark:text-red-300">This deal may have been deleted or doesn't exist.</p>
          </div>
        }
      />
    );
  }

  const getStageConfig = () => {
    const configs = {
      PROSPECTING: { 
        variant: "info" as const, 
        badge: "bg-blue-500/10 text-blue-700 dark:text-blue-300 border border-blue-300/50 dark:border-blue-700/50",
        icon: "🔍",
        label: "Prospecting"
      },
      QUALIFICATION: { 
        variant: "info" as const, 
        badge: "bg-cyan-500/10 text-cyan-700 dark:text-cyan-300 border border-cyan-300/50 dark:border-cyan-700/50",
        icon: "📋",
        label: "Qualification"
      },
      PROPOSAL: { 
        variant: "warning" as const, 
        badge: "bg-purple-500/10 text-purple-700 dark:text-purple-300 border border-purple-300/50 dark:border-purple-700/50",
        icon: "📄",
        label: "Proposal"
      },
      NEGOTIATION: { 
        variant: "warning" as const, 
        badge: "bg-orange-500/10 text-orange-700 dark:text-orange-300 border border-orange-300/50 dark:border-orange-700/50",
        icon: "🤝",
        label: "Negotiation"
      },
      CLOSED_WON: { 
        variant: "success" as const, 
        badge: "bg-emerald-500/10 text-emerald-700 dark:text-emerald-300 border border-emerald-300/50 dark:border-emerald-700/50",
        icon: "🎉",
        label: "Closed Won"
      },
      CLOSED_LOST: { 
        variant: "error" as const, 
        badge: "bg-red-500/10 text-red-700 dark:text-red-300 border border-red-300/50 dark:border-red-700/50",
        icon: "❌",
        label: "Closed Lost"
      },
    };
    return configs[deal.stage] || configs.PROSPECTING;
  };

  const getPriorityConfig = () => {
    const configs = {
      URGENT: { 
        bg: "bg-red-500/10", 
        text: "text-red-700 dark:text-red-300", 
        border: "border-red-300/50 dark:border-red-700/50",
        icon: "bg-red-100 dark:bg-red-900/40 text-red-600 dark:text-red-400",
        emoji: "🔥",
        label: "Urgent"
      },
      HIGH: { 
        bg: "bg-orange-500/10", 
        text: "text-orange-700 dark:text-orange-300", 
        border: "border-orange-300/50 dark:border-orange-700/50",
        icon: "bg-orange-100 dark:bg-orange-900/40 text-orange-600 dark:text-orange-400",
        emoji: "⚡",
        label: "High"
      },
      MEDIUM: { 
        bg: "bg-yellow-500/10", 
        text: "text-yellow-700 dark:text-yellow-300", 
        border: "border-yellow-300/50 dark:border-yellow-700/50",
        icon: "bg-yellow-100 dark:bg-yellow-900/40 text-yellow-600 dark:text-yellow-400",
        emoji: "⭐",
        label: "Medium"
      },
      LOW: { 
        bg: "bg-slate-500/10", 
        text: "text-slate-700 dark:text-slate-300", 
        border: "border-slate-300/50 dark:border-slate-700/50",
        icon: "bg-slate-100 dark:bg-slate-900/40 text-slate-600 dark:text-slate-400",
        emoji: "📌",
        label: "Low"
      },
    };
    return configs[deal.priority] || configs.MEDIUM;
  };

  const stageConfig = getStageConfig();
  const priorityConfig = getPriorityConfig();
  const sections: DetailSection[] = [];

  // DEAL OVERVIEW SECTION
  sections.push({
    title: "Deal Overview",
    icon: BarChart3,
    iconColor: "text-indigo-600 dark:text-indigo-400",
    headerGradient: "bg-gradient-to-r from-indigo-50 to-purple-50 dark:from-indigo-950/20 dark:to-purple-950/20",
    columns: 2,
    fields: [
      {
        icon: DollarSign,
        iconBgColor: "bg-emerald-100 dark:bg-emerald-900/30",
        iconColor: "text-emerald-600 dark:text-emerald-400",
        label: "Deal Value",
        value: (
          <div className="space-y-1">
            <p className="text-3xl font-bold text-emerald-600 dark:text-emerald-400">
              ${deal.value.toLocaleString()}
            </p>
            <p className="text-xs text-slate-500 dark:text-slate-400">Total Contract Value</p>
          </div>
        ),
        type: "custom",
      },
      {
        icon: Tag,
        iconBgColor: "bg-indigo-100 dark:bg-indigo-900/30",
        iconColor: "text-indigo-600 dark:text-indigo-400",
        label: "Deal Stage",
        value: (
          <span className={`inline-flex items-center gap-2 rounded-xl px-4 py-2.5 text-sm font-bold ${stageConfig.badge}`}>
            <span className="text-lg">{stageConfig.icon}</span>
            {stageConfig.label}
          </span>
        ),
        type: "custom",
      },
      {
        icon: Award,
        iconBgColor: priorityConfig.icon,
        iconColor: priorityConfig.text,
        label: "Priority Level",
        value: (
          <span className={`inline-flex items-center gap-2 rounded-xl px-4 py-2.5 text-sm font-bold border ${priorityConfig.bg} ${priorityConfig.text} ${priorityConfig.border}`}>
            <span className="text-lg">{priorityConfig.emoji}</span>
            {priorityConfig.label} Priority
          </span>
        ),
        type: "custom",
      },
      {
        icon: Building2,
        iconBgColor: "bg-blue-100 dark:bg-blue-900/40",
        iconColor: "text-blue-600 dark:text-blue-400",
        label: "Company",
        value: deal.company,
      }
    ],
  });

  // CONTACT INFORMATION SECTION
  sections.push({
    title: "Point of Contact",
    icon: User,
    iconColor: "text-blue-600 dark:text-blue-400",
    headerGradient: "bg-gradient-to-r from-blue-50 to-cyan-50 dark:from-blue-950/30 dark:to-cyan-950/30",
    columns: 2,
    fields: [
      {
        icon: User,
        iconBgColor: "bg-blue-100 dark:bg-blue-900/40",
        iconColor: "text-blue-600 dark:text-blue-400",
        label: "Contact Person",
        value: (
          <div className="space-y-1">
            <p className="text-xl font-bold text-slate-900 dark:text-white">{deal.contactPerson}</p>
          </div>
        ),
        type: "custom",
      },
      {
        icon: Mail,
        iconBgColor: "bg-cyan-100 dark:bg-cyan-900/40",
        iconColor: "text-cyan-600 dark:text-cyan-400",
        label: "Email Address",
        value: deal.contactEmail,
        type: "email",
      },
      {
        icon: Phone,
        iconBgColor: "bg-green-100 dark:bg-green-900/40",
        iconColor: "text-green-600 dark:text-green-400",
        label: "Phone Number",
        value: deal.contactPhone,
        type: "phone",
      },
    ],
  });

  // TIMELINE & OWNERSHIP
  sections.push({
    title: "Timeline & Ownership",
    icon: Clock,
    iconColor: "text-indigo-600 dark:text-indigo-400",
    headerGradient: "bg-gradient-to-r from-indigo-50 to-purple-50 dark:from-indigo-950/20 dark:to-purple-950/20",
    fields: [
      {
        icon: Calendar,
        iconBgColor: "bg-purple-100 dark:bg-purple-900/30",
        iconColor: "text-purple-600 dark:text-purple-400",
        label: "Expected Close Date",
        value: (
          <div className="space-y-1">
            <p className="text-base font-bold text-slate-900 dark:text-white">
              {new Date(deal.expectedCloseDate).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}
            </p>
          </div>
        ),
        type: "custom",
      },
      {
        icon: Handshake,
        iconBgColor: "bg-blue-100 dark:bg-blue-900/30",
        iconColor: "text-blue-600 dark:text-blue-400",
        label: "Assigned Representative",
        value: deal.assignedTo,
      },
      {
        icon: Clock,
        iconBgColor: "bg-slate-100 dark:bg-slate-800/50",
        iconColor: "text-slate-600 dark:text-slate-400",
        label: "Deal Created",
        value: new Date(deal.createdAt).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" }),
      }
    ],
  });

  // NOTES (if available)
  if (deal.notes) {
    sections.push({
      title: "Notes & Remarks",
      icon: FileText,
      iconColor: "text-slate-600 dark:text-slate-400",
      headerGradient: "bg-gradient-to-r from-slate-50 to-slate-100 dark:from-slate-950/30 dark:to-slate-900/30",
      columns: 2,
      fields: [
        {
          icon: FileText,
          iconBgColor: "bg-slate-100 dark:bg-slate-900/40",
          iconColor: "text-slate-600 dark:text-slate-400",
          label: "Internal Notes",
          value: (
            <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-900/50 border-2 border-slate-200 dark:border-slate-700">
              <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed whitespace-pre-wrap">{deal.notes}</p>
            </div>
          ),
          type: "custom",
        },
      ],
    });
  }

  const handleDelete = async () => {
    const index = dummyDeals.findIndex((d) => d.id === id);
    if (index !== -1) {
      dummyDeals.splice(index, 1);
      setTimeout(() => navigate("/deals"), 500);
    }
  };

  return (
    <DetailsPage
      title={deal.title}
      subtitle={`Deal with ${deal.company}`}
      status={{
        label: stageConfig.label,
        variant: stageConfig.variant,
        animated: deal.stage === "NEGOTIATION" || deal.stage === "PROPOSAL",
      }}
      headerGradient="from-indigo-600 via-purple-500 to-indigo-600 dark:from-indigo-900 dark:via-purple-900 dark:to-indigo-900"
      onBack={() => navigate("/deals")}
      onEdit={() => navigate(`/deals/${id}/edit`)}
      onDelete={handleDelete}
      sections={sections}
      gridLayout="3-col"
      deleteConfirmation={{
        title: "Delete Deal?",
        message: `Are you sure you want to permanently delete the deal "${deal.title}"? This action cannot be undone.`,
        confirmLabel: "Yes, Delete Deal",
        cancelLabel: "Cancel",
      }}
      customActions={[
        {
          label: "Email Contact",
          icon: Mail,
          onClick: () => window.location.href = `mailto:${deal.contactEmail}`,
          variant: "primary",
        },
        {
          label: "Call Contact",
          icon: Phone,
          onClick: () => window.location.href = `tel:${deal.contactPhone}`,
          variant: "ghost",
        },
      ]}
    />
  );
}
