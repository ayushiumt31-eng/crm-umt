import CustomerForm from "../forms/CustomerForm";

export default function AddCustomer() {
  const handleSubmit = async (data: Record<string, any>) => {
    // Yahan useSubmit() se POST API call
    console.log("Create Customer:", data);
  };

  return (
    <CustomerForm
      mode="create"
      onSubmit={handleSubmit}
    />
  );
}