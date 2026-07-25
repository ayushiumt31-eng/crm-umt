import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import {
  Mail,
  FileText,
  History,
  Plus,
  TrendingUp,
  Layers,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { EmailStatsCard } from "../components/EmailStatsCard";
import { emailCampaignService } from "../services/emailCampaignService";
import type { EmailCampaign } from "../types/emailCampaign";

export default function EmailMarketing() {
  const navigate = useNavigate();
  const [campaigns, setCampaigns] = useState<EmailCampaign[]>([]);

  useEffect(() => {
    emailCampaignService.getEmailCampaigns().then(setCampaigns);
  }, []);

  const quickLinks = [
    {
      title: "Email Campaigns",
      description: "Manage all email campaigns",
      icon: TrendingUp,
      path: "/marketing/email-marketing/campaigns",
      gradient: "from-blue-500 to-blue-600",
      bg: "from-blue-50 to-blue-100 dark:from-blue-950/40 dark:to-blue-900/20",
    },
    {
      title: "Email Templates",
      description: "Create and manage templates",
      icon: Layers,
      path: "/marketing/email-marketing/templates",
      gradient: "from-purple-500 to-purple-600",
      bg: "from-purple-50 to-purple-100 dark:from-purple-950/40 dark:to-purple-900/20",
    },
    {
      title: "Email History",
      description: "View sent email history",
      icon: History,
      path: "/marketing/email-marketing/history",
      gradient: "from-cyan-500 to-cyan-600",
      bg: "from-cyan-50 to-cyan-100 dark:from-cyan-950/40 dark:to-cyan-900/20",
    },
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="rounded-2xl bg-gradient-to-r from-blue-600 via-cyan-500 to-blue-600 dark:from-blue-900 dark:via-cyan-900 dark:to-blue-900 p-8 shadow-lg overflow-hidden relative">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-0 left-0 w-96 h-96 bg-white/20 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-cyan-300/20 rounded-full blur-3xl animate-pulse"></div>
        </div>

        <div className="relative z-10">
          <div className="flex items-center gap-4 mb-4">
            <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-white/20 backdrop-blur-md text-white border border-white/30 shadow-lg transform transition-transform hover:scale-110">
              <Mail className="h-7 w-7" />
            </div>
            <div>
              <h1 className="text-4xl font-bold text-white drop-shadow-lg">
                Email Marketing
              </h1>
              <p className="text-cyan-100 text-lg">
                Create, manage, and track bulk email campaigns
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Stats */}
      <EmailStatsCard campaigns={campaigns} />

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
              <div className="flex items-center gap-1 text-sm font-medium text-blue-600 dark:text-blue-400 opacity-0 group-hover:opacity-100 transition-opacity">
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
          <Mail className="h-8 w-8 text-slate-600 dark:text-slate-400" />
        </div>
        <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">
          Ready to create a campaign?
        </h3>
        <p className="text-slate-600 dark:text-slate-400 mb-6">
          Start by creating an email campaign, or first set up your email
          templates
        </p>
        <div className="flex flex-wrap gap-3 justify-center">
          <Button
            onClick={() =>
              navigate("/marketing/email-marketing/campaigns/add")
            }
            className="gap-2"
          >
            <Plus className="h-4 w-4" />
            Create Email Campaign
          </Button>
          <Button
            variant="outline"
            onClick={() =>
              navigate("/marketing/email-marketing/templates/add")
            }
            className="gap-2"
          >
            <FileText className="h-4 w-4" />
            Create Template
          </Button>
        </div>
        <p className="text-xs text-slate-500 mt-6">
          No real emails will be sent. This module creates campaign records
          only. Actual email delivery will be available after backend
          integration.
        </p>
      </div>
    </div>
  );
}

