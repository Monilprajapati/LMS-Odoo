import React from "react";
import { Route, Routes } from "react-router-dom";

import PublicRoute from "./PublicRoute";
import ProtectedRoute from "./ProtectedRoute";
import UserAuthForm from "../pages/UserAuthForm";
import UserDashboard from "../pages/UserDashboard";
import AdminDashboard from "../pages/AdminDashboard";
import VerifyOtp from "../pages/VerifyOtp";
import UpdatePassword from "../pages/UpdatePassword";
import ForgotPassword from "../pages/ForgotPassword";

import { useUserContext } from "../contexts/userContext";
import UserProfile from "../pages/UserProfile";

const CustomRoutes = () => {
  const { userRole } = useUserContext();

  return (
    <Routes>
      <Route
        path="/login"
        element={
          <PublicRoute>
            <UserAuthForm type="login" />
          </PublicRoute>
        }
      />

      <Route
        path="/register"
        element={
          <PublicRoute>
            <UserAuthForm type="register" />
          </PublicRoute>
        }
      />

      <Route
        path="/verifyOtp"
        element={
          <PublicRoute>
            <VerifyOtp />
          </PublicRoute>
        }
      />

      <Route
        path="/forgot-password"
        element={
          <PublicRoute>
            <ForgotPassword />
          </PublicRoute>
        }
      />

      <Route
        path="/reset-password/:userId"
        element={
          <PublicRoute>
            <UpdatePassword />
          </PublicRoute>
        }
      />

      <Route
        path="/profile"
        element={
          <ProtectedRoute role={userRole}>
            <UserProfile />
          </ProtectedRoute>
        }
      />

      <Route
        path="/"
        element={
          userRole == "admin" ? (
            <ProtectedRoute role="admin">
              <AdminDashboard />
            </ProtectedRoute>
          ) : (
            <ProtectedRoute role="user">
              <UserDashboard />
            </ProtectedRoute>
          )
        }
      />
    </Routes>
  );
};

export default CustomRoutes;
