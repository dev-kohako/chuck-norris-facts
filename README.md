<div align="center">

<img src="./docs/mascot.gif" width="76" height="76" alt="" />

# Chuck Norris Facts

**Random Chuck Norris facts, searchable by category or free text.**

[![React](https://img.shields.io/badge/React-19-087EA4?style=flat-square&logo=react&logoColor=white)](https://react.dev/)
[![React Compiler](https://img.shields.io/badge/React_Compiler-1.0-087EA4?style=flat-square)](https://react.dev/learn/react-compiler)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.9-3178C6?style=flat-square&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-8.2-646CFF?style=flat-square&logo=vite&logoColor=white)](https://vite.dev/)
[![Tailwind](https://img.shields.io/badge/Tailwind-4.3-06B6D4?style=flat-square&logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
[![GraphQL](https://img.shields.io/badge/GraphQL-16-E10098?style=flat-square&logo=graphql&logoColor=white)](https://graphql.org/)
[![Vitest](https://img.shields.io/badge/Vitest-4.1-6E9F18?style=flat-square&logo=vitest&logoColor=white)](https://vitest.dev/)
[![Cypress](https://img.shields.io/badge/Cypress-13-69D3A7?style=flat-square&logo=cypress&logoColor=white)](https://www.cypress.io/)

[**Live demo**](https://chuck-norris-facts-kwk.vercel.app/) · [Português](README.pt-BR.md)

</div>

---

## The short version

A React front end and a GraphQL gateway of my own in front of
[api.chucknorris.io](https://api.chucknorris.io/). Click for a random fact,
browse the categories, or search by text. The interface speaks English and
Portuguese and picks whichever the browser asks for.

The gateway exists so the browser only ever talks to one origin. Vercel routes
`/api/graphql` to a function, the nginx image proxies it to the server
container, and the Vite dev server proxies it to `localhost:4000` — the same
shape in all three. The client hard-defaults to a relative `/api/graphql`, so
there is no API URL to configure anywhere and no CORS preflight in normal
operation.

<div align="center">
  <img src="./docs/screenshot.png" alt="Chuck Norris Facts" width="760" />
</div>

## The look

The palette is sampled from the mascot. `chuck-dancing.gif` is a ten-colour
sprite, and three of those colours carry the whole system:

| Sprite | Share | oklch | Role |
|--------|-------|-------|------|
| `#272c35` hat and outline | 46.5% | `oklch(0.292 0.018 262)` | the neutral ramp |
| `#7da7d9` denim | 2.4% | `oklch(0.717 0.087 253)` | `--primary` |
| `#ffcc00` belt star | 0.8% | `oklch(0.865 0.177 90)` | `--ring` |

So the greys are not grey — every neutral sits on hue 262 at low chroma, which
is the hat desaturated. Denim carries the actions and gold carries focus, two
signals that never get mistaken for each other. Each one inverts between themes,
because a single value cannot serve both: `#7da7d9` is too light to hold white
text, so light mode darkens it and dark mode keeps it bright over dark text.

Geist for the interface, Pixelify Sans for the wordmark and the hero title only
— the pixel face answering the pixel mascot, and unreadable at body sizes. Both
self-hosted, so the page makes no third-party font request. The theme is applied
by an inline script before the first paint, so it never flashes the wrong one.

## Under the hood

Four things worth knowing.

**One origin, and the server proves it.** A present `Origin` header does not
mean a request is cross-origin — browsers attach it to same-origin requests too
whenever the method is not GET or HEAD, which is every GraphQL call. Comparing
it against a fixed allowlist made the deployed app reject itself with a 403.
The server compares the origin's host against the request's own instead, which
also survives Vercel previews, where every deployment gets its own hostname.

**The category list is cached, the facts are not.** Categories are a fixed
vocabulary that has not changed in years, so they are held for an hour in the
server process and in the Apollo cache on the client. The cache shares its
in-flight promise, so a cold start does not fan out into one upstream call per
concurrent request, and it serves the stale value if a refresh fails. Facts are
never cached — returning a random one is the entire point.

**No hand-written memoization.** The React Compiler derives it from what each
handler actually closes over, which is more precise than a dependency array
somebody has to maintain. The `react-hooks` ESLint plugin ships the compiler's
own diagnostics, so a pattern that would silently opt a component out of
compilation fails the lint run instead of degrading quietly.

**The dialog is Radix's.** That buys the focus trap, the inert background and
the scroll lock. Its title deliberately sits *outside* the lazy boundary: the
content is code-split, and while that chunk downloads a title declared inside it
would not exist yet, leaving the dialog unnamed for anyone on a screen reader.

## Built with

| | | |
|---|---|---|
| [React](https://react.dev/) | 19 | Interface |
| [React Compiler](https://react.dev/learn/react-compiler) | 1.0 | Automatic memoization |
| [TypeScript](https://www.typescriptlang.org/) | 5.9 | Types, strict |
| [Vite](https://vite.dev/) | 8.2 | Build and dev server |
| [Tailwind CSS](https://tailwindcss.com/) | 4.3 | Styling, configured in CSS |
| [shadcn/ui](https://ui.shadcn.com/) | radix-nova | Components, on Radix |
| [Apollo Client](https://www.apollographql.com/docs/react/) | 3.14 | GraphQL client and cache |
| [i18next](https://www.i18next.com/) | 26 | English and Portuguese |
| [Express](https://expressjs.com/) | 4.19 | Gateway |
| [graphql-http](https://github.com/graphql/graphql-http) | 1.22 | GraphQL over HTTP |
| [Vitest](https://vitest.dev/) | 4.1 | Unit tests |
| [Cypress](https://www.cypress.io/) | 13 | End-to-end and accessibility |

## Running it locally

Node `^20.19.0 || >=22.12.0` — the floor Vite 8 sets.

```bash
git clone https://github.com/dev-kohako/chuck-norris-facts.git
cd chuck-norris-facts

# gateway
cd server && npm install && cp .env.example .env && npm run dev

# app, in another terminal
cd client && npm install && npm run dev
```

The app opens on `http://localhost:3000` with `/api/graphql` proxied to the
gateway on `:4000`. The client needs no `.env` unless you are pointing it at an
API somewhere else, in which case set `VITE_API_URL`.

`docker compose up --build` brings up the same pair with nginx in front.

## Scripts

Client:

| | |
|---|---|
| `npm run dev` | Dev server, API proxied |
| `npm run build` | Production build into `dist/` |
| `npm run preview` | Serve the build locally |
| `npm test` | Vitest |
| `npm run typecheck` | Types, no emit |
| `npm run lint` | ESLint, with the React Compiler rules |
| `npm run cypress:run` | End-to-end, headless |

Server:

| | |
|---|---|
| `npm run dev` | Gateway with hot reload |
| `npm run build` | Compile to `dist/` |
| `npm start` | Run the compiled server |
| `npm test` | Jest |
| `npm run typecheck` | Types across `src`, `api` and the tests |

## Tests

The resolvers are covered against a mocked upstream, the cache included: that a
second call does not reach the network, and that three concurrent calls share a
single request. CORS is covered against a real server on an ephemeral port — no
`Origin`, a same-origin one, a foreign one, and a foreign one that `CLIENT_URL`
permits.

On the client, Vitest covers the fact card end to end against a mocked link and
asserts that the two translation dictionaries hold exactly the same keys. A
missing key falls back silently to English, so the gap would only ever surface
as untranslated copy in front of a user.

Cypress drives the real app, and its accessibility checks run axe across light
and dark in both languages, plus the dialog open in each theme. Contrast depends
on the theme and the copy together, which is why every combination is there.

## Where things live

```
client/
├── src/
│   ├── components/ui/   shadcn primitives, edited in place
│   ├── i18n/            setup and the en/pt dictionaries
│   ├── pages/           one folder per section, component + hook
│   └── index.css        Tailwind theme and the design tokens
└── cypress/e2e/         the end-to-end and axe suite

server/
├── api/index.ts         Vercel entrypoint — exports the app, never listens
├── src/
│   ├── app.ts           builds the express app
│   ├── index.ts         local and Docker entrypoint — listens
│   ├── graphql/         schema and resolvers
│   └── utils/ttlCache   the category cache
└── __tests__/
```

Tailwind 4 needs no `tailwind.config`: the theme and variants live in
`client/src/index.css`, under `@theme` and `@custom-variant`.

## Deploy

On [Vercel](https://chuck-norris-facts-kwk.vercel.app/), both halves from this
one repository — `client` as a static build, `server/api/index.ts` as a Node
function.

| | |
|---|---|
| Root Directory | repository root |
| Framework Preset | Other |
| Config | `vercel.json` |

Those first two matter. Point Root Directory at `client` and the repo-root
`vercel.json` is never read, so the API function does not ship — which is how
`/api/graphql` answered 405 in production for months while the page itself
loaded fine.

## License

[MIT](LICENSE) — take it, use it, change it. If it helped, tell me.

## Who made it

**Joseph Kawe**, under the KWK name.

[GitHub](https://github.com/dev-kohako) ·
[LinkedIn](https://www.linkedin.com/in/josephkawe/) ·
[Instagram](https://www.instagram.com/kohako.dev/) ·
[YouTube](https://www.youtube.com/@dev_kohako) ·
[Bento](https://bento.me/kohako)
