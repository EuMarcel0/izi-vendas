import { format, parseISO } from "date-fns";
import type { ComponentProps } from "react";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { ChevronDownIcon } from "lucide-react";

import { cn } from "@/lib/utils";

/* eslint-disable no-unused-vars */
type AppDatePickerInputProps = Omit<
  ComponentProps<typeof Button>,
  "value" | "onChange" | "children"
> & {
  name: string;
  value?: string;
  label?: string;
  placeholder?: string;
  errorMessage?: string;
  isError?: boolean;
  onChange?: (value: string) => void;
  onBlur?: () => void;
};
/* eslint-enable no-unused-vars */

export default function AppDatePickerInput({
  className,
  name,
  value,
  label,
  placeholder = "Selecione uma data",
  errorMessage,
  isError,
  onChange,
  onBlur,
  ...buttonProps
}: AppDatePickerInputProps) {
  const selectedDate = value ? parseISO(value) : undefined;
  const hasSelectedDate =
    !!selectedDate && !Number.isNaN(selectedDate.getTime());

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

      <Popover>
        <PopoverTrigger asChild>
          <Button
            id={name}
            name={name}
            type="button"
            variant="outline"
            data-empty={!hasSelectedDate}
            className={cn(
              "w-full justify-between border border-gray-300 bg-tw-bg-light-secondary/60 dark:bg-tw-bg-dark-secondary/60 text-xs rounded font-normal",
              isError
                ? "dark:border-red-500/20 border-red-500"
                : "border-slate-500/20 focus:dark:border-gray-500/50 focus:border-slate-500/50 dark:border-gray-500/20",
              "data-[empty=true]:text-muted-foreground",
              className,
            )}
            onBlur={onBlur}
            {...buttonProps}
          >
            {hasSelectedDate ? (
              format(selectedDate, "dd/MM/yyyy")
            ) : (
              <span>{placeholder}</span>
            )}
            <ChevronDownIcon />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            mode="single"
            selected={selectedDate}
            onSelect={(date) => {
              if (!date) {
                onChange?.("");
                return;
              }

              onChange?.(format(date, "yyyy-MM-dd"));
            }}
            defaultMonth={selectedDate}
          />
        </PopoverContent>
      </Popover>
    </div>
  );
}
