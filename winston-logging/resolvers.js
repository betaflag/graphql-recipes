const books = require("./data");

const resolvers = {
  Query: {
    books: (_, __, { logger }) => {
      logger.info("Returning a list of books");
      return books;
    }
  }
};

module.exports = resolvers;
