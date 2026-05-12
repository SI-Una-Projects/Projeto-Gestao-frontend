type Tarefa = {
  id: number;
  titulo: string;
  descricao?: string;
  status?: string;
};

type Props = {
  tarefa: Tarefa;
  onEdit?: (t: Tarefa) => void;
  onDelete?: (id: number) => void;
};

export default function TarefaCard({ tarefa, onEdit, onDelete }: Props) {
  return (
    <div className="bg-white rounded-xl shadow-md p-5 border border-gray-200">
      <div className="flex items-center justify-between mb-3">
        <h2 className="text-xl font-bold text-gray-800">{tarefa.titulo}</h2>
        <div className="flex gap-2">
          <button onClick={() => onEdit && onEdit(tarefa)} className="text-blue-600">Editar</button>
          <button onClick={() => onDelete && onDelete(tarefa.id)} className="text-red-600">Excluir</button>
        </div>
      </div>

      {tarefa.descricao && <p className="text-gray-600">{tarefa.descricao}</p>}
      {tarefa.status && <span className="inline-block mt-3 bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm">{tarefa.status}</span>}
    </div>
  );
}
