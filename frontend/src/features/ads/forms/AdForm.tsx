import { Form } from "@/components/common/Form";
import { adFields } from "./adFields";

interface AdFormProps {
  mode: "create" | "edit";
  initialValues?: Record<string, any>;
  onSubmit: (data: Record<string, any>) => Promise<void>;
  isLoading?: boolean;
}

const adSetNameMap: Record<string, string> = {
  "ads-001": "EV Awareness - Urban Professionals",
  "ads-002": "EV Awareness - Tech Enthusiasts",
  "ads-003": "Solar Leads - Metro Cities",
  "ads-004": "Renewable Energy - Instagram",
  "ads-005": "Business Growth - Enterprise",
  "ads-006": "EV Charging - App Install",
  "ads-007": "Solar Installation - Q4",
  "ads-008": "Brand Awareness - Stories",
  "ads-009": "Engagement - Video Ads",
  "ads-010": "Festive Offers - All Segments",
};

const campaignNameByAdSet: Record<string, { campaignId: string; campaignName: string }> = {
  "ads-001": { campaignId: "adc-001", campaignName: "EV Awareness Campaign" },
  "ads-002": { campaignId: "adc-001", campaignName: "EV Awareness Campaign" },
  "ads-003": { campaignId: "adc-002", campaignName: "Solar Energy Campaign" },
  "ads-004": { campaignId: "adc-003", campaignName: "Renewable Energy Leads" },
  "ads-005": { campaignId: "adc-004", campaignName: "Business Growth Campaign" },
  "ads-006": { campaignId: "adc-005", campaignName: "EV Charging Campaign" },
  "ads-007": { campaignId: "adc-006", campaignName: "Solar Installation Campaign" },
  "ads-008": { campaignId: "adc-007", campaignName: "Brand Awareness Campaign" },
  "ads-009": { campaignId: "adc-008", campaignName: "Engagement Boost Campaign" },
  "ads-010": { campaignId: "adc-010", campaignName: "Festival Offer Campaign" },
};

export default function AdForm({
  mode,
  initialValues = {},
  onSubmit,
  isLoading = false,
}: AdFormProps) {
  const isEdit = mode === "edit";

  const handleSubmit = async (data: Record<string, any>) => {
    if (data.adSetId && adSetNameMap[data.adSetId]) {
      data.adSetName = adSetNameMap[data.adSetId];
    }
    if (data.adSetId && campaignNameByAdSet[data.adSetId]) {
      data.campaignId = campaignNameByAdSet[data.adSetId].campaignId;
      data.campaignName = campaignNameByAdSet[data.adSetId].campaignName;
    }
    await onSubmit(data);
  };

  return (
    <div className="space-y-6">
      <Form
        title={isEdit ? "Edit Ad" : "Create Ad"}
        description={
          isEdit
            ? "Update your ad creative details"
            : "Create a new ad creative for your campaign"
        }
        fields={adFields}
        initialValues={initialValues}
        onSubmit={handleSubmit}
        submitLabel={isEdit ? "Update Ad" : "Create Ad"}
        cancelPath="/marketing/ads/ads"
        isLoading={isLoading}
      />
    </div>
  );
}
