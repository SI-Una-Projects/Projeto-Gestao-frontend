import api from "../api/api";

export async function listarEquipes() {
  const response = await api.get("/equipes");
  return response.data;
}

export async function criarEquipe(dados: any) {
  const response = await api.post("/equipes", dados);
  return response.data;
}

export async function buscarEquipePorId(id: number) {
  const response = await api.get(`/equipes/${id}`);
  return response.data;
}

export async function atualizarEquipe(id: number, dados: any) {
  const response = await api.put(`/equipes/${id}`, dados);
  return response.data;
}

export async function deletarEquipe(id: number) {
  const response = await api.delete(`/equipes/${id}`);
  return response.data;
}
