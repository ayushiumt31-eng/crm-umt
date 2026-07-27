import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import SocialPostForm from "../forms/SocialPostForm";
import { socialPostService } from "../services/socialPostService";
import type { SocialPost } from "../types/socialPost";

export default function EditSocialPost() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [post, setPost] = useState<SocialPost | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    if (id) {
      socialPostService.getSocialPostById(id).then((result) => {
        if (result) {
          setPost(result);
        } else {
          setError(true);
        }
        setLoading(false);
      });
    }
  }, [id]);

  const handleSubmit = async (data: Record<string, any>) => {
    if (!id) return;
    await socialPostService.updateSocialPost(id, data as any);
    navigate("/marketing/social-media/posts");
  };

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto text-center py-12">
        <p className="text-slate-500">Loading post...</p>
      </div>
    );
  }

  if (error || !post) {
    return (
      <div className="max-w-4xl mx-auto text-center py-12">
        <h2 className="text-2xl font-bold text-red-600 dark:text-red-400 mb-2">
          Post Not Found
        </h2>
        <p className="text-slate-500 mb-4">
          This social post may have been deleted or doesn't exist.
        </p>
        <button
          onClick={() => navigate("/marketing/social-media/posts")}
          className="text-blue-600 hover:underline"
        >
          Back to Social Posts
        </button>
      </div>
    );
  }

  return (
    <SocialPostForm
      mode="edit"
      initialValues={{
        ...post,
        scheduleType: post.status === "DRAFT" ? "DRAFT" : post.status === "PUBLISHED" ? "PUBLISH_NOW" : "SCHEDULE",
      }}
      onSubmit={handleSubmit}
    />
  );
}

