const { ApolloServer } = require("apollo-server");
const typeDefs = require("./typeDefs");
const resolvers = require("./resolvers");
const logger = require("./logger");

const formatResponse = response => {
  logger.debug("GraphQL response", { response });
};

const context = ({ req }) => {
  const { query } = req.body;
  logger.debug("GraphQL query", { query });
  return { logger };
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
  formatResponse,
  context
});

server.listen().then(({ url }) => {
  logger.info(`🚀  Server ready at ${url}`);
});
