import { useEffect, useState } from "react";

import {
  criarTarefa,
  atualizarTarefa
} from "../../services/tarefaService";

import { listarProjetos } from "../../services/projetoService";
import { listarUsuarios } from "../../services/usuarioService";

import type { Projeto } from "../../types/Projeto";
import type { Usuario } from "../../types/Usuario";

type Props = {
  tarefaInicial?: {
    id?: number;
    titulo?: string;
    descricao?: string;
    status?: string;
    prioridade?: string;
    projetoId?: number;
    responsavelId?: number;
  };

  onSuccess?: () => void;
  onCancel?: () => void;
};

export default function TarefaForm({
  tarefaInicial,
  onSuccess,
  onCancel
}: Props) {

  const [titulo, setTitulo] = useState(
    tarefaInicial?.titulo || ""
  );

  const [descricao, setDescricao] = useState(
    tarefaInicial?.descricao || ""
  );

  const [status, setStatus] = useState(
    tarefaInicial?.status || "PENDENTE"
  );

  const [prioridade, setPrioridade] = useState(
    tarefaInicial?.prioridade || "MEDIA"
  );

  const [projetoId, setProjetoId] = useState(
    tarefaInicial?.projetoId || 0
  );

  const [responsavelId, setResponsavelId] = useState(
    tarefaInicial?.responsavelId || 0
  );

  const [projetos, setProjetos] =
    useState<Projeto[]>([]);

  const [usuarios, setUsuarios] =
    useState<Usuario[]>([]);

  useEffect(() => {

    if (tarefaInicial) {

      setTitulo(
        tarefaInicial.titulo || ""
      );

      setDescricao(
        tarefaInicial.descricao || ""
      );

      setStatus(
        tarefaInicial.status || "PENDENTE"
      );

      setPrioridade(
        tarefaInicial.prioridade || "MEDIA"
      );

      setProjetoId(
        tarefaInicial.projetoId || 0
      );

      setResponsavelId(
        tarefaInicial.responsavelId || 0
      );
    }

    carregarDados();

  }, [tarefaInicial]);

  async function carregarDados() {

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
        "Erro ao carregar dados",
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
        titulo,
        descricao,
        status,
        prioridade,
        projetoId,
        responsavelId
      };

      console.log(
        "[TarefaForm] payload ->",
        dados
      );

      if (tarefaInicial?.id) {

        await atualizarTarefa(
          tarefaInicial.id,
          dados
        );

      } else {

        await criarTarefa(dados);
      }

      if (onSuccess) {
        onSuccess();
      }

    } catch (err) {

      console.error(
        "Erro ao salvar tarefa",
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

        {tarefaInicial?.id
          ? "Editar Tarefa"
          : "Nova Tarefa"}

      </h2>

      <input
        className="w-full border p-3 rounded"
        value={titulo}
        onChange={(e) =>
          setTitulo(e.target.value)
        }
        placeholder="Título"
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

      <select
        className="w-full border p-3 rounded"
        value={status}
        onChange={(e) =>
          setStatus(e.target.value)
        }
      >

        <option value="PENDENTE">
          Pendente
        </option>

        <option value="EM_ANDAMENTO">
          Em andamento
        </option>

        <option value="CONCLUIDA">
          Concluída
        </option>

      </select>

      <select
        className="w-full border p-3 rounded"
        value={prioridade}
        onChange={(e) =>
          setPrioridade(e.target.value)
        }
      >

        <option value="BAIXA">
          Prioridade baixa
        </option>

        <option value="MEDIA">
          Prioridade média
        </option>

        <option value="ALTA">
          Prioridade alta
        </option>

      </select>

      <select
        className="w-full border p-3 rounded"
        value={projetoId}
        onChange={(e) =>
          setProjetoId(Number(e.target.value))
        }
      >

        <option value={0}>
          Selecione um projeto
        </option>

        {projetos.map((p) => (

          <option
            key={p.id}
            value={p.id}
          >
            {p.nome}
          </option>

        ))}

      </select>

      <select
        className="w-full border p-3 rounded"
        value={responsavelId}
        onChange={(e) =>
          setResponsavelId(Number(e.target.value))
        }
      >

        <option value={0}>
          Selecione um responsável
        </option>

        {usuarios.map((u) => (

          <option
            key={u.id}
            value={u.id}
          >
            {u.nome} ({u.email})
          </option>

        ))}

      </select>

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