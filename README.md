# rova-demo

Site de demonstração (uma loja fictícia) que carrega o assistente de atendimento do Rova pelo widget
embutido. Serve para mostrar o chat num site que não tem relação com o Lume nem com o Potá.

- React + Vite, sem backend.
- Dois widgets disponíveis, com a mesma API e os mesmos atributos: o fork do original (`lunaretech/rova-embed`, padrão) e o escrito do zero (`platform/widget` no repo `rova`; use `VITE_ROVA_WIDGET=rova`). Os arquivos compilados ficam em `public/`.
- O assistente só entra quando o build recebe `VITE_ROVA_BASE_URL` e `VITE_ROVA_EMBED_ID`.
- O embed no Rova precisa listar o domínio onde este site é servido.

```
npm ci
VITE_ROVA_BASE_URL=https://rova.lunare.tech VITE_ROVA_EMBED_ID=<id> npm run dev
```
