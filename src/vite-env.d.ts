/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_API_URL: string
  readonly VITE_HTTP_PROTO: string;
  readonly VITE_WS_PROTO: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}