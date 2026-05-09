import { Link } from "react-router-dom";

function Sidebar() {
  return (
    <aside className="w-64 h-screen bg-gray-900 text-white p-6">
      <h1 className="text-2xl font-bold mb-10">
        Gestão
      </h1>

      <nav className="flex flex-col gap-4">
        <Link
          to="/"
          className="hover:bg-gray-700 p-2 rounded"
        >
          Dashboard
        </Link>

        <Link
          to="/projetos"
          className="hover:bg-gray-700 p-2 rounded"
        >
          Projetos
        </Link>

        <Link
          to="/tarefas"
          className="hover:bg-gray-700 p-2 rounded"
        >
          Tarefas
        </Link>

        <Link
          to="/equipes"
          className="hover:bg-gray-700 p-2 rounded"
        >
          Equipes
        </Link>

        <Link
          to="/usuarios"
          className="hover:bg-gray-700 p-2 rounded"
        >
          Usuários
        </Link>
      </nav>
    </aside>
  );
}

export default Sidebar;