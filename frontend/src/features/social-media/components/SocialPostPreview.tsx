import { MessageSquare, Heart, Share2, MapPin } from "lucide-react";
import type { SocialPost } from "../types/socialPost";

interface SocialPostPreviewProps {
  post: Partial<SocialPost>;
}

export function SocialPostPreview({ post }: SocialPostPreviewProps) {
  if (!post.platform) {
    return (
      <div className="p-8 text-center text-slate-500 dark:text-slate-400 border-2 border-dashed border-slate-300 dark:border-slate-600 rounded-xl">
        <MessageSquare className="h-10 w-10 mx-auto mb-2 opacity-50" />
        <p className="text-sm">Select a platform to see preview</p>
      </div>
    );
  }

  const renderMediaPlaceholder = () => {
    if (!post.mediaType || post.mediaType === "NONE") return null;
    return (
      <div className="w-full h-48 bg-gradient-to-br from-slate-200 to-slate-300 dark:from-slate-700 dark:to-slate-600 rounded-lg flex items-center justify-center mb-3">
        <div className="text-center">
          <div className="text-3xl mb-1">
            {post.mediaType === "IMAGE" ? "🖼️" : "🎬"}
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            {post.mediaType === "IMAGE" ? "Image" : "Video"} placeholder
          </p>
        </div>
      </div>
    );
  };

  const renderFacebookPreview = () => (
    <div className="bg-white dark:bg-slate-800 rounded-xl border-2 border-slate-200 dark:border-slate-700 overflow-hidden shadow-sm">
      {/* Header */}
      <div className="flex items-center gap-3 p-4">
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-600 text-white text-sm font-bold">
          C
        </div>
        <div>
          <p className="font-semibold text-sm text-slate-900 dark:text-white">
            CRM UMT
          </p>
          <p className="text-xs text-slate-500">Just now · 🌐</p>
        </div>
      </div>

      {/* Content */}
      <div className="px-4 pb-3">
        <p className="text-sm text-slate-800 dark:text-slate-200 leading-relaxed">
          {post.content || "Your post content will appear here..."}
        </p>
      </div>

      {/* Media */}
      {renderMediaPlaceholder()}

      {/* Actions */}
      <div className="flex items-center justify-between px-4 py-2 border-t border-slate-100 dark:border-slate-700 text-slate-500 dark:text-slate-400">
        <div className="flex items-center gap-1">
          <Heart className="h-4 w-4" />
          <span className="text-xs">Like</span>
        </div>
        <div className="flex items-center gap-1">
          <MessageSquare className="h-4 w-4" />
          <span className="text-xs">Comment</span>
        </div>
        <div className="flex items-center gap-1">
          <Share2 className="h-4 w-4" />
          <span className="text-xs">Share</span>
        </div>
      </div>
    </div>
  );

  const renderInstagramPreview = () => (
    <div className="bg-white dark:bg-slate-800 rounded-xl border-2 border-slate-200 dark:border-slate-700 overflow-hidden shadow-sm">
      {/* Header */}
      <div className="flex items-center gap-3 p-4">
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-tr from-yellow-400 via-pink-500 to-purple-600 text-white text-sm font-bold">
          C
        </div>
        <div>
          <p className="font-semibold text-sm text-slate-900 dark:text-white">
            crm_umt
          </p>
          <p className="text-xs text-slate-500">
            <MapPin className="h-3 w-3 inline" /> India
          </p>
        </div>
      </div>

      {/* Media */}
      {renderMediaPlaceholder() || (
        <div className="w-full h-48 bg-gradient-to-br from-slate-200 to-slate-300 dark:from-slate-700 dark:to-slate-600 flex items-center justify-center">
          <MessageSquare className="h-10 w-10 text-slate-400" />
        </div>
      )}

      {/* Actions */}
      <div className="flex items-center gap-4 px-4 py-2">
        <Heart className="h-5 w-5 text-slate-600 dark:text-slate-300" />
        <MessageSquare className="h-5 w-5 text-slate-600 dark:text-slate-300" />
        <Share2 className="h-5 w-5 text-slate-600 dark:text-slate-300" />
      </div>

      {/* Caption */}
      <div className="px-4 pb-4">
        <p className="text-sm text-slate-800 dark:text-slate-200">
          <span className="font-semibold">crm_umt</span>{" "}
          {post.content || "Your caption will appear here..."}
        </p>
      </div>
    </div>
  );

  const renderLinkedInPreview = () => (
    <div className="bg-white dark:bg-slate-800 rounded-xl border-2 border-slate-200 dark:border-slate-700 overflow-hidden shadow-sm">
      {/* Header */}
      <div className="flex items-center gap-3 p-4">
        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-800 text-white text-sm font-bold">
          CU
        </div>
        <div>
          <p className="font-semibold text-sm text-slate-900 dark:text-white">
            CRM UMT
          </p>
          <p className="text-xs text-slate-500">
            10,000+ followers · Just now
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="px-4 pb-3">
        <p className="text-sm text-slate-800 dark:text-slate-200 leading-relaxed">
          {post.content || "Your post content will appear here..."}
        </p>
      </div>

      {/* Media */}
      {renderMediaPlaceholder()}

      {/* Actions */}
      <div className="flex items-center justify-between px-4 py-2 border-t border-slate-100 dark:border-slate-700 text-slate-500 dark:text-slate-400">
        <div className="flex items-center gap-1">
          <Heart className="h-4 w-4" />
          <span className="text-xs">Like</span>
        </div>
        <div className="flex items-center gap-1">
          <MessageSquare className="h-4 w-4" />
          <span className="text-xs">Comment</span>
        </div>
        <div className="flex items-center gap-1">
          <Share2 className="h-4 w-4" />
          <span className="text-xs">Repost</span>
        </div>
        <div className="flex items-center gap-1">
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
            <polyline points="7 10 12 15 17 10" />
            <line x1="12" y1="15" x2="12" y2="3" />
          </svg>
          <span className="text-xs">Send</span>
        </div>
      </div>
    </div>
  );

  return (
    <div className="space-y-3">
      <p className="text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wide">
        Preview
      </p>

      {post.platform === "FACEBOOK" && renderFacebookPreview()}
      {post.platform === "INSTAGRAM" && renderInstagramPreview()}
      {post.platform === "LINKEDIN" && renderLinkedInPreview()}

      <p className="text-xs text-slate-400 text-center">
        This is a UI preview only. No content is published to any social media
        platform.
      </p>
    </div>
  );
}

