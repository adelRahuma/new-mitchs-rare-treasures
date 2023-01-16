const { Pool } = require("pg");
const ENV = process.env.NODE_ENV;
//PGDATABASE=mitchs_rare_treasures_test node ./db/index.js
require("dotenv").config();

if (!process.env.PGDATABASE) {
  throw new Error("PGDATABASE not set");
}

module.exports = new Pool();
