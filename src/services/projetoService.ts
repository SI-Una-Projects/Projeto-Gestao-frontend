import api from "../api/api";

export async function listarProjetos() {
  const response = await api.get("/projetos");

  return response.data;
}

export async function criarProjeto(dados: any) {
  const response = await api.post("/projetos", dados);

  return response.data;
}

export async function buscarProjetoPorId(id: number) {
  const response = await api.get(`/projetos/${id}`);

  return response.data;
}

export async function atualizarProjeto(id: number, dados: any) {
  const response = await api.put(`/projetos/${id}`, dados);

  return response.data;
}

export async function deletarProjeto(id: number) {
  const response = await api.delete(`/projetos/${id}`);

  return response.data;
}