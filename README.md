# Chuck Norris Facts 🥋

A modern full-stack React application that delivers random Chuck Norris facts and provides search functionality by text or category. Built with a GraphQL API backend and Apollo Client for seamless state management and data fetching.

<div align="center">
  <img src="./public/screenshot.png" alt="Chuck Norris Facts Application Preview" width="700" />
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

### Frontend (Client)
- **React 18** with TypeScript for type safety
- **Apollo Client** for GraphQL state management
- **Tailwind CSS** for responsive styling
- **Lucide React** for beautiful icons

### Backend (Server)
- **Node.js** with **Express** framework
- **GraphQL** API with express-graphql
- **TypeScript** for server-side type safety
- **Axios** for external API integration
- **Helmet** and **CORS** for security

---

## 🛠️ Tech Stack

### Frontend Dependencies
| Package | Version | Purpose |
|---------|---------|---------|
| React | ^18.3.1 | UI Library |
| Apollo Client | ^3.10.5 | GraphQL Client |
| TypeScript | ^4.9.5 | Type Safety |
| Tailwind CSS | ^3.4.4 | Styling Framework |
| Lucide React | ^0.539.0 | Icon Library |

### Backend Dependencies
| Package | Version | Purpose |
|---------|---------|---------|
| Express | ^4.19.2 | Web Framework |
| GraphQL | ^16.11.0 | Query Language |
| Apollo Server | ^4.0.0 | GraphQL Server |
| Axios | ^1.7.2 | HTTP Client |
| TypeScript | ^5.4.5 | Type Safety |

---

## 🚀 Quick Start

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn package manager

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
npm start
```

The GraphQL server will be available at `http://localhost:4000/graphql`

### Frontend Setup

```bash
# Navigate to client directory (in a new terminal)
cd client

# Install dependencies
npm install

# Start React development server
npm start
```

The React app will be available at `http://localhost:3000`

---

## 📜 Available Scripts

### Frontend Scripts
| Command | Description |
|---------|-------------|
| `npm start` | Runs the React app in development mode |
| `npm run build` | Builds the app for production |
| `npm test` | Launches the test runner |
| `npm run cypress:open` | Opens Cypress for e2e testing |
| `npm run cypress:run` | Runs Cypress tests in headless mode |

### Backend Scripts
| Command | Description |
|---------|-------------|
| `npm start` | Starts the GraphQL server with hot reload |
| `npm test` | Runs server-side tests |

---

## 📁 Project Structure

```
chuck-norris-facts/
├── client/                          # Frontend React application
│   ├── public/
│   │   ├── index.html
│   │   └── screenshot.png
│   ├── src/
│   │   ├── components/
│   │   │   ├── DarkModeButton/
│   │   │       ├── DarkModeButton.tsx
│   │   │       └── useDarkModeButton.tsx
│   │   │   ├── Footer/
│   │   │       ├── Footer.tsx
│   │   │       └── useFooter.ts
│   │   │   ├── Header/
│   │   │       ├── Header.tsx
│   │   │       └── useHeader.ts
│   │   │   ├── Modal/
│   │   │       ├── Modal.tsx
│   │   │       └── useModal.ts
│   │   │   └── SearchByCategorySection/
│   │   │       ├── SearchByCategorySection.tsx
│   │   │       └── useSearchByCategorySection.ts
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
│   │   │   ├── apolloClient.ts
│   │   │   ├── useModal.ts
│   │   ├── App.test.tsx
│   │   ├── App.tsx
│   │   ├── index.css
│   │   ├── index.tsx
│   │   ├── react-app-env.d.ts
│   │   ├── reportWebVitals.ts
│   │   └── setupTests.ts
│   ├── package.json
│   ├── Dockerfile
│   └── tailwind.config.js
```
# Backend GraphQL API
```
├── server/                          
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
│   │   │   ├── types.ts
│   │   └── index.ts
│   ├── package.json
│   ├── Dockerfile
│   ├── jest.config.ts
│   └── .env.example
├── docker-compose.yml
└── README.md
```

---

## 🔧 Environment Variables

Create a `.env` file in the server directory:

```env
PORT=4000
CHUCK_NORRIS_API_URL=https://api.chucknorris.io
NODE_ENV=development
```

---

## 📊 API Endpoints

### GraphQL Schema

```graphql
type Fact {
  id: ID!
  value: String!
  url: String!
  categories: [String!]!
  created_at: String!
  updated_at: String!
}

type Query {
  randomFact: Fact!
  searchFacts(query: String!): [Fact!]!
  factsByCategory(category: String!): [Fact!]!
  categories: [String!]!
}
```

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

### Frontend (Vercel)
The frontend is automatically deployed to Vercel on every push to main branch.

### Backend (Railway/Heroku)
Configure your preferred hosting platform with the following settings:
- **Build Command**: `npm run build`
- **Start Command**: `npm start`
- **Node Version**: 18+

---

## 🔒 Security Features

- **Helmet.js**: Security headers protection
- **CORS**: Cross-origin resource sharing configuration
- **Input Validation**: GraphQL schema validation
- **Environment Variables**: Sensitive data protection

---

## 🎨 Design System

- **Primary Colors**: Tailwind's blue and gray palette
- **Dark Mode**: Persistent theme switching
- **Typography**: Inter font family
- **Spacing**: Consistent 8px grid system
- **Animations**: Smooth transitions and hover effects

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
