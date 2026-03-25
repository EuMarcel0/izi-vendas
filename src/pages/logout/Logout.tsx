import { useEffect } from "react";

import { useAuthContext } from "@/context/useAuthContext";
import { Spinner } from "@/components/ui/spinner";

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export default function Logout() {
  const { handleLogout } = useAuthContext();

  useEffect(() => {
    delay(1400).then(() => {
      handleLogout();
    });
  }, [handleLogout]);

  return (
    <div className="flex flex-col min-h-screen items-center justify-center bg-gray-50 absolute inset-0">
      <Spinner className="size-12 text-primary" />
      <p className="text-sm text-main/50">Saindo...</p>
    </div>
  );
}
