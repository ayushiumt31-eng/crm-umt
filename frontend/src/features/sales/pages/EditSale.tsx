import SaleForm from "../forms/SaleForm";
import { useParams, useNavigate } from "react-router-dom";
import { dummySales } from "../data/dummy-sales";

export default function EditSale() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const sale = dummySales.find((s) => s.id === id);

  const handleSubmit = async (data: Record<string, any>) => {
    // API call stub
    console.log("Update Sale:", data);
    await new Promise(resolve => setTimeout(resolve, 800));
    navigate("/sales");
  };

  if (!sale) {
    return (
      <div className="max-w-4xl mx-auto text-center py-12">
        <p className="text-slate-500">Sale not found.</p>
        <button onClick={() => navigate("/sales")} className="mt-4 text-blue-600 hover:underline">
          Back to Sales
        </button>
      </div>
    );
  }

  return (
    <SaleForm
      mode="edit"
      initialValues={sale}
      onSubmit={handleSubmit}
    />
  );
}
