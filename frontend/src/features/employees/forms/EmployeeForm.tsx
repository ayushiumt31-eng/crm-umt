import { DynamicFormWrapper } from "@/features/dynamic-forms/components/DynamicFormWrapper";
import { employeeFields } from "./employeeFields";

interface EmployeeFormProps {
  mode: "create" | "edit";
  initialValues?: Record<string, any>;
  onSubmit: (data: Record<string, any>) => Promise<void>;
  isLoading?: boolean;
}

export default function EmployeeForm({
  mode,
  initialValues = {},
  onSubmit,
  isLoading = false,
}: EmployeeFormProps) {
  const isEdit = mode === "edit";

  return (
    <DynamicFormWrapper
      title={isEdit ? "Edit Employee" : "Add Employee"}
      description={
        isEdit
          ? "Update employees details"
          : "Create a new employees"
      }
      fields={employeeFields}
      initialValues={initialValues}
      onSubmit={onSubmit}
      submitLabel={isEdit ? "Update Employee" : "Add Employee"}
      cancelPath="/employees"
      isLoading={isLoading}
      module="Employees"
      formName="add-employee"
    />
  );
}
