import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { EmployeeForm } from "../components";
import { useEmployees } from "../hooks/useEmployees";
import { FormModal } from "@/components/common/FormModal";

export function AddEmployee() {
  const navigate = useNavigate();
  const { addEmployee } = useEmployees();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (data: any) => {
    try {
      setIsSubmitting(true);
      await addEmployee(data);
      navigate("/employees");
    } catch (error) {
      console.error("Failed to add employee:", error);
      alert("Failed to add employee. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClose = () => {
    navigate("/employees");
  };

  return (
    <FormModal
      isOpen={true}
      onClose={handleClose}
      title="Add New Employee"
      description="Create a new employee record with all required information"
      size="lg"
    >
      <EmployeeForm
        onSubmit={handleSubmit}
        isLoading={isSubmitting}
        submitLabel="Create Employee"
      />
    </FormModal>
  );
}
