/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_DATABASE_WORKER_URL: string;
  readonly VITE_WORKERS_KEY: string;
  readonly VITE_SERVER_URL: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}