import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import {
  Share2,
  MessageSquare,
  Layers,
  History,
  Plus,
  TrendingUp,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { SocialStatsCard } from "../components/SocialStatsCard";
import { socialPostService } from "../services/socialPostService";
import { socialCampaignService } from "../services/socialCampaignService";
import type { SocialPost } from "../types/socialPost";
import type { SocialCampaign } from "../types/socialCampaign";

export default function SocialMedia() {
  const navigate = useNavigate();
  const [posts, setPosts] = useState<SocialPost[]>([]);
  const [campaigns, setCampaigns] = useState<SocialCampaign[]>([]);

  useEffect(() => {
    socialPostService.getSocialPosts().then(setPosts);
    socialCampaignService.getSocialCampaigns().then(setCampaigns);
  }, []);

  const quickLinks = [
    {
      title: "Social Posts",
      description: "Manage all social media posts",
      icon: MessageSquare,
      path: "/marketing/social-media/posts",
      gradient: "from-violet-500 to-purple-600",
      bg: "from-violet-50 to-purple-100 dark:from-violet-950/40 dark:to-purple-900/20",
    },
    {
      title: "Social Campaigns",
      description: "Manage social media campaigns",
      icon: Layers,
      path: "/marketing/social-media/campaigns",
      gradient: "from-blue-500 to-blue-600",
      bg: "from-blue-50 to-blue-100 dark:from-blue-950/40 dark:to-blue-900/20",
    },
    {
      title: "Social Media History",
      description: "View social media posting history",
      icon: History,
      path: "/marketing/social-media/history",
      gradient: "from-cyan-500 to-cyan-600",
      bg: "from-cyan-50 to-cyan-100 dark:from-cyan-950/40 dark:to-cyan-900/20",
    },
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="rounded-2xl bg-gradient-to-r from-violet-600 via-purple-500 to-violet-600 dark:from-violet-900 dark:via-purple-900 dark:to-violet-900 p-8 shadow-lg overflow-hidden relative">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-0 left-0 w-96 h-96 bg-white/20 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-purple-300/20 rounded-full blur-3xl animate-pulse"></div>
        </div>

        <div className="relative z-10">
          <div className="flex items-center gap-4 mb-4">
            <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-white/20 backdrop-blur-md text-white border border-white/30 shadow-lg transform transition-transform hover:scale-110">
              <Share2 className="h-7 w-7" />
            </div>
            <div>
              <h1 className="text-4xl font-bold text-white drop-shadow-lg">
                Social Media Marketing
              </h1>
              <p className="text-purple-100 text-lg">
                Create, manage, schedule, and track social media content.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Stats */}
      <SocialStatsCard posts={posts} campaigns={campaigns} />

      {/* Quick Navigation */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {quickLinks.map((link) => {
          const Icon = link.icon;
          return (
            <button
              key={link.title}
              onClick={() => navigate(link.path)}
              className={`group rounded-xl bg-gradient-to-br ${link.bg} p-6 border border-slate-200/50 dark:border-slate-800/50 shadow-sm hover:shadow-lg transition-all duration-300 text-left hover:-translate-y-1`}
            >
              <div className="flex items-center gap-4 mb-3">
                <div
                  className={`flex h-12 w-12 items-center justify-center rounded-lg bg-gradient-to-br ${link.gradient} text-white shadow-md`}
                >
                  <Icon className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="font-bold text-slate-900 dark:text-white">
                    {link.title}
                  </h3>
                  <p className="text-sm text-slate-600 dark:text-slate-400">
                    {link.description}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-1 text-sm font-medium text-violet-600 dark:text-violet-400 opacity-0 group-hover:opacity-100 transition-opacity">
                <span>Go to {link.title}</span>
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </div>
            </button>
          );
        })}
      </div>

      {/* CTA */}
      <div className="rounded-2xl border border-dashed border-slate-300 dark:border-slate-600 bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900/50 dark:to-slate-800/50 p-12 text-center">
        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-slate-200 dark:bg-slate-700 mx-auto mb-4">
          <Share2 className="h-8 w-8 text-slate-600 dark:text-slate-400" />
        </div>
        <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">
          Ready to create a social media post?
        </h3>
        <p className="text-slate-600 dark:text-slate-400 mb-6">
          Create engaging content for Facebook, Instagram, and LinkedIn
        </p>
        <div className="flex flex-wrap gap-3 justify-center">
          <Button
            onClick={() => navigate("/marketing/social-media/posts/add")}
            className="gap-2"
          >
            <Plus className="h-4 w-4" />
            Create Social Post
          </Button>
        </div>
        <p className="text-xs text-slate-500 mt-6">
          No real social media posts are published. This module creates post
          records only. Actual publishing to Facebook, Instagram, and LinkedIn
          will be available after backend/API integration.
        </p>
      </div>
    </div>
  );
}

