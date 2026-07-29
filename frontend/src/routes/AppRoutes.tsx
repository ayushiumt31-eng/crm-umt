import React from "react";
import { BrowserRouter as Router, Routes, Route, Outlet } from "react-router-dom";

// import AuthLayout from "../layouts/AuthLayout";
import DashboardLayout from "../layouts/DashboardLayout";

import {
  Customers,
  AddCustomer,
  EditCustomer,
} from "../features/customers/pages";

import {
  Employees,
  
  EditEmployee,
  ViewEmployee,
} from "../features/employees/pages";

import PublicRoute from "./PublicRoute";

import {
  AddLead,
  EditLead,
  Lead,
  LeadDetails,
} from "@/features/lead/pages";

import CustomerDetails from "@/features/customers/pages/CustomerDetails";
import Dashboard from "@/pages/dashboard/Dashboard";
import AddEmployee from "@/features/employees/pages/AddEmployee";
import RolesPermissions from "@/features/roles-permissions/pages/Roles";
import AddRole from "@/features/roles-permissions/pages/AddRole";
import EditRole from "@/features/roles-permissions/pages/EditRole";
import { ViewRoles } from "@/features/roles-permissions/pages/RoleDetails";

import { Deals, AddDeal, EditDeal, DealDetails } from "@/features/deals/pages";
import { Sales, AddSale, EditSale, SaleDetails } from "@/features/sales/pages";
import {
  Activities,
  AddActivity,
  EditActivity,
  ActivityDetails,
} from "@/features/activities/pages";

import Communications from "@/features/communication/pages/Communications";
import AddCommunication from "@/features/communication/pages/AddCommunication";
import EditCommunication from "@/features/communication/pages/EditCommunication";
import CommunicationDetails from "@/features/communication/pages/CommunicationDetails";

import Reports from "@/features/reports/pages/Reports";

import {
  Campaigns,
  AddCampaign,
  EditCampaign,
  CampaignDetails,
} from "@/features/marketing/pages";

import {
  EmailMarketing,
  EmailCampaigns,
  AddEmailCampaign,
  EditEmailCampaign,
  EmailCampaignDetails,
  EmailTemplates,
  EmailTemplateDetails,
  AddEmailTemplate,
  EditEmailTemplate,
  EmailHistory,
} from "@/features/email-marketing/pages";

import {
  WhatsAppMarketing,
  WhatsAppCampaigns,
  AddWhatsAppCampaign,
  EditWhatsAppCampaign,
  WhatsAppCampaignDetails,
  WhatsAppTemplates,
  AddWhatsAppTemplate,
  EditWhatsAppTemplate,
  WhatsAppHistory,
} from "@/features/whatsapp/pages";

import {
  SocialMedia,
  SocialPosts,
  AddSocialPost,
  EditSocialPost,
  SocialPostDetails,
  SocialCampaigns,
  AddSocialCampaign,
  SocialCampaignDetails,
  SocialMediaHistory,
} from "@/features/social-media/pages";

import {
  AdsDashboard,
  AdCampaigns,
  AddAdCampaign,
  EditAdCampaign,
  AdCampaignDetails,
  AdSets,
  AddAdSet,
  Ads,
  AddAdCreative,
  AdHistoryPage,
  AdAnalytics,
} from "@/features/ads/pages";

import {
  MarketingReports,
  CampaignReports,
  ChannelReports,
  MarketingReportDetails,
} from "@/features/marketing-reports/pages";

import {
  MarketingAutomation,
  Automations,
  AddAutomation,
  EditAutomation,
  AutomationDetails,
  AutomationLogs,
  AutomationTemplates,
} from "@/features/marketing-automation/pages";

import { PayrollList } from "@/features/payroll/pages/PayrollList";
import { PayrollDetails } from "@/features/payroll/pages/PayrollDetails";
import AddPayroll from "@/features/payroll/pages/AddPayroll";
import EditPayroll from "@/features/payroll/pages/EditPayroll";

