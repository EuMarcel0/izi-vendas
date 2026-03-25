/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  type ComponentPropsWithoutRef,
  type ComponentType,
  useContext,
  type JSX,
} from "react";

import { ModalContext } from "./ModalProvider";

export default function useModal<Component extends ComponentType<any>>({
  component,
  headerComponent,
  headerIcon,
  hideHeader,
  componentProps,
  contentContainerProps,
  headerContainerProps,
  options,
}: {
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
}) {
  const { open } = useContext(ModalContext);

  return {
    open: (
      componentPropsOnMount?: Omit<
        ComponentPropsWithoutRef<Component>,
        "_close"
      >,
    ) =>
      open({
        component,
        headerComponent,
        headerIcon,
        hideHeader,
        componentProps:
          componentPropsOnMount !== undefined
            ? componentPropsOnMount
            : componentProps,
        contentContainerProps,
        headerContainerProps,
        options,
      }),
  };
}
