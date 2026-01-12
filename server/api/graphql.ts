import { ApolloServer } from '@apollo/server';
import { startServerAndCreateNextHandler } from '@as-integrations/next';
import schema from "../src/graphql/schema";
import { root } from "../src/graphql/resolvers";
import { logger } from "../src/utils/logger";
import dotenv from "dotenv";
import { NextApiRequest, NextApiResponse } from 'next';

dotenv.config();

const server = new ApolloServer({
  typeDefs: schema,
  resolvers: root,
  formatError(error) {
    logger.error(error);
    return error;
  },
});

const apolloHandler = startServerAndCreateNextHandler(server);

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Credentials", "true");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");

  if (req.method === "OPTIONS") {
    res.status(200).end();
    return;
  }

  return await apolloHandler(req, res);
}