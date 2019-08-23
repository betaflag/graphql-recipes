const { createTestClient } = require("apollo-server-testing");
const { ApolloServer, gql } = require("apollo-server");
const assert = require("assert");
const typeDefs = require("./typeDefs");
const resolvers = require("./resolvers");
const knex = require("./knex");

const GET_BOOKS = gql`
  {
    books {
      title
    }
  }
`;

const GET_BOOK = gql`
  query book($id: Int!) {
    book(id: $id) {
      title
    }
  }
`;

const CREATE_BOOK = gql`
  mutation createBook($input: BookInput!) {
    createBook(input: $input)
  }
`;

describe("resolvers", () => {
  let server;

  before(() => {
    server = new ApolloServer({ typeDefs, resolvers, context: { knex } });
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
  });

  describe("book", () => {
    it("returns a book by id", async () => {
      const { query } = createTestClient(server);
      const res = await query({ query: GET_BOOK, variables: { id: 1 } });
      assert(res.data);
      assert(res.data.book);
    });
  });

  describe("createBook", () => {
    it("creates a new book", async () => {
      const { mutate } = createTestClient(server);
      const res = await mutate({
        mutation: CREATE_BOOK,
        variables: {
          input: {
            title: "test",
            author: "test"
          }
        }
      });
      assert(res.data);
      assert(res.data.createBook);
      assert(res.data.createBook.length === 1);
    });
  });

  after(function() {
    return knex.destroy();
  });
});
