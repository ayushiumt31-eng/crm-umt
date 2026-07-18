import { useState } from "react";
import { Button } from "@/components/ui/button";
import { FormModal } from "./FormModal";
import { FormRenderer } from "./FormRenderer";
import { useFormModal } from "@/hooks";
import { Plus, User, Building2, CheckCircle2 } from "lucide-react";

/**
 * EXAMPLE: How to use FormModal + FormRenderer + useFormModal
 * 
 * This shows 3 patterns:
 * 1. Modal variant - Opens as overlay modal
 * 2. Card variant - Displays as embedded card
 * 3. Drawer variant - Slides in from right side
 */

export function FormModalExample() {
  const modal = useFormModal({
    onSubmit: async (data) => {
      console.log("Submitted:", data);
      // API call here
      await new Promise((resolve) => setTimeout(resolve, 500));
    },
  });

  const [variant, setVariant] = useState<"modal" | "card" | "drawer">("modal");

  const formSections = [
    {
      title: "Contact Information",
      description: "Enter customer's personal details",
      icon: <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-blue-500 to-cyan-500 text-white"><User className="h-6 w-6" /></div>,
      fields: ["name", "email", "phone"],
    },
    {
      title: "Company Information",
      description: "Business details",
      icon: <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 text-white"><Building2 className="h-6 w-6" /></div>,
      fields: ["company"],
    },
    {
      title: "Status & Notes",
      description: "Additional information",
      icon: <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-emerald-500 to-teal-500 text-white"><CheckCircle2 className="h-6 w-6" /></div>,
      fields: ["status", "notes"],
    },
  ];

  const formFields = [
    {
      id: "name",
      label: "Full Name",
      type: "text" as const,
      placeholder: "Enter customer's full name",
      required: true,
      value: modal.formData.name || "",
      onChange: (val: string) => modal.updateField("name", val),
      error: modal.errors.name,
    },
    {
      id: "email",
      label: "Email Address",
      type: "email" as const,
      placeholder: "customer@example.com",
      required: true,
      value: modal.formData.email || "",
      onChange: (val: string) => modal.updateField("email", val),
      error: modal.errors.email,
    },
    {
      id: "phone",
      label: "Phone Number",
      type: "tel" as const,
      placeholder: "+1 (555) 000-0000",
      required: true,
      helper: "Include country code for international numbers",
      value: modal.formData.phone || "",
      onChange: (val: string) => modal.updateField("phone", val),
      error: modal.errors.phone,
    },
    {
      id: "company",
      label: "Company Name",
      type: "text" as const,
      placeholder: "Enter company name",
      required: true,
      value: modal.formData.company || "",
      onChange: (val: string) => modal.updateField("company", val),
      error: modal.errors.company,
    },
    {
      id: "status",
      label: "Customer Status",
      type: "select" as const,
      options: [
        { value: "Active", label: "🟢 Active" },
        { value: "Inactive", label: "⭕ Inactive" },
      ],
      value: modal.formData.status || "",
      onChange: (val: string) => modal.updateField("status", val),
    },
    {
      id: "notes",
      label: "Additional Notes",
      type: "textarea" as const,
      placeholder: "Add any additional information...",
      value: modal.formData.notes || "",
      onChange: (val: string) => modal.updateField("notes", val),
    },
  ];

  return (
    <div className="space-y-8 p-8">
      <div>
        <h1 className="text-4xl font-bold mb-2">Form Modal System</h1>
        <p className="text-slate-600 dark:text-slate-400">3 Variants: Modal, Card, Drawer</p>
      </div>

      {/* Variant Selector */}
      <div className="flex gap-4">
        <Button
          variant={variant === "modal" ? "default" : "outline"}
          onClick={() => setVariant("modal")}
        >
          Modal
        </Button>
        <Button
          variant={variant === "card" ? "default" : "outline"}
          onClick={() => setVariant("card")}
        >
          Card
        </Button>
        <Button
          variant={variant === "drawer" ? "default" : "outline"}
          onClick={() => setVariant("drawer")}
        >
          Drawer
        </Button>
      </div>

      {/* Open Button */}
      <Button
        onClick={() => modal.open()}
        className="gap-2 bg-gradient-to-r from-blue-600 to-cyan-600"
      >
        <Plus className="h-4 w-4" />
        Open {variant.charAt(0).toUpperCase() + variant.slice(1)}
      </Button>

      {/* Modal/Card/Drawer */}
      <FormModal
        isOpen={modal.isOpen}
        onClose={modal.close}
        title="Add Customer"
        description="Create a new customer profile"
        icon={<div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-blue-500 to-cyan-500 text-white"><Plus className="h-5 w-5" /></div>}
        variant={variant}
        size="md"
        submitButtonText="Add Customer"
        cancelButtonText="Cancel"
        isLoading={modal.isLoading}
        onSubmit={() => modal.submit()}
      >
        <FormRenderer fields={formFields} sections={formSections} />
      </FormModal>

      {/* Card Variant (always visible) */}
      {variant === "card" && !modal.isOpen && (
        <Button onClick={() => modal.open()} className="gap-2">
          <Plus className="h-4 w-4" />
          Show Card Form
        </Button>
      )}
    </div>
  );
}
