import { useNavigate, useParams } from "react-router-dom";
import { useState, useMemo } from "react";
import { LeadForm } from "../components";
import { useLeads } from "../hooks/useLeads";
import { FormModal } from "@/components/common/FormModal";

export function EditLead() {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const { getLeadById, updateLead, assignedEmployees } = useLeads();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const lead = useMemo(() => {
    return id ? getLeadById(id) : null;
  }, [id, getLeadById]);

  const handleSubmit = async (data: any) => {
    if (!id) return;

    try {
      setIsSubmitting(true);
      await updateLead(id, data);
      navigate(`/leads/${id}`);
    } catch (error) {
      console.error("Failed to update lead:", error);
      alert("Failed to update lead. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClose = () => {
    navigate("/leads");
  };

  if (!lead) {
    return (
      <FormModal
        isOpen={true}
        onClose={handleClose}
        title="Lead Not Found"
        description="The lead you are trying to edit does not exist"
        size="sm"
      >
        <div className="text-center py-8">
          <p className="text-slate-600 dark:text-slate-400 mb-4">Lead not found</p>
          <button
            onClick={handleClose}
            className="inline-flex items-center gap-2 rounded-lg bg-gradient-to-r from-blue-600 to-cyan-600 px-6 py-2 font-semibold text-white shadow-lg hover:shadow-xl transition-all duration-200"
          >
            Go Back
          </button>
        </div>
      </FormModal>
    );
  }

  return (
    <FormModal
      isOpen={true}
      onClose={handleClose}
      title="Edit Lead"
      description={`Update information for ${lead.leadName}`}
      size="lg"
    >
      <LeadForm
        initialData={lead}
        assignedEmployees={assignedEmployees}
        onSubmit={handleSubmit}
        isLoading={isSubmitting}
        submitLabel="Save Changes"
      />
    </FormModal>
  );
}
