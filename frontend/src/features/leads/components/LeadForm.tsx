import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { createLeadSchema, type CreateLeadFormData } from "../schemas/lead.schema";
import { Loader2 } from "lucide-react";

interface LeadFormProps {
  initialData?: Partial<CreateLeadFormData>;
  assignedEmployees: string[];
  onSubmit: (data: CreateLeadFormData) => Promise<void>;
  isLoading?: boolean;
  submitLabel?: string;
}

// Helper component for form field errors
function FormFieldError({ message }: { message?: string }) {
  if (!message) return null;
  return <p className="text-sm text-red-600 dark:text-red-400 mt-1">✗ {message}</p>;
}

export function LeadForm({
  initialData,
  assignedEmployees,
  onSubmit,
  isLoading = false,
  submitLabel = "Create Lead",
}: LeadFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<CreateLeadFormData>({
    resolver: zodResolver(createLeadSchema),
    defaultValues: initialData,
  });

  useEffect(() => {
    if (initialData) {
      reset(initialData);
    }
  }, [initialData, reset]);

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      {/* Lead Name and Company Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="flex items-center gap-2 text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2.5">
            Lead Name
            <span className="text-red-500 font-bold">*</span>
          </label>
          <input
            type="text"
            placeholder="Lead name"
            {...register("leadName")}
            className="w-full px-4 py-2.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white placeholder-slate-500 dark:placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
          />
          <FormFieldError message={errors.leadName?.message} />
        </div>

        <div>
          <label className="flex items-center gap-2 text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2.5">
            Company Name
            <span className="text-red-500 font-bold">*</span>
          </label>
          <input
            type="text"
            placeholder="Company name"
            {...register("companyName")}
            className="w-full px-4 py-2.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white placeholder-slate-500 dark:placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
          />
          <FormFieldError message={errors.companyName?.message} />
        </div>
      </div>

      {/* Contact Person and Email Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="flex items-center gap-2 text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2.5">
            Contact Person
            <span className="text-red-500 font-bold">*</span>
          </label>
          <input
            type="text"
            placeholder="Contact person name"
            {...register("contactPerson")}
            className="w-full px-4 py-2.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white placeholder-slate-500 dark:placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
          />
          <FormFieldError message={errors.contactPerson?.message} />
        </div>

        <div>
          <label className="flex items-center gap-2 text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2.5">
            Email
            <span className="text-red-500 font-bold">*</span>
          </label>
          <input
            type="email"
            placeholder="email@company.com"
            {...register("email")}
            className="w-full px-4 py-2.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white placeholder-slate-500 dark:placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
          />
          <FormFieldError message={errors.email?.message} />
        </div>
      </div>

      {/* Phone and Source Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="flex items-center gap-2 text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2.5">
            Phone
            <span className="text-red-500 font-bold">*</span>
          </label>
          <input
            type="tel"
            placeholder="+1 (555) 123-4567"
            {...register("phone")}
            className="w-full px-4 py-2.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white placeholder-slate-500 dark:placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
          />
          <FormFieldError message={errors.phone?.message} />
        </div>

        <div>
          <label className="flex items-center gap-2 text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2.5">
            Source
            <span className="text-red-500 font-bold">*</span>
          </label>
          <select
            {...register("source")}
            className="w-full px-4 py-2.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
          >
            <option value="">Select Source</option>
            <option value="Website">Website</option>
            <option value="Referral">Referral</option>
            <option value="Social Media">Social Media</option>
            <option value="Campaign">Campaign</option>
            <option value="Walk-in">Walk-in</option>
          </select>
          <FormFieldError message={errors.source?.message} />
        </div>
      </div>

      {/* Status and Assigned To Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="flex items-center gap-2 text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2.5">
            Status
            <span className="text-red-500 font-bold">*</span>
          </label>
          <select
            {...register("status")}
            className="w-full px-4 py-2.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
          >
            <option value="">Select Status</option>
            <option value="New">New</option>
            <option value="Contacted">Contacted</option>
            <option value="Qualified">Qualified</option>
            <option value="Proposal Sent">Proposal Sent</option>
            <option value="Won">Won</option>
            <option value="Lost">Lost</option>
          </select>
          <FormFieldError message={errors.status?.message} />
        </div>

        <div>
          <label className="flex items-center gap-2 text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2.5">
            Assigned Employee
            <span className="text-red-500 font-bold">*</span>
          </label>
          <select
            {...register("assignedTo")}
            className="w-full px-4 py-2.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
          >
            <option value="">Select Employee</option>
            {assignedEmployees.map((employee) => (
              <option key={employee} value={employee}>
                {employee}
              </option>
            ))}
          </select>
          <FormFieldError message={errors.assignedTo?.message} />
        </div>
      </div>

      {/* Expected Deal Value and Follow-up Date Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="flex items-center gap-2 text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2.5">
            Expected Deal Value
            <span className="text-red-500 font-bold">*</span>
          </label>
          <input
            type="number"
            placeholder="100000"
            {...register("expectedDealValue", { valueAsNumber: true })}
            className="w-full px-4 py-2.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white placeholder-slate-500 dark:placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
          />
          <FormFieldError message={errors.expectedDealValue?.message} />
        </div>

        <div>
          <label className="flex items-center gap-2 text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2.5">
            Follow-up Date
            <span className="text-red-500 font-bold">*</span>
          </label>
          <input
            type="date"
            {...register("followUpDate")}
            className="w-full px-4 py-2.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
          />
          <FormFieldError message={errors.followUpDate?.message} />
        </div>
      </div>

      {/* Notes */}
      <div>
        <label className="text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2.5 block">
          Notes
        </label>
        <textarea
          placeholder="Add any additional notes..."
          {...register("notes")}
          rows={4}
          className="w-full px-4 py-2.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white placeholder-slate-500 dark:placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all resize-none"
        />
        <FormFieldError message={errors.notes?.message} />
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        disabled={isLoading}
        className="w-full px-6 py-3 rounded-lg bg-gradient-to-r from-blue-600 to-cyan-600 text-white font-bold shadow-lg hover:shadow-xl transition-all duration-200 hover:from-blue-700 hover:to-cyan-700 disabled:opacity-50 disabled:cursor-not-allowed inline-flex items-center justify-center gap-2"
      >
        {isLoading && <Loader2 className="h-4 w-4 animate-spin" />}
        {isLoading ? "Saving..." : submitLabel}
      </button>
    </form>
  );
}
