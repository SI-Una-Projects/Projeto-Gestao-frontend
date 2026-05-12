export interface Projeto {
  id: number;
  nome: string;
  descricao: string;
  status: string;
  dataInicio?: string;
  dataFimPrevista?: string;
  gerenteResponsavel?: {
    nomeCompleto?: string;
  };
}