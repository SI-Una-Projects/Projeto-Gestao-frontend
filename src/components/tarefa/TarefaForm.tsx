import { useEffect, useState } from "react";
import { criarTarefa, atualizarTarefa } from "../../services/tarefaService";

type Props = {
  tarefaInicial?: { id?: number; titulo?: string; descricao?: string; status?: string };
  onSuccess?: () => void;
  onCancel?: () => void;
};

export default function TarefaForm({ tarefaInicial, onSuccess, onCancel }: Props) {
  const [titulo, setTitulo] = useState(tarefaInicial?.titulo || "");
  const [descricao, setDescricao] = useState(tarefaInicial?.descricao || "");
  const [status, setStatus] = useState(tarefaInicial?.status || "PENDENTE");

  useEffect(() => {
    if (tarefaInicial) {
      setTitulo(tarefaInicial.titulo || "");
      setDescricao(tarefaInicial.descricao || "");
      setStatus(tarefaInicial.status || "PENDENTE");
    }
  }, [tarefaInicial]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    try {
      const dados = { titulo, descricao, status };
      if (tarefaInicial?.id) {
        await atualizarTarefa(tarefaInicial.id, dados);
      } else {
        await criarTarefa(dados);
      }

      if (onSuccess) onSuccess();
    } catch (err) {
      console.error("Erro ao salvar tarefa", err);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow space-y-4">
      <h2 className="text-2xl font-bold">{tarefaInicial?.id ? "Editar Tarefa" : "Nova Tarefa"}</h2>

      <input className="w-full border p-3 rounded" value={titulo} onChange={(e) => setTitulo(e.target.value)} placeholder="Título" />

      <textarea className="w-full border p-3 rounded" value={descricao} onChange={(e) => setDescricao(e.target.value)} placeholder="Descrição" />

      <select className="w-full border p-3 rounded" value={status} onChange={(e) => setStatus(e.target.value)}>
        <option value="PENDENTE">Pendente</option>
        <option value="EM_ANDAMENTO">Em andamento</option>
        <option value="CONCLUIDO">Concluído</option>
      </select>

      <div className="flex gap-2">
        <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded">Salvar</button>
        <button type="button" onClick={() => onCancel && onCancel()} className="bg-gray-200 px-4 py-2 rounded">Cancelar</button>
      </div>
    </form>
  );
}
