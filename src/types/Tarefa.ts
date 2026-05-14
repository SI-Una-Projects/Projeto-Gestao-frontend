export type Tarefa = {
  id: number;

  titulo: string;

  descricao?: string;

  status?: string;

  prioridade?: string;

  projetoId?: number;

  projetoNome?: string;

  responsavelId?: number;

  responsavelNome?: string;
};