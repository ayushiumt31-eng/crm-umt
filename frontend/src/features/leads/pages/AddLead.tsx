import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { LeadForm } from "../components";
import { useLeads } from "../hooks/useLeads";
import { FormModal } from "@/components/common/FormModal";

export function AddLead() {
  const navigate = useNavigate();
  const { addLead, assignedEmployees } = useLeads();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (data: any) => {
    try {
      setIsSubmitting(true);
      await addLead(data);
      navigate("/leads");
    } catch (error) {
      console.error("Failed to add lead:", error);
      alert("Failed to add lead. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClose = () => {
    navigate("/leads");
  };

  return (
    <FormModal
      isOpen={true}
      onClose={handleClose}
      title="Add New Lead"
      description="Create a new lead and track it through your sales pipeline"
      size="lg"
    >
      <LeadForm
        assignedEmployees={assignedEmployees}
        onSubmit={handleSubmit}
        isLoading={isSubmitting}
        submitLabel="Create Lead"
      />
    </FormModal>
  );
}
