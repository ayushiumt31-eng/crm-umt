import ActivityForm from "../forms/ActivityForm";
import { useNavigate } from "react-router-dom";
import { activityService } from "../services/activityService";

export default function AddActivity() {
  const navigate = useNavigate();

  const handleSubmit = async (data: Record<string, any>) => {
    await activityService.createActivity(data as any);
    navigate("/activities");
  };

  return (
    <ActivityForm
      mode="create"
      initialValues={{
        status: "PENDING",
        priority: "MEDIUM",
        dueDate: new Date().toISOString().split("T")[0],
      }}
      onSubmit={handleSubmit}
    />
  );
}

