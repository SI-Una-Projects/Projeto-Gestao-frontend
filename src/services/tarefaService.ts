import api from "../api/api";

export async function listarTarefas() {
  const response = await api.get("/tarefas");
  return response.data;
}

export async function criarTarefa(dados: any) {
  const response = await api.post("/tarefas", dados);
  return response.data;
}

export async function buscarTarefaPorId(id: number) {
  const response = await api.get(`/tarefas/${id}`);
  return response.data;
}

export async function atualizarTarefa(id: number, dados: any) {
  const response = await api.put(`/tarefas/${id}`, dados);
  return response.data;
}

export async function deletarTarefa(id: number) {
  const response = await api.delete(`/tarefas/${id}`);
  return response.data;
}
