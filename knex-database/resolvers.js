const resolvers = {
  Query: {
    books: (_, __, { knex }) => knex("books").select(),
    book: (_, { id }, { knex }) =>
      knex("books")
        .where({ id })
        .first()
  },
  Mutation: {
    createBook: (_, { input }, { knex }) => knex("books").insert(input)
  }
};

module.exports = resolvers;
