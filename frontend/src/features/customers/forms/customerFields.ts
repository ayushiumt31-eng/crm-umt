import type { FormField } from "@/components/common/DataForm";

/**
 * Customer Form Fields - Organized by Categories
 * Compatible with improved DataForm component with 2-column layout
 */

// 👤 Basic Information Fields
export const basicInformationFields: FormField[] = [
  {
    name: "name",
    label: "Customer Name",
    type: "text",
    placeholder: "Enter full name",
    required: true,
  },
  {
    name: "email",
    label: "Email Address",
    type: "email",
    placeholder: "customer@example.com",
    required: true,
    validation: (value: string) => {
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
        return "Please enter a valid email address";
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
    validation: (value: string) => {
      const digits = value.replace(/\D/g, "");
      if (digits.length < 10) {
        return "Phone number must be at least 10 digits";
      }
      return null;
    },
  },
  {
    name: "alternatePhone",
    label: "Alternate Phone",
    type: "phone",
    placeholder: "+1 (555) 987-6543",
  },
  {
    name: "customerType",
    label: "Customer Type",
    type: "select",
    options: [
      { label: "Individual", value: "Individual" },
      { label: "Business", value: "Business" },
    ],
  },
];

// 🏢 Company Information Fields
export const companyInformationFields: FormField[] = [
  {
    name: "company",
    label: "Company Name",
    type: "text",
    placeholder: "Enter company name",
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
      { label: "Manufacturing", value: "Manufacturing" },
      { label: "Education", value: "Education" },
      { label: "Real Estate", value: "Real Estate" },
      { label: "Hospitality", value: "Hospitality" },
      { label: "Transportation", value: "Transportation" },
      { label: "Construction", value: "Construction" },
      { label: "Other", value: "Other" },
    ],
  },
  {
    name: "jobTitle",
    label: "Job Title / Designation",
    type: "text",
    placeholder: "e.g., CEO, Manager, Director",
  },
];

// 📍 Address Information Fields
export const addressInformationFields: FormField[] = [
  {
    name: "address",
    label: "Street Address",
    type: "textarea",
    placeholder: "Enter full street address",
    fullWidth: true, // Spans full width in 2-column layout
  },
  {
    name: "city",
    label: "City",
    type: "text",
    placeholder: "Enter city",
  },
  {
    name: "state",
    label: "State / Province",
    type: "text",
    placeholder: "Enter state or province",
  },
  {
    name: "country",
    label: "Country",
    type: "select",
    options: [
      { label: "United States", value: "United States" },
      { label: "Canada", value: "Canada" },
      { label: "United Kingdom", value: "United Kingdom" },
      { label: "Australia", value: "Australia" },
      { label: "India", value: "India" },
      { label: "Germany", value: "Germany" },
      { label: "France", value: "France" },
      { label: "Japan", value: "Japan" },
      { label: "China", value: "China" },
      { label: "Other", value: "Other" },
    ],
  },
  {
    name: "postalCode",
    label: "Postal / ZIP Code",
    type: "text",
    placeholder: "Enter postal code",
  },
];

// 💼 CRM Information Fields
export const crmInformationFields: FormField[] = [
  {
    name: "status",
    label: "Customer Status",
    type: "select",
    required: true,
    options: [
      { label: "Active", value: "Active" },
      { label: "Inactive", value: "Inactive" },
      { label: "Pending", value: "Pending" },
    ],
  },
  {
    name: "source",
    label: "Customer Source",
    type: "select",
    options: [
      { label: "Website", value: "Website" },
      { label: "Referral", value: "Referral" },
      { label: "Social Media", value: "Social Media" },
      { label: "Advertisement", value: "Advertisement" },
      { label: "Cold Call", value: "Cold Call" },
      { label: "Trade Show", value: "Trade Show" },
      { label: "Other", value: "Other" },
    ],
  },
  {
    name: "assignedTo",
    label: "Assigned Employee / Sales Rep",
    type: "select",
    options: [
      { label: "Unassigned", value: "" },
      { label: "John Smith", value: "emp-001" },
      { label: "Jane Doe", value: "emp-002" },
      { label: "Mike Johnson", value: "emp-003" },
      { label: "Sarah Williams", value: "emp-004" },
      // TODO: Load dynamically from employees API
    ],
  },
  {
    name: "category",
    label: "Customer Category",
    type: "select",
    options: [
      { label: "VIP", value: "VIP" },
      { label: "Regular", value: "Regular" },
      { label: "Wholesale", value: "Wholesale" },
      { label: "Retail", value: "Retail" },
      { label: "Partner", value: "Partner" },
    ],
  },
  {
    name: "priority",
    label: "Priority Level",
    type: "select",
    options: [
      { label: "Low", value: "Low" },
      { label: "Medium", value: "Medium" },
      { label: "High", value: "High" },
    ],
  },
];

// 📝 Additional Information Fields
export const additionalInformationFields: FormField[] = [
  {
    name: "notes",
    label: "Notes / Remarks",
    type: "textarea",
    placeholder: "Add any additional notes or remarks about the customer...",
    fullWidth: true, // Spans full width
  },
  {
    name: "tags",
    label: "Tags",
    type: "text",
    placeholder: "e.g., premium, loyal, high-value (comma separated)",
    fullWidth: true,
  },
];

// 🎯 Complete Customer Fields (All categories combined)
export const customerFields: FormField[] = [
  ...basicInformationFields,
  ...companyInformationFields,
  ...addressInformationFields,
  ...crmInformationFields,
  ...additionalInformationFields,
];

// 📦 Export individual categories for flexible usage
export const customerFieldCategories = {
  basic: basicInformationFields,
  company: companyInformationFields,
  address: addressInformationFields,
  crm: crmInformationFields,
  additional: additionalInformationFields,
};

// 🎨 Field Category Labels (for UI section headers if needed)
export const fieldCategoryLabels = {
  basic: "👤 Basic Information",
  company: "🏢 Company Information",
  address: "📍 Address Information",
  crm: "💼 CRM Information",
  additional: "📝 Additional Information",
};
