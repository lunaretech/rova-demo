import { useEffect, useState, type ReactNode } from "react";
import { mountRovaEmbed, rovaEmbedConfig } from "./rova-embed";

// Lido uma vez: vem do build, não muda em tempo de execução.
const EMBED = rovaEmbedConfig(import.meta.env);

interface Product {
  name: string;
  category: string;
  price: string;
  note: string;
  tone: string;
  art: ReactNode;
}

const stroke = { fill: "none", stroke: "currentColor", strokeWidth: 2.2, strokeLinecap: "round", strokeLinejoin: "round" } as const;

const PRODUCTS: Product[] = [
  {
    name: "Luminária Brisa",
    category: "Iluminação",
    price: "R$ 289,00",
    note: "Cúpula de linho, base em freijó",
    tone: "sand",
    art: (
      <svg viewBox="0 0 120 120" {...stroke}>
        <path d="M42 30h36l12 34H30z" />
        <path d="M60 64v32M44 100h32" />
        <path d="M52 76c0 4 4 4 4 8" opacity=".45" />
      </svg>
    ),
  },
  {
    name: "Poltrona Serra",
    category: "Móveis",
    price: "R$ 1.940,00",
    note: "Estrutura em madeira maciça",
    tone: "clay",
    art: (
      <svg viewBox="0 0 120 120" {...stroke}>
        <path d="M38 62V40a10 10 0 0 1 10-10h24a10 10 0 0 1 10 10v22" />
        <path d="M28 58a8 8 0 0 1 16 0v14h32V58a8 8 0 0 1 16 0v22H28z" />
        <path d="M36 80v14M84 80v14" />
      </svg>
    ),
  },
  {
    name: "Jogo de cama Alvorada",
    category: "Têxteis",
    price: "R$ 412,00",
    note: "Algodão 300 fios, queen",
    tone: "sage",
    art: (
      <svg viewBox="0 0 120 120" {...stroke}>
        <path d="M22 86V44M22 74h76v12M98 74V62a10 10 0 0 0-10-10H50v22" />
        <rect x="28" y="56" width="16" height="12" rx="5" />
        <path d="M22 94v-8M98 94v-8" />
      </svg>
    ),
  },
  {
    name: "Vaso Terracota",
    category: "Decoração",
    price: "R$ 96,00",
    note: "Feito à mão, 28 cm",
    tone: "rust",
    art: (
      <svg viewBox="0 0 120 120" {...stroke}>
        <path d="M46 34h28M50 34c0 12-14 18-14 36a24 24 0 0 0 48 0c0-18-14-24-14-36" />
        <path d="M40 66h40" opacity=".45" />
      </svg>
    ),
  },
];

const PROMISES = [
  { title: "Entrega em 3 a 8 dias úteis", text: "Conforme a região, com rastreio por e-mail." },
  { title: "30 dias para devolver", text: "Sem precisar justificar, com frete por nossa conta." },
  { title: "Até 6 vezes sem juros", text: "Ou 5% de desconto no Pix." },
];

const FAQ = [
  { q: "Qual o prazo de entrega?", a: "De 3 a 5 dias úteis no Sul e no Sudeste, e até 10 dias úteis no Norte. Móveis grandes levam 5 dias úteis a mais." },
  { q: "Posso devolver um produto?", a: "Sim, em até 30 dias corridos depois do recebimento, sem uso e na embalagem original." },
  { q: "Quais as formas de pagamento?", a: "Pix com 5% de desconto, cartão de crédito em até 6 vezes sem juros e boleto." },
  { q: "Vocês têm loja física?", a: "Não. A Casa Aurora é só online, com envio a partir de Curitiba." },
];

export function App() {
  const [assistant, setAssistant] = useState<"off" | "on">(EMBED ? "on" : "off");

  // O assistente é um script que fala com outra origem (a instância do Rova): esta página não conhece o agente nem os documentos dele.
  useEffect(() => {
    mountRovaEmbed(document, EMBED);
    setAssistant(EMBED ? "on" : "off");
  }, []);

  return (
    <div className="page">
      <a className="skip" href="#conteudo">Pular para o conteúdo</a>
      <header className="top">
        <a className="brand" href="#" aria-label="Casa Aurora, início">
          <svg viewBox="0 0 32 32" aria-hidden="true">
            <path d="M4 22a12 12 0 0 1 24 0z" fill="currentColor" />
            <path d="M2 26h28" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          </svg>
          Casa Aurora
        </a>
        <nav aria-label="Seções">
          <a href="#produtos">Produtos</a>
          <a href="#ajuda">Ajuda</a>
        </nav>
      </header>

      <main id="conteudo">
        <section className="hero">
          <div className="hero__text">
            <p className="eyebrow">Coleção de primavera</p>
            <h1>Peças para a casa, feitas com calma.</h1>
            <p className="lede">Móveis, luminárias e têxteis de pequenos ateliês brasileiros, enviados de Curitiba para todo o país.</p>
            <div className="hero__actions">
              <a className="button" href="#produtos">Ver produtos</a>
              <a className="button button--quiet" href="#ajuda">Tirar dúvidas</a>
            </div>
          </div>
          <div className="hero__art" aria-hidden="true">
            <svg viewBox="0 0 320 300">
              <circle cx="212" cy="96" r="64" className="sun" />
              <path d="M0 232c60-58 120-58 176-18s96 30 144-22v108H0z" className="hill hill--back" />
              <path d="M0 262c70-40 130-36 190-8s90 18 130-10v56H0z" className="hill hill--front" />
              <g className="lamp" fill="none" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M70 120h44l14 40H56z" />
                <path d="M92 160v62M72 226h40" />
              </g>
            </svg>
          </div>
        </section>

        <ul className="promises" aria-label="Condições da loja">
          {PROMISES.map((p) => (
            <li key={p.title}>
              <strong>{p.title}</strong>
              <span>{p.text}</span>
            </li>
          ))}
        </ul>

        <section id="produtos" aria-labelledby="t-produtos">
          <div className="section-head">
            <h2 id="t-produtos">Mais procurados</h2>
            <p>Quatro peças que saem toda semana.</p>
          </div>
          <ul className="grid">
            {PRODUCTS.map((p) => (
              <li key={p.name} className="card">
                <div className={`thumb thumb--${p.tone}`} aria-hidden="true">{p.art}</div>
                <p className="card__category">{p.category}</p>
                <h3>{p.name}</h3>
                <p className="card__note">{p.note}</p>
                <p className="card__price">{p.price}</p>
              </li>
            ))}
          </ul>
        </section>

        <section id="ajuda" className="help" aria-labelledby="t-ajuda">
          <div className="section-head">
            <h2 id="t-ajuda">Ajuda</h2>
            <p>As dúvidas mais comuns. Para o resto, pergunte ao assistente.</p>
          </div>
          <div className="faq">
            {FAQ.map((f) => (
              <details key={f.q}>
                <summary>{f.q}</summary>
                <p>{f.a}</p>
              </details>
            ))}
          </div>
          <aside className={`assistant assistant--${assistant}`} role="status">
            <strong>{assistant === "on" ? "Assistente disponível" : "Assistente desligado"}</strong>
            <span>
              {assistant === "on"
                ? "Use o botão no canto inferior direito para conversar. Ele responde com base nas políticas da loja."
                : "Este build foi feito sem a configuração do assistente."}
            </span>
          </aside>
        </section>
      </main>

      <footer>
        <p>Casa Aurora é uma loja fictícia. Este site demonstra o assistente de atendimento do Rova; nenhum pedido é processado aqui.</p>
      </footer>
    </div>
  );
}
