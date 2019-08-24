const { createTestClient } = require("apollo-server-testing");
const { ApolloServer, gql } = require("apollo-server");
const assert = require("assert");
const sinon = require("sinon");
const typeDefs = require("./typeDefs");
const resolvers = require("./resolvers");
const knex = require("./knex");
const authorLoader = require("./author.loader");

const GET_BOOKS = gql`
  {
    books {
      title
      author {
        name
      }
    }
  }
`;

let knexSpy;

describe("resolvers", () => {
  let server;

  beforeEach(() => {
    knexSpy = sinon.spy(knex);

    const loaders = {
      author: authorLoader.createLoader(knexSpy)
    };

    server = new ApolloServer({
      typeDefs,
      resolvers,
      context: { knex: knexSpy, loaders }
    });
  });

  beforeEach(() => {
    return knex.seed.run();
  });

  describe("books", () => {
    it("returns all books", async () => {
      const { query } = createTestClient(server);
      const res = await query({ query: GET_BOOKS });
      assert(res.data);
      assert(res.data.books);
      assert(res.data.books.length === 3);
    });

    it("makes only two SQL queries", async () => {
      const { query } = createTestClient(server);
      await query({ query: GET_BOOKS });
      sinon.assert.calledTwice(knexSpy);
    });
  });

  after(function() {
    return knex.destroy();
  });
});
