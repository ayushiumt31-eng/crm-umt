import { useNavigate } from "react-router-dom";
import SocialCampaignForm from "../forms/SocialCampaignForm";
import { socialCampaignService } from "../services/socialCampaignService";

export default function AddSocialCampaign() {
  const navigate = useNavigate();

  const handleSubmit = async (data: Record<string, any>) => {
    await socialCampaignService.createSocialCampaign(data as any);
    navigate("/marketing/social-media/campaigns");
  };

  return (
    <SocialCampaignForm
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

