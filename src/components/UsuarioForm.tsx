import { useEffect, useState } from "react";

import {
  criarUsuario,
  atualizarUsuario
} from "../services/usuarioService";

import type { Usuario } from "../types/Usuario";

type Props = {
  usuarioInicial?: Partial<Usuario> & {
    id?: number;
  };

  onSuccess?: () => void;
  onCancel?: () => void;
};

export default function UsuarioForm({
  usuarioInicial,
  onSuccess,
  onCancel
}: Props) {

  const [nome, setNome] = useState(
    usuarioInicial?.nome || ""
  );

  const [cpf, setCpf] = useState(
    usuarioInicial?.cpf || ""
  );

  const [email, setEmail] = useState(
    usuarioInicial?.email || ""
  );

  const [cargo, setCargo] = useState(
    usuarioInicial?.cargo || ""
  );

  const [login, setLogin] = useState(
    usuarioInicial?.login || ""
  );

  const [senha, setSenha] = useState("");

  const [perfil, setPerfil] =
    useState<Usuario["perfil"]>(
      usuarioInicial?.perfil ||
      "COLABORADOR"
    );

  const [loading, setLoading] =
    useState(false);

  const [error, setError] =
    useState<string | null>(null);

  useEffect(() => {

    if (usuarioInicial) {

      setNome(
        usuarioInicial.nome || ""
      );

      setCpf(
        usuarioInicial.cpf || ""
      );

      setEmail(
        usuarioInicial.email || ""
      );

      setCargo(
        usuarioInicial.cargo || ""
      );

      setLogin(
        usuarioInicial.login || ""
      );

      setPerfil(
        usuarioInicial.perfil ||
        "COLABORADOR"
      );
    }

  }, [usuarioInicial]);

  async function handleSubmit(
    e: React.FormEvent
  ) {

    e.preventDefault();

    setLoading(true);

    setError(null);

    try {

      const dados: any = {

        nome,

        cpf,

        email,

        cargo: perfil,

        login,

        perfil
      };

      if (senha) {
        dados.senha = senha;
      }

      console.log(
        "[UsuarioForm] payload ->",
        dados
      );

      if (usuarioInicial?.id) {

        await atualizarUsuario(
          usuarioInicial.id,
          dados
        );

      } else {

        await criarUsuario(dados);
      }

      if (onSuccess) {
        onSuccess();
      }

    } catch (err: any) {

      console.error(
        "[UsuarioForm] erro ->",
        err
      );

      setError(
        err?.response?.data?.message ||
        "Erro ao salvar usuário"
      );

    } finally {

      setLoading(false);
    }
  }

  return (
    <div className="bg-white p-6 rounded shadow">

      <h2 className="text-2xl font-bold mb-4">

        {usuarioInicial?.id
          ? "Editar Usuário"
          : "Cadastrar Usuário"}

      </h2>

      {error && (

        <div className="mb-4 text-red-700 bg-red-100 p-2 rounded">
          {error}
        </div>

      )}

      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-4"
      >

        <input
          type="text"
          placeholder="Nome"
          className="border p-2 rounded"
          value={nome}
          onChange={(e) =>
            setNome(e.target.value)
          }
          required
        />

        <input
          type="text"
          placeholder="CPF"
          className="border p-2 rounded"
          value={cpf}
          onChange={(e) =>
            setCpf(e.target.value)
          }
          required
        />

        <input
          type="email"
          placeholder="Email"
          className="border p-2 rounded"
          value={email}
          onChange={(e) =>
            setEmail(e.target.value)
          }
          required
        />

        

        <input
          type="text"
          placeholder="Login"
          className="border p-2 rounded"
          value={login}
          onChange={(e) =>
            setLogin(e.target.value)
          }
          required
        />

        <input
          type="password"
          placeholder="Senha"
          className="border p-2 rounded"
          value={senha}
          onChange={(e) =>
            setSenha(e.target.value)
          }
          required={!usuarioInicial?.id}
        />

        <select
          className="border p-2 rounded"
          value={perfil}
          onChange={(e) =>
            setPerfil(
              e.target.value as Usuario["perfil"]
            )
          }
        >

          <option value="ADMIN">
            ADMIN
          </option>

          <option value="GERENTE">
            GERENTE
          </option>

          <option value="COLABORADOR">
            COLABORADOR
          </option>

        </select>

        <div className="flex gap-2">

          <button
            className="bg-blue-600 text-white p-2 rounded"
            type="submit"
            disabled={loading}
          >

            {loading
              ? "Salvando..."
              : "Salvar"}

          </button>

          <button
            type="button"
            onClick={() =>
              onCancel && onCancel()
            }
            className="bg-gray-200 p-2 rounded"
          >
            Cancelar
          </button>

        </div>

      </form>

    </div>
  );
}