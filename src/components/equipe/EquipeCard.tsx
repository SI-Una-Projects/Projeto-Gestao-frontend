type Usuario = {
  id: number;
  nome: string;
  email: string;
};

type Projeto = {
  id: number;
  nome: string;
  descricao?: string;
};

type Equipe = {
  id: number;
  nome: string;
  descricao?: string;

  membros?: Usuario[];

  projetos?: Projeto[];
};

type Props = {
  equipe: Equipe;
  onEdit?: (e: Equipe) => void;
  onDelete?: (id: number) => void;
};

export default function EquipeCard({
  equipe,
  onEdit,
  onDelete
}: Props) {

  return (

    <div className="bg-white rounded-xl shadow-md p-5 border border-gray-200">

      <div className="flex items-center justify-between mb-3">

        <h2 className="text-xl font-bold text-gray-800">
          {equipe.nome}
        </h2>

        <div className="flex gap-2">

          <button
            onClick={() => onEdit?.(equipe)}
            className="text-blue-600"
          >
            Editar
          </button>

          <button
            onClick={() => onDelete?.(equipe.id)}
            className="text-red-600"
          >
            Excluir
          </button>

        </div>

      </div>

      {equipe.descricao && (

        <p className="text-gray-600 mb-4">
          {equipe.descricao}
        </p>

      )}

      {/* MEMBROS */}
      <div className="mb-4">

        <h3 className="font-semibold text-gray-800 mb-2">
          Membros
        </h3>

        {equipe.membros &&
        equipe.membros.length > 0 ? (

          <ul className="space-y-1">

            {equipe.membros.map((membro) => (

              <li
                key={membro.id}
                className="text-sm text-gray-700"
              >
                • {membro.nome} ({membro.email})
              </li>

            ))}

          </ul>

        ) : (

          <p className="text-sm text-gray-500">
            Nenhum membro vinculado
          </p>

        )}

      </div>

      {/* PROJETOS */}
      <div>

        <h3 className="font-semibold text-gray-800 mb-2">
          Projetos
        </h3>

        {equipe.projetos &&
        equipe.projetos.length > 0 ? (

          <ul className="space-y-1">

            {equipe.projetos.map((projeto) => (

              <li
                key={projeto.id}
                className="text-sm text-gray-700"
              >
                • {projeto.nome}
              </li>

            ))}

          </ul>

        ) : (

          <p className="text-sm text-gray-500">
            Nenhum projeto vinculado
          </p>

        )}

      </div>

    </div>
  );
}