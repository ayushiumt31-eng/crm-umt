import { useNavigate } from "react-router-dom";
import AdSetForm from "../forms/AdSetForm";
import { adSetService } from "../services/adSetService";

export default function AddAdSet() {
  const navigate = useNavigate();

  const handleSubmit = async (data: Record<string, any>) => {
    await adSetService.createAdSet(data as any);
    navigate("/marketing/ads/sets");
  };

  return (
    <AdSetForm
      mode="create"
      initialValues={{
        status: "DRAFT",
        startDate: new Date().toISOString().split("T")[0],
        endDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split("T")[0],
      }}
      onSubmit={handleSubmit}
    />
  );
}
