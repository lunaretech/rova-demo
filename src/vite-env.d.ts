/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_ROVA_BASE_URL?: string;
  readonly VITE_ROVA_EMBED_ID?: string;
  /** "rova" usa o widget escrito do zero; qualquer outro valor usa o fork do original. */
  readonly VITE_ROVA_WIDGET?: string;
}
