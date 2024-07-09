/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_DATABASE_WORKER_URL: string;
  readonly VITE_WORKERS_KEY: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}