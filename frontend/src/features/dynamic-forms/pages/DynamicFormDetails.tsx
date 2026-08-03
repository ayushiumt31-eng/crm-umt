import { useNavigate, useParams } from "react-router-dom";
import { useMemo, useState, useEffect } from "react";
import { ArrowLeft, Edit3, Copy, Trash2, ToggleLeft, ToggleRight, FileText } from "lucide-react";
import { getFormById, duplicateForm, deleteForm, activateForm, deactivateForm } from "../services/dynamicFormService";
import { DynamicFormDetailsSection } from "../components/DynamicFormDetailsCard";
import { DynamicFormDeleteDialog } from "../components/DynamicFormDeleteDialog";
import { DynamicFormStatusBadge } from "../components/DynamicFormStatusBadge";
import { FormPreview } from "../components/FormPreview";
import type { DynamicForm } from "../types/dynamicForm";

export function DynamicFormDetails() {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const [form, setForm] = useState<DynamicForm | null>(null);
  const [loading, setLoading] = useState(true);
  const [showPreview, setShowPreview] = useState(false);
  const [deleteDialog, setDeleteDialog] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    if (!id) return;
    let mounted = true;
    getFormById(id).then((data) => {
      if (mounted) {
        setForm(data);
        setLoading(false);
      }
    });
    return () => {
      mounted = false;
    };
  }, [id]);

  const handleBack = () => navigate("/settings/dynamic-forms");

  const handleDuplicate = async () => {
    if (!id) return;
    const duplicated = await duplicateForm(id);
    if (duplicated) navigate(`/settings/dynamic-forms/${duplicated.id}`);
  };

  const handleToggleStatus = async () => {
    if (!form) return;
    if (form.status === "ACTIVE") {
      const updated = await deactivateForm(form.id);
      if (updated) setForm(updated);
    } else {
      const updated = await activateForm(form.id);
      if (updated) setForm(updated);
    }
  };

  const handleConfirmDelete = async () => {
    if (!id) return;
    setIsDeleting(true);
    try {
      await deleteForm(id);
      navigate("/settings/dynamic-forms");
    } finally {
      setIsDeleting(false);
      setDeleteDialog(false);
    }
  };

  if (loading) {
    return <div className="text-center py-12 text-slate-600 dark:text-slate-400">Loading...</div>;
  }

  if (!form) {
    return (
      <div className="space-y-8">
        <div className="flex items-center gap-4">
          <button
            onClick={handleBack}
            className="flex h-10 w-10 items-center justify-center rounded-lg transition-colors hover:bg-slate-100 dark:hover:bg-slate-800"
          >
            <ArrowLeft className="h-5 w-5 text-slate-600 dark:text-slate-400" />
          </button>
          <div>
            <h1 className="text-3xl font-bold text-slate-900 dark:text-white">Form Not Found</h1>
            <p className="mt-1 text-slate-600 dark:text-slate-400">
              The form you are looking for could not be found.
            </p>
          </div>
        </div>
        <div className="rounded-2xl border border-dashed border-slate-300 bg-gradient-to-br from-slate-50 to-slate-100 p-12 text-center dark:border-slate-600 dark:from-slate-900/50 dark:to-slate-800/50">
          <FileText className="mx-auto mb-4 h-12 w-12 text-slate-400" />
          <h3 className="mb-2 text-lg font-bold text-slate-900 dark:text-white">
            This form does not exist
          </h3>
          <button
            onClick={handleBack}
            className="inline-flex items-center gap-2 rounded-lg bg-gradient-to-r from-blue-600 to-cyan-600 px-6 py-2 font-semibold text-white shadow-lg transition-all duration-200 hover:from-blue-700 hover:to-cyan-700 hover:shadow-xl"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Dynamic Forms
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-4">
          <button
            onClick={handleBack}
            className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg transition-colors hover:bg-slate-100 dark:hover:bg-slate-800"
          >
            <ArrowLeft className="h-5 w-5 text-slate-600 dark:text-slate-400" />
          </button>
          <div>
            <div className="flex items-center gap-3">
              <h1 className="text-3xl font-bold text-slate-900 dark:text-white">{form.formName}</h1>
              <DynamicFormStatusBadge status={form.status} />
            </div>
            <p className="mt-1 text-slate-600 dark:text-slate-400">
              {form.description || "No description"}
            </p>
          </div>
        </div>
      </div>

      <DynamicFormDetailsSection form={form} />

      <div className="rounded-2xl border border-slate-200/50 dark:border-slate-800/50 bg-white dark:bg-slate-900 shadow-sm p-8">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-bold text-slate-900 dark:text-white">Form Preview</h3>
          <button
            onClick={() => setShowPreview(!showPreview)}
            className="inline-flex items-center gap-2 rounded-lg border border-slate-200 dark:border-slate-700 px-4 py-2 text-sm font-semibold text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800"
          >
            {showPreview ? "Hide Preview" : "Show Preview"}
          </button>
        </div>
        {showPreview && <FormPreview fields={form.fields} />}
      </div>

      <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
        <button
          onClick={() => navigate(`/settings/dynamic-forms/${form.id}/edit`)}
          className="inline-flex items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-blue-600 to-cyan-600 px-6 py-3 font-semibold text-white shadow-lg transition-all duration-200 hover:from-blue-700 hover:to-cyan-700 hover:shadow-xl"
        >
          <Edit3 className="h-5 w-5" />
          Edit Form
        </button>
        <button
          onClick={handleDuplicate}
          className="inline-flex items-center justify-center gap-2 rounded-lg border border-slate-200 bg-white px-6 py-3 font-semibold text-slate-900 transition-all duration-200 hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-800 dark:text-white dark:hover:bg-slate-700/50"
        >
          <Copy className="h-5 w-5" />
          Duplicate
        </button>
        <button
          onClick={handleToggleStatus}
          className="inline-flex items-center justify-center gap-2 rounded-lg border border-slate-200 bg-white px-6 py-3 font-semibold text-slate-900 transition-all duration-200 hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-800 dark:text-white dark:hover:bg-slate-700/50"
        >
          {form.status === "ACTIVE" ? (
            <ToggleLeft className="h-5 w-5 text-green-600" />
          ) : (
            <ToggleRight className="h-5 w-5 text-slate-400" />
          )}
          {form.status === "ACTIVE" ? "Deactivate" : "Activate"}
        </button>
        <button
          onClick={() => setDeleteDialog(true)}
          className="inline-flex items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-red-600 to-rose-600 px-6 py-3 font-semibold text-white shadow-lg transition-all duration-200 hover:from-red-700 hover:to-rose-700 hover:shadow-xl"
        >
          <Trash2 className="h-5 w-5" />
          Delete
        </button>
      </div>

      <DynamicFormDeleteDialog
        open={deleteDialog}
        formName={form.formName}
        onConfirm={handleConfirmDelete}
        onCancel={() => setDeleteDialog(false)}
        isLoading={isDeleting}
      />
    </div>
  );
}
