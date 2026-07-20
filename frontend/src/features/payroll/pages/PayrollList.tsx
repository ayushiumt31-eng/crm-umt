import { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { PayrollTable } from "../components/PayrollTable";
import { payrollService } from "@/services/payroll.service";
import { useDebounce } from "@/hooks";
import type { Payroll } from "@/types/payroll";
import { DollarSign, TrendingUp, CheckCircle, Clock, CreditCard } from "lucide-react";

export function PayrollList() {
  const navigate = useNavigate();
  const [payrolls, setPayrolls] = useState<Payroll[]>(payrollService.getAllSync());
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const debouncedSearch = useDebounce(searchQuery, 300);

  const filteredPayrolls = useMemo(() => {
    let filtered = payrolls;

    if (debouncedSearch) {
      const query = debouncedSearch.toLowerCase();
      filtered = filtered.filter(
        (p) =>
          p.employeeName.toLowerCase().includes(query) ||
          p.payPeriod.includes(query)
      );
    }

    if (statusFilter !== "All") {
      filtered = filtered.filter((p) => p.status === statusFilter);
    }

    return filtered;
  }, [payrolls, debouncedSearch, statusFilter]);

  const stats = {
    totalPayrolls: payrolls.length,
    paidCount: payrolls.filter((p) => p.status === "Paid").length,
    pendingCount: payrolls.filter((p) => p.status === "Pending").length,
    totalNetSalaries: payrolls.reduce((sum, p) => sum + p.netSalary, 0),
  };

  const handleDelete = (id: string) => {
    setPayrolls((prev) => prev.filter((p) => p.id !== id));
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="rounded-2xl bg-gradient-to-r from-emerald-600 via-teal-500 to-emerald-600 dark:from-emerald-900 dark:via-teal-900 dark:to-emerald-900 p-8 shadow-lg overflow-hidden relative">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-0 left-0 w-96 h-96 bg-white/20 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-teal-300/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: "3s" }}></div>
        </div>

        <div className="relative z-10">
          <div className="flex items-center gap-4 mb-4">
            <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-white/20 backdrop-blur-md text-white border border-white/30 shadow-lg transform transition-transform hover:scale-110">
              <DollarSign className="h-7 w-7" />
            </div>
            <div>
              <h1 className="text-4xl font-bold text-white drop-shadow-lg">Payroll</h1>
              <p className="text-emerald-100 text-lg">Employee salary management system</p>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="group rounded-xl bg-gradient-to-br from-emerald-50 to-emerald-100 dark:from-emerald-950/40 dark:to-emerald-900/20 p-6 border border-emerald-200/50 dark:border-emerald-800/50 shadow-sm hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-sm font-semibold text-emerald-900 dark:text-emerald-200">Total Payrolls</h3>
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-emerald-500 to-teal-600 text-white shadow-md">
              <DollarSign className="h-5 w-5" />
            </div>
          </div>
          <div className="text-3xl font-bold text-emerald-900 dark:text-emerald-100">{stats.totalPayrolls}</div>
          <p className="text-xs text-emerald-700 dark:text-emerald-300 mt-2">Processing records</p>
        </div>

        <div className="group rounded-xl bg-gradient-to-br from-green-50 to-emerald-100 dark:from-green-950/40 dark:to-emerald-900/20 p-6 border border-green-200/50 dark:border-green-800/50 shadow-sm hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-sm font-semibold text-green-900 dark:text-green-200">Paid</h3>
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-green-500 to-emerald-600 text-white shadow-md">
              <CheckCircle className="h-5 w-5" />
            </div>
          </div>
          <div className="text-3xl font-bold text-green-900 dark:text-green-100">{stats.paidCount}</div>
          <p className="text-xs text-green-700 dark:text-green-300 mt-2">Successfully processed</p>
        </div>

        <div className="group rounded-xl bg-gradient-to-br from-amber-50 to-amber-100 dark:from-amber-950/40 dark:to-amber-900/20 p-6 border border-amber-200/50 dark:border-amber-800/50 shadow-sm hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-sm font-semibold text-amber-900 dark:text-amber-200">Pending</h3>
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-amber-500 to-amber-600 text-white shadow-md">
              <Clock className="h-5 w-5" />
            </div>
          </div>
          <div className="text-3xl font-bold text-amber-900 dark:text-amber-100">{stats.pendingCount}</div>
          <p className="text-xs text-amber-700 dark:text-amber-300 mt-2">Awaiting approval</p>
        </div>

        <div className="group rounded-xl bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-950/40 dark:to-blue-900/20 p-6 border border-blue-200/50 dark:border-blue-800/50 shadow-sm hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-sm font-semibold text-blue-900 dark:text-blue-200">Total Net Salaries</h3>
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-blue-500 to-blue-600 text-white shadow-md">
              <CreditCard className="h-5 w-5" />
            </div>
          </div>
          <div className="text-2xl font-bold text-blue-900 dark:text-blue-100">${(stats.totalNetSalaries / 1000).toFixed(1)}K</div>
          <p className="text-xs text-blue-700 dark:text-blue-300 mt-2">Monthly total</p>
        </div>
      </div>

      {/* Filters */}
      <div className="rounded-2xl border border-slate-200/50 dark:border-slate-800/50 bg-white dark:bg-slate-900 shadow-sm p-6 flex gap-4 flex-wrap">
        <input
          type="text"
          placeholder="Search by employee name or pay period..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="flex-1 min-w-[200px] rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 px-4 py-2 text-sm"
        />
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 px-4 py-2 text-sm"
        >
          <option>All</option>
          <option>Pending</option>
          <option>Approved</option>
          <option>Processed</option>
          <option>Paid</option>
        </select>
      </div>

      {/* Table */}
      <div className="rounded-2xl border border-slate-200/50 dark:border-slate-800/50 bg-white dark:bg-slate-900 shadow-sm overflow-hidden">
        <div className="px-6 py-4 border-b border-slate-200/50 dark:border-slate-800/50 bg-gradient-to-r from-emerald-50/50 to-teal-50/50 dark:from-emerald-950/20 dark:to-teal-950/20">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />
              <h2 className="font-bold text-slate-900 dark:text-white">All Payrolls</h2>
              <span className="inline-flex items-center rounded-full bg-emerald-100 dark:bg-emerald-900/50 px-3 py-1 text-sm font-semibold text-emerald-700 dark:text-emerald-300">
                {filteredPayrolls.length} results
              </span>
            </div>
          </div>
        </div>

        <PayrollTable
          payrolls={filteredPayrolls}
          onView={(id) => navigate(`/payroll/${id}`)}
          onEdit={(id) => navigate(`/payroll/${id}/edit`)}
          onDelete={handleDelete}
        />
      </div>
    </div>
  );
}
