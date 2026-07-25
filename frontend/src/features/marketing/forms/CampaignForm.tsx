import { Form } from "@/components/common/Form";
import { campaignFields } from "./campaignFields";

interface CampaignFormProps {
  mode: "create" | "edit";
  initialValues?: Record<string, any>;
  onSubmit: (data: Record<string, any>) => Promise<void>;
  isLoading?: boolean;
}

const employeeMap: Record<string, string> = {
  "emp-001": "Rahul Sharma",
  "emp-002": "Priya Verma",
  "emp-003": "Amit Kumar",
  "emp-004": "Neha Gupta",
  "emp-005": "Vikas Mehta",
  "emp-006": "Anjali Singh",
  "emp-007": "Rohit Yadav",
  "emp-008": "Simran Kaur",
};

// Map for audience calculation (dummy counts)
const audienceCountMap: Record<string, number> = {
  ALL_CUSTOMERS: 8,
  ALL_LEADS: 3,
  CUSTOMERS: 3,
  LEADS: 1,
  CUSTOM: 0,
};

export default function CampaignForm({
  mode,
  initialValues = {},
  onSubmit,
  isLoading = false,
}: CampaignFormProps) {
  const isEdit = mode === "edit";

  const handleSubmit = async (data: Record<string, any>) => {
    // Map assignedTo to assignedToName
    if (data.assignedTo && employeeMap[data.assignedTo]) {
      data.assignedToName = employeeMap[data.assignedTo];
    }

    // Map createdBy to createdByName (use the same as assigned for new)
    if (!data.createdBy) {
      data.createdBy = data.assignedTo || "emp-001";
      data.createdByName = data.assignedToName || "Rahul Sharma";
    }

    // Auto-calculate audience count if not provided
    if (!data.audienceCount || data.audienceCount === 0) {
      data.audienceCount =
        audienceCountMap[data.audience as string] || 0;
    }

    // Ensure budget is a number or undefined
    if (data.budget === "" || data.budget === null) {
      delete data.budget;
    } else if (data.budget) {
      data.budget = Number(data.budget);
    }

    await onSubmit(data);
  };

  return (
    <Form
      title={isEdit ? "Edit Campaign" : "Create Campaign"}
      description={
        isEdit
          ? "Update campaign details"
          : "Create a new marketing campaign"
      }
      fields={campaignFields}
      initialValues={initialValues}
      onSubmit={handleSubmit}
      submitLabel={isEdit ? "Update Campaign" : "Create Campaign"}
      cancelPath="/marketing/campaigns"
      isLoading={isLoading}
    />
  );
}

