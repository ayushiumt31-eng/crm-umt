import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ArrowLeft, CheckCircle, Plus } from "lucide-react";
import { FormModal, FormRenderer } from "@/components/common";
import { useFormModal } from "@/hooks";
import { dummyCustomers } from "@/data/customers";
import { User, Building2, CheckCircle2 } from "lucide-react";

export default function AddCustomer() {
  const navigate = useNavigate();
  const [showSuccess, setShowSuccess] = useState(false);
  const [isInitialized, setIsInitialized] = useState(false);

  const form = useFormModal({
    onSubmit: async (data) => {
      console.log("Creating customer:", data);

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 500));

      // Add to dummy data (for demo)
      const newCustomer = {
        id: String(dummyCustomers.length + 1),
        ...data,
        createdAt: new Date().toISOString(),
      };
      dummyCustomers.push(newCustomer);

      setShowSuccess(true);
      setTimeout(() => {
        navigate("/customers");
      }, 1500);
    },
  });

  // Initialize form on mount and auto-open
  useEffect(() => {
    if (!isInitialized) {
      form.updateField("name", "");
      form.updateField("email", "");
      form.updateField("phone", "");
      form.updateField("company", "");
      form.updateField("status", "Active");
      setIsInitialized(true);
      form.open();
    }
  }, [isInitialized, form]);

  const formFields = [
    {
      id: "name",
      label: "Full Name",
      type: "text" as const,
      placeholder: "Enter customer's full name",
      required: true,
      value: form.formData.name || "",
      onChange: (val: string) => form.updateField("name", val),
      error: form.errors.name,
    },
    {
      id: "email",
      label: "Email Address",
      type: "email" as const,
      placeholder: "customer@example.com",
      required: true,
      value: form.formData.email || "",
      onChange: (val: string) => form.updateField("email", val),
      error: form.errors.email,
    },
    {
      id: "phone",
      label: "Phone Number",
      type: "tel" as const,
      placeholder: "+1 (555) 000-0000",
      required: true,
      helper: "Include country code for international numbers",
      value: form.formData.phone || "",
      onChange: (val: string) => form.updateField("phone", val),
      error: form.errors.phone,
    },
    {
      id: "company",
      label: "Company Name",
      type: "text" as const,
      placeholder: "Enter company name",
      required: true,
      value: form.formData.company || "",
      onChange: (val: string) => form.updateField("company", val),
      error: form.errors.company,
    },
    {
      id: "status",
      label: "Customer Status",
      type: "select" as const,
      options: [
        { value: "Active", label: "🟢 Active - Customer is currently active" },
        { value: "Inactive", label: "⭕ Inactive - Customer is inactive" },
      ],
      value: form.formData.status || "Active",
      onChange: (val: string) => form.updateField("status", val),
    },
  ];

  const formSections = [
    {
      title: "Contact Information",
      description: "Enter customer's personal details",
      icon: (
        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-blue-500 to-cyan-500 text-white">
          <User className="h-6 w-6" />
        </div>
      ),
      fields: ["name", "email", "phone"],
    },
    {
      title: "Company Information",
      description: "Business details",
      icon: (
        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 text-white">
          <Building2 className="h-6 w-6" />
        </div>
      ),
      fields: ["company"],
    },
    {
      title: "Status",
      description: "Additional information",
      icon: (
        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-emerald-500 to-teal-500 text-white">
          <CheckCircle2 className="h-6 w-6" />
        </div>
      ),
      fields: ["status"],
    },
  ];

  const handleValidation = (data: Record<string, string>) => {
    const errors: Record<string, string> = {};
    if (!data.name?.trim()) errors.name = "Name is required";
    if (!data.email?.includes("@")) errors.email = "Valid email required";
    if (!data.phone || data.phone.length < 10) errors.phone = "Valid phone required";
    if (!data.company?.trim()) errors.company = "Company is required";
    return errors;
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => navigate("/customers")}
          className="hover:bg-slate-100 dark:hover:bg-slate-800"
        >
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-cyan-600 dark:from-blue-400 dark:to-cyan-400 bg-clip-text text-transparent">
            Add New Customer
          </h1>
          <p className="text-slate-600 dark:text-slate-400 mt-2 text-lg">
            Create a new customer profile with all essential information
          </p>
        </div>
      </div>

      {/* Success Message */}
      {showSuccess && (
        <div className="rounded-xl border-2 border-green-300 bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-950/30 dark:to-emerald-950/30 p-5 flex items-center gap-3 shadow-lg animate-in fade-in slide-in-from-top-2 duration-300">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-green-500 to-emerald-500 text-white">
            <CheckCircle className="h-6 w-6" />
          </div>
          <div>
            <p className="font-bold text-green-700 dark:text-green-300 text-lg">Customer Added Successfully!</p>
            <p className="text-sm text-green-600 dark:text-green-400">Redirecting to customers list...</p>
          </div>
        </div>
      )}

      {/* Form Modal - Auto opens on page load */}
      <FormModal
        isOpen={form.isOpen}
        onClose={() => {
          form.close();
          navigate("/customers");
        }}
        title="Add Customer"
        description="Create a new customer profile with all essential information"
        icon={
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-blue-500 to-cyan-500 text-white">
            <Plus className="h-5 w-5" />
          </div>
        }
        variant="modal"
        size="md"
        submitButtonText="Add Customer"
        cancelButtonText="Cancel"
        isLoading={form.isLoading}
        onSubmit={() => form.submit(handleValidation)}
      >
        <FormRenderer fields={formFields} sections={formSections} />
      </FormModal>
    </div>
  );
}
