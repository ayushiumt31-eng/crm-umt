import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import {
  MessageCircle,
  FileText,
  History,
  Plus,
  TrendingUp,
  Layers,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { WhatsAppStatsCard } from "../components/WhatsAppStatsCard";
import { whatsappCampaignService } from "../services/whatsappCampaignService";
import type { WhatsAppCampaign } from "../types/whatsappCampaign";

export default function WhatsAppMarketing() {
  const navigate = useNavigate();
  const [campaigns, setCampaigns] = useState<WhatsAppCampaign[]>([]);

  useEffect(() => {
    whatsappCampaignService.getWhatsAppCampaigns().then(setCampaigns);
  }, []);

  const quickLinks = [
    {
      title: "WhatsApp Campaigns",
      description: "Manage all WhatsApp campaigns",
      icon: TrendingUp,
      path: "/marketing/whatsapp/campaigns",
      gradient: "from-green-500 to-green-600",
      bg: "from-green-50 to-green-100 dark:from-green-950/40 dark:to-green-900/20",
    },
    {
      title: "WhatsApp Templates",
      description: "Create and manage templates",
      icon: Layers,
      path: "/marketing/whatsapp/templates",
      gradient: "from-purple-500 to-purple-600",
      bg: "from-purple-50 to-purple-100 dark:from-purple-950/40 dark:to-purple-900/20",
    },
    {
      title: "WhatsApp History",
      description: "View sent message history",
      icon: History,
      path: "/marketing/whatsapp/history",
      gradient: "from-cyan-500 to-cyan-600",
      bg: "from-cyan-50 to-cyan-100 dark:from-cyan-950/40 dark:to-cyan-900/20",
    },
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="rounded-2xl bg-gradient-to-r from-green-600 via-emerald-500 to-green-600 dark:from-green-900 dark:via-emerald-900 dark:to-green-900 p-8 shadow-lg overflow-hidden relative">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-0 left-0 w-96 h-96 bg-white/20 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-emerald-300/20 rounded-full blur-3xl animate-pulse"></div>
        </div>

        <div className="relative z-10">
          <div className="flex items-center gap-4 mb-4">
            <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-white/20 backdrop-blur-md text-white border border-white/30 shadow-lg transform transition-transform hover:scale-110">
              <MessageCircle className="h-7 w-7" />
            </div>
            <div>
              <h1 className="text-4xl font-bold text-white drop-shadow-lg">
                WhatsApp Marketing
              </h1>
              <p className="text-green-100 text-lg">
                Create, manage, and track bulk WhatsApp messaging campaigns
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Stats */}
      <WhatsAppStatsCard campaigns={campaigns} />

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
              <div className="flex items-center gap-1 text-sm font-medium text-green-600 dark:text-green-400 opacity-0 group-hover:opacity-100 transition-opacity">
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
          <MessageCircle className="h-8 w-8 text-slate-600 dark:text-slate-400" />
        </div>
        <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">
          Ready to create a campaign?
        </h3>
        <p className="text-slate-600 dark:text-slate-400 mb-6">
          Start by creating a WhatsApp campaign, or first set up your message
          templates
        </p>
        <div className="flex flex-wrap gap-3 justify-center">
          <Button
            onClick={() => navigate("/marketing/whatsapp/campaigns/add")}
            className="gap-2"
          >
            <Plus className="h-4 w-4" />
            Create WhatsApp Campaign
          </Button>
          <Button
            variant="outline"
            onClick={() => navigate("/marketing/whatsapp/templates/add")}
            className="gap-2"
          >
            <FileText className="h-4 w-4" />
            Create Template
          </Button>
        </div>
        <p className="text-xs text-slate-500 mt-6">
          No real WhatsApp messages will be sent. This module creates campaign
          records only. Actual WhatsApp message delivery will be available after
          backend integration.
        </p>
      </div>
    </div>
  );
}

