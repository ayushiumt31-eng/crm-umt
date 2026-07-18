# Customer Detail Page - Visual Guide

## 📐 Page Layout

```
╔════════════════════════════════════════════════════════════════════════╗
║                         HEADER SECTION                                 ║
║  [← Button] John Doe              [🟢 Active Status Badge]            ║
║             Customer Details                                           ║
╚════════════════════════════════════════════════════════════════════════╝

╔════════════════════════════════════════════════════════════════════════╗
║                    QUICK INFO CARDS (4 columns)                        ║
║  ┌──────────────┐ ┌──────────────┐ ┌──────────────┐ ┌──────────────┐║
║  │ Email        │ │ Phone        │ │ Company      │ │ Created      ││
║  │ [✉ Icon]    │ │ [☎ Icon]     │ │ [🏢 Icon]    │ │ [📅 Icon]    ││
║  │ john@ex.com  │ │ +1-555-1234  │ │ Acme Corp    │ │ Jan 15, 2024 ││
║  │ [Copy]       │ │ [Copy]       │ │ [Copy]       │ │ 185 days ago ││
║  └──────────────┘ └──────────────┘ └──────────────┘ └──────────────┘║
║  (Blue)          (Cyan)            (Purple)         (Green)           ║
╚════════════════════════════════════════════════════════════════════════╝

╔════════════════════════════════════════════════════════════════════════╗
║                  DETAILED INFO SECTION (3 columns)                     ║
║  ┌────────────────────────────────────────────────────────────────┐   ║
║  │ [✉] Email Address               │ [☎] Phone Number           │    ║
║  │ john.doe@example.com            │ +1 (555) 123-4567          │    ║
║  │ [Send Email →]                  │ [Call Now →]               │    ║
║  ├────────────────────────────────────────────────────────────────┤   ║
║  │ [🏢] Company Name               │ [✓] Status                 │    ║
║  │ Acme Corporation                │ [🟢 Active]                │    ║
║  │ Business Partner                │                             │    ║
║  ├────────────────────────────────────────────────────────────────┤   ║
║  │ [📅] Date Created               │ [👤] Customer ID           │    ║
║  │ January 15, 2024                │ #CUST-00001                │    ║
║  │ 185 days in system              │ [Copy ID]                  │    ║
║  └────────────────────────────────────────────────────────────────┘   ║
╚════════════════════════════════════════════════════════════════════════╝

╔════════════════════════════════════════════════════════════════════════╗
║                      ACTION BUTTONS                                    ║
║  ┌────────────────┐ ┌────────────────┐ ┌────────────────┐            ║
║  │ [✏ Edit]       │ │ [📤 Print]     │ │ [🗑 Delete]    │            ║
║  └────────────────┘ └────────────────┘ └────────────────┘            ║
║  (Blue→Cyan)        (Slate)             (Red→Rose)                    ║
╚════════════════════════════════════════════════════════════════════════╝

╔════════════════════════════════════════════════════════════════════════╗
║                     PRO TIP BANNER                                     ║
║  [ℹ]  Pro Tip: Click email or phone to contact directly.              ║
║       Use Edit to update info. Changes auto-save.                      ║
╚════════════════════════════════════════════════════════════════════════╝
```

---

## 🎨 Color Codes

### Quick Info Cards

```
Email Card (Blue)
┌─────────────────┐
│ From: #3b82f6   │
│ To: #1e40af     │
│ Gradient 45°    │
└─────────────────┘

Phone Card (Cyan)
┌─────────────────┐
│ From: #06b6d4   │
│ To: #0e7490     │
│ Gradient 45°    │
└─────────────────┘

Company Card (Purple)
┌─────────────────┐
│ From: #a855f7   │
│ To: #6b21a8     │
│ Gradient 45°    │
└─────────────────┘

Date Card (Green)
┌─────────────────┐
│ From: #10b981   │
│ To: #065f46     │
│ Gradient 45°    │
└─────────────────┘
```

### Action Buttons

```
Edit Button:
from-blue-600 → to-cyan-600
hover:from-blue-700 → hover:to-cyan-700

Print Button:
from-slate-600 → to-slate-700
hover:from-slate-700 → hover:to-slate-800

Delete Button:
from-red-600 → to-rose-600
hover:from-red-700 → hover:to-rose-700
```

---

## 📱 Responsive Breakpoints

### Mobile (< 640px)
```
┌──────────────┐
│ [← Name]     │
│ [Status]     │
├──────────────┤
│ [Card 1]     │
├──────────────┤
│ [Card 2]     │
├──────────────┤
│ [Card 3]     │
├──────────────┤
│ [Card 4]     │
├──────────────┤
│ [Info 1]     │
├──────────────┤
│ [Info 2]     │
├──────────────┤
│ [Info 3]     │
├──────────────┤
│ [Info 4]     │
├──────────────┤
│ [Info 5]     │
├──────────────┤
│ [Info 6]     │
├──────────────┤
│ [Edit] [Pr]  │
│ [Delete]     │
└──────────────┘
```

### Tablet (640px - 1024px)
```
┌────────────────────────────┐
│ [← Name] [Status]          │
├────────────────────────────┤
│ [Card 1] │ [Card 2]        │
├──────────┤─────────────────┤
│ [Card 3] │ [Card 4]        │
├────────────────────────────┤
│ [Info 1] │ [Info 2]        │
├──────────┤─────────────────┤
│ [Info 3] │ [Info 4]        │
├──────────┤─────────────────┤
│ [Info 5] │ [Info 6]        │
├────────────────────────────┤
│ [Edit] [Print] [Delete]    │
└────────────────────────────┘
```

