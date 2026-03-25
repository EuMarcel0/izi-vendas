import { Navigate, Route, Routes, useLocation } from "react-router";

import { useAuthContext } from "@/context/useAuthContext";
import ForgotPassword from "@/pages/login/ForgotPassword";
import { Spinner } from "@/components/ui/spinner";
import Profile from "../pages/profile/Profile";
import Register from "@/pages/login/Register";
import Logout from "@/pages/logout/Logout";
import Login from "@/pages/login/Login";
import Home from "../pages/home/Home";
import Layout from "@/layout/Layout";
import Products from "@/pages/products/Products";

export default function AppRoutes() {
  const { isAuthenticated, isInitializing } = useAuthContext();
  const { pathname } = useLocation();

  const isAuthRoute = pathname.startsWith("/auth");
  const isLogoutRoute = pathname === "/logout";

  if (isInitializing) {
    return (
      <div className="flex flex-col min-h-screen items-center justify-center bg-gray-50 absolute inset-0">
        <Spinner className="size-12 text-primary" />
        <p className="text-sm text-main/50">Carregando...</p>
      </div>
    );
  }

  if (!isAuthenticated && !isAuthRoute) {
    return <Navigate to="/auth/login" replace />;
  }

  if (isAuthenticated && isAuthRoute) {
    return <Navigate to="/" replace />;
  }

  if (isLogoutRoute) {
    return (
      <Routes>
        <Route path="/logout" element={<Logout />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    );
  }

  if (isAuthRoute) {
    return (
      <Routes>
        <Route path="/auth/login" element={<Login />} />
        <Route path="/auth/register" element={<Register />} />
        <Route path="/auth/forgot-password" element={<ForgotPassword />} />
        <Route path="*" element={<Navigate to="/auth/login" replace />} />
      </Routes>
    );
  }

  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/products" element={<Products />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Layout>
  );
}
