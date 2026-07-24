import { Form } from "@/components/common/Form";
import { dealFields } from "./dealFields";

interface DealFormProps {
  mode: "create" | "edit";
  initialValues?: Record<string, any>;
  onSubmit: (data: Record<string, any>) => Promise<void>;
  isLoading?: boolean;
}

export default function DealForm({
  mode,
  initialValues = {},
  onSubmit,
  isLoading = false,
}: DealFormProps) {
  const isEdit = mode === "edit";

  return (
    <Form
      title={isEdit ? "Edit Deal" : "Create Deal"}
      description={
        isEdit
          ? "Update opportunity and deal details"
          : "Add a new opportunity to your pipeline"
      }
      fields={dealFields}
      initialValues={initialValues}
      onSubmit={onSubmit}
      submitLabel={isEdit ? "Update Deal" : "Create Deal"}
      cancelPath="/deals"
      isLoading={isLoading}
    />
  );
}
