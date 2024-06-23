import express from 'express';
import { graphqlHTTP } from 'express-graphql';
import schema from './schema';
import { root } from './resolvers';
import cors from 'cors';

const app = express();

app.use(cors());

try {
  app.use('/graphql', graphqlHTTP({
    schema: schema,
    rootValue: root,
    graphiql: true,
  }));
} catch (error) {
  console.error('Error setting up /graphql endpoint:', error);
}

app.listen(4000, () => {
  console.log('Server is running on port 4000..');
});
