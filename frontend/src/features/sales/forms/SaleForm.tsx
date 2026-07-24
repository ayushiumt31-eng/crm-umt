import { Form } from "@/components/common/Form";
import { salesFields } from "./salesFields";

interface SaleFormProps {
  mode: "create" | "edit";
  initialValues?: Record<string, any>;
  onSubmit: (data: Record<string, any>) => Promise<void>;
  isLoading?: boolean;
}

export default function SaleForm({
  mode,
  initialValues = {},
  onSubmit,
  isLoading = false,
}: SaleFormProps) {
  const isEdit = mode === "edit";

  // Pre-process before submit to handle basic finalAmount calculation fallback
  const handleSubmit = async (data: Record<string, any>) => {
    const amount = Number(data.amount) || 0;
    const discount = Number(data.discount) || 0;
    const tax = Number(data.tax) || 0;
    
    // If user didn't type a final amount, auto-calculate it here before saving
    if (!data.finalAmount) {
      data.finalAmount = amount - discount + tax;
    }
    
    await onSubmit(data);
  };

  return (
    <Form
      title={isEdit ? "Edit Sale" : "Record New Sale"}
      description={
        isEdit
          ? "Update sales record details and payment status"
          : "Add a new sales transaction to the system"
      }
      fields={salesFields}
      initialValues={initialValues}
      onSubmit={handleSubmit}
      submitLabel={isEdit ? "Update Sale" : "Save Sale"}
      cancelPath="/sales"
      isLoading={isLoading}
    />
  );
}
