import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Plus } from "lucide-react";

interface LeadToolbarProps {
  onSearch?: (query: string) => void;
  onAdd?: () => void;
}

export function LeadToolbar({
  onSearch,
  onAdd,
}: LeadToolbarProps) {
  return (
    <div className="space-y-4">
      {/* Search & Add Row */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        {/* Enhanced Search Bar */}
        <div className="flex-1 group relative">
          <div className="absolute inset-y-0 left-0 flex items-center pointer-events-none pl-4 text-slate-400 group-focus-within:text-blue-600 transition-colors">
            <Search className="h-5 w-5" />
          </div>
          <Input
            placeholder="Search by name, email, company, or phone..."
            className="pl-11 pr-4 py-3 rounded-xl border-2 border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 shadow-sm hover:border-blue-300 dark:hover:border-blue-700 focus-visible:border-blue-500 focus-visible:ring-2 focus-visible:ring-blue-200 dark:focus-visible:ring-blue-900/50 transition-all duration-200 text-base"
            onChange={(e) => onSearch?.(e.target.value)}
          />
          <div className="absolute inset-y-0 right-0 pr-4 flex items-center text-xs text-slate-400 pointer-events-none">
            <kbd className="hidden sm:inline-block px-2 py-1 rounded bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-600 font-mono">
              ⌘K
            </kbd>
          </div>
        </div>

        {/* Add Customer Button */}
        <Button
          onClick={onAdd}
          className="flex items-center gap-2 whitespace-nowrap bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white font-semibold px-6 py-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 transform hover:-translate-y-0.5 border border-blue-700/50"
        >
          <Plus className="h-5 w-5" />
          Add Lead
        </Button>
      </div>

      {/* Quick Filter Info */}
      <div className="flex items-center gap-3 text-sm text-slate-600 dark:text-slate-400 bg-gradient-to-r from-blue-50/50 to-cyan-50/50 dark:from-blue-950/20 dark:to-cyan-950/20 rounded-lg px-4 py-2 border border-blue-200/50 dark:border-blue-800/50">
        <div className="flex h-6 w-6 items-center justify-center rounded-full bg-blue-500/20 text-blue-600 dark:text-blue-400 text-xs font-bold">
          💡
        </div>
        <span>
          <strong>Tip:</strong> Use the search bar to quickly find customers by name, email, company, or phone number. Results update in real-time.
        </span>
      </div>
    </div>
  );
}
