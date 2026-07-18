import { AlertCircle } from "lucide-react";
import { cn } from "@/lib/utils";

interface FormTextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label: string;
  error?: string;
  required?: boolean;
  helper?: string;
  maxLength?: number;
}

export function FormTextarea({
  label,
  error,
  required = false,
  helper,
  maxLength,
  className,
  value,
  ...props
}: FormTextareaProps) {
  const characterCount = typeof value === "string" ? value.length : 0;

  return (
    <div className="space-y-2">
      <label htmlFor={props.id} className="text-sm font-medium">
        {label}
        {required && <span className="text-destructive ml-1">*</span>}
      </label>
      <textarea
        maxLength={maxLength}
        className={cn(
          "flex w-full rounded-lg border border-input bg-transparent px-2.5 py-1.5 text-sm outline-hidden transition-colors placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50 focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 resize-none",
          error && "border-destructive focus-visible:border-destructive focus-visible:ring-destructive/20",
          className
        )}
        value={value}
        {...props}
      />
      <div className="flex items-center justify-between">
        <div>
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
        {maxLength && (
          <p className="text-xs text-muted-foreground">
            {characterCount}/{maxLength}
          </p>
        )}
      </div>
    </div>
  );
}
