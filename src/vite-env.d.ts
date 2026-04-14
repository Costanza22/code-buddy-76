/// <reference types="vite/client" />

interface ImportMetaEnv {
  /** Origem da API (ex.: http://127.0.0.1:3001), sem /api no fim. Vazio = proxy /api no Vite. */
  readonly VITE_API_BASE_URL?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
