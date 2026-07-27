import { Form } from "@/components/common/Form";
import { socialCampaignFields } from "./socialCampaignFields";

interface SocialCampaignFormProps {
  mode: "create" | "edit";
  initialValues?: Record<string, any>;
  onSubmit: (data: Record<string, any>) => Promise<void>;
  isLoading?: boolean;
}

const employeeNameMap: Record<string, string> = {
  "emp-001": "Rahul Sharma",
  "emp-002": "Priya Verma",
  "emp-003": "Amit Kumar",
  "emp-004": "Neha Gupta",
  "emp-005": "Vikas Mehta",
  "emp-006": "Anjali Singh",
  "emp-007": "Rohit Yadav",
  "emp-008": "Simran Kaur",
};

export default function SocialCampaignForm({
  mode,
  initialValues = {},
  onSubmit,
  isLoading = false,
}: SocialCampaignFormProps) {
  const isEdit = mode === "edit";

  const handleSubmit = async (data: Record<string, any>) => {
    // Convert platform string to array
    if (data.platforms && typeof data.platforms === "string") {
      data.platforms = [data.platforms];
    }

    // Map createdBy to createdByName
    if (data.createdBy && employeeNameMap[data.createdBy]) {
      data.createdByName = employeeNameMap[data.createdBy];
    }

    // Auto-assign createdBy if not set
    if (!data.createdBy) {
      data.createdBy = "emp-001";
      data.createdByName = "Rahul Sharma";
    }

    // Convert comma-separated postIds to array
    if (data.postIds && typeof data.postIds === "string") {
      const ids = data.postIds
        .split(",")
        .map((id: string) => id.trim())
        .filter(Boolean);
      data.postIds = ids;
      data.totalPosts = ids.length;
    }

    await onSubmit(data);
  };

  return (
    <div className="space-y-6">
      <Form
        title={isEdit ? "Edit Social Campaign" : "Create Social Campaign"}
        description={
          isEdit
            ? "Update your social media campaign details"
            : "Create a new social media campaign"
        }
        fields={socialCampaignFields}
        initialValues={initialValues}
        onSubmit={handleSubmit}
        submitLabel={isEdit ? "Update Campaign" : "Create Campaign"}
        cancelPath="/marketing/social-media/campaigns"
        isLoading={isLoading}
      />
    </div>
  );
}

