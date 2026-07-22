import { Search, Plus, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface FilterOption {
  label: string;
  value: string;
}

interface DataTableToolbarProps {
  searchPlaceholder?: string;
  searchValue?: string;
  onSearchChange?: (value: string) => void;

  filterPlaceholder?: string;
  filterValue?: string;
  filterOptions?: FilterOption[];
  onFilterChange?: (value: string) => void;

  addButtonLabel?: string;
  onAdd?: () => void;

  onReset?: () => void;
}

export default function DataTableToolbar({
  searchPlaceholder = "Search...",
  searchValue = "",
  onSearchChange,

  filterPlaceholder = "Filter",
  filterValue,
  filterOptions = [],
  onFilterChange,

  addButtonLabel = "Add",
  onAdd,

  onReset,
}: DataTableToolbarProps) {
  const hasFilters = searchValue || filterValue;

  return (
    <div className="flex flex-col gap-4 rounded-xl border bg-white p-4 shadow-sm md:flex-row md:items-center md:justify-between">
      {/* Search & Filter */}
      <div className="flex flex-1 flex-col gap-3 sm:flex-row">
        {/* Search */}
        <div className="relative w-full sm:max-w-sm">
          <Search
            size={18}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
          />

          <Input
            value={searchValue}
            onChange={(e) => onSearchChange?.(e.target.value)}
            placeholder={searchPlaceholder}
            className="pl-10"
          />
        </div>

        {/* Filter */}
        {filterOptions.length > 0 && (
          <Select
            value={filterValue}
            onValueChange={(value) => onFilterChange?.(value || "")}
          >
            <SelectTrigger className="w-full sm:w-44">
              <SelectValue placeholder={filterPlaceholder} />
            </SelectTrigger>

            <SelectContent>
              {filterOptions.map((option) => (
                <SelectItem
                  key={option.value}
                  value={option.value}
                >
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        )}

        {/* Reset */}
        {hasFilters && onReset && (
          <Button
            variant="ghost"
            onClick={onReset}
            className="gap-2"
          >
            <X size={16} />
            Reset
          </Button>
        )}
      </div>

      {/* Add Button */}
      {onAdd && (
        <Button onClick={onAdd}>
          <Plus size={18} />
          {addButtonLabel}
        </Button>
      )}
    </div>
  );
}