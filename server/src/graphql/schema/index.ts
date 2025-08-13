import { buildSchema } from "graphql";

const schema = buildSchema(`
  """
  Root Query type for Chuck Norris API.
  """
  type Query {
    """
    Returns a random Chuck Norris fact.
    """
    getChuckNorrisFact: String!

    """
    Returns all available Chuck Norris fact categories.
    """
    getChuckNorrisCategories: [String!]!

    """
    Returns a random Chuck Norris fact from the given category.
    """
    getChuckNorrisFactByCategory(category: String!): String!

    """
    Searches facts by query text and returns the first result.
    """
    searchFacts(query: String!): String!
  }
`);

export default schema;
