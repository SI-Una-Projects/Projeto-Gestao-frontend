import { useEffect, useState } from "react";
import { listarTarefas, deletarTarefa } from "../../services/tarefaService";
import TarefaCard from "../../components/tarefa/TarefaCard";
import TarefaForm from "../../components/tarefa/TarefaForm";

type Tarefa = { id: number; titulo: string; descricao?: string; status?: string };

function Tarefas() {
  const [tarefas, setTarefas] = useState<Tarefa[]>([]);
  const [mostraForm, setMostraForm] = useState(false);
  const [selecionado, setSelecionado] = useState<Tarefa | undefined>(undefined);

  useEffect(() => {
    carregarTarefas();
  }, []);

  async function carregarTarefas() {
    try {
      const data = await listarTarefas();
      setTarefas(data);
    } catch (err) {
      console.error("Erro ao carregar tarefas", err);
    }
  }

  function abrirNovo() {
    setSelecionado(undefined);
    setMostraForm(true);
  }

  function handleEdit(t: Tarefa) {
    setSelecionado(t);
    setMostraForm(true);
  }

  async function handleDelete(id: number) {
    if (!confirm("Deseja realmente excluir esta tarefa?")) return;
    try {
      await deletarTarefa(id);
      await carregarTarefas();
    } catch (err) {
      console.error("Erro ao excluir tarefa", err);
    }
  }

  function closeFormAndRefresh() {
    setMostraForm(false);
    setSelecionado(undefined);
    carregarTarefas();
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold">Tarefas</h1>
        <button onClick={abrirNovo} className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded">Nova Tarefa</button>
      </div>

      {mostraForm && (
        <div className="mb-6">
          <TarefaForm tarefaInicial={selecionado} onSuccess={closeFormAndRefresh} onCancel={() => setMostraForm(false)} />
        </div>
      )}

      <div className="grid grid-cols-3 gap-4">
        {tarefas.map((t) => (
          <TarefaCard key={t.id} tarefa={t} onEdit={handleEdit} onDelete={handleDelete} />
        ))}
      </div>
    </div>
  );
}

export default Tarefas;