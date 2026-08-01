import { ApolloClient, InMemoryCache } from "@apollo/client";

/**
 * On Vercel the API is served from the same origin as the app, so the relative
 * default works with no build-time configuration. `REACT_APP_API_URL` stays
 * available for the Docker setup, where the client and the server are on
 * different ports.
 */
const uri = process.env.REACT_APP_API_URL || "/api/graphql";

export const client = new ApolloClient({
  uri,
  cache: new InMemoryCache(),
});
