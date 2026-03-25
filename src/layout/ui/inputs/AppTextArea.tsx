import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";

export interface CustomTextAreaProps extends React.ComponentProps<
  typeof Textarea
> {
  name: string;
  label?: string;
  errorMessage?: string;
  isError?: boolean;
  className?: string;
}

export default function AppTextArea({
  name,
  isError,
  label,
  errorMessage,
  className = "",
  ...restProps
}: CustomTextAreaProps) {
  return (
    <div className="space-y-1">
      {label && (
        <Label
          htmlFor={name}
          className={cn(
            "flex justify-between items-center text-xs gap-2 pt-0.5",
            isError && "text-red-500 dark:text-red-500/40",
          )}
        >
          {label}
          {errorMessage && isError && (
            <span className="dark:text-red-500/40 text-red-500 text-[9px] truncate">
              {errorMessage}
            </span>
          )}
        </Label>
      )}
      <Textarea
        name={name}
        className={cn(
          "border border-gray-300 bg-tw-bg-light-secondary/60 dark:bg-tw-bg-dark-secondary/60 text-xs rounded",
          isError
            ? "dark:border-red-500/20 border-red-500"
            : "border-slate-500/20 focus:dark:border-gray-500/50 focus:border-slate-500/50 dark:border-gray-500/20",
          className,
        )}
        {...restProps}
      />
    </div>
  );
}
