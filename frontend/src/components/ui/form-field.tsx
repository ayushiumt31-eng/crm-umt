import { AlertCircle } from "lucide-react";
import { cn } from "@/lib/utils";

interface FormFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
  required?: boolean;
  helper?: string;
}

export function FormField({
  label,
  error,
  required = false,
  helper,
  className,
  ...props
}: FormFieldProps) {
  return (
    <div className="space-y-2">
      <label htmlFor={props.id} className="text-sm font-medium">
        {label}
        {required && <span className="text-destructive ml-1">*</span>}
      </label>
      <input
        className={cn(
          "flex h-8 w-full rounded-lg border border-input bg-transparent px-2.5 py-1 text-sm outline-hidden transition-colors placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50 focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50",
          error && "border-destructive focus-visible:border-destructive focus-visible:ring-destructive/20",
          className
        )}
        {...props}
      />
      {error && (
        <div className="flex items-center gap-1.5 text-sm text-destructive">
          <AlertCircle className="h-4 w-4 shrink-0" />
          <span>{error}</span>
        </div>
      )}
      {helper && !error && (
        <p className="text-xs text-muted-foreground">{helper}</p>
      )}
    </div>
  );
}
