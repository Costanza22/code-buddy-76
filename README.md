# Code Buddy

Aplicação web para aprender programação em **trilhas** (ex.: Python, JavaScript), com **aulas interativas**, editor de código no browser e feedback por saída esperada. O **frontend** é React + Vite; o **backend** é uma API Node (Express) que serve trilhas e lições em JSON.

---

## Requisitos

| Requisito | Versão / notas |
|-----------|----------------|
| **Node.js** | **20 LTS** ou superior |
| **npm** | Incluído com o Node; na raiz do repo, `npm install` instala frontend e API (workspace `server/`) |

**Navegador:** Chrome, Edge, Firefox ou Safari recentes.

### Variáveis de ambiente (opcional)

| Variável | Onde | Descrição |
|----------|------|------------|
| `PORT` | API | Porta do servidor (predefinido **3001**) |
| `VITE_API_BASE_URL` | Frontend | URL absoluta da API em produção. Em desenvolvimento, deixa **vazio** e o Vite faz proxy de `/api` para a API. |

Copia `.env.example` para `.env` se quiseres documentar valores locais.

---

## Como executar

### Desenvolvimento (frontend + API)

Precisas de **dois terminais** na raiz do repositório:

```bash
npm install
```

**Terminal 1 — API**

```bash
npm run dev:server
```

**Terminal 2 — interface (Vite, porta 8080)**

```bash
npm run dev
```

Abre `http://localhost:8080`. Os pedidos a `/api/*` são enviados para `http://127.0.0.1:3001` (proxy no `vite.config.ts`).

### Endpoints da API

| Método | Caminho | Descrição |
|--------|---------|-----------|
| `GET` | `/api/health` | Estado do serviço |
| `GET` | `/api/tracks` | Lista de trilhas |
| `GET` | `/api/tracks/:trackId` | Uma trilha |
| `GET` | `/api/tracks/:trackId/lessons/:lessonId` | Dados da aula (formato esperado pela `LessonPage`) |

Os dados vêm de `src/data/lessons.ts` (partilhado com a API via import no servidor).

### Outros scripts (frontend)

| Comando | Descrição |
|---------|-----------|
| `npm run build` | Build de produção em `dist/` |
| `npm run preview` | Pré-visualização do build (proxy `/api` para a API em 3001) |
| `npm run lint` | ESLint |
| `npm test` | Vitest |

---

## Linguagens e tecnologias

### Linguagens (código deste repositório)

| Linguagem | Uso |
|-----------|-----|
| **TypeScript** | Frontend (`src/`) e API (`server/src/`) |
| **CSS** | Estilos globais e Tailwind |

### Conteúdo das trilhas

As lições em `src/data/lessons.ts` focam **Python** e **JavaScript** nos exemplos.

### Stack

| Tecnologia | Função |
|------------|--------|
| **React 18** | UI |
| **Vite 5** | Dev server, build e proxy `/api` |
| **Express 4** | API REST |
| **React Router 6** | Rotas da SPA |
| **Tailwind CSS 3** + **shadcn/ui** (Radix) | Estilos e componentes |
| **TanStack Query** | Pedidos à API e cache |
| **Framer Motion** | Animações |
| **tsx** | Executar TypeScript da API em desenvolvimento |

---

## Diagrama (arquitetura)

```mermaid
flowchart LR
  subgraph browser["Navegador"]
    SPA["React SPA\n(Vite)"]
  end
  subgraph api["Node"]
    EX["Express\nserver/src"]
  end
  DATA["src/data/lessons.ts"]
  SPA -->|"GET /api/*\n(dev: proxy)"| EX
  EX --> DATA
```

Fluxo resumido:

1. A SPA pede trilhas/aulas via **`fetch('/api/...')`** (ou `VITE_API_BASE_URL` + `/api/...` em produção).
2. A **API** lê os dados em **`lessons.ts`** e devolve JSON.
3. **Rotas** da app: `App.tsx`; páginas em `src/pages/`.

---

## Estrutura de pastas (resumo)

```
server/
  src/index.ts      # Express: rotas /api
src/
  App.tsx
  main.tsx
  lib/api.ts        # Cliente HTTP da SPA
  hooks/use-tracks-api.ts
  data/lessons.ts   # Fonte de dados (API importa daqui)
  pages/
  components/
```

---

## Licença

Este projeto está licenciado nos termos da **MIT License** — vê o ficheiro [`LICENSE`](./LICENSE).

---

## Ligações

- Repositório: [github.com/Costanza22/code-buddy-76](https://github.com/Costanza22/code-buddy-76)
