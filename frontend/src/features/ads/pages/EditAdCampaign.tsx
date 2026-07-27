import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import AdCampaignForm from "../forms/AdCampaignForm";
import { adCampaignService } from "../services/adCampaignService";
import type { AdCampaign } from "../types/adCampaign";

export default function EditAdCampaign() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [campaign, setCampaign] = useState<AdCampaign | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (id) {
      adCampaignService.getAdCampaignById(id).then((result) => {
        if (result) {
          setCampaign(result);
        }
        setLoading(false);
      });
    }
  }, [id]);

  const handleSubmit = async (data: Record<string, any>) => {
    if (!id) return;
    await adCampaignService.updateAdCampaign(id, data as any);
    navigate("/marketing/ads");
  };

  if (loading) {
    return <div className="max-w-4xl mx-auto text-center py-12"><p className="text-slate-500">Loading...</p></div>;
  }

  if (!campaign) {
    return (
      <div className="max-w-4xl mx-auto text-center py-12">
        <p className="text-slate-500">Ad campaign not found.</p>
        <button onClick={() => navigate("/marketing/ads")} className="mt-4 text-blue-600 hover:underline">Back to Campaigns</button>
      </div>
    );
  }

  return <AdCampaignForm mode="edit" initialValues={campaign} onSubmit={handleSubmit} />;
}
