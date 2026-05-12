import { useEffect, useState } from "react";
import { listarEquipes, deletarEquipe } from "../../services/equipeService";
import EquipeCard from "../../components/equipe/EquipeCard";
import EquipeForm from "../../components/equipe/EquipeForm";

type Equipe = { id: number; nome: string; descricao?: string };

function Equipes() {
  const [equipes, setEquipes] = useState<Equipe[]>([]);
  const [mostraForm, setMostraForm] = useState(false);
  const [selecionado, setSelecionado] = useState<Equipe | undefined>(undefined);

  useEffect(() => {
    carregarEquipes();
  }, []);

  async function carregarEquipes() {
    try {
      const data = await listarEquipes();
      console.log("listarEquipes returned:", data);
      setEquipes(data);
    } catch (err) {
      console.error("Erro ao carregar equipes", err);
    }
  }

  function abrirNovo() {
    setSelecionado(undefined);
    setMostraForm(true);
  }

  function handleEdit(equipe: Equipe) {
    setSelecionado(equipe);
    setMostraForm(true);
  }

  async function handleDelete(id: number) {
    if (!confirm("Deseja realmente excluir esta equipe?")) return;
    try {
      await deletarEquipe(id);
      await carregarEquipes();
    } catch (err) {
      console.error("Erro ao excluir equipe", err);
    }
  }

  function closeFormAndRefresh() {
    setMostraForm(false);
    setSelecionado(undefined);
    carregarEquipes();
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold">Equipes</h1>
        <button onClick={abrirNovo} className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded">Nova Equipe</button>
      </div>

      {mostraForm && (
        <div className="mb-6">
          <EquipeForm equipeInicial={selecionado} onSuccess={closeFormAndRefresh} onCancel={() => setMostraForm(false)} />
        </div>
      )}

      <div className="grid grid-cols-3 gap-4">
        {equipes.map((e) => (
          <EquipeCard key={e.id} equipe={e} onEdit={handleEdit} onDelete={handleDelete} />
        ))}
      </div>
    </div>
  );
}

export default Equipes;