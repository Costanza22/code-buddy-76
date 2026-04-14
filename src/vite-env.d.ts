/// <reference types="vite/client" />

interface ImportMetaEnv {
  /** Base URL da API (ex.: http://127.0.0.1:3001). Vazio = mesmo host + proxy /api no Vite. */
  readonly VITE_API_BASE_URL?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
