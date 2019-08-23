const { createTestClient } = require("apollo-server-testing");
const { ApolloServer, gql } = require("apollo-server");
const sinon = require("sinon");
const typeDefs = require("./typeDefs");
const resolvers = require("./resolvers");
const logger = require("./logger");

let query;
let loggerSpy;

describe("resolvers", () => {
  before(() => {
    logger.silent = true;
    const context = { logger };
    const server = new ApolloServer({ typeDefs, resolvers, context });
    const testClient = createTestClient(server);
    query = testClient.query;
    loggerSpy = sinon.spy(logger, "info");
  });

  it("creates a log in books resolver", async () => {
    await query({
      query: gql`
        {
          books {
            title
          }
        }
      `
    });

    sinon.assert.calledOnce(loggerSpy);
    sinon.assert.calledWith(loggerSpy, "Returning a list of books");
  });

  after(() => {
    logger.info.restore();
  });
});
