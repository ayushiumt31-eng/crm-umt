import { Form } from "@/components/common/Form";
import { adCampaignFields } from "./adCampaignFields";

interface AdCampaignFormProps {
  mode: "create" | "edit";
  initialValues?: Record<string, any>;
  onSubmit: (data: Record<string, any>) => Promise<void>;
  isLoading?: boolean;
}

export default function AdCampaignForm({
  mode,
  initialValues = {},
  onSubmit,
  isLoading = false,
}: AdCampaignFormProps) {
  const isEdit = mode === "edit";

  const handleSubmit = async (data: Record<string, any>) => {
    if (!data.createdBy) {
      data.createdBy = "emp-001";
      data.createdByName = "Rahul Sharma";
    }
    if (data.audienceName && data.audienceId === undefined) {
      data.audienceId = `aud-${Math.random().toString(36).substr(2, 9)}`;
    }
    await onSubmit(data);
  };

  return (
    <div className="space-y-6">
      <Form
        title={isEdit ? "Edit Ad Campaign" : "Create Ad Campaign"}
        description={
          isEdit
            ? "Update your ad campaign details"
            : "Create a new ad campaign"
        }
        fields={adCampaignFields}
        initialValues={initialValues}
        onSubmit={handleSubmit}
        submitLabel={isEdit ? "Update Campaign" : "Create Campaign"}
        cancelPath="/marketing/ads"
        isLoading={isLoading}
      />

      {/* Disclaimer */}
      <div className="rounded-xl bg-gradient-to-br from-amber-50 to-yellow-50 dark:from-amber-950/20 dark:to-yellow-950/20 border border-amber-200 dark:border-amber-800 p-4">
        <p className="text-sm text-amber-700 dark:text-amber-300">
          <strong>Note:</strong> No real ads will be published. This module
          creates campaign records only. Actual ad delivery and Meta Ads API
          integration will be available in a future release.
        </p>
      </div>
    </div>
  );
}
