/**
 * DataForm Component - Usage Examples
 * 
 * Yeh file dikhati hai ki improved DataForm component ko kaise use karein
 */

import { useNavigate } from "react-router-dom";
import { DataForm, type FormField } from "./DataForm";

// Example 1: Simple Customer Form with 2-Column Layout
export function SimpleCustomerFormExample() {
  const fields: FormField[] = [
    {
      name: "name",
      label: "Full Name",
      type: "text",
      placeholder: "Enter full name",
      required: true,
    },
    {
      name: "email",
      label: "Email Address",
      type: "email",
      placeholder: "example@company.com",
      required: true,
      validation: (value) => {
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
          return "Please enter a valid email";
        }
        return null;
      },
    },
    {
      name: "phone",
      label: "Phone Number",
      type: "phone",
      placeholder: "+1 (555) 123-4567",
      required: true,
    },
    {
      name: "company",
      label: "Company",
      type: "text",
      placeholder: "Company name",
      required: true,
    },
    {
      name: "status",
      label: "Status",
      type: "select",
      required: true,
      options: [
        { label: "Active", value: "Active" },
        { label: "Inactive", value: "Inactive" },
      ],
    },
    {
      name: "industry",
      label: "Industry",
      type: "select",
      options: [
        { label: "Technology", value: "Technology" },
        { label: "Healthcare", value: "Healthcare" },
        { label: "Finance", value: "Finance" },
        { label: "Retail", value: "Retail" },
      ],
    },
    // Textarea - automatically spans full width
    {
      name: "address",
      label: "Address",
      type: "textarea",
      placeholder: "Enter full address",
    },
    // Another textarea - full width
    {
      name: "notes",
      label: "Notes",
      type: "textarea",
      placeholder: "Additional notes...",
    },
  ];

  const handleSubmit = async (data: Record<string, any>) => {
    console.log("Form submitted:", data);
    // API call here
    await new Promise((resolve) => setTimeout(resolve, 1000));
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <DataForm
        fields={fields}
        onSubmit={handleSubmit}
        submitLabel="Add Customer"
        title="Add New Customer"
        description="Fill in the customer details below"
        onCancel={() => console.log("Cancelled")}
      />
    </div>
  );
}

// Example 2: Employee Form with Full Width Fields
export function EmployeeFormExample() {
  const fields: FormField[] = [
    {
      name: "firstName",
      label: "First Name",
      type: "text",
      required: true,
    },
    {
      name: "lastName",
      label: "Last Name",
      type: "text",
      required: true,
    },
    {
      name: "email",
      label: "Work Email",
      type: "email",
      required: true,
    },
    {
      name: "phone",
      label: "Phone",
      type: "phone",
    },
    {
      name: "department",
      label: "Department",
      type: "select",
      required: true,
      options: [
        { label: "Engineering", value: "Engineering" },
        { label: "Sales", value: "Sales" },
        { label: "Marketing", value: "Marketing" },
        { label: "HR", value: "HR" },
      ],
    },
    {
      name: "position",
      label: "Position",
      type: "text",
      required: true,
    },
    {
      name: "salary",
      label: "Salary",
      type: "number",
      placeholder: "50000",
    },
    {
      name: "startDate",
      label: "Start Date",
      type: "text",
      placeholder: "YYYY-MM-DD",
    },
    // Full width bio field using fullWidth prop
    {
      name: "bio",
      label: "Biography",
      type: "textarea",
      fullWidth: true, // Explicitly set full width
    },
  ];

  const handleSubmit = async (data: Record<string, any>) => {
    console.log("Employee added:", data);
  };

  return (
    <DataForm
      fields={fields}
      onSubmit={handleSubmit}
      submitLabel="Add Employee"
    />
  );
}

// Example 3: Product Form with Custom Column Span
export function ProductFormExample() {
  const fields: FormField[] = [
    {
      name: "productName",
      label: "Product Name",
      type: "text",
      required: true,
      colSpan: 2, // Explicitly span 2 columns
    },
    {
      name: "sku",
      label: "SKU",
      type: "text",
      required: true,
    },
    {
      name: "price",
      label: "Price",
      type: "number",
      required: true,
      placeholder: "299.99",
    },
    {
      name: "category",
      label: "Category",
      type: "select",
      required: true,
      options: [
        { label: "Electronics", value: "Electronics" },
        { label: "Clothing", value: "Clothing" },
        { label: "Food", value: "Food" },
      ],
    },
    {
      name: "stock",
      label: "Stock Quantity",
      type: "number",
      required: true,
    },
    {
      name: "description",
      label: "Description",
      type: "textarea",
      placeholder: "Product description...",
    },
  ];

  return (
    <DataForm
      fields={fields}
      onSubmit={async (data) => console.log(data)}
      submitLabel="Add Product"
      onCancel={() => console.log("Cancelled")}
    />
  );
}

// Example 4: Using with Form Wrapper Component
export function CustomerFormWithWrapper() {
  const navigate = useNavigate();

  const fields: FormField[] = [
    {
      name: "name",
      label: "Customer Name",
      type: "text",
      required: true,
    },
    {
      name: "email",
      label: "Email",
      type: "email",
      required: true,
    },
    {
      name: "phone",
      label: "Phone",
      type: "phone",
    },
    {
      name: "company",
      label: "Company",
      type: "text",
    },
  ];

  const handleSubmit = async (data: Record<string, any>) => {
    console.log("Submitting:", data);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    navigate("/customers");
  };

  // You can also use the Form wrapper:
  // import { Form } from "./Form";
  // 
  // <Form
  //   title="Add Customer"
  //   description="Create a new customer record"
  //   fields={fields}
  //   onSubmit={handleSubmit}
  //   submitLabel="Add Customer"
  //   cancelPath="/customers"
  // />

  return (
    <DataForm
      fields={fields}
      onSubmit={handleSubmit}
      submitLabel="Save Customer"
      title="Add New Customer"
      onCancel={() => navigate("/customers")}
    />
  );
}

/**
 * KEY FEATURES:
 * 
 * ✅ 2-Column Responsive Grid
 *    - Desktop/Tablet: 2 columns
 *    - Mobile: 1 column (automatic)
 * 
 * ✅ Full Width Fields
 *    - textarea automatically full width
 *    - fullWidth prop for any field
 *    - colSpan: 2 for explicit control
 * 
 * ✅ Better Button Layout
 *    - Cancel + Submit on right side
 *    - Auto-width buttons (not full width)
 *    - Mobile responsive
 * 
 * ✅ Field Types
 *    - text, email, phone, number
 *    - select (dropdown)
 *    - textarea (full width)
 * 
 * ✅ Validation
 *    - Required fields (*)
 *    - Custom validation function
 *    - Error messages
 * 
 * ✅ Loading States
 *    - Submitting state
 *    - Disabled buttons
 */
