import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Edit, Trash2, Mail, Phone, Building, Calendar, CheckCircle, User, ExternalLink, Copy, Share2 } from "lucide-react";
import { dummyCustomers } from "@/data/customers";
import { useState } from "react";

export default function ViewCustomer() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [isDeleting, setIsDeleting] = useState(false);
  const [copiedField, setCopiedField] = useState<string | null>(null);

  // Find customer from dummy data
  const customer = dummyCustomers.find((c) => c.id === id);

  const handleDelete = () => {
    setIsDeleting(true);
    setTimeout(() => {
      navigate("/customers");
    }, 500);
  };

  if (!customer) {
    return (
      <div className="space-y-6">
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => navigate("/customers")}
            className="hover:bg-slate-100 dark:hover:bg-slate-800"
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
        </div>
        <div className="rounded-2xl border-2 border-dashed border-slate-300 dark:border-slate-600 bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900/50 dark:to-slate-800/50 p-12 text-center">
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-slate-200 dark:bg-slate-700 mx-auto mb-4">
            <User className="h-8 w-8 text-slate-600 dark:text-slate-400" />
          </div>
          <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">Customer Not Found</h3>
          <p className="text-slate-600 dark:text-slate-400 mb-6">This customer doesn't exist or has been deleted</p>
          <Button
            onClick={() => navigate("/customers")}
            className="bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Customers
          </Button>
        </div>
      </div>
    );
  }

  const copyToClipboard = (text: string, field: string) => {
    navigator.clipboard.writeText(text);
    setCopiedField(field);
    setTimeout(() => setCopiedField(null), 2000);
  };

  const isActive = customer.status === "Active";
  const createdDate = new Date(customer.createdAt);
  const daysSinceCreation = Math.floor((Date.now() - createdDate.getTime()) / (1000 * 60 * 60 * 24));

  return (
    <div className="space-y-8">
      {/* Header with Back Button */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => navigate("/customers")}
            className="hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg h-10 w-10 transition-all"
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <div>
            <p className="text-sm text-slate-600 dark:text-slate-400">Customer Details</p>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-cyan-600 dark:from-blue-400 dark:to-cyan-400 bg-clip-text text-transparent">
              {customer.name}
            </h1>
          </div>
        </div>

        {/* Status Badge */}
        <div className={`flex items-center gap-2 rounded-full px-4 py-2 font-semibold ${
          isActive
            ? "bg-gradient-to-r from-green-100 to-emerald-100 dark:from-green-950/40 dark:to-emerald-950/30 text-green-700 dark:text-green-300 border border-green-200/50 dark:border-green-800/50"
            : "bg-gradient-to-r from-slate-100 to-slate-200 dark:from-slate-950/40 dark:to-slate-900/30 text-slate-700 dark:text-slate-300 border border-slate-200/50 dark:border-slate-800/50"
        }`}>
          <CheckCircle className={`h-5 w-5 ${isActive ? "text-green-600 dark:text-green-400" : "text-slate-600 dark:text-slate-400"}`} />
          {customer.status}
        </div>
      </div>

      {/* Premium Info Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Contact Card */}
        <div className="group rounded-2xl border border-blue-200/50 dark:border-blue-800/50 bg-gradient-to-br from-blue-50/80 to-blue-100/50 dark:from-blue-950/30 dark:to-blue-900/20 p-6 hover:shadow-lg transition-all duration-300">
          <div className="flex items-center gap-3 mb-4">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-blue-500 to-blue-600 text-white">
              <Mail className="h-5 w-5" />
            </div>
            <h3 className="font-semibold text-blue-900 dark:text-blue-100">Email</h3>
          </div>
          <p className="text-sm text-slate-600 dark:text-slate-400 truncate">{customer.email}</p>
          <button
            onClick={() => copyToClipboard(customer.email, "email")}
            className="mt-3 inline-flex items-center gap-2 text-xs font-semibold text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition-colors"
          >
            <Copy className={`h-3 w-3 transition-all ${copiedField === "email" ? "text-green-500" : ""}`} />
            {copiedField === "email" ? "Copied!" : "Copy"}
          </button>
        </div>

        {/* Phone Card */}
        <div className="group rounded-2xl border border-cyan-200/50 dark:border-cyan-800/50 bg-gradient-to-br from-cyan-50/80 to-cyan-100/50 dark:from-cyan-950/30 dark:to-cyan-900/20 p-6 hover:shadow-lg transition-all duration-300">
          <div className="flex items-center gap-3 mb-4">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-cyan-500 to-cyan-600 text-white">
              <Phone className="h-5 w-5" />
            </div>
            <h3 className="font-semibold text-cyan-900 dark:text-cyan-100">Phone</h3>
          </div>
          <p className="text-sm text-slate-600 dark:text-slate-400">{customer.phone}</p>
          <button
            onClick={() => copyToClipboard(customer.phone, "phone")}
            className="mt-3 inline-flex items-center gap-2 text-xs font-semibold text-cyan-600 dark:text-cyan-400 hover:text-cyan-700 dark:hover:text-cyan-300 transition-colors"
          >
            <Copy className={`h-3 w-3 transition-all ${copiedField === "phone" ? "text-green-500" : ""}`} />
            {copiedField === "phone" ? "Copied!" : "Copy"}
          </button>
        </div>

        {/* Company Card */}
        <div className="group rounded-2xl border border-purple-200/50 dark:border-purple-800/50 bg-gradient-to-br from-purple-50/80 to-purple-100/50 dark:from-purple-950/30 dark:to-purple-900/20 p-6 hover:shadow-lg transition-all duration-300">
          <div className="flex items-center gap-3 mb-4">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-purple-500 to-purple-600 text-white">
              <Building className="h-5 w-5" />
            </div>
            <h3 className="font-semibold text-purple-900 dark:text-purple-100">Company</h3>
          </div>
          <p className="text-sm text-slate-600 dark:text-slate-400">{customer.company}</p>
          <button
            onClick={() => copyToClipboard(customer.company, "company")}
            className="mt-3 inline-flex items-center gap-2 text-xs font-semibold text-purple-600 dark:text-purple-400 hover:text-purple-700 dark:hover:text-purple-300 transition-colors"
          >
            <Copy className={`h-3 w-3 transition-all ${copiedField === "company" ? "text-green-500" : ""}`} />
            {copiedField === "company" ? "Copied!" : "Copy"}
          </button>
        </div>

        {/* Date Card */}
        <div className="group rounded-2xl border border-green-200/50 dark:border-green-800/50 bg-gradient-to-br from-green-50/80 to-green-100/50 dark:from-green-950/30 dark:to-green-900/20 p-6 hover:shadow-lg transition-all duration-300">
          <div className="flex items-center gap-3 mb-4">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-green-500 to-green-600 text-white">
              <Calendar className="h-5 w-5" />
            </div>
            <h3 className="font-semibold text-green-900 dark:text-green-100">Created</h3>
          </div>
          <p className="text-sm text-slate-600 dark:text-slate-400">
            {createdDate.toLocaleDateString("en-US", {
              year: "numeric",
              month: "short",
              day: "numeric",
            })}
          </p>
          <p className="mt-2 text-xs text-slate-500 dark:text-slate-400 flex items-center gap-1">
            <span className="inline-block w-2 h-2 rounded-full bg-green-500"></span>
            {daysSinceCreation} days ago
          </p>
        </div>
      </div>

      {/* Detailed Info Section */}
      <div className="rounded-2xl border border-slate-200/50 dark:border-slate-800/50 bg-gradient-to-br from-slate-50/50 to-slate-100/50 dark:from-slate-900/30 dark:to-slate-800/20 overflow-hidden shadow-sm">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-8">
          {/* Email Details */}
          <div className="space-y-2">
            <div className="flex items-center gap-2 mb-3">
              <Mail className="h-4 w-4 text-blue-600 dark:text-blue-400" />
              <span className="text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-400">Email Address</span>
            </div>
            <p className="text-sm font-semibold text-slate-900 dark:text-white break-all">{customer.email}</p>
            <a
              href={`mailto:${customer.email}`}
              className="inline-flex items-center gap-2 text-xs text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 mt-2 transition-colors"
            >
              Send Email
              <ExternalLink className="h-3 w-3" />
            </a>
          </div>

          {/* Phone Details */}
          <div className="space-y-2">
            <div className="flex items-center gap-2 mb-3">
              <Phone className="h-4 w-4 text-cyan-600 dark:text-cyan-400" />
              <span className="text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-400">Phone Number</span>
            </div>
            <p className="text-sm font-semibold text-slate-900 dark:text-white">{customer.phone}</p>
            <a
              href={`tel:${customer.phone}`}
              className="inline-flex items-center gap-2 text-xs text-cyan-600 dark:text-cyan-400 hover:text-cyan-700 dark:hover:text-cyan-300 mt-2 transition-colors"
            >
              Call Now
              <ExternalLink className="h-3 w-3" />
            </a>
          </div>

          {/* Company Details */}
          <div className="space-y-2">
            <div className="flex items-center gap-2 mb-3">
              <Building className="h-4 w-4 text-purple-600 dark:text-purple-400" />
              <span className="text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-400">Company Name</span>
            </div>
            <p className="text-sm font-semibold text-slate-900 dark:text-white">{customer.company}</p>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-2">Business Partner</p>
          </div>

          {/* Status Details */}
          <div className="space-y-2">
            <div className="flex items-center gap-2 mb-3">
              <CheckCircle className="h-4 w-4 text-green-600 dark:text-green-400" />
              <span className="text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-400">Status</span>
            </div>
            <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full font-semibold text-sm ${
              isActive
                ? "bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300"
                : "bg-slate-100 dark:bg-slate-800/30 text-slate-700 dark:text-slate-300"
            }`}>
              <span className={`inline-block w-2 h-2 rounded-full ${isActive ? "bg-green-500" : "bg-slate-400"}`}></span>
              {customer.status}
            </div>
          </div>

          {/* Creation Date Details */}
          <div className="space-y-2">
            <div className="flex items-center gap-2 mb-3">
              <Calendar className="h-4 w-4 text-green-600 dark:text-green-400" />
              <span className="text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-400">Date Created</span>
            </div>
            <p className="text-sm font-semibold text-slate-900 dark:text-white">
              {createdDate.toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </p>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">{daysSinceCreation} days in system</p>
          </div>

          {/* Customer ID */}
          <div className="space-y-2">
            <div className="flex items-center gap-2 mb-3">
              <User className="h-4 w-4 text-blue-600 dark:text-blue-400" />
              <span className="text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-400">Customer ID</span>
            </div>
            <p className="text-sm font-mono font-semibold text-slate-900 dark:text-white">#CUST-{customer.id.padStart(5, "0")}</p>
            <button
              onClick={() => copyToClipboard(`CUST-${customer.id.padStart(5, "0")}`, "id")}
              className="inline-flex items-center gap-2 text-xs text-slate-600 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-300 mt-2 transition-colors"
            >
              <Copy className="h-3 w-3" />
              {copiedField === "id" ? "Copied!" : "Copy ID"}
            </button>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-4">
        <Button
          onClick={() => navigate(`/customers/${id}/edit`)}
          className="flex-1 sm:flex-none flex items-center justify-center gap-2 bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white font-semibold px-8 py-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 transform hover:-translate-y-0.5 border border-blue-700/50"
        >
          <Edit className="h-5 w-5" />
          Edit Customer
        </Button>

        <Button
          onClick={() => window.print()}
          className="flex-1 sm:flex-none flex items-center justify-center gap-2 bg-gradient-to-r from-slate-600 to-slate-700 hover:from-slate-700 hover:to-slate-800 text-white font-semibold px-8 py-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 transform hover:-translate-y-0.5 border border-slate-700/50"
        >
          <Share2 className="h-5 w-5" />
          Print / Share
        </Button>

        <Button
          onClick={() => handleDelete()}
          disabled={isDeleting}
          className="flex-1 sm:flex-none flex items-center justify-center gap-2 bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-700 hover:to-rose-700 text-white font-semibold px-8 py-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 transform hover:-translate-y-0.5 border border-red-700/50 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <Trash2 className="h-5 w-5" />
          {isDeleting ? "Deleting..." : "Delete Customer"}
        </Button>
      </div>

      {/* Additional Info Banner */}
      <div className="rounded-2xl border border-blue-200/50 dark:border-blue-800/50 bg-gradient-to-r from-blue-50/80 to-cyan-50/80 dark:from-blue-950/30 dark:to-cyan-950/30 p-6 flex items-start gap-4">
        <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-blue-200 dark:bg-blue-900/50 flex-shrink-0">
          <Info className="h-6 w-6 text-blue-600 dark:text-blue-400" />
        </div>
        <div>
          <h3 className="font-bold text-blue-900 dark:text-blue-100 mb-1">Pro Tip</h3>
          <p className="text-sm text-blue-800 dark:text-blue-200">
            Click on email or phone to contact directly. Use the Edit button to update customer information. All changes are saved automatically.
          </p>
        </div>
      </div>
    </div>
  );
}

const Info = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
);
