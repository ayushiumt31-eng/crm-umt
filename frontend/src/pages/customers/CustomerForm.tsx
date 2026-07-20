import { useParams, useNavigate } from "react-router-dom";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ArrowLeft, CheckCircle } from "lucide-react";
import { DataForm, type FormField } from "@/components/common/DataForm";
import { dummyCustomers } from "@/data/customers";

export default function CustomerForm() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [showSuccess, setShowSuccess] = useState(false);

  // Find customer if editing
  const customer = id ? dummyCustomers.find((c) => c.id === id) : null;
  const isEditing = !!customer;

  if (id && !customer) {
    return (
      <div className="space-y-6">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => navigate("/customers")}
        >
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <div className="text-center py-12">
          <p className="text-lg font-semibold">Customer Not Found</p>
          <Button
            variant="outline"
            className="mt-4"
            onClick={() => navigate("/customers")}
          >
            Back to Customers
          </Button>
        </div>
      </div>
    );
  }

  const formFields: FormField[] = [
    {
      name: "name",
      label: "Full Name",
      type: "text",
      placeholder: "Enter customer's full name",
      required: true,
    },
    {
      name: "email",
      label: "Email Address",
      type: "email",
      placeholder: "customer@example.com",
      required: true,
      validation: (value) => (value?.includes("@") ? null : "Valid email required"),
    },
    {
      name: "phone",
      label: "Phone Number",
      type: "phone",
      placeholder: "+1 (555) 000-0000",
      required: true,
      validation: (value) => (value?.length >= 10 ? null : "Valid phone required"),
    },
    {
      name: "company",
      label: "Company Name",
      type: "text",
      placeholder: "Enter company name",
      required: true,
    },
    {
      name: "status",
      label: "Customer Status",
      type: "select",
      required: false,
      options: [
        { label: "🟢 Active - Customer is currently active", value: "Active" },
        { label: "⭕ Inactive - Customer is inactive", value: "Inactive" },
      ],
    },
  ];

  const handleSubmit = async (data: Record<string, any>) => {
    if (isEditing && customer) {
      // Update existing
      const updated = dummyCustomers.map((c) =>
        c.id === customer.id
          ? {
              ...c,
              name: data.name,
              email: data.email,
              phone: data.phone,
              company: data.company,
              status: data.status || c.status,
            }
          : c
      );
      dummyCustomers.splice(0, dummyCustomers.length, ...updated);
    } else {
      // Add new
      const newCustomer = {
        id: String(dummyCustomers.length + 1),
        name: data.name,
        email: data.email,
        phone: data.phone,
        company: data.company,
        status: data.status || "Active",
        createdAt: new Date().toISOString(),
      };
      dummyCustomers.push(newCustomer);
    }

    setShowSuccess(true);
    setTimeout(() => {
      navigate("/customers");
    }, 1500);
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
            {isEditing ? "Edit Customer" : "Add New Customer"}
          </h1>
          <p className="text-slate-600 dark:text-slate-400 mt-2 text-lg">
            {isEditing
              ? `Update ${customer?.name}'s information`
              : "Create a new customer profile with all essential information"}
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
            <p className="font-bold text-green-700 dark:text-green-300 text-lg">
              {isEditing ? "Customer Updated" : "Customer Added"} Successfully!
            </p>
            <p className="text-sm text-green-600 dark:text-green-400">Redirecting to customers list...</p>
          </div>
        </div>
      )}

      {/* Form Container */}
      <div className="rounded-2xl border border-slate-200/50 dark:border-slate-800/50 bg-white dark:bg-slate-900 shadow-sm p-8">
        <DataForm
          fields={formFields}
          initialValues={
            customer
              ? {
                  name: customer.name,
                  email: customer.email,
                  phone: customer.phone,
                  company: customer.company,
                  status: customer.status,
                }
              : {}
          }
          onSubmit={handleSubmit}
          submitLabel={isEditing ? "Update Customer" : "Add Customer"}
          title="Customer Information"
          description={
            isEditing
              ? "Update the customer details below"
              : "Fill in the customer details below"
          }
        />
      </div>
    </div>
  );
}
