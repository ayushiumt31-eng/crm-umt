import {
  Mail,
  Phone,
  Globe,
  Users,
  Share2,
  Megaphone,
  UserRound,
  CalendarDays,
} from "lucide-react";

export const leadTableColumns = [
  // Lead Name
  {
    key: "firstName",
    label: "Lead Name",
    render: (value: string, row: any) => (
      <div>
        <p className="font-semibold text-slate-900 dark:text-slate-100">
          {value} {row.lastName}
        </p>
        <p className="text-xs text-slate-500 dark:text-slate-400">
          {row.jobTitle || "—"}
        </p>
      </div>
    ),
  },

  // Contact
  {
    key: "email",
    label: "Contact",
    render: (_value: string, row: any) => (
      <div className="space-y-1">
        {/* Email */}
        <div className="flex items-center gap-1">
          <a
            href={`mailto:${row.email}`}
            title={`Send email to ${row.email}`}
            className="flex h-7 w-7 items-center justify-center rounded-md bg-blue-50 hover:bg-blue-100 dark:bg-blue-900/30 dark:hover:bg-blue-900/50"
          >
            <Mail className="h-3.5 w-3.5 text-blue-600" />
          </a>

          <a
            href={`mailto:${row.email}`}
            className="text-sm text-slate-700 hover:text-blue-600 hover:underline dark:text-slate-300"
          >
            {row.email}
          </a>
        </div>

        {/* WhatsApp */}
        <div className="flex items-center gap-1">
          <a
            href={`https://wa.me/${row.phone.replace(/\D/g, "")}`}
            target="_blank"
            rel="noopener noreferrer"
            title={`Chat with ${row.phone} on WhatsApp`}
            className="flex h-7 w-7 items-center justify-center rounded-md bg-green-50 hover:bg-green-100 dark:bg-green-900/30 dark:hover:bg-green-900/50"
          >
            <Phone className="h-3.5 w-3.5 text-green-600" />
          </a>

          <a
            href={`https://wa.me/${row.phone.replace(/\D/g, "")}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-slate-700 hover:text-green-600 hover:underline dark:text-slate-300"
          >
            {row.phone}
          </a>
        </div>
      </div>
    ),
  },

  // Company
  {
    key: "company",
    label: "Company",
    render: (value: string) => (
      <p className="text-sm font-medium text-slate-700 dark:text-slate-300">
        {value || "—"}
      </p>
    ),
  },

  // Source
  {
    key: "source",
    label: "Source",
    render: (value: string) => {
      const sourceConfig: Record<string, any> = {
        WEBSITE: {
          icon: Globe,
          color: "text-blue-600",
          bg: "bg-blue-50 dark:bg-blue-900/30",
        },
        REFERRAL: {
          icon: Users,
          color: "text-green-600",
          bg: "bg-green-50 dark:bg-green-900/30",
        },
        SOCIAL_MEDIA: {
          icon: Share2,
          color: "text-pink-600",
          bg: "bg-pink-50 dark:bg-pink-900/30",
        },
        ADVERTISEMENT: {
          icon: Megaphone,
          color: "text-orange-600",
          bg: "bg-orange-50 dark:bg-orange-900/30",
        },
      };

      const config = sourceConfig[value] || {
        icon: Globe,
        color: "text-slate-600",
        bg: "bg-slate-50 dark:bg-slate-800",
      };

      const Icon = config.icon;

      return (
        <div className="flex items-center gap-2">
          <span
            className={`flex h-7 w-7 items-center justify-center rounded-md ${config.bg}`}
          >
            <Icon className={`h-3.5 w-3.5 ${config.color}`} />
          </span>

          <span className="text-sm font-medium text-slate-600 dark:text-slate-400">
            {value?.replace("_", " ") || "—"}
          </span>
        </div>
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
        MEDIUM:
          "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-300",
        HIGH:
          "bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-300",
        URGENT:
          "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-300",
      };

      return (
        <span
          className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${
            priorityStyles[value] ||
            "bg-slate-100 text-slate-700"
          }`}
        >
          {value || "—"}
        </span>
      );
    },
  },

  // Status
  {
    key: "status",
    label: "Status",
    render: (value: string) => {
      const statusStyles: Record<string, string> = {
        NEW: "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300",
        CONTACTED:
          "bg-cyan-100 text-cyan-700 dark:bg-cyan-900/30 dark:text-cyan-300",
        QUALIFIED:
          "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300",
        PROPOSAL:
          "bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-300",
        NEGOTIATION:
          "bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-300",
        CONVERTED:
          "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-300",
        LOST:
          "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-300",
      };

      return (
        <span
          className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${
            statusStyles[value] || "bg-slate-100 text-slate-700"
          }`}
        >
          {value || "—"}
        </span>
      );
    },
  },

  // Assigned To
//   {
//     key: "assignedTo",
//     label: "Assigned To",
//     render: (value: string) => (
//       <div className="flex items-center gap-2">
//         <span className="flex h-7 w-7 items-center justify-center rounded-full bg-slate-100 dark:bg-slate-800">
//           <UserRound className="h-3.5 w-3.5 text-slate-600 dark:text-slate-400" />
//         </span>

//         <span className="text-sm text-slate-600 dark:text-slate-400">
//           {value || "Unassigned"}
//         </span>
//       </div>
//     ),
//   },

  // Created Date
//   {
//     key: "createdAt",
//     label: "Created",
//     render: (value: string) => (
//       <div className="flex items-center gap-2">
//         <CalendarDays className="h-4 w-4 text-slate-500" />

//         <span className="text-sm text-slate-600 dark:text-slate-400">
//           {value
//             ? new Date(value).toLocaleDateString()
//             : "—"}
//         </span>
//       </div>
//     ),
//   },
];