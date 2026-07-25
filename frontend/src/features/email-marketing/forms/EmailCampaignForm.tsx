import { useState } from "react";
import { Form } from "@/components/common/Form";
import { emailCampaignFields } from "./emailCampaignFields";
import { EmailAudienceSelector } from "../components/EmailAudienceSelector";
import type { EmailCampaignAudienceType } from "../types/emailCampaign";
import { Mail, Eye } from "lucide-react";
import { dummyEmailTemplates } from "../data/dummy-email-templates";

interface EmailCampaignFormProps {
  mode: "create" | "edit";
  initialValues?: Record<string, any>;
  onSubmit: (data: Record<string, any>) => Promise<void>;
  isLoading?: boolean;
}

const templateNameMap: Record<string, string> = {
  "etpl-001": "Welcome Email",
  "etpl-002": "Summer Sale Promotion",
  "etpl-003": "Monthly Newsletter",
  "etpl-004": "Follow-up After Demo",
  "etpl-005": "Payment Reminder",
  "etpl-006": "New Feature Announcement",
  "etpl-007": "Custom Follow-up",
  "etpl-008": "Re-engagement Campaign",
};

function replacePlaceholders(text: string, sample: Record<string, string>): string {
  return text
    .replace(/\{\{firstName\}\}/g, sample.firstName)
    .replace(/\{\{lastName\}\}/g, sample.lastName)
    .replace(/\{\{companyName\}\}/g, sample.companyName)
    .replace(/\{\{email\}\}/g, sample.email);
}

