exports.seed = function(knex) {
  return knex("books")
    .del()
    .then(function() {
      return knex("books").insert([
        { id: 1, title: "I, Robot", author: "Isaac Asimov" },
        { id: 2, title: "Dune", author: "Frank Herbert" },
        { id: 3, title: "Snow Crash", author: "Neal Stephenson" }
      ]);
    });
};
