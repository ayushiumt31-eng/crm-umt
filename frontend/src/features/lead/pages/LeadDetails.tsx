import { useParams, useNavigate } from "react-router-dom";
import DetailsPage from "@/components/common/DetailsPage";
import type { DetailSection } from "@/components/common/DetailsPage";
import { 
  User, Mail, Phone, Building2, Calendar, Briefcase, 
  DollarSign, Target, TrendingUp, Clock, UserCheck,
  BarChart3, LineChart, Award, FileText
} from "lucide-react";
import { dummyLead } from "../data/dummy-lead";

export default function LeadDetails() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const lead = dummyLead.find((l) => l.id === id);

  if (!lead) {
    return (
      <DetailsPage
        title="Lead Not Found"
        subtitle="Error"
        onBack={() => navigate("/lead")}
        sections={[]}
        customLayout={
          <div className="rounded-2xl border-2 border-dashed border-red-300 dark:border-red-700 bg-gradient-to-br from-red-50 to-red-100 dark:from-red-950/30 dark:to-red-900/30 p-16 text-center">
            <div className="flex h-20 w-20 items-center justify-center rounded-full bg-red-100 dark:bg-red-900/50 mx-auto mb-4">
              <Target className="h-10 w-10 text-red-600 dark:text-red-400" />
            </div>
            <h3 className="text-2xl font-bold text-red-900 dark:text-red-100 mb-2">Lead Not Found</h3>
            <p className="text-red-700 dark:text-red-300">This lead may have been deleted or doesn't exist.</p>
          </div>
        }
      />
    );
  }

  const getStatusConfig = () => {
    const configs = {
      NEW: { 
        variant: "info" as const, 
        badge: "bg-blue-500/10 text-blue-700 dark:text-blue-300 border border-blue-300/50 dark:border-blue-700/50",
        icon: "🆕",
        label: "New Lead"
      },
      CONTACTED: { 
        variant: "info" as const, 
        badge: "bg-cyan-500/10 text-cyan-700 dark:text-cyan-300 border border-cyan-300/50 dark:border-cyan-700/50",
        icon: "📞",
        label: "Contacted"
      },
      QUALIFIED: { 
        variant: "success" as const, 
        badge: "bg-green-500/10 text-green-700 dark:text-green-300 border border-green-300/50 dark:border-green-700/50",
        icon: "✅",
        label: "Qualified"
      },
      PROPOSAL: { 
        variant: "warning" as const, 
        badge: "bg-blue-500/10 text-blue-700 dark:text-blue-300 border border-blue-300/50 dark:border-blue-700/50",
        icon: "📄",
        label: "Proposal Sent"
      },
      NEGOTIATION: { 
        variant: "warning" as const, 
        badge: "bg-cyan-500/10 text-cyan-700 dark:text-cyan-300 border border-cyan-300/50 dark:border-cyan-700/50",
        icon: "🤝",
        label: "In Negotiation"
      },
      CONVERTED: { 
        variant: "success" as const, 
        badge: "bg-green-500/10 text-green-700 dark:text-green-300 border border-green-300/50 dark:border-green-700/50",
        icon: "🎉",
        label: "Converted"
      },
      LOST: { 
        variant: "error" as const, 
        badge: "bg-slate-500/10 text-slate-700 dark:text-slate-300 border border-slate-300/50 dark:border-slate-700/50",
        icon: "❌",
        label: "Lost"
      },
    };
    return configs[lead.status] || configs.NEW;
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
        bg: "bg-cyan-500/10", 
        text: "text-cyan-700 dark:text-cyan-300", 
        border: "border-cyan-300/50 dark:border-cyan-700/50",
        icon: "bg-cyan-100 dark:bg-cyan-900/40 text-cyan-600 dark:text-cyan-400",
        emoji: "⚡",
        label: "High"
      },
      MEDIUM: { 
        bg: "bg-blue-500/10", 
        text: "text-blue-700 dark:text-blue-300", 
        border: "border-blue-300/50 dark:border-blue-700/50",
        icon: "bg-blue-100 dark:bg-blue-900/40 text-blue-600 dark:text-blue-400",
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
    return configs[lead.priority] || configs.MEDIUM;
  };

  const statusConfig = getStatusConfig();
  const priorityConfig = getPriorityConfig();
  const sections: DetailSection[] = [];

  // LEAD OVERVIEW SECTION
  sections.push({
    title: "Lead Overview",
    icon: BarChart3,
    iconColor: "text-blue-600 dark:text-blue-400",
    headerGradient: "bg-gradient-to-r from-blue-50 to-cyan-50 dark:from-blue-950/20 dark:to-cyan-950/20",
    columns: 2,
    fields: [
      {
        icon: Target,
        iconBgColor: "bg-blue-100 dark:bg-blue-900/30",
        iconColor: "text-blue-600 dark:text-blue-400",
        label: "Lead Status",
        value: (
          <span className={`inline-flex items-center gap-2 rounded-xl px-4 py-2.5 text-sm font-bold ${statusConfig.badge}`}>
            <span className="text-lg">{statusConfig.icon}</span>
            {statusConfig.label}
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
    ],
  });

  // CONTACT INFORMATION SECTION
  sections.push({
    title: "Contact Information",
    icon: User,
    iconColor: "text-blue-600 dark:text-blue-400",
    headerGradient: "bg-gradient-to-r from-blue-50 to-cyan-50 dark:from-blue-950/30 dark:to-cyan-950/30",
    columns: 2,
    fields: [
      {
        icon: User,
        iconBgColor: "bg-blue-100 dark:bg-blue-900/40",
        iconColor: "text-blue-600 dark:text-blue-400",
        label: "Full Name",
        value: (
          <div className="space-y-1">
            <p className="text-xl font-bold text-slate-900 dark:text-white">{lead.firstName} {lead.lastName}</p>
            <p className="text-xs text-slate-500 dark:text-slate-400">Primary Contact</p>
          </div>
        ),
        type: "custom",
      },
      {
        icon: Mail,
        iconBgColor: "bg-cyan-100 dark:bg-cyan-900/40",
        iconColor: "text-cyan-600 dark:text-cyan-400",
        label: "Email Address",
        value: lead.email,
        type: "email",
      },
      {
        icon: Phone,
        iconBgColor: "bg-green-100 dark:bg-green-900/40",
        iconColor: "text-green-600 dark:text-green-400",
        label: "Phone Number",
        value: lead.phone,
        type: "phone",
      },
      {
        icon: Building2,
        iconBgColor: "bg-blue-100 dark:bg-blue-900/40",
        iconColor: "text-blue-600 dark:text-blue-400",
        label: "Company",
        value: lead.company || "—",
      },
    ],
  });

  // SALES & REVENUE SECTION
  sections.push({
    title: "Sales & Revenue Potential",
    icon: DollarSign,
    iconColor: "text-green-600 dark:text-green-400",
    headerGradient: "bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-950/20 dark:to-emerald-950/20",
    fields: [
      {
        icon: DollarSign,
        iconBgColor: "bg-green-100 dark:bg-green-900/30",
        iconColor: "text-green-600 dark:text-green-400",
        label: "Estimated Deal Value",
        value: (
          <div className="space-y-1">
            <p className="text-3xl font-bold text-green-600 dark:text-green-400">
              {lead.estimatedValue ? `$${lead.estimatedValue.toLocaleString()}` : "$0"}
            </p>
            <p className="text-xs text-slate-500 dark:text-slate-400">Potential Revenue</p>
          </div>
        ),
        type: "custom",
      },
      {
        icon: Calendar,
        iconBgColor: "bg-cyan-100 dark:bg-cyan-900/30",
        iconColor: "text-cyan-600 dark:text-cyan-400",
        label: "Expected Close Date",
        value: lead.expectedCloseDate 
          ? new Date(lead.expectedCloseDate).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })
          : "Not set",
      },
      {
        icon: UserCheck,
        iconBgColor: "bg-blue-100 dark:bg-blue-900/30",
        iconColor: "text-blue-600 dark:text-blue-400",
        label: "Sales Representative",
        value: lead.assignedTo || "Unassigned",
      },
    ],
  });

  // LEAD INTELLIGENCE SECTION
  sections.push({
    title: "Lead Intelligence",
    icon: LineChart,
    iconColor: "text-cyan-600 dark:text-cyan-400",
    headerGradient: "bg-gradient-to-r from-cyan-50 to-blue-50 dark:from-cyan-950/20 dark:to-blue-950/20",
    fields: [
      {
        icon: Target,
        iconBgColor: "bg-cyan-100 dark:bg-cyan-900/30",
        iconColor: "text-cyan-600 dark:text-cyan-400",
        label: "Lead Source",
        value: (
          <span className="inline-flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-bold bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 border border-blue-300/50 dark:border-blue-700/50">
            📍 {lead.source.replace("_", " ")}
          </span>
        ),
        type: "custom",
      },
      {
        icon: Clock,
        iconBgColor: "bg-blue-100 dark:bg-blue-900/30",
        iconColor: "text-blue-600 dark:text-blue-400",
        label: "Lead Age",
        value: (() => {
          const days = Math.floor((Date.now() - new Date(lead.createdAt).getTime()) / (1000 * 60 * 60 * 24));
          return `${days} ${days === 1 ? 'day' : 'days'} old`;
        })(),
      },
      {
        icon: TrendingUp,
        iconBgColor: "bg-green-100 dark:bg-green-900/30",
        iconColor: "text-green-600 dark:text-green-400",
        label: "Conversion Probability",
        value: (() => {
          const prob = lead.status === "CONVERTED" ? 100 :
                      lead.status === "NEGOTIATION" ? 75 :
                      lead.status === "PROPOSAL" ? 50 :
                      lead.status === "QUALIFIED" ? 35 :
                      lead.status === "CONTACTED" ? 20 : 10;
          return (
            <div className="flex items-center gap-3">
              <span className="text-xl font-bold text-green-600 dark:text-green-400">{prob}%</span>
              <div className="flex-1 h-3 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
                <div className="h-full bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full" style={{ width: `${prob}%` }}></div>
              </div>
            </div>
          );
        })(),
        type: "custom",
      },
    ],
  });

  // COMPANY DETAILS (if available)
  if (lead.jobTitle || lead.industry) {
    sections.push({
      title: "Company & Role Details",
      icon: Briefcase,
      iconColor: "text-blue-600 dark:text-blue-400",
      headerGradient: "bg-gradient-to-r from-blue-50 to-cyan-50 dark:from-blue-950/20 dark:to-cyan-950/20",
      fields: [
        ...(lead.jobTitle ? [{
          icon: Briefcase,
          iconBgColor: "bg-blue-100 dark:bg-blue-900/30",
          iconColor: "text-blue-600 dark:text-blue-400",
          label: "Job Title",
          value: lead.jobTitle,
        }] : []),
        ...(lead.industry ? [{
          icon: Building2,
          iconBgColor: "bg-cyan-100 dark:bg-cyan-900/30",
          iconColor: "text-cyan-600 dark:text-cyan-400",
          label: "Industry",
          value: lead.industry,
        }] : []),
      ],
    });
  }

  // NOTES (if available)
  if (lead.notes) {
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
              <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed whitespace-pre-wrap">{lead.notes}</p>
            </div>
          ),
          type: "custom",
        },
      ],
    });
  }

  // TIMELINE SECTION
  sections.push({
    title: "Activity Timeline",
    icon: Clock,
    iconColor: "text-blue-600 dark:text-blue-400",
    headerGradient: "bg-gradient-to-r from-blue-50 to-cyan-50 dark:from-blue-950/20 dark:to-cyan-950/20",
    fields: [
      {
        icon: Calendar,
        iconBgColor: "bg-blue-100 dark:bg-blue-900/30",
        iconColor: "text-blue-600 dark:text-blue-400",
        label: "Lead Created",
        value: (
          <div className="space-y-1">
            <p className="text-base font-bold text-slate-900 dark:text-white">
              {new Date(lead.createdAt).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}
            </p>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              {new Date(lead.createdAt).toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" })}
            </p>
          </div>
        ),
        type: "custom",
      },
      ...(lead.updatedAt ? [{
        icon: Clock,
        iconBgColor: "bg-cyan-100 dark:bg-cyan-900/30",
        iconColor: "text-cyan-600 dark:text-cyan-400",
        label: "Last Activity",
        value: (
          <div className="space-y-1">
            <p className="text-base font-bold text-slate-900 dark:text-white">
              {new Date(lead.updatedAt).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}
            </p>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              {new Date(lead.updatedAt).toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" })}
            </p>
          </div>
        ),
        type: "custom" as const,
      }] : []),
    ],
  });

  const handleDelete = async () => {
    const index = dummyLead.findIndex((l) => l.id === id);
    if (index !== -1) {
      dummyLead.splice(index, 1);
      setTimeout(() => navigate("/lead"), 500);
    }
  };

  return (
    <DetailsPage
      title={`${lead.firstName} ${lead.lastName}`}
      subtitle="Lead Profile"
      status={{
        label: statusConfig.label,
        variant: statusConfig.variant,
        animated: lead.status === "QUALIFIED" || lead.status === "NEGOTIATION" || lead.status === "PROPOSAL",
      }}
      headerGradient="from-blue-600 via-cyan-500 to-blue-600 dark:from-blue-900 dark:via-cyan-900 dark:to-blue-900"
      onBack={() => navigate("/lead")}
      onEdit={() => navigate(`/lead/${id}/edit`)}
      onDelete={handleDelete}
      sections={sections}
      gridLayout="3-col"
      deleteConfirmation={{
        title: "Delete Lead?",
        message: `Are you sure you want to permanently delete ${lead.firstName} ${lead.lastName}? This action cannot be undone.`,
        confirmLabel: "Yes, Delete Lead",
        cancelLabel: "Cancel",
      }}
      customActions={[
        {
          label: "Send Email",
          icon: Mail,
          onClick: () => window.location.href = `mailto:${lead.email}`,
          variant: "primary",
        },
        {
          label: "Call Lead",
          icon: Phone,
          onClick: () => window.location.href = `tel:${lead.phone}`,
          variant: "ghost",
        },
      ]}
    />
  );
}
