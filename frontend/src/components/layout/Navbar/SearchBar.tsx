import { Search } from "lucide-react";

export default function SearchBar() {
  return (
    <div className="relative w-80">
      <Search
        className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
        size={18}
      />

      <input
        type="text"
        placeholder="Search..."
        className="w-full rounded-lg border border-gray-300 py-2 pl-10 pr-4 outline-none transition focus:border-blue-500"
      />
    </div>
  );
}