import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import DetailsPage from "@/components/common/DetailsPage";
import type { DetailSection } from "@/components/common/DetailsPage";
import {
  Layers,
  Clock,
  User,
  FileText,
  Mail,
  Eye,
} from "lucide-react";
import { emailTemplateService } from "../services/emailTemplateService";
import type { EmailTemplate } from "../types/emailTemplate";

export default function EmailTemplateDetails() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [template, setTemplate] = useState<EmailTemplate | null>(null);
  const [loading, setLoading] = useState(true);
  const [showPreview, setShowPreview] = useState(false);

  useEffect(() => {
    if (id) {
      emailTemplateService.getEmailTemplateById(id).then((result) => {
        if (result) {
          setTemplate(result);
        }
        setLoading(false);
      });
    }
  }, [id]);

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto text-center py-12">
        <p className="text-slate-500">Loading...</p>
      </div>
    );
  }

  if (!template) {
    return (
      <DetailsPage
        title="Email Template Not Found"
        subtitle="Error"
        onBack={() => navigate("/marketing/email-marketing/templates")}
        sections={[]}
        customLayout={
          <div className="rounded-2xl border-2 border-dashed border-red-300 dark:border-red-700 bg-gradient-to-br from-red-50 to-red-100 dark:from-red-950/30 dark:to-red-900/30 p-16 text-center">
            <div className="flex h-20 w-20 items-center justify-center rounded-full bg-red-100 dark:bg-red-900/50 mx-auto mb-4">
              <Layers className="h-10 w-10 text-red-600 dark:text-red-400" />
            </div>
            <h3 className="text-2xl font-bold text-red-900 dark:text-red-100 mb-2">
              Template Not Found
            </h3>
            <p className="text-red-700 dark:text-red-300">
              This email template may have been deleted or doesn't exist.
            </p>
          </div>
        }
      />
    );
  }

  const sampleData = {
    firstName: "John",
    lastName: "Doe",
    companyName: "Demo Company",
    email: "john@example.com",
  };

  const renderBody = template.body
    .replace(/\{\{firstName\}\}/g, sampleData.firstName)
    .replace(/\{\{lastName\}\}/g, sampleData.lastName)
    .replace(/\{\{companyName\}\}/g, sampleData.companyName)
    .replace(/\{\{email\}\}/g, sampleData.email);

  const sections: DetailSection[] = [];

  sections.push({
    title: "Template Overview",
    icon: Layers,
    iconColor: "text-purple-600 dark:text-purple-400",
    headerGradient:
      "bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-950/20 dark:to-pink-950/20",
    columns: 2,
    fields: [
      {
        icon: Layers,
        iconBgColor: "bg-purple-100 dark:bg-purple-900/30",
        iconColor: "text-purple-600 dark:text-purple-400",
        label: "Template Name",
        value: template.name,
      },
      {
        icon: FileText,
        iconBgColor: "bg-slate-100 dark:bg-slate-800",
        iconColor: "text-slate-600 dark:text-slate-400",
        label: "Status",
        value: (
          <span
            className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold ${
              template.status === "ACTIVE"
                ? "bg-green-100 text-green-700 dark:bg-green-900/50 dark:text-green-300"
                : "bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300"
            }`}
          >
            {template.status === "ACTIVE" ? "Active" : "Inactive"}
          </span>
        ),
        type: "custom",
      },
      {
        icon: Mail,
        iconBgColor: "bg-blue-100 dark:bg-blue-900/30",
        iconColor: "text-blue-600 dark:text-blue-400",
        label: "Subject",
        value: template.subject,
      },
      {
        icon: Layers,
        iconBgColor: "bg-indigo-100 dark:bg-indigo-900/30",
        iconColor: "text-indigo-600 dark:text-indigo-400",
        label: "Category",
        value: (
          <span className="inline-flex items-center rounded-full px-3 py-0.5 text-xs font-medium bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300">
            {template.category.charAt(0) + template.category.slice(1).toLowerCase()}
          </span>
        ),
        type: "custom",
      },
    ],
  });

  sections.push({
    title: "Template Details",
    icon: FileText,
    iconColor: "text-slate-600 dark:text-slate-400",
    headerGradient:
      "bg-gradient-to-r from-slate-50 to-slate-100 dark:from-slate-950/30 dark:to-slate-900/30",
    columns: 2,
    fields: [
      {
        icon: User,
        iconBgColor: "bg-slate-200 dark:bg-slate-800",
        iconColor: "text-slate-700 dark:text-slate-300",
        label: "Created By",
        value: template.createdByName,
      },
      {
        icon: Clock,
        iconBgColor: "bg-slate-200 dark:bg-slate-800",
        iconColor: "text-slate-700 dark:text-slate-300",
        label: "Created",
        value: new Date(template.createdAt).toLocaleDateString("en-US", {
          year: "numeric",
          month: "long",
          day: "numeric",
          hour: "2-digit",
          minute: "2-digit",
        }),
      },
      {
        icon: Clock,
        iconBgColor: "bg-slate-200 dark:bg-slate-800",
        iconColor: "text-slate-700 dark:text-slate-300",
        label: "Last Updated",
        value: template.updatedAt
          ? new Date(template.updatedAt).toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
              hour: "2-digit",
              minute: "2-digit",
            })
          : "—",
      },
    ],
  });

  // HTML Body Preview
  sections.push({
    title: "Email Body Preview",
    icon: Eye,
    iconColor: "text-emerald-600 dark:text-emerald-400",
    headerGradient:
      "bg-gradient-to-r from-emerald-50 to-teal-50 dark:from-emerald-950/20 dark:to-teal-950/20",
    fields: [
      {
        icon: Eye,
        iconBgColor: "bg-emerald-100 dark:bg-emerald-900/30",
        iconColor: "text-emerald-600 dark:text-emerald-400",
        label: "HTML Preview",
        value: (
          <div className="space-y-3">
            <button
              type="button"
              onClick={() => setShowPreview(!showPreview)}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-300 text-sm font-medium hover:bg-emerald-200 dark:hover:bg-emerald-900/50 transition-colors"
            >
              <Eye className="h-4 w-4" />
              {showPreview ? "Hide Rendered Preview" : "Show Rendered Preview"}
            </button>
            <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-900/50 border-2 border-slate-200 dark:border-slate-700">
              {showPreview ? (
                <div
                  className="prose prose-sm max-w-none dark:prose-invert"
                  dangerouslySetInnerHTML={{ __html: renderBody }}
                />
              ) : (
                <pre className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed whitespace-pre-wrap font-mono overflow-x-auto max-h-96">
                  {template.body}
                </pre>
              )}
            </div>
          </div>
        ),
        type: "custom",
      },
    ],
  });

  // Placeholder info
  sections.push({
    title: "Available Placeholders",
    icon: FileText,
    iconColor: "text-amber-600 dark:text-amber-400",
    headerGradient:
      "bg-gradient-to-r from-amber-50 to-yellow-50 dark:from-amber-950/20 dark:to-yellow-950/20",
    fields: [
      {
        icon: FileText,
        iconBgColor: "bg-amber-100 dark:bg-amber-900/40",
        iconColor: "text-amber-600 dark:text-amber-400",
        label: "Placeholders",
        value: (
          <div className="flex flex-wrap gap-2">
            {[
              { key: "firstName", example: "John" },
              { key: "lastName", example: "Doe" },
              { key: "companyName", example: "Acme Corp" },
              { key: "email", example: "john@example.com" },
            ].map((p) => (
              <span
                key={p.key}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono bg-amber-50 dark:bg-amber-900/30 border border-amber-200 dark:border-amber-700 text-amber-800 dark:text-amber-200"
              >
                <code>{'{{'}{p.key}{'}}'}</code>
                <span className="text-amber-400">→</span>
                <span className="font-medium">{p.example}</span>
              </span>
            ))}
          </div>
        ),
        type: "custom",
      },
    ],
  });

  const statusConfig = {
    ACTIVE: { label: "Active", variant: "success" as const },
    INACTIVE: { label: "Inactive", variant: "default" as const },
  };

  const handleDelete = async () => {
    if (id) {
      await emailTemplateService.deleteEmailTemplate(id);
      setTimeout(() => navigate("/marketing/email-marketing/templates"), 300);
    }
  };

  return (
    <DetailsPage
      title={template.name}
      subtitle="Email Template Details"
      status={statusConfig[template.status]}
      headerGradient="from-purple-600 via-pink-500 to-purple-600 dark:from-purple-900 dark:via-pink-900 dark:to-purple-900"
      onBack={() => navigate("/marketing/email-marketing/templates")}
      onEdit={() =>
        navigate(`/marketing/email-marketing/templates/${id}/edit`)
      }
      onDelete={handleDelete}
      sections={sections}
      gridLayout="2-col"
      deleteConfirmation={{
        title: "Delete Email Template?",
        message: `Are you sure you want to permanently delete "${template.name}"? This action cannot be undone.`,
        confirmLabel: "Yes, Delete Template",
        cancelLabel: "Cancel",
      }}
    />
  );
}
