import { useNavigate } from "react-router-dom";
import WhatsAppTemplateForm from "../forms/WhatsAppTemplateForm";
import { whatsappTemplateService } from "../services/whatsappTemplateService";

export default function AddWhatsAppTemplate() {
  const navigate = useNavigate();

  const handleSubmit = async (data: Record<string, any>) => {
    await whatsappTemplateService.createWhatsAppTemplate(data as any);
    navigate("/marketing/whatsapp/templates");
  };

  return (
    <WhatsAppTemplateForm
      mode="create"
      initialValues={{ status: "ACTIVE" }}
      onSubmit={handleSubmit}
    />
  );
}

