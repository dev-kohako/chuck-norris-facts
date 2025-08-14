import { gql } from "@apollo/client";

export const GET_CHUCK_NORRIS_FACT_BY_CATEGORY = gql`
  query GetChuckNorrisFactByCategory($category: String!) {
    getChuckNorrisFactByCategory(category: $category)
  }
`;