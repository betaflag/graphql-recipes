exports.seed = function(knex) {
  return knex("authors")
    .del()
    .then(function() {
      return knex("authors").insert([
        { id: 1, name: "Isaac Asimov" },
        { id: 2, name: "Frank Herbert" },
        { id: 3, name: "Neal Stephenson" }
      ]);
    });
};
