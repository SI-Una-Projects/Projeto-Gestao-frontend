import { useEffect, useState } from "react";

import {
  listarProjetos,
  deletarProjeto
} from "../../services/projetoService";
import type { Projeto } from "../../types/Projeto";
import { ProjetoCard } from "../../components/projeto/ProjetoCard";
import { ProjetoForm } from "../../components/projeto/ProjetoForm";

function Projetos() {
  const [projetos, setProjetos] = useState<Projeto[]>([]);
  const [mostraForm, setMostraForm] = useState(false);
  const [selecionado, setSelecionado] = useState<Projeto | undefined>(undefined);

  useEffect(() => {
    carregarProjetos();
  }, []);

  async function carregarProjetos() {
    try {
      const data = await listarProjetos();
      setProjetos(data);
    } catch (error) {
      console.error("Erro ao carregar projetos", error);
    }
  }

  function abrirNovo() {
    setSelecionado(undefined);
    setMostraForm(true);
  }

  function handleEdit(projeto: Projeto) {
    setSelecionado(projeto);
    setMostraForm(true);
  }

  async function handleDelete(id: number) {
    if (!confirm("Deseja realmente excluir este projeto?")) return;

    try {
      await deletarProjeto(id);
      await carregarProjetos();
    } catch (err) {
      console.error("Erro ao excluir projeto", err);
    }
  }

  function closeFormAndRefresh() {
    setMostraForm(false);
    setSelecionado(undefined);
    carregarProjetos();
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold">Projetos</h1>

        <div>
          <button
            onClick={abrirNovo}
            className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg"
          >
            Novo Projeto
          </button>
        </div>
      </div>

      {mostraForm && (
        <div className="mb-6">
          <ProjetoForm
            projetoInicial={selecionado}
            onSuccess={closeFormAndRefresh}
            onCancel={() => setMostraForm(false)}
          />
        </div>
      )}

      <div className="grid gap-4">
        {projetos.map((projeto) => (
          <ProjetoCard
            key={projeto.id}
            projeto={projeto}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        ))}
      </div>
    </div>
  );
}

export default Projetos;