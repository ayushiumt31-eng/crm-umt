import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { createEmployeeSchema, type CreateEmployeeFormData } from "../schemas/employee.schema";
import { Loader2 } from "lucide-react";

interface EmployeeFormProps {
  initialData?: Partial<CreateEmployeeFormData>;
  onSubmit: (data: CreateEmployeeFormData) => Promise<void>;
  isLoading?: boolean;
  submitLabel?: string;
}

// Helper component for form field errors
function FormFieldError({ message }: { message?: string }) {
  if (!message) return null;
  return <p className="text-sm text-red-600 dark:text-red-400 mt-1">✗ {message}</p>;
}

export function EmployeeForm({
  initialData,
  onSubmit,
  isLoading = false,
  submitLabel = "Create Employee",
}: EmployeeFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<CreateEmployeeFormData>({
    resolver: zodResolver(createEmployeeSchema),
    defaultValues: initialData,
  });

  useEffect(() => {
    if (initialData) {
      reset(initialData);
    }
  }, [initialData, reset]);

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      {/* Name Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="flex items-center gap-2 text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2.5">
            First Name
            <span className="text-red-500 font-bold">*</span>
          </label>
          <input
            type="text"
            placeholder="John"
            {...register("firstName")}
            className="w-full px-4 py-2.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white placeholder-slate-500 dark:placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
          />
          <FormFieldError message={errors.firstName?.message} />
        </div>

        <div>
          <label className="flex items-center gap-2 text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2.5">
            Last Name
            <span className="text-red-500 font-bold">*</span>
          </label>
          <input
            type="text"
            placeholder="Doe"
            {...register("lastName")}
            className="w-full px-4 py-2.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white placeholder-slate-500 dark:placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
          />
          <FormFieldError message={errors.lastName?.message} />
        </div>
      </div>

      {/* Email and Phone Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="flex items-center gap-2 text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2.5">
            Email
            <span className="text-red-500 font-bold">*</span>
          </label>
          <input
            type="email"
            placeholder="john@company.com"
            {...register("email")}
            className="w-full px-4 py-2.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white placeholder-slate-500 dark:placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
          />
          <FormFieldError message={errors.email?.message} />
        </div>

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
      </div>

      {/* Department and Designation Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="flex items-center gap-2 text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2.5">
            Department
            <span className="text-red-500 font-bold">*</span>
          </label>
          <select
            {...register("department")}
            className="w-full px-4 py-2.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
          >
            <option value="">Select Department</option>
            <option value="Engineering">Engineering</option>
            <option value="Marketing">Marketing</option>
            <option value="Sales">Sales</option>
            <option value="HR">HR</option>
            <option value="Finance">Finance</option>
          </select>
          <FormFieldError message={errors.department?.message} />
        </div>

        <div>
          <label className="flex items-center gap-2 text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2.5">
            Designation
            <span className="text-red-500 font-bold">*</span>
          </label>
          <input
            type="text"
            placeholder="Senior Developer"
            {...register("designation")}
            className="w-full px-4 py-2.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white placeholder-slate-500 dark:placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
          />
          <FormFieldError message={errors.designation?.message} />
        </div>
      </div>

      {/* Joining Date and Salary Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="flex items-center gap-2 text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2.5">
            Joining Date
            <span className="text-red-500 font-bold">*</span>
          </label>
          <input
            type="date"
            {...register("joiningDate")}
            className="w-full px-4 py-2.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
          />
          <FormFieldError message={errors.joiningDate?.message} />
        </div>

        <div>
          <label className="flex items-center gap-2 text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2.5">
            Salary
            <span className="text-red-500 font-bold">*</span>
          </label>
          <input
            type="number"
            placeholder="120000"
            {...register("salary", { valueAsNumber: true })}
            className="w-full px-4 py-2.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white placeholder-slate-500 dark:placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
          />
          <FormFieldError message={errors.salary?.message} />
        </div>
      </div>

      {/* Manager and Status Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="flex items-center gap-2 text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2.5">
            Manager
            <span className="text-red-500 font-bold">*</span>
          </label>
          <input
            type="text"
            placeholder="Manager Name"
            {...register("manager")}
            className="w-full px-4 py-2.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white placeholder-slate-500 dark:placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
          />
          <FormFieldError message={errors.manager?.message} />
        </div>

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
            <option value="Active">Active</option>
            <option value="Inactive">Inactive</option>
          </select>
          <FormFieldError message={errors.status?.message} />
        </div>
      </div>

      {/* Address */}
      <div>
        <label className="flex items-center gap-2 text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2.5">
          Address
          <span className="text-red-500 font-bold">*</span>
        </label>
        <input
          type="text"
          placeholder="123 Main St, New York, NY 10001"
          {...register("address")}
          className="w-full px-4 py-2.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white placeholder-slate-500 dark:placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
        />
        <FormFieldError message={errors.address?.message} />
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
