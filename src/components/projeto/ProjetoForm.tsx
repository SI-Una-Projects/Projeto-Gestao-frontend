import { useEffect, useState } from "react";

import type { Projeto } from "../../types/Projeto";
import type { Usuario } from "../../types/Usuario";

import {
  criarProjeto,
  atualizarProjeto
} from "../../services/projetoService";

import { listarUsuarios } from "../../services/usuarioService";

type Props = {
  projetoInicial?: Partial<Projeto>;
  onSuccess?: () => void;
  onCancel?: () => void;
};

export default function ProjetoForm({
  projetoInicial,
  onSuccess,
  onCancel
}: Props) {

  const [formData, setFormData] = useState({
    nome: projetoInicial?.nome || "",
    descricao: projetoInicial?.descricao || "",
    dataInicio: (projetoInicial as any)?.dataInicio || "",
    dataFimPrevista: (projetoInicial as any)?.dataFimPrevista || "",
    status: projetoInicial?.status || "PLANEJADO",
    gerenteId: (projetoInicial as any)?.gerenteId || ""
  });

  const [usuarios, setUsuarios] = useState<Usuario[]>([]);

  useEffect(() => {
    if (projetoInicial) {
      setFormData({
        nome: projetoInicial.nome || "",
        descricao: projetoInicial.descricao || "",
        dataInicio: (projetoInicial as any)?.dataInicio || "",
        dataFimPrevista: (projetoInicial as any)?.dataFimPrevista || "",
        status: projetoInicial.status || "PLANEJADO",
        gerenteId: (projetoInicial as any)?.gerenteId || ""
      });
    }

    carregarUsuarios();
  }, [projetoInicial]);

  async function carregarUsuarios() {
    try {
      const resposta: any = await listarUsuarios();

      const dados =
        Array.isArray(resposta?.data)
          ? resposta.data
          : Array.isArray(resposta)
          ? resposta
          : [];

      setUsuarios(dados);
    } catch (err) {
      console.error("Erro ao carregar usuários", err);
    }
  }

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    try {
      const dados = {
        nome: formData.nome,
        descricao: formData.descricao,
        dataInicio: formData.dataInicio,
        dataFimPrevista: formData.dataFimPrevista,
        status: formData.status,
        gerenteId: formData.gerenteId || null
      };

      console.log("[ProjetoForm] payload ->", dados);

      if ((projetoInicial as any)?.id) {
        await atualizarProjeto((projetoInicial as any).id, dados);
      } else {
        await criarProjeto(dados);
      }

      onSuccess?.();
    } catch (err) {
      console.error("Erro ao salvar projeto", err);
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white p-6 rounded-xl shadow-md space-y-4"
    >
      <h2 className="text-2xl font-bold text-gray-800">
        {(projetoInicial as any)?.id ? "Editar Projeto" : "Novo Projeto"}
      </h2>

      <input
        type="text"
        name="nome"
        placeholder="Nome do projeto"
        value={formData.nome}
        onChange={handleChange}
        className="w-full border rounded-lg p-3"
        required
      />

      <textarea
        name="descricao"
        placeholder="Descrição"
        value={formData.descricao}
        onChange={handleChange}
        className="w-full border rounded-lg p-3"
      />

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block mb-1 text-sm">Data início</label>
          <input
            type="date"
            name="dataInicio"
            value={formData.dataInicio}
            onChange={handleChange}
            className="w-full border rounded-lg p-3"
          />
        </div>

        <div>
          <label className="block mb-1 text-sm">Data fim prevista</label>
          <input
            type="date"
            name="dataFimPrevista"
            value={formData.dataFimPrevista}
            onChange={handleChange}
            className="w-full border rounded-lg p-3"
          />
        </div>
      </div>

      <select
        name="status"
        value={formData.status}
        onChange={handleChange}
        className="w-full border rounded-lg p-3"
      >
        <option value="PLANEJADO">Planejado</option>
        <option value="EM_ANDAMENTO">Em andamento</option>
        <option value="CONCLUIDO">Concluído</option>
        <option value="CANCELADO">Cancelado</option>
      </select>

      {/* 🔥 SOMENTE GERENTES */}
      <select
        name="gerenteId"
        value={formData.gerenteId}
        onChange={handleChange}
        className="w-full border rounded-lg p-3"
      >
        <option value="">Selecionar gerente</option>

        {usuarios
          .filter((u) => u.perfil === "GERENTE")
          .map((u) => (
            <option key={u.id} value={u.id}>
              {u.nome} ({u.email})
            </option>
          ))}
      </select>

      <div className="flex gap-2">
        <button
          type="submit"
          className="bg-green-600 hover:bg-green-700 text-white px-5 py-3 rounded-lg transition"
        >
          Salvar
        </button>

        <button
          type="button"
          onClick={() => onCancel?.()}
          className="bg-gray-200 hover:bg-gray-300 text-gray-800 px-5 py-3 rounded-lg transition"
        >
          Cancelar
        </button>
      </div>
    </form>
  );
}