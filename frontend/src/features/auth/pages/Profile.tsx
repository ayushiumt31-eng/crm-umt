import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Building2,
  Briefcase,
  Calendar,
  Mail,
  Phone,
  ShieldCheck,
  LogOut,
  KeyRound,
  Pencil,
  UserCircle2,
  Clock,
  Check,
  X,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useAuth } from "../hooks/useAuth";
import LogoutDialog from "../components/LogoutDialog";
import {
  getInitials,
  getRoleLabel,
  getStatusLabel,
  getStatusStyle,
  formatDate,
  formatDateTime,
} from "../utils/authUtils";

export default function Profile() {
  const navigate = useNavigate();
  const { user } = useAuth();

  const [editing, setEditing] = useState(false);
  const [logoutOpen, setLogoutOpen] = useState(false);
  const [form, setForm] = useState({
    fullName: user?.name || "",
    phone: user?.phone || "",
    department: user?.department || "",
    designation: user?.designation || "",
  });

  const startEdit = () => {
    setForm({
      fullName: user?.name || "",
      phone: user?.phone || "",
      department: user?.department || "",
      designation: user?.designation || "",
    });
    setEditing(true);
  };

  const saveEdit = () => {
    // Demo: persist to localStorage session only (no backend).
    // A real backend would call PATCH /profile.
    const stored = window.localStorage.getItem("crm_auth");
    if (stored) {
      try {
        const parsed = JSON.parse(stored) as {
          user: {
            name: string;
            phone: string;
            department: string;
            designation: string;
          };
        };
        parsed.user = {
          ...parsed.user,
          name: form.fullName,
          phone: form.phone,
          department: form.department,
          designation: form.designation,
        };
        window.localStorage.setItem("crm_auth", JSON.stringify(parsed));
      } catch {
        // ignore
      }
    }
    setEditing(false);
    window.location.reload();
  };

  const initials = getInitials(user?.name);

  return (
    <div className="mx-auto max-w-3xl space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-slate-900 dark:text-white">
          My Profile
        </h1>
        <p className="mt-1 text-slate-600 dark:text-slate-400">
          View and manage your account details.
        </p>
      </div>

      {/* Profile card */}
      <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-900">
        {/* Banner */}
        <div className="h-32 bg-gradient-to-r from-blue-600 via-blue-500 to-cyan-500" />

        <div className="px-4 pb-8 sm:px-8">
          <div className="-mt-12 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div className="flex items-end gap-4">
              <Avatar size="lg" className="h-24 w-24 ring-4 ring-white dark:ring-slate-900">
                <AvatarImage src={user?.avatar} alt={user?.name} />
                <AvatarFallback className="text-2xl">{initials}</AvatarFallback>
              </Avatar>
              <div className="pb-1">
                <h2 className="text-xl font-bold text-slate-900 dark:text-white">
                  {user?.name || "—"}
                </h2>
                <p className="text-sm text-slate-500 dark:text-slate-400">
                  {user?.designation || "—"}
                </p>
              </div>
            </div>

            <div className="flex flex-wrap gap-2 pb-1">
              <Button
                variant="outline"
                className="gap-2"
                onClick={() => navigate("/change-password")}
              >
                <KeyRound className="h-4 w-4" />
                Change Password
              </Button>
              <Button
                className="gap-2 bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700"
                onClick={startEdit}
              >
                <Pencil className="h-4 w-4" />
                Edit Profile
              </Button>
            </div>
          </div>

          {/* Role + Status badges */}
          <div className="mt-6 flex flex-wrap gap-2">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-blue-100 px-4 py-1.5 text-sm font-semibold text-blue-700 dark:bg-blue-900/30 dark:text-blue-300">
              <ShieldCheck className="h-4 w-4" />
              {getRoleLabel(user?.role || "USER")}
            </span>
            <span
              className={`inline-flex items-center gap-1.5 rounded-full px-4 py-1.5 text-sm font-semibold ${getStatusStyle(
                "APPROVED"
              )}`}
            >
              {getStatusLabel("APPROVED")}
            </span>
          </div>

          {/* Edit mode */}
          {editing ? (
            <div className="mt-8 space-y-4 rounded-xl border border-slate-200 p-4 dark:border-slate-800">
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div className="space-y-1">
                  <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">
                    Full Name
                  </label>
                  <Input
                    value={form.fullName}
                    onChange={(e) =>
                      setForm((f) => ({ ...f, fullName: e.target.value }))
                    }
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">
                    Phone
                  </label>
                  <Input
                    value={form.phone}
                    onChange={(e) =>
                      setForm((f) => ({ ...f, phone: e.target.value }))
                    }
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">
                    Department
                  </label>
                  <Input
                    value={form.department}
                    onChange={(e) =>
                      setForm((f) => ({ ...f, department: e.target.value }))
                    }
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">
                    Designation
                  </label>
                  <Input
                    value={form.designation}
                    onChange={(e) =>
                      setForm((f) => ({ ...f, designation: e.target.value }))
                    }
                  />
                </div>
              </div>
              <div className="flex justify-end gap-2">
                <Button
                  variant="outline"
                  className="gap-2"
                  onClick={() => setEditing(false)}
                >
                  <X className="h-4 w-4" />
                  Cancel
                </Button>
                <Button
                  className="gap-2 bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700"
                  onClick={saveEdit}
                >
                  <Check className="h-4 w-4" />
                  Save
                </Button>
              </div>
            </div>
          ) : (
            /* Details grid */
            <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div className="rounded-xl border border-slate-200 p-4 dark:border-slate-800">
                <div className="flex items-center gap-2 text-sm font-semibold text-slate-600 dark:text-slate-400">
                  <Mail className="h-4 w-4" />
                  Email
                </div>
                <p className="mt-1.5 font-medium text-slate-900 dark:text-white">
                  {user?.email || "—"}
                </p>
              </div>

              <div className="rounded-xl border border-slate-200 p-4 dark:border-slate-800">
                <div className="flex items-center gap-2 text-sm font-semibold text-slate-600 dark:text-slate-400">
                  <Building2 className="h-4 w-4" />
                  Department
                </div>
                <p className="mt-1.5 font-medium text-slate-900 dark:text-white">
                  {user?.department || "—"}
                </p>
              </div>

              <div className="rounded-xl border border-slate-200 p-4 dark:border-slate-800">
                <div className="flex items-center gap-2 text-sm font-semibold text-slate-600 dark:text-slate-400">
                  <Phone className="h-4 w-4" />
                  Phone
                </div>
                <p className="mt-1.5 font-medium text-slate-900 dark:text-white">
                  {user?.phone || "—"}
                </p>
              </div>

              <div className="rounded-xl border border-slate-200 p-4 dark:border-slate-800">
                <div className="flex items-center gap-2 text-sm font-semibold text-slate-600 dark:text-slate-400">
                  <Briefcase className="h-4 w-4" />
                  Designation
                </div>
                <p className="mt-1.5 font-medium text-slate-900 dark:text-white">
                  {user?.designation || "—"}
                </p>
              </div>

              <div className="rounded-xl border border-slate-200 p-4 dark:border-slate-800">
                <div className="flex items-center gap-2 text-sm font-semibold text-slate-600 dark:text-slate-400">
                  <Calendar className="h-4 w-4" />
                  Created Date
                </div>
                <p className="mt-1.5 font-medium text-slate-900 dark:text-white">
                  {formatDate(new Date())}
                </p>
              </div>

              <div className="rounded-xl border border-slate-200 p-4 dark:border-slate-800">
                <div className="flex items-center gap-2 text-sm font-semibold text-slate-600 dark:text-slate-400">
                  <Clock className="h-4 w-4" />
                  Last Login
                </div>
                <p className="mt-1.5 font-medium text-slate-900 dark:text-white">
                  {formatDateTime(new Date())}
                </p>
              </div>
            </div>
          )}

{/* Logout */}
          <div className="mt-8 flex justify-end border-t border-slate-200 pt-6 dark:border-slate-800">
            <Button
              variant="destructive"
              className="gap-2"
              onClick={() => setLogoutOpen(true)}
            >
              <LogOut className="h-4 w-4" />
              Logout
            </Button>
          </div>
        </div>
      </div>

      {/* Logout confirmation dialog */}
      <LogoutDialog open={logoutOpen} onOpenChange={setLogoutOpen} />

      {/* Fallback when not logged in (dummy) */}
      {!user && (
        <div className="flex flex-col items-center justify-center rounded-2xl border-2 border-dashed border-slate-300 p-12 text-center dark:border-slate-700">
          <UserCircle2 className="mb-4 h-12 w-12 text-slate-400" />
          <h3 className="text-lg font-bold text-slate-900 dark:text-white">
            Not signed in
          </h3>
          <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
            This is a demo fallback. Log in to see your profile.
          </p>
          <Button className="mt-6 gap-2" onClick={() => navigate("/login")}>
            Go to Login
          </Button>
        </div>
      )}
    </div>
  );
}
