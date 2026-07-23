
import EmployeeForm from "../forms/EmployeeForm";

export default function EditLead() {
  const handleSubmit = async (data: Record<string, any>) => {
    // Yahan useSubmit() se PUT API call
    console.log("Update Customer:", data);
  };

  return (
    <EmployeeForm
      mode="edit"
      initialValues={{}}
      onSubmit={handleSubmit}
    />
  );
}