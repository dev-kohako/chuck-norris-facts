import { ApolloServer } from '@apollo/server';
import { startServerAndCreateNextHandler } from '@as-integrations/next';
import { NextRequest } from 'next/server';
import schema from "../../src/graphql/schema";
import { root } from "../../src/graphql/resolvers";
import { logger } from "../../src/utils/logger";

const server = new ApolloServer({
  typeDefs: schema,
  resolvers: root,
  formatError(error) {
    logger.error(error);
    return error;
  },
});

const handler = startServerAndCreateNextHandler<NextRequest>(server);

export async function POST(req: NextRequest) {
  return handler(req);
}

export async function GET(req: NextRequest) {
  return handler(req);
}

export async function OPTIONS(req: NextRequest) {
  return handler(req);
}