export default function EmailCampaignForm({
  mode,
  initialValues = {},
  onSubmit,
  isLoading = false,
}: EmailCampaignFormProps) {
  const isEdit = mode === "edit";
  const [showPreview, setShowPreview] = useState(false);
  const [audienceType, setAudienceType] = useState<EmailCampaignAudienceType>(
    initialValues.audienceType || "ALL_CUSTOMERS"
  );
  const [selectedIds, setSelectedIds] = useState<string[]>(
    initialValues.recipientIds || []
  );
  const [formState, setFormState] =
    useState<Record<string, any>>(initialValues);

  const selectedTemplate = dummyEmailTemplates.find(
    (t) => t.id === formState.templateId
  );

  const sampleData = {
    firstName: "John",
    lastName: "Doe",
    companyName: "Demo Company",
    email: "john@example.com",
  };

  const handleSubmit = async (data: Record<string, any>) => {
    if (data.templateId && templateNameMap[data.templateId]) {
      data.templateName = templateNameMap[data.templateId];
    }
    data.audienceType = audienceType;
    data.recipientIds = selectedIds;
    data.recipientCount = selectedIds.length;
    if (!data.createdBy) {
      data.createdBy = "emp-001";
      data.createdByName = "Rahul Sharma";
    }
    await onSubmit(data);
  };

  const fromEmail = "noreply@democompany.com";

  return (
    <div className="space-y-6">
      <Form
        title={isEdit ? "Edit Email Campaign" : "Create Email Campaign"}
        description={
          isEdit
            ? "Update your email campaign details"
            : "Create a new bulk email campaign"
        }
        fields={emailCampaignFields}
        initialValues={initialValues}
        onSubmit={handleSubmit}
        submitLabel={isEdit ? "Update Campaign" : "Create Campaign"}
        cancelPath="/marketing/email-marketing/campaigns"
        isLoading={isLoading}
      />

      {/* Audience Selector */}
      <div className="rounded-2xl border border-slate-200/50 dark:border-slate-800/50 bg-white dark:bg-slate-900 shadow-sm p-8">
        <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-2">
          Select Audience
        </h2>
        <p className="text-slate-600 dark:text-slate-400 text-sm mb-6">
          Choose who will receive this email campaign
        </p>
        <EmailAudienceSelector
          audienceType={audienceType}
          selectedIds={selectedIds}
          onChange={(type, ids) => {
            setAudienceType(type);
            setSelectedIds(ids);
          }}
        />
      </div>

      {/* Preview Section */}
      <div className="rounded-2xl border border-slate-200/50 dark:border-slate-800/50 bg-white dark:bg-slate-900 shadow-sm overflow-hidden">
        <button
          type="button"
          onClick={() => setShowPreview(!showPreview)}
          className="w-full px-8 py-4 flex items-center justify-between hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors"
        >
          <div className="flex items-center gap-2">
            <Eye className="h-5 w-5 text-blue-600 dark:text-blue-400" />
            <span className="font-semibold text-slate-900 dark:text-white">
              Preview Campaign
            </span>
          </div>
          <span className="text-sm text-slate-500">
            {showPreview ? "Hide Preview" : "Show Preview"}
          </span>
        </button>

        {showPreview && (
          <div className="px-8 pb-6 border-t border-slate-200 dark:border-slate-700">
            <div className="max-w-2xl mx-auto mt-6 rounded-xl border-2 border-slate-200 dark:border-slate-700 overflow-hidden">
              {/* Email Header */}
              <div className="bg-gradient-to-r from-blue-600 to-blue-700 p-4 text-white">
                <div className="flex items-center gap-2 mb-1">
                  <Mail className="h-4 w-4" />
                  <span className="text-sm font-medium">Email Preview</span>
                </div>
                <p className="text-xs text-blue-200">
                  {'From: Demo Company <'}{fromEmail}{'>'}
                </p>
              </div>

              {/* Email Content */}
              <div className="p-6 bg-white dark:bg-slate-900">
                <div className="space-y-3">
                  <div>
                    <p className="text-xs font-medium text-slate-500 uppercase tracking-wide">
                      Subject
                    </p>
                    <p className="text-lg font-bold text-slate-900 dark:text-white">
                      {formState.subject || "(No subject)"}
                    </p>
                  </div>

                  <div>
                    <p className="text-xs font-medium text-slate-500 uppercase tracking-wide">
                      To
                    </p>
<p className="text-sm text-slate-700 dark:text-slate-300">
                      {sampleData.firstName} {sampleData.lastName} {'<'}{sampleData.email}{'>'}
                    </p>
                  </div>

                  <hr className="border-slate-200 dark:border-slate-700" />

                  <div>
                    <p className="text-xs font-medium text-slate-500 uppercase tracking-wide mb-2">
                      Email Body
                    </p>
                    <div
                      className="prose prose-sm max-w-none dark:prose-invert text-slate-700 dark:text-slate-300"
                      dangerouslySetInnerHTML={{
                        __html: selectedTemplate
                          ? replacePlaceholders(
                              selectedTemplate.body,
                              sampleData
                            )
                          : "<p>Select a template to preview the email body</p>",
                      }}
                    />
                  </div>

                  <hr className="border-slate-200 dark:border-slate-700" />

                  <div>
                    <p className="text-xs font-medium text-slate-500 uppercase tracking-wide">
                      Placeholder Preview
                    </p>
                    <div className="flex flex-wrap gap-2 mt-1">
                      {Object.entries(sampleData).map(([key, value]) => (
                        <span
                          key={key}
                          className="inline-flex items-center px-2 py-0.5 rounded text-xs font-mono bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400"
                        >
                          {'{{'}{key}{'}}'} &rarr; {value}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <p className="text-xs text-slate-500 text-center mt-4">
              This is a UI preview only. No emails are sent during preview.
            </p>
          </div>
        )}
      </div>

      {/* Disclaimer */}
      <div className="rounded-xl bg-gradient-to-br from-amber-50 to-yellow-50 dark:from-amber-950/20 dark:to-yellow-950/20 border border-amber-200 dark:border-amber-800 p-4">
        <p className="text-sm text-amber-700 dark:text-amber-300">
          <strong>Note:</strong> No real emails will be sent. This module
          creates campaign records only. Actual email delivery will be handled
          by backend API integration in a future release.
        </p>
      </div>
    </div>
  );
}
