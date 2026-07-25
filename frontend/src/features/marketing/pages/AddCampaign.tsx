import CampaignForm from "../forms/CampaignForm";
import { useNavigate } from "react-router-dom";
import { campaignService } from "../services/campaignService";

export default function AddCampaign() {
  const navigate = useNavigate();

  const handleSubmit = async (data: Record<string, any>) => {
    await campaignService.createCampaign(data as any);
    navigate("/marketing/campaigns");
  };

  return (
    <CampaignForm
      mode="create"
      initialValues={{
        status: "DRAFT",
        startDate: new Date().toISOString().split("T")[0],
        endDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000)
          .toISOString()
          .split("T")[0],
      }}
      onSubmit={handleSubmit}
    />
  );
}
