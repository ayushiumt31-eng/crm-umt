import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import WhatsAppTemplateForm from "../forms/WhatsAppTemplateForm";
import { whatsappTemplateService } from "../services/whatsappTemplateService";
import type { WhatsAppTemplate } from "../types/whatsappTemplate";

export default function EditWhatsAppTemplate() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [template, setTemplate] = useState<WhatsAppTemplate | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (id) {
      whatsappTemplateService.getWhatsAppTemplateById(id).then((result) => {
        if (result) {
          setTemplate(result);
        }
        setLoading(false);
      });
    }
  }, [id]);

  const handleSubmit = async (data: Record<string, any>) => {
    if (!id) return;
    await whatsappTemplateService.updateWhatsAppTemplate(id, data as any);
    navigate("/marketing/whatsapp/templates");
  };

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto text-center py-12">
        <p className="text-slate-500">Loading...</p>
      </div>
    );
  }

  if (!template) {
    return (
      <div className="max-w-4xl mx-auto text-center py-12">
        <p className="text-slate-500">WhatsApp template not found.</p>
        <button
          onClick={() => navigate("/marketing/whatsapp/templates")}
          className="mt-4 text-green-600 hover:underline"
        >
          Back to Templates
        </button>
      </div>
    );
  }

  return (
    <WhatsAppTemplateForm
      mode="edit"
      initialValues={template}
      onSubmit={handleSubmit}
    />
  );
}

