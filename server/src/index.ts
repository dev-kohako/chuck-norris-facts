import express from 'express';
import { graphqlHTTP } from 'express-graphql';
import schema from './schema';
import { root } from './resolvers';
import cors from 'cors';

const app = express();

app.use(cors());

app.use('/graphql', graphqlHTTP({
  schema: schema,
  rootValue: root,
  graphiql: true,
}));

app.listen(4000, () => {
  console.log('Server is running on port 4000..');
});
