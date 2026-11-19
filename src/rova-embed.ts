/**
 * Widget de chat do Rova carregado por script. Só entra quando o build recebe o endereço da
 * instância e o id do embed. O id não é segredo: quem limita o uso é a lista de domínios do embed no Rova.
 */
export interface RovaEmbedConfig {
  scriptUrl: string;
  attributes: Record<string, string>;
}

const UUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

export function rovaEmbedConfig(env: { VITE_ROVA_BASE_URL?: unknown; VITE_ROVA_EMBED_ID?: unknown }): RovaEmbedConfig | null {
  const id = typeof env.VITE_ROVA_EMBED_ID === "string" ? env.VITE_ROVA_EMBED_ID.trim() : "";
  const raw = typeof env.VITE_ROVA_BASE_URL === "string" ? env.VITE_ROVA_BASE_URL.trim() : "";
  if (!UUID.test(id) || !raw) return null;
  let base: URL;
  try {
    base = new URL(raw);
  } catch {
    return null;
  }
  if (base.protocol !== "https:" || base.username || base.password || base.pathname !== "/" || base.search || base.hash) return null;
  return {
    // Widget próprio do Rova (interface com os tokens do lume-ui), servido por este site. Fala com a API de embed da instância.
    scriptUrl: "./rova-chat-widget.js",
    attributes: {
      "data-embed-id": id,
      "data-base-api-url": `${base.origin}/api/embed`,
      "data-assistant-name": "Assistente da Casa Aurora",
      "data-button-color": "#b45309",
      "data-user-bg-color": "#b45309",
      "data-assistant-bg-color": "#f5f5f4",
      "data-greeting": "Olá! Posso ajudar com dúvidas sobre pedidos, entregas e devoluções.",
      "data-send-message-text": "Escreva sua pergunta",
      "data-reset-chat-text": "Nova conversa",
      "data-default-messages": "Qual o prazo de entrega?,Como faço uma devolução?",
    },
  };
}

const SCRIPT_ID = "rova-chat-widget";

export function mountRovaEmbed(doc: Document, config: RovaEmbedConfig | null): boolean {
  if (!config || doc.getElementById(SCRIPT_ID)) return false;
  const script = doc.createElement("script");
  script.id = SCRIPT_ID;
  script.src = config.scriptUrl;
  script.async = true;
  for (const [name, value] of Object.entries(config.attributes)) script.setAttribute(name, value);
  doc.body.appendChild(script);
  return true;
}
