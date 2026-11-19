import { useEffect, useState } from "react";
import { mountRovaEmbed, rovaEmbedConfig } from "./rova-embed";

const PRODUCTS = [
  { name: "Luminária Brisa", price: "R$ 289,00", note: "Cúpula de linho, base em freijó" },
  { name: "Poltrona Serra", price: "R$ 1.940,00", note: "Estrutura em madeira maciça" },
  { name: "Jogo de cama Alvorada", price: "R$ 412,00", note: "Algodão 300 fios, queen" },
  { name: "Vaso Terracota", price: "R$ 96,00", note: "Feito à mão, 28 cm" },
];

const FAQ = [
  { q: "Qual o prazo de entrega?", a: "De 3 a 8 dias úteis, conforme a região." },
  { q: "Posso devolver um produto?", a: "Sim, em até 30 dias corridos após o recebimento." },
  { q: "Quais as formas de pagamento?", a: "Pix, boleto e cartão em até 6 vezes sem juros." },
];

// Lido uma vez: vem do build, não muda em tempo de execução.
const EMBED = rovaEmbedConfig(import.meta.env);

export function App() {
  const [assistant, setAssistant] = useState<"off" | "on">(EMBED ? "on" : "off");

  // O assistente é um script de outro domínio (a instância do Rova): esta página não conhece o agente nem os documentos dele.
  useEffect(() => {
    mountRovaEmbed(document, EMBED);
    setAssistant(EMBED ? "on" : "off");
  }, []);

  return (
    <div className="page">
      <header className="top">
        <strong className="brand">Casa Aurora</strong>
        <nav aria-label="Seções">
          <a href="#produtos">Produtos</a>
          <a href="#ajuda">Ajuda</a>
        </nav>
      </header>

      <main>
        <section className="hero">
          <h1>Peças para a casa, feitas com calma.</h1>
          <p>Loja de exemplo para demonstrar o assistente de atendimento do Rova num site que não tem nada a ver com o Lume nem com o Potá.</p>
          <p className={`status status--${assistant}`} role="status">
            {assistant === "on" ? "Assistente ligado: use o botão no canto inferior direito." : "Assistente desligado neste build."}
          </p>
        </section>

        <section id="produtos" aria-labelledby="t-produtos">
          <h2 id="t-produtos">Produtos</h2>
          <ul className="grid">
            {PRODUCTS.map((p) => (
              <li key={p.name} className="card">
                <div className="thumb" aria-hidden="true" />
                <h3>{p.name}</h3>
                <p>{p.note}</p>
                <strong>{p.price}</strong>
              </li>
            ))}
          </ul>
        </section>

        <section id="ajuda" aria-labelledby="t-ajuda">
          <h2 id="t-ajuda">Ajuda</h2>
          <dl className="faq">
            {FAQ.map((f) => (
              <div key={f.q}>
                <dt>{f.q}</dt>
                <dd>{f.a}</dd>
              </div>
            ))}
          </dl>
        </section>
      </main>

      <footer>Site de demonstração. Nenhum pedido é processado aqui.</footer>
    </div>
  );
}
