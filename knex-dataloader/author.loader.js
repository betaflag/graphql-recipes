const DataLoader = require("dataloader");

exports.createLoader = function(knex) {
  return new DataLoader(ids => {
    return knex("authors")
      .whereIn("id", ids)
      .select("*")
      .then(rows => ids.map(id => rows.find(x => x.id === id)));
  });
};
