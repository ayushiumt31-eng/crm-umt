# DetailsPage Component - Kaise Use Karein 🚀

## Overview (Kya Hai Ye?)

`DetailsPage` ek **powerful aur flexible** component hai jo kisi bhi entity (Customer, Employee, Product, etc.) ki details ko beautiful UI mein show karta hai. Isko aap **kahin bhi reuse** kar sakte ho!

---

## ✨ Main Features

- 🎨 **Beautiful Gradient Header** - Animated background ke saath
- 📱 **Fully Responsive** - Mobile se desktop tak perfect
- 🌙 **Dark Mode Support** - Automatic dark mode
- 🔧 **Highly Customizable** - Har cheez configure kar sakte ho
- 🎯 **TypeScript Support** - Full type safety
- 💫 **Smooth Animations** - Professional UI
- 🔔 **Delete Confirmation** - Safe delete with modal
- 📊 **Multiple Field Types** - Text, Email, Phone, Link, Custom
- 🎭 **Custom Actions** - Apne buttons add kar sakte ho

---

## 📦 Installation (Kaise Import Karein)

```tsx
import DetailsPage, { DetailSection } from "@/components/common/DetailsPage";
import { User, Mail, Phone, Building2, Calendar } from "lucide-react";
```

---

## 🎯 Basic Example (Simple Customer Details)

```tsx
import { useNavigate } from "react-router-dom";
import DetailsPage, { DetailSection } from "@/components/common/DetailsPage";
import { User, Mail, Phone } from "lucide-react";

export default function CustomerDetails() {
  const navigate = useNavigate();

  // Step 1: Sections define karo (data structure)
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
          type: "email",  // Clickable email link ban jayegi
        },
        {
          icon: Phone,
          label: "Phone",
          value: "+1 234-567-8900",
          type: "phone",  // Clickable phone link
        },
      ],
    },
  ];

  // Step 2: Component use karo
  return (
    <DetailsPage
      title="John Doe"
      subtitle="Customer Details"
      onBack={() => navigate("/customers")}
      sections={sections}
    />
  );
}
```

**Output**: Beautiful customer details page with gradient header! ✨

---

## 🔥 Complete Example (Full Features)

```tsx
export default function CustomerDetailsComplete() {
  const navigate = useNavigate();
  const { id } = useParams();
  
  // Sections with multiple types
  const sections: DetailSection[] = [
    // Contact Section (2 columns span)
    {
      title: "Contact Information",
      icon: User,
      iconColor: "text-blue-600 dark:text-blue-400",
      headerGradient: "bg-gradient-to-r from-blue-50 to-cyan-50 dark:from-blue-950/20 dark:to-cyan-950/20",
      columns: 2,  // Ye section 2 columns lega
      fields: [
        {
          icon: User,
          iconBgColor: "bg-blue-100 dark:bg-blue-900/30",
          iconColor: "text-blue-600 dark:text-blue-400",
          label: "Full Name",
          value: "John Doe",
        },
        {
          icon: Mail,
          iconBgColor: "bg-cyan-100 dark:bg-cyan-900/30",
          iconColor: "text-cyan-600 dark:text-cyan-400",
          label: "Email",
          value: "john@example.com",
          type: "email",
        },
        {
          icon: Phone,
          iconBgColor: "bg-green-100 dark:bg-green-900/30",
          iconColor: "text-green-600 dark:text-green-400",
          label: "Phone",
          value: "+1 234-567-8900",
          type: "phone",
        },
      ],
    },
    
    // Company Section
    {
      title: "Company Details",
      icon: Building2,
      iconColor: "text-purple-600 dark:text-purple-400",
      fields: [
        {
          icon: Building2,
          label: "Company Name",
          value: "Acme Corp",
        },
        {
          icon: Calendar,
          label: "Member Since",
          value: "January 15, 2024",
        },
      ],
    },
  ];

  const handleDelete = async () => {
    // Delete logic yahan
    await deleteCustomer(id);
    navigate("/customers");
  };

  return (
    <DetailsPage
      // Header Config
      title="John Doe"
      subtitle="Customer Details"
      status={{
        label: "Active",
        variant: "success",
        animated: true,  // Pulsing green dot
      }}
      headerGradient="from-blue-600 via-cyan-500 to-blue-600"
      
      // Actions
      onBack={() => navigate("/customers")}
      onEdit={() => navigate(`/customers/${id}/edit`)}
      onDelete={handleDelete}
      
      // Custom Actions (extra buttons)
      customActions={[
        {
          label: "Send Email",
          icon: Mail,
          onClick: () => console.log("Send email"),
          variant: "primary",
        },
      ]}
      
      // Content
      sections={sections}
      gridLayout="3-col"
      
      // Delete Confirmation Modal
      deleteConfirmation={{
        title: "Delete Customer?",
        message: "Kya aap sure hain? Ye action undo nahi ho sakta.",
        confirmLabel: "Haan, Delete karo",
        cancelLabel: "Cancel",
      }}
    />
  );
}
```

