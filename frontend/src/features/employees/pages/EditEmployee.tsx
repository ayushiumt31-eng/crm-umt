import { useParams, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { ArrowLeft, CheckCircle, ChevronDown, Loader2 } from "lucide-react";
import { dummyEmployees } from "../data/dummy-employees";

export function EditEmployee() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [showSuccess, setShowSuccess] = useState(false);
  const [expandedSection, setExpandedSection] = useState<string | null>("personal");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const employee = dummyEmployees.find((e) => e.id === id);

  if (!employee) {
    return (
      <div className="text-center py-12">
        <p className="text-lg font-semibold text-slate-900 dark:text-white mb-4">Employee Not Found</p>
        <Button onClick={() => navigate("/employees")} className="bg-blue-600 hover:bg-blue-700 text-white">
          Back to Employees
        </Button>
      </div>
    );
  }

  const { register, handleSubmit, formState: { errors } } = useForm({
    defaultValues: {
      firstName: employee.firstName,
      lastName: employee.lastName,
      email: employee.email,
      phone: employee.phone,
      address: employee.address,
      department: employee.department,
      designation: employee.designation,
      joiningDate: employee.joiningDate,
      salary: employee.salary,
      manager: employee.manager,
      status: employee.status,
      notes: employee.notes,
    },
  });

  const onSubmit = async (data: any) => {
    setIsSubmitting(true);
    try {
      const index = dummyEmployees.findIndex((e) => e.id === id);
      if (index !== -1) {
        dummyEmployees[index] = {
          ...dummyEmployees[index],
          firstName: data.firstName,
          lastName: data.lastName,
          email: data.email,
          phone: data.phone,
          address: data.address,
          department: data.department,
          designation: data.designation,
          joiningDate: data.joiningDate,
          salary: Number(data.salary),
          manager: data.manager,
          status: data.status,
          notes: data.notes,
          updatedAt: new Date().toISOString(),
        };
      }
      setShowSuccess(true);
      setTimeout(() => navigate("/employees"), 1500);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" onClick={() => navigate("/employees")} className="hover:bg-slate-100 dark:hover:bg-slate-800">
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-cyan-600 dark:from-blue-400 dark:to-cyan-400 bg-clip-text text-transparent">
            Edit Employee
          </h1>
          <p className="text-slate-600 dark:text-slate-400 mt-2 text-lg">Update {employee.firstName} {employee.lastName}'s information</p>
        </div>
      </div>

      {/* Success Message */}
      {showSuccess && (
        <div className="rounded-xl border-2 border-green-300 bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-950/30 dark:to-emerald-950/30 p-5 flex items-center gap-3 shadow-lg animate-in fade-in slide-in-from-top-2 duration-300">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-green-500 to-emerald-500 text-white">
            <CheckCircle className="h-6 w-6" />
          </div>
          <div>
            <p className="font-bold text-green-700 dark:text-green-300 text-lg">Employee Updated Successfully!</p>
            <p className="text-sm text-green-600 dark:text-green-400">Redirecting to employees list...</p>
          </div>
        </div>
      )}

      {/* Form with Sections - Same as AddEmployee */}
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {/* Personal Information Section */}
        <div className="rounded-2xl border border-slate-200/50 dark:border-slate-800/50 bg-white dark:bg-slate-900 shadow-sm overflow-hidden">
          <button
            type="button"
            onClick={() => setExpandedSection(expandedSection === "personal" ? null : "personal")}
            className="w-full px-6 py-4 flex items-center justify-between hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors"
          >
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400">👤</div>
              <div className="text-left">
                <h3 className="font-bold text-slate-900 dark:text-white">Personal Information</h3>
                <p className="text-xs text-slate-600 dark:text-slate-400">Name, contact details</p>
              </div>
            </div>
            <ChevronDown className={`h-5 w-5 text-slate-600 dark:text-slate-400 transition-transform ${expandedSection === "personal" ? "rotate-180" : ""}`} />
          </button>

          {expandedSection === "personal" && (
            <div className="border-t border-slate-200/50 dark:border-slate-800/50 px-6 py-6 bg-slate-50/50 dark:bg-slate-800/20 space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">First Name <span className="text-red-500">*</span></label>
                  <input type="text" placeholder="Enter first name" {...register("firstName")} className="w-full px-4 py-2.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white placeholder-slate-500 dark:placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent" />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">Last Name <span className="text-red-500">*</span></label>
                  <input type="text" placeholder="Enter last name" {...register("lastName")} className="w-full px-4 py-2.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white placeholder-slate-500 dark:placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent" />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">Email Address <span className="text-red-500">*</span></label>
                  <input type="email" placeholder="employee@example.com" {...register("email")} className="w-full px-4 py-2.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white placeholder-slate-500 dark:placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent" />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">Phone Number <span className="text-red-500">*</span></label>
                  <input type="phone" placeholder="+1 (555) 000-0000" {...register("phone")} className="w-full px-4 py-2.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white placeholder-slate-500 dark:placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent" />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">Address</label>
                <input type="text" placeholder="Enter street address" {...register("address")} className="w-full px-4 py-2.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white placeholder-slate-500 dark:placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent" />
              </div>
            </div>
          )}
        </div>

        {/* Job Information Section */}
        <div className="rounded-2xl border border-slate-200/50 dark:border-slate-800/50 bg-white dark:bg-slate-900 shadow-sm overflow-hidden">
          <button
            type="button"
            onClick={() => setExpandedSection(expandedSection === "job" ? null : "job")}
            className="w-full px-6 py-4 flex items-center justify-between hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors"
          >
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-cyan-100 dark:bg-cyan-900/30 text-cyan-600 dark:text-cyan-400">💼</div>
              <div className="text-left">
                <h3 className="font-bold text-slate-900 dark:text-white">Job Information</h3>
                <p className="text-xs text-slate-600 dark:text-slate-400">Department, designation, salary</p>
              </div>
            </div>
            <ChevronDown className={`h-5 w-5 text-slate-600 dark:text-slate-400 transition-transform ${expandedSection === "job" ? "rotate-180" : ""}`} />
          </button>

          {expandedSection === "job" && (
            <div className="border-t border-slate-200/50 dark:border-slate-800/50 px-6 py-6 bg-slate-50/50 dark:bg-slate-800/20 space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">Department <span className="text-red-500">*</span></label>
                  <input type="text" placeholder="e.g., Sales, IT, HR" {...register("department")} className="w-full px-4 py-2.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white placeholder-slate-500 dark:placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent" />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">Designation <span className="text-red-500">*</span></label>
                  <input type="text" placeholder="e.g., Manager, Developer" {...register("designation")} className="w-full px-4 py-2.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white placeholder-slate-500 dark:placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent" />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">Joining Date <span className="text-red-500">*</span></label>
                  <input type="date" {...register("joiningDate")} className="w-full px-4 py-2.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent" />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">Salary <span className="text-red-500">*</span></label>
                  <input type="number" placeholder="50000" {...register("salary")} className="w-full px-4 py-2.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white placeholder-slate-500 dark:placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent" />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">Manager</label>
                  <input type="text" placeholder="Manager name" {...register("manager")} className="w-full px-4 py-2.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white placeholder-slate-500 dark:placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent" />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">Status</label>
                  <select {...register("status")} className="w-full px-4 py-2.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                    <option value="Active">🟢 Active</option>
                    <option value="Inactive">⭕ Inactive</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">Notes</label>
                <textarea placeholder="Additional notes..." {...register("notes")} rows={3} className="w-full px-4 py-2.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white placeholder-slate-500 dark:placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none" />
              </div>
            </div>
          )}
        </div>

        {/* Submit Buttons */}
        <div className="flex gap-3 justify-end pt-4">
          <Button type="button" onClick={() => navigate("/employees")} variant="outline" className="px-6 py-2">
            Cancel
          </Button>
          <Button type="submit" disabled={isSubmitting} className="bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white px-6 py-2 flex items-center gap-2">
            {isSubmitting && <Loader2 className="h-4 w-4 animate-spin" />}
            {isSubmitting ? "Updating..." : "Update Employee"}
          </Button>
        </div>
      </form>
    </div>
  );
}
