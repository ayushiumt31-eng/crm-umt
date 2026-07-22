// import { CustomerForm } from "customerform";

import CustomerForm from "../forms/CustomerForm";

export default function EditCustomer() {
  const handleSubmit = async (data: Record<string, any>) => {
    // Yahan useSubmit() se PUT API call
    console.log("Update Customer:", data);
  };

  return (
    <CustomerForm
      mode="edit"
      initialValues={{}}
      onSubmit={handleSubmit}
    />
  );
}