import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import EmailTemplateForm from "../forms/EmailTemplateForm";
import { emailTemplateService } from "../services/emailTemplateService";
import type { EmailTemplate } from "../types/emailTemplate";

export default function EditEmailTemplate() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [template, setTemplate] = useState<EmailTemplate | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (id) {
      emailTemplateService.getEmailTemplateById(id).then((result) => {
        if (result) {
          setTemplate(result);
        }
        setLoading(false);
      });
    }
  }, [id]);

  const handleSubmit = async (data: Record<string, any>) => {
    if (!id) return;
    await emailTemplateService.updateEmailTemplate(id, data as any);
    navigate("/marketing/email-marketing/templates");
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
        <p className="text-slate-500">Email template not found.</p>
        <button
          onClick={() => navigate("/marketing/email-marketing/templates")}
          className="mt-4 text-blue-600 hover:underline"
        >
          Back to Templates
        </button>
      </div>
    );
  }

  return (
    <EmailTemplateForm
      mode="edit"
      initialValues={template}
      onSubmit={handleSubmit}
    />
  );
}

