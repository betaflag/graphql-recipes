exports.up = function(knex) {
  return knex.schema.createTable("books", function(table) {
    table.increments("id");
    table
      .string("title")
      .notNullable()
      .index();
    table
      .string("author")
      .notNullable()
      .index();
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable("books");
};
