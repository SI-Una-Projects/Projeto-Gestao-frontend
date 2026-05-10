export default function Usuarios() {
  return (
    <div className="flex flex-col gap-6">

      <div className="bg-white p-6 rounded shadow">

        <h1 className="text-3xl font-bold mb-6">
          Usuários
        </h1>

        <form className="grid grid-cols-2 gap-4">

          <input
            type="text"
            placeholder="Nome"
            className="border p-2 rounded"
          />

          <input
            type="email"
            placeholder="Email"
            className="border p-2 rounded"
          />

          <input
            type="text"
            placeholder="Cargo"
            className="border p-2 rounded"
          />

          <input
            type="text"
            placeholder="Login"
            className="border p-2 rounded"
          />

          <input
            type="password"
            placeholder="Senha"
            className="border p-2 rounded"
          />

          <select className="border p-2 rounded">

            <option>
              ADMIN
            </option>

            <option>
              GERENTE
            </option>

            <option>
              COLABORADOR
            </option>

          </select>

          <button
            className="bg-blue-600 text-white p-2 rounded col-span-2"
          >
            Cadastrar Usuário
          </button>

        </form>
      </div>

      <div className="grid grid-cols-3 gap-4">

        <div className="bg-white p-4 rounded shadow">

          <h2 className="text-xl font-bold">
            Iago Willian
          </h2>

          <p>
            Desenvolvedor
          </p>

          <p>
            ADMIN
          </p>

        </div>

      </div>

    </div>
  );
}