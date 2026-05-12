type Equipe = {
  id: number;
  nome: string;
  descricao?: string;
};

type Props = {
  equipe: Equipe;
  onEdit?: (e: Equipe) => void;
  onDelete?: (id: number) => void;
};

export default function EquipeCard({ equipe, onEdit, onDelete }: Props) {
  return (
    <div className="bg-white rounded-xl shadow-md p-5 border border-gray-200">
      <div className="flex items-center justify-between mb-3">
        <h2 className="text-xl font-bold text-gray-800">{equipe.nome}</h2>
        <div className="flex gap-2">
          <button onClick={() => onEdit && onEdit(equipe)} className="text-blue-600">Editar</button>
          <button onClick={() => onDelete && onDelete(equipe.id)} className="text-red-600">Excluir</button>
        </div>
      </div>

      {equipe.descricao && <p className="text-gray-600">{equipe.descricao}</p>}
    </div>
  );
}
