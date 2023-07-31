import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Home } from "../components/Home";
import { NavBar } from "../components/NavBar";
import Login from "../components/Login";
import AuthValidation from "./validations/LoginValidation";
import Perfil from "../components/Perfil";
import DashboardRoutes from "./DashboardRoutes";
import Register from "../components/Register";

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/*"
          element={
            <AuthValidation>
              <DashboardRoutes />
            </AuthValidation>
          }
        />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;
