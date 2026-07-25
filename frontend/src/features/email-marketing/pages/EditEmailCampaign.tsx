import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import EmailCampaignForm from "../forms/EmailCampaignForm";
import { emailCampaignService } from "../services/emailCampaignService";
import type { EmailCampaign } from "../types/emailCampaign";

export default function EditEmailCampaign() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [campaign, setCampaign] = useState<EmailCampaign | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (id) {
      emailCampaignService.getEmailCampaignById(id).then((result) => {
        if (result) {
          setCampaign(result);
        }
        setLoading(false);
      });
    }
  }, [id]);

  const handleSubmit = async (data: Record<string, any>) => {
    if (!id) return;
    await emailCampaignService.updateEmailCampaign(id, data as any);
    navigate("/marketing/email-marketing/campaigns");
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
        <p className="text-slate-500">Email campaign not found.</p>
        <button
          onClick={() => navigate("/marketing/email-marketing/campaigns")}
          className="mt-4 text-blue-600 hover:underline"
        >
          Back to Campaigns
        </button>
      </div>
    );
  }

  return (
    <EmailCampaignForm
      mode="edit"
      initialValues={campaign}
      onSubmit={handleSubmit}
    />
  );
}

