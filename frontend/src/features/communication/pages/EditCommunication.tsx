import CommunicationForm from "../forms/CommunicationForm";
import { useParams, useNavigate } from "react-router-dom";
import { communicationService } from "../services/communicationService";
import { useState, useEffect } from "react";
import type { Communication } from "../types/communication";

export default function EditCommunication() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [communication, setCommunication] =
    useState<Communication | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (id) {
      communicationService.getCommunicationById(id).then((result) => {
        if (result) {
          setCommunication(result);
        }
        setLoading(false);
      });
    }
  }, [id]);

  const handleSubmit = async (data: Record<string, any>) => {
    if (!id) return;
    await communicationService.updateCommunication(id, data as any);
    navigate("/communications");
  };

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto text-center py-12">
        <p className="text-slate-500">Loading...</p>
      </div>
    );
  }

  if (!communication) {
    return (
      <div className="max-w-4xl mx-auto text-center py-12">
        <p className="text-slate-500">Communication not found.</p>
        <button
          onClick={() => navigate("/communications")}
          className="mt-4 text-blue-600 hover:underline"
        >
          Back to Communications
        </button>
      </div>
    );
  }

  return (
    <CommunicationForm
      mode="edit"
      initialValues={communication}
      onSubmit={handleSubmit}
    />
  );
}

