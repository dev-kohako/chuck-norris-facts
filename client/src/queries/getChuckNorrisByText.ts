import { gql } from "@apollo/client";

export const GET_CHUCK_NORRIS_FACT_BY_TEXT = gql`
  query SearchFacts($query: String!) {
    searchFacts(query: $query)
  }
`;