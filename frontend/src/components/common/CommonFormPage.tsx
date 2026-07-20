import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeft, CheckCircle } from "lucide-react";
import { DataForm, type FormField } from "./DataForm";

export interface CommonFormPageProps {
  title: string;
  description: string;
  fields: FormField[];
  initialValues?: Record<string, any>;
  onSubmit: (data: Record<string, any>) => Promise<void>;
  submitLabel?: string;
  cancelPath: string;
  isLoading?: boolean;
  showSuccess?: boolean;
  successMessage?: string;
  successSubMessage?: string;
}

export function CommonFormPage({
  title,
  description,
  fields,
  initialValues = {},
  onSubmit,
  submitLabel = "Submit",
  cancelPath,
  isLoading = false,
  showSuccess = false,
  successMessage = "Success!",
  successSubMessage = "Redirecting...",
}: CommonFormPageProps) {
  const navigate = useNavigate();

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => navigate(cancelPath)}
          className="hover:bg-slate-100 dark:hover:bg-slate-800"
        >
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-cyan-600 dark:from-blue-400 dark:to-cyan-400 bg-clip-text text-transparent">
            {title}
          </h1>
          <p className="text-slate-600 dark:text-slate-400 mt-2 text-lg">{description}</p>
        </div>
      </div>

      {/* Success Message */}
      {showSuccess && (
        <div className="rounded-xl border-2 border-green-300 bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-950/30 dark:to-emerald-950/30 p-5 flex items-center gap-3 shadow-lg animate-in fade-in slide-in-from-top-2 duration-300">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-green-500 to-emerald-500 text-white">
            <CheckCircle className="h-6 w-6" />
          </div>
          <div>
            <p className="font-bold text-green-700 dark:text-green-300 text-lg">{successMessage}</p>
            <p className="text-sm text-green-600 dark:text-green-400">{successSubMessage}</p>
          </div>
        </div>
      )}

      {/* Form Container */}
      <div className="rounded-2xl border border-slate-200/50 dark:border-slate-800/50 bg-white dark:bg-slate-900 shadow-sm p-8">
        <DataForm
          fields={fields}
          initialValues={initialValues}
          onSubmit={onSubmit}
          submitLabel={submitLabel}
          loading={isLoading}
        />
      </div>
    </div>
  );
}
