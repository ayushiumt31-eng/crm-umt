import {
  Mail,
  Phone,
  Building2,
  BriefcaseBusiness,
  CalendarDays,
  UserRound,
  BadgeCheck,
  Clock3,
  MapPin,
} from "lucide-react";

export const employeeTableColumns = [
  // Employee Name
  {
    key: "firstName",
    label: "Employee",
    render: (value: string, row: any) => (
      <div className="flex items-center gap-3">
        <div className="flex h-9 w-9 items-center justify-center rounded-full bg-blue-100 dark:bg-blue-900/30">
          <UserRound className="h-4 w-4 text-blue-600 dark:text-blue-400" />
        </div>

        <div>
          <p className="font-semibold text-slate-900 dark:text-slate-100">
            {value} {row.lastName}
          </p>

          <p className="text-xs text-slate-500 dark:text-slate-400">
            ID: {row.employeeId || "—"}
          </p>
        </div>
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
            className="flex h-7 w-7 items-center justify-center rounded-md bg-blue-50 transition-colors hover:bg-blue-100 dark:bg-blue-900/30 dark:hover:bg-blue-900/50"
          >
            <Mail className="h-3.5 w-3.5 text-blue-600 dark:text-blue-400" />
          </a>

          <a
            href={`mailto:${row.email}`}
            className="text-sm text-slate-700 hover:text-blue-600 hover:underline dark:text-slate-300 dark:hover:text-blue-400"
          >
            {row.email}
          </a>
        </div>

        {/* Phone */}
        <div className="flex items-center gap-1">
          <a
            href={`tel:${row.phone}`}
            title={`Call ${row.phone}`}
            className="flex h-7 w-7 items-center justify-center rounded-md bg-green-50 transition-colors hover:bg-green-100 dark:bg-green-900/30 dark:hover:bg-green-900/50"
          >
            <Phone className="h-3.5 w-3.5 text-green-600 dark:text-green-400" />
          </a>

          <a
            href={`tel:${row.phone}`}
            className="text-sm text-slate-700 hover:text-green-600 hover:underline dark:text-slate-300 dark:hover:text-green-400"
          >
            {row.phone || "—"}
          </a>
        </div>
      </div>
    ),
  },

  // Department
  {
    key: "department",
    label: "Department",
    render: (value: string) => (
      <div className="flex items-center gap-2">
        <span className="flex h-7 w-7 items-center justify-center rounded-md bg-purple-50 dark:bg-purple-900/30">
          <Building2 className="h-3.5 w-3.5 text-purple-600 dark:text-purple-400" />
        </span>

        <span className="text-sm font-medium text-slate-600 dark:text-slate-400">
          {value || "—"}
        </span>
      </div>
    ),
  },

  // Designation
  {
    key: "designation",
    label: "Designation",
    render: (value: string) => (
      <div className="flex items-center gap-2">
        <BriefcaseBusiness className="h-4 w-4 text-slate-500" />

        <span className="text-sm text-slate-600 dark:text-slate-400">
          {value || "—"}
        </span>
      </div>
    ),
  },

  // Employment Type
  // {
  //   key: "employmentType",
  //   label: "Employment Type",
  //   render: (value: string) => {
  //     const typeStyles: Record<string, string> = {
  //       FULL_TIME:
  //         "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300",

  //       PART_TIME:
  //         "bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-300",

  //       CONTRACT:
  //         "bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-300",

  //       INTERN:
  //         "bg-cyan-100 text-cyan-700 dark:bg-cyan-900/30 dark:text-cyan-300",

  //       FREELANCE:
  //         "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300",
  //     };

  //     return (
  //       <span
  //         className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${
  //           typeStyles[value] || "bg-slate-100 text-slate-700"
  //         }`}
  //       >
  //         {value?.replace("_", " ") || "—"}
  //       </span>
  //     );
  //   },
  // },

  // Status
  {
    key: "status",
    label: "Status",
    render: (value: string) => {
      const statusStyles: Record<string, string> = {
        ACTIVE:
          "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300",

        INACTIVE:
          "bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300",

        ON_LEAVE:
          "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-300",

        TERMINATED:
          "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-300",

        PROBATION:
          "bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-300",
      };

      return (
        <div className="flex items-center gap-2">
          <BadgeCheck className="h-4 w-4 text-slate-500" />

          <span
            className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${
              statusStyles[value] || "bg-slate-100 text-slate-700"
            }`}
          >
            {value?.replace("_", " ") || "—"}
          </span>
        </div>
      );
    },
  },

  // Joining Date
  // {
  //   key: "joiningDate",
  //   label: "Joining Date",
  //   render: (value: string) => (
  //     <div className="flex items-center gap-2">
  //       <CalendarDays className="h-4 w-4 text-slate-500" />

  //       <span className="text-sm text-slate-600 dark:text-slate-400">
  //         {value ? new Date(value).toLocaleDateString() : "—"}
  //       </span>
  //     </div>
  //   ),
  // },

  // Work Location
  // {
  //   key: "location",
  //   label: "Location",
  //   render: (value: string) => (
  //     <div className="flex items-center gap-2">
  //       <MapPin className="h-4 w-4 text-slate-500" />

  //       <span className="text-sm text-slate-600 dark:text-slate-400">
  //         {value || "—"}
  //       </span>
  //     </div>
  //   ),
  // },

  // Shift
  // {
  //   key: "shift",
  //   label: "Shift",
  //   render: (value: string) => (
  //     <div className="flex items-center gap-2">
  //       <Clock3 className="h-4 w-4 text-slate-500" />

  //       <span className="text-sm text-slate-600 dark:text-slate-400">
  //         {value || "—"}
  //       </span>
  //     </div>
  //   ),
  // },
];