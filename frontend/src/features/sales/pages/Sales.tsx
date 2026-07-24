import { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { Plus, Search, Filter, DollarSign, Receipt, Clock, TrendingUp } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/common/DataTable";
import { getSalesColumns } from "../components/SalesTableColumns";
import { dummySales } from "../data/dummy-sales";
import type { Sale } from "../types/sale";
import { DeleteSaleDialog } from "../components/DeleteSaleDialog";

export default function Sales() {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [deleteSale, setDeleteSale] = useState<Sale | null>(null);
  const [salesData, setSalesData] = useState<Sale[]>(dummySales);

  const filteredSales = useMemo(() => {
    return salesData.filter((sale) => {
      const searchStr = `${sale.saleNumber} ${sale.customerName} ${sale.assignedToName}`.toLowerCase();
      return searchStr.includes(searchTerm.toLowerCase());
    });
  }, [salesData, searchTerm]);

  const handleDeleteConfirm = () => {
    if (deleteSale) {
      setSalesData(salesData.filter(s => s.id !== deleteSale.id));
      setDeleteSale(null);
    }
  };

  const columns = getSalesColumns(
    (sale) => setDeleteSale(sale)
  );

  const totalRevenue = useMemo(() => {
    return filteredSales.reduce((acc, sale) => acc + sale.finalAmount, 0);
  }, [filteredSales]);

  const pendingPayments = useMemo(() => {
    return filteredSales.filter(s => s.paymentStatus === "PENDING" || s.paymentStatus === "PARTIAL").length;
  }, [filteredSales]);

  return (
    <div className="space-y-8">
      {/* Header with gradient background */}
      <div className="rounded-2xl bg-gradient-to-r from-emerald-600 via-teal-500 to-emerald-600 dark:from-emerald-900 dark:via-teal-900 dark:to-emerald-900 p-8 shadow-lg overflow-hidden relative">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-0 left-0 w-96 h-96 bg-white/20 rounded-full blur-3xl animate-pulse" style={{ animation: "pulse 6s ease-in-out infinite" }}></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-teal-300/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: "3s" }}></div>
        </div>

        <div className="relative z-10">
          <div className="flex items-center gap-4 mb-4">
            <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-white/20 backdrop-blur-md text-white border border-white/30 shadow-lg transform transition-transform hover:scale-110">
              <DollarSign className="h-7 w-7" />
            </div>
            <div>
              <h1 className="text-4xl font-bold text-white drop-shadow-lg">Sales</h1>
              <p className="text-emerald-100 text-lg">Manage your sales records, invoices, and payments.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-3">
        {/* Total Sales Revenue */}
        <div className="group rounded-xl bg-gradient-to-br from-emerald-50 to-emerald-100 dark:from-emerald-950/40 dark:to-emerald-900/20 p-6 border border-emerald-200/50 dark:border-emerald-800/50 shadow-sm hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-sm font-semibold text-emerald-900 dark:text-emerald-200">Total Sales Revenue</h3>
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-emerald-500 to-emerald-600 text-white shadow-md">
              <DollarSign className="h-5 w-5" />
            </div>
          </div>
          <div className="text-3xl font-bold text-emerald-900 dark:text-emerald-100">${totalRevenue.toLocaleString()}</div>
          <p className="text-xs text-emerald-700 dark:text-emerald-300 mt-2">Total across {filteredSales.length} sales</p>
        </div>

        {/* Sales Records */}
        <div className="group rounded-xl bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-950/40 dark:to-blue-900/20 p-6 border border-blue-200/50 dark:border-blue-800/50 shadow-sm hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-sm font-semibold text-blue-900 dark:text-blue-200">Sales Records</h3>
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-blue-500 to-blue-600 text-white shadow-md">
              <Receipt className="h-5 w-5" />
            </div>
          </div>
          <div className="text-3xl font-bold text-blue-900 dark:text-blue-100">{filteredSales.length}</div>
          <p className="text-xs text-blue-700 dark:text-blue-300 mt-2">Total transactions</p>
        </div>

        {/* Pending Payments */}
        <div className="group rounded-xl bg-gradient-to-br from-orange-50 to-amber-100 dark:from-orange-950/40 dark:to-amber-900/20 p-6 border border-orange-200/50 dark:border-orange-800/50 shadow-sm hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-sm font-semibold text-orange-900 dark:text-orange-200">Pending Payments</h3>
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-orange-500 to-amber-600 text-white shadow-md">
              <Clock className="h-5 w-5" />
            </div>
          </div>
          <div className="text-3xl font-bold text-orange-900 dark:text-orange-100">{pendingPayments}</div>
          <p className="text-xs text-orange-700 dark:text-orange-300 mt-2">Awaiting payment</p>
        </div>
      </div>

      {/* Table with enhanced styling */}
      <div className="rounded-2xl border border-slate-200/50 dark:border-slate-800/50 bg-white dark:bg-slate-900 shadow-sm overflow-hidden">
        <div className="px-6 py-4 border-b border-slate-200/50 dark:border-slate-800/50 bg-gradient-to-r from-emerald-50/50 to-teal-50/50 dark:from-emerald-950/20 dark:to-teal-950/20">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />
              <h2 className="font-bold text-slate-900 dark:text-white">
                All Sales
              </h2>
              <span className="inline-flex items-center rounded-full bg-emerald-100 dark:bg-emerald-900/50 px-3 py-1 text-sm font-semibold text-emerald-700 dark:text-emerald-300">
                {filteredSales.length} results
              </span>
            </div>
            <Button onClick={() => navigate("/sales/add")} className="gap-2">
              <Plus className="h-4 w-4" />
              Add Sale
            </Button>
          </div>
        </div>

        <div className="flex items-center justify-between p-4 border-b border-slate-200/50 dark:border-slate-800/50">
          <div className="relative w-72">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-slate-500" />
            <Input
              placeholder="Search sales..."
              className="pl-9"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <Button variant="outline" className="gap-2">
            <Filter className="h-4 w-4" />
            Filters
          </Button>
        </div>
        
        <DataTable columns={columns} data={filteredSales} showActions={false} />
      </div>

      {/* Empty State */}
      {filteredSales.length === 0 && (
        <div className="rounded-2xl border border-dashed border-slate-300 dark:border-slate-600 bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900/50 dark:to-slate-800/50 p-12 text-center">
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-slate-200 dark:bg-slate-700 mx-auto mb-4">
            <DollarSign className="h-8 w-8 text-slate-600 dark:text-slate-400" />
          </div>
          <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">No sales found</h3>
          <p className="text-slate-600 dark:text-slate-400 mb-6">Try adjusting your search criteria or add a new sale</p>
          <button
            onClick={() => navigate("/sales/add")}
            className="inline-flex items-center gap-2 rounded-lg bg-gradient-to-r from-emerald-600 to-teal-600 px-6 py-2 font-semibold text-white shadow-lg hover:shadow-xl transition-all duration-200 hover:from-emerald-700 hover:to-teal-700 transform hover:-translate-y-0.5"
          >
            <Plus className="h-4 w-4" />
            Add Your First Sale
          </button>
        </div>
      )}

      <DeleteSaleDialog
        sale={deleteSale}
        isOpen={!!deleteSale}
        onClose={() => setDeleteSale(null)}
        onConfirm={handleDeleteConfirm}
      />
    </div>
  );
}
