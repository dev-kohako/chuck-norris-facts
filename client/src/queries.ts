import { gql } from '@apollo/client';

export const GET_CHUCK_NORRIS_FACT = gql`
  query GetChuckNorrisFact {
    getChuckNorrisFact
  }
`;


export const GET_CHUCK_NORRIS_CATEGORIES = gql`
  query GetChuckNorrisCategories {
    getChuckNorrisCategories
  }
`;

export const GET_CHUCK_NORRIS_FACT_BY_CATEGORY = gql`
  query GetChuckNorrisFactByCategory($category: String!) {
    getChuckNorrisFactByCategory(category: $category)
  }
`;

export const SEARCH_FACTS = gql`
  query SearchFacts($query: String!) {
    searchFacts(query: $query)
  }
`;
