import {
  DollarSign,
  Building2,
  CalendarDays,
  UserRound,
  Mail,
  Phone
} from "lucide-react";

export const dealsTableColumns = [
  // Deal Title & Value
  {
    key: "title",
    label: "Deal",
    render: (value: string, row: any) => (
      <div>
        <p className="font-semibold text-slate-900 dark:text-slate-100">
          {value}
        </p>
        <div className="flex items-center gap-1 mt-1 text-sm font-medium text-blue-600 dark:text-blue-400">
          <DollarSign className="h-3.5 w-3.5" />
          {row.value.toLocaleString()}
        </div>
      </div>
    ),
  },

  // Company
  {
    key: "company",
    label: "Company",
    render: (value: string) => (
      <div className="flex items-center gap-2">
        <span className="flex h-7 w-7 items-center justify-center rounded-md bg-slate-100 dark:bg-slate-800">
          <Building2 className="h-3.5 w-3.5 text-slate-600 dark:text-slate-400" />
        </span>
        <span className="text-sm font-medium text-slate-700 dark:text-slate-300">
          {value || "—"}
        </span>
      </div>
    ),
  },

  // Contact Person
  {
    key: "contactPerson",
    label: "Contact",
    render: (value: string, row: any) => (
      <div className="space-y-1">
        <p className="text-sm font-medium text-slate-700 dark:text-slate-300">{value}</p>
        <div className="flex items-center gap-2 text-xs text-slate-500">
          <a href={`mailto:${row.contactEmail}`} className="hover:text-blue-600">
            <Mail className="h-3 w-3 inline mr-1" />
            {row.contactEmail}
          </a>
        </div>
      </div>
    ),
  },

  // Stage
  {
    key: "stage",
    label: "Stage",
    render: (value: string) => {
      const stageStyles: Record<string, string> = {
        PROSPECTING: "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300",
        QUALIFICATION: "bg-cyan-100 text-cyan-700 dark:bg-cyan-900/30 dark:text-cyan-300",
        PROPOSAL: "bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-300",
        NEGOTIATION: "bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-300",
        CLOSED_WON: "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-300",
        CLOSED_LOST: "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-300",
      };

      return (
        <span
          className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${
            stageStyles[value] || "bg-slate-100 text-slate-700"
          }`}
        >
          {value ? value.replace("_", " ") : "—"}
        </span>
      );
    },
  },

  // Priority
  {
    key: "priority",
    label: "Priority",
    render: (value: string) => {
      const priorityStyles: Record<string, string> = {
        LOW: "bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300",
        MEDIUM: "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-300",
        HIGH: "bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-300",
        URGENT: "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-300",
      };

      return (
        <span
          className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${
            priorityStyles[value] || "bg-slate-100 text-slate-700"
          }`}
        >
          {value || "—"}
        </span>
      );
    },
  },

  // Expected Close Date
  {
    key: "expectedCloseDate",
    label: "Expected Close",
    render: (value: string) => (
      <div className="flex items-center gap-2">
        <CalendarDays className="h-4 w-4 text-slate-500" />
        <span className="text-sm text-slate-600 dark:text-slate-400">
          {value ? new Date(value).toLocaleDateString() : "—"}
        </span>
      </div>
    ),
  },
];
