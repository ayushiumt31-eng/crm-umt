import CommunicationForm from "../forms/CommunicationForm";
import { useNavigate } from "react-router-dom";
import { communicationService } from "../services/communicationService";

export default function AddCommunication() {
  const navigate = useNavigate();

  const handleSubmit = async (data: Record<string, any>) => {
    await communicationService.createCommunication(data as any);
    navigate("/communications");
  };

  return (
    <CommunicationForm
      mode="create"
      initialValues={{
        status: "DRAFT",
        communicationDate: new Date().toISOString().split("T")[0],
      }}
      onSubmit={handleSubmit}
    />
  );
}

