import { Form } from "@/components/common/Form";
import { customerFields } from "./customerFields";
// import { customerFields } from "./customerFields";

interface CustomerFormProps {
  mode: "create" | "edit";
  initialValues?: Record<string, any>;
  onSubmit: (data: Record<string, any>) => Promise<void>;
  isLoading?: boolean;
}

export default function CustomerForm({
  mode,
  initialValues = {},
  onSubmit,
  isLoading = false,
}: CustomerFormProps) {
  const isEdit = mode === "edit";

  return (
    <Form
      title={isEdit ? "Edit Customer" : "Add Customer"}
      description={
        isEdit
          ? "Update customer details"
          : "Create a new customer"
      }
      fields={customerFields}
      initialValues={initialValues}
      onSubmit={onSubmit}
      submitLabel={isEdit ? "Update Customer" : "Add Customer"}
      cancelPath="/customers"
      isLoading={isLoading}
    />
  );
}