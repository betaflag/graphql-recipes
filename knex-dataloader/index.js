const { ApolloServer } = require("apollo-server");
const typeDefs = require("./typeDefs");
const resolvers = require("./resolvers");
const knex = require("./knex");
const authorLoader = require("./author.loader");

const loaders = {
  author: authorLoader.createLoader(knex)
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: { knex, loaders }
});

server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});
