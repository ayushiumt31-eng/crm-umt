import { useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { ArrowLeft, CheckCircle, Save } from "lucide-react";
import { Button } from "@/components/ui/button";
import { getFormById, updateForm } from "../services/dynamicFormService";
import { FormBuilder } from "../components/FormBuilder";
import { availableModulesList } from "../data/dummy-dynamic-forms";
import type { FormFieldDefinition, FormStatus } from "../types/dynamicForm";

export default function EditDynamicForm() {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const [loading, setLoading] = useState(true);
  const [formName, setFormName] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState<FormStatus>("ACTIVE");
  const [assignedModules, setAssignedModules] = useState<string[]>([]);
  const [fields, setFields] = useState<FormFieldDefinition[]>([]);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    if (!id) return;
    let mounted = true;
    getFormById(id).then((data) => {
      if (mounted && data) {
        setFormName(data.formName);
        setDescription(data.description);
        setStatus(data.status);
        setAssignedModules(data.assignedModules);
        setFields(data.fields);
      }
      if (mounted) setLoading(false);
    });
    return () => {
      mounted = false;
    };
  }, [id]);

  const toggleModule = (module: string) => {
    setAssignedModules((prev) =>
      prev.includes(module) ? prev.filter((m) => m !== module) : [...prev, module]
    );
  };

  const handleSubmit = async () => {
    if (!formName.trim()) {
      setError("Form name is required.");
      return;
    }
    if (assignedModules.length === 0) {
      setError("Please assign at least one module.");
      return;
    }
    if (!id) return;
    setError("");
    await updateForm(id, {
      formName: formName.trim(),
      description: description.trim(),
      assignedModules,
      fields,
      status,
    });
    setSuccess(true);
    setTimeout(() => {
      navigate(`/settings/dynamic-forms/${id}`);
    }, 1200);
  };

  if (loading) {
    return <div className="text-center py-12 text-slate-600 dark:text-slate-400">Loading...</div>;
  }

  return (
    <div className="space-y-8">
      <div className="flex items-center gap-4">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => navigate(`/settings/dynamic-forms/${id}`)}
          className="hover:bg-slate-100 dark:hover:bg-slate-800"
        >
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-cyan-600 dark:from-blue-400 dark:to-cyan-400 bg-clip-text text-transparent">
            Edit Dynamic Form
          </h1>
          <p className="text-slate-600 dark:text-slate-400 mt-2 text-lg">
            Update the form details, fields and module assignments.
          </p>
        </div>
      </div>

      {success && (
        <div className="rounded-xl border-2 border-green-300 bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-950/30 dark:to-emerald-950/30 p-5 flex items-center gap-3 shadow-lg animate-in fade-in slide-in-from-top-2 duration-300">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-green-500 to-emerald-500 text-white">
            <CheckCircle className="h-6 w-6" />
          </div>
          <div>
            <p className="font-bold text-green-700 dark:text-green-300 text-lg">Form Updated!</p>
            <p className="text-sm text-green-600 dark:text-green-400">Redirecting...</p>
          </div>
        </div>
      )}

      <div className="rounded-2xl border border-slate-200/50 dark:border-slate-800/50 bg-white dark:bg-slate-900 shadow-sm p-8">
        <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-6">Basic Information</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300">
              Form Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={formName}
              onChange={(e) => setFormName(e.target.value)}
              placeholder="e.g. Customer Verification Form"
              className="w-full px-4 py-3 rounded-xl border border-blue-200 dark:border-blue-900/40 bg-white dark:bg-slate-900 text-slate-900 dark:text-white placeholder-slate-400 font-medium transition-all focus:border-blue-500 focus:ring-2 focus:ring-blue-300 dark:focus:ring-blue-900/40"
            />
          </div>
          <div className="space-y-2">
            <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300">
              Status
            </label>
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value as FormStatus)}
              className="w-full px-4 py-3 rounded-xl border border-blue-200 dark:border-blue-900/40 bg-white dark:bg-slate-900 text-slate-900 dark:text-white font-medium transition-all focus:border-blue-500 focus:ring-2 focus:ring-blue-300 dark:focus:ring-blue-900/40"
            >
              <option value="ACTIVE">Active</option>
              <option value="INACTIVE">Inactive</option>
            </select>
          </div>
          <div className="md:col-span-2 space-y-2">
            <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300">
              Description
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Describe the purpose of this form"
              rows={3}
              className="w-full px-4 py-3 rounded-xl border border-blue-200 dark:border-blue-900/40 bg-white dark:bg-slate-900 text-slate-900 dark:text-white placeholder-slate-400 font-medium transition-all resize-none focus:border-blue-500 focus:ring-2 focus:ring-blue-300 dark:focus:ring-blue-900/40"
            />
          </div>
        </div>
      </div>

      <div className="rounded-2xl border border-slate-200/50 dark:border-slate-800/50 bg-white dark:bg-slate-900 shadow-sm p-8">
        <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-2">Assigned Modules</h2>
        <p className="text-sm text-slate-500 dark:text-slate-400 mb-6">
          Select one or more modules where this form will be displayed.
        </p>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
          {availableModulesList.map((module) => {
            const isSelected = assignedModules.includes(module);
            return (
              <button
                key={module}
                type="button"
                onClick={() => toggleModule(module)}
                className={`px-4 py-3 rounded-xl border text-sm font-medium transition-all ${
                  isSelected
                    ? "border-blue-500 bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300"
                    : "border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800"
                }`}
              >
                {module}
              </button>
            );
          })}
        </div>
      </div>

      <div className="rounded-2xl border border-slate-200/50 dark:border-slate-800/50 bg-white dark:bg-slate-900 shadow-sm p-8">
        <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-6">Form Fields</h2>
        <FormBuilder fields={fields} onChange={setFields} />
      </div>

      {error && (
        <p className="text-red-600 dark:text-red-400 text-sm font-medium">✗ {error}</p>
      )}

      <div className="flex flex-col sm:flex-row justify-end gap-3 pt-4">
        <Button
          variant="outline"
          onClick={() => navigate(`/settings/dynamic-forms/${id}`)}
          className="px-6 py-2 order-2 sm:order-1"
        >
          Cancel
        </Button>
        <Button
          onClick={handleSubmit}
          className="bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white font-semibold px-6 py-2 rounded-lg transition-all order-1 sm:order-2 flex items-center gap-2"
        >
          <Save className="h-4 w-4" />
          Update Form
        </Button>
      </div>
    </div>
  );
}
