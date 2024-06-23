import express from 'express';
import { request } from 'graphql-request';
import cors from 'cors';

const app = express();
const endpoint = 'https://chuck-norris-facts-kappa.vercel.app/graphql';

app.use(cors());
app.use(express.json()); // Middleware para parsear JSON

app.post('/graphql', async (req, res) => {
  const { query, variables } = req.body; // Extrai query e variáveis do corpo da requisição

  try {
    const response = await request(endpoint, query, variables);
    res.json(response);
  } catch (error) {
    res.status(500).json({ });
  }
});

const PORT = process.env.PORT || 4000; // Permite que o servidor utilize a porta configurada no ambiente ou a porta 4000

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}..`);
});
