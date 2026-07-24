
import RoleForm from "../forms/RoleForm";

export default function EditRole() {
  const handleSubmit = async (data: Record<string, any>) => {
    // Yahan useSubmit() se PUT API call
    console.log("Update Customer:", data);
  };

  return (
    <RoleForm
      mode="edit"
      initialValues={{}}
      onSubmit={handleSubmit}
    />
  );
}