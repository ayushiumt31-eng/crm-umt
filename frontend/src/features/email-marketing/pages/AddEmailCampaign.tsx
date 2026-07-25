import { useNavigate } from "react-router-dom";
import EmailCampaignForm from "../forms/EmailCampaignForm";
import { emailCampaignService } from "../services/emailCampaignService";

export default function AddEmailCampaign() {
  const navigate = useNavigate();

  const handleSubmit = async (data: Record<string, any>) => {
    await emailCampaignService.createEmailCampaign(data as any);
    navigate("/marketing/email-marketing/campaigns");
  };

  return (
    <EmailCampaignForm
      mode="create"
      initialValues={{
        status: "DRAFT",
        scheduledAt: new Date().toISOString().slice(0, 16),
      }}
      onSubmit={handleSubmit}
    />
  );
}

