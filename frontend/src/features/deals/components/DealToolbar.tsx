import { Search, Plus, Filter } from "lucide-react";

interface DealToolbarProps {
  onSearch: (query: string) => void;
  onAdd: () => void;
}

export function DealToolbar({ onSearch, onAdd }: DealToolbarProps) {
  return (
    <div className="flex flex-col sm:flex-row gap-4 justify-between items-center bg-white dark:bg-slate-900 p-4 rounded-xl border border-slate-200 dark:border-slate-800">
      <div className="relative w-full sm:w-96 text-slate-500 focus-within:text-blue-600 dark:focus-within:text-blue-400">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 pointer-events-none" />
        <input
          type="text"
          placeholder="Search deals by title or company..."
          className="w-full pl-10 pr-4 py-2 bg-slate-50 dark:bg-slate-800 border-none rounded-lg focus:ring-2 focus:ring-blue-500/50 outline-none text-slate-900 dark:text-slate-100 transition-all placeholder:text-slate-400"
          onChange={(e) => onSearch(e.target.value)}
        />
      </div>

      <div className="flex items-center gap-3 w-full sm:w-auto">
        <button className="flex items-center gap-2 px-4 py-2 text-sm font-semibold text-slate-700 dark:text-slate-200 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-lg transition-colors">
          <Filter className="h-4 w-4" />
          Filter
        </button>

        <button
          onClick={onAdd}
          className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-6 py-2 text-sm font-semibold text-white bg-blue-600 hover:bg-blue-700 active:bg-blue-800 rounded-lg shadow-sm shadow-blue-500/20 transition-all hover:shadow-md hover:shadow-blue-500/30"
        >
          <Plus className="h-4 w-4" />
          Add Deal
        </button>
      </div>
    </div>
  );
}
