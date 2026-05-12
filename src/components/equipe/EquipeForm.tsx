import { useEffect, useState } from "react";
import { criarEquipe, atualizarEquipe } from "../../services/equipeService";
import { listarUsuarios } from "../../services/usuarioService";
import { listarProjetos } from "../../services/projetoService";
import type { Usuario } from "../../types/Usuario";
import type { Projeto } from "../../types/Projeto";

type Props = {
  equipeInicial?: { id?: number; nome?: string; descricao?: string };
  onSuccess?: () => void;
  onCancel?: () => void;
};

export default function EquipeForm({ equipeInicial, onSuccess, onCancel }: Props) {
  const [nome, setNome] = useState(equipeInicial?.nome || "");
  const [descricao, setDescricao] = useState(equipeInicial?.descricao || "");
  const [usuarios, setUsuarios] = useState<Usuario[]>([]);
  const [projetos, setProjetos] = useState<Projeto[]>([]);
  const [membrosIds, setMembrosIds] = useState<number[]>((equipeInicial as any)?.membrosIds || []);
  const [projetoIds, setProjetoIds] = useState<number[]>((equipeInicial as any)?.projetoIds || []);

  useEffect(() => {
    if (equipeInicial) {
      setNome(equipeInicial.nome || "");
      setDescricao(equipeInicial.descricao || "");
    }

    (async () => {
      try {
        const u = await listarUsuarios();
        setUsuarios(u);
      } catch (err) {
        console.error("Erro ao carregar usuários para equipe", err);
      }

      try {
        const p = await listarProjetos();
        setProjetos(p);
      } catch (err) {
        console.error("Erro ao carregar projetos para equipe", err);
      }
    })();
  }, [equipeInicial]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    try {
      const dados: any = { nome, descricao, membrosIds, projetoIds };
      if (equipeInicial?.id) {
        await atualizarEquipe(equipeInicial.id, dados);
      } else {
        await criarEquipe(dados);
      }

      if (onSuccess) onSuccess();
    } catch (err) {
      console.error("Erro ao salvar equipe", err);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow space-y-4">
      <h2 className="text-2xl font-bold">{equipeInicial?.id ? "Editar Equipe" : "Nova Equipe"}</h2>

      <input className="w-full border p-3 rounded" value={nome} onChange={(e) => setNome(e.target.value)} placeholder="Nome da equipe" />

      <textarea className="w-full border p-3 rounded" value={descricao} onChange={(e) => setDescricao(e.target.value)} placeholder="Descrição (opcional)" />

      <div>
        <label className="block text-sm font-medium mb-1">Membros</label>
        <select multiple value={membrosIds.map(String)} onChange={(e) => {
          const opts = Array.from(e.target.selectedOptions).map(o => Number(o.value));
          setMembrosIds(opts);
        }} className="w-full border p-2 rounded h-32">
          {usuarios.map(u => (
            <option key={u.id} value={u.id}>{u.nomeCompleto} ({u.email})</option>
          ))}
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Projetos (associar)</label>
        <select multiple value={projetoIds.map(String)} onChange={(e) => {
          const opts = Array.from(e.target.selectedOptions).map(o => Number(o.value));
          setProjetoIds(opts);
        }} className="w-full border p-2 rounded h-32">
          {projetos.map(p => (
            <option key={p.id} value={p.id}>{p.nome}</option>
          ))}
        </select>
      </div>

      <div className="flex gap-2">
        <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded">Salvar</button>
        <button type="button" onClick={() => onCancel && onCancel()} className="bg-gray-200 px-4 py-2 rounded">Cancelar</button>
      </div>
    </form>
  );
}
