import { useState } from "react";
import { Form } from "@/components/common/Form";
import { whatsappTemplateFields } from "./whatsappTemplateFields";
import { Eye } from "lucide-react";

interface WhatsAppTemplateFormProps {
  mode: "create" | "edit";
  initialValues?: Record<string, any>;
  onSubmit: (data: Record<string, any>) => Promise<void>;
  isLoading?: boolean;
}

const samplePlaceholders: Record<string, string> = {
  "{{firstName}}": "John",
  "{{lastName}}": "Doe",
  "{{companyName}}": "Demo Company",
  "{{phone}}": "+44 7700 900000",
};

function replacePlaceholders(text: string): string {
  let result = text;
  for (const [placeholder, value] of Object.entries(samplePlaceholders)) {
    result = result.replace(
      new RegExp(placeholder.replace(/[{}]/g, "\\$&"), "g"),
      value
    );
  }
  return result;
}

export default function WhatsAppTemplateForm({
  mode,
  initialValues = {},
  onSubmit,
  isLoading = false,
}: WhatsAppTemplateFormProps) {
  const isEdit = mode === "edit";
  const [message, setMessage] = useState(initialValues.message || "");
  const [showPreview, setShowPreview] = useState(false);

  const handleSubmit = async (data: Record<string, any>) => {
    data.message = message;
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
        title={isEdit ? "Edit WhatsApp Template" : "Create WhatsApp Template"}
        description={
          isEdit
            ? "Update your WhatsApp template"
            : "Create a new WhatsApp template for your campaigns"
        }
        fields={whatsappTemplateFields}
        initialValues={initialValues}
        onSubmit={handleSubmit}
        submitLabel={isEdit ? "Update Template" : "Create Template"}
        cancelPath="/marketing/whatsapp/templates"
        isLoading={isLoading}
      />

      {/* Message Section */}
      <div className="rounded-2xl border border-slate-200/50 dark:border-slate-800/50 bg-white dark:bg-slate-900 shadow-sm p-8">
        <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-2">
          Template Message
        </h2>
        <p className="text-slate-600 dark:text-slate-400 text-sm mb-6">
          Write the message content for this template
        </p>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-1">
              Message <span className="text-red-500">*</span>
            </label>
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Write your WhatsApp message template here... Use {{firstName}}, {{lastName}}, {{companyName}}, {{phone}} as placeholders."
              rows={6}
              className="w-full rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
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
                  charCount > maxChars ? "text-red-500" : "text-slate-500"
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

      {/* Preview */}
      <div className="rounded-2xl border border-slate-200/50 dark:border-slate-800/50 bg-white dark:bg-slate-900 shadow-sm overflow-hidden">
        <button
          type="button"
          onClick={() => setShowPreview(!showPreview)}
          className="w-full px-8 py-4 flex items-center justify-between hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors"
        >
          <div className="flex items-center gap-2">
            <Eye className="h-5 w-5 text-purple-600 dark:text-purple-400" />
            <span className="font-semibold text-slate-900 dark:text-white">
              Preview Message
            </span>
          </div>
          <span className="text-sm text-slate-500">
            {showPreview ? "Hide Preview" : "Show Preview"}
          </span>
        </button>

        {showPreview && (
          <div className="px-8 pb-6 border-t border-slate-200 dark:border-slate-700">
            <div className="max-w-md mx-auto mt-6">
              <div className="bg-[#e5ddd5] dark:bg-slate-900 rounded-xl p-4 border-2 border-slate-200 dark:border-slate-700">
                <div className="flex justify-start">
                  <div className="bg-white dark:bg-slate-700 rounded-lg rounded-tl-none px-4 py-3 max-w-[300px] shadow-sm">
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
            <p className="text-xs text-slate-500 text-center mt-4">
              This is a UI preview only. No WhatsApp messages are sent.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

