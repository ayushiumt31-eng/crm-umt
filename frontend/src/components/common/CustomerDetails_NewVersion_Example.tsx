/**
 * Example: How to refactor CustomerDetails.tsx to use the new DetailsPage component
 * 
 * This shows how much cleaner and more maintainable your code becomes!
 */

import { useParams, useNavigate } from "react-router-dom";
import DetailsPage, { DetailSection } from "./DetailsPage";
import { User, Mail, Phone, Building2, Calendar, Briefcase } from "lucide-react";
import { dummyCustomers } from "@/features/customers/data/dummy-customers";

export default function CustomerDetailsRefactored() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  // Find customer
  const customer = dummyCustomers.find((c) => c.id === id);

  // Handle customer not found
  if (!customer) {
    return (
      <DetailsPage
        title="Customer Not Found"
        subtitle="Error"
        onBack={() => navigate("/customers")}
        sections={[]}
        customLayout={
          <div className="rounded-2xl border-2 border-dashed border-slate-300 dark:border-slate-600 bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900/50 dark:to-slate-800/50 p-12 text-center">
            <p className="text-lg font-bold text-slate-900 dark:text-white mb-4">Customer Not Found</p>
          </div>
        }
      />
    );
  }

  // Define sections - much cleaner than inline JSX!
  const sections: DetailSection[] = [
    // Contact Information Section (spans 2 columns)
    {
      title: "Contact Information",
      icon: User,
      iconColor: "text-blue-600 dark:text-blue-400",
      headerGradient: "bg-gradient-to-r from-blue-50 to-cyan-50 dark:from-blue-950/20 dark:to-cyan-950/20",
      columns: 2,
      fields: [
        {
          icon: User,
          iconBgColor: "bg-blue-100 dark:bg-blue-900/30",
          iconColor: "text-blue-600 dark:text-blue-400",
          label: "Full Name",
          value: customer.name,
        },
        {
          icon: Mail,
          iconBgColor: "bg-cyan-100 dark:bg-cyan-900/30",
          iconColor: "text-cyan-600 dark:text-cyan-400",
          label: "Email Address",
          value: customer.email,
          type: "email",
        },
        {
          icon: Phone,
          iconBgColor: "bg-green-100 dark:bg-green-900/30",
          iconColor: "text-green-600 dark:text-green-400",
          label: "Phone Number",
          value: customer.phone,
          type: "phone",
        },
      ],
    },
    
    // Company Details Section
    {
      title: "Company Details",
      icon: Briefcase,
      iconColor: "text-purple-600 dark:text-purple-400",
      headerGradient: "bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-950/20 dark:to-pink-950/20",
      fields: [
        {
          icon: Building2,
          iconBgColor: "bg-purple-100 dark:bg-purple-900/30",
          iconColor: "text-purple-600 dark:text-purple-400",
          label: "Company",
          value: customer.company,
        },
        {
          icon: Briefcase,
          iconBgColor: "bg-purple-100 dark:bg-purple-900/30",
          iconColor: "text-purple-600 dark:text-purple-400",
          label: "Status",
          value: (
            <span
              className={`inline-flex items-center rounded-full px-3 py-1.5 text-sm font-bold ${
                customer.status === "Active"
                  ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300"
                  : "bg-slate-100 text-slate-700 dark:bg-slate-900/30 dark:text-slate-400"
              }`}
            >
              {customer.status}
            </span>
          ),
          type: "custom",
        },
      ],
    },
    
    // Membership Section
    {
      title: "Membership",
      icon: Calendar,
      iconColor: "text-orange-600 dark:text-orange-400",
      headerGradient: "bg-gradient-to-r from-orange-50 to-amber-50 dark:from-orange-950/20 dark:to-amber-950/20",
      fields: [
        {
          icon: Calendar,
          iconBgColor: "bg-orange-100 dark:bg-orange-900/30",
          iconColor: "text-orange-600 dark:text-orange-400",
          label: "Member Since",
          value: new Date(customer.createdAt).toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
          }),
        },
      ],
    },
  ];

  // Handle delete
  const handleDelete = async () => {
    const index = dummyCustomers.findIndex((c) => c.id === id);
    if (index !== -1) {
      dummyCustomers.splice(index, 1);
      setTimeout(() => navigate("/customers"), 500);
    }
  };

  // Look how clean this is! 🎉
  return (
    <DetailsPage
      title={customer.name}
      subtitle="Customer Details"
      status={{
        label: customer.status,
        variant: customer.status === "Active" ? "success" : "default",
        animated: customer.status === "Active",
      }}
      onBack={() => navigate("/customers")}
      onEdit={() => navigate(`/customers/${id}/edit`)}
      onDelete={handleDelete}
      sections={sections}
      gridLayout="3-col"
      deleteConfirmation={{
        title: "Delete Customer?",
        message: `Are you sure you want to delete ${customer.name}? This action cannot be undone.`,
        confirmLabel: "Delete",
        cancelLabel: "Cancel",
      }}
    />
  );
}

/**
 * COMPARISON:
 * 
 * OLD CODE: 200+ lines of JSX with repeated patterns
 * NEW CODE: ~130 lines, much more maintainable
 * 
 * BENEFITS:
 * ✅ Cleaner code - sections defined as data
 * ✅ Reusable - same pattern for all entities
 * ✅ Consistent UI - no need to replicate design
 * ✅ Easy to modify - change one prop, not 50 lines
 * ✅ Type-safe - full TypeScript support
 * ✅ Less bugs - tested component
 */
