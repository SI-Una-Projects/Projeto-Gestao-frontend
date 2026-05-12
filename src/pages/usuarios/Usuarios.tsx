import { useEffect, useState } from "react";

import { listarUsuarios, deletarUsuario } from "../../services/usuarioService";
import CardUsuario from "../../components/UsuarioCard";
import FormUsuario from "../../components/UsuarioForm";

import type { Usuario } from "../../types/Usuario";

export default function Usuarios() {
  const [usuarios, setUsuarios] = useState<Usuario[]>([]);
  const [mostraForm, setMostraForm] = useState(false);
  const [selecionado, setSelecionado] = useState<Usuario | undefined>(undefined);

  useEffect(() => {
    carregarUsuarios();
  }, []);

  async function carregarUsuarios() {
    try {
      const data = await listarUsuarios();
      console.log("listarUsuarios returned:", data);
      setUsuarios(data);
    } catch (error) {
      console.error("Erro ao carregar usuários", error);
    }
  }

  function abrirNovo() {
    setSelecionado(undefined);
    setMostraForm(true);
  }

  function handleEdit(usuario: Usuario) {
    setSelecionado(usuario);
    setMostraForm(true);
  }

  async function handleDelete(id: number) {
    if (!confirm("Deseja realmente excluir este usuário?")) return;

    try {
      await deletarUsuario(id);
      await carregarUsuarios();
    } catch (err) {
      console.error("Erro ao excluir usuário", err);
    }
  }

  function closeFormAndRefresh() {
    setMostraForm(false);
    setSelecionado(undefined);
    carregarUsuarios();
  }

  return (
    <div className="flex flex-col gap-6">

      <div className="flex items-center justify-between bg-white p-6 rounded shadow">
        <h1 className="text-3xl font-bold">Usuários</h1>

        <div>
          <button
            onClick={abrirNovo}
            className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg"
          >
            Novo Usuário
          </button>
        </div>
      </div>

      {mostraForm && (
        <div className="bg-white p-6 rounded shadow">
          <FormUsuario
            usuarioInicial={selecionado}
            onSuccess={closeFormAndRefresh}
            onCancel={() => setMostraForm(false)}
          />
        </div>
      )}

      <div className="grid grid-cols-3 gap-4">
        {usuarios.map((usuario) => (
          <CardUsuario key={usuario.id} usuario={usuario} onEdit={handleEdit} onDelete={handleDelete} />
        ))}
      </div>

    </div>
  );
}