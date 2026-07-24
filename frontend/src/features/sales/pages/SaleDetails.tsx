import { useParams, useNavigate } from "react-router-dom";
import DetailsPage from "@/components/common/DetailsPage";
import type { DetailSection } from "@/components/common/DetailsPage";
import { 
  User, Building2, Calendar, FileText, 
  DollarSign, Receipt, CreditCard, Clock, CheckCircle2, AlertCircle, Banknote, HelpCircle
} from "lucide-react";
import { dummySales } from "../data/dummy-sales";
import { SaleStatusBadge, PaymentStatusBadge } from "../components/SaleStatusBadge";

export default function SaleDetails() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const sale = dummySales.find((s) => s.id === id);

  if (!sale) {
    return (
      <DetailsPage
        title="Sale Not Found"
        subtitle="Error"
        onBack={() => navigate("/sales")}
        sections={[]}
        customLayout={
          <div className="rounded-2xl border-2 border-dashed border-red-300 dark:border-red-700 bg-gradient-to-br from-red-50 to-red-100 dark:from-red-950/30 dark:to-red-900/30 p-16 text-center">
            <div className="flex h-20 w-20 items-center justify-center rounded-full bg-red-100 dark:bg-red-900/50 mx-auto mb-4">
              <Receipt className="h-10 w-10 text-red-600 dark:text-red-400" />
            </div>
            <h3 className="text-2xl font-bold text-red-900 dark:text-red-100 mb-2">Sale Not Found</h3>
            <p className="text-red-700 dark:text-red-300">This sale record may have been deleted or doesn't exist.</p>
          </div>
        }
      />
    );
  }

  const sections: DetailSection[] = [];

  // FINANCIAL OVERVIEW SECTION
  sections.push({
    title: "Financial Details",
    icon: DollarSign,
    iconColor: "text-emerald-600 dark:text-emerald-400",
    headerGradient: "bg-gradient-to-r from-emerald-50 to-teal-50 dark:from-emerald-950/20 dark:to-teal-950/20",
    columns: 2,
    fields: [
      {
        icon: DollarSign,
        iconBgColor: "bg-emerald-100 dark:bg-emerald-900/30",
        iconColor: "text-emerald-600 dark:text-emerald-400",
        label: "Final Amount",
        value: (
          <div className="space-y-1">
            <p className="text-3xl font-bold text-emerald-600 dark:text-emerald-400">
              ${sale.finalAmount.toLocaleString(undefined, { minimumFractionDigits: 2 })}
            </p>
          </div>
        ),
        type: "custom",
      },
      {
        icon: Receipt,
        iconBgColor: "bg-blue-100 dark:bg-blue-900/30",
        iconColor: "text-blue-600 dark:text-blue-400",
        label: "Breakdown",
        value: (
          <div className="space-y-1 text-sm text-slate-600 dark:text-slate-400">
            <div className="flex justify-between w-48"><span className="font-medium">Subtotal:</span> <span>${sale.amount.toLocaleString()}</span></div>
            <div className="flex justify-between w-48"><span className="font-medium">Discount:</span> <span className="text-red-500">-${sale.discount.toLocaleString()}</span></div>
            <div className="flex justify-between w-48"><span className="font-medium">Tax:</span> <span>+${sale.tax.toLocaleString()}</span></div>
          </div>
        ),
        type: "custom",
      },
      {
        icon: Banknote,
        iconBgColor: "bg-indigo-100 dark:bg-indigo-900/30",
        iconColor: "text-indigo-600 dark:text-indigo-400",
        label: "Payment Status",
        value: <PaymentStatusBadge status={sale.paymentStatus} className="text-sm px-3 py-1" />,
        type: "custom",
      },
      {
        icon: CreditCard,
        iconBgColor: "bg-purple-100 dark:bg-purple-900/30",
        iconColor: "text-purple-600 dark:text-purple-400",
        label: "Payment Method",
        value: sale.paymentMethod.replace("_", " "),
      }
    ],
  });

  // RELATIONSHIPS SECTION
  sections.push({
    title: "Sale Context",
    icon: Building2,
    iconColor: "text-blue-600 dark:text-blue-400",
    headerGradient: "bg-gradient-to-r from-blue-50 to-cyan-50 dark:from-blue-950/30 dark:to-cyan-950/30",
    columns: 2,
    fields: [
      {
        icon: Building2,
        iconBgColor: "bg-blue-100 dark:bg-blue-900/40",
        iconColor: "text-blue-600 dark:text-blue-400",
        label: "Customer",
        value: sale.customerName,
      },
      {
        icon: User,
        iconBgColor: "bg-indigo-100 dark:bg-indigo-900/40",
        iconColor: "text-indigo-600 dark:text-indigo-400",
        label: "Lead",
        value: sale.leadName || "N/A",
      },
      {
        icon: Receipt,
        iconBgColor: "bg-cyan-100 dark:bg-cyan-900/40",
        iconColor: "text-cyan-600 dark:text-cyan-400",
        label: "Deal / Opportunity",
        value: sale.dealName || "N/A",
      },
      {
        icon: User,
        iconBgColor: "bg-slate-100 dark:bg-slate-800",
        iconColor: "text-slate-600 dark:text-slate-400",
        label: "Assigned To",
        value: sale.assignedToName,
      }
    ],
  });

  // TIMELINE
  sections.push({
    title: "Timeline & Meta",
    icon: Clock,
    iconColor: "text-slate-600 dark:text-slate-400",
    headerGradient: "bg-gradient-to-r from-slate-50 to-slate-100 dark:from-slate-950/30 dark:to-slate-900/30",
    columns: 2,
    fields: [
      {
        icon: Calendar,
        iconBgColor: "bg-slate-200 dark:bg-slate-800",
        iconColor: "text-slate-700 dark:text-slate-300",
        label: "Sale Date",
        value: new Date(sale.saleDate).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" }),
      },
      {
        icon: Clock,
        iconBgColor: "bg-slate-200 dark:bg-slate-800",
        iconColor: "text-slate-700 dark:text-slate-300",
        label: "Record Created",
        value: new Date(sale.createdAt).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" }),
      }
    ],
  });

  // NOTES
  if (sale.notes) {
    sections.push({
      title: "Notes & Remarks",
      icon: FileText,
      iconColor: "text-slate-600 dark:text-slate-400",
      fields: [
        {
          icon: FileText,
          iconBgColor: "bg-slate-100 dark:bg-slate-900/40",
          iconColor: "text-slate-600 dark:text-slate-400",
          label: "Internal Notes",
          value: (
            <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-900/50 border-2 border-slate-200 dark:border-slate-700">
              <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed whitespace-pre-wrap">{sale.notes}</p>
            </div>
          ),
          type: "custom",
        },
      ],
    });
  }

  const handleDelete = async () => {
    const index = dummySales.findIndex((s) => s.id === id);
    if (index !== -1) {
      dummySales.splice(index, 1);
      setTimeout(() => navigate("/sales"), 500);
    }
  };

  const statusMap = {
    DRAFT: { label: "Draft", variant: "default" as const },
    CONFIRMED: { label: "Confirmed", variant: "info" as const },
    COMPLETED: { label: "Completed", variant: "success" as const },
    CANCELLED: { label: "Cancelled", variant: "error" as const },
  };
  const statusInfo = statusMap[sale.status];

  return (
    <DetailsPage
      title={sale.saleNumber}
      subtitle={`Sale for ${sale.customerName}`}
      status={statusInfo}
      headerGradient="from-emerald-600 via-teal-500 to-emerald-600 dark:from-emerald-900 dark:via-teal-900 dark:to-emerald-900"
      onBack={() => navigate("/sales")}
      onEdit={() => navigate(`/sales/${id}/edit`)}
      onDelete={handleDelete}
      sections={sections}
      gridLayout="2-col"
      deleteConfirmation={{
        title: "Delete Sale Record?",
        message: `Are you sure you want to permanently delete ${sale.saleNumber}? This action cannot be undone and will affect revenue calculations.`,
        confirmLabel: "Yes, Delete Record",
        cancelLabel: "Cancel",
      }}
      customActions={[
        {
          label: "Print Invoice",
          icon: FileText,
          onClick: () => window.print(),
          variant: "primary",
        }
      ]}
    />
  );
}
