import { useNavigate, useParams } from "react-router-dom";
import { useState, useMemo } from "react";
import { EmployeeForm } from "../components";
import { useEmployees } from "../hooks/useEmployees";
import { FormModal } from "@/components/common/FormModal";

export function EditEmployee() {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const { getEmployeeById, updateEmployee } = useEmployees();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const employee = useMemo(() => {
    return id ? getEmployeeById(id) : null;
  }, [id, getEmployeeById]);

  const handleSubmit = async (data: any) => {
    if (!id) return;

    try {
      setIsSubmitting(true);
      await updateEmployee(id, data);
      navigate(`/employees/${id}`);
    } catch (error) {
      console.error("Failed to update employee:", error);
      alert("Failed to update employee. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClose = () => {
    navigate("/employees");
  };

  if (!employee) {
    return (
      <FormModal
        isOpen={true}
        onClose={handleClose}
        title="Employee Not Found"
        description="The employee you are trying to edit does not exist"
        size="sm"
      >
        <div className="text-center py-8">
          <p className="text-slate-600 dark:text-slate-400 mb-4">Employee not found</p>
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
      title="Edit Employee"
      description={`Update information for ${employee.firstName} ${employee.lastName}`}
      size="lg"
    >
      <EmployeeForm
        initialData={employee}
        onSubmit={handleSubmit}
        isLoading={isSubmitting}
        submitLabel="Save Changes"
      />
    </FormModal>
  );
}
