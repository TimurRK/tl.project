/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_APP_API: string;
  readonly VITE_APP_API_SOCKET: string;
  readonly VITE_APP_API_SOCKET_PATH: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