### Desktop (> 1024px)
```
┌─────────────────────────────────────────┐
│ [← Name]              [Status Badge]    │
├─────────────────────────────────────────┤
│ [Card1] [Card2] [Card3] [Card4]        │
├─────────────────────────────────────────┤
│ [Info1] [Info2] [Info3] [Info4] [Info5]│
├─────────────────────────────────────────┤
│ [Info6]                                 │
├─────────────────────────────────────────┤
│ [Edit Button] [Print Button] [Delete]   │
├─────────────────────────────────────────┤
│ [Pro Tip Banner]                        │
└─────────────────────────────────────────┘
```

---

## 🎬 Interaction Flows

### Copy to Clipboard Flow
```
User clicks [Copy] button
    ↓
Icon changes to checkmark ✓
    ↓
Text shows "Copied!"
    ↓
Wait 2 seconds
    ↓
Revert to normal
    ↓
(Clipboard has content)
```

### Email Link Flow
```
User clicks [Send Email →]
    ↓
mailto: link opens
    ↓
Default email client launches
    ↓
Compose window with recipient
```

### Phone Link Flow
```
User clicks [Call Now →]
    ↓
tel: link triggers
    ↓
Phone app opens (if on mobile)
    ↓
Ready to dial
```

### Edit Flow
```
User clicks [Edit Customer]
    ↓
Navigate to /customers/:id/edit
    ↓
Form pre-fills with data
    ↓
Modal opens for editing
```

### Delete Flow
```
User clicks [Delete Customer]
    ↓
Button shows loading state
    ↓
Processing animation
    ↓
Navigate back to /customers
```

---

## ✨ Hover Effects

### Card Hover
```
Normal State:
┌──────────────┐
│ Email        │  Shadow: shadow-sm
│ john@ex.com  │  Transform: none
└──────────────┘

Hover State:
┌──────────────┐
│ Email        │  Shadow: shadow-lg
│ john@ex.com  │  Transform: -translate-y-1
└──────────────┘  (lifted up slightly)
```

### Button Hover
```
Normal:
┌──────────────┐
│ [Edit]       │  Shadow: shadow-lg
└──────────────┘  Transform: none

Hover:
┌──────────────┐
│ [Edit]       │  Shadow: shadow-xl
└──────────────┘  Transform: -translate-y-0.5
                  Gradient: brighter
```

### Copy Button Feedback
```
Normal:
[📋 Copy]

Clicked:
[✓ Copy]  ← Icon becomes checkmark

After 2s:
[📋 Copy]  ← Reverts
```

---

## 🌙 Dark Mode Appearance

### Light Mode
```
Background: white
Text: slate-900
Cards: gradient light colors with opacity
Borders: light gray with opacity
Buttons: bright gradients
Icons: colored (blue, cyan, green, etc.)
```

### Dark Mode
```
Background: slate-900
Text: white
Cards: gradient dark colors with low opacity
Borders: slate-800 with opacity
Buttons: darker gradients
Icons: lighter/brighter colors
Pro Tip: darker blue with low opacity
```

---

## 📊 Information Organization

### Priority Levels

**Tier 1 (Highest Priority)**
- Customer name (large heading)
- Status badge (prominent)

**Tier 2 (High Priority)**
- Quick info cards (4 fields)
- Email, phone, company, created

**Tier 3 (Medium Priority)**
- Detailed info section (6 fields)
- Full details with labels

**Tier 4 (Actions)**
- Edit, Print, Delete buttons
- Pro tip banner

---

## 🎯 Visual Hierarchy

```
Size:
Header Name      28px    ← Largest (most important)
Card Title       14px
Detail Label     12px
Detail Value     14px
Button Text      14px
Pro Tip Text     14px    ← Smallest

Weight:
Header Name:     bold (700)
Card Title:      semibold (600)
Detail Label:    bold (700)
Detail Value:    semibold (600)
Button:          semibold (600)

Color Usage:
Primary info:    Blue gradient
Contact info:    Color-coded (email, phone)
Status:          Colored badge (green/gray)
Actions:         Colored buttons
Hints:           Blue info banner
```

---

## 🔄 State Transitions

### Loading States
```
Delete Button:

Normal:    [🗑 Delete Customer]
Loading:   [🗑 Deleting...]
After:     Redirects to /customers
```

### Error States (Not Shown - Customer Not Found)
```
Header:    [← Button]
Content:   Customer Not Found
Message:   "This customer doesn't exist..."
Button:    Back to Customers
```

---

## 💫 Animation Timings

```
Card Hover:       300ms (ease-in-out)
Button Hover:     200ms (ease-in-out)
Copy Feedback:    Instant + 2000ms revert
Transitions:      all (smooth)
Transforms:       smooth with timing functions
```

---

## 📏 Spacing Scale

```
xs:  2px
sm:  4px
md:  6px
lg:  8px
xl:  12px
2xl: 16px
3xl: 20px
4xl: 24px
6xl: 32px
```

Applied:
- Card padding: 24px (3xl)
- Section padding: 32px (6xl)
- Button padding: 12px v, 32px h
- Gap between items: 8-12px

---

## 🎓 CSS Classes Structure

```
Container:
- space-y-8 (vertical spacing)
- rounded-2xl (16px radius)
- border (1px border)
- bg-gradient-to-br (diagonal gradient)
- dark:from-* dark:to-* (dark mode)

Cards:
- group (hover parent)
- transition-all duration-300 (smooth)
- hover:shadow-lg (shadow on hover)
- transform hover:-translate-y-1 (lift)

Buttons:
- bg-gradient-to-r (horizontal gradient)
- hover:from-* hover:to-* (darker on hover)
- transform hover:-translate-y-0.5 (slight lift)
- shadow-lg hover:shadow-xl (shadow)
```

---

**Version**: 1.0  
**Last Updated**: July 18, 2026  
**Status**: ✅ Complete
