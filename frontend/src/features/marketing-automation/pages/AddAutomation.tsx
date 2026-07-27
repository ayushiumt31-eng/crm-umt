import { useNavigate } from "react-router-dom";
import AutomationForm from "../forms/AutomationForm";
import { automationService } from "../services/automationService";

export default function AddAutomation() {
  const navigate = useNavigate();

  const handleSubmit = async (data: Record<string, any>) => {
    await automationService.createAutomation(data as any);
    navigate("/marketing/automation");
  };

  return (
    <AutomationForm
      mode="create"
      initialValues={{
        status: "DRAFT",
        conditions: [],
        conditionLogic: "AND",
        actions: [],
      }}
      onSubmit={handleSubmit}
    />
  );
}
