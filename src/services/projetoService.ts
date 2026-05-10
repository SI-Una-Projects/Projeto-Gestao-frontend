import api from "../api/api";
import type  { Projeto } from "../types/Projeto";

export const listarProjetos = async (): Promise<Projeto[]> => {
  const response = await api.get("/projetos");
  return response.data;
};