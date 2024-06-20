import { buildSchema } from 'graphql';

const schema = buildSchema(`
  type Query {
    getChuckNorrisFact: String
    getChuckNorrisCategories: [String]
    getChuckNorrisJokeByCategory(category: String!): String
  }
`);

export default schema;
