import type { ComponentProps, ReactNode } from "react";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

export interface AppSelectOption {
  label: ReactNode;
  value: string;
  disabled?: boolean;
}

export interface AppSelectProps extends ComponentProps<typeof Select> {
  id?: string;
  name?: string;
  label?: string;
  placeholder?: string;
  errorMessage?: string;
  isError?: boolean;
  className?: string;
  contentClassName?: string;
  options?: AppSelectOption[];
  children?: ReactNode;
}

export default function AppSelect({
  children,
  className,
  contentClassName,
  errorMessage,
  id,
  isError,
  label,
  name,
  options,
  placeholder,
  ...selectProps
}: AppSelectProps) {
  const selectId = id ?? name;
  const hasItems = Boolean(children) || Boolean(options?.length);

  return (
    <div className="space-y-1">
      {label && (
        <Label
          htmlFor={selectId}
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

      <Select name={name} {...selectProps}>
        <SelectTrigger
          id={selectId}
          aria-invalid={isError || undefined}
          className={cn(
            "w-full border border-gray-300 bg-tw-bg-light-secondary/60 dark:bg-tw-bg-dark-secondary/60 text-xs rounded",
            isError
              ? "dark:border-red-500/20 border-red-500"
              : "border-slate-500/20 focus:dark:border-gray-500/50 focus:border-slate-500/50 dark:border-gray-500/20",
            className,
          )}
        >
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>

        {hasItems && (
          <SelectContent className={contentClassName}>
            {children}
            {!children &&
              options?.map((option) => (
                <SelectItem
                  key={option.value}
                  value={option.value}
                  disabled={option.disabled}
                >
                  {option.label}
                </SelectItem>
              ))}
          </SelectContent>
        )}
      </Select>
    </div>
  );
}
