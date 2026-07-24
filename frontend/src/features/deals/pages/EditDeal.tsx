import DealForm from "../forms/DealForm";

export default function EditDeal() {
  const handleSubmit = async (data: Record<string, any>) => {
    // Yahan useSubmit() se PUT API call
    console.log("Update Deal:", data);
  };

  return (
    <DealForm
      mode="edit"
      initialValues={{}}
      onSubmit={handleSubmit}
    />
  );
}
