import { Form } from "@/components/common/Form";
import { payrollFields } from "./payrollFields";

interface PayrollFormProps {
  mode: "create" | "edit";
  initialValues?: Record<string, any>;
  onSubmit: (data: Record<string, any>) => Promise<void>;
  isLoading?: boolean;
}

export default function PayrollForm({
  mode,
  initialValues = {},
  onSubmit,
  isLoading = false,
}: PayrollFormProps) {
  const isEdit = mode === "edit";

  return (
    <Form
      title={isEdit ? "Edit Payroll" : "Add Payroll"}
      description={
        isEdit
          ? "Update the payroll details for the employee"
          : "Create a new payroll record for an employee"
      }
      fields={payrollFields}
      initialValues={initialValues}
      onSubmit={onSubmit}
      submitLabel={isEdit ? "Update Payroll" : "Create Payroll"}
      cancelPath="/payroll"
      isLoading={isLoading}
    />
  );
}

