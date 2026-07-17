import { Building2 } from "lucide-react";

export default function SidebarLogo() {
  return (
    <div className="flex items-center gap-3 border-b border-gray-200 px-5 py-5">
      <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-600 text-white shadow-md">
        <Building2 size={22} />
      </div>

      <div>
        <h2 className="text-lg font-bold text-gray-900">
          CRM UMT
        </h2>

        <p className="text-xs text-gray-500">
          Customer Management
        </p>
      </div>
    </div>
  );
}