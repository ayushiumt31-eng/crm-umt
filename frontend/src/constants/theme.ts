/**
 * Common Theme & CSS Classes
 * Use across all modules for consistency
 */

export const THEME = {
  // Colors
  COLORS: {
    primary: "blue",
    secondary: "cyan",
    success: "green",
    warning: "amber",
    danger: "red",
    info: "purple",
  },

  // Common gradient backgrounds for headers
  GRADIENTS: {
    header: "bg-gradient-to-r from-blue-600 via-cyan-500 to-blue-600 dark:from-blue-900 dark:via-cyan-900 dark:to-blue-900",
    headerDark: "dark:from-blue-900 dark:via-cyan-900 dark:to-blue-900",
  },

  // Common spacing
  SPACING: {
    container: "p-6",
    section: "space-y-8",
    cardGap: "gap-4",
  },

  // Common border styles
  BORDERS: {
    card: "rounded-2xl border border-slate-200/50 dark:border-slate-800/50",
    section: "rounded-xl",
  },

  // Common shadow styles
  SHADOWS: {
    sm: "shadow-sm",
    md: "shadow-md",
    lg: "shadow-lg",
  },

  // Common card styling
  CARDS: {
    base: "rounded-xl bg-gradient-to-br border shadow-sm hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1",
    stat: "p-6 group",
  },

  // Common button styles
  BUTTONS: {
    primary:
      "bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white font-semibold shadow-lg hover:shadow-xl transition-all duration-200 transform hover:-translate-y-0.5",
    ghost: "text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-slate-700 transition-colors",
    danger: "text-red-600 dark:text-red-400 hover:bg-red-100 dark:hover:bg-red-900/30",
  },

  // Common table styles
  TABLES: {
    header: "bg-slate-50 dark:bg-slate-800/50 border-b border-slate-200 dark:border-slate-700",
    row: "hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors duration-150 border-b border-slate-200 dark:divide-slate-700",
    cell: "px-6 py-4 text-sm",
  },

  // Common input styles
  INPUTS: {
    base: "rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 px-4 py-2 text-sm transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500",
  },

  // Common badge styles
  BADGES: {
    default: "inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold",
    blue: "bg-blue-100 dark:bg-blue-900/50 text-blue-700 dark:text-blue-300",
    green: "bg-green-100 dark:bg-green-900/50 text-green-700 dark:text-green-300",
    red: "bg-red-100 dark:bg-red-900/50 text-red-700 dark:text-red-300",
    purple: "bg-purple-100 dark:bg-purple-900/50 text-purple-700 dark:text-purple-300",
    amber: "bg-amber-100 dark:bg-amber-900/50 text-amber-700 dark:text-amber-300",
  },
} as const;

// Commonly used Tailwind class combinations
export const COMMON_STYLES = {
  // Headers
  pageHeader:
    "rounded-2xl bg-gradient-to-r from-blue-600 via-cyan-500 to-blue-600 dark:from-blue-900 dark:via-cyan-900 dark:to-blue-900 p-8 shadow-lg overflow-hidden relative",

  headerContent: "relative z-10",
  headerTitle: "text-4xl font-bold text-white drop-shadow-lg",
  headerSubtitle: "text-blue-100 text-lg",
  headerIcon:
    "flex h-14 w-14 items-center justify-center rounded-xl bg-white/20 backdrop-blur-md text-white border border-white/30 shadow-lg transform transition-transform hover:scale-110",

  // Stat cards
  statCard:
    "group rounded-xl bg-gradient-to-br border shadow-sm hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 p-6",
  statLabel: "text-sm font-semibold",
  statValue: "text-3xl font-bold mt-2",
  statDescription: "text-xs mt-2",

  // Tables
  tableContainer:
    "rounded-2xl border border-slate-200/50 dark:border-slate-800/50 bg-white dark:bg-slate-900 shadow-sm overflow-hidden",
  tableHeader:
    "px-6 py-4 border-b border-slate-200/50 dark:border-slate-800/50 bg-gradient-to-r from-blue-50/50 to-cyan-50/50 dark:from-blue-950/20 dark:to-cyan-950/20",

  // Forms
  formField: "space-y-2",
  formLabel: "text-sm font-semibold text-slate-900 dark:text-white",
  formInput:
    "rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 px-4 py-2 text-sm w-full transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500",

  // Empty states
  emptyState:
    "rounded-2xl border border-dashed border-slate-300 dark:border-slate-600 bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900/50 dark:to-slate-800/50 p-12 text-center",

  // Dialogs
  dialogContent: "space-y-4",
  dialogActions: "flex gap-3 justify-end mt-6",

  // Icons
  iconSmall: "h-4 w-4",
  iconMedium: "h-5 w-5",
  iconLarge: "h-6 w-6",
} as const;
