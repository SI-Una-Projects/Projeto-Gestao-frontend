# Projeto Gestão (Frontend)

Frontend em React + Vite para o sistema de gestão de projetos da equipe.

Este repositório contém a interface que consome uma API REST (backend) — já preparada para CRUD de Usuários, Projetos, Equipes e Tarefas.

## Destaques
- CRUD completo no front para Usuários, Projetos, Equipes e Tarefas
- Serviços Axios prontos em `src/services/*`
- Forms controlados e cards em `src/components/*` para criação/edição/listagem
- Proxy de desenvolvimento configurado em `vite.config.ts` para evitar problemas de CORS

---

## Começando (desenvolvimento)

Pré-requisitos:
- Node.js 18+ (ou versão compatível com o projeto)
- Backend rodando em `http://localhost:8080` (por padrão)

1. Instale dependências:

```bash
cd projeto-gestao
npm install
```

2. Rodar em modo de desenvolvimento (Vite) — o `vite.config.ts` já faz proxy `/api` → `http://localhost:8080` para evitar CORS:

```bash
npm run dev
```

3. Build de produção:

```bash
npm run build
```

Observação: durante o desenvolvimento, as chamadas ao backend são feitas para o caminho `/api/...` (o Vite proxy remove o `/api` e encaminha para `http://localhost:8080`). Se preferir chamar o backend diretamente, edite `src/api/api.ts`.

---

## Endpoints (esperados pelo frontend)

Os serviços em `src/services` usam as seguintes rotas REST (padrão):

- Usuários: `GET /usuarios`, `POST /usuarios`, `PUT /usuarios/:id`, `DELETE /usuarios/:id`
- Projetos: `GET /projetos`, `POST /projetos`, `PUT /projetos/:id`, `DELETE /projetos/:id`
- Equipes:  `GET /equipes`,  `POST /equipes`,  `PUT /equipes/:id`,  `DELETE /equipes/:id`
- Tarefas:  `GET /tarefas`,  `POST /tarefas`,  `PUT /tarefas/:id`,  `DELETE /tarefas/:id`

Payloads (exemplos somenos — adapte ao seu backend):

- Usuario (POST/PUT):
```json
{
  "nome": "Nome Completo",
  "cpf": "00000000000",
  "email": "user@example.com",
  "login": "usuario",
  "senha": "senha123",
  "perfil": "COLABORADOR"
}
```

- Projeto (POST/PUT):
```json
{
  "nome": "Projeto X",
  "descricao": "Descrição do projeto",
  "dataInicio": "2026-05-01",
  "dataFimPrevista": "2026-08-01",
  "status": "PLANEJADO",
  "gerenteId": 2
}
```

- Equipe (POST/PUT):
```json
{
  "nome": "Equipe A",
  "descricao": "Equipe responsável...",
  "membrosIds": [1,2,3],
  "projetoIds": [5,6]
}
```

---

## Observações importantes

- CORS: para produção, o ideal é habilitar CORS no backend (por exemplo, no Spring Boot com `@CrossOrigin` ou configurando `WebMvcConfigurer`). Em desenvolvimento o proxy do Vite resolve isso automaticamente.
- Tipos TypeScript: os tipos principais ficam em `src/types` (ex.: `Projeto.ts`, `Usuario.ts`).
- Se o backend usar nomes de campo diferentes, ajuste os serviços ou os formulários para mapear os campos corretamente.

---

## Como adicionar os integrantes (seção do README)

Você pode listar os integrantes da equipe diretamente neste README usando a seção abaixo. Copie e cole a tabela e preencha com os nomes e funções.

### Integrantes

| Nome | Função | Email |
|------|--------|-------|
| Iago Willian | Fullstack | iagowillian22@gamil.com|
| Glaucia Oliveira | Fullstack | glauciano77@gmail.com |
| Caroline Marques | Fullstack | carolbmarques@hotmail.com |
| Mariana Ambrozio | Fullstack | marianambrz@hotmail.com |
| Adriel Oliveira  | Fullstack | adrielsujo@gmail.com |

Adicione/remova linhas conforme necessário. Se preferir, mantenha essa lista em `CONTRIBUTORS.md` e aponte para ela daqui.

---

## Próximos passos sugeridos

- Adicionar validação de formulários (client-side)
- Adicionar notificações (toasts) para feedback de sucesso/erro
- Criar testes unitários para services e componentes (Jest / React Testing Library)
- Implementar paginação e filtros para listagens grandes

---

Se quiser, eu crio também um `CONTRIBUTORS.md` e faço a PR para a branch `main` — me diga como prefere organizar a lista de integrantes.

Boa noite! :rocket:
# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...

      // Remove tseslint.configs.recommended and replace with this
      tseslint.configs.recommendedTypeChecked,
      // Alternatively, use this for stricter rules
      tseslint.configs.strictTypeChecked,
      // Optionally, add this for stylistic rules
      tseslint.configs.stylisticTypeChecked,

      // Other configs...
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...
      // Enable lint rules for React
      reactX.configs['recommended-typescript'],
      // Enable lint rules for React DOM
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```
