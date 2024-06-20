import { buildSchema } from 'graphql';

const schema = buildSchema(`
  type Query {
    getChuckNorrisFact: String
  }
`);

export default schema;
