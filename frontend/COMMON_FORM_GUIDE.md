# Common Form System - Complete Guide 🎯

## Overview

Ek reusable form system jo 3 variants mein use ho sakta hai:
1. **Modal** - Overlay modal
2. **Card** - Embedded card
3. **Drawer** - Side drawer

Ab customers/employees/payroll ke liye same form structure use kar sakte ho!

---

## Components

### 1. FormModal
Location: `src/components/common/FormModal.tsx`

**Props:**
```tsx
interface FormModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  description?: string;
  children: ReactNode;
  submitButtonText?: string;
  cancelButtonText?: string;
  onSubmit?: () => void;
  isLoading?: boolean;
  size?: "sm" | "md" | "lg";
  icon?: ReactNode;
  variant?: "modal" | "card" | "drawer";
}
```

**Usage:**
```tsx
<FormModal
  isOpen={isOpen}
  onClose={handleClose}
  title="Add Customer"
  description="Create a new customer"
  variant="modal"
  size="md"
  submitButtonText="Add"
  onSubmit={handleSubmit}
>
  {/* Form content here */}
</FormModal>
```

### 2. FormRenderer
Location: `src/components/common/FormRenderer.tsx`

Automatically renders form fields with beautiful styling.

**Usage:**
```tsx
const formFields = [
  {
    id: "name",
    label: "Full Name",
    type: "text",
    placeholder: "Enter name",
    required: true,
    value: formData.name,
    onChange: (val) => updateField("name", val),
    error: errors.name,
  },
  // More fields...
];

const sections = [
  {
    title: "Contact Info",
    description: "Personal details",
    icon: <UserIcon />,
    fields: ["name", "email", "phone"],
  },
];

<FormRenderer fields={formFields} sections={sections} />
```

### 3. useFormModal Hook
Location: `src/hooks/useFormModal.ts`

Manages form state, validation, and submission.

**Usage:**
```tsx
const form = useFormModal({
  onSubmit: async (data) => {
    await api.post("/customers", data);
  },
});

// Methods:
form.open()                           // Open modal
form.close()                          // Close modal
form.updateField("name", "John")      // Update field
form.setFieldError("name", "Error")   // Set error
form.submit(validateFn)               // Submit with validation
form.reset()                          // Clear form

// State:
form.isOpen
form.isLoading
form.formData
form.errors
```

---

## Complete Example - Add Customer Modal

```tsx
import { useFormModal } from "@/hooks";
import { FormModal, FormRenderer } from "@/components/common";
import { Plus, User, Mail, Phone } from "lucide-react";

export function AddCustomerModal() {
  const form = useFormModal({
    onSubmit: async (data) => {
      // Add to API
      const response = await fetch("/api/customers", {
        method: "POST",
        body: JSON.stringify(data),
      });
      // Modal closes automatically
    },
  });

  const formFields = [
    {
      id: "name",
      label: "Full Name",
      type: "text",
      placeholder: "Enter full name",
      required: true,
      value: form.formData.name || "",
      onChange: (val) => form.updateField("name", val),
      error: form.errors.name,
    },
    {
      id: "email",
      label: "Email",
      type: "email",
      placeholder: "email@example.com",
      required: true,
      value: form.formData.email || "",
      onChange: (val) => form.updateField("email", val),
      error: form.errors.email,
    },
    {
      id: "phone",
      label: "Phone",
      type: "tel",
      placeholder: "+1 (555) 000-0000",
      required: true,
      value: form.formData.phone || "",
      onChange: (val) => form.updateField("phone", val),
      error: form.errors.phone,
    },
  ];

  const sections = [
    {
      title: "Contact Information",
      icon: <User className="h-6 w-6" />,
      fields: ["name", "email", "phone"],
    },
  ];

  const handleValidation = (data) => {
    const errors = {};
    if (!data.name) errors.name = "Name is required";
    if (!data.email) errors.email = "Email is required";
    if (!data.phone) errors.phone = "Phone is required";
    return errors;
  };

  return (
    <>
      {/* Open Button */}
      <button onClick={() => form.open()}>
        <Plus /> Add Customer
      </button>

      {/* Modal */}
      <FormModal
        isOpen={form.isOpen}
        onClose={form.close}
        title="Add Customer"
        description="Create a new customer profile"
        variant="modal"
        submitButtonText="Add Customer"
        isLoading={form.isLoading}
        onSubmit={() => form.submit(handleValidation)}
      >
        <FormRenderer fields={formFields} sections={sections} />
      </FormModal>
    </>
  );
}
```

---

## 3 Variants Explained

