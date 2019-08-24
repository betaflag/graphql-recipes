exports.seed = function(knex) {
  return knex("books")
    .del()
    .then(function() {
      return knex("books").insert([
        { id: 1, title: "I, Robot", author_id: 1 },
        { id: 2, title: "Dune", author_id: 2 },
        { id: 3, title: "Snow Crash", author_id: 3 }
      ]);
    });
};
