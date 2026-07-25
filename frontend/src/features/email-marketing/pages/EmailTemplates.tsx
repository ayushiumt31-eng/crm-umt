import { useState, useMemo, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Plus, Search, Layers, TrendingUp, ArrowLeft } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/common/DataTable";
import { emailTemplateTableColumns } from "../components/EmailTemplateTableColumns";
import { emailTemplateService } from "../services/emailTemplateService";
import type { EmailTemplate } from "../types/emailTemplate";

export default function EmailTemplates() {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("ALL");
  const [templates, setTemplates] = useState<EmailTemplate[]>([]);

  useEffect(() => {
    emailTemplateService.getEmailTemplates().then(setTemplates);
  }, []);

  const filteredTemplates = useMemo(() => {
    return templates.filter((t) => {
      const searchStr = searchTerm.toLowerCase();
      const matchesSearch =
        !searchTerm ||
        t.name.toLowerCase().includes(searchStr) ||
        t.subject.toLowerCase().includes(searchStr);

      const matchesCategory =
        categoryFilter === "ALL" || t.category === categoryFilter;

      return matchesSearch && matchesCategory;
    });
  }, [templates, searchTerm, categoryFilter]);

  const handleDelete = async (id: string) => {
    await emailTemplateService.deleteEmailTemplate(id);
    setTemplates((prev) => prev.filter((t) => t.id !== id));
  };

  const columns = useMemo(() => {
    return emailTemplateTableColumns.map((col) => {
      if (col.key === "id") {
          return {
            ...col,
            render: (_value: string, row: EmailTemplate) => (
              <div className="flex items-center gap-2">
                <button
                  onClick={() =>
                    navigate(
                      `/marketing/email-marketing/templates/${row.id}`
                    )
                  }
                  title="View"
                  className="h-8 w-8 flex items-center justify-center rounded-md hover:bg-blue-100 dark:hover:bg-blue-900/30 text-blue-600 dark:text-blue-400"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" />
                    <circle cx="12" cy="12" r="3" />
                  </svg>
                </button>
                <button
                  onClick={() =>
                    navigate(
                      `/marketing/email-marketing/templates/${row.id}/edit`
                    )
                  }
                  title="Edit"
                  className="h-8 w-8 flex items-center justify-center rounded-md hover:bg-cyan-100 dark:hover:bg-cyan-900/30 text-cyan-600 dark:text-cyan-400"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M17 3a2.85 2.85 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z" />
                    <path d="m15 5 4 4" />
                  </svg>
                </button>
                <button
                  title="Delete"
                  className="h-8 w-8 flex items-center justify-center rounded-md hover:bg-red-100 dark:hover:bg-red-900/30 text-red-600 dark:text-red-400"
                  onClick={() => handleDelete(row.id)}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M3 6h18" />
                    <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
                    <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
                  </svg>
                </button>
              </div>
            ),
          };
      }
      return col;
    });
  }, [navigate]);

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="rounded-2xl bg-gradient-to-r from-purple-600 via-pink-500 to-purple-600 dark:from-purple-900 dark:via-pink-900 dark:to-purple-900 p-8 shadow-lg overflow-hidden relative">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-0 left-0 w-96 h-96 bg-white/20 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-pink-300/20 rounded-full blur-3xl animate-pulse"></div>
        </div>
        <div className="relative z-10">
          <div className="flex items-center gap-4 mb-4">
            <button
              onClick={() => navigate("/marketing/email-marketing")}
              className="flex h-10 w-10 items-center justify-center rounded-lg bg-white/20 backdrop-blur-md text-white border border-white/30 shadow-lg hover:bg-white/30 transition-all"
              title="Back to Email Marketing"
            >
              <ArrowLeft className="h-5 w-5" />
            </button>
            <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-white/20 backdrop-blur-md text-white border border-white/30 shadow-lg">
              <Layers className="h-7 w-7" />
            </div>
            <div>
              <h1 className="text-4xl font-bold text-white drop-shadow-lg">
                Email Templates
              </h1>
              <p className="text-purple-100 text-lg">
                Create and manage email templates for your campaigns
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Filters & Toolbar */}
      <div className="rounded-2xl border border-slate-200/50 dark:border-slate-800/50 bg-white dark:bg-slate-900 shadow-sm overflow-hidden">
        <div className="px-6 py-4 border-b border-slate-200/50 dark:border-slate-800/50 bg-gradient-to-r from-purple-50/50 to-pink-50/50 dark:from-purple-950/20 dark:to-pink-950/20">
          <div className="flex items-center justify-between flex-wrap gap-2">
            <div className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-purple-600 dark:text-purple-400" />
              <h2 className="font-bold text-slate-900 dark:text-white">
                All Templates
              </h2>
              <span className="inline-flex items-center rounded-full bg-purple-100 dark:bg-purple-900/50 px-3 py-1 text-sm font-semibold text-purple-700 dark:text-purple-300">
                {filteredTemplates.length} results
              </span>
            </div>
            <Button
              onClick={() =>
                navigate("/marketing/email-marketing/templates/add")
              }
              className="gap-2"
            >
              <Plus className="h-4 w-4" />
              Create Template
            </Button>
          </div>
        </div>

        <div className="p-4 border-b border-slate-200/50 dark:border-slate-800/50 space-y-4">
          <div className="relative w-full md:w-96">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-slate-500" />
            <Input
              placeholder="Search templates..."
              className="pl-9"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="flex flex-wrap gap-3">
            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              className="h-10 rounded-md border border-slate-200 bg-white px-3 text-sm dark:border-slate-700 dark:bg-slate-900"
            >
              <option value="ALL">All Categories</option>
              <option value="WELCOME">Welcome</option>
              <option value="PROMOTION">Promotion</option>
              <option value="NEWSLETTER">Newsletter</option>
              <option value="FOLLOW_UP">Follow-up</option>
              <option value="REMINDER">Reminder</option>
              <option value="ANNOUNCEMENT">Announcement</option>
              <option value="CUSTOM">Custom</option>
            </select>
          </div>
        </div>

        <DataTable
          columns={columns}
          data={filteredTemplates}
          showActions={false}
        />
      </div>

      {/* Empty State */}
      {filteredTemplates.length === 0 && (
        <div className="rounded-2xl border border-dashed border-slate-300 dark:border-slate-600 bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900/50 dark:to-slate-800/50 p-12 text-center">
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-slate-200 dark:bg-slate-700 mx-auto mb-4">
            <Layers className="h-8 w-8 text-slate-600 dark:text-slate-400" />
          </div>
          <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">
            No templates found
          </h3>
          <p className="text-slate-600 dark:text-slate-400 mb-6">
            Create your first email template to get started
          </p>
          <button
            onClick={() =>
              navigate("/marketing/email-marketing/templates/add")
            }
            className="inline-flex items-center gap-2 rounded-lg bg-gradient-to-r from-purple-600 to-pink-600 px-6 py-2 font-semibold text-white shadow-lg hover:shadow-xl transition-all duration-200 hover:from-purple-700 hover:to-pink-700 transform hover:-translate-y-0.5"
          >
            <Plus className="h-4 w-4" />
            Create Your First Template
          </button>
        </div>
      )}
    </div>
  );
}

