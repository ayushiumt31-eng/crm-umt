import type { DateRangePreset, MarketingChannel } from "../types/marketingReport";

interface MarketingReportFiltersProps {
  dateRange: DateRangePreset;
  channel: MarketingChannel | "ALL";
  campaignId: string;
  onDateRangeChange: (value: DateRangePreset) => void;
  onChannelChange: (value: MarketingChannel | "ALL") => void;
  onCampaignChange: (value: string) => void;
  onApply: () => void;
  onReset: () => void;
}

const dateRangeOptions: { value: DateRangePreset; label: string }[] = [
  { value: "TODAY", label: "Today" },
  { value: "YESTERDAY", label: "Yesterday" },
  { value: "LAST_7_DAYS", label: "Last 7 Days" },
  { value: "LAST_30_DAYS", label: "Last 30 Days" },
  { value: "THIS_MONTH", label: "This Month" },
  { value: "LAST_MONTH", label: "Last Month" },
  { value: "CUSTOM", label: "Custom Range" },
];

const channelOptions: { value: MarketingChannel | "ALL"; label: string }[] = [
  { value: "ALL", label: "All Channels" },
  { value: "EMAIL", label: "Email" },
  { value: "WHATSAPP", label: "WhatsApp" },
  { value: "SOCIAL_MEDIA", label: "Social Media" },
  { value: "ADS", label: "Ads" },
  { value: "AUTOMATION", label: "Automation" },
];

export function MarketingReportFilters({
  dateRange,
  channel,
  campaignId,
  onDateRangeChange,
  onChannelChange,
  onCampaignChange,
  onApply,
  onReset,
}: MarketingReportFiltersProps) {
  return (
    <div className="rounded-2xl border border-slate-200/50 dark:border-slate-800/50 bg-white dark:bg-slate-900 shadow-sm p-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Date Range */}
        <div>
          <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
            Date Range
          </label>
          <select
            value={dateRange}
            onChange={(e) => onDateRangeChange(e.target.value as DateRangePreset)}
            className="w-full h-10 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 px-3 text-sm text-slate-900 dark:text-white"
          >
            {dateRangeOptions.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
        </div>

        {/* Channel */}
        <div>
          <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
            Channel
          </label>
          <select
            value={channel}
            onChange={(e) => onChannelChange(e.target.value as MarketingChannel | "ALL")}
            className="w-full h-10 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 px-3 text-sm text-slate-900 dark:text-white"
          >
            {channelOptions.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
        </div>

        {/* Campaign Filter */}
        <div>
          <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
            Campaign
          </label>
          <select
            value={campaignId}
            onChange={(e) => onCampaignChange(e.target.value)}
            className="w-full h-10 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 px-3 text-sm text-slate-900 dark:text-white"
          >
            <option value="">All Campaigns</option>
            <option value="cmp-001">New Customer Welcome Campaign</option>
            <option value="cmp-002">Summer Sales Promotion</option>
            <option value="cmp-003">Lead Follow-up Campaign</option>
            <option value="cmp-004">Monthly Newsletter</option>
            <option value="cmp-005">Customer Re-engagement Campaign</option>
            <option value="cmp-009">Product Launch Webinar Invite</option>
            <option value="sc-001">Product Launch Q3</option>
            <option value="adc-001">EV Awareness Campaign</option>
            <option value="adc-002">Solar Energy Campaign</option>
            <option value="auto-001">New Website Lead Follow-up</option>
          </select>
        </div>

        {/* Buttons */}
        <div className="flex items-end gap-2">
          <button
            onClick={onApply}
            className="flex-1 h-10 rounded-lg bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white font-semibold text-sm px-4 transition-all"
          >
            Apply
          </button>
          <button
            onClick={onReset}
            className="flex-1 h-10 rounded-lg border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 font-semibold text-sm px-4 transition-all"
          >
            Reset
          </button>
        </div>
      </div>
    </div>
  );
}
