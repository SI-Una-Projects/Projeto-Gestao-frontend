import type { Projeto } from "../../types/Projeto";

type Props = {
  projeto: Projeto;
  onEdit?: (projeto: Projeto) => void;
  onDelete?: (id: number) => void;
};

export function ProjetoCard({ projeto, onEdit, onDelete }: Props) {
  return (
    <div className="bg-white rounded-xl shadow-md p-5 border border-gray-200">

      <div className="flex items-center justify-between mb-3">
        <h2 className="text-xl font-bold text-gray-800">
          {projeto.nome}
        </h2>

        <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm font-semibold">
          {projeto.status}
        </span>
      </div>

      <p className="text-gray-600 mb-4">
        {projeto.descricao}
      </p>

      <div className="space-y-2 text-sm text-gray-700">

        <p>
          <strong>Início:</strong>{" "}
          {projeto.dataInicio}
        </p>

        <p>
          <strong>Previsão:</strong>{" "}
          {projeto.dataFimPrevista}
        </p>

        <p>
          <strong>Gerente:</strong>{" "}
          {projeto.gerenteNome || "Não definido"}
        </p>

      </div>

      <div className="flex gap-3 mt-5">

        <button
          onClick={() => onEdit?.(projeto)}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition"
        >
          Editar
        </button>

        <button
          onClick={() => onDelete?.(projeto.id)}
          className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg transition"
        >
          Excluir
        </button>

      </div>
    </div>
  );
}