const AppRoutes: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route element={<PublicRoute />} />
        <Route element={<DashboardLayout />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/customers" element={<Customers />} />
          <Route path="/customers/add" element={<AddCustomer />} />
          <Route path="/customers/:id" element={<CustomerDetails />} />
          <Route path="/customers/:id/edit" element={<EditCustomer />} />
          <Route path="/lead" element={<Lead/>} />
          <Route path="/lead/add" element={<AddLead />} />
          <Route path="/lead/:id" element={<LeadDetails />} />
          <Route path="/lead/:id/edit" element={<EditLead />} />
          <Route path="/deals" element={<Deals />} />
          <Route path="/deals/add" element={<AddDeal />} />
          <Route path="/deals/:id" element={<DealDetails />} />
          <Route path="/deals/:id/edit" element={<EditDeal />} />
          <Route path="/sales" element={<Sales />} />
          <Route path="/sales/add" element={<AddSale />} />
          <Route path="/sales/:id" element={<SaleDetails />} />
          <Route path="/sales/:id/edit" element={<EditSale />} />
          <Route path="/activities" element={<Activities />} />
          <Route path="/activities/add" element={<AddActivity />} />
          <Route path="/activities/:id" element={<ActivityDetails />} />
          <Route path="/activities/:id/edit" element={<EditActivity />} />
          <Route path="/communications" element={<Communications />} />
          <Route path="/communications/add" element={<AddCommunication />} />
          <Route path="/communications/:id" element={<CommunicationDetails />} />
          <Route path="/communications/:id/edit" element={<EditCommunication />} />
          <Route path="/reports" element={<Reports />} />
          <Route path="/employees" element={<Employees />} />
          <Route path="/employees/add" element={<AddEmployee />} />
          <Route path="/employees/:id" element={<ViewEmployee />} />
          <Route path="/employees/:id/edit" element={<EditEmployee />} />
          <Route path="/marketing/campaigns" element={<Campaigns />} />
          <Route path="/marketing/campaigns/add" element={<AddCampaign />} />
          <Route path="/marketing/campaigns/:id" element={<CampaignDetails />} />
          <Route path="/marketing/campaigns/:id/edit" element={<EditCampaign />} />
          <Route path="/marketing/email-marketing" element={<EmailMarketing />} />
          <Route path="/marketing/email-marketing/campaigns" element={<EmailCampaigns />} />
          <Route path="/marketing/email-marketing/campaigns/add" element={<AddEmailCampaign />} />
          <Route path="/marketing/email-marketing/campaigns/:id" element={<EmailCampaignDetails />} />
          <Route path="/marketing/email-marketing/campaigns/:id/edit" element={<EditEmailCampaign />} />
          <Route path="/marketing/email-marketing/templates" element={<EmailTemplates />} />
          <Route path="/marketing/email-marketing/templates/add" element={<AddEmailTemplate />} />
          <Route path="/marketing/email-marketing/templates/:id" element={<EmailTemplateDetails />} />
          <Route path="/marketing/email-marketing/templates/:id/edit" element={<EditEmailTemplate />} />
          <Route path="/marketing/email-marketing/history" element={<EmailHistory />} />
          <Route path="/roles-permissions" element={<RolesPermissions />} />
          <Route path="/roles-permissions/add" element={<AddRole />} />
          <Route path="/roles-permissions/:id" element={<ViewRoles />} />
          <Route path="/roles-permissions/:id/edit" element={<EditRole />} />
          <Route path="/marketing/whatsapp" element={<WhatsAppMarketing />} />
          <Route path="/marketing/whatsapp/campaigns" element={<WhatsAppCampaigns />} />
          <Route path="/marketing/whatsapp/campaigns/add" element={<AddWhatsAppCampaign />} />
          <Route path="/marketing/whatsapp/campaigns/:id" element={<WhatsAppCampaignDetails />} />
          <Route path="/marketing/whatsapp/campaigns/:id/edit" element={<EditWhatsAppCampaign />} />
          <Route path="/marketing/whatsapp/templates" element={<WhatsAppTemplates />} />
          <Route path="/marketing/whatsapp/templates/add" element={<AddWhatsAppTemplate />} />
          <Route path="/marketing/whatsapp/templates/:id/edit" element={<EditWhatsAppTemplate />} />
          <Route path="/marketing/whatsapp/history" element={<WhatsAppHistory />} />
          <Route path="/marketing/social-media" element={<SocialMedia />} />
          <Route path="/marketing/social-media/posts" element={<SocialPosts />} />
          <Route path="/marketing/social-media/posts/add" element={<AddSocialPost />} />
          <Route path="/marketing/social-media/posts/:id" element={<SocialPostDetails />} />
          <Route path="/marketing/social-media/posts/:id/edit" element={<EditSocialPost />} />
          <Route path="/marketing/social-media/campaigns" element={<SocialCampaigns />} />
          <Route path="/marketing/social-media/campaigns/add" element={<AddSocialCampaign />} />
          <Route path="/marketing/social-media/campaigns/:id" element={<SocialCampaignDetails />} />
          <Route path="/marketing/social-media/history" element={<SocialMediaHistory />} />
          <Route path="/marketing/ads" element={<AdsDashboard />} />
          <Route path="/marketing/ads/campaigns" element={<AdCampaigns />} />
          <Route path="/marketing/ads/campaigns/add" element={<AddAdCampaign />} />
          <Route path="/marketing/ads/campaigns/:id" element={<AdCampaignDetails />} />
          <Route path="/marketing/ads/campaigns/:id/edit" element={<EditAdCampaign />} />
          <Route path="/marketing/ads/sets" element={<AdSets />} />
          <Route path="/marketing/ads/sets/add" element={<AddAdSet />} />
          <Route path="/marketing/ads/ads" element={<Ads />} />
          <Route path="/marketing/ads/ads/add" element={<AddAdCreative />} />
          <Route path="/marketing/ads/history" element={<AdHistoryPage />} />
          <Route path="/marketing/ads/analytics" element={<AdAnalytics />} />
          <Route path="/marketing/automation" element={<MarketingAutomation />} />
          <Route path="/marketing/automation/list" element={<Automations />} />
          <Route path="/marketing/automation/add" element={<AddAutomation />} />
          <Route path="/marketing/automation/:id" element={<AutomationDetails />} />
          <Route path="/marketing/automation/:id/edit" element={<EditAutomation />} />
          <Route path="/marketing/automation/logs" element={<AutomationLogs />} />
          <Route path="/marketing/automation/templates" element={<AutomationTemplates />} />
          <Route path="/marketing/reports" element={<MarketingReports />} />
          <Route path="/marketing/reports/campaigns" element={<CampaignReports />} />
          <Route path="/marketing/reports/channels" element={<ChannelReports />} />
          <Route path="/marketing/reports/:id" element={<MarketingReportDetails />} />
          <Route path="/payroll" element={<PayrollList />} />
          <Route path="/payroll/add" element={<AddPayroll />} />
          <Route path="/payroll/:id" element={<PayrollDetails />} />
          <Route path="/payroll/:id/edit" element={<EditPayroll />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default AppRoutes;
