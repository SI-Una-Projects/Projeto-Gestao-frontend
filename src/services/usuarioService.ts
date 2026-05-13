import api from "../api/api";

export async function listarUsuarios() {
  console.log("[usuarioService] GET /usuarios");
  return api.get("/usuarios");
}

export async function buscarUsuarioPorId(id: number) {
  console.log(`[usuarioService] GET /usuarios/${id}`);
  return api.get(`/usuarios/${id}`);
}

export async function criarUsuario(payload: any) {
  console.log("[usuarioService] POST /usuarios payload ->", payload);
  return api.post("/usuarios", payload);
}

export async function atualizarUsuario(id: number, payload: any) {
  console.log(`[usuarioService] PUT /usuarios/${id} payload ->`, payload);
  return api.put(`/usuarios/${id}`, payload);
}

export async function deletarUsuario(id: number) {
  console.log(`[usuarioService] DELETE /usuarios/${id}`);
  return api.delete(`/usuarios/${id}`);
}