import { useState } from "react";
import { Form } from "@/components/common/Form";
import { whatsappCampaignFields } from "./whatsappCampaignFields";
import { WhatsAppAudienceSelector } from "../components/WhatsAppAudienceSelector";
import type { WhatsAppCampaignAudienceType } from "../types/whatsappCampaign";
import { MessageCircle, Eye } from "lucide-react";
import { dummyWhatsAppTemplates } from "../data/dummy-whatsapp-templates";

interface WhatsAppCampaignFormProps {
  mode: "create" | "edit";
  initialValues?: Record<string, any>;
  onSubmit: (data: Record<string, any>) => Promise<void>;
  isLoading?: boolean;
}

const templateNameMap: Record<string, string> = {
  "wtpl-001": "Welcome Message",
  "wtpl-002": "Promotional Offer",
  "wtpl-003": "Event Invitation",
  "wtpl-004": "Follow-up Message",
  "wtpl-005": "Payment Reminder",
  "wtpl-006": "Support Message",
  "wtpl-007": "Feedback Request",
  "wtpl-008": "Custom Follow-up",
};

const samplePlaceholders: Record<string, string> = {
  "{{firstName}}": "John",
  "{{lastName}}": "Doe",
  "{{companyName}}": "Demo Company",
  "{{phone}}": "+44 7700 900000",
  "{{amount}}": "$499",
  "{{dueDate}}": "Jan 15, 2026",
  "{{ticketId}}": "TKT-12345",
  "{{promo}}": "30%",
};

function replacePlaceholders(text: string): string {
  let result = text;
  for (const [placeholder, value] of Object.entries(samplePlaceholders)) {
    result = result.replace(new RegExp(placeholder.replace(/[{}]/g, "\\$&"), "g"), value);
  }
  return result;
}

