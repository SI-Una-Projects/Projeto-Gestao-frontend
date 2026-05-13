import { useEffect, useState } from "react";
import { listarUsuarios } from "../services/usuarioService";

function Dashboard() {
  const [projetosCount, setProjetosCount] = useState<number | null>(null);
  const [tarefasCount, setTarefasCount] = useState<number | null>(null);
  const [usuariosCount, setUsuariosCount] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    carregarContagens();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function tryFetchCount(paths: string[]) {
    for (const p of paths) {
      try {
        const res = await fetch(p, { credentials: "include" });
        if (!res.ok) continue;
        const json = await res.json().catch(() => null);
        if (Array.isArray(json)) return json.length;
        if (!json) continue;
        if (Array.isArray(json.data)) return json.data.length;
        if (Array.isArray(json.results)) return json.results.length;
        // if payload itself is an object representing a single resource, return 1
        if (typeof json === "object") {
          // no list found -> cannot determine count
          continue;
        }
      } catch {
        // try next path
      }
    }
    return null;
  }

  async function carregarContagens() {
    setLoading(true);
    setError(null);

    try {
      // Usuários via serviço existente
      const res: any = await listarUsuarios();
      let uCount: number | null = null;
      if (Array.isArray(res)) uCount = res.length;
      else if (res?.data && Array.isArray(res.data)) uCount = res.data.length;
      else if (res?.data?.data && Array.isArray(res.data.data)) uCount = res.data.data.length;
      else uCount = null;

      // Projetos: tenta endpoints comuns
      const pCount = await tryFetchCount([
        "/api/projetos",
        "/projetos",
        "/api/projects",
        "/projects",
      ]);

      // Tarefas: tenta endpoints comuns
      const tCount = await tryFetchCount([
        "/api/tarefas",
        "/tarefas",
        "/api/tasks",
        "/tasks",
      ]);

      setUsuariosCount(uCount ?? 0);
      setProjetosCount(pCount ?? 0);
      setTarefasCount(tCount ?? 0);
    } catch (err: any) {
      console.error("Erro ao carregar contagens do dashboard", err);
      setError("Erro ao carregar dados do dashboard.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div>
      <h1 className="text-3xl font-bold mb-8">Dashboard</h1>

      <div className="grid grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-xl shadow">
          <h2 className="text-lg font-semibold">Projetos</h2>

          <p className="text-4xl mt-4 font-bold text-blue-600">
            {loading ? "..." : projetosCount ?? 0}
          </p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow">
          <h2 className="text-lg font-semibold">Tarefas</h2>

          <p className="text-4xl mt-4 font-bold text-green-600">
            {loading ? "..." : tarefasCount ?? 0}
          </p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow">
          <h2 className="text-lg font-semibold">Usuários</h2>

          <p className="text-4xl mt-4 font-bold text-purple-600">
            {loading ? "..." : usuariosCount ?? 0}
          </p>
        </div>
      </div>

      {error && (
        <div className="mt-4 text-red-600">
          <p>{error}</p>
          <button
            type="button"
            onClick={carregarContagens}
            className="mt-2 bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded"
          >
            Tentar novamente
          </button>
        </div>
      )}
    </div>
  );
}

export default Dashboard;