module.exports = {
  client: "sqlite",
  migrations: {
    directory: "migrations"
  },
  seeds: {
    directory: "seeds"
  },
  connection: {
    filename: "app.sqlite"
  }
};
