import { Form } from "@/components/common/Form";
import { emailTemplateFields } from "./emailTemplateFields";

interface EmailTemplateFormProps {
  mode: "create" | "edit";
  initialValues?: Record<string, any>;
  onSubmit: (data: Record<string, any>) => Promise<void>;
  isLoading?: boolean;
}

export default function EmailTemplateForm({
  mode,
  initialValues = {},
  onSubmit,
  isLoading = false,
}: EmailTemplateFormProps) {
  const isEdit = mode === "edit";

  const handleSubmit = async (data: Record<string, any>) => {
    // Map createdBy if not set
    if (!data.createdBy) {
      data.createdBy = "emp-001";
      data.createdByName = "Rahul Sharma";
    }

    await onSubmit(data);
  };

  return (
    <Form
      title={isEdit ? "Edit Email Template" : "Create Email Template"}
      description={
        isEdit
          ? "Update your email template"
          : "Create a new email template for your campaigns"
      }
      fields={emailTemplateFields}
      initialValues={initialValues}
      onSubmit={handleSubmit}
      submitLabel={isEdit ? "Update Template" : "Create Template"}
      cancelPath="/marketing/email-marketing/templates"
      isLoading={isLoading}
    />
  );
}

