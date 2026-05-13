export type Projeto = {
  id: number;
  nome: string;
  descricao: string;
  status: string;
  dataInicio: string;
  dataFimPrevista: string;

  gerenteId?: number;
  gerenteNome?: string;
};