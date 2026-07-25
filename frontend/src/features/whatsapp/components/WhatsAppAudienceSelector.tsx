import { useState, useMemo } from "react";
import { Users, Search, CheckSquare, Square, Phone } from "lucide-react";
import type { WhatsAppCampaignAudienceType } from "../types/whatsappCampaign";
import { dummyCustomers } from "@/features/customers/data/dummy-customers";
import { dummyLead } from "@/features/lead/data/dummy-lead";

interface WhatsAppAudienceSelectorProps {
  audienceType: WhatsAppCampaignAudienceType;
  selectedIds: string[];
  onChange: (audienceType: WhatsAppCampaignAudienceType, ids: string[]) => void;
}

interface Recipient {
  id: string;
  name: string;
  phone: string;
  source: "customer" | "lead";
}

export function WhatsAppAudienceSelector({
  audienceType,
  selectedIds,
  onChange,
}: WhatsAppAudienceSelectorProps) {
  const [search, setSearch] = useState("");
  const [tab, setTab] = useState<"customers" | "leads">("customers");

  const allCustomers: Recipient[] = dummyCustomers.map((c) => ({
    id: c.id,
    name: c.name,
    phone: c.phone,
    source: "customer" as const,
  }));

  const allLeads: Recipient[] = dummyLead.map((l) => ({
    id: l.id,
    name: `${l.firstName} ${l.lastName}`,
    phone: l.phone,
    source: "lead" as const,
  }));

  const audienceOptions: {
    value: WhatsAppCampaignAudienceType;
    label: string;
    count: number;
  }[] = [
    {
      value: "ALL_CUSTOMERS",
      label: "All Customers",
      count: allCustomers.length,
    },
    { value: "ALL_LEADS", label: "All Leads", count: allLeads.length },
    { value: "CUSTOMERS", label: "Customers", count: allCustomers.length },
    { value: "LEADS", label: "Leads", count: allLeads.length },
    { value: "CUSTOM", label: "Custom Audience", count: 0 },
  ];

  const handleAudienceTypeChange = (value: WhatsAppCampaignAudienceType) => {
    let ids: string[] = [];
    switch (value) {
      case "ALL_CUSTOMERS":
        ids = allCustomers.map((r) => r.id);
        break;
      case "ALL_LEADS":
        ids = allLeads.map((r) => r.id);
        break;
      case "CUSTOMERS":
      case "LEADS":
      case "CUSTOM":
        ids = [];
        break;
    }
    onChange(value, ids);
  };

  const toggleRecipient = (id: string) => {
    const newIds = selectedIds.includes(id)
      ? selectedIds.filter((i) => i !== id)
      : [...selectedIds, id];
    onChange(audienceType, newIds);
  };

  const handleSelectAll = () => {
    const currentList = tab === "customers" ? allCustomers : allLeads;
    const allSelected = currentList.every((r) => selectedIds.includes(r.id));
    if (allSelected) {
      const newIds = selectedIds.filter(
        (id) => !currentList.some((r) => r.id === id)
      );
      onChange(audienceType, newIds);
    } else {
      const newIds = [
        ...selectedIds,
        ...currentList
          .filter((r) => !selectedIds.includes(r.id))
          .map((r) => r.id),
      ];
      onChange(audienceType, newIds);
    }
  };

  const filteredRecipients = useMemo(() => {
    const list = tab === "customers" ? allCustomers : allLeads;
    if (!search) return list;
    const q = search.toLowerCase();
    return list.filter(
      (r) =>
        r.name.toLowerCase().includes(q) ||
        r.phone.toLowerCase().includes(q)
    );
  }, [tab, search, allCustomers, allLeads]);

  const showMultiSelect =
    audienceType === "CUSTOMERS" ||
    audienceType === "LEADS" ||
    audienceType === "CUSTOM";

  const currentList = tab === "customers" ? allCustomers : allLeads;
  const allInListSelected =
    currentList.length > 0 &&
    currentList.every((r) => selectedIds.includes(r.id));

  return (
    <div className="space-y-4">
      {/* Audience Type Selection */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {audienceOptions
          .filter((o) => o.value !== "CUSTOMERS" && o.value !== "LEADS")
          .concat(
            audienceOptions.filter(
              (o) =>
                o.value === "CUSTOMERS" ||
                o.value === "LEADS" ||
                o.value === "CUSTOM"
            )
          )
          .map((opt) => (
            <button
              key={opt.value}
              type="button"
              onClick={() => handleAudienceTypeChange(opt.value)}
              className={`p-3 rounded-xl border-2 text-left transition-all ${
                audienceType === opt.value
                  ? "border-green-500 bg-green-50 dark:bg-green-950/30 dark:border-green-500"
                  : "border-slate-200 dark:border-slate-700 hover:border-green-300 dark:hover:border-green-600"
              }`}
            >
              <p className="text-sm font-semibold text-slate-900 dark:text-white">
                {opt.label}
              </p>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                {opt.value === "CUSTOM"
                  ? `${selectedIds.length} selected`
                  : `${opt.count} recipients`}
              </p>
            </button>
          ))}
      </div>

      {/* Multi-select for CUSTOMERS / LEADS / CUSTOM */}
      {showMultiSelect && (
        <div className="rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900">
          {/* Tabs */}
          <div className="flex border-b border-slate-200 dark:border-slate-700">
            <button
              type="button"
              onClick={() => setTab("customers")}
              className={`flex-1 px-4 py-2.5 text-sm font-semibold transition-all ${
                tab === "customers"
                  ? "text-green-600 dark:text-green-400 border-b-2 border-green-600 dark:border-green-400"
                  : "text-slate-500 dark:text-slate-400 hover:text-slate-700"
              }`}
            >
              Customers ({allCustomers.length})
            </button>
            <button
              type="button"
              onClick={() => setTab("leads")}
              className={`flex-1 px-4 py-2.5 text-sm font-semibold transition-all ${
                tab === "leads"
                  ? "text-green-600 dark:text-green-400 border-b-2 border-green-600 dark:border-green-400"
                  : "text-slate-500 dark:text-slate-400 hover:text-slate-700"
              }`}
            >
              Leads ({allLeads.length})
            </button>
          </div>

          {/* Search */}
          <div className="p-3 border-b border-slate-200 dark:border-slate-700">
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-slate-500" />
              <input
                type="text"
                placeholder="Search recipients..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-9 pr-3 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-sm"
              />
            </div>
          </div>

          {/* Select All */}
          <div className="px-3 py-2 border-b border-slate-100 dark:border-slate-800">
            <button
              type="button"
              onClick={handleSelectAll}
              className="flex items-center gap-2 text-sm font-medium text-green-600 dark:text-green-400 hover:text-green-700"
            >
              {allInListSelected ? (
                <CheckSquare className="h-4 w-4" />
              ) : (
                <Square className="h-4 w-4" />
              )}
              {allInListSelected ? "Deselect All" : "Select All"}
            </button>
          </div>

          {/* Recipient List */}
          <div className="max-h-60 overflow-y-auto p-2 space-y-1">
            {filteredRecipients.length === 0 && (
              <p className="text-sm text-slate-500 text-center py-4">
                No recipients found
              </p>
            )}
            {filteredRecipients.map((r) => (
              <label
                key={r.id}
                className="flex items-center gap-3 p-2 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800/50 cursor-pointer"
              >
                <input
                  type="checkbox"
                  checked={selectedIds.includes(r.id)}
                  onChange={() => toggleRecipient(r.id)}
                  className="rounded border-slate-300 text-green-600 focus:ring-green-500"
                />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-slate-900 dark:text-white truncate">
                    {r.name}
                  </p>
                  <p className="text-xs text-slate-500 dark:text-slate-400 truncate flex items-center gap-1">
                    <Phone className="h-3 w-3" />
                    {r.phone}
                  </p>
                </div>
                <span className="text-xs text-slate-400 bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded-full">
                  {r.source}
                </span>
              </label>
            ))}
          </div>
        </div>
      )}

      {/* Selected Count */}
      <div className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400">
        <Users className="h-4 w-4" />
        <span>
          <strong className="text-slate-900 dark:text-white">
            {selectedIds.length}
          </strong>{" "}
          recipient{selectedIds.length !== 1 ? "s" : ""} selected
        </span>
      </div>
    </div>
  );
}

