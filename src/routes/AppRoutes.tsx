import { BrowserRouter, Routes, Route } from "react-router-dom";

import Sidebar from "../components/layout/Sidebar";
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";

import Dashboard from "../pages/Dashboard";
import Projetos from "../pages/projetos/Projetos";
import Tarefas from "../pages/tarefas/Tarefas";
import Equipes from "../pages/equipes/Equipes";
import Usuarios from "../pages/usuarios/Usuarios";

function AppRoutes() {
  return (
    <BrowserRouter>
      <div className="flex min-h-screen bg-gray-100">
        <Sidebar />

        <div className="flex-1 flex flex-col">
          <Navbar />

          <main className="flex-1 p-6">
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/projetos" element={<Projetos />} />
              <Route path="/tarefas" element={<Tarefas />} />
              <Route path="/equipes" element={<Equipes />} />
              <Route path="/usuarios" element={<Usuarios />} />
            </Routes>
          </main>

          <Footer />
        </div>
      </div>
    </BrowserRouter>
  );
}

export default AppRoutes;