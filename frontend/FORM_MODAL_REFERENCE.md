# FormModal System - Quick Reference Guide

## Overview
A flexible, reusable form system built with FormModal, FormRenderer, and useFormModal hook. Supports 3 display variants: modal, card, and drawer.

## Quick Start

### 1. Import the Components
```typescript
import { FormModal, FormRenderer } from "@/components/common";
import { useFormModal } from "@/hooks";
```

### 2. Create Form Hook
```typescript
const form = useFormModal({
  onSubmit: async (data) => {
    console.log("Form submitted:", data);
    // API call here
    await createCustomer(data);
  },
});
```

### 3. Define Form Fields
```typescript
const formFields = [
  {
    id: "name",
    label: "Full Name",
    type: "text",
    placeholder: "Enter your name",
    required: true,
    value: form.formData.name || "",
    onChange: (val: string) => form.updateField("name", val),
    error: form.errors.name,
  },
  {
    id: "email",
    label: "Email",
    type: "email",
    placeholder: "your@email.com",
    required: true,
    value: form.formData.email || "",
    onChange: (val: string) => form.updateField("email", val),
    error: form.errors.email,
  },
  {
    id: "status",
    label: "Status",
    type: "select",
    options: [
      { value: "Active", label: "🟢 Active" },
      { value: "Inactive", label: "⭕ Inactive" },
    ],
    value: form.formData.status || "",
    onChange: (val: string) => form.updateField("status", val),
  },
];
```

### 4. Define Form Sections (Optional)
```typescript
const formSections = [
  {
    title: "Contact Information",
    description: "Enter your personal details",
    icon: <UserIcon className="h-6 w-6" />,
    fields: ["name", "email"], // Field IDs to group
  },
  {
    title: "Status",
    description: "Choose your status",
    icon: <CheckCircleIcon className="h-6 w-6" />,
    fields: ["status"],
  },
];
```

### 5. Render the Form
```typescript
const handleValidation = (data: Record<string, string>) => {
  const errors: Record<string, string> = {};
  if (!data.name?.trim()) errors.name = "Name is required";
  if (!data.email?.includes("@")) errors.email = "Valid email required";
  return errors;
};

return (
  <>
    <button onClick={() => form.open()}>Open Form</button>

    <FormModal
      isOpen={form.isOpen}
      onClose={form.close}
      title="Add Customer"
      description="Create a new customer profile"
      icon={<PlusIcon className="h-5 w-5" />}
      variant="modal" // "modal" | "card" | "drawer"
      size="md" // "sm" | "md" | "lg"
      submitButtonText="Add"
      cancelButtonText="Cancel"
      isLoading={form.isLoading}
      onSubmit={() => form.submit(handleValidation)}
    >
      <FormRenderer fields={formFields} sections={formSections} />
    </FormModal>
  </>
);
```

## API Reference

### useFormModal Hook

```typescript
const form = useFormModal({
  onSubmit?: (data: Record<string, string>) => Promise<void>;
  initialData?: Record<string, string>;
});
```

#### Properties
- `isOpen: boolean` - Form modal visibility state
- `isLoading: boolean` - Loading state during submission
- `formData: Record<string, string>` - Current form values
- `errors: Record<string, string>` - Validation errors

#### Methods
```typescript
form.open()                           // Open the modal
form.close()                          // Close the modal
form.updateField(id, value)           // Update a field value
form.submit(validationFn)             // Submit form with validation
form.reset()                          // Clear all fields
form.setError(id, message)            // Set field error manually
```

### FormModal Component

```typescript
<FormModal
  isOpen={boolean}                    // Required: Modal visibility
  onClose={() => void}                // Required: Close handler
  title={string}                      // Required: Modal title
  description={string}                // Optional: Subtitle
  children={ReactNode}                // Required: Form content
  submitButtonText={string}           // Optional: Submit button label (default: "Submit")
  cancelButtonText={string}           // Optional: Cancel button label (default: "Cancel")
  onSubmit={() => void}               // Optional: Submit handler
  isLoading={boolean}                 // Optional: Loading state (default: false)
  size="sm|md|lg"                     // Optional: Modal width (default: "md")
  icon={ReactNode}                    // Optional: Header icon
  variant="modal|card|drawer"         // Optional: Display variant (default: "modal")
/>
```

#### Variants

**Modal** (Default)
- Overlay popup with darkened background
- Centered on screen
- Max height 90vh with scrollable content
- Good for: Important forms, wizards, confirmations

**Card**
- Embedded card in page
- No overlay
- Full width, scrollable content
- Good for: Settings pages, inline forms

**Drawer**
- Slides in from right side
- Half-height panel
- Good for: Side panels, quick edits, mobile

### FormRenderer Component

```typescript
<FormRenderer
  fields={FormField[]}         // Required: Form field definitions
  sections={FormSection[]}     // Optional: Group fields in sections
  children={ReactNode}         // Optional: Additional content
/>
```

#### FormField Interface
```typescript
interface FormField {
  id: string;                              // Unique field identifier
  label: string;                           // Display label
  type: "text" | "email" | "tel" | "textarea" | "select";
  placeholder?: string;                    // Input placeholder
  required?: boolean;                      // Mark as required
  options?: Array<{                        // For select type
    value: string;
    label: string;
  }>;
  helper?: string;                         // Helper text (when no error)
  error?: string;                          // Error message
  value?: string;                          // Current value
  onChange?: (value: string) => void;      // Change handler
}
```

