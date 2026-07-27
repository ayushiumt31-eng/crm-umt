import { useNavigate } from "react-router-dom";
import SocialPostForm from "../forms/SocialPostForm";
import { socialPostService } from "../services/socialPostService";

export default function AddSocialPost() {
  const navigate = useNavigate();

  const handleSubmit = async (data: Record<string, any>) => {
    await socialPostService.createSocialPost(data as any);
    navigate("/marketing/social-media/posts");
  };

  return (
    <SocialPostForm
      mode="create"
      initialValues={{
        status: "DRAFT",
        mediaType: "NONE",
        scheduleType: "DRAFT",
      }}
      onSubmit={handleSubmit}
    />
  );
}

