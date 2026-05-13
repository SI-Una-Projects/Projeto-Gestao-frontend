import { useEffect, useState } from "react";
import React from "react";

import { listarUsuarios, deletarUsuario } from "../../services/usuarioService";
import CardUsuario from "../../components/UsuarioCard";
import UsuarioForm from "../../components/UsuarioForm";

import type { Usuario } from "../../types/Usuario";

export default function Usuarios() {
  const [usuarios, setUsuarios] = useState<Usuario[]>([]);
  const [mostraForm, setMostraForm] = useState(false);
  const [selecionado, setSelecionado] = useState<Usuario | undefined>(undefined);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    carregarUsuarios();
  }, []);

  async function carregarUsuarios() {
    setLoading(true);
    setError(null);
    try {
      const res = await listarUsuarios();
      console.log("[Usuarios] listarUsuarios raw ->", res);
      const data = res?.data ?? res;
      setUsuarios(Array.isArray(data) ? data : []);
    } catch (err: any) {
      console.error("Erro ao carregar usuários", err);
      setError("Erro ao carregar usuários.");
      setUsuarios([]);
    } finally {
      setLoading(false);
    }
  }

  function abrirNovo() {
    setSelecionado(undefined);
    setMostraForm(true);
  }

  // handler tolerante a Event / id / objeto usuário
  function handleEdit(arg: any) {
    // evitar crashes se receber inadvertidamente um DOM event
    if (arg && typeof arg.preventDefault === "function") {
      try {
        arg.preventDefault();
        arg.stopPropagation?.();
      } catch {
        /* ignore */
      }
    }

    let usuarioObj: Usuario | undefined;

    if (arg && typeof arg === "object" && ("id" in arg || "_id" in arg || "email" in arg)) {
      usuarioObj = arg as Usuario;
    } else {
      const id = Number(arg);
      if (!Number.isNaN(id)) {
        usuarioObj = usuarios.find((u) => u.id === id || (u as any)._id === id);
      }
    }

    if (!usuarioObj) {
      console.warn("[Usuarios] handleEdit: usuário não encontrado localmente para arg:", arg);
      if (typeof arg === "number" || (!isNaN(Number(arg)))) {
        usuarioObj = { id: Number(arg) } as Usuario;
      } else {
        usuarioObj = undefined;
      }
    }

    console.log("[Usuarios] abrir edição para:", usuarioObj);
    setSelecionado(usuarioObj);
    setMostraForm(true);
  }

  async function handleDelete(id: number) {
    if (!confirm("Deseja realmente excluir este usuário?")) return;

    try {
      await deletarUsuario(id);
      await carregarUsuarios();
    } catch (err) {
      console.error("Erro ao excluir usuário", err);
      alert("Erro ao excluir usuário.");
    }
  }

  function closeFormAndRefresh() {
    setMostraForm(false);
    setSelecionado(undefined);
    carregarUsuarios();
  }

  // ErrorBoundary local para proteger a UI contra crashes que resultam em tela branca
  class FormErrorBoundary extends React.Component<
    { children: React.ReactNode; onReset?: () => void },
    { hasError: boolean; error?: Error | null; info?: React.ErrorInfo | null }
  > {
    state = { hasError: false, error: null, info: null };

    static getDerivedStateFromError(err: Error) {
      return { hasError: true, error: err };
    }

    componentDidCatch(error: Error, info: React.ErrorInfo) {
      console.error("[FormErrorBoundary] caught error:", error, info);
      this.setState({ error, info });
    }

    reset = () => {
      this.setState({ hasError: false, error: null, info: null });
      this.props.onReset?.();
    };

    render() {
      if (this.state.hasError) {
        return (
          <div className="bg-red-50 p-4 rounded">
            <h3 className="text-lg font-semibold text-red-700">Erro ao renderizar o formulário</h3>
            <p className="text-sm text-gray-700 mt-2">
              Ocorreu um erro ao abrir o formulário. Você pode fechar e tentar novamente.
            </p>
            <div className="mt-3 flex gap-2">
              <button
                onClick={this.reset}
                className="bg-blue-600 text-white px-3 py-1 rounded"
              >
                Fechar formulário
              </button>
              <button
                onClick={() => window.location.reload()}
                className="bg-gray-200 px-3 py-1 rounded"
              >
                Recarregar página
              </button>
            </div>

            {/* Mostrar informações de erro nos logs (útil somente para dev) */}
            <details className="mt-3 text-xs text-gray-600">
              <summary>Detalhes do erro</summary>
              <pre className="whitespace-pre-wrap">{String(this.state.error)}{this.state.info ? `\n\n${this.state.info.componentStack}` : ""}</pre>
            </details>
          </div>
        );
      }

      return this.props.children as React.ReactElement;
    }
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between bg-white p-6 rounded shadow">
        <h1 className="text-3xl font-bold">Usuários</h1>

        <div>
          <button
            type="button"
            onClick={abrirNovo}
            className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg"
          >
            Novo Usuário
          </button>
        </div>
      </div>

      {mostraForm && (
        <div className="bg-white p-6 rounded shadow">
          <FormErrorBoundary
            onReset={() => {
              // fechar o formulário e limpar selecionado quando o usuário resetar via fallback
              setMostraForm(false);
              setSelecionado(undefined);
            }}
          >
            <UsuarioForm
              usuarioInicial={selecionado}
              onSuccess={closeFormAndRefresh}
              onCancel={() => setMostraForm(false)}
            />
          </FormErrorBoundary>
        </div>
      )}

      <div className="bg-white p-6 rounded shadow">
        {loading ? (
          <p>Carregando usuários...</p>
        ) : error ? (
          <p className="text-red-600">{error}</p>
        ) : usuarios.length === 0 ? (
          <p>Nenhum usuário encontrado</p>
        ) : (
          <div className="grid grid-cols-3 gap-4">
            {usuarios.map((usuario, idx) => (
              <CardUsuario
                key={`${(usuario as any).id ?? (usuario as any)._id ?? usuario.email ?? idx}`}
                usuario={usuario}
                onEdit={handleEdit}
                onDelete={handleDelete}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}