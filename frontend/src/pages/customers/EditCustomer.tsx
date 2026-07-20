import { useParams, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { ArrowLeft, CheckCircle, ChevronDown, Loader2 } from "lucide-react";
import { dummyCustomers } from "@/data/customers";

export default function EditCustomer() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [showSuccess, setShowSuccess] = useState(false);
  const [expandedSection, setExpandedSection] = useState<string | null>("basic");
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Find customer
  const customer = dummyCustomers.find((c) => c.id === id);

  if (!customer) {
    return (
      <div className="text-center py-12">
        <p className="text-lg font-semibold text-slate-900 dark:text-white mb-4">Customer Not Found</p>
        <Button onClick={() => navigate("/customers")} className="bg-blue-600 hover:bg-blue-700 text-white">
          Back to Customers
        </Button>
      </div>
    );
  }

  const { register, handleSubmit, formState: { errors } } = useForm({
    defaultValues: {
      name: customer.name,
      email: customer.email,
      phone: customer.phone,
      address: "",
      company: customer.company,
      status: customer.status,
    },
  });

  const onSubmit = async (data: any) => {
    setIsSubmitting(true);
    try {
      const index = dummyCustomers.findIndex((c) => c.id === id);
      if (index !== -1) {
        dummyCustomers[index] = {
          ...dummyCustomers[index],
          name: data.name,
          email: data.email,
          phone: data.phone,
          company: data.company,
          status: data.status || dummyCustomers[index].status,
        };
      }
      setShowSuccess(true);
      setTimeout(() => navigate("/customers"), 1500);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" onClick={() => navigate("/customers")} className="hover:bg-slate-100 dark:hover:bg-slate-800">
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-cyan-600 dark:from-blue-400 dark:to-cyan-400 bg-clip-text text-transparent">
            Edit Customer
          </h1>
          <p className="text-slate-600 dark:text-slate-400 mt-2 text-lg">Update {customer.name}'s information</p>
        </div>
      </div>

      {/* Success Message */}
      {showSuccess && (
        <div className="rounded-xl border-2 border-green-300 bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-950/30 dark:to-emerald-950/30 p-5 flex items-center gap-3 shadow-lg animate-in fade-in slide-in-from-top-2 duration-300">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-green-500 to-emerald-500 text-white">
            <CheckCircle className="h-6 w-6" />
          </div>
          <div>
            <p className="font-bold text-green-700 dark:text-green-300 text-lg">Customer Updated Successfully!</p>
            <p className="text-sm text-green-600 dark:text-green-400">Redirecting to customers list...</p>
          </div>
        </div>
      )}

      {/* Form with Sections */}
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {/* Basic Information Section */}
        <div className="rounded-2xl border border-slate-200/50 dark:border-slate-800/50 bg-white dark:bg-slate-900 shadow-sm overflow-hidden">
          <button
            type="button"
            onClick={() => setExpandedSection(expandedSection === "basic" ? null : "basic")}
            className="w-full px-6 py-4 flex items-center justify-between hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors"
          >
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400">👤</div>
              <div className="text-left">
                <h3 className="font-bold text-slate-900 dark:text-white">Basic Information</h3>
                <p className="text-xs text-slate-600 dark:text-slate-400">Personal details</p>
              </div>
            </div>
            <ChevronDown className={`h-5 w-5 text-slate-600 dark:text-slate-400 transition-transform ${expandedSection === "basic" ? "rotate-180" : ""}`} />
          </button>

          {expandedSection === "basic" && (
            <div className="border-t border-slate-200/50 dark:border-slate-800/50 px-6 py-6 bg-slate-50/50 dark:bg-slate-800/20 space-y-4">
              {/* Row 1: Name | Email */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">
                    Full Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    placeholder="Enter customer's full name"
                    {...register("name")}
                    className="w-full px-4 py-2.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white placeholder-slate-500 dark:placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                  {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name?.message}</p>}
                </div>
                <div>
                  <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">
                    Email Address <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="email"
                    placeholder="customer@example.com"
                    {...register("email")}
                    className="w-full px-4 py-2.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white placeholder-slate-500 dark:placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                  {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email?.message}</p>}
                </div>
              </div>

              {/* Row 2: Phone | Address */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">
                    Phone Number <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="phone"
                    placeholder="+1 (555) 000-0000"
                    {...register("phone")}
                    className="w-full px-4 py-2.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white placeholder-slate-500 dark:placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                  {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone?.message}</p>}
                </div>
                <div>
                  <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">
                    Address
                  </label>
                  <input
                    type="text"
                    placeholder="Enter street address"
                    {...register("address")}
                    className="w-full px-4 py-2.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white placeholder-slate-500 dark:placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Company Information Section */}
        <div className="rounded-2xl border border-slate-200/50 dark:border-slate-800/50 bg-white dark:bg-slate-900 shadow-sm overflow-hidden">
          <button
            type="button"
            onClick={() => setExpandedSection(expandedSection === "company" ? null : "company")}
            className="w-full px-6 py-4 flex items-center justify-between hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors"
          >
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-cyan-100 dark:bg-cyan-900/30 text-cyan-600 dark:text-cyan-400">🏢</div>
              <div className="text-left">
                <h3 className="font-bold text-slate-900 dark:text-white">Company Information</h3>
                <p className="text-xs text-slate-600 dark:text-slate-400">Company details and status</p>
              </div>
            </div>
            <ChevronDown className={`h-5 w-5 text-slate-600 dark:text-slate-400 transition-transform ${expandedSection === "company" ? "rotate-180" : ""}`} />
          </button>

          {expandedSection === "company" && (
            <div className="border-t border-slate-200/50 dark:border-slate-800/50 px-6 py-6 bg-slate-50/50 dark:bg-slate-800/20 space-y-4">
              {/* Row 1: Company | Status */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">
                    Company Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    placeholder="Enter company name"
                    {...register("company")}
                    className="w-full px-4 py-2.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white placeholder-slate-500 dark:placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">
                    Customer Status
                  </label>
                  <select
                    {...register("status")}
                    className="w-full px-4 py-2.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="Active">🟢 Active</option>
                    <option value="Inactive">⭕ Inactive</option>
                  </select>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Submit Buttons */}
        <div className="flex gap-3 justify-end pt-4">
          <Button type="button" onClick={() => navigate("/customers")} variant="outline" className="px-6 py-2">
            Cancel
          </Button>
          <Button type="submit" disabled={isSubmitting} className="bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white px-6 py-2 flex items-center gap-2">
            {isSubmitting && <Loader2 className="h-4 w-4 animate-spin" />}
            {isSubmitting ? "Updating..." : "Update Customer"}
          </Button>
        </div>
      </form>
    </div>
  );
}
