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

export const GET_CHUCK_NORRIS_JOKE_BY_CATEGORY = gql`
  query GetChuckNorrisJokeByCategory($category: String!) {
    getChuckNorrisJokeByCategory(category: $category)
  }
`;
