/**
 * Customer Form Preview & Usage Guide
 * 
 * This file shows how the improved customer form looks and works
 * with all the organized field categories.
 */

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import CustomerForm from "./CustomerForm";
import { 
  customerFields, 
  customerFieldCategories, 
  fieldCategoryLabels 
} from "./customerFields";

/**
 * Example 1: Standard Customer Form (All Fields)
 * Yeh form automatically 2-column layout me render hoga
 */
export function StandardCustomerForm() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (data: Record<string, any>) => {
    setIsLoading(true);
    try {
      console.log("Customer Data:", data);
      
      // API call here
      // await createCustomer(data);
      
      // Success
      setTimeout(() => {
        navigate("/customers");
      }, 1500);
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <CustomerForm
      mode="create"
      onSubmit={handleSubmit}
      isLoading={isLoading}
    />
  );
}

/**
 * Example 2: Edit Customer Form (With Initial Values)
 */
export function EditCustomerForm() {
  const navigate = useNavigate();

  const initialValues = {
    // Basic Information
    name: "John Doe",
    email: "john.doe@example.com",
    phone: "+1 (555) 123-4567",
    alternatePhone: "+1 (555) 987-6543",
    customerType: "Business",
    
    // Company Information
    company: "Acme Corp",
    industry: "Technology",
    jobTitle: "CEO",
    
    // Address Information
    address: "123 Main Street, Suite 100",
    city: "New York",
    state: "NY",
    country: "United States",
    postalCode: "10001",
    
    // CRM Information
    status: "Active",
    source: "Website",
    assignedTo: "emp-001",
    category: "VIP",
    priority: "High",
    
    // Additional Information
    notes: "Important client - handles large orders regularly",
    tags: "premium, loyal, high-value",
  };

  const handleSubmit = async (data: Record<string, any>) => {
    console.log("Updated Customer Data:", data);
    // await updateCustomer(customerId, data);
    navigate("/customers");
  };

  return (
    <CustomerForm
      mode="edit"
      initialValues={initialValues}
      onSubmit={handleSubmit}
    />
  );
}

/**
 * Example 3: Quick Add Form (Only Essential Fields)
 * Agar aapko sirf basic fields chahiye
 */
export function QuickAddCustomerForm() {
  const navigate = useNavigate();
  const { DataForm } = require("@/components/common/DataForm");

  // Use only basic + CRM status fields
  const quickFields = [
    ...customerFieldCategories.basic,
    customerFieldCategories.crm[0], // Only status field
  ];

  const handleSubmit = async (data: Record<string, any>) => {
    console.log("Quick Add:", data);
    navigate("/customers");
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Quick Add Customer</h1>
      <DataForm
        fields={quickFields}
        onSubmit={handleSubmit}
        submitLabel="Add Customer"
        onCancel={() => navigate("/customers")}
      />
    </div>
  );
}

/**
 * Example 4: Category-wise Form with Section Headers
 * Agar aap form ko sections me divide karna chahte ho
 */
export function CategorizedCustomerForm() {
  const navigate = useNavigate();
  const { DataForm } = require("@/components/common/DataForm");

  const handleSubmit = async (data: Record<string, any>) => {
    console.log("Customer Data:", data);
    navigate("/customers");
  };

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-8">
      <div className="flex items-center gap-4">
        <button onClick={() => navigate("/customers")} className="text-2xl">←</button>
        <div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
            Add New Customer
          </h1>
          <p className="text-slate-600 mt-2">Fill in the customer details below</p>
        </div>
      </div>

      {/* Render each category with its own card */}
      <div className="space-y-6">
        {Object.entries(customerFieldCategories).map(([key, fields]) => (
          <div
            key={key}
            className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-8 shadow-sm"
          >
            <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-6">
              {fieldCategoryLabels[key as keyof typeof fieldCategoryLabels]}
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {fields.map((field) => (
                <div
                  key={field.name}
                  className={field.fullWidth ? "md:col-span-2" : ""}
                >
                  {/* Render field here */}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/**
 * FORM LAYOUT PREVIEW
 * 
 * Desktop (2 columns):
 * ┌────────────────────────────────────────────┐
 * │ 👤 Basic Information                       │
 * ├──────────────────────┬─────────────────────┤
 * │ Customer Name*       │ Email Address*      │
 * │ Phone Number*        │ Alternate Phone     │
 * │ Customer Type        │                     │
 * └──────────────────────┴─────────────────────┘
 * 
 * ┌────────────────────────────────────────────┐
 * │ 🏢 Company Information                     │
 * ├──────────────────────┬─────────────────────┤
 * │ Company Name         │ Industry            │
 * │ Job Title            │                     │
 * └──────────────────────┴─────────────────────┘
 * 
 * ┌────────────────────────────────────────────┐
 * │ 📍 Address Information                     │
 * ├────────────────────────────────────────────┤
 * │ Street Address (full width)                │
 * ├──────────────────────┬─────────────────────┤
 * │ City                 │ State               │
 * │ Country              │ Postal Code         │
 * └──────────────────────┴─────────────────────┘
 * 
 * ┌────────────────────────────────────────────┐
 * │ 💼 CRM Information                         │
 * ├──────────────────────┬─────────────────────┤
 * │ Status*              │ Source              │
 * │ Assigned Employee    │ Category            │
 * │ Priority             │                     │
 * └──────────────────────┴─────────────────────┘
 * 
 * ┌────────────────────────────────────────────┐
 * │ 📝 Additional Information                  │
 * ├────────────────────────────────────────────┤
 * │ Notes (full width)                         │
 * │ Tags (full width)                          │
 * └────────────────────────────────────────────┘
 * 
 *                     [ Cancel ] [ Add Customer ]
 * 
 * Mobile (1 column):
 * All fields stack vertically automatically
 */

/**
 * FEATURES:
 * 
 * ✅ 2-Column Responsive Layout
 * ✅ Full-width textarea fields
 * ✅ Proper validation (email, phone)
 * ✅ Required field indicators (*)
 * ✅ Error messages below fields
 * ✅ Buttons on right side (Cancel + Submit)
 * ✅ Loading states
 * ✅ Dark mode support
 * ✅ Mobile responsive
 * 
 * USAGE:
 * 
 * 1. Import CustomerForm component
 * 2. Pass mode="create" or mode="edit"
 * 3. Provide onSubmit callback
 * 4. For edit mode, pass initialValues
 * 
 * That's it! Form automatically handles layout, validation, and submission.
 */

export default StandardCustomerForm;
