import { gql } from "@apollo/client";

export const GET_CHUCK_NORRIS_CATEGORIES = gql`
  query GetChuckNorrisCategories {
    getChuckNorrisCategories
  }
`;