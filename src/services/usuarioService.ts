import api from "../api/api";

export async function listarUsuarios() {
  const response = await api.get("/usuarios");
  return response.data;
}

export async function criarUsuario(dados: any) {
  const response = await api.post("/usuarios", dados);
  return response.data;
}

export async function buscarUsuarioPorId(id: number) {
  const response = await api.get(`/usuarios/${id}`);
  return response.data;
}

export async function atualizarUsuario(id: number, dados: any) {
  const response = await api.put(`/usuarios/${id}`, dados);
  return response.data;
}

export async function deletarUsuario(id: number) {
  const response = await api.delete(`/usuarios/${id}`);
  return response.data;
}
