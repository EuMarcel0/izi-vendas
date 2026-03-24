import { TooltipProvider } from "@/components/ui/tooltip";
import { ToastContainer } from "react-toastify";
import { BrowserRouter } from "react-router";

import { AuthProvider } from "./context/useAuthContext";
import AppRoutes from "./routes/Routes";

export default function App() {
  return (
    <AuthProvider>
      <TooltipProvider>
        <BrowserRouter>
          <AppRoutes />
          <ToastContainer />
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  );
}
