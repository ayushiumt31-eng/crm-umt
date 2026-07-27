# Ads / Meta Ads Module - Implementation Plan

## Overview
Build a complete Ads/Meta Ads Management module following the same patterns as Social Media Marketing, Email Marketing, and other existing modules.

## Files to Create (~40 files)

### 1. Types (4 files)
- `src/features/ads/types/adCampaign.ts` - AdCampaign interface
- `src/features/ads/types/adSet.ts` - AdSet interface
- `src/features/ads/types/ad.ts` - Ad interface (creative)
- `src/features/ads/types/adHistory.ts` - AdHistory interface

### 2. Dummy Data (4 files)
- `src/features/ads/data/dummy-ad-campaigns.ts` - 10 campaigns
- `src/features/ads/data/dummy-ad-sets.ts` - 10 ad sets
- `src/features/ads/data/dummy-ads.ts` - 15 ads
- `src/features/ads/data/dummy-ad-history.ts` - 10 history records

### 3. Services (4 files)
- `src/features/ads/services/adCampaignService.ts` - CRUD + pause/resume
- `src/features/ads/services/adSetService.ts` - CRUD
- `src/features/ads/services/adService.ts` - CRUD + pause/resume
- `src/features/ads/services/adHistoryService.ts` - Get history

### 4. Components (9 files)
- `AdStatsCard.tsx` - Stats grid (total campaigns, active, ad sets, ads, budget, spend)
- `AdPlatformBadge.tsx` - Facebook/Instagram/Facebook+Instagram badge
- `AdCampaignStatusBadge.tsx` - Status badge for campaigns
- `AdCampaignTableColumns.tsx` - DataTable columns for campaigns
- `AdSetTableColumns.tsx` - DataTable columns for ad sets
- `AdTableColumns.tsx` - DataTable columns for ads
- `AdCampaignDetailsCard.tsx` - Campaign detail card with analytics
- `AdPreview.tsx` - Facebook/Instagram ad visual preview
- `DeleteAdCampaignDialog.tsx` - Delete confirmation dialog

### 5. Forms (6 files)
- `adCampaignFields.ts` - Campaign form field config + validation
- `adSetFields.ts` - Ad set form field config
- `adFields.ts` - Ad form field config + CTA options
- `AdCampaignForm.tsx` - Campaign create/edit form with audience section
- `AdSetForm.tsx` - Ad set create/edit form
- `AdForm.tsx` - Ad create/edit form with preview

### 6. Pages (9 files)
- `AdsDashboard.tsx` - Main dashboard with stats + quick nav
- `AdCampaigns.tsx` - Campaign DataTable with search/filters + pause/resume
- `AddAdCampaign.tsx` - Create campaign page
- `EditAdCampaign.tsx` - Edit campaign page
- `AdCampaignDetails.tsx` - Campaign detail with analytics
- `AdSets.tsx` - Ad sets DataTable
- `Ads.tsx` - Ads DataTable (at /marketing/ads/list)
- `AdHistory.tsx` - History DataTable with CSV/Excel export
- `AdAnalytics.tsx` - Analytics dashboard with charts
- `index.ts` - Re-exports

## Files to Modify (4 files)

### 1. `src/constants/routes.ts`
Add ADS routes:
```ts
ADS: {
  DASHBOARD: "/marketing/ads",
  CAMPAIGNS: { LIST: "/marketing/ads/campaigns", ADD: "...", VIEW: (id) => "...", EDIT: (id) => "..." },
  AD_SETS: { LIST: "/marketing/ads/ad-sets" },
  ADS_LIST: "/marketing/ads/list",
  HISTORY: "/marketing/ads/history",
  ANALYTICS: "/marketing/ads/analytics",
}
```

### 2. `src/constants/sidebarMenu.ts`
Add "Ads / Meta Ads" under Marketing with Megaphone icon, path `/marketing/ads`

### 3. `src/routes/AppRoutes.tsx`
Add 9 route definitions for Ads module

### 4. `src/features/roles-permissions/data/permissions.ts`
Add: marketing.ads.view, marketing.ads.create, marketing.ads.update, marketing.ads.delete, marketing.ads.pause, marketing.ads.resume, marketing.ads.publish, marketing.ads.export

## Implementation Order
1. Types → 2. Dummy Data → 3. Services → 4. Components → 5. Forms → 6. Pages → 7. Routes/Sidebar/Permissions → 8. Verify

## Key Patterns (from existing modules)
- Use existing `DataTable`, `Form`, `DetailsPage`, `Button`, `Input`, `Badge`, `Card` components
- Service classes with local dummy data arrays
- SocialPlatformBadge pattern → AdPlatformBadge
- SocialPostStatusBadge pattern → AdCampaignStatusBadge
- EmailStatsCard pattern → AdStatsCard
- SocialPostPreview pattern → AdPreview
- EmailCampaignForm pattern → AdCampaignForm
- Analytics placeholder pattern from EmailCampaignDetails
- Export CSV/Excel pattern from SocialMediaHistory
