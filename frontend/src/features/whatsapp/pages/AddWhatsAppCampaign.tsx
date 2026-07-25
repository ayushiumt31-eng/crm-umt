import { useNavigate } from "react-router-dom";
import WhatsAppCampaignForm from "../forms/WhatsAppCampaignForm";
import { whatsappCampaignService } from "../services/whatsappCampaignService";

export default function AddWhatsAppCampaign() {
  const navigate = useNavigate();

  const handleSubmit = async (data: Record<string, any>) => {
    await whatsappCampaignService.createWhatsAppCampaign(data as any);
    navigate("/marketing/whatsapp/campaigns");
  };

  return (
    <WhatsAppCampaignForm
      mode="create"
      initialValues={{
        status: "DRAFT",
        scheduledAt: new Date().toISOString().slice(0, 16),
      }}
      onSubmit={handleSubmit}
    />
  );
}

