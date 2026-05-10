import { useEffect, useState } from "react";

import { listarProjetos } from "../../services/projetoService";
import  type { Projeto } from "../../types/Projeto";

function Projetos() {
  const [projetos, setProjetos] = useState<Projeto[]>([]);

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

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">
        Projetos
      </h1>

      <div className="grid gap-4">
        {projetos.map((projeto) => (
          <div
            key={projeto.id}
            className="bg-white shadow rounded-xl p-4"
          >
            <h2 className="text-xl font-semibold">
              {projeto.nome}
            </h2>

            <p className="text-gray-600 mt-2">
              {projeto.descricao}
            </p>

            <span className="inline-block mt-4 bg-blue-100 text-blue-700 px-3 py-1 rounded-full">
              {projeto.status}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Projetos;