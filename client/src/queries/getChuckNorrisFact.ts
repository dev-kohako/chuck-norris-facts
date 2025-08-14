import { gql } from '@apollo/client';

export const GET_RANDOM_CHUCK_NORRIS_FACT = gql`
  query GetChuckNorrisFact {
    getChuckNorrisFact
  }
`;