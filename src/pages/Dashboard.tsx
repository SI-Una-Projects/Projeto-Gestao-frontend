import { useEffect, useState } from "react";

import { listarUsuarios } from "../services/usuarioService";
import { listarProjetos } from "../services/projetoService";
import { listarTarefas } from "../services/tarefaService";
import { listarEquipes } from "../services/equipeService";

function Dashboard() {

  const [usuariosCount, setUsuariosCount] =
    useState(0);

  const [projetosCount, setProjetosCount] =
    useState(0);

  const [equipesCount, setEquipesCount] =
    useState(0);

  const [tarefasCount, setTarefasCount] =
    useState(0);

  const [tarefasPendentes, setTarefasPendentes] =
    useState(0);

  const [tarefasConcluidas, setTarefasConcluidas] =
    useState(0);

  const [loading, setLoading] =
    useState(false);

  useEffect(() => {

    carregarDashboard();

  }, []);

  async function carregarDashboard() {

    try {

      setLoading(true);

      // 🔥 usuários
      const usuarios: any =
        await listarUsuarios();

      const usuariosLista =
        Array.isArray(usuarios?.data)
          ? usuarios.data
          : Array.isArray(usuarios)
          ? usuarios
          : [];

      setUsuariosCount(
        usuariosLista.length
      );

      // 🔥 projetos
      const projetos: any =
        await listarProjetos();

      const projetosLista =
        Array.isArray(projetos?.data)
          ? projetos.data
          : Array.isArray(projetos)
          ? projetos
          : [];

      setProjetosCount(
        projetosLista.length
      );

      // 🔥 equipes
      const equipes: any =
        await listarEquipes();

      const equipesLista =
        Array.isArray(equipes?.data)
          ? equipes.data
          : Array.isArray(equipes)
          ? equipes
          : [];

      setEquipesCount(
        equipesLista.length
      );

      // 🔥 tarefas
      const tarefas: any =
        await listarTarefas();

      const tarefasLista =
        Array.isArray(tarefas?.data)
          ? tarefas.data
          : Array.isArray(tarefas)
          ? tarefas
          : [];

      setTarefasCount(
        tarefasLista.length
      );

      // 🔥 pendentes
      setTarefasPendentes(

        tarefasLista.filter(
          (t: any) =>
            t.status === "PENDENTE"
        ).length
      );

      // 🔥 concluídas
      setTarefasConcluidas(

        tarefasLista.filter(
          (t: any) =>
            t.status === "CONCLUIDA"
        ).length
      );

    } catch (err) {

      console.error(
        "Erro ao carregar dashboard",
        err
      );

    } finally {

      setLoading(false);
    }
  }

  return (

    <div>

      <div className="mb-8">

        <h1 className="text-3xl font-bold text-gray-800">
          Dashboard
        </h1>

        <p className="text-gray-500 mt-2">
          Visão geral do sistema de gestão
        </p>

      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">

        {/* Usuários */}
        <div className="bg-white rounded-2xl shadow-md p-6 border">

          <h2 className="text-lg font-semibold text-gray-700">
            Usuários
          </h2>

          <p className="text-4xl font-bold text-purple-600 mt-4">

            {loading
              ? "..."
              : usuariosCount}

          </p>

        </div>

        {/* Projetos */}
        <div className="bg-white rounded-2xl shadow-md p-6 border">

          <h2 className="text-lg font-semibold text-gray-700">
            Projetos
          </h2>

          <p className="text-4xl font-bold text-blue-600 mt-4">

            {loading
              ? "..."
              : projetosCount}

          </p>

        </div>

        {/* Equipes */}
        <div className="bg-white rounded-2xl shadow-md p-6 border">

          <h2 className="text-lg font-semibold text-gray-700">
            Equipes
          </h2>

          <p className="text-4xl font-bold text-orange-600 mt-4">

            {loading
              ? "..."
              : equipesCount}

          </p>

        </div>

        {/* Tarefas */}
        <div className="bg-white rounded-2xl shadow-md p-6 border">

          <h2 className="text-lg font-semibold text-gray-700">
            Tarefas
          </h2>

          <p className="text-4xl font-bold text-green-600 mt-4">

            {loading
              ? "..."
              : tarefasCount}

          </p>

        </div>

        {/* Pendentes */}
        <div className="bg-white rounded-2xl shadow-md p-6 border">

          <h2 className="text-lg font-semibold text-gray-700">
            Pendentes
          </h2>

          <p className="text-4xl font-bold text-yellow-500 mt-4">

            {loading
              ? "..."
              : tarefasPendentes}

          </p>

        </div>

        {/* Concluídas */}
        <div className="bg-white rounded-2xl shadow-md p-6 border">

          <h2 className="text-lg font-semibold text-gray-700">
            Concluídas
          </h2>

          <p className="text-4xl font-bold text-emerald-600 mt-4">

            {loading
              ? "..."
              : tarefasConcluidas}

          </p>

        </div>

      </div>

    </div>
  );
}

export default Dashboard;