import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { customerSchema, type CustomerFormData } from "@/schemas/customer.schema";
import { Loader2, Plus, X, User, Mail, Phone, Building2, MessageSquare, CheckCircle2 } from "lucide-react";

interface CustomerFormProps {
  initialData?: Partial<CustomerFormData>;
  onSubmit: (data: CustomerFormData) => Promise<void> | void;
  onCancel: () => void;
  isEdit?: boolean;
}

export function CustomerForm({
  initialData,
  onSubmit,
  onCancel,
  isEdit = false,
}: CustomerFormProps) {
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CustomerFormData>({
    resolver: zodResolver(customerSchema),
    defaultValues: {
      status: "Active",
      ...initialData,
    },
  });

  const handleFormSubmit = async (data: CustomerFormData) => {
    setIsLoading(true);
    try {
      await onSubmit(data);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-8">
      {/* Contact Information Section */}
      <div className="rounded-2xl border border-blue-200/50 bg-gradient-to-br from-blue-50/80 via-blue-50/50 to-cyan-50/80 p-8 shadow-sm hover:shadow-md transition-all dark:border-blue-900/30 dark:from-blue-950/30 dark:via-blue-950/20 dark:to-cyan-950/30">
        <div className="flex items-center gap-4 mb-8">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-blue-500 to-cyan-500 text-white shadow-lg">
            <User className="h-6 w-6" />
          </div>
          <div>
            <h3 className="text-xl font-bold bg-gradient-to-r from-blue-600 to-cyan-600 dark:from-blue-400 dark:to-cyan-400 bg-clip-text text-transparent">
              Contact Information
            </h3>
            <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">Enter customer's personal details</p>
          </div>
        </div>

        <div className="space-y-5">
          <div>
            <label className="flex items-center gap-2 text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2.5">
              <User className="h-4 w-4 text-blue-500" />
              Full Name
              <span className="text-red-500 font-bold">*</span>
            </label>
            <input
              type="text"
              placeholder="Enter customer's full name"
              className="w-full px-4 py-3 rounded-xl border border-blue-200 bg-white text-slate-900 placeholder-slate-400 font-medium transition-all focus:border-blue-500 focus:ring-2 focus:ring-blue-300 dark:border-blue-900/40 dark:bg-slate-900 dark:text-white dark:placeholder-slate-500 dark:focus:ring-blue-900/40"
              {...register("name")}
            />
            {errors.name && (
              <p className="text-sm text-red-600 dark:text-red-400 mt-2 font-medium">✗ {errors.name.message}</p>
            )}
          </div>

          <div>
            <label className="flex items-center gap-2 text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2.5">
              <Mail className="h-4 w-4 text-cyan-500" />
              Email Address
              <span className="text-red-500 font-bold">*</span>
            </label>
            <input
              type="email"
              placeholder="customer@example.com"
              className="w-full px-4 py-3 rounded-xl border border-cyan-200 bg-white text-slate-900 placeholder-slate-400 font-medium transition-all focus:border-cyan-500 focus:ring-2 focus:ring-cyan-300 dark:border-cyan-900/40 dark:bg-slate-900 dark:text-white dark:placeholder-slate-500 dark:focus:ring-cyan-900/40"
              {...register("email")}
            />
            {errors.email && (
              <p className="text-sm text-red-600 dark:text-red-400 mt-2 font-medium">✗ {errors.email.message}</p>
            )}
          </div>

          <div>
            <label className="flex items-center gap-2 text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2.5">
              <Phone className="h-4 w-4 text-blue-500" />
              Phone Number
              <span className="text-red-500 font-bold">*</span>
            </label>
            <input
              type="tel"
              placeholder="+1 (555) 000-0000"
              className="w-full px-4 py-3 rounded-xl border border-blue-200 bg-white text-slate-900 placeholder-slate-400 font-medium transition-all focus:border-blue-500 focus:ring-2 focus:ring-blue-300 dark:border-blue-900/40 dark:bg-slate-900 dark:text-white dark:placeholder-slate-500 dark:focus:ring-blue-900/40"
              {...register("phone")}
            />
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-2.5 font-medium">💡 Include country code for international numbers</p>
            {errors.phone && (
              <p className="text-sm text-red-600 dark:text-red-400 mt-2 font-medium">✗ {errors.phone.message}</p>
            )}
          </div>
        </div>
      </div>

      {/* Company Information Section */}
      <div className="rounded-2xl border border-purple-200/50 bg-gradient-to-br from-purple-50/80 via-purple-50/50 to-pink-50/80 p-8 shadow-sm hover:shadow-md transition-all dark:border-purple-900/30 dark:from-purple-950/30 dark:via-purple-950/20 dark:to-pink-950/30">
        <div className="flex items-center gap-4 mb-8">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 text-white shadow-lg">
            <Building2 className="h-6 w-6" />
          </div>
          <div>
            <h3 className="text-xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 dark:from-purple-400 dark:to-pink-400 bg-clip-text text-transparent">
              Company Information
            </h3>
            <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">Business details</p>
          </div>
        </div>

        <div>
          <label className="flex items-center gap-2 text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2.5">
            <Building2 className="h-4 w-4 text-purple-500" />
            Company Name
            <span className="text-red-500 font-bold">*</span>
          </label>
          <input
            type="text"
            placeholder="Enter company name"
            className="w-full px-4 py-3 rounded-xl border border-purple-200 bg-white text-slate-900 placeholder-slate-400 font-medium transition-all focus:border-purple-500 focus:ring-2 focus:ring-purple-300 dark:border-purple-900/40 dark:bg-slate-900 dark:text-white dark:placeholder-slate-500 dark:focus:ring-purple-900/40"
            {...register("company")}
          />
          {errors.company && (
            <p className="text-sm text-red-600 dark:text-red-400 mt-2 font-medium">✗ {errors.company.message}</p>
          )}
        </div>
      </div>

      {/* Status & Notes Section */}
      <div className="rounded-2xl border border-emerald-200/50 bg-gradient-to-br from-emerald-50/80 via-emerald-50/50 to-teal-50/80 p-8 shadow-sm hover:shadow-md transition-all dark:border-emerald-900/30 dark:from-emerald-950/30 dark:via-emerald-950/20 dark:to-teal-950/30">
        <div className="flex items-center gap-4 mb-8">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-emerald-500 to-teal-500 text-white shadow-lg">
            <CheckCircle2 className="h-6 w-6" />
          </div>
          <div>
            <h3 className="text-xl font-bold bg-gradient-to-r from-emerald-600 to-teal-600 dark:from-emerald-400 dark:to-teal-400 bg-clip-text text-transparent">
              Status & Notes
            </h3>
            <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">Additional information</p>
          </div>
        </div>

        <div className="space-y-5">
          <div>
            <label className="flex items-center gap-2 text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2.5">
              <CheckCircle2 className="h-4 w-4 text-emerald-500" />
              Customer Status
            </label>
            <select
              className="w-full px-4 py-3 rounded-xl border border-emerald-200 bg-white text-slate-900 font-medium transition-all cursor-pointer focus:border-emerald-500 focus:ring-2 focus:ring-emerald-300 dark:border-emerald-900/40 dark:bg-slate-900 dark:text-white dark:focus:ring-emerald-900/40"
              {...register("status")}
            >
              <option value="Active">🟢 Active - Customer is currently active</option>
              <option value="Inactive">⭕ Inactive - Customer is inactive</option>
            </select>
          </div>

          <div>
            <label className="flex items-center gap-2 text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2.5">
              <MessageSquare className="h-4 w-4 text-teal-500" />
              Additional Notes
            </label>
            <textarea
              placeholder="Add any additional information about the customer..."
              maxLength={500}
              rows={4}
              className="w-full px-4 py-3 rounded-xl border border-teal-200 bg-white text-slate-900 placeholder-slate-400 font-medium transition-all resize-none focus:border-teal-500 focus:ring-2 focus:ring-teal-300 dark:border-teal-900/40 dark:bg-slate-900 dark:text-white dark:placeholder-slate-500 dark:focus:ring-teal-900/40"
              {...register("notes")}
            />
            {errors.notes && (
              <p className="text-sm text-red-600 dark:text-red-400 mt-2 font-medium">✗ {errors.notes.message}</p>
            )}
          </div>
        </div>
      </div>

      {/* Form Actions */}
      <div className="flex gap-4 justify-end pt-8 border-t-2 border-slate-200 dark:border-slate-700">
        <Button
          type="button"
          variant="outline"
          onClick={onCancel}
          disabled={isLoading}
          className="gap-2 px-6 py-2.5 font-semibold text-slate-700 dark:text-slate-300"
        >
          <X className="h-5 w-5" />
          Cancel
        </Button>
        <Button 
          type="submit" 
          disabled={isLoading}
          className="gap-2 min-w-[180px] py-2.5 px-6 font-semibold bg-gradient-to-r from-blue-600 via-blue-500 to-cyan-600 hover:from-blue-700 hover:via-blue-600 hover:to-cyan-700 text-white shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-200"
        >
          {isLoading ? (
            <>
              <Loader2 className="h-5 w-5 animate-spin" />
              {isEdit ? "Updating..." : "Creating..."}
            </>
          ) : (
            <>
              <Plus className="h-5 w-5" />
              {isEdit ? "Update Customer" : "Add Customer"}
            </>
          )}
        </Button>
      </div>
    </form>
  );
}
