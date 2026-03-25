import { type ComponentType, type JSX } from "react";
import { XIcon } from "lucide-react";

import { type ModalComponent, type ModalComponentProps } from "./ModalProvider";
import {
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialog,
} from "@/components/ui/alert-dialog";

export type ModalProps<ComponentProps extends object> = {
  open: boolean;
  close: () => void;
  component: ModalComponent<ComponentType<unknown>>;
  componentProps?: ComponentProps;
  contentContainerProps?: JSX.IntrinsicElements["div"];
  headerComponent?: string | JSX.Element;
  headerIcon?: JSX.Element;
  headerContainerProps?: JSX.IntrinsicElements["div"];
  hideHeader?: boolean;
  options?: {
    clickOutsideToClose?: boolean;
  };
};

export default function Modal<ComponentProps extends object>({
  open,
  close,
  component,
  componentProps,
  headerComponent,
  headerIcon,
  contentContainerProps,
  headerContainerProps,
  options,
  hideHeader = false,
}: ModalProps<ComponentProps>) {
  const modalComponentProps = {
    _close: close,
    ...(componentProps ?? {}),
  } as ModalComponentProps & ComponentProps;

  return (
    <AlertDialog open={!!open} aria-labelledby="dialog">
      <AlertDialogContent
        close={close}
        closeOnOverlayClick={options?.clickOutsideToClose ?? true}
      >
        <div>
          <AlertDialogHeader>
            {headerComponent && !hideHeader && (
              <div
                className="w-full flex items-center justify-between rounded-t dark:border-gray-500/20 border-slate-500/20 border-b p-5 py-2 px-1 min-w-62.5"
                {...headerContainerProps}
              >
                {headerIcon && headerIcon}
                <h3 className="text-sm font-medium text-tw-text-light dark:text-tw-text-dark">
                  {headerComponent}
                </h3>
                <XIcon
                  className="w-4 h-4 cursor-pointer text-gray-500"
                  onClick={() => close()}
                />
              </div>
            )}
          </AlertDialogHeader>
          <div className="p-5 py-2 px-1" {...contentContainerProps}>
            {component(modalComponentProps as Parameters<typeof component>[0])}
          </div>
        </div>
      </AlertDialogContent>
    </AlertDialog>
  );
}
