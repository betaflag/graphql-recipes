exports.up = function(knex) {
  return knex.schema.createTable("books", function(table) {
    table.increments("id");
    table
      .string("title")
      .notNullable()
      .index();
    table
      .integer("author_id")
      .references("id")
      .inTable("authors")
      .notNullable()
      .onDelete("cascade");
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable("books");
};
