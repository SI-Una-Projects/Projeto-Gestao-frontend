function Dashboard() {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-8">
        Dashboard
      </h1>

      <div className="grid grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-xl shadow">
          <h2 className="text-lg font-semibold">
            Projetos
          </h2>

          <p className="text-4xl mt-4 font-bold text-blue-600">
            0
          </p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow">
          <h2 className="text-lg font-semibold">
            Tarefas
          </h2>

          <p className="text-4xl mt-4 font-bold text-green-600">
            0
          </p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow">
          <h2 className="text-lg font-semibold">
            Usuários
          </h2>

          <p className="text-4xl mt-4 font-bold text-purple-600">
            0
          </p>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;