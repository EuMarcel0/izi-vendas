import type { ComponentProps } from "react";

import { type FormikProps } from "formik";

import { normalizeCPF } from "@/utils/inputMasks";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

export interface AppInputCPFCNPJProps<T> extends ComponentProps<typeof Input> {
  name: string;
  label?: string;
  errorMessage?: string;
  isError?: boolean;
  formik?: FormikProps<T>;
}

export default function AppInputCPFCNPJ<T>({
  name,
  isError,
  label,
  errorMessage,
  formik,
  ...restProps
}: AppInputCPFCNPJProps<T>) {
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
      <Input
        name={name}
        value={normalizeCPF(
          String((formik?.values as Record<string, unknown>)?.[name] ?? ""),
        )}
        className={`border border-gray-300 bg-tw-bg-light-secondary dark:bg-tw-bg-dark-secondary text-xs rounded ${
          isError
            ? "dark:border-red-500/20 border-red-500"
            : "border-slate-500/30 focus:dark:border-gray-500/50 focus:border-slate-500/50 dark:border-gray-500/30"
        }`}
        {...restProps}
      />
    </div>
  );
}
