import { Button } from "@/components/ui/button";
import { Eye, Edit2, Trash2 } from "lucide-react";
import { Link } from "react-router-dom";
import type { Sale } from "../types/sale";
import type { TableColumn } from "@/components/common/DataTable";
import { SaleStatusBadge, PaymentStatusBadge } from "./SaleStatusBadge";

export const getSalesColumns = (
  onDelete: (sale: Sale) => void
): TableColumn<Sale>[] => [
  {
    key: "saleNumber",
    label: "Sale Number",
    render: (value: string, sale: Sale) => (
      <Link to={`/sales/${sale.id}`} className="font-medium text-blue-600 hover:underline dark:text-blue-400">
        {value}
      </Link>
    ),
  },
  {
    key: "customerName",
    label: "Customer",
    render: (value: string, sale: Sale) => (
      <div className="flex flex-col">
        <span className="font-medium text-slate-900 dark:text-white">{value}</span>
        {sale.dealName && <span className="text-xs text-slate-500">{sale.dealName}</span>}
      </div>
    ),
  },
  {
    key: "finalAmount",
    label: "Final Amount",
    render: (value: number) => (
      <span className="font-semibold text-slate-900 dark:text-white">
        ${value.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
      </span>
    ),
  },
  {
    key: "paymentStatus",
    label: "Payment Status",
    render: (value: Sale["paymentStatus"]) => <PaymentStatusBadge status={value} />,
  },
  {
    key: "status",
    label: "Sale Status",
    render: (value: Sale["status"]) => <SaleStatusBadge status={value} />,
  },
  {
    key: "saleDate",
    label: "Sale Date",
    render: (value: string) => new Date(value).toLocaleDateString(),
  },
  {
    key: "assignedToName",
    label: "Assigned To",
    render: (value: string) => <span className="text-sm text-slate-600 dark:text-slate-400">{value}</span>,
  },
  {
    key: "id",
    label: "Actions",
    render: (_value: string, sale: Sale) => (
      <div className="flex items-center gap-2">
        <Link to={`/sales/${sale.id}`}>
          <Button variant="ghost" size="icon" className="h-8 w-8 hover:bg-blue-100 dark:hover:bg-blue-900/30 text-blue-600 dark:text-blue-400">
            <Eye className="h-4 w-4" />
          </Button>
        </Link>
        <Link to={`/sales/${sale.id}/edit`}>
          <Button variant="ghost" size="icon" className="h-8 w-8 hover:bg-cyan-100 dark:hover:bg-cyan-900/30 text-cyan-600 dark:text-cyan-400">
            <Edit2 className="h-4 w-4" />
          </Button>
        </Link>
        <Button 
          variant="ghost" 
          size="icon" 
          className="h-8 w-8 hover:bg-red-100 dark:hover:bg-red-900/30 text-red-600 dark:text-red-400"
          onClick={() => onDelete(sale)}
        >
          <Trash2 className="h-4 w-4" />
        </Button>
      </div>
    ),
  },
];
