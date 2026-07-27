Write-Host "Creating Ads module fix..."

$base = "c:\Projects\crm\frontend\src\features\ads\pages\"

$adsDashboard = @"
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Megaphone, TrendingUp, Layers, FolderOpen, History, Plus, BarChart3 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { AdStatsCard } from "../components/AdStatsCard";
import { adCampaignService } from "../services/adCampaignService";
import { adSetService } from "../services/adSetService";
import { adService } from "../services/adService";
import type { AdCampaign } from "../types/adCampaign";
import type { AdSet } from "../types/adSet";
import type { Ad } from "../types/ad";

export default function AdsDashboard() {
  const navigate = useNavigate();
  const [campaigns, setCampaigns] = useState<AdCampaign[]>([]);
  const [adSets, setAdSets] = useState<AdSet[]>([]);
  const [ads, setAds] = useState<Ad[]>([]);

  useEffect(() => {
    Promise.all([
      adCampaignService.getAdCampaigns(),
      adSetService.getAdSets(),
      adService.getAds(),
    ]).then(([c, s, a]) => {
      setCampaigns(c);
      setAdSets(s);
      setAds(a);
    });
  }, []);

  const quickLinks = [
    { title: "Ad Campaigns", description: "Manage all ad campaigns", icon: TrendingUp, path: "/marketing/ads", gradient: "from-blue-500 to-blue-600", bg: "from-blue-50 to-blue-100 dark:from-blue-950/40 dark:to-blue-900/20" },
    { title: "Ad Sets", description: "Manage ad sets within campaigns", icon: Layers, path: "/marketing/ads/sets", gradient: "from-purple-500 to-purple-600", bg: "from-purple-50 to-purple-100 dark:from-purple-950/40 dark:to-purple-900/20" },
    { title: "Ads", description: "Manage individual ad creatives", icon: FolderOpen, path: "/marketing/ads/ads", gradient: "from-cyan-500 to-cyan-600", bg: "from-cyan-50 to-cyan-100 dark:from-cyan-950/40 dark:to-cyan-900/20" },
    { title: "Ad History", description: "View campaign activity log", icon: History, path: "/marketing/ads/history", gradient: "from-amber-500 to-amber-600", bg: "from-amber-50 to-amber-100 dark:from-amber-950/40 dark:to-amber-900/20" },
    { title: "Ad Analytics", description: "View ad performance metrics", icon: BarChart3, path: "/marketing/ads/analytics", gradient: "from-emerald-500 to-emerald-600", bg: "from-emerald-50 to-emerald-100 dark:from-emerald-950/40 dark:to-emerald-900/20" },
  ];

  return (
    <div className="space-y-8">
      <div className="rounded-2xl bg-gradient-to-r from-blue-600 via-indigo-500 to-purple-600 dark:from-blue-900 dark:via-indigo-900 dark:to-purple-900 p-8 shadow-lg overflow-hidden relative">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-0 left-0 w-96 h-96 bg-white/20 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-purple-300/20 rounded-full blur-3xl animate-pulse" />
        <\div>
        <\div>
        <div className="relative z-10">
          <div className="flex items-center gap-4 mb-4">
            <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-white/20 backdrop-blur-md text-white border border-white/30 shadow-lg">
              <Megaphone className="h-7 w-7" />
            <\div>
            <div>
              <h1 className="text-4xl font-bold text-white drop-shadow-lg">Ads / Meta Ads Management</h1>
              <p className="text-indigo-100 text-lg">Create, manage, and track ad campaigns</p>
            <\div>
          <\div>
        <\div>
      <\div>

      <AdStatsCard campaigns={campaigns} adSets={adSets} ads={ads} />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
        {quickLinks.map((link) => {
          const Icon = link.icon;
          return (
            <button key={link.title} onClick={() => navigate(link.path)}
              className={`

group rounded-xl bg-gradient-to-br ` + link.bg + ` p-6 border border-slate-200/50 dark:border-slate-800/50 shadow-sm hover:shadow-lg transition-all duration-300 text-left hover:-translate-y-1`}>
              <div className="flex items-center gap-4 mb-3">
                <div className={`flex h-12 w-12 items-center justify-center rounded-lg bg-gradient-to-br ` + link.gradient + ` text-white shadow-md`}>
                  <Icon className="h-6 w-6" />
                <\div>
                <div>
                  <h3 className="font-bold text-slate-900 dark:text-white">{link.title}</h3>
                  <p className="text-sm text-slate-600 dark:text-slate-400">{link.description}</p>
                <\div>
              <\div>
            <\button>
          );
        })}
      <\div>

      <div className="rounded-2xl border border-dashed border-slate-300 dark:border-slate-600 bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900/50 dark:to-slate-800/50 p-12 text-center">
        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-slate-200 dark:bg-slate-700 mx-auto mb-4">
          <Megaphone className="h-8 w-8 text-slate-600 dark:text-slate-400" />
        <\div>
        <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">Ready to launch ads?</h3>
        <p className="text-slate-600 dark:text-slate-400 mb-6">Start by creating an ad campaign, then add ad sets and creatives</p>
        <div className="flex flex-wrap gap-3 justify-center">
          <Button onClick={() => navigate("/marketing/ads/campaigns/add")} className="gap-2"><Plus className="h-4 w-4" />Create Ad Campaign<\\/Button>
        <\div>
        <p className="text-xs text-slate-500 mt-6">No real ads will be published. This module creates campaign records only. Actual ad delivery will be available after Meta Ads API integration.</p>
      <\div>

      <div className="rounded-xl bg-gradient-to-br from-amber-50 to-yellow-50 dark:from-amber-950/20 dark:to-yellow-950/20 border border-amber-200 dark:border-amber-800 p-4">
        <p className="text-sm text-amber-700 dark:text-amber-300"><strong>Demo analytics</strong> &mdash; real advertising metrics will be available after Meta Ads API integration.</p>
      <\div>
    <\div>
  );
}
"@

Set-Content -Path ($base + "AdsDashboard.tsx") -Value $adsDashboard -Force
Write-Host "Done"
"@

Set-Content -Path ($base + "AdsDashboard.tsx") -Value $adsDashboard -Force
Write-Host "Done"
