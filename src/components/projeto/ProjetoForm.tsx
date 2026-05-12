import { useEffect, useState } from "react";
import type { Projeto } from "../../types/Projeto";
import { criarProjeto, atualizarProjeto } from "../../services/projetoService";
import { listarUsuarios } from "../../services/usuarioService";
import type { Usuario } from "../../types/Usuario";

type Props = {
  projetoInicial?: Partial<Projeto>;
  onSuccess?: () => void;
  onCancel?: () => void;
};

export function ProjetoForm({ projetoInicial, onSuccess, onCancel }: Props) {
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
      setFormData((prev) => ({
        ...prev,
        nome: projetoInicial.nome || "",
        descricao: projetoInicial.descricao || "",
        status: projetoInicial.status || "PLANEJADO",
        dataInicio: (projetoInicial as any).dataInicio || "",
        dataFimPrevista: (projetoInicial as any).dataFimPrevista || ""
      }));
    }
    // carregar lista de usuários para preencher o select de gerente
    (async () => {
      try {
        const u = await listarUsuarios();
        setUsuarios(u);
      } catch (err) {
        console.error("Erro ao carregar usuários para select de gerente", err);
      }
    })();
  }, [projetoInicial]);

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
      if ((projetoInicial as any)?.id) {
        await atualizarProjeto((projetoInicial as any).id, formData);
      } else {
        await criarProjeto(formData);
      }

      if (onSuccess) onSuccess();
    } catch (err) {
      console.error("Erro ao salvar projeto", err);
      // aqui poderíamos mostrar notificação de erro
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white p-6 rounded-xl shadow-md space-y-4"
    >

      <h2 className="text-2xl font-bold text-gray-800">
        { (projetoInicial as any)?.id ? "Editar Projeto" : "Novo Projeto" }
      </h2>

      <input
        type="text"
        name="nome"
        placeholder="Nome do projeto"
        value={formData.nome}
        onChange={handleChange}
        className="w-full border rounded-lg p-3"
      />

      <textarea
        name="descricao"
        placeholder="Descrição"
        value={formData.descricao}
        onChange={handleChange}
        className="w-full border rounded-lg p-3"
      />

      <input
        type="date"
        name="dataInicio"
        value={formData.dataInicio}
        onChange={handleChange}
        className="w-full border rounded-lg p-3"
      />

      <input
        type="date"
        name="dataFimPrevista"
        value={formData.dataFimPrevista}
        onChange={handleChange}
        className="w-full border rounded-lg p-3"
      />

      <select
        name="status"
        value={formData.status}
        onChange={handleChange}
        className="w-full border rounded-lg p-3"
      >
        <option value="PLANEJADO">
          Planejado
        </option>

        <option value="EM_ANDAMENTO">
          Em andamento
        </option>

        <option value="CONCLUIDO">
          Concluído
        </option>

        <option value="CANCELADO">
          Cancelado
        </option>
      </select>

      <div className="relative">
        <select
          name="gerenteId"
          value={formData.gerenteId as any}
          onChange={handleChange}
          className="w-full border rounded-lg p-3"
        >
          <option value="">-- Selecionar gerente (opcional) --</option>
          {usuarios.map((u) => (
            <option key={u.id} value={u.id}>{u.nomeCompleto} ({u.email})</option>
          ))}
        </select>

        <span className="pointer-events-none absolute inset-y-0 right-3 flex items-center">
          <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </span>
      </div>

      <div className="flex gap-2">
        <button
          type="submit"
          className="bg-green-600 hover:bg-green-700 text-white px-5 py-3 rounded-lg transition"
        >
          Salvar
        </button>

        <button
          type="button"
          onClick={() => onCancel && onCancel()}
          className="bg-gray-200 hover:bg-gray-300 text-gray-800 px-5 py-3 rounded-lg transition"
        >
          Cancelar
        </button>
      </div>

    </form>
  );
}