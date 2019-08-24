const { gql } = require("apollo-server");

const typeDefs = gql`
  type Book {
    title: String
    author: Author
  }

  type Author {
    name: String
  }

  type Query {
    books: [Book]
  }
`;

module.exports = typeDefs;