export default function WhatsAppCampaignForm({
  mode,
  initialValues = {},
  onSubmit,
  isLoading = false,
}: WhatsAppCampaignFormProps) {
  const isEdit = mode === "edit";
  const [showPreview, setShowPreview] = useState(false);
  const [message, setMessage] = useState(initialValues.message || "");
  const [audienceType, setAudienceType] = useState<WhatsAppCampaignAudienceType>(
    initialValues.audienceType || "ALL_CUSTOMERS"
  );
  const [selectedIds, setSelectedIds] = useState<string[]>(
    initialValues.recipientIds || []
  );
  const [templateId, setTemplateId] = useState(initialValues.templateId || "");

  const selectedTemplate = dummyWhatsAppTemplates.find(
    (t) => t.id === templateId
  );

  const handleTemplateChange = (id: string) => {
    setTemplateId(id);
    const template = dummyWhatsAppTemplates.find((t) => t.id === id);
    if (template) {
      setMessage(template.message);
    }
  };

  const handleSubmit = async (data: Record<string, any>) => {
    if (data.templateId && templateNameMap[data.templateId]) {
      data.templateName = templateNameMap[data.templateId];
    }
    data.message = message;
    data.audienceType = audienceType;
    data.recipientIds = selectedIds;
    data.recipientCount = selectedIds.length;
    if (!data.createdBy) {
      data.createdBy = "emp-001";
      data.createdByName = "Rahul Sharma";
    }
    await onSubmit(data);
  };

  const charCount = message.length;
  const maxChars = 4096;

  return (
    <div className="space-y-6">
      <Form
        title={isEdit ? "Edit WhatsApp Campaign" : "Create WhatsApp Campaign"}
        description={
          isEdit
            ? "Update your WhatsApp campaign details"
            : "Create a new WhatsApp bulk messaging campaign"
        }
        fields={whatsappCampaignFields}
        initialValues={initialValues}
        onSubmit={handleSubmit}
        submitLabel={isEdit ? "Update Campaign" : "Create Campaign"}
        cancelPath="/marketing/whatsapp/campaigns"
        isLoading={isLoading}
      />

      {/* Message Section */}
      <div className="rounded-2xl border border-slate-200/50 dark:border-slate-800/50 bg-white dark:bg-slate-900 shadow-sm p-8">
        <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-2">
          WhatsApp Message
        </h2>
        <p className="text-slate-600 dark:text-slate-400 text-sm mb-6">
          Write your message or select a template to auto-populate
        </p>

        <div className="space-y-4">
          {/* Template Selector */}
          <div>
            <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-1">
              Select Template (Optional)
            </label>
            <select
              value={templateId}
              onChange={(e) => handleTemplateChange(e.target.value)}
              className="w-full h-10 rounded-md border border-slate-200 bg-white px-3 text-sm dark:border-slate-700 dark:bg-slate-900"
            >
              <option value="">-- Select a template --</option>
              {dummyWhatsAppTemplates.map((t) => (
                <option key={t.id} value={t.id}>
                  {t.name} ({t.category})
                </option>
              ))}
            </select>
          </div>

          {/* Message Textarea */}
          <div>
            <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-1">
              Message <span className="text-red-500">*</span>
            </label>
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Type your WhatsApp message here... Use {{firstName}}, {{lastName}}, {{companyName}} as placeholders."
              rows={5}
              className="w-full rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
              required
            />
            <div className="flex justify-between items-center mt-1">
              <span className="text-xs text-slate-500">
                {message.length < 3 && message.length > 0
                  ? "Minimum 3 characters required"
                  : ""}
              </span>
              <span
                className={`text-xs font-medium ${
                  charCount > maxChars
                    ? "text-red-500"
                    : "text-slate-500"
                }`}
              >
                {charCount.toLocaleString()} / {maxChars.toLocaleString()}{" "}
                characters
              </span>
            </div>
          </div>

          {/* Available Placeholders */}
          <div>
            <p className="text-xs font-medium text-slate-500 mb-2">
              Available Placeholders:
            </p>
            <div className="flex flex-wrap gap-2">
              {Object.entries(samplePlaceholders).map(([key, value]) => (
                <span
                  key={key}
                  className="inline-flex items-center px-2 py-0.5 rounded text-xs font-mono bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400"
                >
                  {key} &rarr; {value}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Audience Selector */}
      <div className="rounded-2xl border border-slate-200/50 dark:border-slate-800/50 bg-white dark:bg-slate-900 shadow-sm p-8">
        <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-2">
          Select Audience
        </h2>
        <p className="text-slate-600 dark:text-slate-400 text-sm mb-6">
          Choose who will receive this WhatsApp campaign
        </p>
        <WhatsAppAudienceSelector
          audienceType={audienceType}
          selectedIds={selectedIds}
          onChange={(type, ids) => {
            setAudienceType(type);
            setSelectedIds(ids);
          }}
        />
      </div>

      {/* Message Preview */}
      <div className="rounded-2xl border border-slate-200/50 dark:border-slate-800/50 bg-white dark:bg-slate-900 shadow-sm overflow-hidden">
        <button
          type="button"
          onClick={() => setShowPreview(!showPreview)}
          className="w-full px-8 py-4 flex items-center justify-between hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors"
        >
          <div className="flex items-center gap-2">
            <Eye className="h-5 w-5 text-green-600 dark:text-green-400" />
            <span className="font-semibold text-slate-900 dark:text-white">
              Preview WhatsApp Message
            </span>
          </div>
          <span className="text-sm text-slate-500">
            {showPreview ? "Hide Preview" : "Show Preview"}
          </span>
        </button>

        {showPreview && (
          <div className="px-8 pb-6 border-t border-slate-200 dark:border-slate-700">
            <div className="max-w-md mx-auto mt-6">
              {/* WhatsApp-style Chat Bubble */}
              <div className="rounded-2xl bg-white dark:bg-slate-800 border-2 border-slate-200 dark:border-slate-700 overflow-hidden shadow-lg">
                {/* Header */}
                <div className="bg-gradient-to-r from-green-600 to-emerald-600 p-4 text-white flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white/20">
                    <MessageCircle className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="font-semibold text-sm">John Doe</p>
                    <p className="text-xs text-green-200">Online</p>
                  </div>
                </div>

                {/* Chat Area */}
                <div className="p-4 bg-[#e5ddd5] dark:bg-slate-900 min-h-[200px] flex flex-col">
                  <div className="flex justify-start mb-2">
                    <div className="bg-white dark:bg-slate-700 rounded-lg rounded-tl-none px-4 py-3 max-w-[280px] shadow-sm">
                      <p className="text-sm text-slate-800 dark:text-slate-200 whitespace-pre-wrap leading-relaxed">
                        {message
                          ? replacePlaceholders(message)
                          : "Your message will appear here..."}
                      </p>
                      <p className="text-xs text-slate-400 text-right mt-1">
                        {new Date().toLocaleTimeString([], {
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Placeholder Mapping */}
              <div className="mt-4 p-4 rounded-xl bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-700">
                <p className="text-xs font-semibold text-slate-500 mb-2">
                  Placeholder Preview:
                </p>
                <div className="flex flex-wrap gap-2">
                  {Object.entries(samplePlaceholders).map(([key, value]) => (
                    <span
                      key={key}
                      className="inline-flex items-center px-2 py-0.5 rounded text-xs font-mono bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400"
                    >
                      {key} &rarr; {value}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <p className="text-xs text-slate-500 text-center mt-4">
              This is a UI preview only. No WhatsApp messages are sent during
              preview.
            </p>
          </div>
        )}
      </div>

      {/* Schedule Type */}
      <div className="rounded-2xl border border-slate-200/50 dark:border-slate-800/50 bg-white dark:bg-slate-900 shadow-sm p-8">
        <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-4">
          Schedule Type
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {[
            {
              value: "now",
              label: "Send Now",
              desc: "Send immediately after saving",
              gradient: "from-green-500 to-emerald-600",
            },
            {
              value: "later",
              label: "Schedule for Later",
              desc: "Set a specific date & time",
              gradient: "from-blue-500 to-blue-600",
            },
            {
              value: "draft",
              label: "Save as Draft",
              desc: "Save without sending",
              gradient: "from-slate-500 to-slate-600",
            },
          ].map((option) => (
            <button
              key={option.value}
              type="button"
              className={`p-4 rounded-xl border-2 text-left transition-all border-slate-200 dark:border-slate-700 hover:border-green-300 dark:hover:border-green-600`}
            >
              <div
                className={`inline-flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br ${option.gradient} text-white text-xs font-bold mb-2`}
              >
                {option.value === "now" ? "⚡" : option.value === "later" ? "📅" : "📝"}
              </div>
              <p className="text-sm font-semibold text-slate-900 dark:text-white">
                {option.label}
              </p>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                {option.desc}
              </p>
            </button>
          ))}
        </div>
        <p className="text-xs text-amber-600 dark:text-amber-400 mt-4">
          <strong>Important:</strong> "Send Now" will NOT actually send WhatsApp
          messages. It will save the campaign as a local record only.
        </p>
      </div>

      {/* Disclaimer */}
      <div className="rounded-xl bg-gradient-to-br from-amber-50 to-yellow-50 dark:from-amber-950/20 dark:to-yellow-950/20 border border-amber-200 dark:border-amber-800 p-4">
        <p className="text-sm text-amber-700 dark:text-amber-300">
          <strong>Note:</strong> No real WhatsApp messages will be sent. This
          module creates campaign records only. Actual WhatsApp message delivery
          will be handled by backend API integration in a future release.
        </p>
      </div>
    </div>
  );
}

