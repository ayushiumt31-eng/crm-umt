interface LeadStatusBadgeProps {
  status: "New" | "Contacted" | "Qualified" | "Proposal Sent" | "Won" | "Lost";
  className?: string;
}

const statusConfig = {
  New: {
    bg: "from-blue-50 to-blue-100 dark:from-blue-950/40 dark:to-blue-900/20",
    border: "border-blue-200/50 dark:border-blue-800/50",
    text: "text-blue-700 dark:text-blue-300",
    icon: "🆕",
  },
  Contacted: {
    bg: "from-cyan-50 to-cyan-100 dark:from-cyan-950/40 dark:to-cyan-900/20",
    border: "border-cyan-200/50 dark:border-cyan-800/50",
    text: "text-cyan-700 dark:text-cyan-300",
    icon: "📞",
  },
  Qualified: {
    bg: "from-purple-50 to-purple-100 dark:from-purple-950/40 dark:to-purple-900/20",
    border: "border-purple-200/50 dark:border-purple-800/50",
    text: "text-purple-700 dark:text-purple-300",
    icon: "✓",
  },
  "Proposal Sent": {
    bg: "from-yellow-50 to-amber-100 dark:from-yellow-950/40 dark:to-amber-900/20",
    border: "border-yellow-200/50 dark:border-amber-800/50",
    text: "text-yellow-700 dark:text-amber-300",
    icon: "📄",
  },
  Won: {
    bg: "from-green-50 to-emerald-100 dark:from-green-950/40 dark:to-emerald-900/20",
    border: "border-green-200/50 dark:border-green-800/50",
    text: "text-green-700 dark:text-emerald-300",
    icon: "🎉",
  },
  Lost: {
    bg: "from-slate-50 to-slate-100 dark:from-slate-950/40 dark:to-slate-900/20",
    border: "border-slate-200/50 dark:border-slate-800/50",
    text: "text-slate-700 dark:text-slate-300",
    icon: "✗",
  },
};

export function LeadStatusBadge({ status, className = "" }: LeadStatusBadgeProps) {
  const config = statusConfig[status];

  return (
    <div
      className={`inline-flex items-center gap-1.5 rounded-full bg-gradient-to-r ${config.bg} border ${config.border} px-3 py-1 ${className}`}
    >
      <span className="text-sm">{config.icon}</span>
      <span className={`text-sm font-semibold ${config.text}`}>{status}</span>
    </div>
  );
}
