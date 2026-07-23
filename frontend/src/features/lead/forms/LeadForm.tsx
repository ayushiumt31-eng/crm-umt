import { Form } from "@/components/common/Form";
import { leadFields } from "./leadFields";

interface LeadFormProps {
  mode: "create" | "edit";
  initialValues?: Record<string, any>;
  onSubmit: (data: Record<string, any>) => Promise<void>;
  isLoading?: boolean;
}

export default function LeadForm({
  mode,
  initialValues = {},
  onSubmit,
  isLoading = false,
}: LeadFormProps) {
  const isEdit = mode === "edit";

  return (
    <Form
      title={isEdit ? "Edit Lead" : "Add Lead"}
      description={
        isEdit
          ? "Update lead details"
          : "Create a new lead"
      }
      fields={leadFields}
      initialValues={initialValues}
      onSubmit={onSubmit}
      submitLabel={isEdit ? "Update Lead" : "Add Lead"}
      cancelPath="/lead"
      isLoading={isLoading}
    />
  );
}