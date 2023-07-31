import { Navigate, Route, Routes } from "react-router-dom";
import { Home } from "../components/Home";
import { NavBar } from "../components/NavBar";
import Perfil from "../components/Perfil";

const DashboardRoutes = () => {
  return (
    <>
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/perfil" element={<Perfil />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </>
  );
};

export default DashboardRoutes;
