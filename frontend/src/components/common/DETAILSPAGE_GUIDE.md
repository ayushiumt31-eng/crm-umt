# DetailsPage Component - Complete Guide

## Overview

`DetailsPage` is a highly flexible and reusable component for displaying detailed information about any entity (customers, employees, products, etc.) in a beautiful, modern UI.

## Features

✨ **Beautiful Gradient Header** with animated background effects  
🎨 **Flexible Layout** - 1, 2, or 3 column grids or fully custom layout  
🔧 **Highly Configurable** - Control every aspect through props  
📱 **Responsive Design** - Looks great on all screen sizes  
🎯 **TypeScript Support** - Full type safety  
🌙 **Dark Mode** - Built-in dark mode support  
💫 **Smooth Animations** - Polished UI transitions  
🔔 **Delete Confirmation** - Optional confirmation dialog  
🎭 **Custom Actions** - Add any number of header actions  
📊 **Multiple Field Types** - Text, email, phone, link, custom  
🎨 **Icon Support** - Lucide icons integrated throughout  

---

## Basic Usage

```tsx
import DetailsPage, { DetailSection } from "@/components/common/DetailsPage";
import { User, Mail, Phone } from "lucide-react";

const sections: DetailSection[] = [
  {
    title: "Contact Information",
    icon: User,
    fields: [
      {
        icon: User,
        label: "Full Name",
        value: "John Doe",
      },
      {
        icon: Mail,
        label: "Email",
        value: "john@example.com",
        type: "email",
      },
    ],
  },
];

<DetailsPage
  title="John Doe"
  onBack={() => navigate("/customers")}
  sections={sections}
/>
```

---

## Props Reference

### Main Props

| Prop | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| `title` | `string` | ✅ | - | Main page title |
| `subtitle` | `string` | ❌ | "Details" | Subtitle shown above title |
| `onBack` | `() => void` | ✅ | - | Back button callback |
| `sections` | `DetailSection[]` | ✅ | - | Content sections to display |
| `gridLayout` | `"1-col" \| "2-col" \| "3-col"` | ❌ | "3-col" | Grid layout |
| `status` | `StatusBadge` | ❌ | - | Status badge in header |
| `headerGradient` | `string` | ❌ | blue/cyan gradient | Tailwind gradient classes |
| `onEdit` | `() => void` | ❌ | - | Edit button callback |
| `onDelete` | `() => void` | ❌ | - | Delete button callback |
| `customActions` | `HeaderAction[]` | ❌ | - | Additional header actions |
| `deleteConfirmation` | `object` | ❌ | - | Delete dialog config |
| `customLayout` | `ReactNode` | ❌ | - | Custom content instead of sections |
| `showBackButton` | `boolean` | ❌ | `true` | Show back button in footer |
| `footerContent` | `ReactNode` | ❌ | - | Custom footer content |

---

## Type Definitions

### DetailSection

```typescript
interface DetailSection {
  title: string;                    // Section title
  icon?: LucideIcon;                // Section icon (e.g., User, Mail)
  iconColor?: string;               // Icon color Tailwind class
  headerGradient?: string;          // Section header gradient
  columns?: 1 | 2;                  // Section column span
  fields: DetailField[];            // Fields in this section
}
```

### DetailField

```typescript
interface DetailField {
  icon?: LucideIcon;                     // Field icon
  iconColor?: string;                    // Icon color class
  iconBgColor?: string;                  // Icon background class
  label: string;                         // Field label
  value: ReactNode;                      // Field value
  type?: "text" | "email" | "phone" | "link" | "custom";
  href?: string;                         // For email/phone/link types
  onClick?: () => void;                  // Optional click handler
}
```

### StatusBadge

```typescript
interface StatusBadge {
  label: string;                         // Badge text
  variant?: "success" | "warning" | "error" | "info" | "default";
  animated?: boolean;                    // Add pulsing dot
}
```

### HeaderAction

```typescript
interface HeaderAction {
  label: string;                         // Button label
  icon?: LucideIcon;                     // Button icon
  onClick: () => void;                   // Click handler
  variant?: "primary" | "danger" | "ghost";
  disabled?: boolean;                    // Disable button
}
```

---

## Field Types

### Text (default)
Simple text display

```tsx
{
  label: "Full Name",
  value: "John Doe",
  type: "text",  // or omit
}
```

### Email
Clickable mailto link

```tsx
{
  label: "Email",
  value: "john@example.com",
  type: "email",
}
```

### Phone
Clickable tel link

```tsx
{
  label: "Phone",
  value: "+1 (555) 123-4567",
  type: "phone",
}
```

### Link
External link

```tsx
{
  label: "Website",
  value: "Visit Website",
  type: "link",
  href: "https://example.com",
}
```

### Custom
Any React component

```tsx
{
  label: "Custom Content",
  type: "custom",
  value: (
    <div>
      <span className="badge">VIP</span>
      <p>Custom component here</p>
    </div>
  ),
}
```

---

## Advanced Examples

### 1. With Status Badge (Animated)

```tsx
<DetailsPage
  title="John Doe"
  status={{
    label: "Active",
    variant: "success",
    animated: true,  // Adds pulsing dot
  }}
  // ... other props
/>
```

### 2. Custom Header Gradient

```tsx
<DetailsPage
  title="Jane Smith"
  headerGradient="from-purple-600 via-pink-500 to-purple-600 dark:from-purple-900 dark:via-pink-900 dark:to-purple-900"
  // ... other props
/>
```

### 3. With Custom Actions

