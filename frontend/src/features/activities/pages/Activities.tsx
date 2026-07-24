import { useState, useMemo, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Plus, Search, TrendingUp, ClipboardList, Clock, CheckCircle2, CalendarCheck } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/common/DataTable";
import { activitiesTableColumns } from "../components/ActivitiesTableColumns";
import { DeleteActivityDialog } from "../components/DeleteActivityDialog";
import { activityService } from "../services/activityService";
import type { Activity } from "../types/activity";

export default function Activities() {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [typeFilter, setTypeFilter] = useState("ALL");
  const [statusFilter, setStatusFilter] = useState("ALL");
  const [priorityFilter, setPriorityFilter] = useState("ALL");
  const [deleteActivity, setDeleteActivity] = useState<Activity | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const [activities, setActivities] = useState<Activity[]>([]);

  // Load activities on mount
  useEffect(() => {
    activityService.getActivities().then(setActivities);
  }, []);

  // Refresh activities after delete
  const refreshActivities = () => {
    activityService.getActivities().then(setActivities);
  };

  const filteredActivities = useMemo(() => {
    return activities.filter((activity) => {
      // Search
      const searchStr = searchTerm.toLowerCase();
      const matchesSearch = !searchTerm || 
        activity.title.toLowerCase().includes(searchStr) ||
        (activity.customerName && activity.customerName.toLowerCase().includes(searchStr)) ||
        (activity.leadName && activity.leadName.toLowerCase().includes(searchStr)) ||
        (activity.dealName && activity.dealName.toLowerCase().includes(searchStr)) ||
        activity.assignedToName.toLowerCase().includes(searchStr);

      // Type filter
      const matchesType = typeFilter === "ALL" || activity.type === typeFilter;

      // Status filter
      const matchesStatus = statusFilter === "ALL" || activity.status === statusFilter;

      // Priority filter
      const matchesPriority = priorityFilter === "ALL" || activity.priority === priorityFilter;

      return matchesSearch && matchesType && matchesStatus && matchesPriority;
    });
  }, [activities, searchTerm, typeFilter, statusFilter, priorityFilter]);

  const handleDeleteClick = (id: string) => {
    const activity = activities.find((a) => a.id === id);
    if (activity) {
      setDeleteActivity(activity);
    }
  };

  const handleDeleteConfirm = async () => {
    if (!deleteActivity) return;
    setIsDeleting(true);
    try {
      await activityService.deleteActivity(deleteActivity.id);
      setDeleteActivity(null);
      refreshActivities();
    } finally {
      setIsDeleting(false);
    }
  };

  // Compute stats
  const totalActivities = activities.length;
  const pendingCount = activities.filter((a) => a.status === "PENDING" || a.status === "IN_PROGRESS").length;
  const completedCount = activities.filter((a) => a.status === "COMPLETED").length;
  const highPriorityCount = activities.filter((a) => a.priority === "HIGH" && a.status !== "COMPLETED" && a.status !== "CANCELLED").length;

  // Build columns with action buttons
  const columns = useMemo(() => {
    // Use local handler that's recreated each render
    return activitiesTableColumns.map((col) => {
      if (col.key === "id") {
        return {
          ...col,
          // We use data attributes instead of closures to avoid stale references
          render: (_value: string, row: Activity) => (
            <div className="flex items-center gap-2">
              <button
                onClick={() => navigate(`/activities/${row.id}`)}
                title="View"
                className="h-8 w-8 flex items-center justify-center rounded-md hover:bg-blue-100 dark:hover:bg-blue-900/30 text-blue-600 dark:text-blue-400"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"/><circle cx="12" cy="12" r="3"/></svg>
              </button>
              <button
                onClick={() => navigate(`/activities/${row.id}/edit`)}
                title="Edit"
                className="h-8 w-8 flex items-center justify-center rounded-md hover:bg-cyan-100 dark:hover:bg-cyan-900/30 text-cyan-600 dark:text-cyan-400"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 3a2.85 2.85 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z"/><path d="m15 5 4 4"/></svg>
              </button>
              <button
                id={`delete-btn-${row.id}`}
                title="Delete"
                className="h-8 w-8 flex items-center justify-center rounded-md hover:bg-red-100 dark:hover:bg-red-900/30 text-red-600 dark:text-red-400"
                onClick={(e) => {
                  // Direct inline handler to avoid stale closures
                  const act = activities.find((a) => a.id === row.id);
                  if (act) setDeleteActivity(act);
                }}
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 6h18"/><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/></svg>
              </button>
            </div>
          ),
        };
      }
      return col;
    });
  }, [navigate, activities]);

  return (
    <div className="space-y-8">
      {/* Header with gradient background */}
      <div className="rounded-2xl bg-gradient-to-r from-violet-600 via-purple-500 to-violet-600 dark:from-violet-900 dark:via-purple-900 dark:to-violet-900 p-8 shadow-lg overflow-hidden relative">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-0 left-0 w-96 h-96 bg-white/20 rounded-full blur-3xl animate-pulse" style={{ animation: "pulse 6s ease-in-out infinite" }}></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-purple-300/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: "3s" }}></div>
        </div>

        <div className="relative z-10">
          <div className="flex items-center gap-4 mb-4">
            <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-white/20 backdrop-blur-md text-white border border-white/30 shadow-lg transform transition-transform hover:scale-110">
              <ClipboardList className="h-7 w-7" />
            </div>
            <div>
              <h1 className="text-4xl font-bold text-white drop-shadow-lg">Activities & Tasks</h1>
              <p className="text-purple-100 text-lg">Manage your activities, tasks, and follow-ups</p>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Total Activities */}
        <div className="group rounded-xl bg-gradient-to-br from-violet-50 to-purple-100 dark:from-violet-950/40 dark:to-purple-900/20 p-6 border border-violet-200/50 dark:border-violet-800/50 shadow-sm hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-sm font-semibold text-violet-900 dark:text-violet-200">Total Activities</h3>
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-violet-500 to-purple-600 text-white shadow-md">
              <ClipboardList className="h-5 w-5" />
            </div>
          </div>
          <div className="text-3xl font-bold text-violet-900 dark:text-violet-100">{totalActivities}</div>
          <p className="text-xs text-violet-700 dark:text-violet-300 mt-2">All activities</p>
        </div>

        {/* Pending / In Progress */}
        <div className="group rounded-xl bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-950/40 dark:to-blue-900/20 p-6 border border-blue-200/50 dark:border-blue-800/50 shadow-sm hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-sm font-semibold text-blue-900 dark:text-blue-200">In Progress</h3>
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-blue-500 to-blue-600 text-white shadow-md">
              <Clock className="h-5 w-5" />
            </div>
          </div>
          <div className="text-3xl font-bold text-blue-900 dark:text-blue-100">{pendingCount}</div>
          <p className="text-xs text-blue-700 dark:text-blue-300 mt-2">Pending / In progress</p>
        </div>

        {/* Completed */}
        <div className="group rounded-xl bg-gradient-to-br from-emerald-50 to-emerald-100 dark:from-emerald-950/40 dark:to-emerald-900/20 p-6 border border-emerald-200/50 dark:border-emerald-800/50 shadow-sm hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-sm font-semibold text-emerald-900 dark:text-emerald-200">Completed</h3>
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-emerald-500 to-emerald-600 text-white shadow-md">
              <CheckCircle2 className="h-5 w-5" />
            </div>
          </div>
          <div className="text-3xl font-bold text-emerald-900 dark:text-emerald-100">{completedCount}</div>
          <p className="text-xs text-emerald-700 dark:text-emerald-300 mt-2">Completed tasks</p>
        </div>

        {/* High Priority */}
        <div className="group rounded-xl bg-gradient-to-br from-orange-50 to-amber-100 dark:from-orange-950/40 dark:to-amber-900/20 p-6 border border-orange-200/50 dark:border-orange-800/50 shadow-sm hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-sm font-semibold text-orange-900 dark:text-orange-200">High Priority</h3>
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-orange-500 to-amber-600 text-white shadow-md">
              <CalendarCheck className="h-5 w-5" />
            </div>
          </div>
          <div className="text-3xl font-bold text-orange-900 dark:text-orange-100">{highPriorityCount}</div>
          <p className="text-xs text-orange-700 dark:text-orange-300 mt-2">Needs attention</p>
        </div>
      </div>

      {/* Filters & Toolbar */}
      <div className="rounded-2xl border border-slate-200/50 dark:border-slate-800/50 bg-white dark:bg-slate-900 shadow-sm overflow-hidden">
        {/* Title & Add Button */}
        <div className="px-6 py-4 border-b border-slate-200/50 dark:border-slate-800/50 bg-gradient-to-r from-violet-50/50 to-purple-50/50 dark:from-violet-950/20 dark:to-purple-950/20">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-violet-600 dark:text-violet-400" />
              <h2 className="font-bold text-slate-900 dark:text-white">
                All Activities
              </h2>
              <span className="inline-flex items-center rounded-full bg-violet-100 dark:bg-violet-900/50 px-3 py-1 text-sm font-semibold text-violet-700 dark:text-violet-300">
                {filteredActivities.length} results
              </span>
            </div>
            <Button onClick={() => navigate("/activities/add")} className="gap-2">
              <Plus className="h-4 w-4" />
              Add Activity
            </Button>
          </div>
        </div>

        {/* Search & Filters */}
        <div className="p-4 border-b border-slate-200/50 dark:border-slate-800/50 space-y-4">
          <div className="relative w-full md:w-96">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-slate-500" />
            <Input
              placeholder="Search activities..."
              className="pl-9"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="flex flex-wrap gap-3">
            <select
              value={typeFilter}
              onChange={(e) => setTypeFilter(e.target.value)}
              className="h-10 rounded-md border border-slate-200 bg-white px-3 text-sm dark:border-slate-700 dark:bg-slate-900"
            >
              <option value="ALL">All Types</option>
              <option value="CALL">Call</option>
              <option value="MEETING">Meeting</option>
              <option value="FOLLOW_UP">Follow Up</option>
              <option value="EMAIL">Email</option>
              <option value="OTHER">Other</option>
            </select>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="h-10 rounded-md border border-slate-200 bg-white px-3 text-sm dark:border-slate-700 dark:bg-slate-900"
            >
              <option value="ALL">All Status</option>
              <option value="PENDING">Pending</option>
              <option value="IN_PROGRESS">In Progress</option>
              <option value="COMPLETED">Completed</option>
              <option value="CANCELLED">Cancelled</option>
            </select>
            <select
              value={priorityFilter}
              onChange={(e) => setPriorityFilter(e.target.value)}
              className="h-10 rounded-md border border-slate-200 bg-white px-3 text-sm dark:border-slate-700 dark:bg-slate-900"
            >
              <option value="ALL">All Priority</option>
              <option value="LOW">Low</option>
              <option value="MEDIUM">Medium</option>
              <option value="HIGH">High</option>
            </select>
          </div>
        </div>
        
        <DataTable columns={columns} data={filteredActivities} showActions={false} />
      </div>

      {/* Empty State */}
      {filteredActivities.length === 0 && (
        <div className="rounded-2xl border border-dashed border-slate-300 dark:border-slate-600 bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900/50 dark:to-slate-800/50 p-12 text-center">
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-slate-200 dark:bg-slate-700 mx-auto mb-4">
            <ClipboardList className="h-8 w-8 text-slate-600 dark:text-slate-400" />
          </div>
          <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">No activities found</h3>
          <p className="text-slate-600 dark:text-slate-400 mb-6">Try adjusting your search or filter criteria, or add a new activity</p>
          <button
            onClick={() => navigate("/activities/add")}
            className="inline-flex items-center gap-2 rounded-lg bg-gradient-to-r from-violet-600 to-purple-600 px-6 py-2 font-semibold text-white shadow-lg hover:shadow-xl transition-all duration-200 hover:from-violet-700 hover:to-purple-700 transform hover:-translate-y-0.5"
          >
            <Plus className="h-4 w-4" />
            Add Your First Activity
          </button>
        </div>
      )}

      <DeleteActivityDialog
        activity={deleteActivity}
        isOpen={!!deleteActivity}
        onClose={() => setDeleteActivity(null)}
        onConfirm={handleDeleteConfirm}
        isLoading={isDeleting}
      />
    </div>
  );
}

