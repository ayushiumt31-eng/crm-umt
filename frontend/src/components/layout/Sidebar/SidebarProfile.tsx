import { LogOut, UserCircle2 } from "lucide-react";

export default function SidebarProfile() {
  return (
    <div className="border-t p-4">
      <div className="flex items-center gap-3">
        <UserCircle2 className="h-10 w-10 text-blue-600" />

        <div>
          <h4 className="font-semibold">Ayushi</h4>
          <p className="text-sm text-muted-foreground">
            Super Admin
          </p>
        </div>
      </div>

      <button className="mt-4 flex w-full items-center gap-2 rounded-md px-3 py-2 text-sm text-red-600 transition hover:bg-red-50">
        <LogOut className="h-4 w-4" />
        Logout
      </button>
    </div>
  );
}