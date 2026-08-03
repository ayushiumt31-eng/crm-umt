import { useMemo, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Plus,
  Search,
  FileText,
  CheckCircle,
  XCircle,
  Copy,
  ToggleLeft,
  ToggleRight,
  Eye,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { DataTable } from "@/components/common/DataTable";
import { getForms, deleteForm, duplicateForm, activateForm, deactivateForm } from "../services/dynamicFormService";
import { dynamicFormTableColumns } from "../components/DynamicFormTableColumns";
import { DynamicFormDeleteDialog } from "../components/DynamicFormDeleteDialog";
import { availableModulesList } from "../data/dummy-dynamic-forms";
import type { DynamicForm } from "../types/dynamicForm";

export default function DynamicFormList() {
  const navigate = useNavigate();
  const [forms, setForms] = useState<DynamicForm[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("ALL");
  const [moduleFilter, setModuleFilter] = useState("ALL");
  const [deleteTarget, setDeleteTarget] = useState<DynamicForm | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    let mounted = true;
    getForms().then((data) => {
      if (mounted) {
        setForms(data);
        setLoading(false);
      }
    });
    return () => {
      mounted = false;
    };
  }, []);

  const filteredForms = useMemo(() => {
    return forms.filter((form) => {
      const query = search.toLowerCase();
      const matchesSearch =
        form.formName.toLowerCase().includes(query) ||
        form.description.toLowerCase().includes(query);
      const matchesStatus = statusFilter === "ALL" || form.status === statusFilter;
      const matchesModule =
        moduleFilter === "ALL" || form.assignedModules.includes(moduleFilter);
      return matchesSearch && matchesStatus && matchesModule;
    });
  }, [forms, search, statusFilter, moduleFilter]);

  const totalForms = forms.length;
  const activeForms = forms.filter((f) => f.status === "ACTIVE").length;
  const inactiveForms = forms.filter((f) => f.status === "INACTIVE").length;
  const totalFields = forms.reduce((sum, f) => sum + f.totalFields, 0);

  const handleView = (id: string) => navigate(`/settings/dynamic-forms/${id}`);
  const handleEdit = (id: string) => navigate(`/settings/dynamic-forms/${id}/edit`);

  const handleDuplicate = async (id: string) => {
    const duplicated = await duplicateForm(id);
    if (duplicated) {
      setForms((prev) => [duplicated, ...prev]);
    }
  };

  const handleToggleStatus = async (form: DynamicForm) => {
    if (form.status === "ACTIVE") {
      const updated = await deactivateForm(form.id);
      if (updated) setForms((prev) => prev.map((f) => (f.id === updated.id ? updated : f)));
    } else {
      const updated = await activateForm(form.id);
      if (updated) setForms((prev) => prev.map((f) => (f.id === updated.id ? updated : f)));
    }
  };

  const handleConfirmDelete = async () => {
    if (!deleteTarget) return;
    setIsDeleting(true);
    try {
      await deleteForm(deleteTarget.id);
      setForms((prev) => prev.filter((f) => f.id !== deleteTarget.id));
      setDeleteTarget(null);
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <div className="space-y-8">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-100 dark:bg-blue-900/30">
              <FileText className="h-6 w-6 text-blue-600 dark:text-blue-400" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-slate-900 dark:text-white">
                Dynamic Form Builder
              </h1>
              <p className="mt-1 text-slate-600 dark:text-slate-400">
                Create and manage dynamic forms for any module in the CRM.
              </p>
            </div>
          </div>
        </div>
        <Button
          onClick={() => navigate("/settings/dynamic-forms/add")}
          className="gap-2"
        >
          <Plus className="h-4 w-4" />
          Create Form
        </Button>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <div className="rounded-xl border bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-500 dark:text-slate-400">Total Forms</p>
              <h3 className="mt-2 text-2xl font-bold text-slate-900 dark:text-white">
                {totalForms}
              </h3>
            </div>
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-100 dark:bg-blue-900/30">
              <FileText className="h-5 w-5 text-blue-600" />
            </div>
          </div>
        </div>

        <div className="rounded-xl border bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-500 dark:text-slate-400">Active Forms</p>
              <h3 className="mt-2 text-2xl font-bold text-slate-900 dark:text-white">
                {activeForms}
              </h3>
            </div>
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-green-100 dark:bg-green-900/30">
              <CheckCircle className="h-5 w-5 text-green-600" />
            </div>
          </div>
        </div>

        <div className="rounded-xl border bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-500 dark:text-slate-400">Inactive Forms</p>
              <h3 className="mt-2 text-2xl font-bold text-slate-900 dark:text-white">
                {inactiveForms}
              </h3>
            </div>
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-red-100 dark:bg-red-900/30">
              <XCircle className="h-5 w-5 text-red-600" />
            </div>
          </div>
        </div>

        <div className="rounded-xl border bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-500 dark:text-slate-400">Total Fields</p>
              <h3 className="mt-2 text-2xl font-bold text-slate-900 dark:text-white">
                {totalFields}
              </h3>
            </div>
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-purple-100 dark:bg-purple-900/30">
              <FileText className="h-5 w-5 text-purple-600" />
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-4 rounded-xl border bg-white p-4 shadow-sm dark:border-slate-800 dark:bg-slate-900 lg:flex-row">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
          <Input
            placeholder="Search forms by name or description..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-9"
          />
        </div>
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="h-10 rounded-md border border-slate-200 bg-white px-3 text-sm dark:border-slate-700 dark:bg-slate-900"
        >
          <option value="ALL">All Status</option>
          <option value="ACTIVE">Active</option>
          <option value="INACTIVE">Inactive</option>
        </select>
        <select
          value={moduleFilter}
          onChange={(e) => setModuleFilter(e.target.value)}
          className="h-10 rounded-md border border-slate-200 bg-white px-3 text-sm dark:border-slate-700 dark:bg-slate-900"
        >
          <option value="ALL">All Modules</option>
          {availableModulesList.map((mod) => (
            <option key={mod} value={mod}>
              {mod}
            </option>
          ))}
        </select>
      </div>

      <DataTable
        data={filteredForms}
        columns={dynamicFormTableColumns}
        loading={loading}
        onView={handleView}
        onEdit={handleEdit}
        onDelete={(id) => {
          const target = forms.find((f) => f.id === id);
          if (target) setDeleteTarget(target);
        }}
        showActions={true}
      />

      <div className="flex flex-wrap gap-2">
        {filteredForms.map((form) => (
          <div key={form.id} className="flex items-center gap-1">
            <button
              onClick={() => handleView(form.id)}
              className="p-1.5 rounded hover:bg-blue-100 dark:hover:bg-blue-900/30 text-blue-600"
              title="View"
            >
              <Eye className="h-4 w-4" />
            </button>
            <button
              onClick={() => handleDuplicate(form.id)}
              className="p-1.5 rounded hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-600"
              title="Duplicate"
            >
              <Copy className="h-4 w-4" />
            </button>
            <button
              onClick={() => handleToggleStatus(form)}
              className="p-1.5 rounded hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-600"
              title={form.status === "ACTIVE" ? "Deactivate" : "Activate"}
            >
              {form.status === "ACTIVE" ? (
                <ToggleLeft className="h-4 w-4 text-green-600" />
              ) : (
                <ToggleRight className="h-4 w-4 text-slate-400" />
              )}
            </button>
          </div>
        ))}
      </div>

      <DynamicFormDeleteDialog
        open={!!deleteTarget}
        formName={deleteTarget?.formName || ""}
        onConfirm={handleConfirmDelete}
        onCancel={() => setDeleteTarget(null)}
        isLoading={isDeleting}
      />
    </div>
  );
}
