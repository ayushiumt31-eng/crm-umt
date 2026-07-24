import ActivityForm from "../forms/ActivityForm";
import { useParams, useNavigate } from "react-router-dom";
import { activityService } from "../services/activityService";
import { useState, useEffect } from "react";
import type { Activity } from "../types/activity";

export default function EditActivity() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [activity, setActivity] = useState<Activity | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (id) {
      activityService.getActivityById(id).then((result) => {
        if (result) {
          setActivity(result);
        }
        setLoading(false);
      });
    }
  }, [id]);

  const handleSubmit = async (data: Record<string, any>) => {
    if (!id) return;
    await activityService.updateActivity(id, data as any);
    navigate("/activities");
  };

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto text-center py-12">
        <p className="text-slate-500">Loading...</p>
      </div>
    );
  }

  if (!activity) {
    return (
      <div className="max-w-4xl mx-auto text-center py-12">
        <p className="text-slate-500">Activity not found.</p>
        <button onClick={() => navigate("/activities")} className="mt-4 text-blue-600 hover:underline">
          Back to Activities
        </button>
      </div>
    );
  }

  return (
    <ActivityForm
      mode="edit"
      initialValues={activity}
      onSubmit={handleSubmit}
    />
  );
}

