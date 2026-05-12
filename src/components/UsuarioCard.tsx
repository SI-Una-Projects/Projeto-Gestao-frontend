import type { Usuario } from "../types/Usuario";

type Props = {
  usuario: Usuario;
  onEdit?: (u: Usuario) => void;
  onDelete?: (id: number) => void;
};

export default function CardUsuario({ usuario, onEdit, onDelete }: Props) {
  return (
    <div className="bg-white p-4 rounded shadow">

      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold">{usuario.nome || usuario.nomeCompleto}</h2>
          <p>{usuario.email}</p>
          <p>{usuario.cargo || usuario.perfil}</p>
        </div>

        <div className="flex flex-col gap-2">
          <button
            onClick={() => onEdit && onEdit(usuario)}
            className="text-blue-600"
          >
            Editar
          </button>

          <button
            onClick={() => onDelete && onDelete(usuario.id)}
            className="text-red-600"
          >
            Excluir
          </button>
        </div>
      </div>

    </div>
  );
}