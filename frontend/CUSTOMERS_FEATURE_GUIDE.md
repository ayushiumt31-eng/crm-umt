# Customers Feature - Complete Frontend Demo Guide

## 🎯 What's Been Implemented

### ✅ Complete Customers Module
- **List View** (`/customers`) - View all customers with search
- **Add Customer** (`/customers/add`) - Create new customers
- **View Customer** (`/customers/:id`) - Detailed customer view
- **Edit Customer** (`/customers/:id/edit`) - Update customer info
- **Delete Customer** - With confirmation dialog

---

## 📁 Project Structure

```
src/
├── pages/customers/
│   ├── Customers.tsx           # Main list page with search
│   ├── AddCustomer.tsx         # Add new customer page
│   ├── ViewCustomer.tsx        # View customer details
│   └── EditCustomer.tsx        # Edit customer page
│
├── components/customers/
│   ├── CustomerToolbar.tsx     # Search + Add button
│   ├── CustomerTable.tsx       # Customer list table
│   ├── CustomerForm.tsx        # Reusable form component
│   └── DeleteCustomerDialog.tsx # Delete confirmation dialog
│
├── data/
│   └── customers.ts            # Dummy customer data (8 customers)
│
├── components/ui/
│   ├── form-field.tsx          # Form field component
│   ├── form-select.tsx         # Form select component
│   ├── form-textarea.tsx       # Form textarea component
│   ├── input.tsx               # Input component
│   └── button.tsx              # Button component
│
└── hooks/
    ├── useApi.ts               # API calls (GET, POST, PUT, DELETE)
    ├── useCustomers.ts         # Customers-specific hook
    ├── useDebounce.ts          # Debounce hook for search
    ├── useLocalStorage.ts      # Local storage hook
    └── index.ts                # Central export
```

---

## 🚀 Features

### 1. **Customers List Page**
- ✅ Display 8 dummy customers in table format
- ✅ Real-time search (debounced 300ms)
- ✅ Search by: Name, Email, Company, Phone
- ✅ Status badges (Active/Inactive with colors)
- ✅ Action buttons: View, Edit, Delete
- ✅ Customer counter showing total count

### 2. **Add Customer**
- ✅ Step-by-step form (3 sections)
  - Section 1: Contact Information (Name, Email, Phone)
  - Section 2: Company Information (Company Name)
  - Section 3: Status & Notes (Status Dropdown, Notes textarea)
- ✅ Full validation with Zod
- ✅ Error messages with icons
- ✅ Character counter for notes (500 max)
- ✅ Loading state with spinner animation
- ✅ Success message after adding
- ✅ Auto-redirect to customers list

### 3. **View Customer**
- ✅ 3-column layout with contact cards
- ✅ Display: Name, Email, Phone, Company, Status, Created Date
- ✅ Icons for each section (Mail, Building, etc.)
- ✅ Edit and Delete buttons
- ✅ Back navigation

### 4. **Edit Customer**
- ✅ Pre-filled form with customer data
- ✅ Same validation as Add
- ✅ Update loading state
- ✅ Redirect to view page after update

### 5. **Delete Customer**
- ✅ Modal confirmation dialog
- ✅ Customer name shown in confirmation
- ✅ Prevents accidental deletion
- ✅ Loading state during deletion
- ✅ Updates list after deletion

---

## 🎨 UI Components Used

### Form Components
- `FormField` - Input fields with error display and icons
- `FormSelect` - Dropdown for status selection
- `FormTextarea` - Notes field with character counter
- `Input` - Basic input with multiple sizes
- `Button` - Multiple variants and sizes

### Cards
- `Card` - Container with header and content
- `CardHeader` - Title and description
- `CardContent` - Main content area

### Layout
- Flexbox for responsive layouts
- Grid for multi-column displays
- Gap utilities for spacing
- Tailwind CSS for all styling

---

## 📊 Dummy Data

