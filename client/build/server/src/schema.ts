import { buildSchema } from 'graphql';

const schema = buildSchema(`
  type Query {
    getChuckNorrisFact: String
    getChuckNorrisCategories: [String]
    getChuckNorrisFactByCategory(category: String!): String
    searchFacts(query: String!): String
  }
`);

export default schema;