---

## 📋 Props Ki Complete List

### Main Props

| Prop | Type | Required? | Default | Description |
|------|------|-----------|---------|-------------|
| `title` | `string` | ✅ Yes | - | Page ka main heading |
| `subtitle` | `string` | ❌ No | "Details" | Title ke upar small text |
| `onBack` | `function` | ✅ Yes | - | Back button click pe kya ho |
| `sections` | `array` | ✅ Yes | - | Content sections (data) |
| `gridLayout` | `string` | ❌ No | "3-col" | Layout: "1-col", "2-col", "3-col" |
| `status` | `object` | ❌ No | - | Status badge header mein |
| `onEdit` | `function` | ❌ No | - | Edit button handler |
| `onDelete` | `function` | ❌ No | - | Delete button handler |
| `customActions` | `array` | ❌ No | - | Extra buttons header mein |
| `deleteConfirmation` | `object` | ❌ No | - | Delete modal config |

---

## 🎨 Field Types (Data Ko Kaise Display Karein)

### 1. Text (Simple Text)

```tsx
{
  label: "Name",
  value: "John Doe",
  type: "text",  // ya omit kar do (default hai)
}
```

### 2. Email (Clickable Email)

```tsx
{
  label: "Email",
  value: "john@example.com",
  type: "email",  // Automatically mailto: link ban jayega
}
```

### 3. Phone (Clickable Phone)

```tsx
{
  label: "Phone",
  value: "+1 234-567-8900",
  type: "phone",  // Automatically tel: link ban jayega
}
```

### 4. Link (External Link)

```tsx
{
  label: "Website",
  value: "Visit Website",
  type: "link",
  href: "https://example.com",  // Custom URL
}
```

### 5. Custom (Kuch Bhi Component)

```tsx
{
  label: "Status",
  type: "custom",
  value: (
    <span className="badge bg-green-500 text-white px-3 py-1 rounded-full">
      Active Customer
    </span>
  ),
}
```

---

## 🎯 Status Badge (Header Mein Status)

### Different Variants

```tsx
// Green badge (success)
status={{
  label: "Active",
  variant: "success",
  animated: true,  // Pulsing dot add hoga
}}

// Yellow badge (warning)
status={{
  label: "Pending",
  variant: "warning",
}}

// Red badge (error)
status={{
  label: "Inactive",
  variant: "error",
}}

// Blue badge (info)
status={{
  label: "New",
  variant: "info",
}}

// Gray badge (default)
status={{
  label: "Draft",
  variant: "default",
}}
```

---

## 🔧 Layout Options

### 1-Column Layout
```tsx
<DetailsPage
  gridLayout="1-col"  // Sabhi sections ek column mein
  sections={sections}
/>
```

### 2-Column Layout (Medium screens pe 2 columns)
```tsx
<DetailsPage
  gridLayout="2-col"
  sections={sections}
/>
```

### 3-Column Layout (Large screens pe 3 columns) - DEFAULT
```tsx
<DetailsPage
  gridLayout="3-col"  // Default hai
  sections={sections}
/>
```

### Section ko Multiple Columns Span karna
```tsx
const sections = [
  {
    title: "Main Info",
    columns: 2,  // Ye section 2 columns ka space lega
    fields: [...],
  },
  {
    title: "Side Info",
    // columns nahi diya = 1 column (default)
    fields: [...],
  },
];
```

---

## 🎭 Custom Actions (Extra Buttons Add Karna)

```tsx
<DetailsPage
  customActions={[
    {
      label: "Send Message",
      icon: Mail,
      onClick: () => sendMessage(),
      variant: "primary",  // White button with backdrop
    },
    {
      label: "Archive",
      icon: Archive,
      onClick: () => archiveCustomer(),
      variant: "ghost",  // Transparent button
      disabled: isArchiving,  // Button disable karna
    },
    {
      label: "Block",
      icon: Ban,
      onClick: () => blockCustomer(),
      variant: "danger",  // Red button
    },
  ]}
/>
```

---

## 🔔 Delete Confirmation Modal

```tsx
<DetailsPage
  onDelete={async () => {
    await deleteCustomer();
    navigate("/customers");
  }}
  deleteConfirmation={{
    title: "Customer Delete Karein?",
    message: "Kya aap sure hain ki John Doe ko delete karna hai? Ye permanent hai.",
    confirmLabel: "Haan, Delete karo",
    cancelLabel: "Nahi, Cancel karo",
  }}
/>
```

