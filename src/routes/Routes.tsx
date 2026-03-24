import { Route, Routes, useLocation } from "react-router";

import ForgotPassword from "@/pages/login/ForgotPassword";
import Profile from "../pages/profile/Profile";
import Register from "@/pages/login/Register";
import Login from "@/pages/login/Login";
import Home from "../pages/home/Home";
import Layout from "@/layout/Layout";

const pathsWithoutLayout = [
  "/auth/login",
  "/auth/register",
  "/auth/forgot-password",
];

export default function AppRoutes() {
  const { pathname } = useLocation();

  if (pathsWithoutLayout.includes(pathname)) {
    return (
      <Routes>
        <Route path="/auth/login" element={<Login />} />
        <Route path="/auth/register" element={<Register />} />
        <Route path="/auth/forgot-password" element={<ForgotPassword />} />
      </Routes>
    );
  }

  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
    </Layout>
  );
}
