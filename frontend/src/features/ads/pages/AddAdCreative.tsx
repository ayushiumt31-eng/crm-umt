import { useNavigate } from "react-router-dom";
import AdForm from "../forms/AdForm";
import { adService } from "../services/adService";

export default function AddAdCreative() {
  const navigate = useNavigate();

  const handleSubmit = async (data: Record<string, any>) => {
    await adService.createAd(data as any);
    navigate("/marketing/ads/ads");
  };

  return (
    <AdForm
      mode="create"
      initialValues={{
        status: "DRAFT",
        platform: "FACEBOOK",
        callToAction: "LEARN_MORE",
      }}
      onSubmit={handleSubmit}
    />
  );
}
