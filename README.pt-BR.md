<div align="center">

<img src="./docs/mascot.gif" width="76" height="76" alt="" />

# Chuck Norris Facts

**Fatos aleatórios do Chuck Norris, buscáveis por categoria ou por texto.**

[![React](https://img.shields.io/badge/React-19-087EA4?style=flat-square&logo=react&logoColor=white)](https://react.dev/)
[![React Compiler](https://img.shields.io/badge/React_Compiler-1.0-087EA4?style=flat-square)](https://react.dev/learn/react-compiler)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.9-3178C6?style=flat-square&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-8.2-646CFF?style=flat-square&logo=vite&logoColor=white)](https://vite.dev/)
[![Tailwind](https://img.shields.io/badge/Tailwind-4.3-06B6D4?style=flat-square&logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
[![GraphQL](https://img.shields.io/badge/GraphQL-16-E10098?style=flat-square&logo=graphql&logoColor=white)](https://graphql.org/)
[![Vitest](https://img.shields.io/badge/Vitest-4.1-6E9F18?style=flat-square&logo=vitest&logoColor=white)](https://vitest.dev/)
[![Cypress](https://img.shields.io/badge/Cypress-13-69D3A7?style=flat-square&logo=cypress&logoColor=white)](https://www.cypress.io/)

[**Ver funcionando**](https://chuck-norris-facts-kwk.vercel.app/) · [English](README.md)

</div>

---

## Em resumo

Um front em React e um gateway GraphQL meu na frente da
[api.chucknorris.io](https://api.chucknorris.io/). Clica e vem um fato
aleatório, navega pelas categorias, ou busca por texto. A interface fala inglês
e português, e escolhe o que o navegador pedir.

O gateway existe para o navegador falar sempre com uma origem só. A Vercel
roteia `/api/graphql` para uma função, a imagem nginx faz proxy para o contêiner
do servidor, e o dev server do Vite faz proxy para `localhost:4000` — o mesmo
formato nos três. O cliente já assume o caminho relativo `/api/graphql`, então
não existe URL de API para configurar em lugar nenhum, nem preflight de CORS na
operação normal.

<div align="center">
  <img src="./docs/screenshot.png" alt="Chuck Norris Facts" width="760" />
</div>

## O visual

A paleta é amostrada do mascote. O `chuck-dancing.gif` é um sprite de dez cores,
e três delas sustentam o sistema inteiro:

| Sprite | Presença | oklch | Papel |
|--------|----------|-------|-------|
| `#272c35` chapéu e contorno | 46,5% | `oklch(0.292 0.018 262)` | rampa de neutros |
| `#7da7d9` jeans | 2,4% | `oklch(0.717 0.087 253)` | `--primary` |
| `#ffcc00` estrela do cinto | 0,8% | `oklch(0.865 0.177 90)` | `--ring` |

Então os cinzas não são cinzas — todo neutro fica no matiz 262 com croma baixo,
que é o chapéu dessaturado. O jeans carrega as ações e o ouro carrega o foco,
dois sinais que nunca se confundem. Cada um inverte entre os temas, porque um
valor só não serve para ambos: `#7da7d9` é claro demais para segurar texto
branco, então o tema claro escurece e o escuro mantém brilhante sobre texto
escuro.

Geist na interface, Pixelify Sans só no wordmark e no título do hero — a cara
pixelada respondendo ao mascote pixelado, e ilegível em tamanho de corpo. As
duas são auto-hospedadas, então a página não faz nenhuma requisição de fonte a
terceiros. O tema é aplicado por um script inline antes da primeira pintura,
então ela nunca pisca no tema errado.

## Por dentro

Quatro coisas que valem saber.

**Uma origem, e o servidor comprova.** Um header `Origin` presente não quer
dizer que a requisição é cross-origin — o navegador anexa ele em requisição
same-origin também, sempre que o método não é GET ou HEAD, o que é toda chamada
GraphQL. Comparar contra uma lista fixa fez a aplicação publicada recusar a si
mesma com 403. O servidor compara o host da origem com o host da própria
requisição, o que também sobrevive aos previews da Vercel, onde cada deploy
ganha um hostname próprio.

**A lista de categorias é cacheada, os fatos não.** Categorias são um
vocabulário fixo que não muda há anos, então ficam uma hora no processo do
servidor e no cache do Apollo no cliente. O cache compartilha a promise em voo,
para um início frio não virar uma chamada à origem por requisição concorrente, e
serve o valor velho se a atualização falhar. Fatos nunca são cacheados —
sortear um novo é justamente o objetivo.

**Nenhuma memoização escrita à mão.** O React Compiler deriva isso do que cada
handler de fato captura, o que é mais preciso que um array de dependências que
alguém precisa manter. O plugin `react-hooks` do ESLint traz os diagnósticos do
próprio compiler, então um padrão que tiraria um componente da compilação
silenciosamente reprova no lint em vez de degradar quieto.

**O dialog é do Radix.** Isso traz o focus trap, o fundo inerte e o bloqueio de
scroll. O título dele fica de propósito *fora* da fronteira lazy: o conteúdo é
code-split, e enquanto esse chunk baixa um título declarado lá dentro ainda não
existiria, deixando o dialog sem nome para quem usa leitor de tela.

## Com o que foi feito

| | | |
|---|---|---|
| [React](https://react.dev/) | 19 | Interface |
| [React Compiler](https://react.dev/learn/react-compiler) | 1.0 | Memoização automática |
| [TypeScript](https://www.typescriptlang.org/) | 5.9 | Tipagem, modo estrito |
| [Vite](https://vite.dev/) | 8.2 | Build e dev server |
| [Tailwind CSS](https://tailwindcss.com/) | 4.3 | Estilo, configurado em CSS |
| [shadcn/ui](https://ui.shadcn.com/) | radix-nova | Componentes, sobre Radix |
| [Apollo Client](https://www.apollographql.com/docs/react/) | 3.14 | Cliente e cache GraphQL |
| [i18next](https://www.i18next.com/) | 26 | Inglês e português |
| [Express](https://expressjs.com/) | 4.19 | Gateway |
| [graphql-http](https://github.com/graphql/graphql-http) | 1.22 | GraphQL sobre HTTP |
| [Vitest](https://vitest.dev/) | 4.1 | Testes unitários |
| [Cypress](https://www.cypress.io/) | 13 | Ponta a ponta e acessibilidade |

## Rodando na sua máquina

Node `^20.19.0 || >=22.12.0` — o mínimo que o Vite 8 exige.

```bash
git clone https://github.com/dev-kohako/chuck-norris-facts.git
cd chuck-norris-facts

# gateway
cd server && npm install && cp .env.example .env && npm run dev

# aplicação, em outro terminal
cd client && npm install && npm run dev
```

A aplicação abre em `http://localhost:3000` com `/api/graphql` já roteado para o
gateway na `:4000`. O cliente não precisa de `.env` a menos que você queira
apontar para uma API em outro lugar — aí é só definir `VITE_API_URL`.

`docker compose up --build` sobe o mesmo par com o nginx na frente.

## Scripts

Cliente:

| | |
|---|---|
| `npm run dev` | Dev server, com a API por proxy |
| `npm run build` | Build de produção em `dist/` |
| `npm run preview` | Serve o build localmente |
| `npm test` | Vitest |
| `npm run typecheck` | Tipagem, sem emitir |
| `npm run lint` | ESLint, com as regras do React Compiler |
| `npm run cypress:run` | Ponta a ponta, headless |

Servidor:

| | |
|---|---|
| `npm run dev` | Gateway com hot reload |
| `npm run build` | Compila para `dist/` |
| `npm start` | Roda o servidor compilado |
| `npm test` | Jest |
| `npm run typecheck` | Tipagem de `src`, `api` e dos testes |

## Testes

Os resolvers são cobertos contra uma origem mockada, cache incluído: que uma
segunda chamada não vai à rede, e que três chamadas concorrentes compartilham
uma requisição só. O CORS é coberto contra um servidor real em porta efêmera —
sem `Origin`, com um same-origin, com um estrangeiro, e com um estrangeiro que o
`CLIENT_URL` permite.

No cliente, o Vitest cobre o card de fato ponta a ponta contra um link mockado e
verifica que os dois dicionários de tradução têm exatamente as mesmas chaves.
Uma chave faltando cai em inglês silenciosamente, então o buraco só apareceria
como texto não traduzido na frente do usuário.

O Cypress dirige a aplicação de verdade, e as checagens de acessibilidade rodam
o axe em claro e escuro nos dois idiomas, mais o dialog aberto em cada tema. O
contraste depende do tema e do texto juntos, e é por isso que todas as
combinações estão lá.

## Onde fica o quê

```
client/
├── src/
│   ├── components/ui/   primitivos do shadcn, editados no lugar
│   ├── i18n/            configuração e os dicionários en/pt
│   ├── pages/           uma pasta por seção, componente + hook
│   └── index.css        tema do Tailwind e os tokens de design
└── cypress/e2e/         a suíte ponta a ponta e o axe

server/
├── api/index.ts         entrypoint da Vercel — exporta o app, nunca escuta
├── src/
│   ├── app.ts           monta o app express
│   ├── index.ts         entrypoint local e Docker — escuta
│   ├── graphql/         schema e resolvers
│   └── utils/ttlCache   o cache de categorias
└── __tests__/
```

O Tailwind 4 dispensa `tailwind.config`: tema e variantes ficam em
`client/src/index.css`, com `@theme` e `@custom-variant`.

## Deploy

Está na [Vercel](https://chuck-norris-facts-kwk.vercel.app/), com as duas
metades saindo deste mesmo repositório — `client` como build estático e
`server/api/index.ts` como função Node.

| | |
|---|---|
| Root Directory | raiz do repositório |
| Framework Preset | Other |
| Config | `vercel.json` |

Esses dois primeiros importam. Aponte o Root Directory para `client` e o
`vercel.json` da raiz nunca é lido, então a função da API não sobe — foi assim
que `/api/graphql` respondeu 405 em produção por meses enquanto a página
carregava normalmente.

## Licença

[MIT](LICENSE) — pega, usa, modifica. Se te ajudou, me conta.

## Quem fez

**Joseph Kawe**, sob a marca KWK.

[GitHub](https://github.com/dev-kohako) ·
[LinkedIn](https://www.linkedin.com/in/josephkawe/) ·
[Instagram](https://www.instagram.com/kohako.dev/) ·
[YouTube](https://www.youtube.com/@dev_kohako) ·
[Bento](https://bento.me/kohako)
