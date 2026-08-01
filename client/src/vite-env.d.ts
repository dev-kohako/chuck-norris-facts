/// <reference types="vite/client" />

interface ImportMetaEnv {
  /**
   * Absolute URL of the GraphQL endpoint. Left unset the client talks to
   * `/api/graphql` on its own origin, which is how both Vercel and the nginx
   * image serve it.
   */
  readonly VITE_API_URL?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
