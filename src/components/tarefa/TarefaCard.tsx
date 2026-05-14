import type { Tarefa } from "../../types/Tarefa";

type Props = {
  tarefa: Tarefa;
  onEdit?: (t: Tarefa) => void;
  onDelete?: (id: number) => void;
};

export default function TarefaCard({
  tarefa,
  onEdit,
  onDelete
}: Props) {

  function corStatus(status?: string) {

    switch (status) {

      case "CONCLUIDA":
        return "bg-green-100 text-green-700";

      case "EM_ANDAMENTO":
        return "bg-yellow-100 text-yellow-700";

      default:
        return "bg-gray-100 text-gray-700";
    }
  }

  function corPrioridade(prioridade?: string) {

    switch (prioridade) {

      case "ALTA":
        return "bg-red-100 text-red-700";

      case "MEDIA":
        return "bg-orange-100 text-orange-700";

      default:
        return "bg-blue-100 text-blue-700";
    }
  }

  return (

    <div className="bg-white rounded-xl shadow-md p-5 border border-gray-200">

      <div className="flex items-center justify-between mb-3">

        <h2 className="text-xl font-bold text-gray-800">
          {tarefa.titulo}
        </h2>

        <div className="flex gap-2">

          <button
            onClick={() =>
              onEdit && onEdit(tarefa)
            }
            className="text-blue-600 hover:text-blue-800"
          >
            Editar
          </button>

          <button
            onClick={() =>
              onDelete && onDelete(tarefa.id)
            }
            className="text-red-600 hover:text-red-800"
          >
            Excluir
          </button>

        </div>

      </div>

      {tarefa.descricao && (

        <p className="text-gray-600 mb-4">
          {tarefa.descricao}
        </p>

      )}

      <div className="space-y-2 text-sm text-gray-700">

        <p>
          <strong>Projeto:</strong>{" "}
          {tarefa.projetoNome || "Não definido"}
        </p>

        <p>
          <strong>Responsável:</strong>{" "}
          {tarefa.responsavelNome || "Não definido"}
        </p>

        <p>
          <strong>Prioridade:</strong>{" "}

          <span
            className={`px-2 py-1 rounded-full text-xs font-semibold ${corPrioridade(
              tarefa.prioridade
            )}`}
          >
            {tarefa.prioridade}
          </span>
        </p>

        <p>
          <strong>Status:</strong>{" "}

          <span
            className={`px-2 py-1 rounded-full text-xs font-semibold ${corStatus(
              tarefa.status
            )}`}
          >
            {tarefa.status}
          </span>
        </p>

      </div>

    </div>
  );
}