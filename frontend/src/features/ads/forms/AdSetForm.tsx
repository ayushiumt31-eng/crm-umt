import { Form } from "@/components/common/Form";
import { adSetFields } from "./adSetFields";

interface AdSetFormProps {
  mode: "create" | "edit";
  initialValues?: Record<string, any>;
  onSubmit: (data: Record<string, any>) => Promise<void>;
  isLoading?: boolean;
}

const campaignNameMap: Record<string, string> = {
  "adc-001": "EV Awareness Campaign",
  "adc-002": "Solar Energy Campaign",
  "adc-003": "Renewable Energy Leads",
  "adc-004": "Business Growth Campaign",
  "adc-005": "EV Charging Campaign",
  "adc-006": "Solar Installation Campaign",
  "adc-007": "Brand Awareness Campaign",
  "adc-008": "Engagement Boost Campaign",
  "adc-009": "Green Energy Awareness",
  "adc-010": "Festival Offer Campaign",
};

export default function AdSetForm({
  mode,
  initialValues = {},
  onSubmit,
  isLoading = false,
}: AdSetFormProps) {
  const isEdit = mode === "edit";

  const handleSubmit = async (data: Record<string, any>) => {
    if (data.campaignId && campaignNameMap[data.campaignId]) {
      data.campaignName = campaignNameMap[data.campaignId];
    }
    await onSubmit(data);
  };

  return (
    <Form
      title={isEdit ? "Edit Ad Set" : "Create Ad Set"}
      description={
        isEdit
          ? "Update your ad set details"
          : "Create a new ad set for your campaign"
      }
      fields={adSetFields}
      initialValues={initialValues}
      onSubmit={handleSubmit}
      submitLabel={isEdit ? "Update Ad Set" : "Create Ad Set"}
      cancelPath="/marketing/ads/sets"
      isLoading={isLoading}
    />
  );
}
