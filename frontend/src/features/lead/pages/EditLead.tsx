
import LeadForm from "../forms/LeadForm";

export default function EditLead() {
  const handleSubmit = async (data: Record<string, any>) => {
    // Yahan useSubmit() se PUT API call
    console.log("Update Customer:", data);
  };

  return (
    <LeadForm
      mode="edit"
      initialValues={{}}
      onSubmit={handleSubmit}
    />
  );
}