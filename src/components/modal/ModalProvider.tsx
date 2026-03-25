/* eslint-disable @typescript-eslint/no-explicit-any */

import {
  type ComponentPropsWithoutRef,
  type PropsWithChildren,
  type ComponentType,
  createContext,
  useCallback,
  type JSX,
  useState,
  useMemo,
} from "react";

import Modal, { type ModalProps } from "./Modal";

export type ModalComponentProps = {
  _close: () => void;
};

/* eslint-disable no-unused-vars */
export type ModalComponent<Component extends ComponentType<any>> = (
  _props: ModalComponentProps & ComponentPropsWithoutRef<Component>,
) => JSX.Element;

export type OpenModalOptions<Component extends ComponentType<any>> = {
  component: Component;
  headerComponent?: string | JSX.Element;
  headerIcon?: JSX.Element;
  hideHeader?: boolean;
  componentProps?: ComponentPropsWithoutRef<Component>;
  contentContainerProps?: JSX.IntrinsicElements["div"];
  headerContainerProps?: JSX.IntrinsicElements["div"];
  options?: {
    clickOutsideToClose?: boolean;
  };
};

export type ModalContextValue<Component extends ComponentType<any>> = {
  open: (_modalOptions: OpenModalOptions<Component>) => void;
};
/* eslint-enable no-unused-vars */

export const ModalContext = createContext<ModalContextValue<any>>(null as any);

export default function ModalProvider<ComponentProps extends object>({
  children,
}: PropsWithChildren<object>) {
  const [modal, setModal] = useState<ModalProps<ComponentProps> | null>(null);
  const [open, setOpen] = useState(false);

  const close = () => {
    setOpen(false);
    setModal(null);
  };

  const openModal = useCallback(
    ({
      component,
      componentProps,
      contentContainerProps,
      headerContainerProps,
      options,
      headerComponent,
      headerIcon,
      hideHeader,
    }: OpenModalOptions<ComponentType<unknown>>) => {
      const modalItem: ModalProps<ComponentProps> = {
        open,
        close,
        component: component as ModalProps<ComponentProps>["component"],
        headerComponent,
        headerIcon,
        hideHeader,
        componentProps: componentProps as ComponentProps | undefined,
        contentContainerProps,
        headerContainerProps,
        options,
      };

      setModal(modalItem);
      setOpen(true);
    },
    [open],
  );

  const providerValue = useMemo(() => ({ open: openModal }), [openModal]);

  return (
    <ModalContext.Provider value={providerValue}>
      {modal !== null && (
        <Modal
          open={open}
          close={modal.close}
          component={modal.component}
          headerComponent={modal.headerComponent}
          headerIcon={modal.headerIcon}
          hideHeader={modal.hideHeader}
          componentProps={modal.componentProps}
          contentContainerProps={modal.contentContainerProps}
          headerContainerProps={modal.headerContainerProps}
          options={modal.options}
        />
      )}
      {children}
    </ModalContext.Provider>
  );
}
