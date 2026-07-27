import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import AutomationForm from "../forms/AutomationForm";
import { automationService } from "../services/automationService";
import type { Automation } from "../types/automation";

export default function EditAutomation() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [automation, setAutomation] = useState<Automation | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (id) {
      automationService.getAutomationById(id).then((result) => {
        if (result) {
          setAutomation(result);
        }
        setLoading(false);
      });
    }
  }, [id]);

  const handleSubmit = async (data: Record<string, any>) => {
    if (!id) return;
    await automationService.updateAutomation(id, data as any);
    navigate("/marketing/automation");
  };

  if (loading) {
    return <div className="max-w-4xl mx-auto text-center py-12"><p className="text-slate-500">Loading...</p></div>;
  }

  if (!automation) {
    return (
      <div className="max-w-4xl mx-auto text-center py-12">
        <p className="text-slate-500">Automation not found.</p>
        <button onClick={() => navigate("/marketing/automation")} className="mt-4 text-indigo-600 hover:underline">Back to Automations</button>
      </div>
    );
  }

  return <AutomationForm mode="edit" initialValues={automation} onSubmit={handleSubmit} />;
}
