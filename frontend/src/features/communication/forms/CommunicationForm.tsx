import { Form } from "@/components/common/Form";
import { communicationFields } from "./communicationFields";

interface CommunicationFormProps {
  mode: "create" | "edit";
  initialValues?: Record<string, any>;
  onSubmit: (data: Record<string, any>) => Promise<void>;
  isLoading?: boolean;
}

export default function CommunicationForm({
  mode,
  initialValues = {},
  onSubmit,
  isLoading = false,
}: CommunicationFormProps) {
  const isEdit = mode === "edit";

  const handleSubmit = async (data: Record<string, any>) => {
    // If customerId is empty, remove it
    if (!data.customerId) {
      delete data.customerId;
      delete data.customerName;
    }
    // If leadId is empty, remove it
    if (!data.leadId) {
      delete data.leadId;
      delete data.leadName;
    }
    // If dealId is empty, remove it
    if (!data.dealId) {
      delete data.dealId;
      delete data.dealName;
    }

    // Map customer IDs to names
    const customerMap: Record<string, string> = {
      "1": "Acme Corporation",
      "2": "Tech Solutions Inc",
      "3": "Global Enterprises",
      "4": "Future Tech Group",
      "5": "Innovation Labs",
      "6": "Digital Solutions",
      "7": "Enterprise Systems",
      "8": "Cloud Innovations",
    };

    // Map leadId to leadName
    const leadMap: Record<string, string> = {
      "lead-001": "Rahul Sharma",
      "lead-002": "Priya Verma",
      "lead-003": "Amit Gupta",
    };

    // Map dealId to dealName
    const dealMap: Record<string, string> = {
      "DL-001": "Enterprise Software License",
      "DL-002": "Cloud Migration Services",
      "DL-003": "Annual Support Contract",
      "DL-004": "Security Assessment",
    };

    // Map employee IDs to names
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

    if (data.customerId && customerMap[data.customerId]) {
      data.customerName = customerMap[data.customerId];
    }
    if (data.leadId && leadMap[data.leadId]) {
      data.leadName = leadMap[data.leadId];
    }
    if (data.dealId && dealMap[data.dealId]) {
      data.dealName = dealMap[data.dealId];
    }
    if (data.assignedTo && employeeMap[data.assignedTo]) {
      data.assignedToName = employeeMap[data.assignedTo];
    }

    await onSubmit(data);
  };

  return (
    <Form
      title={isEdit ? "Edit Communication" : "Add Communication"}
      description={
        isEdit
          ? "Update communication details"
          : "Log a new communication record"
      }
      fields={communicationFields}
      initialValues={initialValues}
      onSubmit={handleSubmit}
      submitLabel={isEdit ? "Update Communication" : "Add Communication"}
      cancelPath="/communications"
      isLoading={isLoading}
    />
  );
}

