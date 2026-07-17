import { UserCircle2 } from "lucide-react";

export default function UserDropdown() {
  return (
    <button className="flex items-center gap-2 rounded-lg px-2 py-1 hover:bg-gray-100 transition">
      <UserCircle2 size={30} />

      <div className="text-left">
        <p className="text-sm font-semibold">Ayushi</p>
        <p className="text-xs text-gray-500">
          Super Admin
        </p>
      </div>
    </button>
  );
}