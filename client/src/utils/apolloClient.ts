import { ApolloClient, InMemoryCache } from "@apollo/client";

/**
 * Vercel, the nginx image and the Vite dev proxy all expose the API on the
 * app's own origin, so the relative default needs no build-time configuration.
 * `VITE_API_URL` stays available for pointing at a server elsewhere.
 */
const uri = import.meta.env.VITE_API_URL || "/api/graphql";

export const client = new ApolloClient({
  uri,
  cache: new InMemoryCache({
    typePolicies: {
      Query: {
        fields: {
          /**
           * Every field here returns a scalar at the root, so nothing is
           * normalised by id — the cache key is the field plus its arguments.
           * Spelling `keyArgs` out keeps two different searches from
           * overwriting each other in the same cache slot, which is what the
           * default would do if a field ever gained an argument that should
           * not partition it.
           */
          getChuckNorrisFactByCategory: { keyArgs: ["category"] },
          searchFacts: { keyArgs: ["query"] },
        },
      },
    },
  }),
  defaultOptions: {
    watchQuery: { fetchPolicy: "cache-first" },
  },
});
