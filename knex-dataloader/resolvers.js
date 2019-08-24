const resolvers = {
  Query: {
    books: (_, __, { knex }) => knex("books").select()
  },
  Book: {
    author: (book, __, { loaders }) => loaders.author.load(book.author_id)
  }
};

module.exports = resolvers;
