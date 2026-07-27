import { Form } from "@/components/common/Form";
import { automationFields } from "./automationFields";

interface AutomationFormProps {
  mode: "create" | "edit";
  initialValues?: Record<string, any>;
  onSubmit: (data: Record<string, any>) => Promise<void>;
  isLoading?: boolean;
}

export default function AutomationForm({
  mode,
  initialValues = {},
  onSubmit,
  isLoading = false,
}: AutomationFormProps) {
  const isEdit = mode === "edit";

  const handleSubmit = async (data: Record<string, any>) => {
    if (!data.createdBy) {
      data.createdBy = "emp-001";
      data.createdByName = "Rahul Sharma";
    }
    await onSubmit(data);
  };

  return (
    <div className="space-y-6">
      <Form
        title={isEdit ? "Edit Automation" : "Create Automation"}
        description={
          isEdit
            ? "Update your automation workflow details"
            : "Create a new automation workflow"
        }
        fields={automationFields}
        initialValues={initialValues}
        onSubmit={handleSubmit}
        submitLabel={isEdit ? "Update Automation" : "Create Automation"}
        cancelPath="/marketing/automation"
        isLoading={isLoading}
      />

      {/* Disclaimer */}
      <div className="rounded-xl bg-gradient-to-br from-amber-50 to-yellow-50 dark:from-amber-950/20 dark:to-yellow-950/20 border border-amber-200 dark:border-amber-800 p-4">
        <p className="text-sm text-amber-700 dark:text-amber-300">
          <strong>Note:</strong> This automation will not be executed until it is activated.
          Automation rules will be processed by the backend after integration.
        </p>
      </div>
    </div>
  );
}
