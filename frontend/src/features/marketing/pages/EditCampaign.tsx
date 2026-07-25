import CampaignForm from "../forms/CampaignForm";
import { useParams, useNavigate } from "react-router-dom";
import { campaignService } from "../services/campaignService";
import { useState, useEffect } from "react";
import type { Campaign } from "../types/campaign";

export default function EditCampaign() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [campaign, setCampaign] = useState<Campaign | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (id) {
      campaignService.getCampaignById(id).then((result) => {
        if (result) {
          setCampaign(result);
        }
        setLoading(false);
      });
    }
  }, [id]);

  const handleSubmit = async (data: Record<string, any>) => {
    if (!id) return;
    await campaignService.updateCampaign(id, data as any);
    navigate("/marketing/campaigns");
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
        <p className="text-slate-500">Campaign not found.</p>
        <button
          onClick={() => navigate("/marketing/campaigns")}
          className="mt-4 text-blue-600 hover:underline"
        >
          Back to Campaigns
        </button>
      </div>
    );
  }

  return (
    <CampaignForm
      mode="edit"
      initialValues={campaign}
      onSubmit={handleSubmit}
    />
  );
}
