import { useParams, useNavigate } from "react-router-dom";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Edit, Trash2, Mail, Phone, Building2, Calendar, User, Briefcase } from "lucide-react";
import { dummyCustomers } from "@/data/customers";

export default function ViewCustomer() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  // Find customer
  const customer = dummyCustomers.find((c) => c.id === id);

  if (!customer) {
    return (
      <div className="space-y-6">
        <Button variant="ghost" size="icon" onClick={() => navigate("/customers")} className="hover:bg-slate-100 dark:hover:bg-slate-800">
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <div className="rounded-2xl border-2 border-dashed border-slate-300 dark:border-slate-600 bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900/50 dark:to-slate-800/50 p-12 text-center">
          <p className="text-lg font-bold text-slate-900 dark:text-white mb-4">Customer Not Found</p>
          <Button onClick={() => navigate("/customers")} className="bg-blue-600 hover:bg-blue-700 text-white">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Customers
          </Button>
        </div>
      </div>
    );
  }

  const handleDelete = async () => {
    setIsDeleting(true);
    try {
      const index = dummyCustomers.findIndex((c) => c.id === id);
      if (index !== -1) {
        dummyCustomers.splice(index, 1);
        setTimeout(() => navigate("/customers"), 500);
      }
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header with Gradient Background */}
      <div className="rounded-2xl bg-gradient-to-r from-blue-600 via-cyan-500 to-blue-600 dark:from-blue-900 dark:via-cyan-900 dark:to-blue-900 p-8 shadow-lg overflow-hidden relative">
        {/* Animated background */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-0 left-0 w-96 h-96 bg-white/20 rounded-full blur-3xl animate-pulse" style={{ animation: "pulse 6s ease-in-out infinite" }}></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-cyan-300/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: "3s" }}></div>
        </div>

        <div className="relative z-10">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-4">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => navigate("/customers")}
                className="hover:bg-white/20 backdrop-blur-md text-white border border-white/30"
              >
                <ArrowLeft className="h-5 w-5" />
              </Button>
              <div>
                <p className="text-blue-100 text-sm mb-1">Customer Details</p>
                <h1 className="text-4xl font-bold text-white drop-shadow-lg">{customer.name}</h1>
              </div>
            </div>

            {/* Status Badge */}
            <div
              className={`flex items-center gap-2 rounded-full px-5 py-2.5 font-bold text-sm backdrop-blur-md ${
                customer.status === "Active"
                  ? "bg-green-500/30 text-white border-2 border-green-300/50"
                  : "bg-slate-500/30 text-white border-2 border-slate-300/50"
              }`}
            >
              <span className={`inline-block w-2.5 h-2.5 rounded-full ${customer.status === "Active" ? "bg-green-200 animate-pulse" : "bg-slate-200"}`}></span>
              {customer.status}
            </div>
          </div>

          {/* Quick Actions in Header */}
          <div className="flex gap-3">
            <Button
              onClick={() => navigate(`/customers/${id}/edit`)}
              className="bg-white/20 hover:bg-white/30 backdrop-blur-md text-white border border-white/30 px-6 py-2 rounded-lg flex items-center gap-2 transition-all"
            >
              <Edit className="h-4 w-4" />
              Edit Customer
            </Button>
            <Button
              onClick={() => setShowDeleteConfirm(true)}
              className="bg-red-500/20 hover:bg-red-500/30 backdrop-blur-md text-white border border-red-300/50 px-6 py-2 rounded-lg flex items-center gap-2 transition-all"
            >
              <Trash2 className="h-4 w-4" />
              Delete
            </Button>
          </div>
        </div>
      </div>

      {/* Delete Confirmation Dialog */}
      {showDeleteConfirm && (
        <div className="fixed inset-0 bg-black/50 dark:bg-black/70 flex items-center justify-center z-50 p-4 backdrop-blur-sm">
          <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-2xl max-w-md w-full p-8 space-y-6 animate-in fade-in zoom-in duration-200">
            <div>
              <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">Delete Customer?</h2>
              <p className="text-slate-600 dark:text-slate-400">
                Are you sure you want to delete <span className="font-semibold text-slate-900 dark:text-white">{customer.name}</span>? This action cannot be undone.
              </p>
            </div>
            <div className="flex gap-3 justify-end">
              <Button type="button" onClick={() => setShowDeleteConfirm(false)} variant="outline" className="px-6 py-2">
                Cancel
              </Button>
              <Button type="button" onClick={handleDelete} disabled={isDeleting} className="bg-red-600 hover:bg-red-700 text-white px-6 py-2">
                {isDeleting ? "Deleting..." : "Delete"}
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Customer Information Grid - 3 Columns */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Contact Information Card */}
        <div className="lg:col-span-2 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm overflow-hidden">
          <div className="bg-gradient-to-r from-blue-50 to-cyan-50 dark:from-blue-950/20 dark:to-cyan-950/20 px-6 py-4 border-b border-slate-200 dark:border-slate-700">
            <h3 className="font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <User className="h-5 w-5 text-blue-600 dark:text-blue-400" />
              Contact Information
            </h3>
          </div>
          
          <div className="p-6 space-y-6">
            {/* Full Name */}
            <div className="flex items-start gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 flex-shrink-0">
                <User className="h-6 w-6" />
              </div>
              <div className="flex-1">
                <label className="block text-sm font-semibold text-slate-600 dark:text-slate-400 mb-1">Full Name</label>
                <p className="text-lg font-semibold text-slate-900 dark:text-white">{customer.name}</p>
              </div>
            </div>

            {/* Email */}
            <div className="flex items-start gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-cyan-100 dark:bg-cyan-900/30 text-cyan-600 dark:text-cyan-400 flex-shrink-0">
                <Mail className="h-6 w-6" />
              </div>
              <div className="flex-1">
                <label className="block text-sm font-semibold text-slate-600 dark:text-slate-400 mb-1">Email Address</label>
                <a
                  href={`mailto:${customer.email}`}
                  className="text-lg font-semibold text-blue-600 dark:text-blue-400 hover:underline"
                >
                  {customer.email}
                </a>
              </div>
            </div>

            {/* Phone */}
            <div className="flex items-start gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 flex-shrink-0">
                <Phone className="h-6 w-6" />
              </div>
              <div className="flex-1">
                <label className="block text-sm font-semibold text-slate-600 dark:text-slate-400 mb-1">Phone Number</label>
                <a
                  href={`tel:${customer.phone}`}
                  className="text-lg font-semibold text-blue-600 dark:text-blue-400 hover:underline"
                >
                  {customer.phone}
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Company & Status Card */}
        <div className="space-y-6">
          {/* Company Info */}
          <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm overflow-hidden">
            <div className="bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-950/20 dark:to-pink-950/20 px-6 py-4 border-b border-slate-200 dark:border-slate-700">
              <h3 className="font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <Briefcase className="h-5 w-5 text-purple-600 dark:text-purple-400" />
                Company Details
              </h3>
            </div>
            
            <div className="p-6 space-y-6">
              {/* Company Name */}
              <div className="flex items-start gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 flex-shrink-0">
                  <Building2 className="h-6 w-6" />
                </div>
                <div className="flex-1">
                  <label className="block text-sm font-semibold text-slate-600 dark:text-slate-400 mb-1">Company</label>
                  <p className="text-lg font-semibold text-slate-900 dark:text-white">{customer.company}</p>
                </div>
              </div>

              {/* Status */}
              <div className="flex items-start gap-4">
                <div className={`flex h-12 w-12 items-center justify-center rounded-lg flex-shrink-0 ${
                  customer.status === "Active"
                    ? "bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400"
                    : "bg-slate-100 dark:bg-slate-900/30 text-slate-600 dark:text-slate-400"
                }`}>
                  <span className="text-2xl">{customer.status === "Active" ? "✓" : "○"}</span>
                </div>
                <div className="flex-1">
                  <label className="block text-sm font-semibold text-slate-600 dark:text-slate-400 mb-1">Status</label>
                  <span
                    className={`inline-flex items-center rounded-full px-3 py-1.5 text-sm font-bold ${
                      customer.status === "Active"
                        ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300"
                        : "bg-slate-100 text-slate-700 dark:bg-slate-900/30 dark:text-slate-400"
                    }`}
                  >
                    {customer.status}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Member Since Card */}
          <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm overflow-hidden">
            <div className="bg-gradient-to-r from-orange-50 to-amber-50 dark:from-orange-950/20 dark:to-amber-950/20 px-6 py-4 border-b border-slate-200 dark:border-slate-700">
              <h3 className="font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <Calendar className="h-5 w-5 text-orange-600 dark:text-orange-400" />
                Membership
              </h3>
            </div>
            
            <div className="p-6">
              <div className="flex items-start gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-orange-100 dark:bg-orange-900/30 text-orange-600 dark:text-orange-400 flex-shrink-0">
                  <Calendar className="h-6 w-6" />
                </div>
                <div className="flex-1">
                  <label className="block text-sm font-semibold text-slate-600 dark:text-slate-400 mb-1">Member Since</label>
                  <p className="text-lg font-semibold text-slate-900 dark:text-white">
                    {new Date(customer.createdAt).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Back Button */}
      <div className="flex justify-start">
        <Button onClick={() => navigate("/customers")} variant="outline" className="px-6 py-2 rounded-lg">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Customers
        </Button>
      </div>
    </div>
  );
}