8 Sample Customers with:
- Unique IDs (1-8)
- Full names
- Email addresses
- Phone numbers
- Company names
- Status (Active/Inactive)
- Created dates

Located in: `/data/customers.ts`

---

## 🔄 Data Flow

### List View
```
Customers Page
  ├─ Load dummy data from /data/customers.ts
  ├─ Use useDebounce for search
  ├─ Filter customers based on search query
  ├─ Display in CustomerTable
  └─ Handle actions (View, Edit, Delete)
```

### Add Customer
```
Click "Add Customer" button
  ↓
Navigate to /customers/add
  ↓
Display AddCustomer page
  ↓
Fill form (validation with Zod)
  ↓
Submit → Add to dummy data
  ↓
Show success message
  ↓
Redirect to /customers list
```

### Edit Customer
```
Click Edit button
  ↓
Navigate to /customers/:id/edit
  ↓
Fetch customer from dummy data
  ↓
Pre-fill form
  ↓
Submit → Update dummy data
  ↓
Redirect to view page
```

### Delete Customer
```
Click Delete button
  ↓
Show confirmation dialog
  ↓
User confirms
  ↓
Remove from dummy data
  ↓
Close dialog
  ↓
Update list automatically
```

---

## 🎯 How to Test

### 1. **View Customers List**
- Go to `/customers`
- See 8 dummy customers in table
- Try searching by name, email, company, or phone

### 2. **Add Customer**
- Click "Add Customer" button
- Fill all required fields
- Try invalid inputs (validation will show errors)
- Submit → See success message
- Get redirected to list

### 3. **View Customer**
- Click "View" button on any customer
- See customer details in cards
- Click "Back" to return to list

### 4. **Edit Customer**
- Click "Edit" button
- Modify customer info
- Submit → See changes applied

### 5. **Delete Customer**
- Click "Delete" button
- Confirm in dialog
- Customer removed from list

---

## 🔌 API Integration Ready

Currently using dummy data, but ready for:

### Replace dummy data with API calls
```tsx
// In Customers.tsx
const { customers, loading, error, searchCustomers } = useCustomers();

// useCustomers internally uses useApi hooks
```

### API Endpoints to Implement
```
GET    /api/customers          - List all
POST   /api/customers          - Create
GET    /api/customers/:id      - Get one
PUT    /api/customers/:id      - Update
DELETE /api/customers/:id      - Delete
```

---

## ⚙️ Common Hooks Available

### useApi
```tsx
const { data, loading, error } = useApi("/api/customers");
```

### usePost
```tsx
const { post, loading, error } = usePost("/api/customers");
await post({ name: "John", ... });
```

### useDebounce
```tsx
const debouncedSearch = useDebounce(searchQuery, 300);
```

### useCustomers
```tsx
const { customers, loading, addCustomer, editCustomer, removeCustomer, searchCustomers } = useCustomers();
```

---

## 📱 Responsive Design

- ✅ Mobile-first approach
- ✅ Table scrolls on mobile
- ✅ Form stacks on small screens
- ✅ Toolbar adapts to screen size
- ✅ Touch-friendly buttons

---

## 🎭 Dark/Light Mode

- ✅ Full dark mode support
- ✅ CSS variables for theming
- ✅ All components themed
- ✅ Status badges themed
- ✅ Forms themed

---

## ✨ Next Steps

To connect to real backend:

1. **Update useCustomers hook**
   - Replace dummy data with API calls
   - Implement actual CRUD operations

2. **Create NestJS endpoints**
   - Set up database models in Prisma
   - Create controllers and services
   - Implement authentication

3. **Add error handling**
   - Toast notifications
   - Error boundaries
   - Retry logic

4. **Add loading states**
   - Skeleton loaders
   - Spinners
   - Optimistic updates

---

## 📝 Notes

- All data is stored in state (not persistent between page reloads)
- Dummy data is in `/data/customers.ts`
- Ready to swap with real API endpoints
- All form validations working
- Navigation working across all pages
- Search debounced for performance
