import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserCircle2, LogOut, User, KeyRound } from "lucide-react";
import { useAuth } from "@/features/auth/hooks/useAuth";
import LogoutDialog from "@/features/auth/components/LogoutDialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuGroup,
} from "@/components/ui/dropdown-menu";

const ROLE_LABELS: Record<string, string> = {
  SUPER_ADMIN: "Super Admin",
  ADMIN: "Admin",
  USER: "User",
};

export default function UserDropdown() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [logoutOpen, setLogoutOpen] = useState(false);

  const name = user?.name || "Guest";
  const role = user?.role ? ROLE_LABELS[user.role] : "Not signed in";

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        render={
          <button className="flex items-center gap-2 rounded-lg px-2 py-1 hover:bg-gray-100 transition">
            <UserCircle2 size={30} />
            <div className="text-left">
              <p className="text-sm font-semibold">{name}</p>
              <p className="text-xs text-gray-500">{role}</p>
            </div>
          </button>
        }
      />
<DropdownMenuContent align="end" className="w-56">
        <DropdownMenuGroup>
          <DropdownMenuLabel>
            <div className="flex flex-col">
              <span className="text-sm font-semibold">{name}</span>
              <span className="text-xs text-muted-foreground">{user?.email}</span>
            </div>
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
        </DropdownMenuGroup>
        <DropdownMenuItem onClick={() => navigate("/profile")}>
          <User className="h-4 w-4" />
          My Profile
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => navigate("/change-password")}>
          <KeyRound className="h-4 w-4" />
          Change Password
        </DropdownMenuItem>
<DropdownMenuSeparator />
        <DropdownMenuItem
          variant="destructive"
          onClick={() => setLogoutOpen(true)}
        >
          <LogOut className="h-4 w-4" />
          Logout
        </DropdownMenuItem>
      </DropdownMenuContent>

      {/* Logout confirmation dialog */}
      <LogoutDialog open={logoutOpen} onOpenChange={setLogoutOpen} />
    </DropdownMenu>
  );
}
