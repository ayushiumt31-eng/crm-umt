# Ads Module TS Fix Plan

## Errors Found: 52 across 8 files (all missing/closing JSX tags)

## Files to Fix:

### 1. AdsDashboard.tsx - 5 errors
- [ ] Add missing `</div>` for header card (rounded-2xl)
- [ ] Add missing `</div>` for flex container in quickLinks button
- [ ] Change `);` at end to `</div>);` (close root div)

### 2. AdCampaigns.tsx - 6 errors
- [ ] Add missing `</div>` for flex row in header  
- [ ] Add missing `</div>` for relative z-10
- [ ] Add missing `</div>` for rounded-2xl header
- [ ] Change `);` at end to `</div>);` (close root div)

### 3. AdCampaignDetails.tsx - 9 errors
- [ ] Add missing `</div>` for header actions bar
- [ ] Add missing `</div>` for relative z-10
- [ ] Add missing `</div>` for rounded-2xl header
- [ ] Add missing `</div>` for campaign info section
- [ ] Change `);` at end to `</div>);` (close root div)

### 4. AdSets.tsx - 6 errors
- [ ] Add missing `</div>` for flex row in header
- [ ] Add missing `</div>` for relative z-10  
- [ ] Add missing `</div>` for rounded-2xl header
- [ ] Change `);` at end to `</div>);` (close root div)

### 5. Ads.tsx - 6 errors
- [ ] Add missing `</div>` for flex row in header
- [ ] Add missing `</div>` for relative z-10
- [ ] Add missing `</div>` for rounded-2xl header
- [ ] Change `);` at end to `</div>);` (close root div)

### 6. AdHistory.tsx - 7 errors
- [ ] Add missing `</div>` for flex row in header
- [ ] Add missing `</div>` for relative z-10
- [ ] Add missing `</div>` for rounded-2xl header
- [ ] Add missing `</div>` for content section
- [ ] Change `);` at end to `</div>);` (close root div)

### 7. AdAnalytics.tsx - 10 errors
- [ ] Add missing `</div>` for flex row in header
- [ ] Add missing `</div>` for relative z-10
- [ ] Add missing `</div>` for rounded-2xl header
- [ ] Add missing `</div>` for each stat card element
- [ ] Add missing `</div>` for stat cards grid
- [ ] Add missing `</div>` for disclaimer section
- [ ] Change `);` at end to `</div>);` (close root div)

### 8. AdCampaignForm.tsx - 3 errors
- [ ] Add missing `</div>` for root space-y-6 div
- [ ] Change `);` at end to `</div>);`

### 9. Delete .bak and .tmp files
- [ ] Remove all .bak files (22 files)
- [ ] Remove AdsDashboard.tsx.tmp

### 10. Run TypeScript build check
- [ ] npx tsc -p tsconfig.app.json --noEmit

