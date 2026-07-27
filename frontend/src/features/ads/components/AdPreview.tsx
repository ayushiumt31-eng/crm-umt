import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import type { Ad } from "../types/ad";

interface AdPreviewProps {
  ad: Partial<Ad>;
  platform?: string;
}

export function AdPreview({ ad, platform }: AdPreviewProps) {
  const [showPreview, setShowPreview] = useState(false);

  const activePlatform = platform || ad.platform || "FACEBOOK";

  const renderFacebookPreview = () => (
    <div className="max-w-sm mx-auto rounded-xl border-2 border-slate-200 dark:border-slate-700 overflow-hidden bg-white dark:bg-slate-900">
      {/* Header */}
      <div className="p-4 flex items-center gap-3 border-b border-slate-100 dark:border-slate-800">
        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center text-white font-bold text-sm">
          {ad.headline?.charAt(0) || "A"}
        </div>
        <div>
          <p className="font-semibold text-sm text-slate-900 dark:text-white">Advertiser Page</p>
          <p className="text-xs text-slate-500">Sponsored</p>
        </div>
      </div>

      {/* Image/Video Placeholder */}
      <div className="bg-gradient-to-br from-slate-100 to-slate-200 dark:from-slate-800 dark:to-slate-700 h-48 flex items-center justify-center">
        {ad.mediaUrl ? (
          <img
            src={ad.mediaUrl}
            alt="Ad creative"
            className="w-full h-full object-cover"
            onError={(e) => {
              (e.target as HTMLImageElement).style.display = "none";
              (e.target as HTMLImageElement).parentElement!.classList.add("flex", "items-center", "justify-center");
            }}
          />
        ) : (
          <div className="text-center">
            <svg className="w-12 h-12 mx-auto text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            <p className="text-sm text-slate-400 mt-2">Image/Video</p>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-4 space-y-2">
        <p className="font-bold text-base text-slate-900 dark:text-white">
          {ad.headline || "Ad Headline"}
        </p>
        <p className="text-sm text-slate-600 dark:text-slate-400 line-clamp-3">
          {ad.primaryText || "Primary text of the advertisement goes here."}
        </p>
        {ad.description && (
          <p className="text-xs text-slate-500 dark:text-slate-500">
            {ad.description}
          </p>
        )}
        {/* CTA Button */}
        <div className="pt-2">
          <div className="w-full py-2 px-4 bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-lg text-center text-sm font-semibold border border-blue-200 dark:border-blue-800">
            {ad.callToAction
              ? ad.callToAction.replace(/_/g, " ").replace(/\b\w/g, (c) => c.toUpperCase())
              : "Learn More"}
          </div>
        </div>
      </div>

      {/* Like/Comment/Share */}
      <div className="px-4 pb-4 flex items-center gap-6 text-xs text-slate-500">
        <span className="flex items-center gap-1">
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" /></svg>
          Like
        </span>
        <span className="flex items-center gap-1">
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" /></svg>
          Comment
        </span>
        <span className="flex items-center gap-1">
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" /></svg>
          Share
        </span>
      </div>
    </div>
  );

  const renderInstagramPreview = () => (
    <div className="max-w-sm mx-auto rounded-xl border-2 border-slate-200 dark:border-slate-700 overflow-hidden bg-white dark:bg-slate-900">
      {/* Header */}
      <div className="p-4 flex items-center gap-3 border-b border-slate-100 dark:border-slate-800">
        <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-yellow-400 via-pink-500 to-purple-600 flex items-center justify-center text-white font-bold text-xs">
          {ad.headline?.charAt(0) || "A"}
        </div>
        <div>
          <p className="font-semibold text-sm text-slate-900 dark:text-white">brand_name</p>
          <p className="text-xs text-slate-500">Sponsored</p>
        </div>
      </div>

      {/* Image/Video Placeholder */}
      <div className="bg-gradient-to-br from-slate-100 to-slate-200 dark:from-slate-800 dark:to-slate-700 aspect-square flex items-center justify-center">
        {ad.mediaUrl ? (
          <img
            src={ad.mediaUrl}
            alt="Ad creative"
            className="w-full h-full object-cover"
            onError={(e) => {
              (e.target as HTMLImageElement).style.display = "none";
              (e.target as HTMLImageElement).parentElement!.classList.add("flex", "items-center", "justify-center");
            }}
          />
        ) : (
          <div className="text-center">
            <svg className="w-16 h-16 mx-auto text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            <p className="text-sm text-slate-400 mt-2">Image/Video</p>
          </div>
        )}
      </div>

      {/* Actions */}
      <div className="p-4 space-y-2">
        <div className="flex items-center gap-4">
          <svg className="w-6 h-6 text-slate-700 dark:text-slate-300" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" /></svg>
          <svg className="w-6 h-6 text-slate-700 dark:text-slate-300" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" /></svg>
          <svg className="w-6 h-6 text-slate-700 dark:text-slate-300" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" /></svg>
        </div>
        <p className="text-sm font-semibold text-slate-900 dark:text-white">
          {ad.headline || "Ad Headline"}
        </p>
        <p className="text-sm text-slate-600 dark:text-slate-400">
          {ad.primaryText || "Primary text of the advertisement goes here."}
        </p>
        {ad.callToAction && (
          <p className="text-xs font-semibold text-blue-600 dark:text-blue-400">
            {ad.callToAction.replace(/_/g, " ").replace(/\b\w/g, (c) => c.toUpperCase())}
          </p>
        )}
      </div>
    </div>
  );

  return (
    <div className="space-y-3">
      <button
        type="button"
        onClick={() => setShowPreview(!showPreview)}
        className="flex items-center gap-2 text-sm font-semibold text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition-colors"
      >
        {showPreview ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
        {showPreview ? "Hide Preview" : "Show Preview"}
      </button>

      {showPreview && (
        <div className="space-y-3">
          {activePlatform === "FACEBOOK" || activePlatform === "FACEBOOK_INSTAGRAM"
            ? renderFacebookPreview()
            : null}
          {(activePlatform === "INSTAGRAM" || activePlatform === "FACEBOOK_INSTAGRAM") && (
            <div>
              {activePlatform === "FACEBOOK_INSTAGRAM" && (
                <p className="text-xs font-medium text-slate-500 mb-2">Instagram Preview:</p>
              )}
              {renderInstagramPreview()}
            </div>
          )}
          {activePlatform === "INSTAGRAM" && !activePlatform.includes("FACEBOOK") && renderInstagramPreview()}
          <p className="text-xs text-slate-500 text-center">
            This is a UI preview only. No ads are published.
          </p>
        </div>
      )}
    </div>
  );
}
