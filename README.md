# rova-demo

Site de demonstração (uma loja fictícia) que carrega o assistente de atendimento do Rova pelo widget
embutido. Serve para mostrar o chat num site que não tem relação com o Lume nem com o Potá.

- React + Vite, sem backend.
- O assistente só entra quando o build recebe `VITE_ROVA_BASE_URL` e `VITE_ROVA_EMBED_ID`.
- O embed no Rova precisa listar o domínio onde este site é servido.

```
npm ci
VITE_ROVA_BASE_URL=https://rova.lunare.tech VITE_ROVA_EMBED_ID=<id> npm run dev
```
