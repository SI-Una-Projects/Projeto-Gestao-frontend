import { useEffect, useState } from "react";
import { criarUsuario, atualizarUsuario } from "../services/usuarioService";
import type { Usuario } from "../types/Usuario";

type Props = {
  usuarioInicial?: Partial<Usuario> & { id?: number };
  onSuccess?: () => void;
  onCancel?: () => void;
};

export default function FormUsuario({ usuarioInicial, onSuccess, onCancel }: Props) {
  const [nomeCompleto, setNomeCompleto] = useState(usuarioInicial?.nomeCompleto || "");
  const [cpf, setCpf] = useState(usuarioInicial?.cpf || "");
  const [email, setEmail] = useState(usuarioInicial?.email || "");
  const [login, setLogin] = useState(usuarioInicial?.login || "");
  const [senha, setSenha] = useState("");
  const [perfil, setPerfil] = useState<Usuario["perfil"]>(usuarioInicial?.perfil || "COLABORADOR");

  useEffect(() => {
    if (usuarioInicial) {
      setNomeCompleto(usuarioInicial.nomeCompleto || "");
      setCpf(usuarioInicial.cpf || "");
      setEmail(usuarioInicial.email || "");
      setLogin(usuarioInicial.login || "");
      setPerfil(usuarioInicial.perfil || "COLABORADOR");
    }
  }, [usuarioInicial]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    try {
  const dados: any = { nome: nomeCompleto, nomeCompleto, cpf, email, perfil, login };
      if (senha) dados.senha = senha; // só enviar senha quando preenchida

      if (usuarioInicial?.id) {
        await atualizarUsuario(usuarioInicial.id, dados);
      } else {
        await criarUsuario(dados);
      }

      if (onSuccess) onSuccess();
    } catch (err) {
      console.error("Erro ao salvar usuário", err);
    }
  }

  return (
    <div className="bg-white p-6 rounded shadow">

      <h2 className="text-2xl font-bold mb-4">{usuarioInicial?.id ? "Editar Usuário" : "Cadastrar Usuário"}</h2>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">

        <input
          type="text"
          placeholder="Nome completo"
          className="border p-2 rounded"
          value={nomeCompleto}
          onChange={(e) => setNomeCompleto(e.target.value)}
        />

        <input
          type="text"
          placeholder="CPF"
          className="border p-2 rounded"
          value={cpf}
          onChange={(e) => setCpf(e.target.value)}
        />

        <input
          type="email"
          placeholder="Email"
          className="border p-2 rounded"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="text"
          placeholder="Login"
          className="border p-2 rounded"
          value={login}
          onChange={(e) => setLogin(e.target.value)}
        />

        <input
          type="password"
          placeholder="Senha"
          className="border p-2 rounded"
          value={senha}
          onChange={(e) => setSenha(e.target.value)}
        />

        <div className="relative">
          <select
            className="appearance-none border p-2 rounded w-full"
            value={perfil}
            onChange={(e) => setPerfil(e.target.value as Usuario["perfil"])}
          >
            <option value="ADMIN">ADMIN</option>
            <option value="GERENTE">GERENTE</option>
            <option value="COLABORADOR">COLABORADOR</option>
          </select>

          <span className="pointer-events-none absolute inset-y-0 right-3 flex items-center">
            <svg
              className="w-4 h-4 text-gray-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </span>
        </div>

        <div className="flex gap-2">
          <button className="bg-blue-600 text-white p-2 rounded" type="submit">Salvar</button>
          <button type="button" onClick={() => onCancel && onCancel()} className="bg-gray-200 p-2 rounded">Cancelar</button>
        </div>

      </form>

    </div>
  );
}