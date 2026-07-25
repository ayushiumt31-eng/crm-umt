import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import WhatsAppCampaignForm from "../forms/WhatsAppCampaignForm";
import { whatsappCampaignService } from "../services/whatsappCampaignService";
import type { WhatsAppCampaign } from "../types/whatsappCampaign";

export default function EditWhatsAppCampaign() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [campaign, setCampaign] = useState<WhatsAppCampaign | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (id) {
      whatsappCampaignService.getWhatsAppCampaignById(id).then((result) => {
        if (result) {
          setCampaign(result);
        }
        setLoading(false);
      });
    }
  }, [id]);

  const handleSubmit = async (data: Record<string, any>) => {
    if (!id) return;
    await whatsappCampaignService.updateWhatsAppCampaign(id, data as any);
    navigate("/marketing/whatsapp/campaigns");
  };

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto text-center py-12">
        <p className="text-slate-500">Loading...</p>
      </div>
    );
  }

  if (!campaign) {
    return (
      <div className="max-w-4xl mx-auto text-center py-12">
        <p className="text-slate-500">WhatsApp campaign not found.</p>
        <button
          onClick={() => navigate("/marketing/whatsapp/campaigns")}
          className="mt-4 text-green-600 hover:underline"
        >
          Back to Campaigns
        </button>
      </div>
    );
  }

  return (
    <WhatsAppCampaignForm
      mode="edit"
      initialValues={campaign}
      onSubmit={handleSubmit}
    />
  );
}

