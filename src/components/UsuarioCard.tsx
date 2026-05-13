import type { Usuario } from "../types/Usuario";
import React from "react";

type Props = {
  usuario: Usuario;
  onEdit?: (uOrEvent: Usuario | React.MouseEvent) => void;
  onDelete?: (id: number | string) => void;
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
            type="button"
            aria-label={`Editar usuário ${usuario.id ?? usuario.email}`}
            onClick={(e) => {
              // prevenir navegação ou submit acidental e evitar propagation
              try {
                e.preventDefault();
                e.stopPropagation();
              } catch {
                /* ignore */
              }
              console.log("[UsuarioCard] editar ->", usuario.id);
              try {
                onEdit && onEdit(usuario);
              } catch (err) {
                console.error("[UsuarioCard] erro ao chamar onEdit", err);
              }
            }}
            className="text-blue-600"
          >
            Editar
          </button>

          <button
            type="button"
            aria-label={`Excluir usuário ${usuario.id ?? usuario.email}`}
            onClick={(e) => {
              try {
                e.preventDefault();
                e.stopPropagation();
              } catch {
                /* ignore */
              }
              console.log("[UsuarioCard] excluir ->", usuario.id);
              try {
                onDelete && onDelete(usuario.id as number);
              } catch (err) {
                console.error("[UsuarioCard] erro ao chamar onDelete", err);
              }
            }}
            className="text-red-600"
          >
            Excluir
          </button>
        </div>
      </div>
    </div>
  );
}