### 1. Modal Variant
```tsx
<FormModal variant="modal" {...props}>
  {/* Overlay modal that appears centered */}
</FormModal>
```
✅ Best for: Main actions (Add/Edit)
✅ Features: Backdrop, centered, animated

### 2. Card Variant
```tsx
<FormModal variant="card" {...props}>
  {/* Embedded card in page */}
</FormModal>
```
✅ Best for: Embedded forms, inline operations
✅ Features: No overlay, part of page flow

### 3. Drawer Variant
```tsx
<FormModal variant="drawer" {...props}>
  {/* Slides in from right side */}
</FormModal>
```
✅ Best for: Mobile, side operations
✅ Features: Side panel, full height

---

## How to Use in Different Modules

### Customers Module
```tsx
// In Customers page
const addCustomerForm = useFormModal({
  onSubmit: async (data) => {
    const newCustomer = { ...data, id: Date.now() };
    setCustomers([...customers, newCustomer]);
  },
});

// Use modal
<FormModal isOpen={addCustomerForm.isOpen} variant="modal" ... />
```

### Employees Module
```tsx
// Same pattern for employees
const addEmployeeForm = useFormModal({
  onSubmit: async (data) => {
    // Add employee logic
  },
});
```

### Settings
```tsx
// Same pattern for settings
const editSettingsForm = useFormModal({
  onSubmit: async (data) => {
    // Update settings
  },
});
```

---

## Form Field Types

### Supported Types
- `text` - Regular text input
- `email` - Email input
- `tel` - Phone input
- `textarea` - Multi-line text
- `select` - Dropdown selection

### Example Field
```tsx
{
  id: "status",
  label: "Status",
  type: "select",
  options: [
    { value: "Active", label: "Active" },
    { value: "Inactive", label: "Inactive" },
  ],
  required: true,
  value: form.formData.status || "",
  onChange: (val) => form.updateField("status", val),
  error: form.errors.status,
}
```

---

## Validation Pattern

```tsx
const validateForm = (data) => {
  const errors = {};
  
  if (!data.name?.trim()) {
    errors.name = "Name is required";
  }
  
  if (!data.email?.includes("@")) {
    errors.email = "Valid email required";
  }
  
  if (data.phone?.length < 10) {
    errors.phone = "Valid phone required";
  }
  
  return errors;
};

// Use in submit
form.submit(validateForm);
```

---

## Styling

All forms are automatically styled with:
- 🎨 Gradient backgrounds (blue-cyan)
- 📱 Responsive design
- 🌙 Dark mode support
- ✨ Smooth animations
- 🎯 Professional appearance

---

## File Structure

```
src/
├── components/common/
│   ├── FormModal.tsx          # Main modal component
│   ├── FormRenderer.tsx       # Field renderer
│   ├── FormModalExample.tsx   # Example usage
│   └── index.ts               # Exports
│
├── hooks/
│   ├── useFormModal.ts        # Form state hook
│   └── index.ts               # Exports
│
├── pages/
│   ├── customers/
│   │   ├── Customers.tsx      # List page
│   │   ├── AddCustomer.tsx    # Can use FormModal
│   │   └── EditCustomer.tsx   # Can use FormModal
│   ├── employees/             # Same pattern
│   └── payroll/               # Same pattern
```

---

## Next Steps

1. **Replace AddCustomer page** with FormModal variant
2. **Create inline modal** in Customers list for quick add
3. **Use in Employees** module (same pattern)
4. **Extend to other** modules (Payroll, Sales, etc.)
5. **Add API integration** in onSubmit handlers

---

## Tips & Tricks

### 1. Quick Modal in List Page
```tsx
export function CustomersList() {
  const form = useFormModal({ /* ... */ });
  
  return (
    <>
      <Button onClick={() => form.open()}>Add</Button>
      <FormModal isOpen={form.isOpen} variant="modal" ... />
      <Table ... />
    </>
  );
}
```

### 2. Pre-fill Form for Edit
```tsx
const form = useFormModal({ /* ... */ });

const handleEdit = (customer) => {
  form.formData.name = customer.name;
  form.formData.email = customer.email;
  form.open();
};
```

### 3. Multiple Forms on Page
```tsx
const addForm = useFormModal({ /* ... */ });
const editForm = useFormModal({ /* ... */ });
const deleteForm = useFormModal({ /* ... */ });
```

---

## Colors Used

- 🔵 Primary: Blue (#3b82f6)
- 🩵 Secondary: Cyan (#06b6d4)
- 🟢 Success: Green (#10b981)
- 🔴 Destructive: Red (#ef4444)

All automatically responsive and themed!

---

**Ab sab modules ko easily add kar sakte ho same system use karke!** 🚀