**Note**: Agar aap `deleteConfirmation` nahi dete, to modal nahi aayega!

---

## 🎨 Colors Customize Karna

### Header Gradient Change Karna

```tsx
<DetailsPage
  headerGradient="from-purple-600 via-pink-500 to-purple-600 dark:from-purple-900 dark:via-pink-900 dark:to-purple-900"
/>
```

### Section Header Colors

```tsx
{
  title: "Contact Info",
  headerGradient: "bg-gradient-to-r from-blue-50 to-cyan-50 dark:from-blue-950/20 dark:to-cyan-950/20",
  iconColor: "text-blue-600 dark:text-blue-400",
  fields: [...],
}
```

### Field Icon Colors

```tsx
{
  icon: User,
  iconBgColor: "bg-purple-100 dark:bg-purple-900/30",  // Icon background
  iconColor: "text-purple-600 dark:text-purple-400",   // Icon color
  label: "Name",
  value: "John",
}
```

---

## 📱 Real-World Examples

### Example 1: Customer Details

```tsx
const sections: DetailSection[] = [
  {
    title: "Contact Information",
    icon: User,
    columns: 2,
    fields: [
      { icon: User, label: "Name", value: customer.name },
      { icon: Mail, label: "Email", value: customer.email, type: "email" },
      { icon: Phone, label: "Phone", value: customer.phone, type: "phone" },
    ],
  },
  {
    title: "Company",
    icon: Building2,
    fields: [
      { icon: Building2, label: "Company", value: customer.company },
      { icon: Calendar, label: "Member Since", value: customer.createdAt },
    ],
  },
];
```

### Example 2: Employee Details

```tsx
const sections: DetailSection[] = [
  {
    title: "Personal Info",
    icon: User,
    fields: [
      { label: "Name", value: employee.name },
      { label: "Email", value: employee.email, type: "email" },
      { label: "Phone", value: employee.phone, type: "phone" },
    ],
  },
  {
    title: "Job Info",
    icon: Briefcase,
    fields: [
      { label: "Position", value: employee.position },
      { label: "Department", value: employee.department },
      { label: "Salary", value: `$${employee.salary}` },
    ],
  },
];
```

### Example 3: Product Details (No Delete)

```tsx
<DetailsPage
  title={product.name}
  subtitle="Product Details"
  onBack={() => navigate("/products")}
  onEdit={() => navigate(`/products/${id}/edit`)}
  // onDelete nahi diya - delete button nahi dikhega
  sections={sections}
/>
```

---

## 🎯 Icons Kaise Use Karein

### Popular Icons (Lucide React)

```tsx
import {
  // User icons
  User, Users, UserCircle,
  
  // Contact icons
  Mail, Phone, MapPin, Globe,
  
  // Business icons
  Building2, Briefcase, DollarSign,
  
  // Date/Time icons
  Calendar, Clock,
  
  // Action icons
  Edit, Trash2, Archive, Download, Share2,
} from "lucide-react";
```

### Icon Usage

```tsx
{
  icon: Mail,  // Icon component
  iconBgColor: "bg-blue-100 dark:bg-blue-900/30",
  iconColor: "text-blue-600 dark:text-blue-400",
  label: "Email",
  value: "john@example.com",
}
```

---

## ⚡ Performance Tips

1. **Sections ko component ke bahar define karo** (agar static hai)
```tsx
// ❌ Bad - Har render pe naya array banta hai
return <DetailsPage sections={[{ title: "Info", fields: [...] }]} />

// ✅ Good - Ek baar bana, reuse karo
const sections = [{ title: "Info", fields: [...] }];
return <DetailsPage sections={sections} />
```

2. **useMemo use karo** (agar sections dynamic hai)
```tsx
const sections = useMemo(() => [
  { title: "Info", fields: [...customer] }
], [customer]);  // Customer change pe hi recalculate
```

---

## 🐛 Common Issues & Solutions

### Issue 1: Icons nahi dikh rahe
**Solution**: Import check karo
```tsx
import { User, Mail } from "lucide-react";  // ✅ Correct
import { User } from "react-icons";  // ❌ Wrong library
```

### Issue 2: Delete button nahi dikh raha
**Solution**: Dono props chahiye
```tsx
<DetailsPage
  onDelete={handleDelete}  // ✅ Ye do
  deleteConfirmation={{ ... }}  // ✅ Ye bhi do
/>
```