#### FormSection Interface
```typescript
interface FormSection {
  title: string;                           // Section title
  description?: string;                    // Section description
  icon?: ReactNode;                        // Section icon
  fields: string[];                        // Field IDs in this section
}
```

## Common Patterns

### Pattern 1: Auto-Opening Form on Page Load
```typescript
export default function AddCustomer() {
  const form = useFormModal({ onSubmit: async (data) => { /* ... */ } });
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    if (!isInitialized) {
      form.open();
      setIsInitialized(true);
    }
  }, []);

  return <FormModal {...props} />;
}
```

### Pattern 2: Pre-Filling Form for Edit
```typescript
export default function EditCustomer() {
  const { id } = useParams();
  const customer = customers.find(c => c.id === id);
  
  const form = useFormModal({
    initialData: customer,
    onSubmit: async (data) => { /* update */ },
  });

  useEffect(() => {
    if (customer && !form.isOpen) {
      form.open();
    }
  }, [customer]);

  return <FormModal {...props} />;
}
```

### Pattern 3: Dynamic Field Options
```typescript
const form = useFormModal({ /* ... */ });

const formFields = [
  {
    id: "department",
    label: "Department",
    type: "select",
    options: departments.map(d => ({
      value: d.id,
      label: d.name,
    })),
    value: form.formData.department || "",
    onChange: (val: string) => form.updateField("department", val),
  },
];
```

### Pattern 4: Conditional Fields
```typescript
const formFields = [
  {
    id: "employmentType",
    label: "Employment Type",
    type: "select",
    options: [
      { value: "Full-time", label: "Full-time" },
      { value: "Part-time", label: "Part-time" },
      { value: "Contract", label: "Contract" },
    ],
    value: form.formData.employmentType || "",
    onChange: (val: string) => form.updateField("employmentType", val),
  },
];

// Show additional fields if part-time is selected
if (form.formData.employmentType === "Part-time") {
  formFields.push({
    id: "hoursPerWeek",
    label: "Hours Per Week",
    type: "text",
    value: form.formData.hoursPerWeek || "",
    onChange: (val: string) => form.updateField("hoursPerWeek", val),
  });
}
```

### Pattern 5: Async Validation
```typescript
const handleValidation = async (data: Record<string, string>) => {
  const errors: Record<string, string> = {};

  // Check if email already exists
  if (data.email) {
    const exists = await checkEmailExists(data.email);
    if (exists) errors.email = "Email already registered";
  }

  return errors;
};

form.submit(handleValidation);
```

## Styling & Customization

### Colors (Tailwind CSS)
- Blue: #3b82f6
- Cyan: #06b6d4
- Green: #10b981
- Red: #ef4444

### Gradients
- Primary: `from-blue-600 to-cyan-600`
- Success: `from-green-600 to-emerald-600`
- Danger: `from-red-600 to-rose-600`

### Dark Mode
All components support dark mode with `dark:` prefix classes

```typescript
<div className="bg-white dark:bg-slate-900 text-slate-900 dark:text-white">
  {/* Content */}
</div>
```

## Examples

### Example 1: Simple Customer Form
See `src/components/common/FormModalExample.tsx`

### Example 2: Add Customer Page
See `src/pages/customers/AddCustomer.tsx`

### Example 3: Edit Customer Page
See `src/pages/customers/EditCustomer.tsx`

## Best Practices

1. **Always provide validation function**
   ```typescript
   form.submit(handleValidation)  // Good
   form.submit()                  // Missing validation
   ```

2. **Use type-safe field updates**
   ```typescript
   form.updateField("name", value as string)  // Good
   form.updateField("name", value)            // May cause type issues
   ```

3. **Group related fields in sections**
   - Makes form more scannable
   - Better UX
   - More maintainable

4. **Provide helpful text**
   ```typescript
   helper: "Include country code for international numbers"
   ```

5. **Use appropriate input types**
   ```typescript
   type: "email"  // For email fields (browser validation)
   type: "tel"    // For phone numbers (mobile keyboard)
   ```

6. **Show loading state during submission**
   ```typescript
   isLoading={form.isLoading}  // Disables buttons, shows feedback
   ```

7. **Reset form after successful submission**
   ```typescript
   onSubmit: async (data) => {
     await api.create(data);
     form.reset();
     form.close();
   }
   ```

## Troubleshooting

### Form not opening
- Check `isOpen` state in FormModal
- Ensure `form.open()` is called
- Verify FormModal is rendered

### Validation not working
- Ensure `handleValidation` returns errors object
- Check field `id` matches validation field name
- Verify `error` prop is bound to form state

### Styling issues
- Check Tailwind CSS is imported globally
- Verify dark mode is configured in `tailwind.config.ts`
- Use `!important` only as last resort

### Performance issues
- Avoid recreating `formFields` array on every render
- Use `useMemo` for complex field arrays
- Consider lazy loading for large forms

---

**Version**: 1.0.0  
**Last Updated**: July 18, 2026  
**Maintained By**: CRM Development Team
