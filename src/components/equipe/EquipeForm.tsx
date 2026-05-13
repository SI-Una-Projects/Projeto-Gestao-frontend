import { useEffect, useState } from "react";

import {
  criarEquipe,
  atualizarEquipe
} from "../../services/equipeService";

import { listarUsuarios } from "../../services/usuarioService";
import { listarProjetos } from "../../services/projetoService";

import type { Usuario } from "../../types/Usuario";
import type { Projeto } from "../../types/Projeto";

type Props = {
  equipeInicial?: {
    id?: number;
    nome?: string;
    descricao?: string;
    membrosIds?: number[];
    projetoIds?: number[];
  };

  onSuccess?: () => void;
  onCancel?: () => void;
};

export default function EquipeForm({
  equipeInicial,
  onSuccess,
  onCancel
}: Props) {

  const [nome, setNome] = useState("");

  const [descricao, setDescricao] =
    useState("");

  const [usuarios, setUsuarios] =
    useState<Usuario[]>([]);

  const [projetos, setProjetos] =
    useState<Projeto[]>([]);

  const [membrosIds, setMembrosIds] =
    useState<number[]>([]);

  const [projetoIds, setProjetoIds] =
    useState<number[]>([]);

  useEffect(() => {

    if (equipeInicial) {

      setNome(
        equipeInicial.nome || ""
      );

      setDescricao(
        equipeInicial.descricao || ""
      );

      setMembrosIds(
        equipeInicial.membrosIds || []
      );

      setProjetoIds(
        equipeInicial.projetoIds || []
      );
    }

    carregarDados();

  }, [equipeInicial]);

  async function carregarDados() {

    try {

      const u: any =
        await listarUsuarios();

      setUsuarios(
        Array.isArray(u?.data)
          ? u.data
          : Array.isArray(u)
          ? u
          : []
      );

    } catch (err) {

      console.error(
        "Erro ao carregar usuários",
        err
      );
    }

    try {

      const p: any =
        await listarProjetos();

      setProjetos(
        Array.isArray(p?.data)
          ? p.data
          : Array.isArray(p)
          ? p
          : []
      );

    } catch (err) {

      console.error(
        "Erro ao carregar projetos",
        err
      );
    }
  }

  async function handleSubmit(
    e: React.FormEvent
  ) {

    e.preventDefault();

    try {

      const dados = {
        nome,
        descricao,
        membrosIds,
        projetoIds
      };

      console.log(
        "[EquipeForm] payload ->",
        dados
      );

      if (equipeInicial?.id) {

        await atualizarEquipe(
          equipeInicial.id,
          dados
        );

      } else {

        await criarEquipe(dados);
      }

      if (onSuccess) {
        onSuccess();
      }

    } catch (err) {

      console.error(
        "Erro ao salvar equipe",
        err
      );
    }
  }

  return (

    <form
      onSubmit={handleSubmit}
      className="bg-white p-6 rounded shadow space-y-4"
    >

      <h2 className="text-2xl font-bold">

        {equipeInicial?.id
          ? "Editar Equipe"
          : "Nova Equipe"}

      </h2>

      <input
        className="w-full border p-3 rounded"
        value={nome}
        onChange={(e) =>
          setNome(e.target.value)
        }
        placeholder="Nome da equipe"
        required
      />

      <textarea
        className="w-full border p-3 rounded"
        value={descricao}
        onChange={(e) =>
          setDescricao(e.target.value)
        }
        placeholder="Descrição"
      />

      <div>

        <label className="block text-sm font-medium mb-2">
          Selecionar membros
        </label>

        <div className="border rounded p-3 max-h-40 overflow-y-auto">

          {usuarios.length === 0 && (
            <p className="text-gray-500">
              Nenhum usuário encontrado
            </p>
          )}

          {usuarios.map((u) => (

            <label
              key={u.id}
              className="flex items-center gap-2 mb-2"
            >

              <input
                type="checkbox"
                checked={membrosIds.includes(u.id)}
                onChange={(e) => {

                  if (e.target.checked) {

                    setMembrosIds([
                      ...membrosIds,
                      u.id
                    ]);

                  } else {

                    setMembrosIds(
                      membrosIds.filter(
                        (id) => id !== u.id
                      )
                    );
                  }
                }}
              />

              <span>
                {u.nome} ({u.email})
              </span>

            </label>

          ))}

        </div>

      </div>

      <div>

        <label className="block text-sm font-medium mb-2">
          Selecionar projetos
        </label>

        <div className="border rounded p-3 max-h-40 overflow-y-auto">

          {projetos.length === 0 && (
            <p className="text-gray-500">
              Nenhum projeto encontrado
            </p>
          )}

          {projetos.map((p) => (

            <label
              key={p.id}
              className="flex items-center gap-2 mb-2"
            >

              <input
                type="checkbox"
                checked={projetoIds.includes(p.id)}
                onChange={(e) => {

                  if (e.target.checked) {

                    setProjetoIds([
                      ...projetoIds,
                      p.id
                    ]);

                  } else {

                    setProjetoIds(
                      projetoIds.filter(
                        (id) => id !== p.id
                      )
                    );
                  }
                }}
              />

              <span>
                {p.nome}
              </span>

            </label>

          ))}

        </div>

      </div>

      <div className="flex gap-2">

        <button
          type="submit"
          className="bg-green-600 text-white px-4 py-2 rounded"
        >
          Salvar
        </button>

        <button
          type="button"
          onClick={() =>
            onCancel && onCancel()
          }
          className="bg-gray-200 px-4 py-2 rounded"
        >
          Cancelar
        </button>

      </div>

    </form>
  );
}