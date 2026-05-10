export default function FormUsuario() {
  return (
    <div className="bg-white p-6 rounded shadow">

      <h2 className="text-2xl font-bold mb-4">
        Cadastrar Usuário
      </h2>

      <form className="flex flex-col gap-4">

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

        <button
          className="bg-blue-600 text-white p-2 rounded"
        >
          Cadastrar
        </button>

      </form>

    </div>
  );
}