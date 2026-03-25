import React from "react";

import { Spinner } from "@/components/ui/spinner";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type AppButtonProps = React.ComponentProps<"button"> & {
  textButton?: string;
  icon?: React.ReactNode;
  isLoading?: boolean;
  loadingText?: string;
  disabled?: boolean;
  fullWidth?: boolean;
  variant?:
    | "link"
    | "default"
    | "outline"
    | "secondary"
    | "ghost"
    | "destructive"
    | null;
};

export default function AppButton({
  textButton,
  icon,
  isLoading = false,
  loadingText,
  disabled = false,
  fullWidth = false,
  variant = "default",
  ...restProps
}: AppButtonProps) {
  return (
    <Button
      className={cn(
        `flex justify-center items-center gap-2`,
        fullWidth && "w-full",
        restProps.className,
      )}
      disabled={isLoading || disabled}
      variant={variant}
      {...restProps}
    >
      <div className="flex justify-center items-center gap-2 w-full">
        {icon && !isLoading && icon}
        {isLoading && <Spinner />}
        <p className="pt-0.5">
          {isLoading && loadingText ? loadingText : textButton}
        </p>
      </div>
    </Button>
  );
}
