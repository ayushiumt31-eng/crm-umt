import type { FormField } from "@/components/common/DataForm";

/**
 * Lead Form Fields - Organized by Categories
 * Based on Lead type with proper status, priority, and source fields
 */

// 👤 Basic Information Fields
export const basicInformationFields: FormField[] = [
  {
    name: "firstName",
    label: "First Name",
    type: "text",
    placeholder: "Enter first name",
    required: true,
  },
  {
    name: "lastName",
    label: "Last Name",
    type: "text",
    placeholder: "Enter last name",
    required: true,
  },
  {
    name: "email",
    label: "Email Address",
    type: "email",
    placeholder: "lead@example.com",
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
    name: "jobTitle",
    label: "Job Title / Designation",
    type: "text",
    placeholder: "e.g., CEO, Manager, Director",
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
];

// 📍 Address Information Fields
export const addressInformationFields: FormField[] = [
  {
    name: "address",
    label: "Street Address",
    type: "textarea",
    placeholder: "Enter full street address",
    fullWidth: true,
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

// 💼 Lead Management Fields
export const leadManagementFields: FormField[] = [
  {
    name: "status",
    label: "Lead Status",
    type: "select",
    required: true,
    options: [
      { label: "New", value: "NEW" },
      { label: "Contacted", value: "CONTACTED" },
      { label: "Qualified", value: "QUALIFIED" },
      { label: "Proposal", value: "PROPOSAL" },
      { label: "Negotiation", value: "NEGOTIATION" },
      { label: "Converted", value: "CONVERTED" },
      { label: "Lost", value: "LOST" },
    ],
  },
  {
    name: "source",
    label: "Lead Source",
    type: "select",
    required: true,
    options: [
      { label: "Website", value: "WEBSITE" },
      { label: "Referral", value: "REFERRAL" },
      { label: "Social Media", value: "SOCIAL_MEDIA" },
      { label: "Advertisement", value: "ADVERTISEMENT" },
      { label: "Email", value: "EMAIL" },
      { label: "Phone", value: "PHONE" },
      { label: "WhatsApp", value: "WHATSAPP" },
      { label: "Other", value: "OTHER" },
    ],
  },
  {
    name: "priority",
    label: "Priority Level",
    type: "select",
    required: true,
    options: [
      { label: "Low", value: "LOW" },
      { label: "Medium", value: "MEDIUM" },
      { label: "High", value: "HIGH" },
      { label: "Urgent", value: "URGENT" },
    ],
  },
  {
    name: "assignedTo",
    label: "Assigned Sales Rep",
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
];

// 💰 Sales Information Fields
export const salesInformationFields: FormField[] = [
  {
    name: "estimatedValue",
    label: "Estimated Deal Value ($)",
    type: "number",
    placeholder: "e.g., 50000",
  },
  {
    name: "expectedCloseDate",
    label: "Expected Close Date",
    type: "text",
    placeholder: "YYYY-MM-DD",
  },
];

// 📝 Additional Information Fields
export const additionalInformationFields: FormField[] = [
  {
    name: "notes",
    label: "Notes / Remarks",
    type: "textarea",
    placeholder: "Add any additional notes about this lead...",
    fullWidth: true,
  },
  {
    name: "tags",
    label: "Tags",
    type: "text",
    placeholder: "e.g., hot-lead, decision-maker, budget-approved (comma separated)",
    fullWidth: true,
  },
];

// 🎯 Complete Lead Fields (All categories combined)
export const leadFields: FormField[] = [
  ...basicInformationFields,
  ...companyInformationFields,
  ...addressInformationFields,
  ...leadManagementFields,
  ...salesInformationFields,
  ...additionalInformationFields,
];

// 📦 Export individual categories for flexible usage
export const leadFieldCategories = {
  basic: basicInformationFields,
  company: companyInformationFields,
  address: addressInformationFields,
  leadManagement: leadManagementFields,
  sales: salesInformationFields,
  additional: additionalInformationFields,
};

// 🎨 Field Category Labels
export const fieldCategoryLabels = {
  basic: "👤 Basic Information",
  company: "🏢 Company Information",
  address: "📍 Address Information",
  leadManagement: "💼 Lead Management",
  sales: "💰 Sales Information",
  additional: "📝 Additional Information",
};
