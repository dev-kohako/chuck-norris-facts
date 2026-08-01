# Chuck Norris Facts 🥋

A modern full-stack React application that delivers random Chuck Norris facts and provides search functionality by text or category. Built with a GraphQL API backend and Apollo Client for seamless state management and data fetching.

<div align="center">
  <img src="./docs/screenshot.png" alt="Chuck Norris Facts Application Preview" width="700" />
</div>

---

## 🚀 Live Demo

Experience Chuck Norris facts like never before: **[https://chuck-norris-facts-kwk.vercel.app/](https://chuck-norris-facts-kwk.vercel.app/)**

---

## ✨ Features

- 🎲 **Random Facts**: Get entertaining Chuck Norris facts with a single click
- 🔍 **Smart Search**: Search facts by text content or browse by categories
- 🌙 **Persistent Dark Mode**: Toggle between light and dark themes with localStorage persistence
- 📱 **Fully Responsive**: Optimized for all device sizes and screen resolutions
- ⚡ **GraphQL Integration**: Efficient data fetching with Apollo Client
- 🎨 **Modern UI**: Clean, intuitive interface built with Tailwind CSS
- 🔧 **TypeScript Support**: Type-safe development with full TypeScript integration

---

## 🏗️ Architecture

This project follows a modern full-stack architecture:

The API is served from the same origin as the app in every environment — Vercel
routes `/api/graphql` to the function, the nginx image proxies it to the server
container, and the Vite dev server proxies it to `localhost:4000`. The client
therefore needs no API URL configured, and the browser never issues a CORS
preflight.

### Frontend (Client)
- **React 19** with TypeScript for type safety
- **React Compiler** for automatic memoization — no hand-written `useCallback`/`useMemo`
- **Vite** for the dev server and production build
- **Apollo Client** for GraphQL state management
- **shadcn/ui** on Radix primitives, styled with **Tailwind CSS v4**
- **i18next** for English and Portuguese
- **Lucide React** for beautiful icons

### Backend (Server)
- **Node.js** with **Express** framework
- **GraphQL** API with graphql-http
- **TypeScript** for server-side type safety
- **Axios** for external API integration
- **Helmet** and **CORS** for security

---

## 🛠️ Tech Stack

### Frontend Dependencies
| Package | Version | Purpose |
|---------|---------|---------|
| React | ^19.2.8 | UI Library |
| Apollo Client | ^3.14.1 | GraphQL Client |
| Vite | ^8.2.0 | Build Tool |
| babel-plugin-react-compiler | ^1.0.0 | Automatic Memoization |
| shadcn/ui (radix-nova) | — | Component Layer |
| Tailwind CSS | ^4.3.3 | Styling Framework |
| i18next / react-i18next | ^26 / ^17 | Internationalisation |
| TypeScript | ^5.9.3 | Type Safety |
| Lucide React | ^0.539.0 | Icon Library |
| Vitest | ^4.1.10 | Unit Tests |

### Backend Dependencies
| Package | Version | Purpose |
|---------|---------|---------|
| Express | ^4.19.2 | Web Framework |
| GraphQL | ^16.11.0 | Query Language |
| graphql-http | ^1.22.4 | GraphQL over HTTP |
| Axios | ^1.7.2 | HTTP Client |
| Pino | ^9.6.0 | Structured Logging |
| TypeScript | ^5.4.5 | Type Safety |

---

## 🚀 Quick Start

### Prerequisites
- Node.js `^20.19.0 || >=22.12.0` (the floor Vite 8 requires)
- npm

### Installation

```bash
# Clone the repository
git clone https://github.com/your-username/chuck-norris-facts.git
cd chuck-norris-facts
```

### Backend Setup

```bash
# Navigate to server directory
cd server

# Install dependencies
npm install

# Create environment file
cp .env.example .env

# Start development server
npm run dev
```

The GraphQL server will be available at `http://localhost:4000/graphql`

### Frontend Setup

```bash
# Navigate to client directory (in a new terminal)
cd client

# Install dependencies
npm install

# Start the Vite dev server
npm run dev
```

The React app will be available at `http://localhost:3000`, with `/api/graphql`
proxied to the server above — no `.env` needed unless you are pointing at an API
somewhere else.

---

## 📜 Available Scripts

### Frontend Scripts
| Command | Description |
|---------|-------------|
| `npm run dev` | Runs the app on the Vite dev server, with the API proxied |
| `npm run build` | Builds the app for production into `dist/` |
| `npm run preview` | Serves the production build locally |
| `npm test` | Runs the Vitest unit tests |
| `npm run typecheck` | Type-checks without emitting |
| `npm run lint` | Runs ESLint, including the React Compiler diagnostics |
| `npm run cypress:open` | Opens Cypress for e2e testing |
| `npm run cypress:run` | Runs Cypress tests in headless mode |

### Backend Scripts
| Command | Description |
|---------|-------------|
| `npm run dev` | Starts the GraphQL server with hot reload |
| `npm run build` | Compiles TypeScript into `dist/` |
| `npm start` | Runs the compiled server |
| `npm test` | Runs server-side tests |
| `npm run typecheck` | Type-checks `src`, `api` and the tests |

---

## 📁 Project Structure

```
chuck-norris-facts/
├── client/                          # Frontend React application
│   ├── index.html                   # Vite entry document
│   ├── components.json              # shadcn/ui config
│   ├── public/
│   │   ├── chuck-logo.png
│   │   └── manifest.json
│   ├── src/
│   │   ├── components/
│   │   │   ├── ui/                  # shadcn/ui primitives
│   │   │   ├── DarkModeButton/
│   │   │       ├── DarkModeButton.tsx
│   │   │       └── useDarkModeButton.ts
│   │   │   ├── Footer/
│   │   │       ├── Footer.tsx
│   │   │       └── useFooter.ts
│   │   │   ├── Header/
│   │   │       ├── Header.tsx
│   │   │       └── useHeader.ts
│   │   │   ├── LanguageSwitcher/
│   │   │       └── LanguageSwitcher.tsx
│   │   │   ├── Spinner/
│   │   │       └── Spinner.tsx
│   │   │   └── SearchByCategorySection/
│   │   │       ├── SearchByCategorySection.tsx
│   │   │       └── useSearchByCategorySection.ts
│   │   ├── i18n/
│   │   │   ├── index.ts
│   │   │   └── locales/
│   │   │       ├── en.json
│   │   │       └── pt.json
│   │   ├── lib/
│   │   │   └── utils.ts             # cn()
│   │   ├── assets/
│   │   │   └── images/
│   │   ├── pages/
│   │   │   ├── Categories/
│   │   │       ├── Categories.tsx
│   │   │       └── useCategories.ts
│   │   │   ├── FactByFreeText/
│   │   │       ├── FactByFreeText.tsx
│   │   │       └── useFactByFreeText.ts
│   │   │   └── RandomFact/
│   │   │       ├── RandomFact.tsx
│   │   │       └── useRandomFact.ts
│   │   ├── queries/
│   │   │   ├── getChuckNorrisByCategories.ts
│   │   │   ├── getChuckNorrisByText.ts
│   │   │   ├── getChuckNorrisCategories.ts
│   │   │   └── getChuckNorrisFact.ts
│   │   ├── types/
│   │   │   └── types.ts
│   │   ├── utils/
│   │   │   └── apolloClient.ts
│   │   ├── App.test.tsx
│   │   ├── App.tsx
│   │   ├── index.css                # Tailwind v4 theme + shadcn/ui tokens
│   │   ├── index.tsx
│   │   ├── setupTests.ts
│   │   └── vite-env.d.ts
│   ├── cypress/                     # End-to-end specs
│   ├── package.json
│   ├── Dockerfile
│   ├── nginx.conf
│   ├── eslint.config.js
│   └── vite.config.ts
```

> Tailwind v4 is configured in CSS (`src/index.css`, via `@theme`), so there is
> no `tailwind.config.js` or `postcss.config.js`.
# Backend GraphQL API
```
├── server/                          
│   ├── api/
│   │   └── index.ts                 # Vercel entrypoint — exports the app, never listens
│   ├── src/
│   │   ├── graphql/
│   │   │   ├── resolvers/
│   │   │       └── index.ts
│   │   │   ├── schema/
│   │   │       └── index.ts
│   │   ├── middlewares/
│   │   │   └── errorHandler.ts
│   │   ├── utils/
│   │   │   ├── apiClient.ts
│   │   │   ├── logger.ts
│   │   │   ├── ttlCache.ts          # In-process cache for the category list
│   │   │   ├── types.ts
│   │   ├── app.ts                   # Builds the express app
│   │   └── index.ts                 # Local and Docker entrypoint — listens
│   ├── __tests__/
│   ├── package.json
│   ├── Dockerfile
│   ├── jest.config.ts
│   ├── tsconfig.build.json
│   └── .env.example
├── docker-compose.yml
└── README.md
```

---

## 🔧 Environment Variables

Create a `.env` file in the server directory:

```env
PORT=4000
NODE_ENV=development

# Upstream facts API. Defaults to https://api.chucknorris.io/jokes when unset.
BASE_URL=

# Only needed when the client is served from a different origin than the server.
CLIENT_URL=http://localhost:3000

# pino level: fatal | error | warn | info | debug | trace. Defaults to info.
LOG_LEVEL=
```

The client reads `VITE_API_URL`, which is optional — leave it unset and the app
talks to `/api/graphql` on its own origin.

---

## 📊 API Endpoints

### GraphQL Schema

The API flattens each upstream fact to its text, so every field resolves to a
`String` rather than an object.

```graphql
type Query {
  """Returns a random Chuck Norris fact."""
  getChuckNorrisFact: String!

  """Returns all available Chuck Norris fact categories."""
  getChuckNorrisCategories: [String!]!

  """Returns a random Chuck Norris fact from the given category."""
  getChuckNorrisFactByCategory(category: String!): String!

  """Searches facts by query text and returns the first result."""
  searchFacts(query: String!): String!
}
```

Served at `POST /api/graphql` (and `/graphql`, which is what the local dev
server and the Docker image talk to). `GET /health` reports liveness.

### Caching

The category list is a fixed vocabulary that has not changed in years, so it is
cached at both ends: for an hour in the server process (`src/utils/ttlCache.ts`,
which also shares the in-flight promise so a cold cache does not fan out into N
upstream calls) and in the Apollo cache on the client. Text searches are
deterministic for a given term, so they are `cache-first` too.

The facts themselves are never cached — returning a random one is the whole
point.

---

## 🧪 Testing

### Frontend Testing
```bash
cd client

# Run unit tests
npm test

# Run e2e tests
npm run cypress:open
```

### Backend Testing
```bash
cd server

# Run server tests
npm test
```

---

## 🌐 Deployment

### Vercel
`vercel.json` deploys both halves from this one repository: `client` builds as a
static site and `server/api/index.ts` as a Node function. `/api/graphql` and
`/health` route to the function, the filesystem handler serves the static build,
and anything left falls through to `index.html`.

### Docker
`docker compose up --build` brings up the API on `:4000` and the app on `:3000`,
with nginx proxying `/api/graphql` between them. The client waits on the
server's healthcheck.

---

## 🔒 Security Features

- **Helmet.js**: Security headers protection
- **CORS**: Cross-origin resource sharing configuration
- **Input Validation**: GraphQL schema validation
- **Environment Variables**: Sensitive data protection

---

## 🎨 Design System

The palette is sampled from the mascot. `chuck-dancing.gif` is a ten-colour
sprite, and three of them carry the whole system:

| Sprite | Share | oklch | Role |
|--------|-------|-------|------|
| `#272c35` hat and outline | 46.5% | `oklch(0.292 0.018 262)` | the neutral ramp |
| `#7da7d9` denim | 2.4% | `oklch(0.717 0.087 253)` | `--primary` |
| `#ffcc00` belt star | 0.8% | `oklch(0.865 0.177 90)` | `--ring` |

- **Neutrals are not grey**: every one sits on hue 262 at low chroma — the hat, desaturated.
- **Two signals, never confused**: denim carries actions, gold carries focus.
- **Both invert between themes**, because one value cannot serve both: `#7da7d9` is too light to hold white text, so light mode darkens it and dark mode keeps it bright over dark text. The gold ring does the same in reverse. Both clear 4.5:1.
- **Tokens**: shadcn/ui variables in `src/index.css`; components live in `src/components/ui`.
- **Typography**: Geist for the interface, Pixelify Sans reserved for the wordmark and hero title — the pixel face answering the pixel mascot. Both self-hosted through `@fontsource`, so the page makes no third-party font request.
- **Dark Mode**: class-based and persisted, applied by an inline script before first paint so the page never flashes the wrong theme.
- **Focus**: `focus-visible` only, so the ring is for keyboard users.
- **Animations**: suppressed under `prefers-reduced-motion`.

Verified with axe across light × dark and English × Portuguese, plus the dialog
open in both themes: no violations.

---

## 🌍 Internationalisation

English and Portuguese, through `i18next` with browser detection and a
`localStorage` cache. Both dictionaries are bundled rather than fetched —
together they are under 4 kB, and a lazy backend would trade that for a
render-blocking round trip and a flash of untranslated keys.

- Copy lives in `src/i18n/locales/{en,pt}.json`.
- `pt-BR` and `pt-PT` both resolve to `pt`; there is one Portuguese here.
- `<html lang>` is kept in step with the active language — screen readers and hyphenation key off it, and axe fails a document without it.
- A test asserts the two dictionaries have exactly the same key set: a missing key falls back silently to English, so the gap only ever shows up as untranslated copy in front of a user.
- The e2e suite pins `i18nextLng` to `en`, since its assertions are written against the English copy.

---

## 🤝 Contributing

We welcome contributions! Please follow these steps:

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

### Code Style Guidelines
- Use TypeScript for all new code
- Follow ESLint configuration
- Write tests for new features
- Update documentation as needed

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 🙏 Acknowledgments

- [Chuck Norris API](https://api.chucknorris.io/) for providing the facts data
- [Apollo GraphQL](https://www.apollographql.com/) for excellent GraphQL tools
- [Tailwind CSS](https://tailwindcss.com/) for the utility-first CSS framework

---

## 👨‍💻 Author

**Joseph Kawe**

- GitHub: [https://github.com/dev-kohako](https://github.com/dev-kohako)
- LinkedIn: [https://www.linkedin.com/in/josephkawe/](https://www.linkedin.com/in/josephkawe/)
- Email: josephkawe000@gmail.com

---

<div align="center">
  <p>🥋 Made with ❤️ and a roundhouse kick by Joseph Kawe</p>
  <p>⭐ Star this repository if Chuck Norris would approve!</p>
  <p><em>"Chuck Norris doesn't need a README, but his code does."</em></p>
</div>
