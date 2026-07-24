import DealForm from "../forms/DealForm";

export default function AddDeal() {
  const handleSubmit = async (data: Record<string, any>) => {
    // Yahan useSubmit() se POST API call
    console.log("Create Deal:", data);
  };

  return (
    <DealForm
      mode="create"
      onSubmit={handleSubmit}
    />
  );
}
