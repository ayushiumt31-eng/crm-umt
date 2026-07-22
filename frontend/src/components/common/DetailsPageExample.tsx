/**
 * DetailsPage Component - Usage Examples
 * 
 * This file demonstrates how to use the flexible DetailsPage component
 * with different configurations and use cases.
 */

import { useNavigate } from "react-router-dom";
import DetailsPage, { DetailSection } from "./DetailsPage";
import { 
  User, Mail, Phone, Building2, Calendar, 
  MapPin, Globe, Briefcase, DollarSign 
} from "lucide-react";

// Example 1: Simple Customer Details
export function SimpleCustomerDetails() {
  const navigate = useNavigate();
  
  const sections: DetailSection[] = [
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
          value: "John Doe",
          type: "text",
        },
        {
          icon: Mail,
          iconBgColor: "bg-cyan-100 dark:bg-cyan-900/30",
          iconColor: "text-cyan-600 dark:text-cyan-400",
          label: "Email Address",
          value: "john.doe@example.com",
          type: "email",
        },
        {
          icon: Phone,
          iconBgColor: "bg-green-100 dark:bg-green-900/30",
          iconColor: "text-green-600 dark:text-green-400",
          label: "Phone Number",
          value: "+1 (555) 123-4567",
          type: "phone",
        },
      ],
    },
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
          value: "Acme Corp",
          type: "text",
        },
      ],
    },
  ];

  return (
    <DetailsPage
      title="John Doe"
      subtitle="Customer Details"
      status={{
        label: "Active",
        variant: "success",
        animated: true,
      }}
      onBack={() => navigate("/customers")}
      onEdit={() => navigate("/customers/1/edit")}
      onDelete={async () => {
        console.log("Delete customer");
      }}
      sections={sections}
      gridLayout="3-col"
      deleteConfirmation={{
        title: "Delete Customer?",
        message: "Are you sure you want to delete John Doe? This action cannot be undone.",
        confirmLabel: "Delete",
        cancelLabel: "Cancel",
      }}
    />
  );
}

// Example 2: Employee Details with Custom Actions
export function EmployeeDetailsWithCustomActions() {
  const navigate = useNavigate();
  
  const sections: DetailSection[] = [
    {
      title: "Personal Information",
      icon: User,
      columns: 2,
      fields: [
        {
          icon: User,
          label: "Full Name",
          value: "Jane Smith",
        },
        {
          icon: Mail,
          label: "Email",
          value: "jane.smith@company.com",
          type: "email",
        },
        {
          icon: Phone,
          label: "Phone",
          value: "+1 (555) 987-6543",
          type: "phone",
        },
        {
          icon: MapPin,
          iconBgColor: "bg-red-100 dark:bg-red-900/30",
          iconColor: "text-red-600 dark:text-red-400",
          label: "Location",
          value: "New York, USA",
        },
      ],
    },
    {
      title: "Employment Details",
      icon: Briefcase,
      fields: [
        {
          icon: Briefcase,
          label: "Position",
          value: "Senior Developer",
        },
        {
          icon: DollarSign,
          iconBgColor: "bg-green-100 dark:bg-green-900/30",
          iconColor: "text-green-600 dark:text-green-400",
          label: "Salary",
          value: "$120,000/year",
        },
        {
          icon: Calendar,
          iconBgColor: "bg-orange-100 dark:bg-orange-900/30",
          iconColor: "text-orange-600 dark:text-orange-400",
          label: "Joined Date",
          value: "January 15, 2022",
        },
      ],
    },
  ];

  return (
    <DetailsPage
      title="Jane Smith"
      subtitle="Employee Profile"
      status={{
        label: "Full-Time",
        variant: "info",
      }}
      headerGradient="from-purple-600 via-pink-500 to-purple-600 dark:from-purple-900 dark:via-pink-900 dark:to-purple-900"
      onBack={() => navigate("/employees")}
      onEdit={() => navigate("/employees/1/edit")}
      sections={sections}
      gridLayout="2-col"
      customActions={[
        {
          label: "Send Message",
          icon: Mail,
          onClick: () => console.log("Send message"),
          variant: "primary",
        },
        {
          label: "View Reports",
          icon: Globe,
          onClick: () => console.log("View reports"),
          variant: "ghost",
        },
      ]}
    />
  );
}

// Example 3: Product Details (No Delete Button)
export function ProductDetails() {
  const navigate = useNavigate();
  
  const sections: DetailSection[] = [
    {
      title: "Product Information",
      icon: Briefcase,
      columns: 2,
      fields: [
        {
          label: "Product Name",
          value: "Premium Widget",
        },
        {
          label: "SKU",
          value: "PRD-001",
        },
        {
          label: "Price",
          value: "$299.99",
        },
        {
          label: "Stock",
          value: "150 units",
        },
      ],
    },
  ];

  return (
    <DetailsPage
      title="Premium Widget"
      subtitle="Product Details"
      status={{
        label: "In Stock",
        variant: "success",
      }}
      onBack={() => navigate("/products")}
      onEdit={() => navigate("/products/1/edit")}
      // No onDelete - delete button won't show
      sections={sections}
      gridLayout="1-col"
      showBackButton={false}
      footerContent={
        <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
          Add to Cart
        </button>
      }
    />
  );
}

// Example 4: Custom Layout
export function CustomLayoutExample() {
  const navigate = useNavigate();

  return (
    <DetailsPage
      title="Custom Layout"
      subtitle="Advanced Example"
      onBack={() => navigate(-1)}
      sections={[]} // Empty sections when using custom layout
      customLayout={
        <div className="space-y-6">
          <div className="bg-white dark:bg-slate-900 rounded-2xl border p-6">
            <h2 className="text-xl font-bold mb-4">Custom Content</h2>
            <p>You can pass any custom React components here!</p>
          </div>
        </div>
      }
    />
  );
}
