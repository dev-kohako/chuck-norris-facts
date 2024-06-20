import cors from 'cors';
import express from 'express';
import { graphqlHTTP } from 'express-graphql';
import schema from './schema';
import { root } from './resolvers';

const app = express();

app.use(cors());
app.use('/graphql', graphqlHTTP({
  schema: schema,
  rootValue: root,
  graphiql: true,
}));

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
