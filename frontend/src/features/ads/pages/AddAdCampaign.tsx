import { useNavigate } from "react-router-dom";
import AdCampaignForm from "../forms/AdCampaignForm";
import { adCampaignService } from "../services/adCampaignService";

export default function AddAdCampaign() {
  const navigate = useNavigate();

  const handleSubmit = async (data: Record<string, any>) => {
    await adCampaignService.createAdCampaign(data as any);
    navigate("/marketing/ads");
  };

  return (
    <AdCampaignForm
      mode="create"
      initialValues={{
        status: "DRAFT",
        budgetType: "DAILY",
        platform: "FACEBOOK",
        objective: "BRAND_AWARENESS",
        startDate: new Date().toISOString().split("T")[0],
        endDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split("T")[0],
      }}
      onSubmit={handleSubmit}
    />
  );
}
