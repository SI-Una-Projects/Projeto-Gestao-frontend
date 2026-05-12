export interface Usuario {
  id: number;
  nomeCompleto?: string;
  nome?: string;
  cpf?: string;
  email: string;
  cargo?: string;
  login?: string;
  perfil?: "ADMIN" | "GERENTE" | "COLABORADOR";
}
