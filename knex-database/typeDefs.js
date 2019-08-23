const { gql } = require("apollo-server");

const typeDefs = gql`
  type Book {
    title: String
    author: String
  }

  input BookInput {
    title: String
    author: String
  }

  type Query {
    books: [Book]
    book(id: Int!): Book
  }

  type Mutation {
    createBook(input: BookInput!): [Int!]
  }
`;

module.exports = typeDefs;
