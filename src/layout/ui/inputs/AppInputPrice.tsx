import { useEffect, type ChangeEvent, type ComponentProps } from "react";
import { useIMask } from "react-imask";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

type InputProps = ComponentProps<"input">;

export interface CustomInputProps extends Omit<InputProps, "type"> {
  label?: string;
  errorMessage?: string;
  isError?: boolean;
  prefix?: string;
}

function normalizeMaskValue(
  inputValue: string | number | readonly string[] | undefined,
): string | undefined {
  if (Array.isArray(inputValue)) {
    return inputValue.join("");
  }

  if (typeof inputValue === "number") {
    return String(inputValue);
  }

  return inputValue as string | undefined;
}

export default function AppInputPrice({
  className,
  id,
  name,
  isError,
  label,
  errorMessage,
  prefix = "R$",
  onChange,
  value,
  defaultValue,
  ...inputProps
}: CustomInputProps) {
  const inputId = id ?? name;
  const normalizedValue = normalizeMaskValue(value);
  const normalizedDefaultValue = normalizeMaskValue(defaultValue);
  const { ref, setValue } = useIMask<HTMLInputElement>(
    {
      mask: Number,
      scale: 2,
      thousandsSeparator: ".",
      radix: ",",
      mapToRadix: ["."],
      normalizeZeros: true,
      padFractionalZeros: true,
    },
    {
      defaultValue: normalizedDefaultValue,
      onAccept: (acceptedValue) => {
        handleAccept(String(acceptedValue));
      },
    },
  );

  useEffect(() => {
    if (normalizedValue !== undefined) {
      setValue(normalizedValue);
    }
  }, [normalizedValue, setValue]);

  const handleAccept = (maskedValue: string) => {
    if (!onChange) {
      return;
    }

    const event = {
      target: {
        id: inputId,
        name,
        value: maskedValue,
      },
      currentTarget: {
        id: inputId,
        name,
        value: maskedValue,
      },
    } as ChangeEvent<HTMLInputElement>;

    onChange(event);
  };

  return (
    <div className="space-y-1">
      {label && (
        <Label
          htmlFor={inputId}
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
      <div className="relative">
        {prefix && (
          <span className="pointer-events-none absolute top-1/2 left-2.5 -translate-y-1/2 text-xs text-muted-foreground">
            {prefix}
          </span>
        )}
        <Input
          ref={ref}
          id={inputId}
          name={name}
          inputMode="decimal"
          type="text"
          className={cn(
            "border border-gray-300 bg-tw-bg-light-secondary/60 dark:bg-tw-bg-dark-secondary/60 text-xs rounded",
            prefix && "pl-9",
            isError
              ? "dark:border-red-500/20 border-red-500"
              : "border-slate-500/20 focus:dark:border-gray-500/50 focus:border-slate-500/50 dark:border-gray-500/20",
            className,
          )}
          {...inputProps}
        />
      </div>
    </div>
  );
}
