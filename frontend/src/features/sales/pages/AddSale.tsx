import SaleForm from "../forms/SaleForm";
import { useNavigate } from "react-router-dom";

export default function AddSale() {
  const navigate = useNavigate();

  const handleSubmit = async (data: Record<string, any>) => {
    // API call stub
    console.log("Create Sale:", data);
    await new Promise(resolve => setTimeout(resolve, 800));
    navigate("/sales");
  };

  return (
    <SaleForm
      mode="create"
      initialValues={{
        saleDate: new Date().toISOString().split("T")[0],
        status: "DRAFT",
        paymentStatus: "PENDING",
      }}
      onSubmit={handleSubmit}
    />
  );
}
