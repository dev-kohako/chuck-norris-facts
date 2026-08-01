import { ApolloClient, InMemoryCache } from "@apollo/client";

/**
 * Vercel, the nginx image and the Vite dev proxy all expose the API on the
 * app's own origin, so the relative default needs no build-time configuration.
 * `VITE_API_URL` stays available for pointing at a server elsewhere.
 */
const uri = import.meta.env.VITE_API_URL || "/api/graphql";

export const client = new ApolloClient({
  uri,
  cache: new InMemoryCache(),
});