### Issue 3: Colors nahi aa rahe
**Solution**: Tailwind classes sahi likho
```tsx
// ✅ Correct
iconBgColor: "bg-blue-100 dark:bg-blue-900/30"

// ❌ Wrong
iconBgColor: "blue-100"  // 'bg-' prefix missing
```

### Issue 4: Layout responsive nahi
**Solution**: `gridLayout` prop use karo
```tsx
<DetailsPage
  gridLayout="3-col"  // Desktop pe 3, mobile pe auto 1
  sections={sections}
/>
```

---

## 📚 TypeScript Types (Full Reference)

```typescript
// Main component props
interface DetailsPageProps {
  title: string;
  subtitle?: string;
  status?: StatusBadge;
  headerGradient?: string;
  onBack: () => void;
  onEdit?: () => void;
  onDelete?: () => void;
  customActions?: HeaderAction[];
  sections: DetailSection[];
  gridLayout?: "1-col" | "2-col" | "3-col" | "custom";
  customLayout?: ReactNode;
  deleteConfirmation?: {
    title: string;
    message: string;
    confirmLabel?: string;
    cancelLabel?: string;
  };
  showBackButton?: boolean;
  footerContent?: ReactNode;
}

// Section structure
interface DetailSection {
  title: string;
  icon?: LucideIcon;
  iconColor?: string;
  headerGradient?: string;
  columns?: 1 | 2;
  fields: DetailField[];
}

// Field structure
interface DetailField {
  icon?: LucideIcon;
  iconColor?: string;
  iconBgColor?: string;
  label: string;
  value: ReactNode;
  type?: "text" | "email" | "phone" | "link" | "custom";
  href?: string;
  onClick?: () => void;
}

// Status badge
interface StatusBadge {
  label: string;
  variant?: "success" | "warning" | "error" | "info" | "default";
  animated?: boolean;
}

// Header action
interface HeaderAction {
  label: string;
  icon?: LucideIcon;
  onClick: () => void;
  variant?: "primary" | "danger" | "ghost";
  disabled?: boolean;
}
```

---

## 🎓 Migration Guide (Purane Code Se)

### Old Way (Manual JSX)

```tsx
// 200+ lines of repeated JSX 😫
return (
  <div>
    <div className="header gradient...">
      <button onClick={onBack}>Back</button>
      <h1>{customer.name}</h1>
      <button onClick={onEdit}>Edit</button>
    </div>
    
    <div className="card">
      <div className="field">
        <label>Name</label>
        <p>{customer.name}</p>
      </div>
      <div className="field">
        <label>Email</label>
        <p>{customer.email}</p>
      </div>
      {/* ... 20 more fields ... */}
    </div>
  </div>
);
```

### New Way (Clean & Reusable)

```tsx
// Just 30 lines! 🎉
const sections = [
  {
    title: "Contact Info",
    fields: [
      { label: "Name", value: customer.name },
      { label: "Email", value: customer.email, type: "email" },
    ],
  },
];

return (
  <DetailsPage
    title={customer.name}
    onBack={onBack}
    onEdit={onEdit}
    sections={sections}
  />
);
```

**Benefits:**
- ✅ 80% kam code
- ✅ Har jagah consistent UI
- ✅ Maintain karna easy
- ✅ Bugs kam

---

## 🚀 Quick Start Checklist

1. **Import karo**
```tsx
import DetailsPage, { DetailSection } from "@/components/common/DetailsPage";
import { User, Mail, Phone } from "lucide-react";
```

2. **Sections define karo**
```tsx
const sections: DetailSection[] = [
  { title: "Info", fields: [...] }
];
```

3. **Component use karo**
```tsx
<DetailsPage
  title="John Doe"
  onBack={() => navigate(-1)}
  sections={sections}
/>
```

4. **Customize karo** (optional)
- Status badge add karo
- Colors change karo
- Custom actions add karo
- Delete confirmation add karo

---

## 📞 Help & Support

- **Examples dekhne ke liye**: `DetailsPageExample.tsx` file check karo
- **Detailed guide**: `DETAILSPAGE_GUIDE.md` padho
- **Live example**: `CustomerDetails_NewVersion_Example.tsx` dekho

---

## ✅ Summary (Conclusion)

`DetailsPage` component use karne se:

- ⚡ **Faster Development** - Copy-paste ki zaroorat nahi
- 🎨 **Consistent UI** - Har page same look
- 🐛 **Less Bugs** - Tested component
- 📝 **Clean Code** - Maintainable aur readable
- 🔧 **Highly Flexible** - Kuch bhi customize kar sakte ho

**Bas sections ka data do, baaki sab component sambhal lega!** 🚀

---

Happy Coding! 💻✨
