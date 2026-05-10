import { useState } from "react";

export function ProjetoForm() {

  const [formData, setFormData] = useState({
    nome: "",
    descricao: "",
    dataInicio: "",
    dataFimPrevista: "",
    status: "PLANEJADO",
    gerenteId: ""
  });

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    console.log(formData);

    // depois vamos conectar na API
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white p-6 rounded-xl shadow-md space-y-4"
    >

      <h2 className="text-2xl font-bold text-gray-800">
        Novo Projeto
      </h2>

      <input
        type="text"
        name="nome"
        placeholder="Nome do projeto"
        value={formData.nome}
        onChange={handleChange}
        className="w-full border rounded-lg p-3"
      />

      <textarea
        name="descricao"
        placeholder="Descrição"
        value={formData.descricao}
        onChange={handleChange}
        className="w-full border rounded-lg p-3"
      />

      <input
        type="date"
        name="dataInicio"
        value={formData.dataInicio}
        onChange={handleChange}
        className="w-full border rounded-lg p-3"
      />

      <input
        type="date"
        name="dataFimPrevista"
        value={formData.dataFimPrevista}
        onChange={handleChange}
        className="w-full border rounded-lg p-3"
      />

      <select
        name="status"
        value={formData.status}
        onChange={handleChange}
        className="w-full border rounded-lg p-3"
      >
        <option value="PLANEJADO">
          Planejado
        </option>

        <option value="EM_ANDAMENTO">
          Em andamento
        </option>

        <option value="CONCLUIDO">
          Concluído
        </option>

        <option value="CANCELADO">
          Cancelado
        </option>
      </select>

      <button
        type="submit"
        className="bg-green-600 hover:bg-green-700 text-white px-5 py-3 rounded-lg transition"
      >
        Salvar Projeto
      </button>

    </form>
  );
}