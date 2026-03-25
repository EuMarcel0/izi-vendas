import { TooltipProvider } from "@/components/ui/tooltip";
import { ToastContainer } from "react-toastify";
import { BrowserRouter } from "react-router";

import ModalProvider from "./components/modal/ModalProvider";
import { AuthProvider } from "./context/useAuthContext";
import AppRoutes from "./routes/Routes";

export default function App() {
  return (
    <AuthProvider>
      <ModalProvider>
        <TooltipProvider>
          <BrowserRouter>
            <AppRoutes />
            <ToastContainer
              style={{
                fontSize: "12px",
              }}
            />
          </BrowserRouter>
        </TooltipProvider>
      </ModalProvider>
    </AuthProvider>
  );
}
