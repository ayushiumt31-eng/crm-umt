import { useState } from "react";
import { Form } from "@/components/common/Form";
import { socialPostFields } from "./socialPostFields";
import { SocialPostPreview } from "../components/SocialPostPreview";
import { Eye, BadgeInfo, Share2 } from "lucide-react";
import { dummySocialCampaigns } from "../data/dummy-social-campaigns";

interface SocialPostFormProps {
  mode: "create" | "edit";
  initialValues?: Record<string, any>;
  onSubmit: (data: Record<string, any>) => Promise<void>;
  isLoading?: boolean;
}

const campaignNameMap: Record<string, string> = {
  "sc-001": "Product Launch Q3",
  "sc-002": "Brand Awareness Q3",
  "sc-003": "Sustainability Campaign",
  "sc-004": "Instagram Engagement Push",
  "sc-005": "LinkedIn Thought Leadership",
};

const employeeNameMap: Record<string, string> = {
  "emp-001": "Rahul Sharma",
  "emp-002": "Priya Verma",
  "emp-003": "Amit Kumar",
  "emp-004": "Neha Gupta",
  "emp-005": "Vikas Mehta",
  "emp-006": "Anjali Singh",
  "emp-007": "Rohit Yadav",
  "emp-008": "Simran Kaur",
};

export default function SocialPostForm({
  mode,
  initialValues = {},
  onSubmit,
  isLoading = false,
}: SocialPostFormProps) {
  const isEdit = mode === "edit";
  const [showPreview, setShowPreview] = useState(false);
  const [formState, setFormState] = useState<Record<string, any>>({});

  const handleSubmit = async (data: Record<string, any>) => {
    // Map campaignId to campaignName
    if (data.campaignId && campaignNameMap[data.campaignId]) {
      data.campaignName = campaignNameMap[data.campaignId];
    }

    // Map createdBy to createdByName
    if (data.createdBy && employeeNameMap[data.createdBy]) {
      data.createdByName = employeeNameMap[data.createdBy];
    }

    // Handle schedule type logic
    const scheduleType = data.scheduleType || initialValues.scheduleType;
    if (scheduleType === "DRAFT") {
      data.status = "DRAFT";
      data.scheduledAt = undefined;
    } else if (scheduleType === "PUBLISH_NOW") {
      data.status = "PUBLISHED";
      data.scheduledAt = new Date().toISOString();
    } else if (scheduleType === "SCHEDULE") {
      data.status = "SCHEDULED";
    }

    // Clean up scheduleType from data (not part of the model)
    delete data.scheduleType;

    // Auto-assign createdBy if not set
    if (!data.createdBy) {
      data.createdBy = "emp-001";
      data.createdByName = "Rahul Sharma";
    }

    await onSubmit(data);
  };

  return (
    <div className="space-y-6">
      <Form
        title={isEdit ? "Edit Social Post" : "Create Social Post"}
        description={
          isEdit
            ? "Update your social media post details"
            : "Create a new social media post"
        }
        fields={socialPostFields}
        initialValues={initialValues}
        onSubmit={handleSubmit}
        submitLabel={isEdit ? "Update Post" : "Create Post"}
        cancelPath="/marketing/social-media/posts"
        isLoading={isLoading}
      />

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
              Post Preview
            </span>
          </div>
          <span className="text-sm text-slate-500">
            {showPreview ? "Hide Preview" : "Show Preview"}
          </span>
        </button>

        {showPreview && (
          <div className="px-8 pb-6 border-t border-slate-200 dark:border-slate-700">
            <div className="max-w-lg mx-auto mt-6">
              <SocialPostPreview post={formState} />
            </div>
          </div>
        )}
      </div>

      {/* Disclaimer */}
      <div className="rounded-xl bg-gradient-to-br from-amber-50 to-yellow-50 dark:from-amber-950/20 dark:to-yellow-950/20 border border-amber-200 dark:border-amber-800 p-4">
        <div className="flex items-start gap-3">
          <BadgeInfo className="h-5 w-5 text-amber-600 dark:text-amber-400 mt-0.5 flex-shrink-0" />
          <div>
            <p className="text-sm text-amber-700 dark:text-amber-300">
              <strong>Important:</strong> No real social media posts are
              published. If "Publish Now" is selected, the post status is set to
              PUBLISHED in local data only. Real publishing to Facebook,
              Instagram, and LinkedIn will be available after backend/API
              integration.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

