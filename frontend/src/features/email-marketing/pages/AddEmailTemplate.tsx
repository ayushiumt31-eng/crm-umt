import { useNavigate } from "react-router-dom";
import EmailTemplateForm from "../forms/EmailTemplateForm";
import { emailTemplateService } from "../services/emailTemplateService";

export default function AddEmailTemplate() {
  const navigate = useNavigate();

  const handleSubmit = async (data: Record<string, any>) => {
    await emailTemplateService.createEmailTemplate(data as any);
    navigate("/marketing/email-marketing/templates");
  };

  return (
    <EmailTemplateForm
      mode="create"
      initialValues={{
        status: "ACTIVE",
        category: "CUSTOM",
      }}
      onSubmit={handleSubmit}
    />
  );
}