```tsx
<DetailsPage
  title="Employee Details"
  customActions={[
    {
      label: "Send Message",
      icon: Mail,
      onClick: () => console.log("Send message"),
      variant: "primary",
    },
    {
      label: "Archive",
      icon: Archive,
      onClick: () => console.log("Archive"),
      variant: "ghost",
      disabled: isArchiving,
    },
  ]}
  // ... other props
/>
```

### 4. With Delete Confirmation

```tsx
<DetailsPage
  title="Customer"
  onDelete={async () => {
    await deleteCustomer();
    navigate("/customers");
  }}
  deleteConfirmation={{
    title: "Delete Customer?",
    message: "Are you sure you want to delete John Doe? This cannot be undone.",
    confirmLabel: "Yes, Delete",
    cancelLabel: "Cancel",
  }}
  // ... other props
/>
```

### 5. Two-Column Layout

```tsx
const sections: DetailSection[] = [
  {
    title: "Contact Info",
    columns: 2,  // Spans 2 columns
    fields: [...],
  },
  {
    title: "Company",
    // Takes 1 column (default)
    fields: [...],
  },
];

<DetailsPage
  gridLayout="3-col"
  sections={sections}
  // ... other props
/>
```

### 6. Custom Footer

```tsx
<DetailsPage
  title="Product Details"
  showBackButton={false}
  footerContent={
    <div className="flex gap-3">
      <Button onClick={addToCart}>Add to Cart</Button>
      <Button variant="outline" onClick={addToWishlist}>
        Add to Wishlist
      </Button>
    </div>
  }
  // ... other props
/>
```

### 7. Fully Custom Layout

```tsx
<DetailsPage
  title="Custom Page"
  onBack={() => navigate(-1)}
  sections={[]}  // Empty when using custom layout
  customLayout={
    <div className="space-y-6">
      <MyCustomComponent />
      <AnotherComponent />
    </div>
  }
/>
```

---

## Styling Customization

### Section Header Colors

```tsx
{
  title: "Contact Information",
  headerGradient: "bg-gradient-to-r from-blue-50 to-cyan-50 dark:from-blue-950/20 dark:to-cyan-950/20",
  iconColor: "text-blue-600 dark:text-blue-400",
  // ...
}
```

### Field Icon Styling

```tsx
{
  icon: User,
  iconBgColor: "bg-purple-100 dark:bg-purple-900/30",
  iconColor: "text-purple-600 dark:text-purple-400",
  label: "Name",
  value: "John Doe",
}
```

---

## Status Badge Variants

| Variant | Color | Use Case |
|---------|-------|----------|
| `success` | Green | Active, Completed, Success |
| `warning` | Yellow | Pending, Warning, Caution |
| `error` | Red | Inactive, Failed, Error |
| `info` | Blue | Info, Default status |
| `default` | Gray | Neutral status |

---

## Layout Options

| Layout | Description | Use Case |
|--------|-------------|----------|
| `1-col` | Single column | Simple details, narrow content |
| `2-col` | Two columns | Medium complexity |
| `3-col` | Three columns (default) | Rich details, multiple sections |
| `custom` | Custom ReactNode | Full control over layout |

---

## Icon Options (from lucide-react)

Common icons you can use:

- **User**: `User`, `Users`, `UserCircle`
- **Contact**: `Mail`, `Phone`, `MapPin`
- **Business**: `Building2`, `Briefcase`, `DollarSign`
- **Date**: `Calendar`, `Clock`
- **Actions**: `Edit`, `Trash2`, `Archive`, `Download`
- **Social**: `Globe`, `Link`, `Share2`

Import from `lucide-react`:

```tsx
import { User, Mail, Phone, Building2, Calendar } from "lucide-react";
```

---

## Best Practices

1. **Use meaningful icons** - Match icons to field content
2. **Group related fields** - Organize into logical sections
3. **Limit columns** - Don't use 2-column span for every section
4. **Consistent colors** - Use a color scheme across sections
5. **Handle loading states** - Show loading UI before data arrives
6. **Validate delete** - Always use deleteConfirmation for destructive actions
7. **Mobile first** - Test on mobile devices (automatically responsive)

---

## Accessibility

The component includes:

- ✅ Semantic HTML structure
- ✅ ARIA labels on buttons
- ✅ Keyboard navigation support
- ✅ Focus visible states
- ✅ Color contrast (AA compliant)
- ✅ Screen reader friendly

---

## Dark Mode

Automatically supports dark mode through Tailwind's `dark:` classes. All colors adapt automatically.

---

## Browser Support

- ✅ Chrome/Edge (latest)
- ✅ Firefox (latest)
- ✅ Safari (latest)
- ✅ Mobile browsers

---

## Migration from Old DetailsPage

**Old way:**
```tsx
<DetailsPage
  title="John"
  data={{ name: "John", email: "john@example.com" }}
  onEdit={handleEdit}
  onDelete={handleDelete}
  onBack={handleBack}
/>
```

**New way:**
```tsx
<DetailsPage
  title="John"
  sections={[
    {
      title: "Information",
      fields: [
        { label: "Name", value: "John" },
        { label: "Email", value: "john@example.com", type: "email" },
      ],
    },
  ]}
  onEdit={handleEdit}
  onDelete={handleDelete}
  onBack={handleBack}
/>
```

---

## Troubleshooting

### Issue: Icons not showing
**Solution**: Make sure to import from `lucide-react`:
```tsx
import { User } from "lucide-react";
```

### Issue: Gradient not showing
**Solution**: Ensure Tailwind classes are in your config:
```js
// tailwind.config.js
module.exports = {
  content: ["./src/**/*.{ts,tsx}"],
  // ...
}
```

### Issue: Delete button not showing
**Solution**: Provide both `onDelete` AND `deleteConfirmation` props.

---

## Support

For more examples, see `DetailsPageExample.tsx` in the same directory.
